/* ============================================
   COFFEE 中文 – Storage Manager
   LocalStorage management with data integrity
   ============================================ */

const StorageManager = (() => {
  const PREFIX = 'coffee_chinese_';

  const KEYS = {
    PROFILE: PREFIX + 'profile',
    VOCAB_PROGRESS: PREFIX + 'vocab_progress',
    COMPLETED_LESSONS: PREFIX + 'completed_lessons',
    FAVORITES: PREFIX + 'favorites',
    QUIZ_HISTORY: PREFIX + 'quiz_history',
    DAILY_STUDY: PREFIX + 'daily_study',
    STREAK: PREFIX + 'streak',
    SETTINGS: PREFIX + 'settings',
    FLASHCARD_PROGRESS: PREFIX + 'flashcard_progress'
  };

  function _dateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const DEFAULTS = {
    [KEYS.PROFILE]: {
      name: 'Người học',
      startDate: _dateKey(),
      dailyGoal: 10,
      currentLevel: 1
    },
    [KEYS.VOCAB_PROGRESS]: {},
    [KEYS.COMPLETED_LESSONS]: [],
    [KEYS.FAVORITES]: [],
    [KEYS.QUIZ_HISTORY]: [],
    [KEYS.DAILY_STUDY]: {},
    [KEYS.STREAK]: {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null
    },
    [KEYS.SETTINGS]: {
      speechRate: 1,
      speechVoice: 'zh-CN',
      showPinyin: true,
      showTranslation: true,
      quizTimer: false,
      quizTimerDuration: 30,
      autoFlashcard: false,
      autoFlashcardInterval: 5
    },
    [KEYS.FLASHCARD_PROGRESS]: {}
  };

  function _isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  function _get(key) {
    if (!_isAvailable()) return DEFAULTS[key] || null;
    try {
      const data = localStorage.getItem(key);
      if (data === null) return JSON.parse(JSON.stringify(DEFAULTS[key] || null));
      return JSON.parse(data);
    } catch (e) {
      console.warn(`StorageManager: Error reading ${key}`, e);
      return JSON.parse(JSON.stringify(DEFAULTS[key] || null));
    }
  }

  function _set(key, value) {
    if (!_isAvailable()) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`StorageManager: Error writing ${key}`, e);
      return false;
    }
  }

  function _update(key, updater) {
    const current = _get(key);
    const updated = updater(current);
    return _set(key, updated);
  }

  // --- Profile ---
  function getProfile() { return _get(KEYS.PROFILE); }
  function setProfile(profile) { return _set(KEYS.PROFILE, profile); }
  function updateProfile(updates) {
    return _update(KEYS.PROFILE, (p) => ({ ...p, ...updates }));
  }

  // --- Vocabulary Progress ---
  function getVocabProgress() { return _get(KEYS.VOCAB_PROGRESS); }

  function markWordLearned(wordId) {
    _update(KEYS.VOCAB_PROGRESS, (progress) => {
      progress[wordId] = {
        learned: true,
        date: new Date().toISOString(),
        reviewCount: (progress[wordId]?.reviewCount || 0) + 1
      };
      return progress;
    });
    _recordDailyActivity('wordsLearned');
    _updateStreak();
  }

  function markWordUnlearned(wordId) {
    _update(KEYS.VOCAB_PROGRESS, (progress) => {
      if (progress[wordId]) {
        progress[wordId].learned = false;
      }
      return progress;
    });
  }

  function isWordLearned(wordId) {
    const progress = getVocabProgress();
    return progress[wordId]?.learned || false;
  }

  function getLearnedWordsCount() {
    const progress = getVocabProgress();
    return Object.values(progress).filter(p => p.learned).length;
  }

  function getLearnedWordIds() {
    const progress = getVocabProgress();
    return Object.entries(progress).filter(([, p]) => p.learned).map(([id]) => id);
  }

  // --- Completed Lessons ---
  function getCompletedLessons() { return _get(KEYS.COMPLETED_LESSONS); }

  function completeLesson(lessonId) {
    _update(KEYS.COMPLETED_LESSONS, (lessons) => {
      if (!lessons.includes(lessonId)) {
        lessons.push(lessonId);
      }
      return lessons;
    });
    _recordDailyActivity('lessonsCompleted');
    _updateStreak();
  }

  function isLessonCompleted(lessonId) {
    return getCompletedLessons().includes(lessonId);
  }

  // --- Favorites ---
  function getFavorites() { return _get(KEYS.FAVORITES); }

  function toggleFavorite(wordId) {
    let isFav = false;
    _update(KEYS.FAVORITES, (favs) => {
      const idx = favs.indexOf(wordId);
      if (idx > -1) {
        favs.splice(idx, 1);
        isFav = false;
      } else {
        favs.push(wordId);
        isFav = true;
      }
      return favs;
    });
    return isFav;
  }

  function isFavorite(wordId) {
    return getFavorites().includes(wordId);
  }

  // --- Quiz History ---
  function getQuizHistory() { return _get(KEYS.QUIZ_HISTORY); }

  function addQuizResult(result) {
    _update(KEYS.QUIZ_HISTORY, (history) => {
      history.push({
        ...result,
        date: new Date().toISOString()
      });
      return history;
    });
    _recordDailyActivity('quizzesTaken');
    _updateStreak();
  }

  function getAverageQuizScore() {
    const history = getQuizHistory();
    if (history.length === 0) return 0;
    const totalPercent = history.reduce((sum, q) => sum + (q.score / q.total * 100), 0);
    return Math.round(totalPercent / history.length);
  }

  // --- Daily Study ---
  function getDailyStudy() { return _get(KEYS.DAILY_STUDY); }

  function getTodayStudy() {
    const today = _dateKey();
    const daily = getDailyStudy();
    return daily[today] || { wordsLearned: 0, lessonsCompleted: 0, quizzesTaken: 0 };
  }

  function _recordDailyActivity(type) {
    const today = _dateKey();
    _update(KEYS.DAILY_STUDY, (daily) => {
      if (!daily[today]) {
        daily[today] = { wordsLearned: 0, lessonsCompleted: 0, quizzesTaken: 0 };
      }
      daily[today][type] = (daily[today][type] || 0) + 1;
      return daily;
    });
  }

  // --- Streak ---
  function getStreak() { return _get(KEYS.STREAK); }

  function _updateStreak() {
    const today = _dateKey();
    _update(KEYS.STREAK, (streak) => {
      if (streak.lastStudyDate === today) return streak;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = _dateKey(yesterday);

      if (streak.lastStudyDate === yesterdayStr) {
        streak.currentStreak += 1;
      } else if (streak.lastStudyDate !== today) {
        streak.currentStreak = 1;
      }

      streak.lastStudyDate = today;
      if (streak.currentStreak > (streak.longestStreak || 0)) {
        streak.longestStreak = streak.currentStreak;
      }
      return streak;
    });
  }

  // --- Flashcard Progress ---
  function getFlashcardProgress() { return _get(KEYS.FLASHCARD_PROGRESS); }

  function markFlashcardKnown(wordId, known) {
    _update(KEYS.FLASHCARD_PROGRESS, (progress) => {
      progress[wordId] = { known, date: new Date().toISOString() };
      return progress;
    });
  }

  // --- Settings ---
  function getSettings() { return _get(KEYS.SETTINGS); }
  function updateSettings(updates) {
    return _update(KEYS.SETTINGS, (s) => ({ ...s, ...updates }));
  }

  // --- Data Management ---
  function exportAllData() {
    const data = {};
    Object.entries(KEYS).forEach(([name, key]) => {
      data[name] = _get(key);
    });
    data._exportDate = new Date().toISOString();
    data._version = '1.0';
    return JSON.stringify(data, null, 2);
  }

  function importAllData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object' || Array.isArray(data) || typeof data._version !== 'string') {
        throw new Error('Invalid backup file');
      }

      const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
      const validators = {
        PROFILE: isObject,
        VOCAB_PROGRESS: isObject,
        COMPLETED_LESSONS: Array.isArray,
        FAVORITES: Array.isArray,
        QUIZ_HISTORY: Array.isArray,
        DAILY_STUDY: isObject,
        STREAK: isObject,
        SETTINGS: isObject,
        FLASHCARD_PROGRESS: isObject
      };
      const entries = Object.entries(KEYS).filter(([name]) => Object.prototype.hasOwnProperty.call(data, name));
      if (entries.length === 0 || entries.some(([name]) => !validators[name](data[name]))) {
        throw new Error('Invalid backup data');
      }
      if (!_isAvailable()) return false;

      for (const [name, key] of entries) {
        if (!_set(key, data[name])) return false;
      }
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  function resetAllData() {
    Object.entries(KEYS).forEach(([, key]) => {
      localStorage.removeItem(key);
    });
  }

  function getStudyHistory(days = 7) {
    const daily = getDailyStudy();
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = _dateKey(d);
      result.push({
        date: dateStr,
        label: d.toLocaleDateString('vi-VN', { weekday: 'short' }),
        ...{ wordsLearned: 0, lessonsCompleted: 0, quizzesTaken: 0 },
        ...(daily[dateStr] || {})
      });
    }
    return result;
  }

  return {
    KEYS,
    getProfile, setProfile, updateProfile,
    getVocabProgress, markWordLearned, markWordUnlearned, isWordLearned,
    getLearnedWordsCount, getLearnedWordIds,
    getCompletedLessons, completeLesson, isLessonCompleted,
    getFavorites, toggleFavorite, isFavorite,
    getQuizHistory, addQuizResult, getAverageQuizScore,
    getDailyStudy, getTodayStudy,
    getStreak,
    getFlashcardProgress, markFlashcardKnown,
    getSettings, updateSettings,
    exportAllData, importAllData, resetAllData,
    getStudyHistory
  };
})();
