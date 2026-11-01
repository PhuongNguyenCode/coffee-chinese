/* ============================================
   COFFEE 中文 – Lessons Data
   12 Chuẩn bài học HSK 1 đến HSK 6 gắn với Cà Phê
   ============================================ */

const LESSONS_DATA = [
  {
    id: 'lesson-01',
    level: 1,
    title: 'Giới thiệu bản thân tại quán cà phê',
    titleCn: '在咖啡店自我介绍',
    description: 'Học cách chào hỏi, giới thiệu tên, quốc tịch và sở thích uống cà phê cơ bản.',
    icon: '👋',
    vocabularyIds: ['v001', 'v004', 'v007', 'v022', 'v085', 'v086', 'v106', 'v121', 'v123'],
    objectives: [
      'Biết cách chào hỏi bằng tiếng Trung trong bối cảnh quán cà phê (你好, 您好).',
      'Nắm vững cấu trúc giới thiệu danh tính và quốc tịch (我是...).',
      'Diễn đạt sở thích đơn giản với cà phê (我喜欢喝咖啡).'
    ],
    grammar: [
      {
        pattern: '主语 + 是 + 身份 / 职业 / 国籍',
        patternPinyin: 'Zhǔyǔ + shì + shēnfèn / zhíyè / guójí',
        explanation: 'Cấu trúc phán đoán cơ bản "Là", dùng để giới thiệu bản thân hoặc người khác.',
        examples: [
          { cn: '我是越南人。', pinyin: 'Wǒ shì Yuènán rén.', vi: 'Tôi là người Việt Nam.' },
          { cn: '他是咖啡师。', pinyin: 'Tā shì kāfēishī.', vi: 'Anh ấy là barista (thợ pha chế).' }
        ]
      },
      {
        pattern: '主语 + 喜欢 + 动词 / 名词',
        patternPinyin: 'Zhǔyǔ + xǐhuan + dòngcí / míngcí',
        explanation: 'Biểu thị sự yêu thích một hành động hoặc một danh từ sự vật.',
        examples: [
          { cn: '我喜欢喝热咖啡。', pinyin: 'Wǒ xǐhuan hē rè kāfēi.', vi: 'Tôi thích uống cà phê nóng.' },
          { cn: '你喜欢黑咖啡吗？', pinyin: 'Nǐ xǐhuan hēi kāfēi ma?', vi: 'Bạn có thích cà phê đen không?' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Khách hàng (顾客)', cn: '你好！请问有座位吗？', pinyin: 'Nǐ hǎo! Qǐngwèn yǒu zuòwèi ma?', vi: 'Xin chào! Cho hỏi còn chỗ ngồi không ạ?' },
      { speaker: 'B', speakerName: 'Barista (咖啡师)', cn: '您好！欢迎光临！里面有座位，请坐。', pinyin: 'Nín hǎo! Huānyíng guānglín! Lǐmiàn yǒu zuòwèi, qǐng zuò.', vi: 'Chào bạn! Hoan nghênh bạn! Bên trong còn chỗ, xin mời ngồi.' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '谢谢！我是第一次来这家咖啡馆。', pinyin: 'Xièxie! Wǒ shì dì yī cì lái zhè jiā kāfēiguǎn.', vi: 'Cảm ơn! Tôi lần đầu tiên đến quán cà phê này.' },
      { speaker: 'B', speakerName: 'Barista', cn: '太好了！我们这里有非常好喝的手冲咖啡。', pinyin: 'Tài hǎo le! Wǒmen zhèlǐ yǒu fēicháng hǎohē de shǒuchōng kāfēi.', vi: 'Tuyệt quá! Ở đây chúng tôi có cà phê pha thủ công rất ngon.' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '太棒了，我很喜欢喝咖啡！', pinyin: 'Tài bàng le, wǒ hěn xǐhuan hē kāfēi!', vi: 'Tuyệt vời, tôi rất thích uống cà phê!' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Chọn từ thích hợp để điền vào chỗ trống: "我___喝咖啡。"',
        options: ['喜欢', '是', '椅子', '在'],
        correct: 0,
        explanation: '喜欢 (xǐhuan - thích) kết hợp với động từ 喝 (hē - uống).'
      },
      {
        type: 'multiple-choice',
        question: '"Barista / Thợ pha cà phê" trong tiếng Trung là gì?',
        options: ['服务员', '咖啡师', '师傅', '经理'],
        correct: 1,
        explanation: '咖啡师 (kāfēishī) là chuyên viên pha chế cà phê.'
      },
      {
        type: 'multiple-choice',
        question: 'Câu nào sau đây dịch đúng nghĩa của "Chào mừng quý khách"?',
        options: ['再见', '谢谢', '欢迎光临', '对不起'],
        correct: 2,
        explanation: '欢迎光临 (huānyíng guānglín) nghĩa là Chào mừng quý khách ghé thăm.'
      }
    ]
  },
  {
    id: 'lesson-02',
    level: 1,
    title: 'Các loại đồ uống cơ bản',
    titleCn: '常见咖啡与饮品',
    description: 'Làm quen với các tên gọi cà phê phổ biến như Espresso, Americano, Latte và Cappuccino.',
    icon: '☕',
    vocabularyIds: ['v001', 'v002', 'v003', 'v024', 'v025', 'v026', 'v027', 'v124', 'v125'],
    objectives: [
      'Nhớ được tên tiếng Trung của 4 loại cà phê kinh điển.',
      'Sử dụng lượng từ 杯 (bēi - ly/cốc).',
      'Biết cách diễn đạt đồ uống Nóng (热) hoặc Lạnh (冰/冷).'
    ],
    grammar: [
      {
        pattern: '数量词 + (形容词) + 名词',
        patternPinyin: 'Shù-liàng cí + (xíngróngcí) + míngcí',
        explanation: 'Dùng Số từ + Lượng từ 杯 (bēi) kết hợp với tính từ nhiệt độ để chỉ đồ uống.',
        examples: [
          { cn: '一杯热拿铁', pinyin: 'Yì bēi rè nátiě', vi: 'Một ly latte nóng' },
          { cn: '两杯冰美式', pinyin: 'Liǎng bēi bīng měishì', vi: 'Hai ly Americano đá' }
        ]
      },
      {
        pattern: '主语 + 想 + 喝 / 要 + 饮品',
        patternPinyin: 'Zhǔyǔ + xiǎng + hē / yào + yǐnpǐn',
        explanation: 'Nói về nguyện vọng hoặc ý định muốn uống loại đồ uống nào.',
        examples: [
          { cn: '我想喝一杯卡布奇诺。', pinyin: 'Wǒ xiǎng hē yì bēi kǎbùqínuò.', vi: 'Tôi muốn uống một ly cappuccino.' },
          { cn: '你要热的还是冰的？', pinyin: 'Nǐ yào rè de háishì bīng de?', vi: 'Bạn muốn loại nóng hay đá?' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'B', speakerName: 'Barista (咖啡师)', cn: '请问您喝点什么？', pinyin: 'Qǐngwèn nín hē diǎn shénme?', vi: 'Xin hỏi bạn muốn uống gì ạ?' },
      { speaker: 'A', speakerName: 'Khách hàng (顾客)', cn: '请给我一杯拿铁。', pinyin: 'Qǐng gěi wǒ yì bēi nátiě.', vi: 'Làm ơn cho tôi một ly Latte.' },
      { speaker: 'B', speakerName: 'Barista', cn: '您要热拿铁还是冰拿铁？', pinyin: 'Nín yào rè nátiě háishì bīng nátiě?', vi: 'Bạn chọn Latte nóng hay Latte đá ạ?' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '今天天气有点热，我要冰拿铁。', pinyin: 'Jīntiān tiānqì yǒudiǎn rè, wǒ yào bīng nátiě.', vi: 'Hôm nay trời hơi nóng, tôi lấy Latte đá nhé.' },
      { speaker: 'B', speakerName: 'Barista', cn: '好的，一杯冰拿铁，请稍等。', pinyin: 'Hǎo de, yì bēi bīng nátiě, qǐng shāo děng.', vi: 'Dạ được, một ly Latte đá, xin đợi chút xíu nhé.' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: '"Cà phê Americano" trong tiếng Trung viết là gì?',
        options: ['浓缩咖啡', '卡布奇诺', '美式咖啡', '摩卡'],
        correct: 2,
        explanation: '美式咖啡 (měishì kāfēi) là cà phê Americano.'
      },
      {
        type: 'multiple-choice',
        question: 'Lượng từ thích hợp cho cà phê là gì?',
        options: ['个 (gè)', '只 (zhī)', '张 (zhāng)', '杯 (bēi)'],
        correct: 3,
        explanation: '杯 (bēi) là cốc/ly, dùng làm lượng từ cho đồ uống.'
      },
      {
        type: 'multiple-choice',
        question: '"拿铁" (nátiě) là phiên âm của loại thức uống nào?',
        options: ['Espresso', 'Latte', 'Mocha', 'Macchiato'],
        correct: 1,
        explanation: '拿铁 (nátiě) chính là cà phê Latte.'
      }
    ]
  },
  {
    id: 'lesson-03',
    level: 2,
    title: 'Quy trình gọi món và kích cỡ',
    titleCn: '点单与杯型选择',
    description: 'Thành thạo việc chọn cỡ ly (Đại/Trung/Tiểu), hỏi giá tiền và các yêu cầu gọi món thực tế.',
    icon: '📝',
    vocabularyIds: ['v022', 'v023', 'v126', 'v127', 'v128', 'v129', 'v130', 'v131', 'v132'],
    objectives: [
      'Phân biệt các kích cỡ ly: 大杯 (dàbēi), 中杯 (zhōngbēi), 小杯 (xiǎobēi).',
      'Học cách hỏi giá cả và đơn vị tiền tệ: 多少钱 (duōshao qián), 块 (kuài).',
      'Sử dụng thành thạo liên từ lựa chọn 还是 (háishì).'
    ],
    grammar: [
      {
        pattern: 'A + 还是 + B ?',
        patternPinyin: 'A + háishì + B ?',
        explanation: 'Câu hỏi lựa chọn giữa hai phương án A hoặc B.',
        examples: [
          { cn: '你要中杯还是大杯？', pinyin: 'Nǐ yào zhōngbēi háishì dàbēi?', vi: 'Bạn lấy ly vừa hay ly lớn?' },
          { cn: '这里喝还是带走？', pinyin: 'Zhèlǐ hē háishì dài zǒu?', vi: 'Uống tại đây hay mang đi?' }
        ]
      },
      {
        pattern: '... 多少钱？',
        patternPinyin: '... duōshao qián?',
        explanation: 'Mẫu câu kinh điển dùng để hỏi giá của đồ uống hoặc sản phẩm.',
        examples: [
          { cn: '一杯大杯拿铁多少钱？', pinyin: 'Yì bēi dàbēi nátiě duōshao qián?', vi: 'Một ly Latte lớn giá bao nhiêu tiền?' },
          { cn: '一共三十五块。', pinyin: 'Yígòng sānshíwǔ kuài.', vi: 'Tổng cộng 35 tệ.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'B', speakerName: 'Thu ngân (收银员)', cn: '您好，请问需要点什么？', pinyin: 'Nín hǎo, qǐngwèn xūyào diǎn shénme?', vi: 'Xin chào, quý khách muốn dùng gì ạ?' },
      { speaker: 'A', speakerName: 'Khách hàng (顾客)', cn: '我要一杯美式咖啡。', pinyin: 'Wǒ yào yì bēi měishì kāfēi.', vi: 'Tôi muốn gọi một ly Americano.' },
      { speaker: 'B', speakerName: 'Thu ngân', cn: '好的，请问是大杯还是中杯？', pinyin: 'Hǎo de, qǐngwèn shì dàbēi háishì zhōngbēi?', vi: 'Vâng, xin hỏi là ly lớn hay ly vừa ạ?' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '中杯就可以了。请问多少钱？', pinyin: 'Zhōngbēi jiù kěyǐ le. Qǐngwèn duōshao qián?', vi: 'Ly vừa là được rồi. Xin hỏi bao nhiêu tiền vậy?' },
      { speaker: 'B', speakerName: 'Thu ngân', cn: '中杯美式二十二块。请问在这里喝还是外带？', pinyin: 'Zhōngbēi měishì èrshí\'èr kuài. Qǐngwèn zài zhèlǐ hē háishì wàidài?', vi: 'Americano vừa là 22 tệ. Quý khách uống tại đây hay mang về ạ?' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '外带，谢谢！', pinyin: 'Wàidài, xièxie!', vi: 'Mang về, cảm ơn bạn!' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: '"Ly lớn" trong tiếng Trung gọi là gì?',
        options: ['小杯', '中杯', '大杯', '超大杯'],
        correct: 2,
        explanation: '大 (dà - lớn) + 杯 (bēi - ly) = 大杯 (dàbēi).'
      },
      {
        type: 'multiple-choice',
        question: 'Muốn hỏi "Bao nhiêu tiền" bạn dùng cụm từ nào?',
        options: ['什么钱', '哪里钱', '多少钱', '多大钱'],
        correct: 2,
        explanation: '多少钱 (duōshao qián) là cách hỏi giá chuẩn xác.'
      },
      {
        type: 'multiple-choice',
        question: '"外带" (wàidài) có nghĩa là gì?',
        options: ['Uống tại quán', 'Mang đi (take away)', 'Giao hàng tận nơi', 'Hủy món'],
        correct: 1,
        explanation: '外带 (wàidài) là đóng gói mang đi.'
      }
    ]
  },
  {
    id: 'lesson-04',
    level: 2,
    title: 'Nguồn gốc hạt cà phê',
    titleCn: '咖啡豆与产地',
    description: 'Khám phá sự khác biệt giữa hạt Arabica, Robusta và các vùng trồng cà phê nổi tiếng.',
    icon: '🫘',
    vocabularyIds: ['v011', 'v012', 'v013', 'v014', 'v015', 'v016', 'v017', 'v018', 'v019'],
    objectives: [
      'Phân biệt hai giống hạt cà phê chính: 阿拉比卡 và 罗布斯塔.',
      'Sử dụng giới từ 从...来 (đến từ đâu) và 来自 (xuất xứ từ).',
      'Mô tả mức độ rang cơ bản: 浅烘焙, 中烘焙, 深烘焙.'
    ],
    grammar: [
      {
        pattern: '主语 + 来自 + 地点 / 国家',
        patternPinyin: 'Zhǔyǔ + láizì + dìdiǎn / guójiā',
        explanation: 'Biểu thị nguồn gốc, xuất xứ của người hoặc vật phẩm.',
        examples: [
          { cn: '这种咖啡豆来自云南。', pinyin: 'Zhè zhǒng kāfēidòu láizì Yúnnán.', vi: 'Loại hạt cà phê này đến từ Vân Nam.' },
          { cn: '这款豆子来自埃塞俄比亚。', pinyin: 'Zhè kuǎn dòuzi láizì Āisài\'ébǐyǎ.', vi: 'Hạt này có xuất xứ từ Ethiopia.' }
        ]
      },
      {
        pattern: 'A 比 B + 形容词',
        patternPinyin: 'A bǐ B + xíngróngcí',
        explanation: 'Mẫu câu so sánh hơn giữa hai sự vật.',
        examples: [
          { cn: '阿拉比卡豆比罗布斯塔豆更香。', pinyin: 'Ālābǐkǎ dòu bǐ Luóbùsītǎ dòu gèng xiāng.', vi: 'Hạt Arabica thơm hơn hạt Robusta.' },
          { cn: '深烘焙比浅烘焙更苦。', pinyin: 'Shēnhōngbèi bǐ qiǎnhōngbèi gèng kǔ.', vi: 'Rang đậm đắng hơn rang nhạt.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Khách hàng (顾客)', cn: '请问你们店用的是什么咖啡豆？', pinyin: 'Qǐngwèn nǐmen diàn yòng de shì shénme kāfēidòu?', vi: 'Xin hỏi tiệm mình dùng loại hạt cà phê nào vậy?' },
      { speaker: 'B', speakerName: 'Barista (咖啡师)', cn: '我们用的是百分之百阿拉比卡豆。', pinyin: 'Wǒmen yòng de shì bǎifēnzhībǎi Ālābǐkǎ dòu.', vi: 'Chúng tôi dùng 100% hạt Arabica ạ.' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '这个豆子产自哪里？', pinyin: 'Zhège dòuzi chǎnzì nǎlǐ?', vi: 'Hạt này có nguồn gốc xuất xứ từ đâu?' },
      { speaker: 'B', speakerName: 'Barista', cn: '产自中国云南保山，是中度烘焙，口感非常柔和。', pinyin: 'Chǎnzì Zhōngguó Yúnnán Bǎoshān, shì zhōngdù hōngbèi, kǒugǎn fēicháng róuhé.', vi: 'Đến từ Bảo Sơn, Vân Nam, Trung Quốc, được rang vừa nên vị rất mượt mà.' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '听起来很不错，给我冲一杯吧！', pinyin: 'Tīng qǐlái hěn búcuò, gěi wǒ chōng yì bēi ba!', vi: 'Nghe có vẻ hay đấy, pha cho tôi một ly nhé!' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: '"Hạt Arabica" trong tiếng Trung viết là gì?',
        options: ['罗布斯塔', '阿拉比卡', '摩卡豆', '蓝山豆'],
        correct: 1,
        explanation: '阿拉比卡 (Ālābǐkǎ) là phiên âm của giống Arabica.'
      },
      {
        type: 'multiple-choice',
        question: '"Thổ nhưỡng / Vùng trồng" thường được diễn đạt qua từ nào?',
        options: ['味道', '产地', '机器', '杯型'],
        correct: 1,
        explanation: '产地 (chǎndì) nghĩa là nơi sản xuất / xuất xứ.'
      },
      {
        type: 'multiple-choice',
        question: '"Rang đậm" trong kỹ thuật rang cà phê là gì?',
        options: ['浅烘焙', '中烘焙', '深烘焙', '极浅烘焙'],
        correct: 2,
        explanation: '深 (shēn - sâu/đậm) + 烘焙 (hōngbèi - rang nướng) = 深烘焙.'
      }
    ]
  },
  {
    id: 'lesson-05',
    level: 3,
    title: 'Dụng cụ pha chế cà phê',
    titleCn: '咖啡冲煮器具',
    description: 'Tìm hiểu từ vựng về cối xay, ấm rót cổ ngỗng, phễu lọc và cân điện tử.',
    icon: '⚙️',
    vocabularyIds: ['v038', 'v039', 'v040', 'v041', 'v042', 'v043', 'v044', 'v045', 'v046'],
    objectives: [
      'Ghi nhớ tên các thiết bị pha cà phê thủ công.',
      'Sử dụng giới từ 用 (yòng - dùng... để làm gì).',
      'Mô tả các thao tác chuẩn bị dụng cụ trước khi pha.'
    ],
    grammar: [
      {
        pattern: '用 + 工具 / 器具 + 动作',
        patternPinyin: 'Yòng + gōngjù / qìjù + dòngzuò',
        explanation: 'Giới từ 用 biểu thị phương tiện, công cụ được dùng để thực hiện hành động.',
        examples: [
          { cn: '咖啡师用手冲壶注水。', pinyin: 'Kāfēishī yòng shǒuchōnghú zhùshuǐ.', vi: 'Barista dùng ấm cổ ngỗng để châm nước.' },
          { cn: '我们用磨豆机研磨咖啡豆。', pinyin: 'Wǒmen yòng módòujī yánmó kāfēidòu.', vi: 'Chúng tôi dùng máy xay để xay hạt cà phê.' }
        ]
      },
      {
        pattern: '先... 然后... 最后...',
        patternPinyin: 'Xiān... ránhòu... zuìhòu...',
        explanation: 'Biểu thị trình tự trước sau của các bước thao tác.',
        examples: [
          { cn: '先折滤纸，然后温杯，最后倒粉。', pinyin: 'Xiān zhé lǜzhǐ, ránhòu wēn bēi, zuìhòu dào fěn.', vi: 'Trước tiên gấp giấy lọc, sau đó tráng nóng ly, cuối cùng đổ bột cà phê vào.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Học viên (学员)', cn: '老师，手冲咖啡需要哪些基本工具？', pinyin: 'Lǎoshī, shǒuchōng kāfēi xūyào nǎxiē jīběn gōngjù?', vi: 'Thưa thầy, pha cà phê Pour-over cần những dụng cụ cơ bản nào ạ?' },
      { speaker: 'B', speakerName: 'Chuyên gia (咖啡导师)', cn: '最基本的有滤杯、滤纸、手冲壶和电子秤。', pinyin: 'Zuì jīběn de yǒu lǜbēi, lǜzhǐ, shǒuchōnghú hé diànzǐchèng.', vi: 'Cơ bản nhất cần có phễu lọc, giấy lọc, ấm rót cổ ngỗng và cân điện tử.' },
      { speaker: 'A', speakerName: 'Học viên', cn: '电子秤的作用是什么？', pinyin: 'Diànzǐchèng de zuòyòng shì shénme?', vi: 'Tác dụng của cân điện tử là gì vậy ạ?' },
      { speaker: 'B', speakerName: 'Chuyên gia', cn: '用来准确称量咖啡粉的重量和注水量。', pinyin: 'Yòng lái zhǔnquè chēngliáng kāfēifěn de zhòngliàng hé zhùshuǐ liàng.', vi: 'Dùng để cân chính xác khối lượng bột cà phê và lượng nước rót.' },
      { speaker: 'A', speakerName: 'Học viên', cn: '我明白了，细节决定一杯好咖啡。', pinyin: 'Wǒ míngbai le, xìjié juédìng yì bēi hǎo kāfēi.', vi: 'Em hiểu rồi, chi tiết quyết định một ly cà phê ngon.' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: '"Ấm rót cổ ngỗng" tiếng Trung là gì?',
        options: ['咖啡机', '手冲壶', '摩卡壶', '压滤壶'],
        correct: 1,
        explanation: '手冲壶 (shǒuchōnghú) là ấm chuyên dụng để rót cà phê thủ công.'
      },
      {
        type: 'multiple-choice',
        question: '"Giấy lọc" tiếng Trung là gì?',
        options: ['滤纸', '滤杯', '奶缸', '电子秤'],
        correct: 0,
        explanation: '滤纸 (lǜzhǐ) là giấy lọc cà phê.'
      },
      {
        type: 'multiple-choice',
        question: 'Dụng cụ nào dùng để cân chính xác tỉ lệ bột nước?',
        options: ['磨豆机', '电子秤', '温度计', '压粉锤'],
        correct: 1,
        explanation: '电子秤 (diànzǐchèng) là cân điện tử tiểu ly.'
      }
    ]
  },
  {
    id: 'lesson-06',
    level: 3,
    title: 'Quy trình chiết xuất Espresso',
    titleCn: '意式浓缩萃取流程',
    description: 'Học từ vựng chuyên môn về nén bột, áp suất, thời gian chiết xuất và lớp bọt Crema vàng óng.',
    icon: '⚡',
    vocabularyIds: ['v002', 'v047', 'v048', 'v049', 'v050', 'v051', 'v052', 'v093', 'v094'],
    objectives: [
      'Nắm vững các thuật ngữ chuyên môn: 萃取 (cuìqǔ), 压粉 (yāfěn), 压力 (yālì).',
      'Biết cách nói về thời gian và thông số chiết xuất bằng giây (秒).',
      'Hiểu bản chất của lớp bọt kem Crema (油脂).'
    ],
    grammar: [
      {
        pattern: '把 + 宾语 + 动作 / 结果',
        patternPinyin: 'Bǎ + bīnyǔ + dòngzuò / jiéguǒ',
        explanation: 'Câu chữ 把 nhấn mạnh sự tác động làm biến đổi hoặc dịch chuyển vị trí của tân ngữ.',
        examples: [
          { cn: '请把咖啡粉压平。', pinyin: 'Qǐng bǎ kāfēifěn yā píng.', vi: 'Xin hãy nén phẳng bột cà phê.' },
          { cn: '把手柄装到咖啡机上。', pinyin: 'Bǎ shǒubǐng zhuāng dào kāfēijī shang.', vi: 'Lắp tay pha vào máy pha cà phê.' }
        ]
      },
      {
        pattern: '在... 之间 / 左右',
        patternPinyin: 'Zài... zhījiān / zuǒyòu',
        explanation: 'Biểu thị khoảng thời gian hoặc thông số xấp xỉ trong kỹ thuật.',
        examples: [
          { cn: '萃取时间在25到30秒之间。', pinyin: 'Cuìqǔ shíjiān zài èrshíwǔ dào sānshí miǎo zhījiān.', vi: 'Thời gian chiết xuất nằm trong khoảng 25 đến 30 giây.' },
          { cn: '水温在92度左右。', pinyin: 'Shuǐwēn zài jiǔshí\'èr dù zuǒyòu.', vi: 'Nhiệt độ nước xấp xỉ khoảng 92 độ.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'B', speakerName: 'Chuyên gia (咖啡导师)', cn: '萃取标准浓缩咖啡的关键是什么？', pinyin: 'Cuìqǔ biāozhǔn nóngsuō kāfēi de guānjiàn shì shénme?', vi: 'Chìa khóa để chiết xuất một ly Espresso tiêu chuẩn là gì?' },
      { speaker: 'A', speakerName: 'Học viên (学员)', cn: '是粉量、研磨度和压粉力度吗？', pinyin: 'Shì fěnliàng, yánmódù hé yāfěn lìdù ma?', vi: 'Có phải là lượng bột, độ mịn và lực nén không ạ?' },
      { speaker: 'B', speakerName: 'Chuyên gia', cn: '没错。通常用18克粉，在25到30秒内萃取约36克咖啡液。', pinyin: 'Méi cuò. Tōngcháng yòng shíbā kè fěn, zài èrshíwǔ dào sānshí miǎo nèi cuìqǔ yuē sānshíliù kè kāfēi yè.', vi: 'Chính xác. Thường dùng 18g bột, chiết xuất ra khoảng 36g cà phê trong 25 đến 30 giây.' },
      { speaker: 'A', speakerName: 'Học viên', cn: '看，上面有一层金黄色的油脂！', pinyin: 'Kàn, shàngmiàn yǒu yì céng jīnhuáng sè de yóuzhǐ!', vi: 'Nhìn kìa, phía trên có một lớp crema vàng óng rất đẹp!' },
      { speaker: 'B', speakerName: 'Chuyên gia', cn: '这说明萃取非常均匀，香气很浓郁。', pinyin: 'Zhè shuōmíng cuìqǔ fēicháng jūnyún, xiāngqì hěn nóngyù.', vi: 'Điều này chứng minh quá trình chiết xuất rất đều và hương thơm rất nồng nàn.' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: '"Chiết xuất" trong thuật ngữ cà phê là gì?',
        options: ['烘焙', '萃取', '研磨', '品鉴'],
        correct: 1,
        explanation: '萃取 (cuìqǔ) là chiết xuất các hợp chất hòa tan từ bột cà phê.'
      },
      {
        type: 'multiple-choice',
        question: 'Lớp bọt màu vàng óng trên mặt ly Espresso gọi là gì?',
        options: ['牛奶 (niúnǎi)', '糖浆 (tángjiāng)', '油脂 (yóuzhǐ / Crema)', '冰块 (bīngkuài)'],
        correct: 2,
        explanation: '油脂 (yóuzhǐ) là thuật ngữ tiếng Trung chỉ lớp Crema béo ngậy.'
      },
      {
        type: 'multiple-choice',
        question: 'Động tác dùng tamper để nén bột cà phê gọi là gì?',
        options: ['注水', '压粉', '拉花', '摇晃'],
        correct: 1,
        explanation: '压粉 (yāfěn) là thao tác nén cà phê (tamping).'
      }
    ]
  },
  {
    id: 'lesson-07',
    level: 4,
    title: 'Kỹ thuật pha Pour-over thủ công',
    titleCn: '手冲咖啡冲煮技巧',
    description: 'Chi tiết từng giai đoạn: ủ cà phê (闷蒸), tốc độ dòng chảy nước và kiểm soát tỷ lệ chiết xuất.',
    icon: '💧',
    vocabularyIds: ['v033', 'v053', 'v054', 'v055', 'v056', 'v057', 'v058', 'v095', 'v096'],
    objectives: [
      'Thành thạo khái niệm Ủ cà phê nở: 闷蒸 (mènzhēng).',
      'Hiểu khái niệm Tỷ lệ bột và nước: 粉水比 (fěnshuǐ bǐ).',
      'Mô tả dòng nước ổn định bằng các phó từ chỉ trạng thái.'
    ],
    grammar: [
      {
        pattern: '保持 + 状态 / 速度',
        patternPinyin: 'Bǎochí + zhuàngtài / sùdù',
        explanation: 'Biểu thị việc duy trì một trạng thái, tốc độ hoặc tư thế ổn định.',
        examples: [
          { cn: '注水时要保持水流稳定。', pinyin: 'Zhùshuǐ shí yào bǎochí shuǐliú wěndìng.', vi: 'Khi châm nước cần duy trì dòng nước thật ổn định.' },
          { cn: '手腕保持放松，不要晃动。', pinyin: 'Shǒuwàn bǎochí fàngsōng, bú yào huàngdòng.', vi: 'Cổ tay giữ thả lỏng, không được lắc lư.' }
        ]
      },
      {
        pattern: '按照 + 比例 / 标准',
        patternPinyin: 'Ànzhào + bǐlì / biāozhǔn',
        explanation: 'Làm việc gì đó căn cứ hoặc tuân theo một quy chuẩn, tỷ lệ nhất định.',
        examples: [
          { cn: '我们按照一比十五的粉水比冲煮。', pinyin: 'Wǒmen ànzhào yī bǐ shíwǔ de fěnshuǐ bǐ chōngzhǔ.', vi: 'Chúng tôi pha chế theo tỷ lệ bột - nước là 1:15.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'B', speakerName: 'Barista (咖啡师)', cn: '首先是闷蒸，注入三十克热水，等待三十秒。', pinyin: 'Shǒuxiān shì mènzhēng, zhùrù sānshí kè rèshuǐ, děngdài sānshí miǎo.', vi: 'Trước tiên là ủ nở (bloom), rót 30g nước nóng, chờ trong 30 giây.' },
      { speaker: 'A', speakerName: 'Khách hàng (顾客)', cn: '为什么咖啡粉会像汉堡一样膨胀起来？', pinyin: 'Wèishénme kāfēifěn huì xiàng hànbǎo yíyàng péngzhàng qǐlái?', vi: 'Tại sao bột cà phê lại nở phồng lên giống như chiếc bánh hamburger vậy?' },
      { speaker: 'B', speakerName: 'Barista', cn: '因为新鲜烘焙的咖啡豆正在释放二氧化碳。', pinyin: 'Yīnwèi xīnxiān hōngbèi de kāfēidòu zhèngzài shìfàng èryǎnghuàtàn.', vi: 'Bởi vì hạt cà phê mới rang đang giải phóng khí CO2 đấy ạ.' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '原来如此，接着怎么注水？', pinyin: 'Yuánlái rúcǐ, jiēzhe zěnme zhùshuǐ?', vi: 'Hóa ra là vậy, tiếp theo rót nước như thế nào?' },
      { speaker: 'B', speakerName: 'Barista', cn: '从中心向外画圈，水流要细而均匀，总时间控制在两分十五秒左右。', pinyin: 'Cóng zhōngxīn xiàng wài huà quān, shuǐliú yào xì ér jūnyún, zǒng shíjiān kòngzhì zài liǎng fēn shíwǔ miǎo zuǒyòu.', vi: 'Vẽ vòng tròn từ tâm ra ngoài, dòng nước phải mảnh và đều, tổng thời gian khống chế khoảng 2 phút 15 giây.' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Giai đoạn "Ủ cà phê nở" trong tiếng Trung gọi là gì?',
        options: ['萃取', '闷蒸', '研磨', '烘焙'],
        correct: 1,
        explanation: '闷蒸 (mènzhēng) là quá trình ngâm ủ bột cà phê với lượng nước nhỏ ban đầu.'
      },
      {
        type: 'multiple-choice',
        question: '"Tỷ lệ bột và nước" tiếng Trung là gì?',
        options: ['大小比', '冷热比', '粉水比', '甜酸比'],
        correct: 2,
        explanation: '粉水比 (fěnshuǐ bǐ) = tỷ lệ bột : nước (brew ratio).'
      },
      {
        type: 'multiple-choice',
        question: 'Khi rót nước Pour-over, yêu cầu quan trọng nhất đối với dòng nước là gì?',
        options: ['越快越好', '稳定均匀', '大水猛冲', '随时停顿'],
        correct: 1,
        explanation: '稳定均匀 (wěndìng jūnyún - ổn định và đều đặn) là yếu tố quyết định chất lượng.'
      }
    ]
  },
  {
    id: 'lesson-08',
    level: 4,
    title: 'Mô tả hương vị và cảm quan',
    titleCn: '咖啡风味与杯测描述',
    description: 'Học cách sử dụng bánh xe hương vị: chua thanh, ngọt hậu, thể chất dày dặn và hương hoa quả.',
    icon: '👃',
    vocabularyIds: ['v067', 'v068', 'v069', 'v070', 'v071', 'v072', 'v073', 'v074', 'v075'],
    objectives: [
      'Nắm vững 5 thuộc tính cảm quan: 酸度 (độ chua), 甜度 (độ ngọt), 醇厚度 (body), 余韵 (aftertaste).',
      'Mô tả các nhóm hương thơm: 花香 (hương hoa), 果香 (hương trái cây), 坚果 (hạt hạnh nhân).',
      'Diễn đạt cảm nhận khi thử nếm tách cà phê đặc sản.'
    ],
    grammar: [
      {
        pattern: '带有一丝 + 风味词',
        patternPinyin: 'Dàiyǒu yìsī + fēngwèicí',
        explanation: 'Diễn tả một thoáng hương vị nhẹ nhàng, thoang thoảng tinh tế.',
        examples: [
          { cn: '这杯咖啡带有一丝茉莉花香。', pinyin: 'Zhè bēi kāfēi dàiyǒu yìsī mòlìhuā xiāng.', vi: 'Tách cà phê này mang theo một thoáng hương hoa nhài.' },
          { cn: '尾韵带有一丝黑巧克力的苦甜。', pinyin: 'Wěiyùn dàiyǒu yìsī hēi qiǎokèlì de kǔtián.', vi: 'Hậu vị mang một chút đắng ngọt của chocolate đen.' }
        ]
      },
      {
        pattern: '不仅... 而且...',
        patternPinyin: 'Bùjǐn... érqiě...',
        explanation: 'Liên từ kết hợp "Không những... mà còn..." để khen ngợi chất lượng đa tầng.',
        examples: [
          { cn: '这款豆子不仅酸质明亮，而且甜感非常持久。', pinyin: 'Zhè kuǎn dòuzi bùjǐn suānzhì míngliàng, érqiě tiángǎn fēicháng chíchǐ.', vi: 'Loại hạt này không những có vị chua sáng mà vị ngọt còn rất bền bỉ.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Khách hàng (顾客)', cn: '这杯手冲咖啡口感很特别，我闻到了水果的味道。', pinyin: 'Zhè bēi shǒuchōng kāfēi kǒugǎn hěn tèbié, wǒ wéndào le shuǐguǒ de wèidao.', vi: 'Tách cà phê này vị rất đặc biệt, tôi ngửi thấy mùi trái cây.' },
      { speaker: 'B', speakerName: 'Barista (咖啡师)', cn: '您的味觉真敏锐！这是日晒埃塞俄比亚，有明显的柑橘和草莓风味。', pinyin: 'Nín de wèijué zhēn mǐnruì! Zhè shì rìshài Āisài\'ébǐyǎ, yǒu míngxiǎn de gānjú hé cǎoméi fēngwèi.', vi: 'Vị giác của bạn thật tinh tế! Đây là hạt Ethiopia sơ chế khô, có hương cam quýt và dâu tây rõ nét.' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '喝下去之后，嘴里感觉甜甜的。', pinyin: 'Hē xiàqù zhīhòu, zuǐ lǐ gǎnjué tiántián de.', vi: 'Sau khi uống xong, trong vòm họng vẫn thấy ngòn ngọt.' },
      { speaker: 'B', speakerName: 'Barista', cn: '是的，这就是我们常说的回甘和悠长余韵。', pinyin: 'Shì de, zhè jiùshì wǒmen cháng shuō de huígān hé yōucháng yúyùn.', vi: 'Đúng vậy, đó chính là vị ngọt hậu và dư vị kéo dài mà chúng tôi hay nhắc đến.' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: '"Hậu vị / Dư vị sau khi uống" trong tiếng Trung gọi là gì?',
        options: ['余韵 (yúyùn)', '前调 (qiántiáo)', '泡沫 (pàomò)', '温度 (wēndù)'],
        correct: 0,
        explanation: '余韵 (yúyùn) hoặc 回甘 (huígān) là hậu vị còn đọng lại.'
      },
      {
        type: 'multiple-choice',
        question: '"Thể chất / Độ sánh dầy của cà phê (Body)" là từ nào?',
        options: ['酸度', '甜度', '醇厚度', '苦度'],
        correct: 2,
        explanation: '醇厚度 (chúnhòudù) dùng để chỉ Body / Mouthfeel.'
      },
      {
        type: 'multiple-choice',
        question: '"Hương thơm trái cây" viết là gì?',
        options: ['花香', '果香', '木香', '坚果香'],
        correct: 1,
        explanation: '果香 (guǒxiāng) là hương thơm của hoa quả.'
      }
    ]
  },
  {
    id: 'lesson-09',
    level: 5,
    title: 'Tư vấn đồ uống chuyên sâu',
    titleCn: '高级咖啡推荐与定制',
    description: 'Thấu hiểu khẩu vị của khách, giải thích phương pháp sơ chế (chế biến ướt, khô) và đề xuất phù hợp.',
    icon: '🤝',
    vocabularyIds: ['v020', 'v021', 'v035', 'v036', 'v101', 'v102', 'v103', 'v104', 'v105'],
    objectives: [
      'Giao tiếp chuyên nghiệp nhằm khai thác sở thích thưởng thức của khách hàng.',
      'Giải thích sự khác biệt giữa Chế biến ướt (水洗) và Chế biến khô (日晒).',
      'Sử dụng các cấu trúc đề xuất trang trọng: 建议 (jiànyì), 推荐 (tuījiàn).'
    ],
    grammar: [
      {
        pattern: '根据 + 需求 / 口味，建议 / 推荐...',
        patternPinyin: 'Gēnjù + xūqiú / kǒuwèi, jiànyì / tuījiàn...',
        explanation: 'Cấu trúc diễn đạt sự chuyên nghiệp: Căn cứ vào nhu cầu/khẩu vị, tôi đề xuất...',
        examples: [
          { cn: '根据您的喜好，我推荐这款厌氧日晒咖啡。', pinyin: 'Gēnjù nín de xǐhào, wǒ tuījiàn zhè kuǎn yànyǎng rìshài kāfēi.', vi: 'Căn cứ vào sở thích của bạn, tôi xin gợi ý dòng cà phê lên men kỵ khí này.' }
        ]
      },
      {
        pattern: '与其说 A，不如说 B',
        patternPinyin: 'Yǔqí shuō A, bùrú shuō B',
        explanation: 'Diễn tả sự so sánh định nghĩa: Nói là A thì chi bằng nói là B sẽ chuẩn xác hơn.',
        examples: [
          { cn: '与其说它苦，不如说它有黑巧克力的醇厚。', pinyin: 'Yǔqí shuō tā kǔ, bùrú shuō tā yǒu hēi qiǎokèlì de chúnhòu.', vi: 'Thay vì nói nó đắng, đúng hơn là nó mang vị đầm của socola nguyên chất.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'B', speakerName: 'Barista (咖啡师)', cn: '女士您好！平时您喜欢偏酸明亮的水果调，还是偏醇厚的坚果黑巧风味？', pinyin: 'Nǚshì nín hǎo! Píngshí nín xǐhuan piān suān míngliàng de shuǐguǒ tiáo, háishì piān chúnhòu de jiānguǒ hēiqiǎo fēngwèi?', vi: 'Chào chị ạ! Bình thường chị thích tông chua thanh trái cây sáng hay gu đậm đà béo ngậy hạt ngũ cốc ạ?' },
      { speaker: 'A', speakerName: 'Khách hàng (顾客)', cn: '我不太喜欢太酸的，希望能喝到香气浓郁、口感丝滑的咖啡。', pinyin: 'Wǒ bú tài xǐhuan tài suān de, xīwàng néng hē dào xiāngqì nóngyù, kǒugǎn sīhuá de kāfēi.', vi: 'Tôi không thích chua quá, muốn uống loại thơm nồng và có kết cấu mượt mà như lụa.' },
      { speaker: 'B', speakerName: 'Barista', cn: '那非常建议您尝试我们云南瑰夏水洗豆，既有优雅的花香，又拥有如红茶般的温润。', pinyin: 'Nà fēicháng jiànyì nín chángshì wǒmen Yúnnán Guīxià shuǐxǐ dòu, jì yǒu yōuyǎ de huāxiāng, yòu yōngyǒu rú hóngchá bān de wēnrùn.', vi: 'Vậy rất khuyến khích chị thử hạt Geisha Vân Nam chế biến ướt, vừa có hương hoa tao nhã vừa êm dịu tựa hồng trà.' },
      { speaker: 'A', speakerName: 'Khách hàng', cn: '听你的专业推荐，就来这一款吧！', pinyin: 'Tīng nǐ de zhuānyè tuījiàn, jiù lái zhè yì kuǎn ba!', vi: 'Nghe gợi ý chuyên nghiệp của em, cho chị thưởng thức ly này nhé!' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Phương pháp "Chế biến ướt" trong tiếng Trung gọi là gì?',
        options: ['水洗 (shuǐxǐ)', '日晒 (rìshài)', '蜜处理 (mì chǔlǐ)', '厌氧 (yànyǎng)'],
        correct: 0,
        explanation: '水洗 (shuǐxǐ) là phương pháp sơ chế ướt (Washed process).'
      },
      {
        type: 'multiple-choice',
        question: 'Từ nào mang nghĩa là "Đề xuất / Giới thiệu"?',
        options: ['推荐 (tuījiàn)', '反对 (fǎnduì)', '停止 (tíngzhǐ)', '拒绝 (jùjué)'],
        correct: 0,
        explanation: '推荐 (tuījiàn) là đề xuất, giới thiệu món.'
      },
      {
        type: 'multiple-choice',
        question: 'Hạt giống nổi tiếng "Geisha" tiếng Trung phiên âm là gì?',
        options: ['铁皮卡', '波旁', '瑰夏 (Guīxià)', '卡杜拉'],
        correct: 2,
        explanation: '瑰夏 (Guīxià) là tên gọi tiếng Trung của giống Geisha danh giá.'
      }
    ]
  },
  {
    id: 'lesson-10',
    level: 5,
    title: 'Quản lý quầy bar và chất lượng',
    titleCn: '吧台管理与品控体系',
    description: 'Quy trình hiệu chỉnh cối xay (Calibrate), kiểm tra độ chiết xuất TDS và bảo trì thiết bị pha.',
    icon: '📊',
    vocabularyIds: ['v089', 'v090', 'v097', 'v098', 'v099', 'v100', 'v138', 'v139', 'v140'],
    objectives: [
      'Nắm bắt các thao tác kiểm soát chất lượng: 校准 (jiàozhǔn), 品控 (pǐnkòng).',
      'Hiểu tác động của độ ẩm và nhiệt độ không khí đối với độ mịn bột cà phê.',
      'Sử dụng văn phong báo cáo công việc và quản trị quầy bar.'
    ],
    grammar: [
      {
        pattern: '由于... 因此 / 必须...',
        patternPinyin: 'Yóuyú... yīncǐ / bìxū...',
        explanation: 'Biểu thị mối quan hệ nhân quả trang trọng trong báo cáo kỹ thuật.',
        examples: [
          { cn: '由于今天天气湿度较大，因此必须把研磨度调粗一档。', pinyin: 'Yóuyú jīntiān tiānqì shīdù jiàodà, yīncǐ bìxū bǎ yánmódù tiáo cū yì dǎng.', vi: 'Do hôm nay độ ẩm thời tiết khá lớn, nên nhất định phải chỉnh độ xay thô lên một nấc.' }
        ]
      },
      {
        pattern: '为了确保... 应当...',
        patternPinyin: 'Wèile quèbǎo... yīngdāng...',
        explanation: 'Chỉ mục đích và biện pháp thực hiện quy trình chuẩn (SOP).',
        examples: [
          { cn: '为了确保每一杯咖啡的品质，开门前应当测试浓缩萃取率。', pinyin: 'Wèile quèbǎo měi yì bēi kāfēi de pǐnzhì, kāimén qián yīngdāng cèshì nóngsuō cuìqǔ lǜ.', vi: 'Để đảm bảo chất lượng mỗi tách cà phê, trước khi mở cửa cần đo lường tỷ lệ chiết xuất.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'B', speakerName: 'Cửa hàng trưởng (店长)', cn: '早上开店前的调磨工作做好了吗？', pinyin: 'Zǎoshang kāidiàn qián de tiáomó gōngzuò zuò hǎo le ma?', vi: 'Công tác hiệu chỉnh cối xay (dial-in) trước giờ mở cửa sáng nay đã xong chưa?' },
      { speaker: 'A', speakerName: 'Trưởng ca (领班)', cn: '已经测试了三组数据，目前的流速和浓度都达到了理想标准。', pinyin: 'Yǐjīng cèshì le sān zǔ shùjù, mùqián de liúsù hé nóngdù dōu dádào le lǐxiǎng biāozhǔn.', vi: 'Em đã kiểm tra 3 nhóm số liệu, tốc độ dòng chảy và nồng độ hiện tại đều đã đạt chuẩn lý tưởng.' },
      { speaker: 'B', speakerName: 'Cửa hàng trưởng', cn: '蒸汽棒清洁和反冲洗滤头有没有记录在检查表上？', pinyin: 'Zhēngqìbàng qīngjié hé fǎnchōngxǐ lǜtóu yǒu méiyǒu jìlù zài jiǎnchábiǎo shang?', vi: 'Vệ sinh vòi đánh sữa và sục rửa họng pha đã ghi chép vào checklist chưa?' },
      { speaker: 'A', speakerName: 'Trưởng ca', cn: '都已经登记完毕，随时可以迎接第一位顾客。', pinyin: 'Dōu yǐjīng dēngjì wánbì, suíshí kěyǐ yíngjiē dì yī wèi gùkè.', vi: 'Tất cả đã hoàn tất ghi nhận, có thể sẵn sàng đón vị khách đầu tiên bất cứ lúc nào.' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Thao tác "Hiệu chỉnh cối xay (Dial-in / Calibrate)" tiếng Trung là gì?',
        options: ['调磨 (tiáomó)', '打奶 (dǎnǎi)', '拉花 (lāhuā)', '烘豆 (hōngdòu)'],
        correct: 0,
        explanation: '调磨 (tiáomó) là căn chỉnh cối xay hàng ngày.'
      },
      {
        type: 'multiple-choice',
        question: '"Quản lý kiểm soát chất lượng" viết tắt là QC tiếng Trung là gì?',
        options: ['服务 (fúwù)', '品控 (pǐnkòng)', '收银 (shōuyín)', '外卖 (wàimài)'],
        correct: 1,
        explanation: '品控 (pǐnkòng) = 品质控制 (Kiểm soát chất lượng sản phẩm).'
      },
      {
        type: 'multiple-choice',
        question: 'Dụng cụ nào trên máy pha Espresso dùng để tạo bọt sữa?',
        options: ['手柄', '冲煮头', '蒸汽棒 (vòi hơi)', '滴水盘'],
        correct: 2,
        explanation: '蒸汽棒 (zhēngqìbàng) là cần đánh sữa bằng hơi nước áp suất.'
      }
    ]
  },
  {
    id: 'lesson-11',
    level: 6,
    title: 'Kinh doanh và chuỗi cung ứng cà phê',
    titleCn: '生豆贸易与供应链金融',
    description: 'Thương mại xuất nhập khẩu hạt cà phê nhân xanh, hợp đồng tương lai và logistics quốc tế.',
    icon: '🚢',
    vocabularyIds: ['v014', 'v015', 'v156', 'v157', 'v158', 'v159', 'v160', 'v161', 'v162'],
    objectives: [
      'Làm quen với thuật ngữ ngoại thương: 生豆采购 (mua hạt nhân), 关税 (thuế quan), 现货 (giao ngay).',
      'Đọc hiểu và đàm phán hợp đồng cung ứng hạt cà phê cao cấp.',
      'Sử dụng các cấu trúc văn bản thương mại chính thức trong tiếng Trung.'
    ],
    grammar: [
      {
        pattern: '鉴于... 双方经友好协商，达成如下协议',
        patternPinyin: 'Jiànyú... shuāngfāng jīng yǒuhǎo xiéshāng, dáchéng rúxià xiéyì',
        explanation: 'Mở đầu công văn hoặc hợp đồng thương mại quốc tế chuẩn mực.',
        examples: [
          { cn: '鉴于长期战略合作，双方达成生豆采购协议。', pinyin: 'Jiànyú chángqī zhànlüè hézuò, shuāngfāng dáchéng shēngdòu cǎigòu xiéyì.', vi: 'Xét thấy quan hệ hợp tác chiến lược lâu dài, hai bên đạt được thỏa thuận thu mua cà phê nhân xanh.' }
        ]
      },
      {
        pattern: '无论... 均须符合...',
        patternPinyin: 'Wúlùn... jūnxū fúhé...',
        explanation: 'Khẳng định tính bắt buộc tuân thủ tiêu chuẩn chất lượng không có ngoại lệ.',
        examples: [
          { cn: '无论交货批次如何，生豆瑕疵率均须符合特种咖啡协会标准。', pinyin: 'Wúlùn jiāohuò pīcì rúhé, shēngdòu xiácī lǜ jūnxū fúhé tèzhǒng kāfēi xiéhuì biāozhǔn.', vi: 'Bất luận đợt giao hàng thế nào, tỷ lệ lỗi hạt nhân xanh đều bắt buộc phải thỏa mãn tiêu chuẩn SCA.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Nhà nhập khẩu (进口商代表)', cn: '张总，关于本季度从云南采购五十吨水洗生豆的合同，各项条款确认得如何？', pinyin: 'Zhāng zǒng, guānyú běn jìdù cóng Yúnnán cǎigòu wǔshí dūn shuǐxǐ shēngdòu de hétong, gèxiàng tiáokuǎn quèrèn de rúhé?', vi: 'Chào giám đốc Trương, về hợp đồng mua 50 tấn cà phê nhân sơ chế ướt quý này tại Vân Nam, các điều khoản đã được duyệt chưa ạ?' },
      { speaker: 'B', speakerName: 'Chủ trang trại (庄园主)', cn: '我们已经复核了集装箱防潮运输方案和离岸价格，整体没有异议。', pinyin: 'Wǒmen yǐjīng fùhé le jízhuāngxiāng fángcháo yùnshū fāng\'àn hé lí\'àn jiàgé, zhěngtǐ méiyǒu yìyì.', vi: 'Bên tôi đã rà soát lại phương án chống ẩm container và giá FOB, nhìn chung không có vướng mắc gì.' },
      { speaker: 'A', speakerName: 'Nhà nhập khẩu', cn: '货款支付方式我们建议采用不可撤销信用证，以保障双方资金安全。', pinyin: 'Huòkuǎn zhīfù fāngshì wǒmen jiànyì cǎiyòng bùkě chèxiāo xìnyòngzhèng, yǐ bǎozhàng shuāngfāng zījīn ānquán.', vi: 'Về phương thức thanh toán tiền hàng, chúng tôi đề xuất áp dụng L/C không hủy ngang để bảo đảm an toàn dòng tiền cho đôi bên.' },
      { speaker: 'B', speakerName: 'Chủ trang trại', cn: '非常赞同，预祝我们的合作互利共赢！', pinyin: 'Fēicháng zàntóng, yùzhù wǒmen de hézuò hùlì gòngyíng!', vi: 'Rất đồng tình, chúc sự hợp tác của hai bên chúng ta cùng có lợi và thành công rực rỡ!' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: '"Cà phê nhân xanh (hạt thô chưa rang)" tiếng Trung là gì?',
        options: ['熟豆', '生豆 (shēngdòu)', '咖啡渣', '速溶粉'],
        correct: 1,
        explanation: '生豆 (shēngdòu) là hạt cà phê nhân xanh chưa qua chế biến nhiệt.'
      },
      {
        type: 'multiple-choice',
        question: 'Thuật ngữ "Chuỗi cung ứng" trong tiếng Trung là gì?',
        options: ['供应链 (gōngyìngliàn)', '连锁店 (liánsuǒdiàn)', '批发商 (pīfāshāng)', '营业额 (yíngyè\'é)'],
        correct: 0,
        explanation: '供应链 (gōngyìngliàn) = Supply chain.'
      },
      {
        type: 'multiple-choice',
        question: 'Văn bản cam kết giao dịch hợp pháp giữa hai bên gọi là gì?',
        options: ['收据', '合同 (hétong)', '发票', '价目表'],
        correct: 1,
        explanation: '合同 (hétong) là hợp đồng thương mại có giá trị pháp lý.'
      }
    ]
  },
  {
    id: 'lesson-12',
    level: 6,
    title: 'Văn hóa cà phê đương đại Trung Hoa',
    titleCn: '当代中国咖啡人文与浪潮',
    description: 'Bình luận văn hóa: Sự dịch chuyển từ Trà đạo sang Cà phê số, làn sóng thứ tư và bản sắc bản địa.',
    icon: '🏮',
    vocabularyIds: ['v166', 'v167', 'v168', 'v169', 'v170', 'v171', 'v172', 'v173', 'v174'],
    objectives: [
      'Bình luận về sự trỗi dậy của các chuỗi cà phê bán lẻ công nghệ như Luckin và Manner.',
      'Hiểu rõ sự giao thoa triết học giữa Trà thiền (禅茶) và Nghệ thuật pha chế thủ công.',
      'Sử dụng các thành ngữ và quán dụng ngữ trình độ cao trong đàm đạo văn hóa.'
    ],
    grammar: [
      {
        pattern: '兼具... 与... 之美',
        patternPinyin: 'Jiānjù... yǔ... zhī měi',
        explanation: 'Mẫu câu văn chương biểu thị việc hội tụ trọn vẹn cả hai vẻ đẹp độc đáo.',
        examples: [
          { cn: '中国现代咖啡馆兼具传统茶室的静谧与现代都市的活力之美。', pinyin: 'Zhōngguó xiàndài kāfēiguǎn jiānjù chuántǒng cháchì de jìngmì yǔ xiàndài dūshì de huólì zhī měi.', vi: 'Quán cà phê Trung Hoa hiện đại hội tụ nét đẹp thanh tịnh của trà thất truyền thống và sức sống náo nhiệt của đô thị phồn hoa.' }
        ]
      },
      {
        pattern: '从某种意义上说...',
        patternPinyin: 'Cóng mǒuzhǒng yìyì shang shuō...',
        explanation: 'Dùng khi muốn đưa ra một nhận định triết lý hoặc góc nhìn mang tính đúc kết.',
        examples: [
          { cn: '从某种意义上说，品鉴单品咖啡与品鉴大红袍有着异曲同工之妙。', pinyin: 'Cóng mǒuzhǒng yìyì shang shuō, pǐnjiàn dānpǐn kāfēi yǔ pǐnjiàn Dàhóngpáo yǒuzhe yìqǔtónggōng zhī miào.', vi: 'Xét theo nghĩa nào đó, việc thưởng thức cà phê Single Origin và trà Đại Hồng Bào đều mang lại sự kỳ diệu tương đồng.' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', speakerName: 'Nhà nghiên cứu văn hóa (学者)', cn: '中国是拥有悠久茶文化的国度，如今上海却成了全球拥有咖啡馆数量最多的城市，这真是一个有趣的文化现象。', pinyin: 'Zhōngguó shì yōngyǒu yōujiǔ cháwénhuà de guó dù, rújīn Shànghǎi què chéng le quánqiú yōngyǒu kāfēiguǎn shùliàng zuì duō de chéngshì, zhè zhēn shì yí gè yǒuqù de wénhuà xiànxiàng.', vi: 'Trung Quốc là đất nước có bề dày văn hóa trà đạo, vậy mà giờ đây Thượng Hải lại trở thành thành phố sở hữu số lượng quán cà phê lớn nhất thế giới, quả là một hiện tượng văn hóa kỳ thú.' },
      { speaker: 'B', speakerName: 'Chuyên gia cà phê (评委)', cn: '是的。青年一代并不是抛弃了传统，而是在特种咖啡的仪式感中，找到了契合现代快节奏生活的全新精神栖息地。', pinyin: 'Shì de. Qīngnián yídài bìng bú shì pāoqì le chuántǒng, ér shì zài tèzhǒng kāfēi de yíshìgǎn zhōng, zhǎodào le qìhé xiàndài kuàijièzòu shēnghuó de quánxīn jīngshén qīxīdì.', vi: 'Đúng vậy. Thế hệ trẻ không hề từ bỏ truyền thống, mà thông qua tính nghi thức của cà phê Specialty, họ đã tìm được chốn dung dưỡng tinh thần mới mẻ phù hợp nhịp sống hối hả đương thời.' },
      { speaker: 'A', speakerName: 'Nhà nghiên cứu văn hóa', cn: '生椰拿铁和茶咖的创新更体现了这种本土化的文化包容性。', pinyin: 'Shēngyē nátiě hé chákā de chuàngxīn gèng tǐxiàn le zhè zhǒng běntǔhuà de wénhuà bāoróngxìng.', vi: 'Sự sáng tạo của cà phê dừa tươi hay cà phê pha trà càng thể hiện tính dung hợp văn hóa bản địa sâu sắc.' },
      { speaker: 'B', speakerName: 'Chuyên gia cà phê', cn: '文化在碰撞中新生，这正是咖啡带给我们的无尽魅力。', pinyin: 'Wénhuà zài pèngzhuàng zhōng xīnshēng, zhè zhèng shì kāfēi dài gěi wǒmen de wújìn mèilì.', vi: 'Văn hóa luôn hồi sinh trong những cuộc giao thoa, đó chính là nét quyến rũ bất tận mà cà phê mang đến cho chúng ta.' }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Thành phố nào tại Trung Quốc hiện sở hữu số lượng quán cà phê lớn nhất thế giới?',
        options: ['北京 (Bắc Kinh)', '上海 (Thượng Hải)', '广州 (Quảng Châu)', '成都 (Thành Đô)'],
        correct: 1,
        explanation: '上海 (Thượng Hải) hiện có hơn 8.500 quán cà phê, đứng đầu toàn cầu.'
      },
      {
        type: 'multiple-choice',
        question: 'Món cà phê sáng tạo mang tính đột phá của chuỗi cà phê Trung Quốc là gì?',
        options: ['美式咖啡', '生椰拿铁 (Raw Coconut Latte)', '浓缩咖啡', '卡布奇诺'],
        correct: 1,
        explanation: '生椰拿铁 (Shēngyē nátiě) là trào lưu cà phê nước cốt dừa tươi làm bùng nổ thị trường.'
      },
      {
        type: 'multiple-choice',
        question: 'Cụm từ "异曲同工" (yìqǔ-tónggōng) mang ý nghĩa gì?',
        options: ['Khác nhau hoàn toàn', 'Cách làm khác nhưng hiệu quả tuyệt diệu tương đồng', 'Chơi đàn không hay', 'Tranh cãi gay gắt'],
        correct: 1,
        explanation: '异曲同工 là thành ngữ chỉ những cách làm hay hình thức khác biệt nhưng đạt đến cùng một kết quả tuyệt mỹ.'
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LESSONS_DATA };
}
