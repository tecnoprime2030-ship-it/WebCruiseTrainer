/* =============================================================
   CruiseInterviewAcademy — main.js
   Handles: i18n, countdown, navigation, modals,
            localStorage user state, dept card clicks,
            announce bar counter, toast notifications
   ============================================================= */

// ---- TRANSLATIONS ----
const i18n = {
  en: {
    nav_home: "Home", nav_interview: "Interview", nav_vocab: "Vocabulary",
    nav_english: "English", nav_entertain: "Entertainment", nav_jobs: "Jobs",
    nav_start: "Start Free",
    hero_badge: "🚢 #1 Cruise Interview Training Platform",
    hero_title: "Your Dream Job<br><em>Starts Here.</em>",
    hero_sub: "Real interview questions. Voice simulation. English training.<br>Get hired on a cruise ship — wherever you are in the world.",
    hero_cta1: "🎤 Start Interview Practice",
    hero_cta2: "Train English Free",
    hero_proof: "Join 200+ candidates already training",
    mission_text: "Our mission is to democratize access to cruise ship jobs — giving anyone, anywhere, the tools to prepare, speak confidently and get hired.",
    dept_label: "TRAIN BY DEPARTMENT",
    dept_title: "Which role are you preparing for?",
    dept_sub: "Specialized training for every cruise ship department. Real scenarios, real phrases, real interviews.",
    dept_ent_title: "Entertainment Host",
    dept_ent_desc: "Trivia, bingo, karaoke, stage hosting and crowd engagement scripts.",
    dept_fb_title: "Food & Beverage",
    dept_fb_desc: "Waiter, bartender and buffet staff service training and guest interaction.",
    dept_hk_title: "Housekeeping",
    dept_hk_desc: "Cabin service communication and guest interaction phrases.",
    dept_gs_title: "Guest Services",
    dept_gs_desc: "Handle requests, complaints and onboard situations like a pro.",
    dept_questions: "48 questions",
    how_title: "From zero to hired in 4 steps",
    step1_title: "Study real questions", step1_desc: "120 real cruise recruiter questions with model answers and follow-ups.",
    step2_title: "Train your English", step2_desc: "Vocabulary by department, pronunciation practice and audio phrases.",
    step3_title: "Simulate the interview", step3_desc: "Speak your answer. Get instant feedback on pronunciation and accuracy.",
    step4_title: "Earn your certificate", step4_desc: "Download your completion certificate and show it to recruiters.",
    feat_title: "Speak. Get scored. Improve.",
    feat_desc: "Our voice interview simulator listens to your answer, compares it word-by-word against the model answer and gives you instant color-coded feedback.",
    feat_b1: "Works best in Google Chrome on any device",
    feat_b2: "Adjustable voice speed and accent",
    feat_b3: "Instant score and improvement tips",
    feat_cta: "Try Interview Simulator →",
    test_label: "SUCCESS STORIES",
    test_title: "They trained here. They got hired.",
    testi1_text: '"I had no idea what cruise recruiters actually ask. After two weeks here, I walked into my interview feeling confident and got the job."',
    testi2_text: '"The voice simulator is incredible. I practiced every night for a week and my English improved so much the recruiter complimented me."',
    testi3_text: '"I was scared of speaking English in an interview. This platform gave me the exact phrases I needed. Now I am onboard living my dream."',
    price_title: "Invest in yourself. Change your life.",
    price_sub: "One payment. Lifetime access. No hidden fees.",
    free_title: "Free Starter", free_sub: "Get a taste — no credit card needed", free_cta: "Start for Free",
    prem_title: "Full Training", prem_sub: "Everything you need to get hired", prem_cta: "Unlock Full Training — $19",
    timer_label: "⏳ Price increases in:",
    cta_title: "Don't stay on shore.<br>Your ship is waiting.",
    cta_sub: "Every day you wait is a day someone else takes your spot onboard.",
    cta_btn: "Start Training Now — It's Free",
    footer_tagline: "Your journey starts here."
  },
  es: {
    nav_home: "Inicio", nav_interview: "Entrevista", nav_vocab: "Vocabulario",
    nav_english: "Inglés", nav_entertain: "Entretenimiento", nav_jobs: "Empleos",
    nav_start: "Empezar Gratis",
    hero_badge: "🚢 Plataforma #1 de Entrenamiento para Cruceros",
    hero_title: "Tu trabajo soñado<br><em>empieza aquí.</em>",
    hero_sub: "Preguntas reales de entrevistas. Simulación de voz. Entrenamiento en inglés.<br>Consigue trabajo en un crucero — desde donde estés.",
    hero_cta1: "🎤 Practicar Entrevista",
    hero_cta2: "Entrenar Inglés Gratis",
    hero_proof: "Únete a 200+ candidatos que ya entrenan",
    mission_text: "Nuestra misión es democratizar el acceso a empleos en cruceros — dándole a cualquier persona las herramientas para prepararse, hablar con confianza y conseguir el trabajo.",
    dept_label: "ENTRENAMIENTO POR ÁREA",
    dept_title: "¿Para qué rol te estás preparando?",
    dept_sub: "Formación especializada para cada departamento de crucero. Escenarios reales, frases reales, entrevistas reales.",
    dept_ent_title: "Entretenimiento",
    dept_ent_desc: "Trivia, bingo, karaoke, hosting en escenario y scripts de animación.",
    dept_fb_title: "Alimentos y Bebidas",
    dept_fb_desc: "Entrenamiento de servicio para camareros, bartenders y buffet.",
    dept_hk_title: "Housekeeping",
    dept_hk_desc: "Comunicación en servicio de cabinas e interacción con huéspedes.",
    dept_gs_title: "Guest Services",
    dept_gs_desc: "Maneja solicitudes, quejas y situaciones a bordo como un profesional.",
    dept_questions: "48 preguntas",
    how_title: "De cero a contratado en 4 pasos",
    step1_title: "Estudiá preguntas reales", step1_desc: "120 preguntas reales de reclutadores con respuestas modelo y repreguntas.",
    step2_title: "Entrenás tu inglés", step2_desc: "Vocabulario por área, práctica de pronunciación y frases en audio.",
    step3_title: "Simulás la entrevista", step3_desc: "Hablá tu respuesta. Recibí feedback inmediato sobre pronunciación y precisión.",
    step4_title: "Obtenés tu certificado", step4_desc: "Descargá tu certificado de finalización y mostráselo a los reclutadores.",
    feat_title: "Hablá. Puntuate. Mejorá.",
    feat_desc: "Nuestro simulador de entrevistas por voz escucha tu respuesta, la compara palabra por palabra con la respuesta modelo y te da feedback con código de colores.",
    feat_b1: "Funciona mejor en Google Chrome en cualquier dispositivo",
    feat_b2: "Velocidad y acento ajustables",
    feat_b3: "Puntuación instantánea y consejos de mejora",
    feat_cta: "Probar Simulador de Entrevista →",
    test_label: "HISTORIAS DE ÉXITO",
    test_title: "Entrenaron aquí. Los contrataron.",
    testi1_text: '"No tenía idea de qué preguntan realmente los reclutadores de cruceros. Después de dos semanas aquí, entré a mi entrevista con confianza y conseguí el trabajo."',
    testi2_text: '"El simulador de voz es increíble. Practiqué todas las noches durante una semana y mi inglés mejoró tanto que el reclutador me felicitó."',
    testi3_text: '"Tenía miedo de hablar inglés en una entrevista. Esta plataforma me dio exactamente las frases que necesitaba. Ahora estoy a bordo viviendo mi sueño."',
    price_title: "Invertí en vos. Cambiá tu vida.",
    price_sub: "Un pago. Acceso de por vida. Sin cargos ocultos.",
    free_title: "Starter Gratis", free_sub: "Probalo — sin tarjeta de crédito", free_cta: "Empezar Gratis",
    prem_title: "Entrenamiento Completo", prem_sub: "Todo lo que necesitás para conseguir el trabajo", prem_cta: "Desbloquear Entrenamiento — $19",
    timer_label: "⏳ El precio sube en:",
    cta_title: "No te quedes en tierra.<br>Tu barco te espera.",
    cta_sub: "Cada día que esperás es un día que otra persona ocupa tu lugar a bordo.",
    cta_btn: "Empezar Ahora — Es Gratis",
    footer_tagline: "Tu viaje empieza aquí."
  },
  pt: {
    nav_home: "Início", nav_interview: "Entrevista", nav_vocab: "Vocabulário",
    nav_english: "Inglês", nav_entertain: "Entretenimento", nav_jobs: "Empregos",
    nav_start: "Começar Grátis",
    hero_badge: "🚢 Plataforma #1 de Treinamento para Cruzeiros",
    hero_title: "Seu emprego dos sonhos<br><em>começa aqui.</em>",
    hero_sub: "Perguntas reais de entrevistas. Simulação de voz. Treinamento em inglês.<br>Seja contratado em um cruzeiro — de qualquer lugar do mundo.",
    hero_cta1: "🎤 Praticar Entrevista",
    hero_cta2: "Treinar Inglês Grátis",
    hero_proof: "Junte-se a 200+ candidatos já treinando",
    mission_text: "Nossa missão é democratizar o acesso a empregos em cruzeiros — dando a qualquer pessoa as ferramentas para se preparar, falar com confiança e ser contratada.",
    dept_label: "TREINO POR DEPARTAMENTO",
    dept_title: "Para qual função você está se preparando?",
    dept_sub: "Treinamento especializado para cada departamento de cruzeiro.",
    dept_ent_title: "Entretenimento", dept_ent_desc: "Trivia, bingo, karaokê, hosting no palco e scripts de animação.",
    dept_fb_title: "Alimentos e Bebidas", dept_fb_desc: "Treinamento de serviço para garçons, bartenders e equipe do buffet.",
    dept_hk_title: "Housekeeping", dept_hk_desc: "Comunicação de serviço de cabine e frases de interação com hóspedes.",
    dept_gs_title: "Guest Services", dept_gs_desc: "Lide com pedidos, reclamações e situações a bordo como um profissional.",
    dept_questions: "48 perguntas",
    how_title: "Do zero ao contratado em 4 passos",
    step1_title: "Estude perguntas reais", step1_desc: "120 perguntas reais de recrutadores com respostas modelo.",
    step2_title: "Treine seu inglês", step2_desc: "Vocabulário por departamento, prática de pronúncia e frases em áudio.",
    step3_title: "Simule a entrevista", step3_desc: "Fale sua resposta. Receba feedback instantâneo sobre pronúncia e precisão.",
    step4_title: "Ganhe seu certificado", step4_desc: "Baixe seu certificado de conclusão e mostre aos recrutadores.",
    feat_title: "Fale. Pontue. Melhore.",
    feat_desc: "Nosso simulador de entrevistas por voz ouve sua resposta e compara palavra por palavra com a resposta modelo.",
    feat_b1: "Funciona melhor no Google Chrome", feat_b2: "Velocidade e sotaque ajustáveis", feat_b3: "Pontuação instantânea e dicas de melhoria",
    feat_cta: "Experimentar Simulador →",
    test_label: "HISTÓRIAS DE SUCESSO", test_title: "Treinaram aqui. Foram contratados.",
    testi1_text: '"Não fazia ideia do que os recrutadores de cruzeiros realmente perguntam. Depois de duas semanas aqui, entrei na entrevista com confiança e consegui o emprego."',
    testi2_text: '"O simulador de voz é incrível. Pratiquei toda noite por uma semana e meu inglês melhorou tanto que o recrutador me elogiou."',
    testi3_text: '"Tinha medo de falar inglês em entrevista. Esta plataforma me deu exatamente as frases que precisava. Agora estou a bordo vivendo meu sonho."',
    price_title: "Invista em você. Mude sua vida.",
    price_sub: "Um pagamento. Acesso vitalício. Sem taxas ocultas.",
    free_title: "Starter Grátis", free_sub: "Experimente — sem cartão de crédito", free_cta: "Começar Grátis",
    prem_title: "Treinamento Completo", prem_sub: "Tudo que você precisa para ser contratado", prem_cta: "Desbloquear Treinamento — $19",
    timer_label: "⏳ Preço aumenta em:",
    cta_title: "Não fique em terra.<br>Seu navio está esperando.",
    cta_sub: "Cada dia que você espera é um dia que outra pessoa ocupa seu lugar a bordo.",
    cta_btn: "Começar Agora — É Grátis",
    footer_tagline: "Sua jornada começa aqui."
  },
  fr: {
    nav_home: "Accueil", nav_interview: "Entretien", nav_vocab: "Vocabulaire",
    nav_english: "Anglais", nav_entertain: "Divertissement", nav_jobs: "Emplois",
    nav_start: "Commencer Gratuitement",
    hero_badge: "🚢 Plateforme #1 de Formation pour Croisières",
    hero_title: "Votre emploi de rêve<br><em>commence ici.</em>",
    hero_sub: "Vraies questions d'entretien. Simulation vocale. Formation en anglais.<br>Soyez embauché sur un bateau de croisière.",
    hero_cta1: "🎤 Pratiquer l'Entretien", hero_cta2: "Former l'Anglais Gratuitement",
    hero_proof: "Rejoignez 200+ candidats déjà en formation",
    mission_text: "Notre mission est de démocratiser l'accès aux emplois sur les croisières.",
    dept_label: "FORMATION PAR DÉPARTEMENT", dept_title: "Pour quel rôle vous préparez-vous?",
    dept_sub: "Formation spécialisée pour chaque département de croisière.",
    dept_ent_title: "Animation", dept_ent_desc: "Quiz, bingo, karaoké, animation sur scène.",
    dept_fb_title: "Restauration", dept_fb_desc: "Formation de service pour serveurs, bartenders et personnel de buffet.",
    dept_hk_title: "Housekeeping", dept_hk_desc: "Communication pour le service des cabines.",
    dept_gs_title: "Service Clientèle", dept_gs_desc: "Gérez les demandes et les situations à bord.",
    dept_questions: "48 questions",
    how_title: "De zéro à embauché en 4 étapes",
    step1_title: "Étudiez les vraies questions", step1_desc: "120 vraies questions de recruteurs avec réponses modèles.",
    step2_title: "Entraînez votre anglais", step2_desc: "Vocabulaire par département et pratique de prononciation.",
    step3_title: "Simulez l'entretien", step3_desc: "Parlez votre réponse. Obtenez un feedback immédiat.",
    step4_title: "Obtenez votre certificat", step4_desc: "Téléchargez votre certificat et montrez-le aux recruteurs.",
    feat_title: "Parlez. Notez. Améliorez.",
    feat_desc: "Notre simulateur d'entretien vocal écoute votre réponse et la compare mot par mot.",
    feat_b1: "Fonctionne mieux sur Google Chrome", feat_b2: "Vitesse et accent réglables", feat_b3: "Score instantané et conseils",
    feat_cta: "Essayer le Simulateur →",
    test_label: "TÉMOIGNAGES", test_title: "Ils se sont formés ici. Ils ont été embauchés.",
    testi1_text: '"Je ne savais pas du tout ce que les recruteurs de croisières demandent vraiment. Après deux semaines ici, j\'ai passé mon entretien avec confiance."',
    testi2_text: '"Le simulateur vocal est incroyable. J\'ai pratiqué chaque soir pendant une semaine et mon anglais s\'est tellement amélioré."',
    testi3_text: '"J\'avais peur de parler anglais en entretien. Cette plateforme m\'a donné exactement les phrases dont j\'avais besoin."',
    price_title: "Investissez en vous. Changez votre vie.",
    price_sub: "Un paiement. Accès à vie. Sans frais cachés.",
    free_title: "Starter Gratuit", free_sub: "Essayez — sans carte de crédit", free_cta: "Commencer Gratuitement",
    prem_title: "Formation Complète", prem_sub: "Tout ce dont vous avez besoin", prem_cta: "Débloquer la Formation — $19",
    timer_label: "⏳ Le prix augmente dans:",
    cta_title: "Ne restez pas à quai.<br>Votre bateau vous attend.",
    cta_sub: "Chaque jour que vous attendez, quelqu'un d'autre prend votre place.",
    cta_btn: "Commencer Maintenant — C'est Gratuit",
    footer_tagline: "Votre voyage commence ici."
  },
  it: {
    nav_home: "Home", nav_interview: "Colloquio", nav_vocab: "Vocabolario",
    nav_english: "Inglese", nav_entertain: "Intrattenimento", nav_jobs: "Lavori",
    nav_start: "Inizia Gratis",
    hero_badge: "🚢 Piattaforma #1 di Formazione per Crociere",
    hero_title: "Il tuo lavoro dei sogni<br><em>inizia qui.</em>",
    hero_sub: "Vere domande di colloquio. Simulazione vocale. Formazione in inglese.<br>Fatti assumere su una nave da crociera.",
    hero_cta1: "🎤 Pratica il Colloquio", hero_cta2: "Allenati in Inglese Gratis",
    hero_proof: "Unisciti a 200+ candidati già in formazione",
    mission_text: "La nostra missione è democratizzare l'accesso ai lavori sulle navi da crociera.",
    dept_label: "FORMAZIONE PER REPARTO", dept_title: "Per quale ruolo ti stai preparando?",
    dept_sub: "Formazione specializzata per ogni reparto della nave da crociera.",
    dept_ent_title: "Intrattenimento", dept_ent_desc: "Quiz, bingo, karaoke, hosting sul palco.",
    dept_fb_title: "Ristorazione", dept_fb_desc: "Formazione al servizio per camerieri, bartender e buffet.",
    dept_hk_title: "Housekeeping", dept_hk_desc: "Comunicazione per il servizio delle cabine.",
    dept_gs_title: "Guest Services", dept_gs_desc: "Gestisci richieste e situazioni a bordo come un professionista.",
    dept_questions: "48 domande",
    how_title: "Da zero ad assunto in 4 passi",
    step1_title: "Studia le vere domande", step1_desc: "120 vere domande dei recruiter con risposte modello.",
    step2_title: "Allena il tuo inglese", step2_desc: "Vocabolario per reparto e pratica di pronuncia.",
    step3_title: "Simula il colloquio", step3_desc: "Parla la tua risposta. Ricevi feedback immediato.",
    step4_title: "Ottieni il tuo certificato", step4_desc: "Scarica il tuo certificato e mostralo ai recruiter.",
    feat_title: "Parla. Punteggio. Migliora.",
    feat_desc: "Il nostro simulatore di colloquio vocale ascolta la tua risposta e la confronta parola per parola.",
    feat_b1: "Funziona meglio su Google Chrome", feat_b2: "Velocità e accento regolabili", feat_b3: "Punteggio istantaneo e suggerimenti",
    feat_cta: "Prova il Simulatore →",
    test_label: "STORIE DI SUCCESSO", test_title: "Si sono formati qui. Sono stati assunti.",
    testi1_text: '"Non avevo idea di cosa chiedessero davvero i recruiter delle crociere. Dopo due settimane qui, ho affrontato il colloquio con sicurezza."',
    testi2_text: '"Il simulatore vocale è incredibile. Ho praticato ogni sera per una settimana e il mio inglese è migliorato tantissimo."',
    testi3_text: '"Avevo paura di parlare inglese in un colloquio. Questa piattaforma mi ha dato esattamente le frasi di cui avevo bisogno."',
    price_title: "Investi in te stesso. Cambia la tua vita.",
    price_sub: "Un pagamento. Accesso a vita. Nessun costo nascosto.",
    free_title: "Starter Gratuito", free_sub: "Provalo — nessuna carta di credito", free_cta: "Inizia Gratis",
    prem_title: "Formazione Completa", prem_sub: "Tutto ciò di cui hai bisogno", prem_cta: "Sblocca la Formazione — $19",
    timer_label: "⏳ Il prezzo aumenta tra:",
    cta_title: "Non restare a terra.<br>La tua nave ti aspetta.",
    cta_sub: "Ogni giorno che aspetti è un giorno in cui qualcun altro prende il tuo posto.",
    cta_btn: "Inizia Ora — È Gratis",
    footer_tagline: "Il tuo viaggio inizia qui."
  },
  ph: {
    nav_home: "Home", nav_interview: "Panayam", nav_vocab: "Bokabularyo",
    nav_english: "Ingles", nav_entertain: "Libangan", nav_jobs: "Trabaho",
    nav_start: "Magsimula Libre",
    hero_badge: "🚢 #1 Plataporma ng Pagsasanay para sa Cruise",
    hero_title: "Ang iyong dream job<br><em>nagsisimula dito.</em>",
    hero_sub: "Tunay na mga tanong sa panayam. Voice simulation. Pagsasanay sa Ingles.<br>Makapasok sa trabaho sa cruise ship.",
    hero_cta1: "🎤 Magsanay ng Panayam", hero_cta2: "Mag-aral ng Ingles Libre",
    hero_proof: "Sumali sa 200+ kandidato na nagsasanay na",
    mission_text: "Ang aming misyon ay gawing accessible ang mga trabaho sa cruise ship para sa lahat.",
    dept_label: "PAGSASANAY AYON SA DEPARTAMENTO", dept_title: "Para saan kang naghahanda?",
    dept_sub: "Espesyal na pagsasanay para sa bawat departamento ng cruise ship.",
    dept_ent_title: "Entertainment Host", dept_ent_desc: "Trivia, bingo, karaoke at mga script ng hosting.",
    dept_fb_title: "Pagkain at Inumin", dept_fb_desc: "Pagsasanay sa serbisyo para sa mga waiter at bartender.",
    dept_hk_title: "Housekeeping", dept_hk_desc: "Komunikasyon sa serbisyo ng cabin.",
    dept_gs_title: "Guest Services", dept_gs_desc: "Hawakan ang mga kahilingan at sitwasyon sa barko.",
    dept_questions: "48 tanong",
    how_title: "Mula sa wala hanggang hired sa 4 na hakbang",
    step1_title: "Pag-aralan ang tunay na tanong", step1_desc: "120 tunay na tanong ng recruiter na may mga modelo na sagot.",
    step2_title: "Sanayin ang iyong Ingles", step2_desc: "Bokabularyo ayon sa departamento at pagsasanay sa pagbigkas.",
    step3_title: "I-simulate ang panayam", step3_desc: "Sabihin ang iyong sagot. Makakuha ng instant na feedback.",
    step4_title: "Makuha ang iyong sertipiko", step4_desc: "I-download ang iyong sertipiko at ipakita sa mga recruiter.",
    feat_title: "Magsalita. Mag-score. Gumaling.",
    feat_desc: "Ang aming voice interview simulator ay nakikinig sa iyong sagot at nagkukumpara nito sa modelo.",
    feat_b1: "Pinakamainam sa Google Chrome", feat_b2: "Naaayos na bilis at accent", feat_b3: "Instant na score at mga tip",
    feat_cta: "Subukan ang Simulator →",
    test_label: "MGA KWENTO NG TAGUMPAY", test_title: "Nagsanay dito. Natanggap sila.",
    testi1_text: '"Hindi ko alam kung ano talaga ang tinatanong ng mga recruiter ng cruise. Pagkatapos ng dalawang linggo dito, pumasok ako sa panayam nang may kumpiyansa."',
    testi2_text: '"Ang voice simulator ay kamangha-mangha. Nag-practice ako tuwing gabi sa loob ng isang linggo at ang aking Ingles ay lubos na gumaling."',
    testi3_text: '"Natakot ako na magsalita ng Ingles sa panayam. Ibinigay sa akin ng platform na ito ang eksaktong mga pariralang kailangan ko."',
    price_title: "Mag-invest sa iyong sarili. Baguhin ang iyong buhay.",
    price_sub: "Isang bayad. Habambuhay na access. Walang nakatagong bayad.",
    free_title: "Libre na Starter", free_sub: "Subukan — walang credit card", free_cta: "Magsimula Libre",
    prem_title: "Kumpletong Pagsasanay", prem_sub: "Lahat ng kailangan mo para matanggap", prem_cta: "I-unlock ang Pagsasanay — $19",
    timer_label: "⏳ Tataas ang presyo sa:",
    cta_title: "Huwag manatili sa lupa.<br>Naghihintay ang iyong barko.",
    cta_sub: "Bawat araw na hinihintay mo ay isang araw na kinukuha ng ibang tao ang iyong lugar.",
    cta_btn: "Magsimula Ngayon — Libre Ito",
    footer_tagline: "Nagsisimula ang iyong paglalakbay dito."
  }
};

