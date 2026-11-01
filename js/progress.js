/* ============================================
   COFFEE 中文 – Progress Dashboard Module
   Thống kê tiến độ thực tế, biểu đồ SVG, lịch sử quiz và quản trị dữ liệu
   ============================================ */

const ProgressApp = (() => {
  function init() {
    _renderSummaryCards();
    _renderHSKBreakdown();
    _renderActivityChart();
    _renderRecentQuizHistory();
    _bindDataManagementEvents();
  }

  function _renderSummaryCards() {
    const totalVocab = typeof VOCABULARY_DATA !== 'undefined' ? VOCABULARY_DATA.length : 174;
    const learnedCount = StorageManager.getLearnedWordsCount();
    const vocabPercent = Math.round((learnedCount / totalVocab) * 100);

    const totalLessons = typeof LESSONS_DATA !== 'undefined' ? LESSONS_DATA.length : 12;
    const completedLessons = StorageManager.getCompletedLessons().length;
    const lessonPercent = Math.round((completedLessons / totalLessons) * 100);

    const avgQuiz = StorageManager.getAverageQuizScore();
    const streak = StorageManager.getStreak();

    const summaryGrid = document.getElementById('progressSummaryGrid');
    if (!summaryGrid) return;

    summaryGrid.innerHTML = `
      <div class="stat-card">
        <div class="stat-card-icon">📖</div>
        <div class="stat-card-value">${learnedCount} <span style="font-size:var(--text-sm);font-weight:normal;color:var(--muted);">/ ${totalVocab}</span></div>
        <div class="stat-card-label">Từ vựng đã học (${vocabPercent}%)</div>
        <div class="progress-bar progress-bar-sm mt-3">
          <div class="progress-bar-fill" style="width:${vocabPercent}%;"></div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-card-icon">📚</div>
        <div class="stat-card-value">${completedLessons} <span style="font-size:var(--text-sm);font-weight:normal;color:var(--muted);">/ ${totalLessons}</span></div>
        <div class="stat-card-label">Bài học hoàn thành (${lessonPercent}%)</div>
        <div class="progress-bar progress-bar-sm mt-3">
          <div class="progress-bar-fill" style="width:${lessonPercent}%;"></div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-card-icon">🎯</div>
        <div class="stat-card-value">${avgQuiz}%</div>
        <div class="stat-card-label">Điểm Quiz trung bình</div>
        <div class="progress-bar progress-bar-sm mt-3">
          <div class="progress-bar-fill" style="width:${avgQuiz}%;"></div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-card-icon">🔥</div>
        <div class="stat-card-value">${streak.currentStreak} <span style="font-size:var(--text-sm);font-weight:normal;color:var(--muted);">ngày</span></div>
        <div class="stat-card-label">Chuỗi ngày học liên tục (Kỷ lục: ${streak.longestStreak || streak.currentStreak})</div>
        <div class="progress-bar progress-bar-sm mt-3">
          <div class="progress-bar-fill" style="width:${Math.min(100, (streak.currentStreak / 30) * 100)}%;"></div>
        </div>
      </div>
    `;
  }

  function _renderHSKBreakdown() {
    const container = document.getElementById('hskBreakdownContainer');
    if (!container || typeof VOCABULARY_DATA === 'undefined') return;

    const levels = [1, 2, 3, 4, 5, 6, 'coffee'];
    const levelLabels = {
      1: 'HSK 1', 2: 'HSK 2', 3: 'HSK 3', 4: 'HSK 4', 5: 'HSK 5', 6: 'HSK 6', 'coffee': 'Cà phê Chuyên sâu'
    };

    let html = '';
    levels.forEach(lvl => {
      const wordsInLvl = VOCABULARY_DATA.filter(w => String(w.hsk) === String(lvl));
      const learnedInLvl = wordsInLvl.filter(w => StorageManager.isWordLearned(w.id)).length;
      const pct = wordsInLvl.length > 0 ? Math.round((learnedInLvl / wordsInLvl.length) * 100) : 0;

      html += `
        <div class="mb-4">
          <div class="flex items-center justify-between mb-1">
            <span class="font-semibold text-sm">${levelLabels[lvl]}</span>
            <span class="text-xs text-muted">${learnedInLvl} / ${wordsInLvl.length} từ (${pct}%)</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${pct}%;"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function _renderActivityChart() {
    const chartBox = document.getElementById('activityChartBox');
    if (!chartBox) return;

    const history = StorageManager.getStudyHistory(7);
    const maxVal = Math.max(5, ...history.map(d => (d.wordsLearned || 0) + (d.quizzesTaken || 0) * 2));

    chartBox.innerHTML = `
      <div class="bar-chart">
        ${history.map(day => {
          const activityCount = (day.wordsLearned || 0) + (day.quizzesTaken || 0) * 2;
          const heightPercent = Math.min(100, Math.max(8, Math.round((activityCount / maxVal) * 100)));
          return `
            <div class="bar-chart-item">
              <div class="text-xs font-semibold text-muted mb-1">${activityCount}</div>
              <div class="bar-chart-bar" style="height:${heightPercent}%;" title="${day.date}: ${day.wordsLearned} từ đã học, ${day.quizzesTaken} quiz"></div>
              <div class="bar-chart-label">${day.label}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function _renderRecentQuizHistory() {
    const listEl = document.getElementById('quizHistoryList');
    if (!listEl) return;

    const history = StorageManager.getQuizHistory().slice(-5).reverse();

    if (history.length === 0) {
      listEl.innerHTML = `
        <div class="p-6 text-center text-muted text-sm">
          Chưa có bài kiểm tra nào được thực hiện. Hãy vào trang <a href="quiz.html" class="underline text-caramel">Quiz</a> để thử sức!
        </div>
      `;
      return;
    }

    listEl.innerHTML = history.map(item => `
      <div class="flex items-center justify-between p-3 border-b" style="border-color:var(--cream-dark);">
        <div>
          <div class="font-semibold text-sm">Kiểm tra: ${item.type || 'Tổng hợp'} (${item.level ? 'HSK ' + item.level : 'Tất cả'})</div>
          <div class="text-xs text-muted">${App.formatDate(item.date)}</div>
        </div>
        <div class="text-right">
          <div class="font-bold text-lg ${item.percentage >= 80 ? 'text-green-600' : 'text-caramel'}">${item.percentage}%</div>
          <div class="text-xs text-muted">${item.score}/${item.total} câu đúng</div>
        </div>
      </div>
    `).join('');
  }

  function _bindDataManagementEvents() {
    const exportBtn = document.getElementById('exportDataBtn');
    const importInput = document.getElementById('importDataInput');
    const resetBtn = document.getElementById('resetDataBtn');

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const json = StorageManager.exportAllData();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `coffee_chinese_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        App.showToast('Đã xuất sao lưu dữ liệu học tập thành công!', 'success');
      });
    }

    if (importInput) {
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const success = StorageManager.importAllData(event.target.result);
          if (success) {
            App.showToast('Khôi phục dữ liệu thành công! Đang tải lại...', 'success');
            setTimeout(() => window.location.reload(), 1200);
          } else {
            App.showToast('Tệp sao lưu không hợp lệ!', 'error');
          }
        };
        reader.readAsText(file);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('CẢNH BÁO: Thao tác này sẽ xóa toàn bộ tiến độ học từ vựng, bài học đã xong và điểm số quiz. Bạn có chắc chắn không?')) {
          StorageManager.resetAllData();
          App.showToast('Đã thiết lập lại dữ liệu về mặc định.', 'default');
          setTimeout(() => window.location.reload(), 800);
        }
      });
    }
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('progressSummaryGrid')) {
    ProgressApp.init();
  }
});
