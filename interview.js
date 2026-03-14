/* ==============================================
   CruiseInterviewAcademy — interview.js
   Voice recognition, scoring, practice mode,
   simulation mode, PDF generation (jsPDF)
   ============================================== */

// ================================================================
// STATE
// ================================================================
let currentMode    = 'practice';
let currentDept    = 'all';
let currentIndex   = 0;
let filteredQs     = [];
let isListening    = false;
let recognition    = null;
let simTimer       = null;
let simTimeLeft    = 60;
let userTranscript = '';
let sessionScores  = JSON.parse(localStorage.getItem('cia_scores') || '{}');
let isPremium      = JSON.parse(localStorage.getItem('cia_premium') || 'false');
const FREE_LIMIT   = 4;

const ENCOURAGEMENTS = [
  "Great effort! Keep practicing! 💪",
  "You're improving with every attempt! 🚀",
  "That's the spirit! Cruise recruiters will love your confidence! ⚓",
  "Excellent! One step closer to boarding! 🚢",
  "Keep going! Your dream job is within reach! 🌊",
  "That's a strong answer! Polish those keywords! 🔑",
  "Impressive! Your English is sounding more natural! 🎤",
  "You've got this! Recruiters are looking for exactly this energy! ✨"
];

// ================================================================
// INIT
// ================================================================
document.addEventListener('DOMContentLoaded', function () {
  buildFilteredList();
  loadQuestion(0);
  loadVoices();
  updateProgressStats();
  setupRateSlider();
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
});

// ================================================================
// QUESTION MANAGEMENT
// ================================================================
function buildFilteredList() {
  filteredQs = currentDept === 'all' ? [...QUESTIONS] : QUESTIONS.filter(q => q.dept === currentDept);
  document.getElementById('qTotal').textContent = filteredQs.length;
}

