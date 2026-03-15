/* ==============================================
   CruiseInterviewAcademy — interview.js
   v3 — All 6 fixes applied:
   1. Audio buttons next to each element
   2. 3 answer variations per question
   3. Free-style scoring (pronunciation only if low match)
   4. ResponsiveVoice fallback + Web Speech primary
   5. Better recognition with interim display
   6. Visual improvements via CSS classes
   ============================================== */

const FREE_LIMIT  = 4;
let currentMode   = 'practice';
let currentDept   = 'all';
let currentIndex  = 0;
let filteredQs    = [];
let isListening   = false;
let recognition   = null;
let simTimer      = null;
let simTimeLeft   = 60;
let userTranscript = '';
let sessionScores  = JSON.parse(localStorage.getItem('cia_scores') || '{}');
let isPremium      = JSON.parse(localStorage.getItem('cia_premium') || 'false');
let voices         = [];

const ENCOURAGEMENTS = [
  "Great effort! Keep practicing! 💪",
  "You're improving with every attempt! 🚀",
  "Cruise recruiters will love your confidence! ⚓",
  "Excellent! One step closer to boarding! 🚢",
  "Your dream job is within reach! 🌊",
  "Strong answer! Polish those keywords! 🔑",
  "Your English is sounding more natural! 🎤",
  "You've got this! ✨"
];

// ================================================================
// ANSWER VARIATIONS — 3 styles per question
// Generated from model answer tone variations
// ================================================================
function getVariations(q) {
  return {
    professional: q.modelAnswer,
    natural: naturalizeAnswer(q.modelAnswer),
    enthusiastic: enthusiasticAnswer(q.modelAnswer)
  };
}

function naturalizeAnswer(text) {
  // Natural/conversational: contractions, simpler connectors, personal tone
  return text
    .replace(/I am a /g, "I'm a ")
    .replace(/I am /g, "I'm ")
    .replace(/I have /g, "I've ")
    .replace(/I would /g, "I'd ")
    .replace(/I will /g, "I'll ")
    .replace(/cannot /g, "can't ")
    .replace(/do not /g, "don't ")
    .replace(/it is /g, "it's ")
    .replace(/that is /g, "that's ")
    .replace(/they are /g, "they're ")
    .replace(/we are /g, "we're ")
    .replace(/Additionally,/g, "Also,")
    .replace(/Furthermore,/g, "And on top of that,")
    .replace(/Therefore,/g, "So,")
    .replace(/I believe /g, "I think ")
    .replace(/I am confident /g, "I feel confident ")
    .replace(/I genuinely /g, "I really ")
    .replace(/consistently /g, "all the time ")
    .replace(/I understand that /g, "I know that ")
    .replace(/absolutely /g, "definitely ")
    .replace(/\.([^.])/g, (m,ch) => '. ' + ch.trim());
}

function enthusiasticAnswer(text) {
  // Enthusiastic: energy openers, exclamations, passion words
  const starters = [
    "Absolutely! This is something I'm really passionate about. ",
    "Great question! Honestly, I love talking about this. ",
    "Oh, I'm so glad you asked! ",
    "This is exactly why I want this job! "
  ];
  const starter = starters[Math.floor(Math.random() * starters.length)];
  return starter + text
    .replace(/I am a /g, "I'm a ")
    .replace(/I have /g, "I've ")
    .replace(/I believe /g, "I truly believe ")
    .replace(/I enjoy /g, "I absolutely love ")
    .replace(/I am passionate/g, "I'm incredibly passionate")
    .replace(/I understand/g, "I totally get it")
    .replace(/Additionally,/g, "And the best part is,")
    .replace(/Furthermore,/g, "On top of that,")
    .replace(/I am committed/g, "I'm 100% committed")
    .replace(/I can /g, "I can definitely ")
    .replace(/excellent /g, "outstanding ")
    .replace(/good /g, "amazing ")
    .replace(/strong /g, "exceptional ")
    .replace(/consistently/g, "every single time")
    .replace(/\.([^.])/g, (m,ch) => '! ' + ch.trim());
}

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
  filteredQs = currentDept === 'all'
    ? [...QUESTIONS]
    : QUESTIONS.filter(q => q.dept === currentDept);
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
  renderModelAnswer(q, !isPremium && q.id > FREE_LIMIT);
  clearSimTimer();
  if (currentMode === 'simulation') startSimTimer();
}

