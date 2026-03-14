/* ==============================================
   CruiseInterviewAcademy — main.js
   Traducción completa de página, countdown,
   hamburger, scroll topbar, free counter
   ============================================== */

// ================================================================
// TRADUCCIONES — cada key coincide con data-i18n en el HTML
// ================================================================
const TRANSLATIONS = {
  en: {
    announce_text: '🔥 <strong>Free Access:</strong> Only <span id="freeCounter">47</span> spots remaining today',
    nav_home:'Home', nav_interview:'Interview', nav_english:'English Training',
    nav_vocab:'Vocabulary', nav_entertain:'Entertainment', nav_jobs:'Jobs', nav_resources:'Resources',
    btn_login:'Login', btn_cart:'🛒 Cart',
    hero_badge:'🚢 #1 Cruise Interview Training Platform',
    hero_title:'Train for Cruise Ship Jobs',
    hero_sub:'Practice real cruise recruiter interviews and improve your English.<br>Get hired wherever you are in the world.',
    btn_interview:'🎤 Start Interview', btn_english:'Train English',
    hero_proof:'200+ candidates already training',
    dept_label:'TRAIN BY DEPARTMENT',
    dept_title:'Train for Cruise Ship Jobs and Improve Your English',
    dept_sub:'Our training platform prepares candidates for several cruise ship departments including entertainment, guest services, restaurant staff and housekeeping.',
    dept_ent_title:'🎤 Entertainment', dept_ent_desc:'Hosting trivia, bingo, karaoke and onboard activities.', dept_ent_tag:'48 questions',
    dept_fb_title:'🍽 Food & Beverage',  dept_fb_desc:'Guest service training for waiters, bartenders and buffet staff.', dept_fb_tag:'36 questions',
    dept_hk_title:'🧹 Housekeeping',     dept_hk_desc:'Learn guest interaction and cabin service communication.', dept_hk_tag:'24 questions',
    dept_gs_title:'🛎 Guest Services',   dept_gs_desc:'Handling guest questions, requests and onboard situations.', dept_gs_tag:'12 questions',
    training_feat:'🎧 Train your English for cruise ship jobs with audio practice, real interview questions and guest interaction phrases used onboard.',
    how_label:'HOW IT WORKS', how_title:'From Zero to Hired in 4 Steps',
    step1_title:'Study real questions',   step1_desc:'120 real cruise recruiter questions with model answers and follow-ups.',
    step2_title:'Train your English',     step2_desc:'Vocabulary by department, pronunciation practice and audio phrases.',
    step3_title:'Simulate the interview', step3_desc:'Speak your answer. Get instant feedback on pronunciation and accuracy.',
    step4_title:'Earn your certificate',  step4_desc:'Download your completion certificate and show it to recruiters.',
    modules_label:'MODULES', modules_title:"What You'll Train",
    mod_int_title:'Interview',    mod_int_desc:'Practice interviews with real recruiter questions',
    mod_eng_title:'English',      mod_eng_desc:'Basic phrases and listening exercises',
    mod_voc_title:'Vocabulary',   mod_voc_desc:'Key cruise vocabulary with interactive flashcards',
    mod_ent_title:'Entertainment',mod_ent_desc:'Host activities like bingo and karaoke',
    mod_job_title:'Jobs',         mod_job_desc:'Main cruise ship roles and responsibilities',
    test_label:'SUCCESS STORIES', test_title:'They Trained Here. They Got Hired.',
    testi1:'"I had no idea what cruise recruiters actually ask. After two weeks here, I walked into my interview feeling confident and got the job."',
    testi2:'"The voice simulator is incredible. I practiced every night and my English improved so much the recruiter complimented me directly."',
    testi3:'"I was scared of speaking English in an interview. This platform gave me the exact phrases I needed. Now I\'m onboard living my dream."',
    price_label:'PRICING', price_title:'Complete Cruise Job Training',
    price_sub:'Prepare for cruise ship interviews, onboard activities and real guest interaction.',
    free_title:'Free Starter', free_sub:'No credit card needed',
    free_f1:'20 interview questions', free_f2:'Basic vocabulary cards', free_f3:'1 department module',
    free_f4:'Voice interview simulator', free_f5:'120 full Q&A with model answers',
    free_f6:'Audio pronunciation training', free_f7:'Completion certificate',
    free_cta:'Start for Free',
    popular_badge:'MOST POPULAR',
    prem_title:'Full Cruise Job Training', prem_sub:'Everything you need to get hired',
    prem_f1:'✓ 120 Real Cruise Interview Questions',
    prem_f2:'✓ Follow-up recruiter questions and answer examples',
    prem_f3:'✓ English training for cruise ship jobs',
    prem_f4:'✓ Audio practice for pronunciation and guest interaction',
    prem_f5:'✓ Communication phrases used onboard',
    prem_f6:'✓ Entertainment hosting scripts (Trivia, Bingo, Karaoke)',
    prem_f7:'✓ Guest service training scenarios',
    prem_f8:'✓ Restaurant & hospitality communication training',
    prem_f9:'✓ Housekeeping guest interaction phrases',
    prem_f10:'✓ Progress tracking through modules',
    prem_f11:'✓ Final evaluation and training feedback',
    prem_f12:'✓ Certificate of completion',
    prem_cta:'Unlock Full Training — $19',
    timer_label:'Price increases in:',
    guarantee:'🔒 30-day money-back guarantee',
    cta_title:"Don't Stay on Shore.<br><em>Your Ship is Waiting.</em>",
    cta_sub:'Every day you wait is a day someone else takes your spot onboard.',
    cta_btn:"Start Training Now — It's Free",
    sb_progress:'Your Progress', sb_progress_text:'40% — 12/30 activities completed',
    sb_recommended:'Recommended',
    sb_ad1:'📘 Cruise Interview Ebook', sb_ad2:'🗣 500 Cruise Phrases',
    sb_ad3:'🚢 Cruise Job Guide', sb_ad4:'🎓 Cruise Interview Course',
    sb_partners:'Partner Opportunities',
    sb_ad5:'🌎 International Cruise Jobs', sb_ad6:'⚓ Cruise Recruitment Agencies',
    sb_ad7:'🧳 Work Abroad Programs', sb_ad8:'✈ Hospitality Careers Worldwide',
    chrome_tip:'🎤 For best voice results, use <strong>Google Chrome</strong> on desktop.',
    footer_tag:'Your journey starts here.',
ref_label:'REFER A FRIEND', ref_title:'Share & Earn $2 per Referral',
ref_desc:'Every friend you refer who buys Full Training gets you <strong>$2 back</strong>. No limits.',
ref_s1:'Get your unique referral link below', ref_s2:'Share it on WhatsApp, Instagram or TikTok',
ref_s3:'Earn $2 for every friend who joins Premium',
ref_your_link:'Your referral link', ref_copy:'Copy', 
ref_note:'💡 Sign up or log in to activate your personal link',
ref_referred:'referred', ref_earned:'earned',
  },

  es: {
    announce_text: '🔥 <strong>Acceso Gratis:</strong> Solo <span id="freeCounter">47</span> lugares disponibles hoy',
    nav_home:'Inicio', nav_interview:'Entrevista', nav_english:'Inglés',
    nav_vocab:'Vocabulario', nav_entertain:'Entretenimiento', nav_jobs:'Empleos', nav_resources:'Recursos',
    btn_login:'Ingresar', btn_cart:'🛒 Carrito',
    hero_badge:'🚢 Plataforma #1 de Entrenamiento para Cruceros',
    hero_title:'Entrená para Trabajar en Cruceros',
    hero_sub:'Practicá entrevistas reales con reclutadores y mejorá tu inglés.<br>Conseguí trabajo en un crucero desde donde estés.',
    btn_interview:'🎤 Iniciar Entrevista', btn_english:'Entrenar Inglés',
    hero_proof:'200+ candidatos ya entrenando',
    dept_label:'ENTRENAMIENTO POR ÁREA',
    dept_title:'Preparate para Trabajar en Cruceros y Mejorá tu Inglés',
    dept_sub:'Nuestra plataforma prepara candidatos para distintos departamentos de cruceros: entretenimiento, servicios al huésped, restaurante y housekeeping.',
    dept_ent_title:'🎤 Entretenimiento', dept_ent_desc:'Hosting de trivia, bingo, karaoke y actividades a bordo.', dept_ent_tag:'48 preguntas',
    dept_fb_title:'🍽 Alimentos y Bebidas', dept_fb_desc:'Entrenamiento de servicio para camareros, bartenders y buffet.', dept_fb_tag:'36 preguntas',
    dept_hk_title:'🧹 Housekeeping',        dept_hk_desc:'Interacción con huéspedes y comunicación en cabinas.', dept_hk_tag:'24 preguntas',
    dept_gs_title:'🛎 Guest Services',      dept_gs_desc:'Manejo de preguntas, solicitudes y situaciones a bordo.', dept_gs_tag:'12 preguntas',
    training_feat:'🎧 Entrenátu inglés para cruceros con práctica en audio, preguntas reales de entrevistas y frases de interacción con huéspedes.',
    how_label:'CÓMO FUNCIONA', how_title:'De Cero a Contratado en 4 Pasos',
    step1_title:'Estudiá preguntas reales',   step1_desc:'120 preguntas reales de reclutadores con respuestas modelo y repreguntas.',
    step2_title:'Entrenás tu inglés',          step2_desc:'Vocabulario por área, práctica de pronunciación y frases en audio.',
    step3_title:'Simulás la entrevista',       step3_desc:'Hablá tu respuesta. Recibí feedback inmediato sobre pronunciación y precisión.',
    step4_title:'Obtenés tu certificado',      step4_desc:'Descargá tu certificado y mostráselo a los reclutadores.',
    modules_label:'MÓDULOS', modules_title:'Qué Vas a Entrenar',
    mod_int_title:'Entrevista',      mod_int_desc:'Práctica de entrevistas con preguntas reales de reclutadores',
    mod_eng_title:'Inglés',          mod_eng_desc:'Frases básicas y ejercicios de listening',
    mod_voc_title:'Vocabulario',     mod_voc_desc:'Palabras clave de cruceros con flashcards interactivas',
    mod_ent_title:'Entretenimiento', mod_ent_desc:'Hosting de actividades como bingo y karaoke',
    mod_job_title:'Empleos',         mod_job_desc:'Roles principales en cruceros y sus responsabilidades',
    test_label:'HISTORIAS DE ÉXITO', test_title:'Entrenaron Aquí. Los Contrataron.',
    testi1:'"No tenía idea de qué preguntan los reclutadores de cruceros. Después de dos semanas aquí, entré a la entrevista con confianza y conseguí el trabajo."',
    testi2:'"El simulador de voz es increíble. Practiqué todas las noches y mi inglés mejoró tanto que el reclutador me felicitó directamente."',
    testi3:'"Tenía miedo de hablar inglés en una entrevista. Esta plataforma me dio exactamente las frases que necesitaba. Ahora estoy a bordo viviendo mi sueño."',
    price_label:'PRECIOS', price_title:'Entrenamiento Completo para Cruceros',
    price_sub:'Preparate para entrevistas, actividades a bordo e interacción real con huéspedes.',
    free_title:'Starter Gratis', free_sub:'Sin tarjeta de crédito',
    free_f1:'20 preguntas de entrevista', free_f2:'Tarjetas de vocabulario básico', free_f3:'1 módulo de área',
    free_f4:'Simulador de entrevista por voz', free_f5:'120 Q&A completas con respuestas modelo',
    free_f6:'Entrenamiento de pronunciación en audio', free_f7:'Certificado de finalización',
    free_cta:'Empezar Gratis',
    popular_badge:'MÁS POPULAR',
    prem_title:'Entrenamiento Completo', prem_sub:'Todo lo que necesitás para conseguir el trabajo',
    prem_f1:'✓ 120 Preguntas Reales de Entrevistas de Crucero',
    prem_f2:'✓ Repreguntas del reclutador y respuestas modelo',
    prem_f3:'✓ Entrenamiento de inglés para cruceros',
    prem_f4:'✓ Práctica de audio para pronunciación e interacción',
    prem_f5:'✓ Frases de comunicación usadas a bordo',
    prem_f6:'✓ Scripts de hosting (Trivia, Bingo, Karaoke)',
    prem_f7:'✓ Escenarios de servicio al huésped',
    prem_f8:'✓ Comunicación en restaurante y hospitalidad',
    prem_f9:'✓ Frases de interacción en Housekeeping',
    prem_f10:'✓ Seguimiento de progreso por módulo',
    prem_f11:'✓ Evaluación final y feedback',
    prem_f12:'✓ Certificado de finalización',
    prem_cta:'Desbloquear Entrenamiento — $19',
    timer_label:'El precio sube en:',
    guarantee:'🔒 Garantía de devolución 30 días',
    cta_title:'No te quedés en tierra.<br><em>Tu barco te espera.</em>',
    cta_sub:'Cada día que esperás es un día que otra persona ocupa tu lugar a bordo.',
    cta_btn:'Empezar Ahora — Es Gratis',
    sb_progress:'Tu Progreso', sb_progress_text:'40% — 12/30 actividades completadas',
    sb_recommended:'Recomendados',
    sb_ad1:'📘 Ebook de Entrevistas de Crucero', sb_ad2:'🗣 500 Frases para Cruceros',
    sb_ad3:'🚢 Guía de Empleos en Cruceros', sb_ad4:'🎓 Curso de Entrevistas',
    sb_partners:'Oportunidades de Socios',
    sb_ad5:'🌎 Empleos en Cruceros Internacionales', sb_ad6:'⚓ Agencias de Reclutamiento',
    sb_ad7:'🧳 Programas Work Abroad', sb_ad8:'✈ Carreras en Hospitalidad',
    chrome_tip:'🎤 Para mejor simulación de voz, usá <strong>Google Chrome</strong> en desktop.',
    footer_tag:'Tu viaje empieza aquí.',
   ref_label:'REFERIDOS', ref_title:'Compartí y Ganá $2 por Referido',
ref_desc:'Cada amigo que traés y compra el entrenamiento completo te devuelve <strong>$2</strong>. Sin límites.',
ref_s1:'Obtené tu link único abajo', ref_s2:'Compartilo por WhatsApp, Instagram o TikTok',
ref_s3:'Ganá $2 por cada amigo que se una al Premium',
ref_your_link:'Tu link de referido', ref_copy:'Copiar',
ref_note:'💡 Registrate o ingresá para activar tu link personal',
ref_referred:'referidos', ref_earned:'ganado',
  },

  pt: {
    announce_text: '🔥 <strong>Acesso Grátis:</strong> Apenas <span id="freeCounter">47</span> vagas disponíveis hoje',
    nav_home:'Início', nav_interview:'Entrevista', nav_english:'Inglês',
    nav_vocab:'Vocabulário', nav_entertain:'Entretenimento', nav_jobs:'Empregos', nav_resources:'Recursos',
    btn_login:'Entrar', btn_cart:'🛒 Carrinho',
    hero_badge:'🚢 Plataforma #1 de Treinamento para Cruzeiros',
    hero_title:'Treine para Trabalhar em Cruzeiros',
    hero_sub:'Pratique entrevistas reais com recrutadores e melhore seu inglês.<br>Seja contratado em um cruzeiro de qualquer lugar do mundo.',
    btn_interview:'🎤 Iniciar Entrevista', btn_english:'Treinar Inglês',
    hero_proof:'200+ candidatos já treinando',
    dept_label:'TREINAMENTO POR DEPARTAMENTO',
    dept_title:'Treine para Trabalhar em Cruzeiros e Melhore seu Inglês',
    dept_sub:'Nossa plataforma prepara candidatos para vários departamentos de cruzeiros: entretenimento, serviços aos hóspedes, restaurante e housekeeping.',
    dept_ent_title:'🎤 Entretenimento', dept_ent_desc:'Hosting de trivia, bingo, karaokê e atividades a bordo.', dept_ent_tag:'48 perguntas',
    dept_fb_title:'🍽 Alimentos e Bebidas', dept_fb_desc:'Treinamento de serviço para garçons, bartenders e buffet.', dept_fb_tag:'36 perguntas',
    dept_hk_title:'🧹 Housekeeping',        dept_hk_desc:'Interação com hóspedes e comunicação em cabines.', dept_hk_tag:'24 perguntas',
    dept_gs_title:'🛎 Guest Services',      dept_gs_desc:'Gerenciar perguntas, pedidos e situações a bordo.', dept_gs_tag:'12 perguntas',
    training_feat:'🎧 Treine seu inglês para cruzeiros com prática em áudio, perguntas reais de entrevistas e frases de interação com hóspedes.',
    how_label:'COMO FUNCIONA', how_title:'Do Zero ao Contratado em 4 Passos',
    step1_title:'Estude perguntas reais',    step1_desc:'120 perguntas reais de recrutadores com respostas modelo.',
    step2_title:'Treine seu inglês',         step2_desc:'Vocabulário por departamento, prática de pronúncia e frases em áudio.',
    step3_title:'Simule a entrevista',       step3_desc:'Fale sua resposta. Receba feedback instantâneo sobre pronúncia e precisão.',
    step4_title:'Ganhe seu certificado',     step4_desc:'Baixe seu certificado e mostre aos recrutadores.',
    modules_label:'MÓDULOS', modules_title:'O Que Você Vai Treinar',
    mod_int_title:'Entrevista',     mod_int_desc:'Pratique entrevistas com perguntas reais de recrutadores',
    mod_eng_title:'Inglês',         mod_eng_desc:'Frases básicas e exercícios de listening',
    mod_voc_title:'Vocabulário',    mod_voc_desc:'Vocabulário de cruzeiros com flashcards interativos',
    mod_ent_title:'Entretenimento', mod_ent_desc:'Apresente atividades como bingo e karaokê',
    mod_job_title:'Empregos',       mod_job_desc:'Principais funções em cruzeiros e responsabilidades',
    test_label:'HISTÓRIAS DE SUCESSO', test_title:'Treinaram Aqui. Foram Contratados.',
    testi1:'"Não sabia o que os recrutadores realmente perguntam. Depois de duas semanas aqui, entrei na entrevista com confiança e consegui o emprego."',
    testi2:'"O simulador de voz é incrível. Pratiquei toda noite e meu inglês melhorou tanto que o recrutador me elogiou."',
    testi3:'"Tinha medo de falar inglês em entrevista. Esta plataforma me deu exatamente as frases que precisava. Agora estou a bordo vivendo meu sonho."',
    price_label:'PREÇOS', price_title:'Treinamento Completo para Cruzeiros',
    price_sub:'Prepare-se para entrevistas, atividades a bordo e interação real com hóspedes.',
    free_title:'Starter Grátis', free_sub:'Sem cartão de crédito',
    free_f1:'20 perguntas de entrevista', free_f2:'Cartões de vocabulário básico', free_f3:'1 módulo de departamento',
    free_f4:'Simulador de entrevista por voz', free_f5:'120 Q&A completas com respostas modelo',
    free_f6:'Treinamento de pronúncia em áudio', free_f7:'Certificado de conclusão',
    free_cta:'Começar Grátis',
    popular_badge:'MAIS POPULAR',
    prem_title:'Treinamento Completo', prem_sub:'Tudo que você precisa para ser contratado',
    prem_f1:'✓ 120 Perguntas Reais de Entrevistas de Cruzeiro',
    prem_f2:'✓ Perguntas de acompanhamento e respostas modelo',
    prem_f3:'✓ Treinamento de inglês para cruzeiros',
    prem_f4:'✓ Prática de áudio para pronúncia e interação',
    prem_f5:'✓ Frases de comunicação usadas a bordo',
    prem_f6:'✓ Scripts de hosting (Trivia, Bingo, Karaokê)',
    prem_f7:'✓ Cenários de serviço ao hóspede',
    prem_f8:'✓ Comunicação em restaurante e hospitalidade',
    prem_f9:'✓ Frases de interação em Housekeeping',
    prem_f10:'✓ Acompanhamento de progresso por módulo',
    prem_f11:'✓ Avaliação final e feedback',
    prem_f12:'✓ Certificado de conclusão',
    prem_cta:'Desbloquear Treinamento — $19',
    timer_label:'O preço aumenta em:',
    guarantee:'🔒 Garantia de reembolso de 30 dias',
    cta_title:'Não fique em terra.<br><em>Seu navio está esperando.</em>',
    cta_sub:'Cada dia que você espera é um dia que outra pessoa ocupa seu lugar a bordo.',
    cta_btn:'Começar Agora — É Grátis',
    sb_progress:'Seu Progresso', sb_progress_text:'40% — 12/30 atividades concluídas',
    sb_recommended:'Recomendados',
    sb_ad1:'📘 Ebook de Entrevistas de Cruzeiro', sb_ad2:'🗣 500 Frases para Cruzeiros',
    sb_ad3:'🚢 Guia de Empregos em Cruzeiros', sb_ad4:'🎓 Curso de Entrevistas',
    sb_partners:'Oportunidades de Parceiros',
    sb_ad5:'🌎 Empregos Internacionais em Cruzeiros', sb_ad6:'⚓ Agências de Recrutamento',
    sb_ad7:'🧳 Programas Work Abroad', sb_ad8:'✈ Carreiras em Hospitalidade',
    chrome_tip:'🎤 Para melhor simulação de voz, use o <strong>Google Chrome</strong> no desktop.',
    footer_tag:'Sua jornada começa aqui.', 
     ref_label:'INDICAÇÕES', ref_title:'Compartilhe e Ganhe $2 por Indicação',
ref_desc:'Cada amigo que você indicar e comprar o treinamento completo te devolve <strong>$2</strong>. Sem limites.',
ref_s1:'Pegue seu link único abaixo', ref_s2:'Compartilhe no WhatsApp, Instagram ou TikTok',
ref_s3:'Ganhe $2 por cada amigo que entrar no Premium',
ref_your_link:'Seu link de indicação', ref_copy:'Copiar',
ref_note:'💡 Cadastre-se ou entre para ativar seu link pessoal',
ref_referred:'indicados', ref_earned:'ganho',
  },

  fr: {
    announce_text: '🔥 <strong>Accès Gratuit:</strong> Seulement <span id="freeCounter">47</span> places disponibles aujourd\'hui',
    nav_home:'Accueil', nav_interview:'Entretien', nav_english:'Anglais',
    nav_vocab:'Vocabulaire', nav_entertain:'Divertissement', nav_jobs:'Emplois', nav_resources:'Ressources',
    btn_login:'Connexion', btn_cart:'🛒 Panier',
    hero_badge:'🚢 Plateforme #1 de Formation pour Croisières',
    hero_title:'Formez-vous pour Travailler sur un Bateau de Croisière',
    hero_sub:'Pratiquez de vrais entretiens avec des recruteurs et améliorez votre anglais.<br>Soyez embauché sur un bateau de croisière depuis n\'importe où.',
    btn_interview:'🎤 Commencer l\'Entretien', btn_english:'Former l\'Anglais',
    hero_proof:'200+ candidats déjà en formation',
    dept_label:'FORMATION PAR DÉPARTEMENT',
    dept_title:'Formez-vous pour les Croisières et Améliorez votre Anglais',
    dept_sub:'Notre plateforme prépare les candidats pour plusieurs départements : animation, service client, restauration et housekeeping.',
    dept_ent_title:'🎤 Animation', dept_ent_desc:'Hosting de quiz, bingo, karaoké et activités à bord.', dept_ent_tag:'48 questions',
    dept_fb_title:'🍽 Restauration',   dept_fb_desc:'Formation au service pour serveurs, bartenders et buffet.', dept_fb_tag:'36 questions',
    dept_hk_title:'🧹 Housekeeping',   dept_hk_desc:'Interaction avec les hôtes et communication en cabine.', dept_hk_tag:'24 questions',
    dept_gs_title:'🛎 Service Client', dept_gs_desc:'Gérer les demandes, réclamations et situations à bord.', dept_gs_tag:'12 questions',
    training_feat:'🎧 Entraînez votre anglais avec des exercices audio, de vraies questions d\'entretien et des phrases d\'interaction utilisées à bord.',
    how_label:'COMMENT ÇA MARCHE', how_title:'De Zéro à Embauché en 4 Étapes',
    step1_title:'Étudiez les vraies questions', step1_desc:'120 vraies questions de recruteurs avec réponses modèles.',
    step2_title:'Entraînez votre anglais',       step2_desc:'Vocabulaire par département, pratique de prononciation et phrases audio.',
    step3_title:'Simulez l\'entretien',           step3_desc:'Parlez votre réponse. Recevez un feedback immédiat.',
    step4_title:'Obtenez votre certificat',       step4_desc:'Téléchargez votre certificat et montrez-le aux recruteurs.',
    modules_label:'MODULES', modules_title:'Ce Que Vous Allez Entraîner',
    mod_int_title:'Entretien',      mod_int_desc:'Pratiquez des entretiens avec de vraies questions de recruteurs',
    mod_eng_title:'Anglais',        mod_eng_desc:'Phrases de base et exercices d\'écoute',
    mod_voc_title:'Vocabulaire',    mod_voc_desc:'Vocabulaire clé des croisières avec flashcards interactives',
    mod_ent_title:'Divertissement', mod_ent_desc:'Animez des activités comme le bingo et le karaoké',
    mod_job_title:'Emplois',        mod_job_desc:'Principaux rôles sur les croisières et responsabilités',
    test_label:'TÉMOIGNAGES', test_title:'Ils se sont Formés Ici. Ils ont été Embauchés.',
    testi1:'"Je ne savais pas ce que les recruteurs demandent vraiment. Après deux semaines ici, j\'ai passé mon entretien avec confiance et j\'ai eu le poste."',
    testi2:'"Le simulateur vocal est incroyable. J\'ai pratiqué chaque soir et mon anglais s\'est tellement amélioré que le recruteur me l\'a dit directement."',
    testi3:'"J\'avais peur de parler anglais en entretien. Cette plateforme m\'a donné exactement les phrases dont j\'avais besoin. Je vis maintenant mon rêve à bord."',
    price_label:'TARIFS', price_title:'Formation Complète pour Croisières',
    price_sub:'Préparez-vous pour les entretiens, les activités à bord et l\'interaction réelle avec les hôtes.',
    free_title:'Starter Gratuit', free_sub:'Sans carte de crédit',
    free_f1:'20 questions d\'entretien', free_f2:'Cartes de vocabulaire de base', free_f3:'1 module de département',
    free_f4:'Simulateur d\'entretien vocal', free_f5:'120 Q&R complètes avec réponses modèles',
    free_f6:'Entraînement à la prononciation audio', free_f7:'Certificat de fin de formation',
    free_cta:'Commencer Gratuitement',
    popular_badge:'LE PLUS POPULAIRE',
    prem_title:'Formation Complète', prem_sub:'Tout ce dont vous avez besoin pour être embauché',
    prem_f1:'✓ 120 Vraies Questions d\'Entretien de Croisière',
    prem_f2:'✓ Questions de suivi et réponses modèles',
    prem_f3:'✓ Formation en anglais pour croisières',
    prem_f4:'✓ Pratique audio pour la prononciation',
    prem_f5:'✓ Phrases de communication utilisées à bord',
    prem_f6:'✓ Scripts d\'animation (Quiz, Bingo, Karaoké)',
    prem_f7:'✓ Scénarios de service aux hôtes',
    prem_f8:'✓ Communication en restauration et hôtellerie',
    prem_f9:'✓ Phrases d\'interaction en Housekeeping',
    prem_f10:'✓ Suivi de progression par module',
    prem_f11:'✓ Évaluation finale et feedback',
    prem_f12:'✓ Certificat de fin de formation',
    prem_cta:'Débloquer la Formation — $19',
    timer_label:'Le prix augmente dans:',
    guarantee:'🔒 Garantie de remboursement 30 jours',
    cta_title:'Ne restez pas à quai.<br><em>Votre bateau vous attend.</em>',
    cta_sub:'Chaque jour que vous attendez, quelqu\'un d\'autre prend votre place à bord.',
    cta_btn:'Commencer Maintenant — C\'est Gratuit',
    sb_progress:'Votre Progression', sb_progress_text:'40% — 12/30 activités complétées',
    sb_recommended:'Recommandés',
    sb_ad1:'📘 Ebook Entretiens Croisière', sb_ad2:'🗣 500 Phrases pour Croisières',
    sb_ad3:'🚢 Guide des Emplois en Croisière', sb_ad4:'🎓 Cours d\'Entretiens',
    sb_partners:'Opportunités Partenaires',
    sb_ad5:'🌎 Emplois Internationaux Croisière', sb_ad6:'⚓ Agences de Recrutement',
    sb_ad7:'🧳 Programmes Work Abroad', sb_ad8:'✈ Carrières en Hôtellerie',
    chrome_tip:'🎤 Pour une meilleure simulation vocale, utilisez <strong>Google Chrome</strong> sur bureau.',
    footer_tag:'Votre voyage commence ici.',
    ref_label:'PARRAINAGE', ref_title:'Partagez et Gagnez 2$ par Filleul',
ref_desc:'Chaque ami que vous parrainez et qui achète la formation complète vous rapporte <strong>2$</strong>. Sans limite.',
ref_s1:'Obtenez votre lien unique ci-dessous', ref_s2:'Partagez sur WhatsApp, Instagram ou TikTok',
ref_s3:'Gagnez 2$ pour chaque ami qui rejoint le Premium',
ref_your_link:'Votre lien de parrainage', ref_copy:'Copier',
ref_note:'💡 Inscrivez-vous ou connectez-vous pour activer votre lien personnel',
ref_referred:'parrainés', ref_earned:'gagné',

  },

  it: {
    announce_text: '🔥 <strong>Accesso Gratuito:</strong> Solo <span id="freeCounter">47</span> posti disponibili oggi',
    nav_home:'Home', nav_interview:'Colloquio', nav_english:'Inglese',
    nav_vocab:'Vocabolario', nav_entertain:'Intrattenimento', nav_jobs:'Lavori', nav_resources:'Risorse',
    btn_login:'Accedi', btn_cart:'🛒 Carrello',
    hero_badge:'🚢 Piattaforma #1 di Formazione per Crociere',
    hero_title:'Formati per Lavorare su una Nave da Crociera',
    hero_sub:'Pratica veri colloqui con recruiter e migliora il tuo inglese.<br>Vieni assunto su una nave da crociera da qualsiasi parte del mondo.',
    btn_interview:'🎤 Inizia il Colloquio', btn_english:'Allena l\'Inglese',
    hero_proof:'200+ candidati già in formazione',
    dept_label:'FORMAZIONE PER REPARTO',
    dept_title:'Formati per le Crociere e Migliora il tuo Inglese',
    dept_sub:'La nostra piattaforma prepara i candidati per vari reparti: intrattenimento, servizio ospiti, ristorazione e housekeeping.',
    dept_ent_title:'🎤 Intrattenimento', dept_ent_desc:'Hosting di quiz, bingo, karaoke e attività a bordo.', dept_ent_tag:'48 domande',
    dept_fb_title:'🍽 Ristorazione',     dept_fb_desc:'Formazione al servizio per camerieri, bartender e buffet.', dept_fb_tag:'36 domande',
    dept_hk_title:'🧹 Housekeeping',     dept_hk_desc:'Interazione con gli ospiti e comunicazione in cabina.', dept_hk_tag:'24 domande',
    dept_gs_title:'🛎 Guest Services',   dept_gs_desc:'Gestire richieste, reclami e situazioni a bordo.', dept_gs_tag:'12 domande',
    training_feat:'🎧 Allena il tuo inglese per le crociere con pratica audio, vere domande di colloquio e frasi di interazione usate a bordo.',
    how_label:'COME FUNZIONA', how_title:'Da Zero ad Assunto in 4 Passi',
    step1_title:'Studia domande reali',    step1_desc:'120 vere domande di recruiter con risposte modello.',
    step2_title:'Allena il tuo inglese',   step2_desc:'Vocabolario per reparto, pratica di pronuncia e frasi audio.',
    step3_title:'Simula il colloquio',     step3_desc:'Parla la tua risposta. Ricevi feedback immediato.',
    step4_title:'Ottieni il tuo certificato', step4_desc:'Scarica il tuo certificato e mostralo ai recruiter.',
    modules_label:'MODULI', modules_title:'Cosa Allenerai',
    mod_int_title:'Colloquio',      mod_int_desc:'Pratica colloqui con vere domande di recruiter',
    mod_eng_title:'Inglese',        mod_eng_desc:'Frasi di base ed esercizi di ascolto',
    mod_voc_title:'Vocabolario',    mod_voc_desc:'Vocabolario chiave delle crociere con flashcard interattive',
    mod_ent_title:'Intrattenimento',mod_ent_desc:'Conduci attività come bingo e karaoke',
    mod_job_title:'Lavori',         mod_job_desc:'Ruoli principali nelle crociere e responsabilità',
    test_label:'STORIE DI SUCCESSO', test_title:'Si sono Formati Qui. Sono stati Assunti.',
    testi1:'"Non sapevo cosa chiedono davvero i recruiter delle crociere. Dopo due settimane qui, ho affrontato il colloquio con sicurezza e ho ottenuto il lavoro."',
    testi2:'"Il simulatore vocale è incredibile. Ho praticato ogni sera e il mio inglese è migliorato così tanto che il recruiter me l\'ha fatto notare."',
    testi3:'"Avevo paura di parlare inglese in un colloquio. Questa piattaforma mi ha dato esattamente le frasi di cui avevo bisogno. Ora sono a bordo vivendo il mio sogno."',
    price_label:'PREZZI', price_title:'Formazione Completa per Crociere',
    price_sub:'Preparati per colloqui, attività a bordo e interazione reale con gli ospiti.',
    free_title:'Starter Gratuito', free_sub:'Nessuna carta di credito',
    free_f1:'20 domande di colloquio', free_f2:'Schede di vocabolario base', free_f3:'1 modulo di reparto',
    free_f4:'Simulatore di colloquio vocale', free_f5:'120 Q&A complete con risposte modello',
    free_f6:'Allenamento di pronuncia audio', free_f7:'Certificato di completamento',
    free_cta:'Inizia Gratis',
    popular_badge:'PIÙ POPOLARE',
    prem_title:'Formazione Completa', prem_sub:'Tutto ciò di cui hai bisogno per essere assunto',
    prem_f1:'✓ 120 Vere Domande di Colloquio per Crociere',
    prem_f2:'✓ Domande di follow-up e risposte modello',
    prem_f3:'✓ Formazione in inglese per crociere',
    prem_f4:'✓ Pratica audio per pronuncia e interazione',
    prem_f5:'✓ Frasi di comunicazione usate a bordo',
    prem_f6:'✓ Script di hosting (Quiz, Bingo, Karaoke)',
    prem_f7:'✓ Scenari di servizio agli ospiti',
    prem_f8:'✓ Comunicazione in ristorazione e ospitalità',
    prem_f9:'✓ Frasi di interazione in Housekeeping',
    prem_f10:'✓ Monitoraggio progressi per modulo',
    prem_f11:'✓ Valutazione finale e feedback',
    prem_f12:'✓ Certificato di completamento',
    prem_cta:'Sblocca la Formazione — $19',
    timer_label:'Il prezzo aumenta tra:',
    guarantee:'🔒 Garanzia di rimborso 30 giorni',
    cta_title:'Non restare a terra.<br><em>La tua nave ti aspetta.</em>',
    cta_sub:'Ogni giorno che aspetti è un giorno in cui qualcun altro prende il tuo posto a bordo.',
    cta_btn:'Inizia Ora — È Gratis',
    sb_progress:'Il tuo Progresso', sb_progress_text:'40% — 12/30 attività completate',
    sb_recommended:'Consigliati',
    sb_ad1:'📘 Ebook Colloqui Crociera', sb_ad2:'🗣 500 Frasi per Crociere',
    sb_ad3:'🚢 Guida ai Lavori in Crociera', sb_ad4:'🎓 Corso di Colloqui',
    sb_partners:'Opportunità Partner',
    sb_ad5:'🌎 Lavori Internazionali in Crociera', sb_ad6:'⚓ Agenzie di Reclutamento',
    sb_ad7:'🧳 Programmi Work Abroad', sb_ad8:'✈ Carriere nell\'Ospitalità',
    chrome_tip:'🎤 Per una migliore simulazione vocale, usa <strong>Google Chrome</strong> su desktop.',
    footer_tag:'Il tuo viaggio inizia qui.',
     ref_label:'REFERRAL', ref_title:'Condividi e Guadagna $2 per Referral',
ref_desc:'Ogni amico che porti e acquista la formazione completa ti restituisce <strong>$2</strong>. Senza limiti.',
ref_s1:'Ottieni il tuo link unico qui sotto', ref_s2:'Condividilo su WhatsApp, Instagram o TikTok',
ref_s3:'Guadagna $2 per ogni amico che entra nel Premium',
ref_your_link:'Il tuo link referral', ref_copy:'Copia',
ref_note:'💡 Registrati o accedi per attivare il tuo link personale',
ref_referred:'referrati', ref_earned:'guadagnato',
  },

  ph: {
    announce_text: '🔥 <strong>Libreng Access:</strong> <span id="freeCounter">47</span> na lugar lang ang natitira ngayon',
    nav_home:'Home', nav_interview:'Panayam', nav_english:'Ingles',
    nav_vocab:'Bokabularyo', nav_entertain:'Libangan', nav_jobs:'Trabaho', nav_resources:'Mga Mapagkukunan',
    btn_login:'Mag-login', btn_cart:'🛒 Cart',
    hero_badge:'🚢 #1 Plataporma ng Pagsasanay para sa Cruise',
    hero_title:'Magsanay para sa Trabaho sa Cruise Ship',
    hero_sub:'Magsanay ng tunay na panayam sa mga recruiter at paunlarin ang iyong Ingles.<br>Matanggap sa trabaho sa cruise ship mula kahit saan sa mundo.',
    btn_interview:'🎤 Simulan ang Panayam', btn_english:'Magsanay ng Ingles',
    hero_proof:'200+ kandidato na nagsasanay na',
    dept_label:'PAGSASANAY AYON SA DEPARTAMENTO',
    dept_title:'Magsanay para sa Cruise Ship at Paunlarin ang iyong Ingles',
    dept_sub:'Inihahanda ng aming plataporma ang mga kandidato para sa iba\'t ibang departamento ng cruise ship.',
    dept_ent_title:'🎤 Entertainment', dept_ent_desc:'Hosting ng trivia, bingo, karaoke at mga aktibidad sa barko.', dept_ent_tag:'48 tanong',
    dept_fb_title:'🍽 Pagkain at Inumin', dept_fb_desc:'Pagsasanay sa serbisyo para sa mga waiter, bartender at buffet.', dept_fb_tag:'36 tanong',
    dept_hk_title:'🧹 Housekeeping',     dept_hk_desc:'Pakikipag-ugnayan sa mga panauhin at komunikasyon sa cabin.', dept_hk_tag:'24 tanong',
    dept_gs_title:'🛎 Guest Services',   dept_gs_desc:'Pangasiwaan ang mga kahilingan at sitwasyon sa barko.', dept_gs_tag:'12 tanong',
    training_feat:'🎧 Sanayin ang iyong Ingles para sa cruise ship na may audio practice, tunay na mga tanong sa panayam at mga parirala ng pakikipag-ugnayan.',
    how_label:'PAANO ITO GUMAGANA', how_title:'Mula sa Wala Hanggang Hired sa 4 na Hakbang',
    step1_title:'Pag-aralan ang tunay na tanong',    step1_desc:'120 tunay na tanong ng recruiter na may mga modelo na sagot.',
    step2_title:'Sanayin ang iyong Ingles',          step2_desc:'Bokabularyo ayon sa departamento at pagsasanay sa pagbigkas.',
    step3_title:'I-simulate ang panayam',            step3_desc:'Sabihin ang iyong sagot. Makakuha ng instant na feedback.',
    step4_title:'Makuha ang iyong sertipiko',        step4_desc:'I-download ang iyong sertipiko at ipakita sa mga recruiter.',
    modules_label:'MGA MODYUL', modules_title:'Ano ang Iyong Isasanay',
    mod_int_title:'Panayam',    mod_int_desc:'Magsanay ng mga panayam na may tunay na tanong ng recruiter',
    mod_eng_title:'Ingles',     mod_eng_desc:'Mga pangunahing parirala at mga ehersisyo sa pakikinig',
    mod_voc_title:'Bokabularyo',mod_voc_desc:'Pangunahing bokabularyo ng cruise na may interactive na flashcard',
    mod_ent_title:'Libangan',   mod_ent_desc:'Mag-host ng mga aktibidad tulad ng bingo at karaoke',
    mod_job_title:'Trabaho',    mod_job_desc:'Pangunahing tungkulin sa cruise ship at mga responsibilidad',
    test_label:'MGA KWENTO NG TAGUMPAY', test_title:'Nagsanay Dito. Natanggap Sila.',
    testi1:'"Hindi ko alam kung ano ang talagang tinatanong ng mga recruiter ng cruise. Pagkatapos ng dalawang linggo dito, pumasok ako sa panayam nang may kumpiyansa at nakuha ko ang trabaho."',
    testi2:'"Ang voice simulator ay kamangha-mangha. Nag-practice ako tuwing gabi at ang aking Ingles ay lubos na gumaling kaya pinuri ako ng recruiter."',
    testi3:'"Natakot ako na magsalita ng Ingles sa panayam. Ibinigay sa akin ng platform na ito ang eksaktong mga pariralang kailangan ko. Ngayon nasa barko na ako at nabubuhay sa aking pangarap."',
    price_label:'MGA PRESYO', price_title:'Kumpletong Pagsasanay para sa Cruise',
    price_sub:'Maghanda para sa mga panayam, aktibidad sa barko at tunay na pakikipag-ugnayan sa mga panauhin.',
    free_title:'Libreng Starter', free_sub:'Hindi kailangan ng credit card',
    free_f1:'20 tanong sa panayam', free_f2:'Mga pangunahing flashcard ng bokabularyo', free_f3:'1 modyul ng departamento',
    free_f4:'Voice interview simulator', free_f5:'120 kumpletong Q&A na may mga modelo na sagot',
    free_f6:'Pagsasanay sa pagbigkas sa audio', free_f7:'Sertipiko ng pagkumpleto',
    free_cta:'Magsimula Libre',
    popular_badge:'PINAKASIKAT',
    prem_title:'Kumpletong Pagsasanay', prem_sub:'Lahat ng kailangan mo para matanggap',
    prem_f1:'✓ 120 Tunay na Tanong sa Panayam ng Cruise',
    prem_f2:'✓ Mga follow-up na tanong at modelo na sagot',
    prem_f3:'✓ Pagsasanay sa Ingles para sa cruise',
    prem_f4:'✓ Pagsasanay sa audio para sa pagbigkas',
    prem_f5:'✓ Mga pariralang ginagamit sa barko',
    prem_f6:'✓ Mga script ng hosting (Trivia, Bingo, Karaoke)',
    prem_f7:'✓ Mga senaryo ng serbisyo sa panauhin',
    prem_f8:'✓ Komunikasyon sa restaurant at hospitalidad',
    prem_f9:'✓ Mga parirala ng Housekeeping',
    prem_f10:'✓ Pagsubaybay ng pag-unlad sa bawat modyul',
    prem_f11:'✓ Huling ebalwasyon at feedback',
    prem_f12:'✓ Sertipiko ng pagkumpleto',
    prem_cta:'I-unlock ang Pagsasanay — $19',
    timer_label:'Tataas ang presyo sa:',
    guarantee:'🔒 30-araw na garantiya ng refund',
    cta_title:'Huwag manatili sa lupa.<br><em>Naghihintay ang iyong barko.</em>',
    cta_sub:'Bawat araw na hinihintay mo ay isang araw na kinukuha ng ibang tao ang iyong lugar sa barko.',
    cta_btn:'Magsimula Ngayon — Libre Ito',
    sb_progress:'Ang Iyong Progreso', sb_progress_text:'40% — 12/30 aktibidad na nakumpleto',
    sb_recommended:'Inirerekomenda',
    sb_ad1:'📘 Cruise Interview Ebook', sb_ad2:'🗣 500 Parirala para sa Cruise',
    sb_ad3:'🚢 Gabay sa Trabaho sa Cruise', sb_ad4:'🎓 Kurso sa Panayam',
    sb_partners:'Mga Pagkakataon ng Kasosyo',
    sb_ad5:'🌎 Internasyonal na Trabaho sa Cruise', sb_ad6:'⚓ Mga Ahensya ng Rekrutment',
    sb_ad7:'🧳 Mga Programa ng Work Abroad', sb_ad8:'✈ Mga Karera sa Hospitalidad',
    chrome_tip:'🎤 Para sa pinakamahusay na simulasyon ng boses, gamitin ang <strong>Google Chrome</strong> sa desktop.',
    footer_tag:'Nagsisimula ang iyong paglalakbay dito.',
     ref_label:'MAG-REFER', ref_title:'Ibahagi at Kumita ng $2 bawat Referral',
ref_desc:'Bawat kaibigan na iyong i-refer at bumili ng kumpletong pagsasanay ay nagbibigay sa iyo ng <strong>$2</strong>. Walang limitasyon.',
ref_s1:'Kunin ang iyong natatanging link sa ibaba', ref_s2:'Ibahagi sa WhatsApp, Instagram o TikTok',
ref_s3:'Kumita ng $2 para sa bawat kaibigan na sumasali sa Premium',
ref_your_link:'Ang iyong referral link', ref_copy:'Kopyahin',
ref_note:'💡 Mag-sign up o mag-login para ma-activate ang iyong personal na link',
ref_referred:'na-refer', ref_earned:'kinita',
  }
};