function filterDept(dept) {
  currentDept  = dept;
  currentIndex = 0;
  buildFilteredList();
  loadQuestion(0);
  document.querySelectorAll('.dept-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

function loadQuestion(idx) {
  if (!filteredQs.length) return;
  currentIndex = Math.max(0, Math.min(idx, filteredQs.length - 1));
  const q = filteredQs[currentIndex];

  document.getElementById('qCurrent').textContent   = currentIndex + 1;
  document.getElementById('qNumber').textContent    = String(q.id).padStart(2, '0');
  document.getElementById('qText').textContent      = q.question;
  document.getElementById('qDeptBadge').textContent = q.deptLabel;

  resetAnswerUI();

  const isLocked = !isPremium && q.id > FREE_LIMIT;
  renderModelAnswer(q, isLocked);
  clearSimTimer();
  if (currentMode === 'simulation') startSimTimer();
}

function nextQuestion() {
  if (currentIndex < filteredQs.length - 1) {
    loadQuestion(currentIndex + 1);
  } else {
    showEncouragement("🏆 You've completed all questions in this set! Amazing work!");
  }
}

function prevQuestion() {
  loadQuestion(currentIndex - 1);
}

function resetAnswerUI() {
  userTranscript = '';
  isListening    = false;
  const micBtn   = document.getElementById('micBtn');
  if (micBtn) {
    micBtn.classList.remove('listening');
    document.getElementById('micLabel').textContent = 'Tap to speak';
  }
  document.getElementById('transcriptBox').style.display   = 'none';
  document.getElementById('transcriptText').textContent    = '';
  document.getElementById('scoreWrap').style.display       = 'none';
  document.getElementById('comparisonWrap').style.display  = 'none';
  document.getElementById('retryBtn').style.display        = 'none';
  document.getElementById('happyBtn').style.display        = 'none';
  document.getElementById('answerStatus').textContent      = 'Press the microphone and speak your answer in English';
  document.getElementById('modelAnswerContent').style.display = 'none';
  const toggleBtn = document.getElementById('toggleAnswerBtn');
  if (toggleBtn) toggleBtn.textContent = '👁 Show Model Answer';
  if (recognition) { try { recognition.stop(); } catch(e){} recognition = null; }
  const enc = document.querySelector('.encouragement');
  if (enc) enc.remove();
}

// ================================================================
// RENDER MODEL ANSWER
// ================================================================
function renderModelAnswer(q, isLocked) {
  document.getElementById('modelAnswerBox').textContent = q.modelAnswer;
  document.getElementById('tipText').textContent        = q.tip;
  document.getElementById('fuQuestion').textContent     = q.followUp;
  document.getElementById('fuAnswer').textContent       = q.followUpAnswer;
  document.getElementById('fuAnswer').style.display     = 'none';
  document.querySelector('.fu-toggle').textContent      = 'Show follow-up answer';

  const chips = document.getElementById('kwChips');
  chips.innerHTML = '';
  q.keywords.forEach(kw => {
    const chip       = document.createElement('span');
    chip.className   = 'kw-chip';
    chip.textContent = kw;
    chips.appendChild(chip);
  });

  document.getElementById('lockOverlay').style.display = isLocked ? 'flex' : 'none';
}

function toggleModelAnswer() {
  const content  = document.getElementById('modelAnswerContent');
  const btn      = document.getElementById('toggleAnswerBtn');
  const q        = filteredQs[currentIndex];
  const isLocked = !isPremium && q.id > FREE_LIMIT;
  if (isLocked) { openPremiumModal(); return; }
  const showing = content.style.display !== 'none';
  content.style.display = showing ? 'none' : 'block';
  btn.textContent = showing ? '👁 Show Model Answer' : '👁 Hide Model Answer';
}

function toggleFollowUp() {
  const ans = document.getElementById('fuAnswer');
  const btn = document.querySelector('.fu-toggle');
  const showing = ans.style.display !== 'none';
  ans.style.display = showing ? 'none' : 'block';
  btn.textContent   = showing ? 'Show follow-up answer' : 'Hide follow-up answer';
}

// ================================================================
// MODE
// ================================================================
function setMode(mode) {
  currentMode = mode;
  document.getElementById('modePracticeBtn').classList.toggle('active', mode === 'practice');
  document.getElementById('modeSimBtn').classList.toggle('active', mode === 'simulation');
  document.getElementById('timerWrap').style.display = mode === 'simulation' ? 'flex' : 'none';
  clearSimTimer();
  resetAnswerUI();
  if (mode === 'simulation') startSimTimer();
}

// ================================================================
// SIMULATION TIMER
// ================================================================
function startSimTimer() {
  simTimeLeft = 60;
  updateTimerUI(60);
  clearSimTimer();
  simTimer = setInterval(() => {
    simTimeLeft--;
    updateTimerUI(simTimeLeft);
    if (simTimeLeft <= 0) {
      clearSimTimer();
      if (isListening) stopListening();
      document.getElementById('answerStatus').textContent = "⏰ Time's up! See your score below.";
    }
  }, 1000);
}

function clearSimTimer() {
  if (simTimer) { clearInterval(simTimer); simTimer = null; }
}

function updateTimerUI(t) {
  const fill = document.getElementById('timerFill');
  const text = document.getElementById('timerText');
  if (!fill || !text) return;
  fill.style.width = (t / 60 * 100) + '%';
  text.textContent = t + 's';
  fill.classList.toggle('urgent', t <= 15);
}

// ================================================================
// MICROPHONE / SPEECH RECOGNITION
// ================================================================
function toggleMic() {
  if (isListening) stopListening();
  else startListening();
}

function startListening() {
  // Stop any ongoing speech first — prevents mic capturing TTS output
  if (window.speechSynthesis) speechSynthesis.cancel();

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.getElementById('answerStatus').textContent =
      '📱 For best results use Google Chrome on desktop. Mobile voice recognition is limited.';
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Speech recognition is not supported in this browser. Please use Google Chrome on desktop.');
    return;
  }

  recognition                = new SpeechRecognition();
  recognition.continuous     = false;   // FIX: single pass — no loop
  recognition.interimResults = false;   // FIX: no interim — cleaner result
  recognition.lang           = 'en-US';

  recognition.onstart = () => {
    isListening = true;
    document.getElementById('micBtn').classList.add('listening');
    document.getElementById('micLabel').textContent            = 'Listening...';
    document.getElementById('answerStatus').textContent        = '🎤 Listening — speak clearly in English';
    document.getElementById('transcriptBox').style.display     = 'block';
  };

  recognition.onresult = (event) => {
    let final = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) final += event.results[i][0].transcript;
    }
    if (final) {
      userTranscript += final;
      document.getElementById('transcriptText').textContent = userTranscript;
    }
  };

  recognition.onerror = (event) => {
    if (event.error !== 'no-speech') {
      document.getElementById('answerStatus').textContent = '⚠️ Error: ' + event.error + '. Try again.';
    }
    stopListening();
  };

  recognition.onend = () => {
    stopListening(); // FIX: always stop — no auto-restart loop
  };

  try { recognition.start(); } catch(e) { console.warn(e); }
}

