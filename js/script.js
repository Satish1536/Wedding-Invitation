/* ---------- always start at the top after a refresh ---------- */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';          // do not jump back to where the visitor was
if (location.hash) history.replaceState(null, '', location.pathname + location.search);   // forget #families from the scroll arrow
scrollTo(0, 0);
addEventListener('pageshow', e => { if (e.persisted) scrollTo(0, 0); });           // also when the page comes back from the back/forward cache
/* =====================  EDIT YOUR DETAILS HERE  ===================== */
const HOME_MAP    = "https://maps.app.goo.gl/ickgWRhkXk3d8juX7?g_st=ac";        // everything except the 4 Dec wedding
const WEDDING_MAP = "https://maps.app.goo.gl/saQ8zwNm8c75mWrG8?g_st=aw";   // 4 Dec: Shidh Sagar Bhawan, Forbesganj
const CONFIG = {
  groom: { en:"Satish", hi:"सतीश", full:"Satish Kumar", fullHi:"सतीश कुमार",
           parents:{ en:"Son of Shrimati Sunita Devi & Shri Shyam Sunder Sah", hi:"श्रीमती सुनीता देवी एवं श्री श्याम सुन्दर साह के सुपुत्र" },
           place:{ en:"Bhorharhat, Ward No. 5, Fulkaha, Araria, Bihar 854310", hi:"भोरहरहाट, वार्ड नं. 5, फुलकाहा, अररिया, बिहार 854310" } },
  bride: { en:"Bharti", hi:"भारती", full:"Bharti Kumari", fullHi:"भारती कुमारी",
           parents:{ en:"Daughter of Late Shrimati Mamta Devi & Shri Rajkumar Sah", hi:"स्व. श्रीमती ममता देवी एवं श्री राजकुमार साह की सुपुत्री" },
           place:{ en:"Bagha, PO Suhird Nagar, Begusarai, Bihar", hi:"बघा, पो. सुहृद नगर, बेगूसराय, बिहार" } },
  families: { en:"The Sah families", hi:"साह परिवार" },
  city: { en:"Araria, Bihar", hi:"अररिया, बिहार" },
  hashtag: "#SatishWedsBharti",
  weddingDate: "2026-12-04T00:00:00+05:30",     // countdown target: the wedding day (add the muhurat time here when known)
  muhurat: null,                                  // e.g. { en:"Shubh Muhurat · 8:14 pm", hi:"शुभ मुहूर्त · रात्रि 8:14" }
  whatsapp: "917004081020",
  contacts: [   // name, relation to the groom, phone with country code
    { name:{en:"Jija Ji", hi:"जीजा जी"}, relation:{en:"Jija Ji of the Groom",         hi:"वर के जीजा जी"},   phone:"+919955088615" },
    { name:{en:"Kaushal", hi:"कौशल"},    relation:{en:"Younger Brother of the Groom", hi:"वर के छोटे भाई"}, phone:"+918292418719" },
    { name:{en:"Mannu",   hi:"मन्नू"},    relation:{en:"Older Brother of the Groom",   hi:"वर के बड़े भाई"}, phone:"+916203936509" }
  ],
  music: "music/wedding-music.mp3",
  gallery: [],
  // Events are date-only because times were not given. Add  time:{ en:"6:00 PM", hi:"सायं 6:00 बजे" }  to show a time.
  events: [
    { en:"Haldi & Mehndi", hi:"हल्दी व मेहंदी", date:"2026-12-02", icon:"bowl",
      meaning:{ en:"Turmeric and henna, with songs and blessings from family.", hi:"हल्दी, मेहंदी और परिवार के गीत व आशीर्वाद।" },
      venue:{ en:"Groom's Residence", hi:"वर निवास" }, addr:{ en:"Bhorharhat, Fulkaha, Araria, Bihar 854310", hi:"भोरहरहाट, फुलकाहा, अररिया, बिहार 854310" }, map:HOME_MAP },
    { en:"Satyanarayan Pooja, Kuan Pujan & Matkor", hi:"श्री सत्यनारायण पूजन, कुआँ पूजन एवं मटकोर", date:"2026-12-03", icon:"lotus",
      meaning:{ en:"A sacred pooja and the traditional rituals before the wedding.", hi:"पावन पूजन और विवाह से पहले की परंपरागत रस्में।" },
      venue:{ en:"Groom's Residence", hi:"वर निवास" }, addr:{ en:"Bhorharhat, Fulkaha, Araria, Bihar 854310", hi:"भोरहरहाट, फुलकाहा, अररिया, बिहार 854310" }, map:HOME_MAP },
    { en:"Shubh Vivah", hi:"शुभ विवाह", date:"2026-12-04", icon:"fire",
      meaning:{ en:"The wedding ceremony, with seven sacred steps around the holy fire.", hi:"पवित्र अग्नि के सात फेरों के साथ विवाह संस्कार।" },
      venue:{ en:"Shidh Sagar Bhawan", hi:"सिद्ध सागर भवन" }, addr:{ en:"Keshri Tola Road, Forbesganj, Bihar 854318", hi:"केशरी टोला रोड, फारबिसगंज, बिहार 854318" }, map:WEDDING_MAP },
    { en:"Wedding Reception & Dinner", hi:"वर-वधू स्वागत समारोह एवं स्वरुचि भोज", date:"2026-12-05", icon:"sun",
      time:{ en:"From 6:00 PM", hi:"सायं 6:00 बजे से" },
      meaning:{ en:"An evening to bless and welcome the newlyweds, followed by dinner.", hi:"नवदंपति को आशीर्वाद व स्वागत की शाम, साथ में भोज।" },
      venue:{ en:"Groom's Residence", hi:"वर निवास" }, addr:{ en:"Bhorharhat, Fulkaha, Araria, Bihar 854310", hi:"भोरहरहाट, फुलकाहा, अररिया, बिहार 854310" }, map:HOME_MAP }
  ]
};

