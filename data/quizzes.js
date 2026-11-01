/* ============================================
   COFFEE 中文 – Quiz Data
   Quiz question templates and generators
   ============================================ */

// Quiz types enum
const QUIZ_TYPES = {
  CN_TO_VI: 'cn-to-vi',       // Chinese → Vietnamese
  VI_TO_CN: 'vi-to-cn',       // Vietnamese → Chinese
  PINYIN_TO_CN: 'pinyin-to-cn', // Pinyin → Chinese
  LISTENING: 'listening',       // Listen and choose
  FILL_BLANK: 'fill-blank',   // Fill in the blank
  ARRANGE: 'arrange',         // Arrange words into sentence
  IMAGE_VOCAB: 'image-vocab'  // Icon/image → vocabulary
};

const QUIZ_TYPE_LABELS = {
  [QUIZ_TYPES.CN_TO_VI]: { name: 'Chinese → Vietnamese', nameVi: 'Chọn nghĩa tiếng Việt', icon: '🇨🇳➡️🇻🇳' },
  [QUIZ_TYPES.VI_TO_CN]: { name: 'Vietnamese → Chinese', nameVi: 'Chọn từ tiếng Trung', icon: '🇻🇳➡️🇨🇳' },
  [QUIZ_TYPES.PINYIN_TO_CN]: { name: 'Pinyin → Chinese', nameVi: 'Chọn chữ Hán', icon: '🔤➡️🈶' },
  [QUIZ_TYPES.LISTENING]: { name: 'Listening Quiz', nameVi: 'Nghe chọn đáp án', icon: '🎧' },
  [QUIZ_TYPES.FILL_BLANK]: { name: 'Fill in the Blank', nameVi: 'Điền từ', icon: '✏️' },
  [QUIZ_TYPES.ARRANGE]: { name: 'Sentence Arrangement', nameVi: 'Sắp xếp câu', icon: '🔀' },
  [QUIZ_TYPES.IMAGE_VOCAB]: { name: 'Icon → Vocabulary', nameVi: 'Nhìn hình đoán từ', icon: '🖼️' }
};

// Fill-in-the-blank templates
const FILL_BLANK_TEMPLATES = [
  {
    sentence: '我想喝一___咖啡。',
    sentencePinyin: 'Wǒ xiǎng hē yì ___ kāfēi.',
    answer: '杯',
    answerPinyin: 'bēi',
    options: ['杯', '个', '瓶', '碗'],
    vi: 'Tôi muốn uống một ___ cà phê.',
    explanation: '杯 (bēi) là lượng từ dùng cho đồ uống trong cốc/ly.'
  },
  {
    sentence: '这杯咖啡很___。',
    sentencePinyin: 'Zhè bēi kāfēi hěn ___.',
    answer: '好喝',
    answerPinyin: 'hǎo hē',
    options: ['好喝', '好看', '好吃', '好玩'],
    vi: 'Ly cà phê này rất ___.',
    explanation: '好喝 (hǎo hē) nghĩa là ngon (dùng cho đồ uống).'
  },
  {
    sentence: '请给我一杯___咖啡。',
    sentencePinyin: 'Qǐng gěi wǒ yì bēi ___ kāfēi.',
    answer: '热',
    answerPinyin: 'rè',
    options: ['热', '冷', '大', '小'],
    vi: 'Xin cho tôi một ly cà phê ___.',
    explanation: '热 (rè) nghĩa là nóng.'
  },
  {
    sentence: '___要加糖吗？',
    sentencePinyin: '___ yào jiā táng ma?',
    answer: '你',
    answerPinyin: 'nǐ',
    options: ['你', '我', '他', '她'],
    vi: '___ có muốn thêm đường không?',
    explanation: '你 (nǐ) là đại từ nhân xưng ngôi thứ hai (bạn/anh/chị).'
  },
  {
    sentence: '我不喜欢___的咖啡。',
    sentencePinyin: 'Wǒ bù xǐhuān ___ de kāfēi.',
    answer: '苦',
    answerPinyin: 'kǔ',
    options: ['苦', '甜', '酸', '香'],
    vi: 'Tôi không thích cà phê ___.',
    explanation: '苦 (kǔ) nghĩa là đắng.'
  },
  {
    sentence: '这家咖啡店的服务___好。',
    sentencePinyin: 'Zhè jiā kāfēi diàn de fúwù ___ hǎo.',
    answer: '很',
    answerPinyin: 'hěn',
    options: ['很', '不', '都', '也'],
    vi: 'Dịch vụ của quán cà phê này ___ tốt.',
    explanation: '很 (hěn) nghĩa là rất.'
  },
  {
    sentence: '我每天___喝咖啡。',
    sentencePinyin: 'Wǒ měitiān ___ hē kāfēi.',
    answer: '都',
    answerPinyin: 'dōu',
    options: ['都', '不', '也', '很'],
    vi: 'Tôi mỗi ngày ___ uống cà phê.',
    explanation: '都 (dōu) nghĩa là đều, tất cả đều.'
  },
  {
    sentence: '请问，这杯咖啡___钱？',
    sentencePinyin: 'Qǐngwèn, zhè bēi kāfēi ___ qián?',
    answer: '多少',
    answerPinyin: 'duōshǎo',
    options: ['多少', '什么', '哪个', '怎么'],
    vi: 'Xin hỏi, ly cà phê này ___ tiền?',
    explanation: '多少 (duōshǎo) nghĩa là bao nhiêu.'
  },
  {
    sentence: '我想___一杯拿铁。',
    sentencePinyin: 'Wǒ xiǎng ___ yì bēi ná tiě.',
    answer: '要',
    answerPinyin: 'yào',
    options: ['要', '有', '是', '在'],
    vi: 'Tôi muốn ___ một ly latte.',
    explanation: '要 (yào) nghĩa là muốn, cần.'
  },
  {
    sentence: '这种咖啡豆___自云南。',
    sentencePinyin: 'Zhè zhǒng kāfēi dòu ___ zì Yúnnán.',
    answer: '来',
    answerPinyin: 'lái',
    options: ['来', '去', '到', '从'],
    vi: 'Loại hạt cà phê này ___ từ Vân Nam.',
    explanation: '来 (lái) nghĩa là đến, tới.'
  }
];

