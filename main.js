const root = document.documentElement;
root.classList.add('js-ready');

// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mainNav.classList.toggle('open', !isOpen);
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('open');
    });
  });
}

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Timeline filters
const filterButtons = document.querySelectorAll('.filter-chip');
const timelineCards = document.querySelectorAll('.timeline-card');
const timelineEmpty = document.getElementById('timeline-empty');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    let visibleCount = 0;
    timelineCards.forEach((card) => {
      const topics = (card.dataset.topic || '').split(/\s+/);
      const visible = filter === 'all' || topics.includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (timelineEmpty) timelineEmpty.hidden = visibleCount > 0;
  });
});

// Active navigation state while scrolling.
const sectionLinks = [...document.querySelectorAll('.main-nav a')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-20% 0px -55% 0px' });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

// Back-to-top control
const backToTop = document.querySelector('.back-to-top');
const updateBackToTop = () => {
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 540);
};
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Knowledge check
const quizQuestions = [
  {
    prompt: 'ما السبب المباشر الذي دفع المؤسسة إلى تشكيل لجنة البحث؟',
    options: ['اختفاء الأم من البيت', 'فقد السائق والسيارة والحمولة من العهدة', 'اختلاف أسماء المقاتلين', 'البحث عن سيارة بديلة للمؤسسة'],
    answer: 1,
    explanation: 'بدأ التحقيق بمذكرة عن العهدة: السيارة والبضاعة اللتين تسلّمهما عبد الرحمن، بعد انقطاع خبره.'
  },
  {
    prompt: 'كم ليلة قضتها أم عبد الرحمن في انتظار عودته كما ورد في ملف التحليل؟',
    options: ['خمسة وسبعون ليلة', 'مائة ليلة', 'مائة وخمس عشرة ليلة', 'مائتا ليلة'],
    answer: 2,
    explanation: 'زيارة الأم كشفت أنها عاشت 115 ليلة من القلق والانتظار، مع معاناتها من توقف راتبه ورفضها الصدقة.'
  },
  {
    prompt: 'من المقاتل الذي أعطى الغريب الرشاش وثلاث قنابل خارقة للدروع؟',
    options: ['قناوي', 'الجواهري', 'سعيد طايل', 'شفيق نصري'],
    answer: 0,
    explanation: 'قناوي هو الذي روى وصول الغريب إلى قسم الأربعين، وأعطاه السلاح والقنابل قبل اتجاهه إلى كوبري الزراير.'
  },
  {
    prompt: 'ما الدلالة الأساسية لتعدد أسماء عبد الرحمن في حكايات أهل السويس؟',
    options: ['أن اللجنة اكتشفت أسماءه الرسمية كلها', 'أن هويته ضاعت تمامًا', 'أن كل رواية تتحدث عن شخص مختلف بالضرورة', 'أن قيمة الإنسان تظهر في أفعاله وأثره لا في اسمه وحده'],
    answer: 3,
    explanation: 'تعدد الأسماء يرتبط بتعدد الرواة والمواقف، ويؤكد أن قيمة الإنسان بما يفعله وما يتركه من أثر.'
  },
  {
    prompt: 'لماذا ترك الكاتب مصير عبد الرحمن دون حسم؟',
    options: ['لأن اللجنة لم تبدأ التحقيق أصلًا', 'لأن الروايات اختلفت ولم يظهر دليل قاطع يثبت مصيره', 'لأن الأم رفضت الحديث مع اللجنة', 'لأن السيارة عادت إلى القاهرة'],
    answer: 1,
    explanation: 'السجلات ناقصة والشهادات متعارضة، لذلك بقي المصير مجهولًا؛ والنهاية المفتوحة تشرك القارئ في التفكير.'
  }
];

const quizContainer = document.getElementById('quiz-container');
const quizProgressText = document.getElementById('quiz-progress-text');
const quizProgressBar = document.getElementById('quiz-progress-bar');
const quizStatus = document.getElementById('quiz-status');
const quizReset = document.getElementById('quiz-reset');
const quizAnswers = new Array(quizQuestions.length).fill(null);

function updateQuizProgress() {
  const answered = quizAnswers.filter((answer) => answer !== null).length;
  if (quizProgressText) quizProgressText.textContent = `${answered} / ${quizQuestions.length}`;
  if (quizProgressBar) quizProgressBar.style.width = `${(answered / quizQuestions.length) * 100}%`;
  if (quizStatus) {
    quizStatus.textContent = answered === quizQuestions.length
      ? 'اكتمل الاختبار. راجع نتيجتك وتفسيرات الإجابات.'
      : `أجبت عن ${answered} من ${quizQuestions.length} أسئلة.`;
  }
}

function renderQuiz() {
  if (!quizContainer) return;
  const totalAnswered = quizAnswers.filter((answer) => answer !== null).length;
  const score = quizAnswers.reduce((sum, answer, index) => sum + (answer === quizQuestions[index].answer ? 1 : 0), 0);

  let resultMarkup = '';
  if (totalAnswered === quizQuestions.length) {
    const message = score === 5 ? 'ممتاز! قراءتك دقيقة جدًا.' : score >= 3 ? 'شغل جيد. راجع التفسيرات لتثبيت التفاصيل.' : 'ابدأ من خط الأحداث ثم ارجع إلى التحليل وحاول مرة أخرى.';
    resultMarkup = `<div class="quiz-result"><p>${message}</p><strong>${score} / ${quizQuestions.length}</strong></div>`;
  }

  const questionsMarkup = quizQuestions.map((question, questionIndex) => {
    const selected = quizAnswers[questionIndex];
    const isAnswered = selected !== null;
    const optionsMarkup = question.options.map((option, optionIndex) => {
      let stateClass = '';
      if (isAnswered && optionIndex === question.answer) stateClass = 'correct';
      else if (isAnswered && optionIndex === selected) stateClass = 'incorrect';
      return `<button class="quiz-option ${stateClass}" type="button" data-question="${questionIndex}" data-option="${optionIndex}" ${isAnswered ? 'disabled' : ''}>${option}</button>`;
    }).join('');
    const feedback = isAnswered
      ? `<p class="quiz-feedback">${selected === question.answer ? '<strong>إجابة صحيحة.</strong>' : '<strong>ليست الإجابة الصحيحة.</strong>'} ${question.explanation}</p>`
      : '';
    return `<article class="quiz-question">
      <div class="quiz-question-top"><span>السؤال ${String(questionIndex + 1).padStart(2, '0')}</span><span>${isAnswered ? (selected === question.answer ? 'تمت الإجابة · صحيح' : 'تمت الإجابة · راجعها') : 'اختر إجابة واحدة'}</span></div>
      <h3>${question.prompt}</h3>
      <div class="quiz-options">${optionsMarkup}</div>
      ${feedback}
    </article>`;
  }).join('');

  quizContainer.innerHTML = resultMarkup + questionsMarkup;
  updateQuizProgress();

  quizContainer.querySelectorAll('.quiz-option:not(:disabled)').forEach((button) => {
    button.addEventListener('click', () => {
      const questionIndex = Number(button.dataset.question);
      const optionIndex = Number(button.dataset.option);
      if (!Number.isInteger(questionIndex) || !Number.isInteger(optionIndex)) return;
      if (quizAnswers[questionIndex] !== null) return;
      quizAnswers[questionIndex] = optionIndex;
      renderQuiz();
    });
  });
}

if (quizReset) {
  quizReset.addEventListener('click', () => {
    quizAnswers.fill(null);
    renderQuiz();
  });
}
renderQuiz();
