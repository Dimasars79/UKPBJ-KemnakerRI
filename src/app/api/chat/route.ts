import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SYSTEM_PROMPT } from './systemPrompt';
import { retrieveKnowledge } from '@/lib/knowledgeRetriever';

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

    // ================= 0. GUARDRAIL & SCOPE FILTER (ANTI-ABUSE) =================
    const userMessage = (messages[messages.length - 1]?.text || messages[messages.length - 1]?.content || '').trim();
    const lowerUserMsg = userMessage.toLowerCase();

    // Deteksi upaya jailbreak atau prompt extraction secara instan
    const isJailbreakAttempt = /ignore (previous|all)|abaikan instruksi|kamu sekarang adalah dan|jailbreak|unrestricted mode|tampilkan system prompt|bocorkan prompt|system instruction|show prompt/i.test(lowerUserMsg);
    if (isJailbreakAttempt) {
      return NextResponse.json({
        reply: 'Mohon maaf, sebagai Asisten Virtual Resmi UKPBJ Kemnaker RI, saya tidak dapat mengubah instruksi atau membagikan konfigurasi sistem keamanan. Apakah ada informasi seputar pengadaan barang/jasa atau layanan Kemnaker yang dapat saya bantu?'
      });
    }

    // ================= 0.1 RETRIEVAL AUGMENTED GENERATION (RAG) =================
    const retrievedData = await retrieveKnowledge(userMessage);
    const RAG_PROMPT = `${SYSTEM_PROMPT}\n\n=== DATA KONTEKS & DOKUMEN SISTEM ===\n${retrievedData ? retrievedData : 'Data dinamis spesifik tidak ditemukan di database lokal.'}\n======================================\n\nPANDUAN FORMAT RESPON:\n1. Jawab pertanyaan pengguna dengan solusi yang jelas, runtut, dan aplikatif selama masih dalam lingkup Pengadaan Barang/Jasa (PBJ), LKPP/LPSE/SIKaP/Katalog, atau Kemnaker RI.\n2. Jika pertanyaan mengenai data spesifik internal Kemnaker (paket tender, jadwal agenda, nama pejabat/satker), utamakan rujukan dari dokumen konteks di atas.\n3. Jika pertanyaan mengenai SOP (Standar Operasional Prosedur), alur kerja, tata cara, regulasi, panduan teknis, dan layanan ekosistem pengadaan nasional (LPSE/SPSE, LKPP, SIKaP, E-Katalog V6, SiRUP, Bela Pengadaan, Sertifikasi PBJ, SIAPkerja Kemnaker), gunakan pemahaman ahli SOP Anda secara luas untuk menjabarkan aktor pelaksana, dokumen syarat, tahapan kerja runtut, dan dokumen output akhir beserta tautan portal resminya. JANGAN hanya terpaku pada teks di database lokal.\n4. PERINGATAN BATASAN DOMAIN: Jika pengguna bertanya hal di luar pengadaan dan layanan Kemnaker (seperti coding umum, tugas sekolah, resep, politik praktis, hiburan, curhat), WAJIB TOLAK DENGAN SOPAN menggunakan format penolakan resmi yang telah ditentukan.\n5. Gunakan Markdown yang rapi dengan penomoran atau poin-poin agar mudah dipahami.`;

    // ================= 1. JALUR UTAMA: GOOGLE AI STUDIO (MULTI-ACCOUNT ROTATION & FAILOVER) =================
    if (geminiKeys.length > 0) {
      // Model ultra-cepat (flash-lite) diutamakan untuk respons instan < 1.5 detik
      const geminiCandidateModels = [
        process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
        'gemini-3.5-flash-lite',
        'gemini-3.1-flash-lite-preview',
        'gemini-3.1-flash-lite',
        'gemini-3.6-flash',
        'gemini-flash-latest',
      ];

      // Format & pangkas history ke 4 pesan terakhir agar payload ringan & proses lebih cepat
      const trimmedMessages = messages.slice(-4);
      const geminiContents = trimmedMessages.map((m: { role: string; text?: string; content?: string }) => ({
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
            // Timeout 8.5 detik per percobaan untuk mengakomodasi live search grounding
            // 1. Coba request dengan live Google Search Grounding
            let response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: AbortSignal.timeout(8500),
                body: JSON.stringify({
                  systemInstruction: {
                    parts: [{ text: RAG_PROMPT }],
                  },
                  contents: geminiContents,
                  tools: [
                    { googleSearch: {} }
                  ],
                  generationConfig: {
                    temperature: 0.2,
                    maxOutputTokens: 1500,
                  },
                }),
              }
            );

            // 2. Jika akun Free Tier belum memiliki kuota Google Search (butuh billing pay-as-you-go),
            // lakukan fallback instan tanpa tools search agar tetap menjawab dengan RAG internal tanpa eror ke user.
            if (!response.ok) {
              const errCheck = await response.clone().json().catch(() => ({}));
              const checkMsg = (errCheck?.error?.message || '').toLowerCase();
              if (checkMsg.includes('quota') || checkMsg.includes('billing') || checkMsg.includes('resourceexhausted') || response.status === 429 || response.status === 400) {
                console.warn(`[Search Grounding Fallback] Kuota pencarian web tidak tersedia pada key [${keyMask}]. Beralih otomatis ke mode RAG internal...`);
                response = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    signal: AbortSignal.timeout(6000),
                    body: JSON.stringify({
                      systemInstruction: {
                        parts: [{ text: RAG_PROMPT }],
                      },
                      contents: geminiContents,
                      generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 1200,
                      },
                    }),
                  }
                );
              }
            }

            if (response.ok) {
              const data = await response.json();
              let textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textResponse) {
                // Ekstrak rujukan sumber web dari groundingMetadata jika hasil pencarian internet digunakan
                const groundingChunks = data?.candidates?.[0]?.groundingMetadata?.groundingChunks;
                if (Array.isArray(groundingChunks) && groundingChunks.length > 0) {
                  const webSources = groundingChunks
                    .map((c: { web?: { uri?: string; title?: string } }) => c?.web)
                    .filter((w: { uri?: string; title?: string } | undefined): w is { uri: string; title: string } => Boolean(w?.uri && w?.title));

                  // Ambil hingga 3 sumber unik resmi
                  const uniqueSources = Array.from(new Map(webSources.map(s => [s.uri, s])).values()).slice(0, 3);
                  const filteredSources = uniqueSources.filter(s => !textResponse?.includes(s.uri));
                  if (filteredSources.length > 0) {
                    textResponse += '\n\n**📌 Rujukan & Sumber Terkait:**\n' + filteredSources.map(s => `- [${s.title}](${s.uri})`).join('\n');
                  }
                }

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
        { role: 'system', content: RAG_PROMPT },
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