// Sentence arrangement templates
const ARRANGE_TEMPLATES = [
  {
    words: ['我', '想', '喝', '咖啡'],
    correct: '我想喝咖啡。',
    correctPinyin: 'Wǒ xiǎng hē kāfēi.',
    vi: 'Tôi muốn uống cà phê.',
    explanation: 'Cấu trúc: Chủ ngữ + 想 + Động từ + Tân ngữ'
  },
  {
    words: ['这', '杯', '咖啡', '很', '好喝'],
    correct: '这杯咖啡很好喝。',
    correctPinyin: 'Zhè bēi kāfēi hěn hǎo hē.',
    vi: 'Ly cà phê này rất ngon.',
    explanation: 'Cấu trúc: Chỉ thị từ + Lượng từ + Danh từ + 很 + Tính từ'
  },
  {
    words: ['请', '给', '我', '一', '杯', '美式咖啡'],
    correct: '请给我一杯美式咖啡。',
    correctPinyin: 'Qǐng gěi wǒ yì bēi měishì kāfēi.',
    vi: 'Xin cho tôi một ly Americano.',
    explanation: 'Cấu trúc: 请 + 给 + Đại từ + Số + Lượng từ + Danh từ'
  },
  {
    words: ['你', '要', '加', '糖', '吗'],
    correct: '你要加糖吗？',
    correctPinyin: 'Nǐ yào jiā táng ma?',
    vi: 'Bạn có muốn thêm đường không?',
    explanation: 'Câu hỏi Yes/No sử dụng 吗 ở cuối câu.'
  },
  {
    words: ['咖啡店', '在', '哪儿'],
    correct: '咖啡店在哪儿？',
    correctPinyin: 'Kāfēi diàn zài nǎr?',
    vi: 'Quán cà phê ở đâu?',
    explanation: 'Cấu trúc hỏi nơi chốn: Danh từ + 在 + 哪儿'
  },
  {
    words: ['我', '不', '喜欢', '苦', '的', '咖啡'],
    correct: '我不喜欢苦的咖啡。',
    correctPinyin: 'Wǒ bù xǐhuān kǔ de kāfēi.',
    vi: 'Tôi không thích cà phê đắng.',
    explanation: 'Phủ định: 不 đặt trước động từ/tính từ.'
  },
  {
    words: ['今天', '的', '特价', '咖啡', '是', '拿铁'],
    correct: '今天的特价咖啡是拿铁。',
    correctPinyin: 'Jīntiān de tèjià kāfēi shì ná tiě.',
    vi: 'Cà phê khuyến mãi hôm nay là latte.',
    explanation: 'Cấu trúc: Thời gian + 的 + Danh từ + 是 + Danh từ'
  },
  {
    words: ['他', '每天', '都', '来', '这家', '咖啡店'],
    correct: '他每天都来这家咖啡店。',
    correctPinyin: 'Tā měitiān dōu lái zhè jiā kāfēi diàn.',
    vi: 'Anh ấy mỗi ngày đều đến quán cà phê này.',
    explanation: 'Cấu trúc: 每 + Thời gian + 都 + Động từ'
  }
];