function nextQuestion() {
  if (currentIndex < filteredQs.length - 1) loadQuestion(currentIndex + 1);
  else showEncouragement("🏆 You've completed all questions in this set! Amazing work!");
}

function prevQuestion() { loadQuestion(currentIndex - 1); }

function resetAnswerUI() {
  userTranscript = '';
  isListening    = false;
  if (recognition) {
    recognition.onend = null;
    try { recognition.stop(); } catch(e){}
    recognition = null;
  }
  stopSpeaking();
  const micBtn = document.getElementById('micBtn');
  if (micBtn) {
    micBtn.classList.remove('listening');
    document.getElementById('micLabel').textContent = 'Tap to speak';
  }
  ['transcriptBox','scoreWrap','comparisonWrap'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  document.getElementById('transcriptText').textContent    = '';
  document.getElementById('retryBtn').style.display        = 'none';
  document.getElementById('happyBtn').style.display        = 'none';
  document.getElementById('answerStatus').textContent      = 'Press the microphone and speak your answer in English';
  document.getElementById('modelAnswerContent').style.display = 'none';
  const tb = document.getElementById('toggleAnswerBtn');
  if (tb) tb.textContent = '👁 Show Model Answer';
  if (recognition) { try { recognition.stop(); } catch(e){} recognition = null; }
  const enc = document.querySelector('.encouragement');
  if (enc) enc.remove();
}

// ================================================================
// RENDER MODEL ANSWER — with 3 variation tabs
// ================================================================
function renderModelAnswer(q, isLocked) {
  const vars = getVariations(q);

  // Build variation tabs HTML
  document.getElementById('modelAnswerBox').innerHTML = `
    <div class="var-tabs">
      <button class="var-tab active" onclick="switchVariation('professional', this)">
        💼 Professional
      </button>
      <button class="var-tab" onclick="switchVariation('natural', this)">
        💬 Natural
      </button>
      <button class="var-tab" onclick="switchVariation('enthusiastic', this)">
        🔥 Enthusiastic
      </button>
    </div>
    <div class="var-content" id="varContent">${vars.professional}</div>
    <button class="var-audio-btn" onclick="speakVariation()" id="varAudioBtn">
      🔊 Listen to this version
    </button>
  `;

  // Store variations on element for access
  document.getElementById('modelAnswerBox').dataset.professional = vars.professional;
  document.getElementById('modelAnswerBox').dataset.natural      = vars.natural;
  document.getElementById('modelAnswerBox').dataset.enthusiastic = vars.enthusiastic;
  document.getElementById('modelAnswerBox').dataset.current      = 'professional';

  // Keywords
  const chips = document.getElementById('kwChips');
  chips.innerHTML = '';
  q.keywords.forEach(kw => {
    const chip = document.createElement('span');
    chip.className   = 'kw-chip';
    chip.textContent = kw;
    chips.appendChild(chip);
  });

  // Follow-up
  document.getElementById('fuQuestion').textContent = q.followUp;
  document.getElementById('fuAnswer').textContent   = q.followUpAnswer;
  document.getElementById('fuAnswer').style.display = 'none';
  const fuToggle = document.querySelector('.fu-toggle');
  if (fuToggle) fuToggle.textContent = 'Show answer';

  // Tip
  document.getElementById('tipText').textContent = q.tip;

  // Lock: show overlay AND blur the content underneath
  const overlay  = document.getElementById('lockOverlay');
  const maContent = document.getElementById('modelAnswerContent');
  overlay.style.display = isLocked ? 'flex' : 'none';
  // Hide toggle button text when locked
  const toggleBtn = document.getElementById('toggleAnswerBtn');
  if (toggleBtn) {
    toggleBtn.textContent = isLocked ? '🔒 Premium — Unlock to see answers' : '👁 Show Model Answer';
    toggleBtn.style.opacity = isLocked ? '0.6' : '1';
  }
}

function switchVariation(type, btn) {
  const box     = document.getElementById('modelAnswerBox');
  const content = document.getElementById('varContent');
  if (!box || !content) return;
  content.textContent  = box.dataset[type] || '';
  box.dataset.current  = type;
  document.querySelectorAll('.var-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function speakVariation() {
  const box  = document.getElementById('modelAnswerBox');
  const text = box.dataset[box.dataset.current || 'professional'] || '';
  const btn  = document.getElementById('varAudioBtn');
  if (!text) return;
  speakTextWithBtn(text, btn, '🔊 Listen to this version');
}

function toggleModelAnswer() {
  const content  = document.getElementById('modelAnswerContent');
  const btn      = document.getElementById('toggleAnswerBtn');
  const q        = filteredQs[currentIndex];
  if (!isPremium && q.id > FREE_LIMIT) { openPremiumModal(); return; }
  const showing  = content.style.display !== 'none';
  content.style.display = showing ? 'none' : 'block';
  btn.textContent       = showing ? '👁 Show Model Answer' : '👁 Hide Model Answer';
}

function toggleFollowUp() {
  const ans      = document.getElementById('fuAnswer');
  const btn      = document.querySelector('.fu-toggle');
  const audioBtn = document.getElementById('listenFollowAnsBtn');
  const showing  = ans.style.display !== 'none';
  ans.style.display = showing ? 'none' : 'block';
  btn.textContent   = showing ? 'Show answer' : 'Hide answer';
  if (audioBtn) audioBtn.style.display = showing ? 'none' : 'inline-flex';
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
      document.getElementById('answerStatus').textContent = "⏰ Time's up!";
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
  stopSpeaking(); // CRITICAL: stop TTS before mic — prevents echo loop

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.getElementById('answerStatus').textContent =
      '📱 Mobile detected — speak clearly. For best results use Chrome on desktop.';
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert('Speech recognition requires Google Chrome on desktop. Please open this page in Chrome.');
    return;
  }

  recognition                 = new SR();
  recognition.continuous      = true;   // keep open for natural pauses
  recognition.interimResults  = true;
  recognition.lang            = 'en-US';
  recognition.maxAlternatives = 1;

  // Silence timer — stop after 5s of no new speech
  let silenceTimer = null;
  const SILENCE_MS = 5000;

  const resetSilenceTimer = () => {
    if (silenceTimer) clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
      if (isListening) stopListening();
    }, SILENCE_MS);
  };

  recognition.onstart = () => {
    isListening = true;
    document.getElementById('micBtn').classList.add('listening');
    document.getElementById('micLabel').textContent        = 'Listening...';
    document.getElementById('answerStatus').textContent    = '🎤 Listening — speak your answer (auto-stops after 5s silence)';
    document.getElementById('transcriptBox').style.display = 'block';
    resetSilenceTimer();
  };

  recognition.onresult = (event) => {
    let interim = '';
    let finalChunk = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const t = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalChunk += t + ' ';
      else interim += t;
    }
    if (finalChunk) {
      userTranscript += finalChunk;
      resetSilenceTimer(); // reset timer on each new word
    }
    const box = document.getElementById('transcriptText');
    box.innerHTML = userTranscript
      + (interim
        ? '<span style="color:var(--text-muted);font-style:italic;">' + interim + '</span>'
        : '');
  };

  recognition.onerror = (event) => {
    if (silenceTimer) clearTimeout(silenceTimer);
    if (event.error === 'no-speech') {
      // no-speech fires normally during pauses in continuous mode — just reset timer
      resetSilenceTimer();
      return;
    }
    document.getElementById('answerStatus').textContent = '⚠️ ' + event.error + ' — try again';
    finishListening();
  };

  recognition.onend = () => {
    if (silenceTimer) clearTimeout(silenceTimer);
    finishListening();
  };

  try { recognition.start(); }
  catch(e) { console.warn('SR start error:', e); }
}

