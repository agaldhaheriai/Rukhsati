# رخصتي | Rukhsati — وكيل رخص أبوظبي الصوتي

## التشغيل (مرة واحدة على جهازك)
1. ثبّتي Node.js 18+ ثم داخل المجلد:  npm install
2. انسخي .env.example باسم .env وضعي مفتاح ElevenLabs (لا ترفعيه للاستضافة ولا GitHub).
3. node create-agent.mjs  ← ينشئ وكيلين (مريم + راشد) بقاعدة المعرفة knowledge.md ويكتب معرفاتهما في config.js

## النشر
ارفعي فقط: index.html + config.js إلى الاستضافة (يلزم HTTPS للميكروفون).
في Median.co: فعّلي صلاحية الميكروفون (Microphone permission).

## تخصيص
- أصوات خليجية: ضعي VOICE_FEMALE / VOICE_MALE في .env من Voice Library ثم أعيدي التشغيل.
- تحديث المعلومات: عدّلي knowledge.md ثم أعيدي node create-agent.mjs

## الأيقونة والباركود
- icons/ : أيقونة التطبيق بكل المقاسات (icon-1024.png لـ Median.co و App Store / Google Play).
- barcode.html : صفحة الباركود — تولّد رمز QR تلقائياً لرابط التطبيق في نفس المجلد على GitHub Pages،
  أو لأي رابط عبر: barcode.html?url=https://your-link