function stopListening() {
  isListening = false;
  if (recognition) { try { recognition.stop(); } catch(e){} }
  document.getElementById('micBtn').classList.remove('listening');
  document.getElementById('micLabel').textContent = 'Tap to speak';

  if (userTranscript.trim().length > 3) {
    scoreAnswer();
  } else {
    document.getElementById('answerStatus').textContent = 'No speech detected. Press the mic and try again.';
  }
}

// ================================================================
// SCORING ENGINE
// ================================================================
function scoreAnswer() {
  const q          = filteredQs[currentIndex];
  const transcript = userTranscript.trim().toLowerCase();
  const modelWords = tokenize(q.modelAnswer);
  const userWords  = tokenize(transcript);

  let matched = 0;
  modelWords.forEach(mw => {
    if (userWords.some(uw => fuzzyMatch(uw, mw))) matched++;
  });
  const accuracy = Math.round((matched / modelWords.length) * 100);

  const coloredUser = userWords.map(uw => {
    const exact = modelWords.some(mw => mw === uw);
    const close = !exact && modelWords.some(mw => fuzzyMatch(uw, mw));
    return { word: uw, color: exact ? 'green' : close ? 'yellow' : 'red' };
  });

  const kwMatched = q.keywords.filter(kw =>
    userWords.some(uw => fuzzyMatch(uw, kw.toLowerCase()))
  );
  const kwScore    = Math.round((kwMatched.length / q.keywords.length) * 100);
  const finalScore = Math.round(accuracy * 0.7 + kwScore * 0.3);

  displayScore(finalScore, accuracy, kwMatched.length, q.keywords.length, coloredUser);
  saveScore(q.id, finalScore);

  if (currentMode === 'practice') {
    document.getElementById('retryBtn').style.display = 'inline-flex';
    document.getElementById('happyBtn').style.display = 'inline-flex';
  } else {
    setTimeout(() => nextQuestion(), 4000);
  }

  showEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
  updateProgressStats();
}

function tokenize(str) {
  return str.toLowerCase()
    .replace(/[^a-z\s']/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.includes(w));
}

function fuzzyMatch(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 3) return false;
  return levenshtein(a, b) <= 3; // FIX: tolerance 3 for non-native accents
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m+1}, (_,i) =>
    Array.from({length: n+1}, (_,j) => j === 0 ? i : 0)
  );
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

const STOPWORDS = ['the','and','for','that','this','with','from','are','was','were','have',
  'has','had','been','will','would','could','should','not','but','you','your','their','they',
  'what','when','how','who','its','our','all','can','any','one','also','very','just','more',
  'make','than','about','into','each','some','then','there'];

function displayScore(final, accuracy, kwMatched, kwTotal, coloredWords) {
  const scoreCircle = document.getElementById('scoreCircle');
  document.getElementById('scoreNum').textContent = final + '%';
  scoreCircle.className = 'score-circle ' + (final >= 75 ? 'good' : final >= 50 ? 'ok' : 'poor');
  document.getElementById('scoreWrap').style.display = 'flex';

  document.getElementById('scoreBreakdown').innerHTML = `
    <div>Word coverage: <strong style="color:${accuracy>=75?'var(--green)':accuracy>=50?'var(--amber)':'var(--red)'};">${accuracy}%</strong></div>
    <div>Keywords used: <strong style="color:var(--accent);">${kwMatched}/${kwTotal}</strong></div>
    <div style="margin-top:6px;font-size:12px;">${getScoreMessage(final)}</div>
  `;

  const compText = document.getElementById('comparisonText');
  compText.innerHTML = '';
  coloredWords.forEach(({word, color}) => {
    const span       = document.createElement('span');
    span.className   = 'w-' + color;
    span.textContent = word + ' ';
    compText.appendChild(span);
  });
  document.getElementById('comparisonWrap').style.display = 'block';
  document.getElementById('answerStatus').textContent = 'Score calculated — see breakdown below';
}

