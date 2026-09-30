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
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY belum dikonfigurasi pada server (.env.local).' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Pesan tidak valid atau kosong.' },
        { status: 400 }
      );
    }

    // Format chat history untuk format OpenAI / Groq
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; text?: string; content?: string }) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'assistant' : 'user',
        content: m.text || m.content || '',
      })),
    ];

    // Prioritas model yang tersedia di Groq
    const candidateModels = [
      process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'qwen/qwen3.8-27b',
    ];

    let reply = '';
    let lastError = '';

    for (const model of Array.from(new Set(candidateModels))) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
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
        lastError = err instanceof Error ? err.message : 'Fetch error';
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