// Called by user pressing mic button — stops recognition, then scores
function stopListening() {
  if (!isListening) return;
  isListening = false;
  if (recognition) {
    recognition.onend = null; // detach to prevent finishListening double-call
    try { recognition.stop(); } catch(e){}
    recognition = null;
  }
  _afterListening();
}

// Called internally by recognition.onend / onerror — recognition already stopped
function finishListening() {
  if (!isListening) return; // already handled
  isListening = false;
  recognition = null;
  _afterListening();
}

function _afterListening() {
  document.getElementById('micBtn').classList.remove('listening');
  document.getElementById('micLabel').textContent = 'Tap to speak';
  const text = userTranscript.trim();
  if (text.length > 3) scoreAnswer();
  else document.getElementById('answerStatus').textContent = 'Nothing detected. Press mic and try again.';
}

// ================================================================
// SCORING ENGINE
// Fix 3: if user answer is very different from model → pronunciation mode
// ================================================================
function scoreAnswer() {
  const q          = filteredQs[currentIndex];
  const transcript = userTranscript.trim().toLowerCase();
  const modelWords = tokenize(q.modelAnswer);
  const userWords  = tokenize(transcript);

  // Check content overlap
  let matched = 0;
  modelWords.forEach(mw => {
    if (userWords.some(uw => fuzzyMatch(uw, mw))) matched++;
  });
  const contentMatch = Math.round((matched / modelWords.length) * 100);

  // If < 25% match — user answered freely → pronunciation mode only
  const isFreeStyle = contentMatch < 25;

  let finalScore, accuracy, kwMatched, coloredUser;

  if (isFreeStyle) {
    // Pronunciation mode: score based on word fluency and length
    const wordCount   = userWords.length;
    const modelCount  = modelWords.length;
    const lengthScore = Math.min(100, Math.round((wordCount / modelCount) * 100));
    finalScore        = Math.round(lengthScore * 0.6 + 40); // base 40 for attempting
    accuracy          = lengthScore;
    kwMatched         = 0;
    coloredUser       = userWords.map(w => ({ word: w, color: 'yellow' })); // all yellow = neutral
  } else {
    // Content match mode
    accuracy  = contentMatch;
    const kwM = q.keywords.filter(kw => userWords.some(uw => fuzzyMatch(uw, kw.toLowerCase())));
    kwMatched = kwM.length;
    const kwScore  = Math.round((kwMatched / q.keywords.length) * 100);
    finalScore     = Math.round(accuracy * 0.7 + kwScore * 0.3);
    coloredUser    = userWords.map(uw => {
      const exact = modelWords.some(mw => mw === uw);
      const close = !exact && modelWords.some(mw => fuzzyMatch(uw, mw));
      return { word: uw, color: exact ? 'green' : close ? 'yellow' : 'red' };
    });
  }

  displayScore(finalScore, accuracy, kwMatched, q.keywords.length, coloredUser, isFreeStyle);
  saveScore(q.id, finalScore);

  if (currentMode === 'practice') {
    document.getElementById('retryBtn').style.display = 'inline-flex';
    document.getElementById('happyBtn').style.display = 'inline-flex';
  } else {
    setTimeout(() => nextQuestion(), 4500);
  }

  showEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
  updateProgressStats();
}