function getScoreMessage(score) {
  if (score >= 85) return '🏆 Excellent! You are interview-ready!';
  if (score >= 70) return '✅ Great job! Practice a few more times to perfect it.';
  if (score >= 50) return '📈 Good start! Focus on the highlighted keywords.';
  return '💪 Keep practicing! Review the model answer and try again.';
}

function saveScore(qId, score) {
  if (!sessionScores[qId]) sessionScores[qId] = [];
  sessionScores[qId].push(score);
  localStorage.setItem('cia_scores', JSON.stringify(sessionScores));
}

function updateProgressStats() {
  const allScores = Object.values(sessionScores).flat();
  const answered  = Object.keys(sessionScores).length;
  const avg  = allScores.length ? Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length) : null;
  const best = allScores.length ? Math.max(...allScores) : null;
  const pct  = Math.round((answered / QUESTIONS.length) * 100);

  document.getElementById('answeredCount').textContent        = answered;
  document.getElementById('avgScore').textContent             = avg  !== null ? avg  + '%' : '—';
  document.getElementById('bestScore').textContent            = best !== null ? best + '%' : '—';
  document.getElementById('overallProgressFill').style.width  = pct + '%';
}

function retryQuestion() {
  userTranscript = '';
  document.getElementById('transcriptBox').style.display   = 'none';
  document.getElementById('transcriptText').textContent    = '';
  document.getElementById('scoreWrap').style.display       = 'none';
  document.getElementById('comparisonWrap').style.display  = 'none';
  document.getElementById('retryBtn').style.display        = 'none';
  document.getElementById('happyBtn').style.display        = 'none';
  document.getElementById('answerStatus').textContent      = 'Press the microphone and speak your answer in English';
  const enc = document.querySelector('.encouragement');
  if (enc) enc.remove();
}

function showEncouragement(msg) {
  const existing = document.querySelector('.encouragement');
  if (existing) existing.remove();
  const div       = document.createElement('div');
  div.className   = 'encouragement';
  div.textContent = msg;
  document.getElementById('practiceActions').after(div);
}

// ================================================================
// TEXT TO SPEECH — question, model answer, follow-up
// ================================================================
let voices = [];

function loadVoices() {
  voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  const sel = document.getElementById('voiceSelect');
  if (!sel) return;
  sel.innerHTML = '';
  const engVoices = voices.filter(v => v.lang.startsWith('en'));
  if (!engVoices.length) { sel.innerHTML = '<option>No voices found</option>'; return; }

  const preferred = ['Google UK English Male','Daniel','Google US English','Samantha','Alex'];
  engVoices.sort((a,b) => {
    let ai = preferred.findIndex(p => a.name.includes(p.split(' ')[0]));
    let bi = preferred.findIndex(p => b.name.includes(p.split(' ')[0]));
    if (ai<0) ai=999; if (bi<0) bi=999;
    return ai - bi;
  });
  engVoices.forEach(v => {
    const opt       = document.createElement('option');
    opt.value       = v.name;
    opt.textContent = v.name;
    sel.appendChild(opt);
  });
  const saved = localStorage.getItem('cia_voice');
  if (saved && engVoices.find(v => v.name === saved)) sel.value = saved;
  sel.addEventListener('change', () => localStorage.setItem('cia_voice', sel.value));
}

function setupRateSlider() {
  const slider = document.getElementById('rateSlider');
  const val    = document.getElementById('rateVal');
  if (!slider) return;
  const saved     = parseFloat(localStorage.getItem('cia_rate') || '1.0');
  slider.value    = saved;
  val.textContent = saved.toFixed(1);
  slider.addEventListener('input', () => {
    val.textContent = parseFloat(slider.value).toFixed(1);
    localStorage.setItem('cia_rate', slider.value);
  });
}