// Quiz generation functions
const QuizGenerator = (() => {
  function _sampleWords(words, count) {
    if (!words.length || count <= 0) return [];
    const shuffled = App.shuffleArray(words);
    return Array.from({ length: count }, (_, index) => shuffled[index % shuffled.length]);
  }

  function generateCnToVi(words, count = 10) {
    const questions = [];
    const shuffled = _sampleWords(words, count);

    shuffled.forEach(word => {
      const otherWords = words.filter(w => w.id !== word.id);
      const wrongAnswers = App.shuffleArray(otherWords).slice(0, 3).map(w => w.meaningVi);
      const options = App.shuffleArray([word.meaningVi, ...wrongAnswers]);

      questions.push({
        type: QUIZ_TYPES.CN_TO_VI,
        question: word.simplified,
        questionPinyin: word.pinyin,
        options: options,
        correctIndex: options.indexOf(word.meaningVi),
        explanation: `${word.simplified} (${word.pinyin}) = ${word.meaningVi}`,
        wordId: word.id
      });
    });

    return questions;
  }

  function generateViToCn(words, count = 10) {
    const questions = [];
    const shuffled = _sampleWords(words, count);

    shuffled.forEach(word => {
      const otherWords = words.filter(w => w.id !== word.id);
      const wrongAnswers = App.shuffleArray(otherWords).slice(0, 3).map(w => w.simplified);
      const options = App.shuffleArray([word.simplified, ...wrongAnswers]);

      questions.push({
        type: QUIZ_TYPES.VI_TO_CN,
        question: word.meaningVi,
        options: options,
        correctIndex: options.indexOf(word.simplified),
        explanation: `${word.meaningVi} = ${word.simplified} (${word.pinyin})`,
        wordId: word.id
      });
    });

    return questions;
  }

  function generatePinyinToCn(words, count = 10) {
    const questions = [];
    const shuffled = _sampleWords(words, count);

    shuffled.forEach(word => {
      const otherWords = words.filter(w => w.id !== word.id);
      const wrongAnswers = App.shuffleArray(otherWords).slice(0, 3).map(w => w.simplified);
      const options = App.shuffleArray([word.simplified, ...wrongAnswers]);

      questions.push({
        type: QUIZ_TYPES.PINYIN_TO_CN,
        question: word.pinyin,
        questionMeaning: word.meaningVi,
        options: options,
        correctIndex: options.indexOf(word.simplified),
        explanation: `${word.pinyin} = ${word.simplified} (${word.meaningVi})`,
        wordId: word.id
      });
    });

    return questions;
  }

  function generateListening(words, count = 10) {
    const questions = [];
    const shuffled = _sampleWords(words, count);

    shuffled.forEach(word => {
      const otherWords = words.filter(w => w.id !== word.id);
      const wrongAnswers = App.shuffleArray(otherWords).slice(0, 3).map(w => ({
        simplified: w.simplified,
        meaningVi: w.meaningVi
      }));
      const correctOption = { simplified: word.simplified, meaningVi: word.meaningVi };
      const options = App.shuffleArray([correctOption, ...wrongAnswers]);

      questions.push({
        type: QUIZ_TYPES.LISTENING,
        audioText: word.simplified,
        options: options.map(o => `${o.simplified} – ${o.meaningVi}`),
        correctIndex: options.findIndex(o => o.simplified === word.simplified),
        explanation: `Phát âm: ${word.simplified} (${word.pinyin}) = ${word.meaningVi}`,
        wordId: word.id
      });
    });

    return questions;
  }

  function generateFillBlank(count = 10) {
    const templates = App.shuffleArray(FILL_BLANK_TEMPLATES);
    if (templates.length === 0) return [];
    return Array.from({ length: Math.max(0, count) }, (_, index) => ({
      type: QUIZ_TYPES.FILL_BLANK,
      ...templates[index % templates.length]
    }));
  }

  function generateArrange(count = 10) {
    const templates = App.shuffleArray(ARRANGE_TEMPLATES);
    if (templates.length === 0) return [];
    return Array.from({ length: Math.max(0, count) }, (_, index) => {
      const template = templates[index % templates.length];
      return {
        type: QUIZ_TYPES.ARRANGE,
        ...template,
        words: App.shuffleArray(template.words)
      };
    });
  }

  function generateImageVocab(words, count = 10) {
    const wordsWithIcons = words.filter(w => w.icon);
    const questions = [];
    const shuffled = _sampleWords(wordsWithIcons, count);

    shuffled.forEach(word => {
      const otherWords = wordsWithIcons.filter(w => w.id !== word.id);
      const wrongAnswers = App.shuffleArray(otherWords).slice(0, 3).map(w => w.simplified);
      const options = App.shuffleArray([word.simplified, ...wrongAnswers]);

      questions.push({
        type: QUIZ_TYPES.IMAGE_VOCAB,
        icon: word.icon,
        hint: word.meaningVi,
        options: options,
        correctIndex: options.indexOf(word.simplified),
        explanation: `${word.icon} = ${word.simplified} (${word.pinyin}) – ${word.meaningVi}`,
        wordId: word.id
      });
    });

    return questions;
  }

  function generateMixed(words, count = 15) {
    const perType = Math.max(1, Math.ceil(count / 5));
    let questions = [
      ...generateCnToVi(words, perType),
      ...generateViToCn(words, perType),
      ...generatePinyinToCn(words, perType),
      ...generateFillBlank(perType),
      ...generateArrange(perType)
    ];
    return App.shuffleArray(questions).slice(0, count);
  }

  return {
    generateCnToVi,
    generateViToCn,
    generatePinyinToCn,
    generateListening,
    generateFillBlank,
    generateArrange,
    generateImageVocab,
    generateMixed
  };
})();
