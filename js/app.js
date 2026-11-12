import {mountComponents} from './core/components.js';
import {initNavigation} from './core/navigation.js';
import {initTheme} from './features/theme.js';
import {initMotion} from './features/motion.js';
import {initSearch} from './features/search.js';
import {initAccordions} from './features/accordions.js';
import {initHome} from './pages/home.js';
import {initStory} from './pages/story.js';
import {initCharacters} from './pages/characters.js';
import {initTimeline} from './pages/timeline.js';
import {initAnalysis} from './pages/analysis.js';
import {initReview} from './pages/review.js';
import {initQuizPage} from './pages/quiz.js';

const safeInit = (name, callback) => {
  try {
    callback();
    return true;
  } catch (error) {
    console.error(`[MR1] ${name} initialization failed:`, error);
    return false;
  }
};

const page = document.body.dataset.page || 'index';

safeInit('components', mountComponents);
safeInit('navigation', initNavigation);
safeInit('theme', initTheme);
const motionReady = safeInit('motion', initMotion);
safeInit('search', initSearch);
safeInit('home', initHome);
safeInit('story', initStory);
safeInit('characters', initCharacters);
safeInit('timeline', initTimeline);
safeInit('analysis', initAnalysis);
safeInit('review', initReview);
safeInit('quiz', initQuizPage);

// The review page initializes its own accordions. Only the characters page
// needs the shared accordion initializer here.
if (page === 'characters') safeInit('character accordions', initAccordions);

// Enable reveal animations only after their observer initialized successfully.
// If JavaScript fails to load, the page content remains visible by default.
if (motionReady) document.documentElement.classList.add('app-ready');
