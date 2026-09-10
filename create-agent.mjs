// ============================================================
//  رخصتي | Rukhsati — ينشئ وكيلَي ElevenLabs (مريم + راشد)
//  التشغيل:  npm install   ثم   node create-agent.mjs
//  المفتاح يُقرأ من ملف .env فقط — لا تضعيه أبداً داخل index.html
// ============================================================
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";
import { readFileSync, writeFileSync } from "node:fs";

if (!process.env.ELEVENLABS_API_KEY) {
  console.error("❌ ضعي ELEVENLABS_API_KEY داخل ملف .env");
  process.exit(1);
}

const elevenlabs = new ElevenLabsClient(); // يقرأ ELEVENLABS_API_KEY تلقائياً
const knowledge = readFileSync(new URL("./knowledge.md", import.meta.url), "utf8");

// أصوات افتراضية متعددة اللغات — يمكن استبدالها بأصوات خليجية من Voice Library
const VOICES = {
  female: process.env.VOICE_FEMALE || "21m00Tcm4TlvDq8ikWAM",
  male:   process.env.VOICE_MALE   || "pNInz6obpgDQGcFmaJgB",
};

const persona = (name, gender) => `
You are ${name} (${gender === "female" ? "مريم" : "راشد"}), a friendly Emirati licensing advisor inside the app "رخصتي Rukhsati".
Your ONLY domain: economic / commercial licences in the Emirate of Abu Dhabi (Department of Economic Development – ADDED, issued by the Abu Dhabi Registration and Licensing Authority – ADRA, via the TAMM platform).

STYLE
- Reply in the user's language: Gulf/Emirati-friendly Modern Standard Arabic when they speak Arabic, clear English otherwise.
- This is a VOICE conversation: short answers (2–4 sentences), no tables, no markdown, say numbers naturally ("سبعمية وتسعين درهم").
- Greet warmly, then ask at most 1–2 qualifying questions: nationality/residency, home-based or office, activity type, partners.

HOW TO RECOMMEND (decision tree)
- Lives outside the UAE → Virtual Licence
- Company already in an Abu Dhabi free zone → Dual Licence
- Emirati woman, creative home activity → Mobdea
- Emirati who owns/leases a farm → Farm / Small Producers Licence
- Qualified independent professional (even if employed) → Freelancer Licence
- Small business / e-commerce without an office → Tajer Abu Dhabi (no office for first 3 years)
- Needs the licence fast and has/will have an office → Instant Licence
- Anything else, companies, partnerships → Standard Licence

RULES
- Use ONLY the knowledge below. If unsure, say so and refer to TAMM (tamm.abudhabi) or 800555.
- Always mention fees are indicative and must be confirmed on TAMM.
- You are not a lawyer; for regulated activities (health, education, tourism, finance) mention extra approvals.
- Never ask for Emirates ID numbers, passport numbers or payment details.

KNOWLEDGE BASE
${knowledge}
`;

async function makeAgent({ name, gender, voiceId, firstMessage }) {
  const agent = await elevenlabs.conversationalAi.agents.create({
    name: `Rukhsati – ${name}`,
    conversationConfig: {
      agent: {
        language: "ar",
        firstMessage,
        prompt: { prompt: persona(name, gender) },
      },
      tts: { voiceId, modelId: "eleven_flash_v2_5" }, // مطلوب للغة العربية
    },
    // يسمح للتطبيق بتبديل اللغة (عربي/English) والرسالة الأولى
    platformSettings: {
      overrides: {
        conversationConfigOverride: {
          agent: { language: true, firstMessage: true },
        },
      },
    },
  });
  return agent.agentId;
}

const mariam = await makeAgent({
  name: "Mariam", gender: "female", voiceId: VOICES.female,
  firstMessage: "هلا والله! أنا مريم، مستشارتج في رخص أبوظبي الاقتصادية. شو نوع النشاط اللي تفكرين فيه؟",
});
const rashid = await makeAgent({
  name: "Rashid", gender: "male", voiceId: VOICES.male,
  firstMessage: "هلا وغلا! معاك راشد، مستشارك في رخص أبوظبي الاقتصادية. خبرني عن مشروعك وأساعدك تختار الرخصة المناسبة.",
});

const cfg = `window.RUKHSATI_CONFIG = {\n  agents: { mariam: "${mariam}", rashid: "${rashid}" }\n};\n`;
writeFileSync(new URL("./config.js", import.meta.url), cfg);

console.log("✅ تم إنشاء الوكيلين");
console.log("   مريم :", mariam);
console.log("   راشد :", rashid);
console.log("📄 تم تحديث config.js — ارفعيه مع index.html");