const I18N = {
  en:{ introSmall:"Shubh Vivah", introSub:"You are warmly invited", open:"Open invitation", tapStart:"Touch or scroll to open", scrollLabel:"Scroll", contactsEyebrow:"Need help?", contactsTitle:"Contact us", contactsSub:"Copy a number, then paste it in your phone app to call.", copy:"Copy", copied:"Copied ✓", manual:"Now press Copy", tap:"Tap", together:"Together with their families",
    weds:"weds", scroll:"Scroll ↓", blessingsEyebrow:"With blessings", inviteHead:"Join us for the wedding",
    invite:"request the honour of your presence as we celebrate the union of our children, and seek your blessings as they begin their journey together.",
    countEyebrow:"Counting down", countHead:"Until the wedding day", days:"Days", hours:"Hours", mins:"Minutes", secs:"Seconds",
    evEyebrow:"The celebrations", evHead:"Wedding Festivities", directions:"Directions", save:"Save date", allCal:"Add all events to calendar",
    momEyebrow:"Our moments", momHead:"Before the big day", rsvpHead:"Will you join us?", by:"Kindly reply by",
    accept:"Joyfully accept", decline:"Regretfully decline", yourName:"Your name", guests:"Number of guests",
    attending:"Celebrating with us at", note:"A note for the couple", send:"Send RSVP on WhatsApp",
    foot:"Your presence is the greatest blessing we could ask for.", with:"With love ·",
    sapEyebrow:"Seven sacred steps", sapHead:"Saptapadi", sapLead:"Around the holy fire, the couple takes seven steps together, each one a promise.",
    step:"Step", steps:["Nourishment","Strength","Prosperity","Happiness","Family","Long life","Friendship"] },
  hi:{ introSmall:"शुभ विवाह", introSub:"आप सादर आमंत्रित हैं", open:"निमंत्रण खोलें", tapStart:"खोलने के लिए छुएँ या स्क्रॉल करें", scrollLabel:"नीचे स्क्रॉल करें", contactsEyebrow:"सहायता चाहिए?", contactsTitle:"संपर्क करें", contactsSub:"नंबर कॉपी करें, फिर फ़ोन ऐप में पेस्ट कर कॉल करें।", copy:"कॉपी", copied:"कॉपी हो गया ✓", manual:"अब कॉपी करें", tap:"छुएँ", together:"अपने परिवारों के साथ",
    weds:"परिणय", scroll:"नीचे जाएँ ↓", blessingsEyebrow:"आशीर्वाद सहित", inviteHead:"विवाह में पधारें",
    invite:"अपने बच्चों के विवाह के शुभ अवसर पर आपकी गरिमामयी उपस्थिति एवं आशीर्वाद की कामना करते हैं।",
    countEyebrow:"उलटी गिनती", countHead:"विवाह के दिन तक", days:"दिन", hours:"घंटे", mins:"मिनट", secs:"सेकंड",
    evEyebrow:"उत्सव", evHead:"विवाह समारोह", directions:"रास्ता", save:"तिथि सहेजें", allCal:"सभी कार्यक्रम कैलेंडर में जोड़ें",
    momEyebrow:"हमारे पल", momHead:"शुभ दिन से पहले", rsvpHead:"क्या आप पधारेंगे?", by:"कृपया उत्तर दें:",
    accept:"सहर्ष स्वीकार", decline:"क्षमा सहित अस्वीकार", yourName:"आपका नाम", guests:"अतिथियों की संख्या",
    attending:"आप किन समारोहों में आएँगे", note:"वर-वधू के लिए संदेश", send:"WhatsApp पर उत्तर भेजें",
    foot:"आपकी उपस्थिति ही हमारे लिए सबसे बड़ा आशीर्वाद है।", with:"स्नेह सहित ·",
    sapEyebrow:"सात पावन वचन", sapHead:"सप्तपदी", sapLead:"पवित्र अग्नि के सम्मुख वर-वधू सात कदम साथ चलते हैं, हर कदम एक वचन।",
    step:"वचन", steps:["अन्न","बल","धन","सुख","परिवार","दीर्घायु","मित्रता"] }
};
const ICONS = {
  bowl:'<path d="M6 24h36c0 10-8 18-18 18S6 34 6 24Z"/><path d="M15 18c2-4 6-4 8 0M26 16c2-4 6-4 8 0"/>',
  paisley:'<path d="M24 5C37 11 41 30 29 40 21 46 10 40 12 30 14 22 22 22 22 16 22 12 23 9 24 5Z"/><circle cx="24" cy="30" r="2.5"/>',
  sun:'<circle cx="24" cy="24" r="8"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4"/>',
  fire:'<path d="M24 4C32 14 36 20 32 30 30 36 26 40 24 40 20 40 14 36 14 30 14 24 20 20 20 14 20 10 22 7 24 4Z"/><path d="M24 22C27 27 28 30 24 36 20 30 21 27 24 22Z"/><path d="M8 44h32"/>',
  lotus:'<path d="M24 42C14 38 8 28 10 18 18 20 22 28 24 42ZM24 42C34 38 40 28 38 18 30 20 26 28 24 42ZM24 42C18 32 18 20 24 8 30 20 30 32 24 42Z"/>'
};
const EV_ICONS = ['bowl','paisley','sun','fire','lotus'];
/* ==================================================================== */

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const C = CONFIG, wd = new Date(C.weddingDate), pad = n => String(n).padStart(2,'0');
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let lang = 'en';
try { lang = localStorage.getItem('lang') || 'en'; } catch(e){}
const t = k => I18N[lang][k];
const loc = () => lang === 'hi' ? 'hi-IN' : 'en-IN';
const fmt = (d,o) => new Date(d).toLocaleDateString(loc(), o);