function tokenize(str) {
  return str.toLowerCase()
    .replace(/[^a-z\s']/g, '')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOPWORDS.includes(w));
}

function fuzzyMatch(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 3) return false;
  return levenshtein(a, b) <= 3;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length:m+1},(_,i) => Array.from({length:n+1},(_,j) => j===0?i:0));
  for (let j=1;j<=n;j++) dp[0][j]=j;
  for (let i=1;i<=m;i++)
    for (let j=1;j<=n;j++)
      dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : 1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}

const STOPWORDS = ['the','and','for','that','this','with','from','are','was','were','have',
  'has','had','been','will','would','could','should','not','but','you','your','their','they',
  'what','when','how','who','its','our','all','can','any','one','also','very','just','more',
  'make','than','about','into','each','some','then','there'];

function displayScore(final, accuracy, kwMatched, kwTotal, coloredWords, isFreeStyle) {
  const circle = document.getElementById('scoreCircle');
  document.getElementById('scoreNum').textContent = final + '%';
  circle.className = 'score-circle ' + (final >= 75 ? 'good' : final >= 50 ? 'ok' : 'poor');
  document.getElementById('scoreWrap').style.display = 'flex';

  document.getElementById('scoreBreakdown').innerHTML = isFreeStyle
    ? `<div style="color:var(--green);font-size:14px;line-height:1.7;">
       ✨ <strong>Great — you have your own style!</strong><br>
       That's exactly what recruiters want. Try to include some of these keywords naturally:<br>
       <span style="color:var(--accent);">${filteredQs[currentIndex].keywords.slice(0,4).join(' · ')}</span>
       </div>`
    : `<div>Word coverage: <strong style="color:${accuracy>=75?'var(--green)':accuracy>=50?'var(--amber)':'var(--red)'};">${accuracy}%</strong></div>
       <div>Keywords used: <strong style="color:var(--accent);">${kwMatched}/${kwTotal}</strong></div>
       <div style="margin-top:6px;font-size:12px;">${getScoreMessage(final)}</div>`;

  const compText = document.getElementById('comparisonText');
  compText.innerHTML = '';
  coloredWords.forEach(({word, color}) => {
    const span = document.createElement('span');
    span.className   = 'w-' + color;
    span.textContent = word + ' ';
    compText.appendChild(span);
  });
  document.getElementById('comparisonWrap').style.display = 'block';
  document.getElementById('answerStatus').textContent = isFreeStyle
    ? '✨ Your own style — great! Add keywords to boost your score.'
    : 'Score calculated — see breakdown below';
}

