# إعداد مريم وراشد من لوحة ElevenLabs (بدون Node)

**الأسهل: وكيل واحد** — سوّي الخطوات مرة وحدة (لمريم أو راشد). ولو تبين الاثنين كرّريها مرتين.

1. ادخلي elevenlabs.io ← من القائمة الجانبية **Agents** ← **Create agent** (أو + New agent) ← **Blank template**.
2. الاسم: `Rukhsati – Mariam` (أو `Rukhsati – Rashid`).
3. **Agent language:** Arabic. وأضيفي **English** في Additional languages
   (فعّلي أداة **Language detection** إذا ظهرت) عشان يرد بالإنجليزي إذا المستخدم تكلم إنجليزي.
4. **First message:** انسخي من الأسفل.
5. **System prompt:** انسخي محتوى `mariam-prompt.txt` أو `rashid-prompt.txt` كاملاً.
6. **Voice:** اختاري صوت نسائي لمريم وصوت رجالي لراشد (يفضّل صوت عربي/خليجي من Voice Library).
   إذا طلب اختيار موديل، اختاري **Flash v2.5** أو **Turbo v2.5** (يدعم العربية).
7. **Knowledge base:** Add document ← Upload file ← ارفعي `knowledge.md` (أو ملف الـPDF).
8. اضغطي **Save / Publish**.
9. من أعلى الصفحة انسخي **Agent ID** (يبدأ بـ `agent_`).
10. تأكدي إن الوكيل **Public** (في تبويب Security: لا تفعّلي Enable authentication).

## الرسالة الأولى
- مريم: هلا والله! أنا مريم، مستشارتج في رخص أبوظبي الاقتصادية. شو نوع النشاط اللي تفكرين فيه؟
- راشد: هلا وغلا! معاك راشد، مستشارك في رخص أبوظبي الاقتصادية. خبرني عن مشروعك وأساعدك تختار الرخصة المناسبة.

## آخر خطوة: config.js
افتحي `config.js` بالـNotepad (أو من GitHub بزر ✏️) وحطي المعرف:

    window.RUKHSATI_CONFIG = {
      agent: "agent_xxxxxxxx",
      persona: "mariam"   // أو "rashid" حسب الوكيل اللي سويتيه
    };

احفظي وارفعي على GitHub — خلاص التطبيق يشتغل.