// ================================================================
// APPLY LANGUAGE — traduce toda la página
// ================================================================
function applyLanguage(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });
  // Re-init free counter (el span se regenera con innerHTML)
  updateFreeCounter();
  localStorage.setItem('cia_lang', lang);
  document.documentElement.lang = lang === 'ph' ? 'tl' : lang;
}

// ================================================================
// INIT
// ================================================================
document.addEventListener('DOMContentLoaded', function () {

  // Idioma guardado
  const savedLang = localStorage.getItem('cia_lang') || 'en';
  const langSel = document.getElementById('language-selector');
  if (langSel) {
    langSel.value = savedLang;
    applyLanguage(savedLang);
    langSel.addEventListener('change', function () {
      applyLanguage(this.value);
    });
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mainMenu  = document.getElementById('mainMenu');
  if (hamburger && mainMenu) {
    hamburger.addEventListener('click', function () { mainMenu.classList.toggle('open'); });
    mainMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mainMenu.classList.remove('open')));
  }

  // Countdown
  startCountdown();

  // Free spots
  updateFreeCounter();

  // Topbar shadow on scroll
  window.addEventListener('scroll', function () {
    const tb = document.getElementById('topbar');
    if (tb) tb.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // ESC cierra menú
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mainMenu) mainMenu.classList.remove('open');
  });
});