// Unified speak function — question / model answer / follow-up
function speakText(type) {
  if (!window.speechSynthesis) return;
  if (isListening) stopListening(); // CRITICAL: stop mic before speaking
  speechSynthesis.cancel();

  const q = filteredQs[currentIndex];
  const map = {
    question: { text: q.question,                              btnId: 'listenBtn'       },
    answer:   { text: q.modelAnswer,                           btnId: 'listenAnswerBtn' },
    followup: { text: q.followUp + '. ' + q.followUpAnswer,   btnId: 'listenFollowBtn' }
  };
  const item = map[type];
  if (!item || !item.text) return;

  const utt   = new SpeechSynthesisUtterance(item.text);
  const sel   = document.getElementById('voiceSelect');
  const voice = voices.find(v => v.name === sel?.value);
  if (voice) utt.voice = voice;
  utt.rate  = parseFloat(document.getElementById('rateSlider')?.value || '1.0');
  utt.pitch = 1.0;

  const btn = document.getElementById(item.btnId);
  if (btn) {
    const original = btn.textContent;
    btn.textContent = '🔊 Speaking...';
    btn.classList.add('speaking');
    utt.onend = () => { btn.textContent = original; btn.classList.remove('speaking'); };
  }
  speechSynthesis.speak(utt);
}

// ================================================================
// PDF GENERATION — Premium only
// ================================================================
function handlePdfDownload() {
  if (!isPremium) { openPremiumModal(); return; }
  generatePDF();
}

function generatePDF() {
  if (!window.jspdf) {
    const script  = document.createElement('script');
    script.src    = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => buildPDF();
    document.head.appendChild(script);
  } else {
    buildPDF();
  }
}

function buildPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
  const W = 210, mar = 18;
  let y = 20;

  const addLine = (text, size, bold, color) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(...(color || [30,30,30]));
    doc.splitTextToSize(text, W - mar*2).forEach(line => {
      if (y > 275) { doc.addPage(); y = 20; }
      doc.text(line, mar, y);
      y += size * 0.45;
    });
    y += 2;
  };

  doc.setFillColor(11,60,93);
  doc.rect(0, 0, W, 28, 'F');
  doc.setFontSize(16); doc.setFont('helvetica','bold'); doc.setTextColor(255,255,255);
  doc.text('CruiseInterviewAcademy', mar, 13);
  doc.setFontSize(10); doc.setFont('helvetica','normal');
  doc.text('120 Real Cruise Interview Questions — Key Answers & Keywords', mar, 21);
  y = 36;

  const depts     = ['general','entertainment','food','housekeeping','guestservices'];
  const deptNames = { general:'General', entertainment:'Entertainment', food:'Food & Beverage', housekeeping:'Housekeeping', guestservices:'Guest Services' };

  depts.forEach(dept => {
    const qs = QUESTIONS.filter(q => q.dept === dept);
    if (!qs.length) return;
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFillColor(238,248,255);
    doc.rect(mar-2, y-5, W-mar*2+4, 10, 'F');
    addLine('▶ ' + deptNames[dept], 13, true, [11,60,93]);
    y += 3;
    qs.forEach(q => {
      if (y > 265) { doc.addPage(); y = 20; }
      addLine(`Q${q.id}. ${q.question}`,           11,   true,  [20,20,20]);
      addLine('Answer: '    + q.modelAnswer,        9,    false, [60,60,60]);
      addLine('Keywords: '  + q.keywords.join(' · '), 8.5, false, [15,120,80]);
      addLine('Follow-up: ' + q.followUp,           8.5,  true,  [80,50,140]);
      addLine(q.followUpAnswer,                      8.5,  false, [100,100,100]);
      addLine('Tip: '       + q.tip,                8.5,  false, [160,110,10]);
      y += 4;
      doc.setDrawColor(220,230,240);
      doc.line(mar, y, W-mar, y);
      y += 5;
    });
  });

  const total = doc.internal.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFontSize(8); doc.setTextColor(150,150,150);
    doc.text(`CruiseInterviewAcademy.com  ·  Page ${i} of ${total}  ·  Premium Content`, mar, 292);
  }
  doc.save('CruiseInterviewAcademy_120Questions.pdf');
}

// ================================================================
// PREMIUM MODAL
// ================================================================
function openPremiumModal() {
  document.getElementById('premiumModal').style.display = 'flex';
}
function closePremiumModal() {
  document.getElementById('premiumModal').style.display = 'none';
}
function handlePremiumSignup() {
  const email = document.getElementById('premiumEmail')?.value.trim();
  if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
  localStorage.setItem('cia_premium', 'true');
  localStorage.setItem('cia_user', JSON.stringify({ email, premium:true, joinedAt: new Date().toISOString() }));
  isPremium = true;
  closePremiumModal();
  loadQuestion(currentIndex);
  alert('🎉 Welcome to Premium! All 120 questions are now unlocked.');
}