// ---- STATE ----
let currentLang = localStorage.getItem('cia_lang') || 'en';
let userState = JSON.parse(localStorage.getItem('cia_user') || 'null');

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  setupLangSelector();
  setupHamburger();
  setupDeptCards();
  setupCountdown();
  simulateFreeCounter();
  highlightActiveNav();
  restoreUserState();
});

// ---- LANGUAGE ----
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('cia_lang', lang);
  const t = i18n[lang] || i18n['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.documentElement.lang = lang === 'ph' ? 'tl' : lang;
}

function setupLangSelector() {
  const sel = document.getElementById('langSelector');
  if (!sel) return;
  sel.value = currentLang;
  sel.addEventListener('change', () => applyLanguage(sel.value));
}

// ---- HAMBURGER MENU ----
function setupHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mainMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', menu.classList.contains('open'));
  });
  // Close on nav link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ---- ACTIVE NAV ----
function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ---- DEPT CARDS ----
function setupDeptCards() {
  document.querySelectorAll('.dept-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.getAttribute('data-href');
    });
    card.style.cursor = 'pointer';
  });
}

// ---- COUNTDOWN TIMER ----
function setupCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  // Use localStorage to persist the end time so refresh doesn't reset it
  let endTime = localStorage.getItem('cia_countdown_end');
  if (!endTime) {
    endTime = Date.now() + 23 * 3600000 + 47 * 60000 + 12000;
    localStorage.setItem('cia_countdown_end', endTime);
  }

  function tick() {
    const remaining = Math.max(0, endTime - Date.now());
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (remaining <= 0) {
      localStorage.removeItem('cia_countdown_end');
      setupCountdown();
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ---- FREE SPOTS COUNTER ----
function simulateFreeCounter() {
  const el = document.getElementById('freeCounter');
  if (!el) return;
  let count = parseInt(localStorage.getItem('cia_free_spots') || '47');
  el.textContent = count;
  // Slowly decrease over time (not on every reload — only once per session)
  if (!sessionStorage.getItem('cia_spots_decreased')) {
    const decrease = Math.floor(Math.random() * 3) + 1;
    count = Math.max(12, count - decrease);
    localStorage.setItem('cia_free_spots', count);
    sessionStorage.setItem('cia_spots_decreased', '1');
    el.textContent = count;
  }
}

// ---- MODALS ----
function openLogin() {
  const m = document.getElementById('loginModal');
  if (m) m.style.display = 'flex';
}
function closeLogin() {
  const m = document.getElementById('loginModal');
  if (m) m.style.display = 'none';
}
function openCart() {
  const m = document.getElementById('cartModal');
  if (m) m.style.display = 'flex';
}
function closeCart() {
  const m = document.getElementById('cartModal');
  if (m) m.style.display = 'none';
}

// ---- HANDLE LOGIN ----
function handleLogin() {
  const email = document.getElementById('loginEmail')?.value.trim();
  if (!email) { showToast('Please enter your email.'); return; }
  // Simulate login via localStorage
  const saved = JSON.parse(localStorage.getItem('cia_user') || 'null');
  if (saved && saved.email === email) {
    userState = saved;
    closeLogin();
    showToast(`Welcome back, ${saved.name || email}! 🎉`);
  } else {
    showToast('No account found. Start for free below!');
    closeLogin();
  }
}

// ---- HANDLE CART SUBMIT ----
function handleCartSubmit() {
  const email = document.getElementById('cartEmail')?.value.trim();
  if (!email || !email.includes('@')) { showToast('Please enter a valid email.'); return; }
  // Save as pre-registered user
  const user = { email, premium: false, registeredAt: new Date().toISOString() };
  localStorage.setItem('cia_user', JSON.stringify(user));
  userState = user;
  closeCart();
  showToast('✅ Spot reserved! You will be notified at launch.');
}

// ---- TOAST ----
function showToast(msg, duration = 4000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ---- RESTORE USER STATE ----
function restoreUserState() {
  if (userState) {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.textContent = userState.name ? `Hi, ${userState.name.split(' ')[0]}` : 'My Account';
    }
  }
}

// ---- STICKY TOPBAR SHADOW ----
window.addEventListener('scroll', () => {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  if (window.scrollY > 20) {
    topbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
  } else {
    topbar.style.boxShadow = 'none';
  }
}, { passive: true });

// ---- KEYBOARD: ESC closes modals ----
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLogin();
    closeCart();
  }
});
