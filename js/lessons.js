/* ============================================
   COFFEE 中文 – Lessons Page Module
   Lesson listing, detail view, exercises
   ============================================ */

const LessonsPage = (() => {
  let currentLevel = 'all';

  function init() {
    _renderLevelFilter();
    _renderLessons();
    _checkUrlParams();
  }

  function _checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const level = params.get('level');
    if (level) {
      currentLevel = level;
      const filterBtn = document.querySelector(`.level-filter-btn[data-level="${level}"]`);
      if (filterBtn) {
        document.querySelectorAll('.level-filter-btn').forEach(b => b.classList.remove('active'));
        filterBtn.classList.add('active');
      }
      _renderLessons();
    }
  }

  function _renderLevelFilter() {
    const container = document.getElementById('levelFilter');
    if (!container) return;

    const levels = [
      { value: 'all', label: 'Tất cả' },
      { value: '1', label: 'HSK 1' },
      { value: '2', label: 'HSK 2' },
      { value: '3', label: 'HSK 3' },
      { value: '4', label: 'HSK 4' },
      { value: '5', label: 'HSK 5' },
      { value: '6', label: 'HSK 6' }
    ];

    container.innerHTML = levels.map(l => `
      <button class="chip level-filter-btn ${l.value === currentLevel ? 'active' : ''}" data-level="${l.value}" onclick="LessonsPage.filterByLevel('${l.value}', this)">
        ${l.label}
      </button>
    `).join('');
  }

  function filterByLevel(level, btnEl) {
    currentLevel = level;
    document.querySelectorAll('.level-filter-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    _renderLessons();
  }

  function _renderLessons() {
    const container = document.getElementById('lessonsGrid');
    if (!container || typeof LESSONS_DATA === 'undefined') return;

    let lessons = LESSONS_DATA;
    if (currentLevel !== 'all') {
      lessons = lessons.filter(l => String(l.level) === currentLevel);
    }

    if (lessons.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <h3>Chưa có bài học</h3>
          <p>Không có bài học cho cấp độ này.</p>
        </div>`;
      return;
    }

    // Group by level
    const grouped = {};
    lessons.forEach(l => {
      if (!grouped[l.level]) grouped[l.level] = [];
      grouped[l.level].push(l);
    });

    const levelNames = {
      1: 'HSK 1 – Làm quen tiếng Trung',
      2: 'HSK 2 – Giao tiếp cơ bản',
      3: 'HSK 3 – Giao tiếp hàng ngày',
      4: 'HSK 4 – Giao tiếp tương đối thành thạo',
      5: 'HSK 5 – Đọc hiểu và diễn đạt nâng cao',
      6: 'HSK 6 – Sử dụng tiếng Trung nâng cao'
    };

    let html = '';
    Object.keys(grouped).sort((a, b) => a - b).forEach(level => {
      const levelLessons = grouped[level];
      const completedCount = levelLessons.filter(l => StorageManager.isLessonCompleted(l.id)).length;
      const progress = Math.round((completedCount / levelLessons.length) * 100);

      html += `
        <div class="mb-8 scroll-animate">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-4);">
            <h3 style="font-size:var(--text-xl);">${levelNames[level] || `HSK ${level}`}</h3>
            <span style="font-size:var(--text-sm);color:var(--muted);">${completedCount}/${levelLessons.length} hoàn thành</span>
          </div>
          <div class="progress-bar progress-bar-sm mb-4">
            <div class="progress-bar-fill" style="width:${progress}%"></div>
          </div>
          <div class="grid grid-2 gap-6">
            ${levelLessons.map(lesson => _renderLessonCard(lesson)).join('')}
          </div>
        </div>`;
    });

    container.innerHTML = html;
    App.observeElements('.scroll-animate');
  }

  function _renderLessonCard(lesson) {
    const isCompleted = StorageManager.isLessonCompleted(lesson.id);
    const vocabCount = lesson.vocabularyIds ? lesson.vocabularyIds.length : 0;

    return `
      <a href="lesson-detail.html?id=${lesson.id}" class="lesson-card" data-level="${lesson.level}" style="text-decoration:none;color:inherit;">
        <div class="lesson-card-image">
          <span style="font-size:3rem;">${lesson.icon || '📖'}</span>
        </div>
        <div class="lesson-card-body">
          <div class="lesson-card-meta">
            <span class="badge ${App.getHSKBadgeClass(lesson.level)}">${App.getHSKLabel(lesson.level)}</span>
            ${isCompleted ? '<span style="color:var(--success);font-size:var(--text-sm);">✓ Hoàn thành</span>' : ''}
          </div>
          <h4>${lesson.title}</h4>
          <p style="font-family:var(--font-chinese);font-size:var(--text-sm);color:var(--muted);margin-bottom:var(--space-2);">${lesson.titleCn}</p>
          <p>${lesson.description}</p>
          <div class="lesson-card-footer">
            <span style="font-size:var(--text-sm);color:var(--muted);">📝 ${vocabCount} từ vựng</span>
            <span class="btn btn-sm btn-ghost">Học ngay →</span>
          </div>
        </div>
      </a>`;
  }

  return { init, filterByLevel };
})();

/* --- Lesson Detail Page --- */
const LessonDetail = (() => {
  let currentLesson = null;
  let currentStep = 0;
  const STEPS = ['overview', 'vocabulary', 'grammar', 'dialogue', 'exercises', 'complete'];

  function init() {
    const params = new URLSearchParams(window.location.search);
    const lessonId = params.get('id');
    if (!lessonId || typeof LESSONS_DATA === 'undefined') {
      _showNotFound();
      return;
    }

    currentLesson = LESSONS_DATA.find(l => l.id === lessonId);
    if (!currentLesson) {
      _showNotFound();
      return;
    }

    _renderLesson();
  }

  function _showNotFound() {
    const container = document.getElementById('lessonContent');
    if (container) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <h3>Bài học không tìm thấy</h3>
          <p>Bài học này không tồn tại hoặc đã bị xóa.</p>
          <a href="lessons.html" class="btn btn-primary">Quay lại danh sách</a>
        </div>`;
    }
  }

  function _renderLesson() {
    const container = document.getElementById('lessonContent');
    if (!container) return;

    const lesson = currentLesson;
    const isCompleted = StorageManager.isLessonCompleted(lesson.id);

    // Update page title
    document.title = `${lesson.title} – COFFEE 中文`;

    container.innerHTML = `
      <div class="page-header" style="padding-top:calc(var(--nav-height) + var(--space-8));padding-bottom:var(--space-6);">
        <div class="container">
          <div class="page-breadcrumb">
            <a href="lessons.html">Bài học</a>
            <span class="separator">›</span>
            <span>${App.getHSKLabel(lesson.level)}</span>
            <span class="separator">›</span>
            <span>${lesson.title}</span>
          </div>
          <h1 class="page-title" style="margin-top:var(--space-4);">${lesson.icon} ${lesson.title}</h1>
          <p style="font-family:var(--font-chinese);font-size:var(--text-xl);color:var(--caramel);margin-top:var(--space-2);">${lesson.titleCn}</p>
          <p class="page-description">${lesson.description}</p>
          ${isCompleted ? '<div style="margin-top:var(--space-3);color:var(--success);font-weight:500;">✓ Đã hoàn thành bài học này</div>' : ''}
        </div>
      </div>

      <div class="section container" style="padding-top:var(--space-8);">
        <!-- Step Navigation -->
        <div class="tabs mb-6" id="lessonTabs">
          <button class="tab-btn active" data-step="overview" onclick="LessonDetail.goToStep('overview', this)">Tổng quan</button>
          <button class="tab-btn" data-step="vocabulary" onclick="LessonDetail.goToStep('vocabulary', this)">Từ vựng</button>
          <button class="tab-btn" data-step="grammar" onclick="LessonDetail.goToStep('grammar', this)">Ngữ pháp</button>
          <button class="tab-btn" data-step="dialogue" onclick="LessonDetail.goToStep('dialogue', this)">Hội thoại</button>
          <button class="tab-btn" data-step="exercises" onclick="LessonDetail.goToStep('exercises', this)">Bài tập</button>
        </div>

        <!-- Step Content -->
        <div id="stepContent"></div>
      </div>`;

    _renderStep('overview');
  }

  function goToStep(step, btnEl) {
    document.querySelectorAll('#lessonTabs .tab-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    _renderStep(step);
  }

  function _renderStep(step) {
    const container = document.getElementById('stepContent');
    if (!container) return;

    switch (step) {
      case 'overview': _renderOverview(container); break;
      case 'vocabulary': _renderVocabulary(container); break;
      case 'grammar': _renderGrammar(container); break;
      case 'dialogue': _renderDialogue(container); break;
      case 'exercises': _renderExercises(container); break;
    }
  }

  function _renderOverview(container) {
    const lesson = currentLesson;
    container.innerHTML = `
      <div class="card animate-fade-in">
        <div class="card-body">
          <h3 style="margin-bottom:var(--space-4);">🎯 Mục tiêu bài học</h3>
          <ul style="display:flex;flex-direction:column;gap:var(--space-3);">
            ${lesson.objectives.map(obj => `
              <li style="display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3);background:var(--cream);border-radius:var(--radius-md);">
                <span style="color:var(--caramel);">✓</span>
                <span>${obj}</span>
              </li>`).join('')}
          </ul>
          
          <div style="margin-top:var(--space-6);display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);">
            <div style="text-align:center;padding:var(--space-4);background:var(--cream);border-radius:var(--radius-md);">
              <div style="font-size:var(--text-2xl);font-weight:700;">${lesson.vocabularyIds ? lesson.vocabularyIds.length : 0}</div>
              <div style="font-size:var(--text-sm);color:var(--muted);">Từ vựng</div>
            </div>
            <div style="text-align:center;padding:var(--space-4);background:var(--cream);border-radius:var(--radius-md);">
              <div style="font-size:var(--text-2xl);font-weight:700;">${lesson.grammar ? lesson.grammar.length : 0}</div>
              <div style="font-size:var(--text-sm);color:var(--muted);">Ngữ pháp</div>
            </div>
            <div style="text-align:center;padding:var(--space-4);background:var(--cream);border-radius:var(--radius-md);">
              <div style="font-size:var(--text-2xl);font-weight:700;">${lesson.exercises ? lesson.exercises.length : 0}</div>
              <div style="font-size:var(--text-sm);color:var(--muted);">Bài tập</div>
            </div>
          </div>

          <div style="margin-top:var(--space-6);text-align:center;">
            <button class="btn btn-primary btn-lg" onclick="LessonDetail.goToStep('vocabulary', document.querySelector('[data-step=vocabulary]'))">
              Bắt đầu học →
            </button>
          </div>
        </div>
      </div>`;
  }

  function _renderVocabulary(container) {
    const lesson = currentLesson;
    const vocabIds = lesson.vocabularyIds || [];
    const words = vocabIds.map(id => App.getVocabById(id)).filter(Boolean);

    container.innerHTML = `
      <div class="animate-fade-in">
        <h3 style="margin-bottom:var(--space-6);">📖 Từ vựng bài học (${words.length} từ)</h3>
        <div class="grid grid-2 gap-4">
          ${words.map(word => `
            <div class="card card-flat" style="cursor:pointer;" onclick="showWordDetail('${word.id}')">
              <div class="card-body" style="display:flex;align-items:center;gap:var(--space-4);">
                <div style="font-size:2rem;">${word.icon || '📝'}</div>
                <div style="flex:1;">
                  <div style="font-family:var(--font-chinese);font-size:var(--text-xl);font-weight:500;">${word.simplified}</div>
                  <div style="color:var(--caramel);font-style:italic;font-size:var(--text-sm);">${word.pinyin}</div>
                  <div style="font-size:var(--text-sm);color:var(--coffee-brown);">${word.meaningVi}</div>
                </div>
                <button class="audio-btn" onclick="event.stopPropagation();App.speak('${word.simplified}',{button:this})" aria-label="Phát âm">🔊</button>
              </div>
            </div>`).join('')}
        </div>
        <div style="margin-top:var(--space-6);text-align:center;">
          <button class="btn btn-primary" onclick="LessonDetail.goToStep('grammar', document.querySelector('[data-step=grammar]'))">
            Tiếp theo: Ngữ pháp →
          </button>
        </div>
      </div>`;
  }

  function _renderGrammar(container) {
    const lesson = currentLesson;
    const grammar = lesson.grammar || [];

    container.innerHTML = `
      <div class="animate-fade-in">
        <h3 style="margin-bottom:var(--space-6);">📐 Ngữ pháp</h3>
        ${grammar.map((g, i) => `
          <div class="card mb-6">
            <div class="card-body">
              <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4);">
                <span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--caramel);color:white;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;">${i + 1}</span>
                <h4 style="font-family:var(--font-chinese);font-size:var(--text-xl);">${g.pattern}</h4>
              </div>
              <p style="color:var(--caramel);font-style:italic;margin-bottom:var(--space-2);">${g.patternPinyin}</p>
              <p style="margin-bottom:var(--space-4);">${g.explanation}</p>
              
              <h5 style="font-size:var(--text-sm);font-weight:600;color:var(--muted);margin-bottom:var(--space-3);">VÍ DỤ</h5>
              ${g.examples.map(ex => `
                <div style="background:var(--cream);border-radius:var(--radius-md);padding:var(--space-4);margin-bottom:var(--space-3);display:flex;align-items:center;gap:var(--space-3);">
                  <div style="flex:1;">
                    <div style="font-family:var(--font-chinese);font-size:var(--text-lg);">${ex.cn}</div>
                    <div style="color:var(--caramel);font-style:italic;font-size:var(--text-sm);">${ex.pinyin}</div>
                    <div style="color:var(--coffee-brown);font-size:var(--text-sm);">${ex.vi}</div>
                  </div>
                  <button class="audio-btn" onclick="App.speak('${ex.cn.replace(/'/g, "\\'")}',{button:this})" aria-label="Phát âm">🔊</button>
                </div>`).join('')}
            </div>
          </div>`).join('')}
        <div style="text-align:center;">
          <button class="btn btn-primary" onclick="LessonDetail.goToStep('dialogue', document.querySelector('[data-step=dialogue]'))">
            Tiếp theo: Hội thoại →
          </button>
        </div>
      </div>`;
  }

  function _renderDialogue(container) {
    const lesson = currentLesson;
    const dialogue = lesson.dialogue || [];

    container.innerHTML = `
      <div class="animate-fade-in">
        <h3 style="margin-bottom:var(--space-6);">💬 Hội thoại</h3>
        <div class="card">
          <div class="card-body" style="max-width:600px;margin:0 auto;">
            ${dialogue.map(line => `
              <div class="conversation-bubble speaker-${line.speaker.toLowerCase()}" style="cursor:pointer;" onclick="App.speak('${line.cn.replace(/'/g, "\\'")}')">
                <div class="speaker-name">${line.speakerName}</div>
                <div class="bubble-chinese">${line.cn}</div>
                <div class="bubble-pinyin">${line.pinyin}</div>
                <div class="bubble-translation">${line.vi}</div>
              </div>`).join('')}
          </div>
        </div>
        <div style="margin-top:var(--space-6);text-align:center;">
          <button class="btn btn-primary" onclick="LessonDetail.goToStep('exercises', document.querySelector('[data-step=exercises]'))">
            Tiếp theo: Bài tập →
          </button>
        </div>
      </div>`;
  }

  function _renderExercises(container) {
    const lesson = currentLesson;
    const exercises = lesson.exercises || [];
    
    if (exercises.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>Chưa có bài tập cho bài học này.</p></div>';
      return;
    }

    let currentEx = 0;
    let correctCount = 0;
    let answered = new Array(exercises.length).fill(false);
    let results = new Array(exercises.length).fill(null);

    function renderExercise(idx) {
      const ex = exercises[idx];
      const isAnswered = answered[idx];
      
      let exerciseHtml = '';

      if (ex.type === 'multiple-choice') {
        exerciseHtml = `
          <p style="font-size:var(--text-lg);font-weight:500;margin-bottom:var(--space-6);">${ex.question}</p>
          <div style="display:flex;flex-direction:column;gap:var(--space-3);" id="exerciseOptions">
            ${ex.options.map((opt, i) => `
              <button class="quiz-option ${isAnswered ? (i === ex.correct ? 'correct' : (results[idx] === i ? 'incorrect' : '')) : ''}" 
                      onclick="handleExerciseAnswer(${idx}, ${i})" 
                      ${isAnswered ? 'disabled' : ''}>
                <span style="font-family:var(--font-chinese);">${opt}</span>
              </button>`).join('')}
          </div>`;
      } else if (ex.type === 'fill-blank') {
        exerciseHtml = `
          <p style="font-size:var(--text-lg);font-weight:500;margin-bottom:var(--space-4);">${ex.question}</p>
          <div class="writing-input-area">
            <input type="text" class="writing-input" id="fillBlankInput" placeholder="Nhập đáp án..." ${isAnswered ? 'disabled' : ''}>
          </div>
          ${!isAnswered ? `<button class="btn btn-primary mt-4" onclick="checkFillBlank(${idx})">Kiểm tra</button>` : ''}`;
      } else if (ex.type === 'arrange') {
        exerciseHtml = `
          <p style="font-size:var(--text-lg);font-weight:500;margin-bottom:var(--space-4);">${ex.question}</p>
          <div id="arrangeWords" style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-4);">
            ${App.shuffleArray(ex.options || []).map((w, i) => `
              <button class="chip" onclick="selectArrangeWord(this, '${w}')" ${isAnswered ? 'disabled' : ''}>${w}</button>`).join('')}
          </div>
          <div id="arrangeResult" style="min-height:48px;padding:var(--space-4);border:2px dashed var(--cream-dark);border-radius:var(--radius-md);margin-bottom:var(--space-4);font-family:var(--font-chinese);font-size:var(--text-lg);"></div>
          ${!isAnswered ? `<button class="btn btn-primary" onclick="checkArrange(${idx})">Kiểm tra</button>` : ''}`;
      }

      container.innerHTML = `
        <div class="animate-fade-in">
          <h3 style="margin-bottom:var(--space-4);">✏️ Bài tập (${idx + 1}/${exercises.length})</h3>
          <div class="quiz-progress-bar mb-6">
            ${exercises.map((_, i) => `
              <div class="quiz-progress-dot ${i < idx ? (results[i] !== null && results[i] === exercises[i].correct ? 'correct' : 'incorrect') : (i === idx ? 'answered' : '')}"></div>
            `).join('')}
          </div>
          <div class="card">
            <div class="card-body">
              ${exerciseHtml}
              ${isAnswered ? `
                <div class="writing-feedback ${results[idx] === exercises[idx].correct ? 'success' : 'error'}" style="margin-top:var(--space-4);">
                  ${results[idx] === exercises[idx].correct ? '✓ Chính xác!' : '✗ Chưa đúng'} · ${ex.explanation || ''}
                </div>` : ''}
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:var(--space-6);">
            <button class="btn btn-ghost" ${idx === 0 ? 'disabled' : ''} onclick="LessonDetail._exerciseNav(${idx - 1})">← Trước</button>
            ${idx === exercises.length - 1 ? 
              `<button class="btn btn-primary" ${!isAnswered ? 'disabled' : ''} onclick="LessonDetail.completeLesson()">Hoàn thành bài học ✓</button>` :
              `<button class="btn btn-primary" ${!isAnswered ? 'disabled' : ''} onclick="LessonDetail._exerciseNav(${idx + 1})">Tiếp theo →</button>`
            }
          </div>
        </div>`;
    }

    // Expose answer handler globally
    window.handleExerciseAnswer = (idx, selected) => {
      if (answered[idx]) return;
      answered[idx] = true;
      results[idx] = selected;
      if (selected === exercises[idx].correct) correctCount++;
      renderExercise(idx);
    };

    window.checkFillBlank = (idx) => {
      const input = document.getElementById('fillBlankInput');
      if (!input) return;
      const answer = input.value.trim();
      answered[idx] = true;
      const correct = exercises[idx].correct;
      results[idx] = answer === exercises[idx].options[correct] ? correct : -1;
      if (results[idx] === correct) correctCount++;
      renderExercise(idx);
    };

    let arrangeWords = [];
    window.selectArrangeWord = (btn, word) => {
      arrangeWords.push(word);
      btn.disabled = true;
      btn.style.opacity = '0.4';
      document.getElementById('arrangeResult').textContent = arrangeWords.join('');
    };

    window.checkArrange = (idx) => {
      answered[idx] = true;
      const result = arrangeWords.join('');
      results[idx] = result === exercises[idx].options[exercises[idx].correct] ? exercises[idx].correct : -1;
      if (results[idx] === exercises[idx].correct) correctCount++;
      arrangeWords = [];
      renderExercise(idx);
    };

    LessonDetail._exerciseNav = (idx) => {
      currentEx = idx;
      arrangeWords = [];
      renderExercise(idx);
    };

    renderExercise(0);
  }

  function completeLesson() {
    if (!currentLesson) return;
    StorageManager.completeLesson(currentLesson.id);
    App.showToast('🎉 Chúc mừng! Bạn đã hoàn thành bài học!', 'success', 5000);
    
    // Show completion modal
    let modalEl = document.getElementById('completionModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'completionModal';
      modalEl.className = 'modal-overlay';
      document.body.appendChild(modalEl);
    }

    modalEl.innerHTML = `
      <div class="modal">
        <div class="modal-body" style="text-align:center;padding:var(--space-10);">
          <div style="font-size:4rem;margin-bottom:var(--space-4);">🎉</div>
          <h2 style="margin-bottom:var(--space-3);">Chúc mừng!</h2>
          <p style="font-size:var(--text-lg);margin-bottom:var(--space-6);">Bạn đã hoàn thành bài học<br><strong>${currentLesson.title}</strong></p>
          <div style="display:flex;gap:var(--space-4);justify-content:center;">
            <a href="lessons.html" class="btn btn-secondary">Danh sách bài học</a>
            <a href="quiz.html?level=${currentLesson.level}" class="btn btn-primary">Làm bài kiểm tra</a>
          </div>
        </div>
      </div>`;

    App.openModal('completionModal');
  }

  return { init, goToStep, completeLesson, _exerciseNav: null };
})();

// Init based on page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lessonsGrid')) {
    LessonsPage.init();
  }
  if (document.getElementById('lessonContent')) {
    LessonDetail.init();
  }
});
