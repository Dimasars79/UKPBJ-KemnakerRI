import { NextResponse } from 'next/server';

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

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Pesan tidak valid atau kosong.' },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    if (!geminiKey && !groqKey) {
      return NextResponse.json(
        { error: 'API Key AI (GEMINI_API_KEY atau GROQ_API_KEY) belum dikonfigurasi pada server.' },
        { status: 500 }
      );
    }

    let reply = '';
    let lastError = '';

    // ================= 1. JALUR UTAMA: GOOGLE AI STUDIO (GEMINI) =================
    if (geminiKey) {
      const geminiCandidateModels = [
        process.env.GEMINI_MODEL || 'gemini-3.5-flash',
        'gemini-3.5-flash',
        'gemini-flash-latest',
        'gemini-3.8-flash',
      ];

      // Format messages untuk Google Gemini API
      const geminiContents = messages.map((m: { role: string; text?: string; content?: string }) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text || m.content || '' }],
      }));

      for (const model of Array.from(new Set(geminiCandidateModels))) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
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
              break;
            }
          } else {
            const errJson = await response.json().catch(() => ({}));
            lastError = errJson?.error?.message || response.statusText;
            console.warn(`[Gemini ${model}] Error:`, lastError);
          }
        } catch (err: unknown) {
          lastError = err instanceof Error ? err.message : 'Gemini fetch error';
        }
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