/* ---------- generated artwork (original) ---------- */
const lotus = () => {
  let s = '<circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width=".6" stroke-dasharray="2 3"/>';
  for (let i = 0; i < 8; i++) s += `<path d="M50 50C40 36 40 18 50 6 60 18 60 36 50 50Z" transform="rotate(${i*45} 50 50)" fill="none" stroke="currentColor" stroke-width="1"/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M50 50C45 42 45 32 50 24 55 32 55 42 50 50Z" transform="rotate(${i*45+22.5} 50 50)" fill="#e8731a" opacity=".55"/>`;
  return s + '<circle cx="50" cy="50" r="5" fill="#c1272d"/>';
};
$$('.lotus').forEach(e => e.innerHTML = lotus());
$$('.swastik').forEach(e => e.innerHTML = '<path d="M20 4V36M4 20H36M20 4H32M36 20V32M20 36H8M4 20V8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square"/><g fill="currentColor"><circle cx="28" cy="12" r="1.8"/><circle cx="28" cy="28" r="1.8"/><circle cx="12" cy="28" r="1.8"/><circle cx="12" cy="12" r="1.8"/></g>');
// ornate gold corners on framed boxes
$$('.frame').forEach(f => ['tl','tr','bl','br'].forEach(c => f.insertAdjacentHTML('beforeend',
  `<svg class="corner ${c}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 46V12Q2 2 12 2H46"/><path d="M9 40V16Q9 9 16 9H40"/><circle cx="16" cy="16" r="3" fill="currentColor" stroke="none"/></svg>`)));

