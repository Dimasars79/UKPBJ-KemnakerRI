import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SYSTEM_PROMPT = `
Anda adalah "Asisten Virtual PBJ Kemnaker", asisten kecerdasan buatan resmi dari Unit Kerja Pengadaan Barang/Jasa (UKPBJ) Kementerian Ketenagakerjaan Republik Indonesia.

PERAN & TUGAS UTAMA:
1. Membantu ASN, PPK (Pejabat Pembuat Komitmen), Pokja Pemilihan, Pejabat Pengadaan, Penyedia/Vendor, Auditor, dan Masyarakat terkait layanan PBJ Kemnaker.
2. Memberikan penjelasan mengenai regulasi pengadaan barang dan jasa pemerintah (termasuk Perpres No. 16 Tahun 2018 jo Perpres No. 12 Tahun 2021 beserta aturan turunannya dari LKPP).
3. Memberikan panduan penggunaan aplikasi ekosistem SPSE (Sistem Pengadaan Secara Elektronik), SiRUP, E-Katalog LKPP, dan SIKaP.
4. Memberikan informasi tentang layanan internal UKPBJ Kemnaker:
   - Clearing House PBJ (forum penyelesaian permasalahan & advokasi PBJ).
   - Pembinaan SDM PBJ & Sertifikasi Keahlian Pengadaan Barang/Jasa.
   - Verifikasi Tingkat Komponen Dalam Negeri (TKDN).
   - Informasi Paket Pengadaan & Berita Pengadaan Kemnaker.

PANDUAN MENJAWAB:
- Gunakan bahasa Indonesia yang ramah, sopan, profesional, dan mudah dipahami.
- Buat jawaban yang terstruktur rapi (gunakan format poin, tabel, atau nomor untuk panduan langkah demi langkah).
- Jika pengguna membutuhkan verifikasi akun SPSE, berkas resmi, atau kendala teknis mendesak yang butuh penanganan manusia, arahkan untuk menghubungi Helpdesk Resmi:
  • WhatsApp Helpdesk: +62 898-8180-009
  • Email Resmi: ukpbj@kemnaker.go.id
  • Jam Layanan: Senin - Jumat (08:00 - 16:00 WIB)
- Jangan memberikan saran hukum di luar koridor aturan PBJ yang berlaku.
`;

// Helper untuk membaca daftar key secara dinamis dari file .env.local maupun process.env
function getGeminiKeys(): string[] {
  const detectedKeys: string[] = [];

  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('GEMINI_API_KEY') && trimmed.includes('=')) {
          const val = trimmed.substring(trimmed.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
          if (val && val.length > 10 && !val.includes(' ')) {
            detectedKeys.push(val);
          }
        }
      }
    }
  } catch {
    // Fallback ke process.env jika file system tidak dapat diakses
  }

  const rawGeminiPool = [
    ...detectedKeys,
    process.env.GEMINI_API_KEYS,
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
    process.env.GEMINI_API_KEY_5,
  ].filter(Boolean).join(',');

  return Array.from(
    new Set(
      rawGeminiPool
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 10)
    )
  );
}