// ================================================================
// COUNTDOWN
// ================================================================
function startCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  let endTime = parseInt(localStorage.getItem('cia_countdown_end') || '0');
  if (!endTime || endTime <= Date.now()) {
    endTime = Date.now() + 23 * 3600000 + 47 * 60000 + 12000;
    localStorage.setItem('cia_countdown_end', endTime);
  }
  function tick() {
    const r = Math.max(0, endTime - Date.now());
    const h = Math.floor(r / 3600000);
    const m = Math.floor((r % 3600000) / 60000);
    const s = Math.floor((r % 60000) / 1000);
    // Re-find el in case innerHTML was replaced by language switch
    const cel = document.getElementById('countdown');
    if (cel) cel.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (r <= 0) { localStorage.removeItem('cia_countdown_end'); startCountdown(); }
  }
  tick();
  if (!window._countdownInterval) window._countdownInterval = setInterval(tick, 1000);
}

// ================================================================
// FREE COUNTER
// ================================================================
function updateFreeCounter() {
  const el = document.getElementById('freeCounter');
  if (!el) return;
  let count = parseInt(localStorage.getItem('cia_free_spots') || '47');
  if (!sessionStorage.getItem('cia_session_counted')) {
    count = Math.max(11, count - Math.floor(Math.random() * 3 + 1));
    localStorage.setItem('cia_free_spots', count);
    sessionStorage.setItem('cia_session_counted', '1');
  }
  el.textContent = count;
}
// ---- REFERRAL COPY ----
function copyRefLink() {
  const input = document.getElementById('refLinkInput');
  if (!input) return;
  input.select();
  document.execCommand('copy');
  const btn = document.querySelector('.ref-copy-btn');
  if (btn) {
    btn.textContent = '✓ Copied!';
    setTimeout(() => btn.setAttribute('data-i18n', 'ref_copy') || (btn.textContent = 'Copy'), 2000);
  }
}
