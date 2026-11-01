/* ============================================
   COFFEE 中文 – Conversations Data
   10 Tình huống giao tiếp thực tế tại quán cà phê
   ============================================ */

const CONVERSATIONS_DATA = [
  {
    id: 'conv-01',
    title: 'Khách gọi cà phê tại quầy',
    titleCn: '顾客在吧台点咖啡',
    description: 'Tình huống cơ bản khi bước vào quán cà phê và order đồ uống yêu thích.',
    icon: '☕',
    level: 1,
    characters: [
      { id: 'customer', name: 'Khách hàng', nameCn: '顾客', icon: '🧑' },
      { id: 'barista', name: 'Barista', nameCn: '咖啡师', icon: '☕' }
    ],
    lines: [
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '您好！欢迎光临！请问今天想喝点什么？',
        pinyin: 'Nín hǎo! Huānyíng guānglín! Qǐngwèn jīntiān xiǎng hē diǎn shénme?',
        vi: 'Xin chào! Chào mừng quý khách! Xin hỏi hôm nay quý khách muốn dùng gì ạ?',
        newWords: [
          { word: '欢迎光临', pinyin: 'huānyíng guānglín', meaning: 'hoan nghênh quý khách' },
          { word: '请问', pinyin: 'qǐngwèn', meaning: 'xin hỏi' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '你好，给我一杯热拿铁。',
        pinyin: 'Nǐ hǎo, gěi wǒ yì bēi rè nátiě.',
        vi: 'Chào bạn, cho tôi một ly Latte nóng.',
        newWords: [
          { word: '拿铁', pinyin: 'nátiě', meaning: 'cà phê Latte' },
          { word: '热', pinyin: 'rè', meaning: 'nóng' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '好的，请问您需要大杯还是中杯？',
        pinyin: 'Hǎo de, qǐngwèn nín xūyào dàbēi háishì zhōngbēi?',
        vi: 'Vâng ạ, xin hỏi quý khách chọn ly lớn hay ly vừa?',
        newWords: [
          { word: '大杯', pinyin: 'dàbēi', meaning: 'ly lớn' },
          { word: '还是', pinyin: 'háishì', meaning: 'hay là (lựa chọn)' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '中杯就可以了，谢谢。',
        pinyin: 'Zhōngbēi jiù kěyǐ le, xièxie.',
        vi: 'Ly vừa là được rồi, cảm ơn bạn.',
        newWords: [
          { word: '中杯', pinyin: 'zhōngbēi', meaning: 'ly vừa' },
          { word: '可以', pinyin: 'kěyǐ', meaning: 'được / có thể' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '没问题，请在旁边稍等，做好了叫您的号码。',
        pinyin: 'Méi wèntí, qǐng zài pángbiān shāo děng, zuò hǎo le jiào nín de hàomǎ.',
        vi: 'Không vấn đề gì ạ, xin mời quý khách đợi bên cạnh một lát, làm xong tôi sẽ gọi số của quý khách nhé.',
        newWords: [
          { word: '稍等', pinyin: 'shāo děng', meaning: 'đợi một lát' },
          { word: '号码', pinyin: 'hàomǎ', meaning: 'số thứ tự' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '我要一杯冰美式咖啡。', pinyin: 'Wǒ yào yì bēi bīng měishì kāfēi.', vi: 'Tôi muốn một ly Americano đá.' },
        { cn: '请问有燕麦奶吗？', pinyin: 'Qǐngwèn yǒu yànmài nǎi ma?', vi: 'Cho hỏi quán có sữa yến mạch không?' }
      ],
      barista: [
        { cn: '有的，我们使用的是进口燕麦奶。', pinyin: 'Yǒu de, wǒmen shǐyòng de shì jìnkǒu yànmài nǎi.', vi: 'Dạ có, bên em dùng sữa yến mạch nhập khẩu ạ.' },
        { cn: '好的，一杯冰美式，马上为您制作。', pinyin: 'Hǎo de, yì bēi bīng měishì, mǎshàng wèi nín zhìzuò.', vi: 'Vâng, một ly Americano đá, em làm ngay cho mình nhé.' }
      ]
    }
  },
  {
    id: 'conv-02',
    title: 'Khách hỏi giá và khuyến mãi',
    titleCn: '询问价格与优惠',
    description: 'Hỏi giá tiền của các món cà phê và tìm hiểu chương trình giảm giá hôm nay.',
    icon: '💰',
    level: 1,
    characters: [
      { id: 'customer', name: 'Khách hàng', nameCn: '顾客', icon: '🧑' },
      { id: 'cashier', name: 'Thu ngân', nameCn: '收银员', icon: '💁' }
    ],
    lines: [
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '请问手冲咖啡多少钱一杯？',
        pinyin: 'Qǐngwèn shǒuchōng kāfēi duōshao qián yì bēi?',
        vi: 'Xin hỏi một ly cà phê pha tay Pour-over giá bao nhiêu vậy?',
        newWords: [
          { word: '手冲咖啡', pinyin: 'shǒuchōng kāfēi', meaning: 'cà phê pha phễu thủ công' },
          { word: '多少钱', pinyin: 'duōshao qián', meaning: 'bao nhiêu tiền' }
        ]
      },
      {
        speaker: 'cashier',
        speakerName: 'Thu ngân',
        cn: '根据豆子产地不同，价格在三十八块到六十八块之间。',
        pinyin: 'Gēnjù dòuzi chǎndì bùtóng, jiàgé zài sānshíbā kuài dào liùshíbā kuài zhījiān.',
        vi: 'Tùy theo vùng trồng hạt khác nhau, giá dao động từ 38 đến 68 tệ ạ.',
        newWords: [
          { word: '价格', pinyin: 'jiàgé', meaning: 'giá cả' },
          { word: '产地', pinyin: 'chǎndì', meaning: 'nơi sản xuất / vùng trồng' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '今天有什么特价优惠活动吗？',
        pinyin: 'Jīntiān yǒu shénme tèjià yōuhuì huódòng ma?',
        vi: 'Hôm nay quán có chương trình ưu đãi đặc biệt nào không?',
        newWords: [
          { word: '优惠', pinyin: 'yōuhuì', meaning: 'ưu đãi / giảm giá' },
          { word: '活动', pinyin: 'huódòng', meaning: 'chương trình / hoạt động' }
        ]
      },
      {
        speaker: 'cashier',
        speakerName: 'Thu ngân',
        cn: '有的！今天是会员日，买第二杯半价。',
        pinyin: 'Yǒu de! Jīntiān shì huìyuán rì, mǎi dì èr bēi bàn jià.',
        vi: 'Dạ có ạ! Hôm nay là ngày hội viên, mua ly thứ hai được nửa giá (giảm 50%).',
        newWords: [
          { word: '会员', pinyin: 'huìyuán', meaning: 'hội viên / thành viên' },
          { word: '半价', pinyin: 'bàn jià', meaning: 'nửa giá' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '太划算了，那我买两杯云南日晒手冲！',
        pinyin: 'Tài huásuàn le, nà wǒ mǎi liǎng bēi Yúnnán rìshài shǒuchōng!',
        vi: 'Hời quá chừng, vậy tôi mua hai ly Pour-over Vân Nam sơ chế khô nhé!',
        newWords: [
          { word: '划算', pinyin: 'huásuàn', meaning: 'kinh tế / đáng đồng tiền' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '支持微信或者支付宝付款吗？', pinyin: 'Zhīchí Wēixìn huòzhě Zhīfùbǎo fùkuǎn ma?', vi: 'Có nhận thanh toán qua WeChat hay Alipay không?' }
      ],
      cashier: [
        { cn: '都可以，请扫描桌上的二维码。', pinyin: 'Dōu kěyǐ, qǐng sǎomiáo zhuō shang de èrwéimǎ.', vi: 'Dạ đều được ạ, xin mời quét mã QR trên bàn nhé.' }
      ]
    }
  },
  {
    id: 'conv-03',
    title: 'Barista tư vấn khẩu vị đồ uống',
    titleCn: '咖啡师推荐饮品',
    description: 'Barista trò chuyện cùng khách để tìm ra loại hạt và thức uống chuẩn gu nhất.',
    icon: '👨‍🍳',
    level: 2,
    characters: [
      { id: 'customer', name: 'Khách hàng', nameCn: '顾客', icon: '🙋' },
      { id: 'barista', name: 'Barista', nameCn: '咖啡师', icon: '👨‍🍳' }
    ],
    lines: [
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '你们这里的特色咖啡是什么？能帮我推荐一下吗？',
        pinyin: 'Nǐmen zhèlǐ de tèsè kāfēi shì shénme? Néng bāng wǒ tuījiàn yíxià ma?',
        vi: 'Món cà phê đặc sắc ở quán mình là gì vậy? Bạn có thể gợi ý cho tôi một chút được không?',
        newWords: [
          { word: '特色', pinyin: 'tèsè', meaning: 'đặc sắc / đặc sản' },
          { word: '推荐', pinyin: 'tuījiàn', meaning: 'gợi ý / đề xuất' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '当然可以！请问您平时喜欢喝奶咖，还是清爽的原味黑咖啡呢？',
        pinyin: 'Dāngrán kěyǐ! Qǐngwèn nín píngshí xǐhuan hē nǎikā, háishì qīngshuǎng de yuánwèi hēikāfēi ne?',
        vi: 'Tất nhiên rồi ạ! Xin hỏi bình thường mình thích uống cà phê sữa hay chuộng cà phê đen nguyên bản thanh mát ạ?',
        newWords: [
          { word: '奶咖', pinyin: 'nǎikā', meaning: 'cà phê pha sữa' },
          { word: '清爽', pinyin: 'qīngshuǎng', meaning: 'thanh mát / sảng khoái' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '我喜欢黑咖啡，但不要太苦的。',
        pinyin: 'Wǒ xǐhuan hēikāfēi, dàn bú yào tài kǔ de.',
        vi: 'Tôi thích cà phê đen, nhưng đừng quá đắng nhé.',
        newWords: [
          { word: '苦', pinyin: 'kǔ', meaning: 'đắng' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '那强烈推荐我们的埃塞俄比亚水洗手冲，有非常明显的茉莉花香和柠檬酸质，一点都不苦。',
        pinyin: 'Nà qiángliè tuījiàn wǒmen de Āisài\'ébǐyǎ shuǐxǐ shǒuchōng, yǒu fēicháng míngxiǎn de mòlìhuā xiāng hé níngméng suānzhì, yìdiǎn dōu bù kǔ.',
        vi: 'Vậy em rất đề xuất món Pour-over hạt Ethiopia chế biến ướt, hương hoa nhài và vị chua chanh sáng cực rõ, không hề đắng một chút nào.',
        newWords: [
          { word: '水洗', pinyin: 'shuǐxǐ', meaning: 'chế biến ướt' },
          { word: '花香', pinyin: 'huāxiāng', meaning: 'hương hoa' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '听起来正是我想喝的，那就来一杯吧！',
        pinyin: 'Tīng qǐlái zhèng shì wǒ xiǎng hē de, nà jiù lái yì bēi ba!',
        vi: 'Nghe đúng gu tôi đang thèm luôn, vậy làm cho tôi một ly đó nhé!',
        newWords: [
          { word: '正是', pinyin: 'zhèng shì', meaning: 'chính là' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '如果加冰块口感会变淡吗？', pinyin: 'Rúguǒ jiā bīngkuài kǒugǎn huì biàn dàn ma?', vi: 'Nếu thêm đá thì vị có bị nhạt đi không?' }
      ],
      barista: [
        { cn: '不会的，我们会调整萃取比例，保证冰饮香气依然浓郁。', pinyin: 'Bú huì de, wǒmen huì tiáozhěng cuìqǔ bǐlì, bǎozhèng bīngyǐn xiāngqì yīrán nóngyù.', vi: 'Dạ không đâu ạ, bên em sẽ căn chỉnh tỷ lệ chiết xuất để đảm bảo hương vị khi uống đá vẫn thơm đậm đà.' }
      ]
    }
  },
  {
    id: 'conv-04',
    title: 'Yêu cầu điều chỉnh độ ngọt (ít đường/không đường)',
    titleCn: '调整甜度（少糖或无糖）',
    description: 'Hướng dẫn cách diễn đạt các mức độ ngọt: toàn đường, nửa đường, ít đường hoặc không đường.',
    icon: '🍬',
    level: 2,
    characters: [
      { id: 'customer', name: 'Khách hàng', nameCn: '顾客', icon: '👩' },
      { id: 'cashier', name: 'Nhân viên', nameCn: '店员', icon: '💁' }
    ],
    lines: [
      {
        speaker: 'cashier',
        speakerName: 'Nhân viên',
        cn: '您的焦糖玛奇朵，请问甜度需要怎么做？',
        pinyin: 'Nín de jiāotáng mǎqíduǒ, qǐngwèn tiándù xūyào zěnme zuò?',
        vi: 'Ly Caramel Macchiato của quý khách, xin hỏi mình muốn làm độ ngọt thế nào ạ?',
        newWords: [
          { word: '焦糖', pinyin: 'jiāotáng', meaning: 'caramel' },
          { word: '甜度', pinyin: 'tiándù', meaning: 'độ ngọt' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '我正在减肥，不要太甜。可以做少糖吗？',
        pinyin: 'Wǒ zhèngzài jiǎnféi, bú yào tài tián. Kěyǐ zuò shǎotáng ma?',
        vi: 'Tôi đang ăn kiêng giảm cân, không muốn ngọt quá. Quán làm ít đường giúp tôi được không?',
        newWords: [
          { word: '减肥', pinyin: 'jiǎnféi', meaning: 'giảm cân' },
          { word: '少糖', pinyin: 'shǎotáng', meaning: 'ít đường' }
        ]
      },
      {
        speaker: 'cashier',
        speakerName: 'Nhân viên',
        cn: '没问题，我们有全糖、半糖、微糖和无糖，为您做微糖可以吗？',
        pinyin: 'Méi wèntí, wǒmen yǒu quántáng, bàntáng, wēitáng hé wútáng, wèi nín zuò wēitáng kěyǐ ma?',
        vi: 'Dạ được ạ, bên em có các mức: 100% đường, 50% đường (bán đường), 30% đường (vi đường/ít đường) và không đường. Làm mức 30% ít ngọt cho mình nhé?',
        newWords: [
          { word: '半糖', pinyin: 'bàntáng', meaning: 'nửa đường (50%)' },
          { word: '无糖', pinyin: 'wútáng', meaning: 'không đường (0%)' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '微糖刚刚好，非常感谢你的细心。',
        pinyin: 'Wēitáng gānggāng hǎo, fēicháng gǎnxiè nǐ de xìxīn.',
        vi: 'Mức ít ngọt đó là vừa vặn nhất, rất cảm ơn sự chu đáo của bạn.',
        newWords: [
          { word: '刚刚好', pinyin: 'gānggāng hǎo', meaning: 'vừa vặn / đúng chuẩn' },
          { word: '细心', pinyin: 'xìxīn', meaning: 'chu đáo / cẩn thận' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '顺便请帮我做去冰，谢谢！', pinyin: 'Shùnbiàn qǐng bāng wǒ zuò qùbīng, xièxie!', vi: 'Tiện thể làm bỏ đá (không đá) giúp tôi luôn nhé, cảm ơn!' }
      ],
      cashier: [
        { cn: '好的，微糖、去冰，已经为您备注好了。', pinyin: 'Hǎo de, wēitáng, qùbīng, yǐjīng wèi nín bèizhù hǎo le.', vi: 'Dạ vâng, ít đường, không đá, em đã note cẩn thận vào đơn rồi ạ.' }
      ]
    }
  },
  {
    id: 'conv-05',
    title: 'Yêu cầu đổi sữa hạt (Oat milk / Sữa đậu nành)',
    titleCn: '更换植物奶（燕麦奶）',
    description: 'Thực hành yêu cầu đổi sữa bò sang các loại sữa thực vật cho người bất dung nạp lactose.',
    icon: '🌾',
    level: 3,
    characters: [
      { id: 'customer', name: 'Khách hàng', nameCn: '顾客', icon: '🧑' },
      { id: 'barista', name: 'Barista', nameCn: '咖啡师', icon: '☕' }
    ],
    lines: [
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '你好，我有乳糖不耐受，喝牛奶会胃痛。',
        pinyin: 'Nǐ hǎo, wǒ yǒu rǔtáng bú nàishòu, hē niúnǎi huì wèitòng.',
        vi: 'Chào bạn, tôi bị chứng bất dung nạp lactose, uống sữa bò hay bị đau dạ dày.',
        newWords: [
          { word: '乳糖不耐受', pinyin: 'rǔtáng bú nàishòu', meaning: 'không dung nạp lactose' },
          { word: '胃痛', pinyin: 'wèitòng', meaning: 'đau dạ dày' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '完全不用担心！我们店里所有的奶咖都可以免费换成燕麦奶或者厚椰乳。',
        pinyin: 'Wánquán búyòng dānxīn! Wǒmen diàn lǐ suǒyǒu de nǎikā dōu kěyǐ miǎnfèi huànchéng yànmài nǎi huòzhě hòuyērǔ.',
        vi: 'Dạ anh hoàn toàn yên tâm nhé! Tất cả món cà phê sữa bên em đều có thể đổi sang sữa yến mạch hoặc sữa dừa đặc mà không tính thêm phí ạ.',
        newWords: [
          { word: '燕麦奶', pinyin: 'yànmài nǎi', meaning: 'sữa yến mạch (oat milk)' },
          { word: '免费', pinyin: 'miǎnfèi', meaning: 'miễn phí' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '那太棒了！那我要一杯燕麦拿铁。',
        pinyin: 'Nà tài bàng le! Nà wǒ yào yì bēi yànmài nátiě.',
        vi: 'Vậy thì tuyệt quá! Cho tôi một ly Oat Latte nhé.',
        newWords: [
          { word: '燕麦拿铁', pinyin: 'yànmài nátiě', meaning: 'Oat Milk Latte' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '燕麦奶带有自然的谷物甘甜，和浓缩咖啡结合口感非常醇厚，您一定会喜欢。',
        pinyin: 'Yànmài nǎi dàiyǒu zìrán de gǔwù gāntián, hé nóngsuō kāfēi jiéhé kǒugǎn fēicháng chúnhòu, nín yídìng huì xǐhuan.',
        vi: 'Sữa yến mạch có vị ngọt bùi tự nhiên của ngũ cốc, hòa quyện với Espresso vị rất béo ngậy đầm đà, anh nhất định sẽ thích mê.',
        newWords: [
          { word: '谷物', pinyin: 'gǔwù', meaning: 'ngũ cốc' },
          { word: '结合', pinyin: 'jiéhé', meaning: 'kết hợp' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '能帮我打厚一点的奶泡吗？我想看漂亮的拉花。', pinyin: 'Néng bāng wǒ dǎ hòu yìdiǎn de nǎipào ma? Wǒ xiǎng kàn piàoliang de lāhuā.', vi: 'Đánh bọt sữa dày một chút giúp tôi được không? Tôi muốn ngắm hình vẽ latte art thật đẹp.' }
      ],
      barista: [
        { cn: '没问题，我一定为您用心拉一颗爱心或者郁金香！', pinyin: 'Méi wèntí, wǒ yídìng wèi nín yòngxīn lā yì kē àixīn huòzhě yùjīnxiāng!', vi: 'Dạ được chứ ạ, em sẽ nắn nót rót một hình trái tim hoặc hoa tulip thật xinh tặng mình!' }
      ]
    }
  },
  {
    id: 'conv-06',
    title: 'Hỏi về nguồn gốc hạt và phương pháp sơ chế',
    titleCn: '探讨咖啡豆与处理法',
    description: 'Trò chuyện chuyên sâu với barista về câu chuyện đằng sau hạt cà phê đặc sản.',
    icon: '🗺️',
    level: 3,
    characters: [
      { id: 'customer', name: 'Khách hàng sành cà phê', nameCn: '咖啡爱好者', icon: '🧐' },
      { id: 'barista', name: 'Barista', nameCn: '咖啡师', icon: '👨‍🍳' }
    ],
    lines: [
      {
        speaker: 'customer',
        speakerName: 'Khách sành cà phê',
        cn: '看到你们吧台上有哥伦比亚粉红波旁，是日晒还是水洗处理的？',
        pinyin: 'Kàndào nǐmen bātái shang yǒu Gēlúnbǐyǎ Fěnhóng Bōpáng, shì rìshài háishì shuǐxǐ chǔlǐ de?',
        vi: 'Tôi thấy trên quầy bar quán có hạt Colombia Pink Bourbon, hạt này sơ chế phơi khô hay chế biến ướt vậy bạn?',
        newWords: [
          { word: '粉红波旁', pinyin: 'Fěnhóng Bōpáng', meaning: 'giống cà phê Pink Bourbon' },
          { word: '处理法', pinyin: 'chǔlǐ fǎ', meaning: 'phương pháp sơ chế' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '这款豆子采用了特殊的厌氧热冲击水洗处理法。',
        pinyin: 'Zhè kuǎn dòuzi cǎiyòng le tèshū de yànyǎng rèchōngjī shuǐxǐ chǔlǐ fǎ.',
        vi: 'Loại hạt này áp dụng phương pháp sơ chế ướt sốc nhiệt kỵ khí (Thermal Shock Anaerobic Washed) rất đặc biệt ạ.',
        newWords: [
          { word: '厌氧', pinyin: 'yànyǎng', meaning: 'kỵ khí (lên men không có oxy)' },
          { word: '热冲击', pinyin: 'rèchōngjī', meaning: 'sốc nhiệt' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách sành cà phê',
        cn: '难怪香气这么有辨识度！具体能喝到什么风味？',
        pinyin: 'Nánguài xiāngqì zhème yǒu biànshídù! Jùtǐ néng hē dào shénme fēngwèi?',
        vi: 'Hèn chi hương thơm ngửi độc đáo và dễ nhận biết thế! Cụ thể khi nếm sẽ cảm nhận được những nốt vị gì vậy?',
        newWords: [
          { word: '难怪', pinyin: 'nánguài', meaning: 'hèn chi / hèn nào' },
          { word: '辨识度', pinyin: 'biànshídù', meaning: 'độ nhận diện / nét riêng' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '高温时有浓郁的桃子果酱香气，中温转为草莓冰淇淋，低温尾段有薄荷的清凉感。',
        pinyin: 'Gāowēn shí yǒu nóngyù de táozi guǒjiàng xiāngqì, zhōngwēn zhuǎn wéi cǎoméi bīngqílín, dīwēn wěiduàn yǒu bòhe de qīngliáng gǎn.',
        vi: 'Lúc nhiệt độ còn cao sẽ đậm mùi mứt đào chín, hạ xuống ấm chuyển sang kem dâu tây, và khi nguội hẳn phần hậu vị sẽ đọng lại cảm giác the mát của bạc hà.',
        newWords: [
          { word: '果酱', pinyin: 'guǒjiàng', meaning: 'mứt hoa quả' },
          { word: '薄荷', pinyin: 'bòhe', meaning: 'bạc hà' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '店里有烘焙好的熟豆出售吗？我想买一包带回家手冲。', pinyin: 'Diàn lǐ yǒu hōngbèi hǎo de shúdòu chūshòu ma? Wǒ xiǎng mǎi yì bāo dài huí jiā shǒuchōng.', vi: 'Tiệm có bán túi hạt đã rang sẵn không? Tôi muốn mua một gói mang về nhà tự pha Pour-over.' }
      ],
      barista: [
        { cn: '有的，这是三天前刚烘焙好的，赏味期正当时，我们还可以帮您现场研磨。', pinyin: 'Yǒu de, zhè shì sān tiān qián gāng hōngbèi hǎo de, shǎngwèiqī zhèng dāngshí, wǒmen hái kěyǐ bāng nín xiànchǎng yánmó.', vi: 'Dạ có, mẻ này vừa rang cách đây 3 ngày, đang ở giai đoạn đỉnh cao thơm ngon nhất, bên em còn có thể hỗ trợ xay mịn miễn phí theo dụng cụ của anh luôn ạ.' }
      ]
    }
  },
  {
    id: 'conv-07',
    title: 'Trao đổi về vị chua và vị đắng của cà phê',
    titleCn: '探讨酸质与苦味',
    description: 'Giúp khách giải tỏa nỗi sợ "cà phê bị chua" và hiểu thế nào là vị chua hoa quả tự nhiên.',
    icon: '🍋',
    level: 4,
    characters: [
      { id: 'customer', name: 'Khách hàng', nameCn: '顾客', icon: '🤔' },
      { id: 'barista', name: 'Barista', nameCn: '咖啡师', icon: '👨‍🍳' }
    ],
    lines: [
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '我以前喝咖啡总觉得酸咖啡是不好的，为什么精品咖啡这么强调酸质呢？',
        pinyin: 'Wǒ yǐqián hē kāfēi zǒng juéde suān kāfēi shì bù hǎo de, wèishénme jīngpǐn kāfēi zhème qiángdiào suānzhì ne?',
        vi: 'Trước đây tôi cứ nghĩ cà phê bị chua là dở, sao giới Specialty Coffee lại đề cao vị chua đến thế vậy?',
        newWords: [
          { word: '精品咖啡', pinyin: 'jīngpǐn kāfēi', meaning: 'cà phê hảo hạng / specialty coffee' },
          { word: '强调', pinyin: 'qiángdiào', meaning: 'nhấn mạnh / đề cao' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '这是个非常好的问题！不好的酸是劣质生豆发酵过度带来的尖锐醋酸；而好咖啡的酸是类似柑橘、苹果的优质果酸。',
        pinyin: 'Zhè shì gè fēicháng hǎo de wèntí! Bù hǎo de suān shì lièzhì shēngdòu fājiào guòdù dàilái de jiānruì cùsuān; ér hǎo kāfēi de suān shì lèisì gānjú, píngguǒ de yōuzhì guǒsuān.',
        vi: 'Câu hỏi của anh rất hay! Vị chua xấu là do hạt kém chất lượng lên men quá lố tạo thành giấm gắt; còn vị chua của hạt chất lượng cao lại là axit trái cây tươi tắn tựa như cam chanh, táo giòn.',
        newWords: [
          { word: '劣质', pinyin: 'lièzhì', meaning: 'chất lượng thấp / thứ phẩm' },
          { word: '果酸', pinyin: 'guǒsuān', meaning: 'axit trái cây tự nhiên' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '所以咖啡其实是一种水果的种子，保留果酸才是它原本的面貌？',
        pinyin: 'Suǒyǐ kāfēi qíshí shì yì zhǒng shuǐguǒ de zhǒngzǐ, bǎoliú guǒsuān cái shì tā yuánběn de miànmào?',
        vi: 'Cho nên bản chất cà phê là hạt của một loại quả mọng, giữ được axit quả mới là diện mạo chân thật nguyên bản của nó?',
        newWords: [
          { word: '种子', pinyin: 'zhǒngzǐ', meaning: 'hạt giống' },
          { word: '面貌', pinyin: 'miànmào', meaning: 'diện mạo / bộ mặt' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '太准确了！酸质赋予咖啡生机与明亮感，再加上烘焙产生的焦糖甜感，就达成了完美的酸甜平衡。',
        pinyin: 'Tài zhǔnquè le! Suānzhì fùyǔ kāfēi shēngjī yǔ míngliànggǎn, zài jiā shang hōngbèi chǎnshēng de jiāotáng tiángǎn, jiù dáchéng le wánměi de suāntián pínghéng.',
        vi: 'Anh nói chuẩn xác quá chừng! Vị chua ban tặng sức sống tươi mới cho tách cà phê, hòa cùng vị ngọt caramel sinh ra trong lò rang sẽ tạo thành sự cân bằng chua ngọt hoàn hảo tuyệt luân.',
        newWords: [
          { word: '赋予', pinyin: 'fùyǔ', meaning: 'ban tặng / đem lại' },
          { word: '平衡', pinyin: 'pínghéng', meaning: 'cân bằng' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '谢谢你解开了我多年的误解，今天我就试试这款浅烘焙！', pinyin: 'Xièxie nǐ jiěkāi le wǒ duōnián de wùjiě, jīntiān wǒ jiù shìshi zhè kuǎn qiǎnhōngbèi!', vi: 'Cảm ơn em đã giải tỏa hiểu lầm bao năm nay của anh, hôm nay anh nhất định thử mẻ rang sáng màu này!' }
      ],
      barista: [
        { cn: '祝您开启全新的风味大门，喝完欢迎随时交流感受！', pinyin: 'Zhù nín kāiqǐ quánxīn de fēngwèi dàmén, hē wán huānyíng suíshí jiāoliú gǎnshòu!', vi: 'Chúc anh mở ra cánh cửa hương vị hoàn toàn mới, uống xong hoan nghênh anh ghé quầy trò chuyện tiếp nhé!' }
      ]
    }
  },
  {
    id: 'conv-08',
    title: 'Nhân viên tiếp nhận yêu cầu đặc biệt của khách',
    titleCn: '处理特殊订单要求',
    description: 'Thực hành các mẫu câu phức tạp: thêm shot espresso, dùng ly cá nhân, tráng cốc nước nóng.',
    icon: '📋',
    level: 4,
    characters: [
      { id: 'customer', name: 'Khách hàng', nameCn: '顾客', icon: '👩‍💼' },
      { id: 'barista', name: 'Barista', nameCn: '咖啡师', icon: '☕' }
    ],
    lines: [
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '你好，我自己带了环保保温杯，可以装在我的杯子里吗？',
        pinyin: 'Nǐ hǎo, wǒ zìjǐ dài le huánbǎo bǎowēnbēi, kěyǐ zhuāng zài wǒ de bēizi lǐ ma?',
        vi: 'Chào em, chị có mang theo bình giữ nhiệt bảo vệ môi trường, có thể rót cà phê vào bình của chị được không?',
        newWords: [
          { word: '环保', pinyin: 'huánbǎo', meaning: 'bảo vệ môi trường' },
          { word: '保温杯', pinyin: 'bǎowēnbēi', meaning: 'bình giữ nhiệt' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '当然支持环保！自带杯每杯可以立减五块钱。',
        pinyin: 'Dāngrán zhīchí huánbǎo! Zìdài bēi měi bēi kěyǐ lìjiǎn wǔ kuài qián.',
        vi: 'Dạ bên em cực kỳ ủng hộ bảo vệ môi trường luôn ạ! Khách tự mang cốc mỗi ly sẽ được giảm trực tiếp 5 tệ ạ.',
        newWords: [
          { word: '自带杯', pinyin: 'zìdài bēi', meaning: 'tự mang cốc/ly' },
          { word: '立减', pinyin: 'lìjiǎn', meaning: 'giảm ngay lập tức' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '太好了。另外我需要多加一份浓缩咖啡，做双倍浓缩（Double shot）。',
        pinyin: 'Tài hǎo le. Lìngwài wǒ xūyào duō jiā yí fèn nóngsuō kāfēi, zuò shuāngbèi nóngsuō.',
        vi: 'Hay quá em. Ngoài ra chị cần thêm một shot Espresso nữa, làm gấp đôi lượng cà phê (Double shot) nhé.',
        newWords: [
          { word: '另外', pinyin: 'lìngwài', meaning: 'ngoài ra' },
          { word: '双倍', pinyin: 'shuāngbèi', meaning: 'gấp đôi / double' }
        ]
      },
      {
        speaker: 'barista',
        speakerName: 'Barista',
        cn: '好的，加一份特浓加五元，稍后做好会帮您把杯盖拧紧。',
        pinyin: 'Hǎo de, jiā yí fèn tènóng jiā wǔ yuán, shāohòu zuò hǎo huì bāng nín bǎ bēigài nǐng jǐn.',
        vi: 'Vâng ạ, thêm một shot đậm tính thêm 5 tệ, lát nữa làm xong em sẽ vặn chặt nắp bình cẩn thận cho chị nhé.',
        newWords: [
          { word: '杯盖', pinyin: 'bēigài', meaning: 'nắp ly' },
          { word: '拧紧', pinyin: 'nǐng jǐn', meaning: 'vặn chặt' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '顺便能帮我用热水烫一下杯子吗？', pinyin: 'Shùnbiàn néng bāng wǒ yòng rèshuǐ tàng yíxià bēizi ma?', vi: 'Tiện thể tráng nước sôi nóng cái bình giúp chị một chút được không?' }
      ],
      barista: [
        { cn: '没问题，温杯能让咖啡温度保持得更持久。', pinyin: 'Méi wèntí, wēn bēi néng ràng kāfēi wēndù bǎochí de gèng chíchǐ.', vi: 'Dạ được ngay ạ, tráng nóng bình sẽ giữ ấm cà phê được lâu hơn rất nhiều đó chị.' }
      ]
    }
  },
  {
    id: 'conv-09',
    title: 'Thanh toán tại quầy và xuất hóa đơn',
    titleCn: '收银结账与开具发票',
    description: 'Xử lý các tình huống thanh toán số, xuất hóa đơn điện tử cho doanh nghiệp.',
    icon: '🧾',
    level: 5,
    characters: [
      { id: 'customer', name: 'Khách hàng', nameCn: '顾客', icon: '👨‍💼' },
      { id: 'cashier', name: 'Thu ngân', nameCn: '收银员', icon: '💁' }
    ],
    lines: [
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '服务员，请问在哪里买单？我们要开发票报销。',
        pinyin: 'Fúwùyuán, qǐngwèn zài nǎlǐ mǎidān? Wǒmen yào kāi fāpiào bàoxiāo.',
        vi: 'Phục vụ ơi, cho anh hỏi thanh toán ở đâu vậy? Tụi anh cần xuất hóa đơn về công ty thanh toán công tác.',
        newWords: [
          { word: '买单', pinyin: 'mǎidān', meaning: 'thanh toán / tính tiền' },
          { word: '发票', pinyin: 'fāpiào', meaning: 'hóa đơn VAT' },
          { word: '报销', pinyin: 'bàoxiāo', meaning: 'thanh toán lại từ công ty' }
        ]
      },
      {
        speaker: 'cashier',
        speakerName: 'Thu ngân',
        cn: '先生您好，您可以在收银台付款，支持刷卡和移动支付。',
        pinyin: 'Xiānsheng nín hǎo, nín kěyǐ zài shōuyíntái fùkuǎn, zhīchí shuākǎ hé yídòng zhīfù.',
        vi: 'Chào anh, anh có thể thanh toán tại quầy thu ngân, quán nhận quẹt thẻ và thanh toán di động điện tử ạ.',
        newWords: [
          { word: '收银台', pinyin: 'shōuyíntái', meaning: 'quầy thu ngân' },
          { word: '移动支付', pinyin: 'yídòng zhīfù', meaning: 'thanh toán di động (m-payment)' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Khách hàng',
        cn: '你们三号桌一共消费了多少？',
        pinyin: 'Nǐmen sān hào zhuō yígòng xiāofèi le duōshao?',
        vi: 'Bàn số 3 của bọn anh tổng cộng hết bao nhiêu vậy em?',
        newWords: [
          { word: '消费', pinyin: 'xiāofèi', meaning: 'tiêu dùng / chi phí' }
        ]
      },
      {
        speaker: 'cashier',
        speakerName: 'Thu ngân',
        cn: '三号桌共四杯咖啡和两份甜品，折后一共一百六十八元。小票上有开票二维码，扫码即可填写企业税号。',
        pinyin: 'Sān hào zhuō gòng sì bēi kāfēi hé liǎng fèn tiánpǐn, zhéhòu yígòng yìbǎi liùshíbā yuán. Xiǎopiào shang yǒu kāipiào èrwéimǎ, sǎomǎ jíkě tiánxiě qǐyè shuìhào.',
        vi: 'Bàn số 3 gồm 4 ly cà phê và 2 đĩa bánh ngọt, sau khi giảm giá tổng cộng 168 tệ. Trên hóa đơn có in mã QR, anh quét mã là điền mã số thuế doanh nghiệp để nhận hóa đơn điện tử ngay được ạ.',
        newWords: [
          { word: '小票', pinyin: 'xiǎopiào', meaning: 'phiếu thu / bill giấy' },
          { word: '税号', pinyin: 'shuìhào', meaning: 'mã số thuế' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '太方便了，我已经扫码付好了，电子发票也提交了。', pinyin: 'Tài fāngbiàn le, wǒ yǐjīng sǎomǎ fù hǎo le, diànzǐ fāpiào yě tíjiāo le.', vi: 'Tiện lợi quá, anh vừa quét mã thanh toán xong, hóa đơn điện tử cũng đã submit rồi.' }
      ],
      cashier: [
        { cn: '款项已收到，感谢您的光临，祝您工作顺利，慢走！', pinyin: 'Kuǎnxiàng yǐ shōudào, gǎnxiè nín de guānglín, zhù nín gōngzuò shùnlì, màn zǒu!', vi: 'Hệ thống đã nhận được tiền, cảm ơn quý khách, chúc anh công việc thuận lợi, xin chào tạm biệt ạ!' }
      ]
    }
  },
  {
    id: 'conv-10',
    title: 'Giới thiệu không gian và triết lý thương hiệu cà phê',
    titleCn: '讲述空间美学与品牌理念',
    description: 'Giao lưu nghệ thuật về kiến trúc quán cà phê Specialty, văn hóa kết nối cộng đồng.',
    icon: '🏛️',
    level: 6,
    characters: [
      { id: 'customer', name: 'Nhà thiết kế / Du khách', nameCn: '空间设计师', icon: '🎨' },
      { id: 'founder', name: 'Chủ sáng lập', nameCn: '主理人', icon: '🎩' }
    ],
    lines: [
      {
        speaker: 'customer',
        speakerName: 'Nhà thiết kế',
        cn: '您好！你们店的空间设计太震撼了，粗犷的微水泥与温润的深色原木碰撞出了极佳的静谧感。',
        pinyin: 'Nín hǎo! Nǐmen diàn de kōngjiān shèjì tài zhènhàn le, cūguǎng de wēishuǐní yǔ wēnrùn de shēnsè yuánmù pèngzhuàng chū le jíjiā de jìngmìgǎn.',
        vi: 'Chào anh! Thiết kế không gian tiệm mình quá đỗi ấn tượng, nét thô mộc của vi xi măng đối thoại cùng sắc ấm của gỗ tự nhiên tạo nên cảm giác tĩnh lặng tuyệt đỉnh.',
        newWords: [
          { word: '空间设计', pinyin: 'kōngjiān shèjì', meaning: 'thiết kế không gian' },
          { word: '静谧', pinyin: 'jìngmì', meaning: 'tĩnh mịch / thanh tịnh' }
        ]
      },
      {
        speaker: 'founder',
        speakerName: 'Chủ sáng lập',
        cn: '非常荣幸得到您的认可！我们希望打造一个城市里的“第三空间”，让人们在咖啡香气中慢下脚步。',
        pinyin: 'Fēicháng róngxìng dédào nín de rènkě! Wǒmen xīwàng dǎzào yí gè chéngshì lǐ de “dì-sān kōngjiān”, ràng rénmen zài kāfēi xiāngqì zhōng màn xià jiǎobù.',
        vi: 'Thật vinh hạnh khi được bạn khen ngợi! Tụi mình ấp ủ kiến tạo nên một "không gian thứ ba" trong lòng đô thị, nơi mọi người có thể sống chậm lại bên hương cà phê.',
        newWords: [
          { word: '第三空间', pinyin: 'dì-sān kōngjiān', meaning: 'không gian thứ ba (Third Place)' },
          { word: '慢下脚步', pinyin: 'màn xià jiǎobù', meaning: 'chậm lại bước chân' }
        ]
      },
      {
        speaker: 'customer',
        speakerName: 'Nhà thiết kế',
        cn: '我注意到开放式岛台的设计打破了咖啡师与客人之间的距离感。',
        pinyin: 'Wǒ zhùyì dào kāifàngshì dǎotái de shèjì dǎpò le kāfēishī yǔ kèrén zhījiān de jùlígǎn.',
        vi: 'Tôi nhận thấy thiết kế đảo quầy mở đã xóa nhòa khoảng cách giữa barista và thực khách.',
        newWords: [
          { word: '岛台', pinyin: 'dǎotái', meaning: 'quầy bar dạng đảo' },
          { word: '距离感', pinyin: 'jùlígǎn', meaning: 'khoảng cách tâm lý' }
        ]
      },
      {
        speaker: 'founder',
        speakerName: 'Chủ sáng lập',
        cn: '是的。咖啡不仅是一杯饮品，更是一种传递真诚与温度的生活媒介。每一杯出品都是我们对土地与咖啡农的致敬。',
        pinyin: 'Shì de. Kāfēi bùjǐn shì yì bēi yǐnpǐn, gèng shì yì zhǒng chuándì zhēnchéng yǔ wēndù de shēnghuó méijiè. Měi yì bēi chūpǐn dōu shì wǒmen duì tǔdì yǔ kāfēinóng de zhìjìng.',
        vi: 'Đúng thế bạn. Cà phê không đơn thuần là một tách đồ uống, mà là phương tiện truyền tải sự chân thành và hơi ấm cuộc đời. Mỗi sản phẩm trao tay đều là lòng tri ân của tụi mình gửi tới thổ nhưỡng và người nông dân.',
        newWords: [
          { word: '媒介', pinyin: 'méijiè', meaning: 'phương tiện / cầu nối' },
          { word: '致敬', pinyin: 'zhìjìng', meaning: 'tri ân / tôn kính' }
        ]
      }
    ],
    roleplayOptions: {
      customer: [
        { cn: '这种理念深深打动了我，祝愿你们的品牌生生不息！', pinyin: 'Zhè zhǒng lǐniàn shēnshēn dǎdòng le wǒ, zhùyuàn nǐmen de pǐnpái shēngshēng-bùxī!', vi: 'Triết lý này chạm đến trái tim tôi, chúc thương hiệu của các bạn luôn tràn trề sức sống trường tồn!' }
      ],
      founder: [
        { cn: '随时欢迎您常来坐坐，交流更多设计灵感与咖啡风味！', pinyin: 'Suíshí huānyíng nín cháng lái zuòzuò, jiāoliú gèng duō shèjì línggǎn yǔ kāfēi fēngwèi!', vi: 'Bất cứ lúc nào cũng hoan nghênh bạn ghé lại đàm đạo thêm về cảm hứng sáng tạo và phong vị cà phê nhé!' }
      ]
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONVERSATIONS_DATA };
}
