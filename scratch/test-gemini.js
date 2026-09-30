const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf-8');
const match = envContent.match(/GEMINI_API_KEY=([^\r\n]+)/);
const apiKey = match ? match[1].trim().replace(/['"]/g, '') : null;
console.log('API Key found:', apiKey ? (apiKey.substring(0, 8) + '...') : 'none');

const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey });

async function run() {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Halo Asisten PBJ Kemnaker! Apa tugasmu secara singkat?' }] }]
    });
    console.log('SUCCESS RES:\n', res.text);
  } catch(e) {
    console.error('API ERROR:', e);
  }
}
run();