// toran
function buildToran() {
  const el = $('#toran'), n = Math.ceil((innerWidth || document.documentElement.clientWidth || 420) / 34);
  el.querySelectorAll('.st').forEach(x => x.remove());
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div'); s.className = 'st';
    s.style.left = (i * 34 + 8) + 'px'; s.style.animationDelay = (i % 6) * -.6 + 's';
    s.innerHTML = '<i></i>'.repeat(1 + (i % 3)) + '<i></i>';
    el.appendChild(s);
  }
}
buildToran(); addEventListener('resize', buildToran);
// petals
(() => {
  const box = $('#petals'), cols = ['#e8731a','#f59e0b','#fbbf24','#c1272d'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('i'); p.className = 'petal';
    p.style.left = Math.random()*100 + '%'; p.style.background = cols[i % 4];
    p.style.animationDuration = (9 + Math.random()*9) + 's'; p.style.animationDelay = (-Math.random()*14) + 's';
    box.appendChild(p);
  }
})();
// diyas
$('#diyas').innerHTML = Array.from({length:3}, () => `<svg class="diya" viewBox="0 0 60 50">
  <path class="flame" d="M30 2C38 12 38 20 30 26 22 20 22 12 30 2Z" fill="#ffd54a"/><path class="flame" d="M30 12C34 17 34 21 30 24 26 21 26 17 30 12Z" fill="#ff8a1f"/>
  <path d="M6 28h48c-2 12-12 20-24 20S8 40 6 28Z" fill="#c8942b" stroke="#ffe7a3" stroke-width="1"/></svg>`).join('');

/* ---------- render (re-runs on language change) ---------- */
function render() {
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  const g = C.groom[lang], b = C.bride[lang];
  document.title = `${g} & ${b} · ${t('introSmall')}`;
  $('#introG').textContent = g; $('#introB').textContent = b; $('#gateNames').textContent = `${g} & ${b}`;
  $('#introDate').innerHTML = `<span class="dw">${fmt(wd,{weekday:'long'})}</span>${fmt(wd,{day:'numeric',month:'long',year:'numeric'})}`;
  $('#introCity').textContent = C.city[lang]; $('#introFam').textContent = C.families[lang];
  $('#inviteText').textContent = `${C.families[lang]} ${t('invite')}`;
  $('#cards').innerHTML = [C.groom,C.bride].map((p,i) =>
    `<div class="pcard reveal ${i?'r':'l'}"><div class="nm foil">${esc(p[lang])}</div><h3>${esc(lang==='hi'?p.fullHi:p.full)}</h3><p>${esc(p.parents[lang])}</p><p class="loc">${esc(p.place[lang])}</p></div>`).join('');
  $('#muhurat').style.display = C.muhurat ? '' : 'none'; if (C.muhurat) $('#muhurat').textContent = C.muhurat[lang];
  $('#fNames').textContent = `${g} & ${b}`; $('#fTag').textContent = C.hashtag; $('#fFam').textContent = `${t('with')} ${C.families[lang]}`;

  $('#tl').innerHTML = C.events.map((e,i) => {
    const day = new Date(e.date + 'T00:00:00'), next = new Date(day.getTime() + 864e5);
    const ymd = x => `${x.getFullYear()}${pad(x.getMonth()+1)}${pad(x.getDate())}`;
    const cal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(`${e.en} · ${C.groom.en} & ${C.bride.en}`) +
      `&dates=${ymd(day)}/${ymd(next)}&location=` + encodeURIComponent(`${e.venue.en}, ${e.addr.en}`);
    return `<div class="ev reveal ${i%2?'r':'l'}">
      <div class="tilak"><div class="ic"><svg viewBox="0 0 48 48">${ICONS[e.icon] || ICONS.lotus}</svg></div>
        <div><b>${day.getDate()}</b><span>${fmt(day,{month:'short'})}</span></div></div>
      <div><h3>${esc(e[lang])}</h3>
      <p class="meaning">${esc(e.meaning[lang])}</p>
      <div class="when">${fmt(day,{weekday:'long'})}${e.time ? ' · ' + esc(e.time[lang]) : ''}</div>
      <div class="venue">${esc(e.venue[lang])}</div><div class="addr">${esc(e.addr[lang])}</div>
      <div class="btns"><a class="btn" target="_blank" rel="noopener" href="${e.map}">${t('directions')}</a>
      <a class="btn" target="_blank" rel="noopener" href="${cal}">${t('save')}</a></div></div></div>`;
  }).join('');

  $$('.lang button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
  renderContacts();
  observe();
}
const ics = d => { const x = new Date(d); return `${x.getFullYear()}${pad(x.getMonth()+1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`; };

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), {threshold:.12});
function observe(){ $$('.reveal:not(.in)').forEach(el => io.observe(el)); }