// Pointer rotasi round-robin untuk mendistribusikan beban secara merata
let currentKeyIndex = 0;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Pesan tidak valid atau kosong.' },
        { status: 400 }
      );
    }

    const geminiKeys = getGeminiKeys();
    const groqKey = process.env.GROQ_API_KEY;

    if (geminiKeys.length === 0 && !groqKey) {
      return NextResponse.json(
        { error: 'API Key AI (GEMINI_API_KEY atau GROQ_API_KEY) belum dikonfigurasi pada server.' },
        { status: 500 }
      );
    }

    let reply = '';
    let lastError = '';

    // ================= 1. JALUR UTAMA: GOOGLE AI STUDIO (MULTI-ACCOUNT ROTATION & FAILOVER) =================
    if (geminiKeys.length > 0) {
      const geminiCandidateModels = [
        process.env.GEMINI_MODEL || 'gemini-3.5-flash',
        'gemini-3.5-flash',
        'gemini-3.8-flash',
        'gemini-3.6-flash',
        'gemini-3.1-flash-lite',
        'gemini-flash-latest',
      ];

      // Format messages untuk Google Gemini API
      const geminiContents = messages.map((m: { role: string; text?: string; content?: string }) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text || m.content || '' }],
      }));

      // Susun urutan key dengan rotasi Round-Robin (Key 1 -> Key 2 -> Key 3 -> dst)
      const startIndex = currentKeyIndex % geminiKeys.length;
      currentKeyIndex = (currentKeyIndex + 1) % geminiKeys.length;

      const orderedKeys = [
        ...geminiKeys.slice(startIndex),
        ...geminiKeys.slice(0, startIndex),
      ];

      // Loop setiap key jika salah satu terkena limit (429 Rate Limit / Quota Exceeded / Auth Error)
      for (const apiKey of orderedKeys) {
        let keySucceeded = false;
        const keyMask = `...${apiKey.slice(-6)}`;

        for (const model of Array.from(new Set(geminiCandidateModels))) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }],
                  },
                  contents: geminiContents,
                  generationConfig: {
                    temperature: 0.6,
                    maxOutputTokens: 2048,
                  },
                }),
              }
            );

            if (response.ok) {
              const data = await response.json();
              const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textResponse) {
                reply = textResponse;
                keySucceeded = true;
                break; // Sukses, selesai untuk request ini
              }
            } else {
              const errJson = await response.json().catch(() => ({}));
              lastError = errJson?.error?.message || response.statusText;
              
              // Jika terkena 429 (Rate Limit) atau Quota Exceeded pada akun ini, langsung loncat ke akun/key berikutnya
              const isAccountLimit = 
                response.status === 429 || 
                response.status === 403 ||
                lastError.toLowerCase().includes('quota') || 
                lastError.toLowerCase().includes('resourceexhausted');

              if (isAccountLimit) {
                console.warn(`[Gemini Logic Roll] Key [${keyMask}] limit kuota (${response.status}: ${lastError}). Beralih otomatis ke akun berikutnya...`);
                break; // Keluar dari loop model untuk mencoba akun/key berikutnya
              }
              
              // Jika model ini sibuk (503), lanjut coba model alternatif berikutnya pada akun yang sama
              console.warn(`[Gemini Model Fallback] Model [${model}] pada key [${keyMask}] kendala: ${lastError}. Mencoba model alternatif...`);
            }
          } catch (err: unknown) {
            lastError = err instanceof Error ? err.message : 'Gemini fetch error';
          }
        }

        if (keySucceeded) break;
      }
    }

    // ================= 2. JALUR CADANGAN: GROQ CLOUD =================
    if (!reply && groqKey) {
      const formattedMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; text?: string; content?: string }) => ({
          role: m.role === 'assistant' || m.role === 'model' ? 'assistant' : 'user',
          content: m.text || m.content || '',
        })),
      ];

      const groqCandidateModels = [
        process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
        'openai/gpt-oss-120b',
        'openai/gpt-oss-20b',
        'qwen/qwen3.8-27b',
      ];

      for (const model of Array.from(new Set(groqCandidateModels))) {
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model,
              messages: formattedMessages,
              temperature: 0.6,
              max_tokens: 1500,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            reply = data?.choices?.[0]?.message?.content || '';
            if (reply) break;
          } else {
            const errJson = await response.json().catch(() => ({}));
            lastError = errJson?.error?.message || response.statusText;
          }
        } catch (err: unknown) {
          lastError = err instanceof Error ? err.message : 'Groq fetch error';
        }
      }
    }

    if (!reply) {
      return NextResponse.json(
        { error: lastError || 'Gagal memproses jawaban dari AI.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Terjadi kendala saat menghubungi AI Asisten.';
    console.error('Error in /api/chat:', error);

    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}