function getScoreMessage(score) {
  if (score >= 85) return '🏆 Excellent! You are interview-ready!';
  if (score >= 70) return '✅ Great job! Practice a few more times.';
  if (score >= 50) return '📈 Good start! Focus on the highlighted keywords.';
  return '💪 Keep practicing! Review the model answer and try again.';
}

function saveScore(qId, score) {
  if (!sessionScores[qId]) sessionScores[qId] = [];
  sessionScores[qId].push(score);
  localStorage.setItem('cia_scores', JSON.stringify(sessionScores));
}

function updateProgressStats() {
  const all      = Object.values(sessionScores).flat();
  const answered = Object.keys(sessionScores).length;
  const avg      = all.length ? Math.round(all.reduce((a,b)=>a+b,0)/all.length) : null;
  const best     = all.length ? Math.max(...all) : null;
  const pct      = Math.round((answered / QUESTIONS.length) * 100);
  document.getElementById('answeredCount').textContent       = answered;
  document.getElementById('avgScore').textContent            = avg  !== null ? avg  + '%' : '—';
  document.getElementById('bestScore').textContent           = best !== null ? best + '%' : '—';
  document.getElementById('overallProgressFill').style.width = pct + '%';
}

function retryQuestion() {
  userTranscript = '';
  ['transcriptBox','scoreWrap','comparisonWrap'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  document.getElementById('transcriptText').textContent = '';
  document.getElementById('retryBtn').style.display     = 'none';
  document.getElementById('happyBtn').style.display     = 'none';
  document.getElementById('answerStatus').textContent   = 'Press the microphone and speak your answer in English';
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
// TEXT TO SPEECH
// Primary: Web Speech API (Chrome — best quality)
// Fallback: ResponsiveVoice (all browsers + mobile)
// ================================================================
function loadVoices() {
  voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  const sel = document.getElementById('voiceSelect');
  if (!sel) return;
  sel.innerHTML = '';
  const eng = voices.filter(v => v.lang.startsWith('en'));
  if (!eng.length) {
    sel.innerHTML = '<option value="rv">ResponsiveVoice (fallback)</option>';
    return;
  }
  const preferred = ['Google UK English Male','Daniel','Google US English','Samantha','Alex'];
  eng.sort((a,b) => {
    let ai = preferred.findIndex(p => a.name.includes(p.split(' ')[0]));
    let bi = preferred.findIndex(p => b.name.includes(p.split(' ')[0]));
    if (ai<0) ai=999; if (bi<0) bi=999;
    return ai-bi;
  });
  eng.forEach(v => {
    const o = document.createElement('option');
    o.value = v.name; o.textContent = v.name;
    sel.appendChild(o);
  });
  // Add RV as last option
  const rv = document.createElement('option');
  rv.value = 'rv'; rv.textContent = '📱 ResponsiveVoice (mobile/other)';
  sel.appendChild(rv);

  const saved = localStorage.getItem('cia_voice');
  if (saved && (saved === 'rv' || eng.find(v => v.name === saved))) sel.value = saved;
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

function stopSpeaking() {
  if (window.speechSynthesis) speechSynthesis.cancel();
  if (typeof responsiveVoice !== 'undefined') responsiveVoice.cancel();
}

function getSelectedVoice() {
  const sel = document.getElementById('voiceSelect');
  return sel ? sel.value : null;
}

function getSelectedRate() {
  return parseFloat(document.getElementById('rateSlider')?.value || '1.0');
}

function speakTextWithBtn(text, btn, originalLabel) {
  if (!text) return;
  if (isListening) stopListening(); // prevent mic capturing TTS
  stopSpeaking();

  const voiceName = getSelectedVoice();
  const rate      = getSelectedRate();

  if (btn) { btn.textContent = '🔊 Speaking...'; btn.classList.add('speaking'); }
  const done = () => { if (btn) { btn.textContent = originalLabel; btn.classList.remove('speaking'); } };

  // Use ResponsiveVoice if selected OR if no Web Speech voices available
  const useRV = voiceName === 'rv' || !voices.filter(v => v.lang.startsWith('en')).length;

  if (useRV && typeof responsiveVoice !== 'undefined') {
    responsiveVoice.speak(text, 'UK English Male', { rate, onend: done });
  } else if (window.speechSynthesis) {
    const utt   = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === voiceName);
    if (voice) utt.voice = voice;
    utt.rate  = rate;
    utt.pitch = 1.0;
    utt.onend = done;
    speechSynthesis.speak(utt);
  } else {
    done();
  }
}

// Individual speak functions called from HTML buttons
function speakQuestion() {
  const q   = filteredQs[currentIndex];
  const btn = document.getElementById('listenBtn');
  speakTextWithBtn(q.question, btn, '🔊 Question');
}

function speakAnswer() {
  const box = document.getElementById('modelAnswerBox');
  const cur = box?.dataset?.current || 'professional';
  const text = box?.dataset?.[cur] || '';
  const btn  = document.getElementById('listenAnswerBtn');
  speakTextWithBtn(text, btn, '🔊 Answer');
}

function speakFollowUp() {
  const q    = filteredQs[currentIndex];
  const text = q.followUp;
  const btn  = document.getElementById('listenFollowBtn');
  speakTextWithBtn(text, btn, '🔊 Follow-up');
}

function speakFollowUpAnswer() {
  const q    = filteredQs[currentIndex];
  const text = q.followUpAnswer;
  const btn  = document.getElementById('listenFollowAnsBtn');
  speakTextWithBtn(text, btn, '🔊 Answer');
}

function speakVariation() {
  speakAnswer(); // same — reads current selected variation
}

// ================================================================
// PDF GENERATION — Premium only
// ================================================================
function handlePdfDownload() {
  if (!isPremium) { openPremiumModal(); return; }
  if (!window.jspdf) {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = buildPDF;
    document.head.appendChild(s);
  } else buildPDF();
}

function buildPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
  const W = 210, mar = 18;
  let y = 20;

  const line = (text, size, bold, color) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(...(color||[30,30,30]));
    doc.splitTextToSize(text, W-mar*2).forEach(l => {
      if (y > 275) { doc.addPage(); y = 20; }
      doc.text(l, mar, y);
      y += size * 0.45;
    });
    y += 2;
  };

  doc.setFillColor(11,60,93); doc.rect(0,0,W,28,'F');
  doc.setFontSize(16); doc.setFont('helvetica','bold'); doc.setTextColor(255,255,255);
  doc.text('CruiseInterviewAcademy', mar, 13);
  doc.setFontSize(10); doc.setFont('helvetica','normal');
  doc.text('120 Real Cruise Interview Questions — Premium Edition', mar, 21);
  y = 36;

  ['general','entertainment','food','housekeeping','guestservices'].forEach(dept => {
    const qs = QUESTIONS.filter(q => q.dept === dept);
    if (!qs.length) return;
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFillColor(238,248,255);
    doc.rect(mar-2, y-5, W-mar*2+4, 10, 'F');
    const names = {general:'General',entertainment:'Entertainment',food:'Food & Beverage',housekeeping:'Housekeeping',guestservices:'Guest Services'};
    line('▶ ' + names[dept], 13, true, [11,60,93]);
    y += 3;
    qs.forEach(q => {
      if (y > 265) { doc.addPage(); y = 20; }
      line(`Q${q.id}. ${q.question}`, 11, true, [20,20,20]);
      line('Answer: ' + q.modelAnswer, 9, false, [60,60,60]);
      line('Keywords: ' + q.keywords.join(' · '), 8.5, false, [15,120,80]);
      line('Follow-up: ' + q.followUp, 8.5, true, [80,50,140]);
      line(q.followUpAnswer, 8.5, false, [100,100,100]);
      line('Tip: ' + q.tip, 8.5, false, [160,110,10]);
      y += 4;
      doc.setDrawColor(220,230,240); doc.line(mar,y,W-mar,y); y += 5;
    });
  });

  const total = doc.internal.getNumberOfPages();
  for (let i=1;i<=total;i++) {
    doc.setPage(i);
    doc.setFontSize(8); doc.setTextColor(150,150,150);
    doc.text(`CruiseInterviewAcademy.com · Page ${i} of ${total} · Premium — Do not distribute`, mar, 292);
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