/* ---------- interactions ---------- */
$$('.lang button').forEach(b => b.onclick = () => { lang = b.dataset.l; try{localStorage.setItem('lang',lang)}catch(e){} render(); setWhatsApp(); });


// WhatsApp button: opens a chat with the number in CONFIG.whatsapp
function setWhatsApp() {
  const msg = lang === 'hi' ? `नमस्ते! मुझे ${C.groom.hi} और ${C.bride.hi} के विवाह का निमंत्रण मिला है।`
                            : `Namaste! I received the wedding invitation of ${C.groom.en} & ${C.bride.en}.`;
  $('#waBtn').href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
}
setWhatsApp();

// download all events as .ics
if ($('#allIcs')) $('#allIcs').onclick = () => {
  const stamp = ics(new Date());
  const body = C.events.map((e,i) => ['BEGIN:VEVENT',`UID:${i}-${stamp}@wedding`,`DTSTAMP:${stamp}`,
    `DTSTART;TZID=Asia/Kolkata:${ics(e.start)}`,`DTEND;TZID=Asia/Kolkata:${ics(e.end)}`,
    `SUMMARY:${e.en} - ${C.groom.en} & ${C.bride.en}`,`LOCATION:${e.venue}\\, ${e.addr}`,'END:VEVENT'].join('\r\n')).join('\r\n');
  const blob = new Blob([`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Wedding//EN\r\n${body}\r\nEND:VCALENDAR`], {type:'text/calendar'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'wedding-events.ics'; a.click();
};

// countdown
(function tick(){
  const ms = Math.max(0, wd - Date.now());
  $('#cd').textContent = Math.floor(ms/864e5); $('#ch').textContent = pad(Math.floor(ms/36e5)%24);
  $('#cm').textContent = pad(Math.floor(ms/6e4)%60); $('#cs').textContent = pad(Math.floor(ms/1e3)%60);
  setTimeout(tick,1000);
})();

// music (optional)
let audio = null, userPaused = false;
const MUSIC_VOL = 0.22;   // soft background level (0 to 1)
function fadeIn(){ if(!audio) return; audio.volume = 0; let v = 0; const s = setInterval(() => { v = Math.min(MUSIC_VOL, v + 0.01); audio.volume = v; if (v >= MUSIC_VOL) clearInterval(s); }, 120); }
if (C.music) { audio = new Audio(C.music); audio.loop = true; audio.volume = 0; $('#mute').style.display = 'block';
  $('#mute').onclick = () => {
    if (audio.paused) { userPaused = false; audio.play().then(fadeIn).catch(() => {}); $('#mute').textContent = '♫'; }
    else { userPaused = true; audio.pause(); $('#mute').textContent = '♪'; }
  }; }

// music starts as soon as the browser allows it; never restarts after the visitor mutes it
function startMusic() {
  if (!audio || userPaused || !audio.paused) return;
  audio.play().then(() => { $('#mute').textContent = '♫'; fadeIn(); }).catch(() => {});
}
// Tap, click or key press: always allowed by browsers, so the music starts.
['click', 'touchend', 'pointerup', 'keydown'].forEach(ev => addEventListener(ev, startMusic, { passive: true }));
// A real scroll (mouse wheel or swipe) also tries to start it. Browsers that allow sound without a tap (for example after the
// visitor has used the site before) will play it; the others refuse quietly and the first tap starts it instead.
let lastScrollTry = 0;
['wheel', 'touchmove', 'touchstart', 'scroll'].forEach(ev => addEventListener(ev, () => {
  const now = Date.now(); if (now - lastScrollTry < 1200) return; lastScrollTry = now;
  startMusic();
}, { passive: true }));

// Tap-to-open gate: the tap is the user gesture browsers require, so the music starts reliably.
const gate = $('#gate');
document.documentElement.classList.add('gated');
$('#gateOpen').onclick = () => {
  startMusic();
  gate.classList.add('open'); document.documentElement.classList.remove('gated');
  scrollTo({ top: 0, behavior: 'instant' });
  setTimeout(() => gate.remove(), 1700);
};

// Stop the music when the page is hidden (browser minimised, app switched, tab changed) and bring it back on return.
let resumeOnReturn = false;
document.addEventListener('visibilitychange', () => {
  if (!audio) return;
  if (document.hidden) {
    if (!audio.paused) { resumeOnReturn = true; audio.pause(); $('#mute').textContent = '♪'; }
  } else if (resumeOnReturn && !userPaused) {
    resumeOnReturn = false;
    audio.play().then(() => { $('#mute').textContent = '♫'; fadeIn(); }).catch(() => {});
  }
});
addEventListener('pagehide', () => { if (audio) audio.pause(); });

/* ---------- first page: scroll cue ---------- */
// The cover is just the top of the page (no overlay, no fade). Until the visitor scrolls, the page gives a small
// "peek" every few seconds (it lifts a little, then settles back) so it is clear there is more below.
let userMoved = false, peeking = false;
['wheel', 'touchstart', 'touchmove', 'keydown', 'pointerdown'].forEach(ev => addEventListener(ev, () => { userMoved = true; }, { passive: true }));
const easeInOut = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
function tweenTo(to, ms, done) {            // our own animation, so it always finishes and never fights the visitor
  const from = scrollY, t0 = performance.now();
  (function step() {
    if (userMoved) return done(false);       // the visitor took over: leave the page where they put it
    const t = Math.min(1, (performance.now() - t0) / ms);
    scrollTo({ top: from + (to - from) * easeInOut(t), behavior: 'instant' });
    if (t < 1) requestAnimationFrame(step); else done(true);
  })();
}
function peek() {
  if (userMoved || peeking || scrollY > 4 || document.hidden || !cm.hidden || gate.isConnected) return;
  peeking = true;
  tweenTo(30, 420, ok => {
    if (!ok) { peeking = false; return; }
    setTimeout(() => tweenTo(0, 520, () => { peeking = false; }), 160);
  });
}
setTimeout(() => { peek(); setInterval(peek, 5500); }, 2500);

/* ---------- contacts pop-up: copy a number, paste it in the phone app ---------- */
const fmtPhone = p => { const m = p.match(/^\+91(\d{5})(\d{5})$/); return m ? `+91 ${m[1]} ${m[2]}` : p; };
function renderContacts() {
  $('#clist').innerHTML = C.contacts.map((c,i) => `<div class="ccard"><div class="cname">${esc(c.name[lang])}</div><div class="crel">${esc(c.relation[lang])}</div>
    <div class="crow"><span class="cnum">${esc(fmtPhone(c.phone))}</span><button type="button" class="ccopy" data-i="${i}">${t('copy')}</button></div></div>`).join('');
  $$('.ccopy').forEach(b => b.onclick = () => copyNumber(b));
}
async function copyNumber(b) {
  const num = C.contacts[b.dataset.i].phone;            // copied without spaces so any phone app accepts it
  let ok = false;
  try { await navigator.clipboard.writeText(num); ok = true; }
  catch (e) {
    const ta = document.createElement('textarea'); ta.value = num; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select(); try { ok = document.execCommand('copy'); } catch (_) {} ta.remove();
  }
  if (ok) { b.textContent = t('copied'); b.classList.add('done'); setTimeout(() => { b.textContent = t('copy'); b.classList.remove('done'); }, 2000); }
  else {                                                // clipboard blocked: select the number so it can be copied by hand
    const numEl = b.closest('.crow').querySelector('.cnum'), r = document.createRange(); r.selectNodeContents(numEl);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    b.textContent = t('manual'); setTimeout(() => { b.textContent = t('copy'); }, 3500);
  }
}
const cm = $('#cmodal');
function openContacts()  { cm.hidden = false; $('#cClose').focus(); }
function closeContacts() { cm.hidden = true; $('#contactBtn').focus(); }
$('#contactBtn').onclick = openContacts; $('#cClose').onclick = closeContacts;
cm.addEventListener('click', e => { if (e.target === cm) closeContacts(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !cm.hidden) closeContacts(); });

render();