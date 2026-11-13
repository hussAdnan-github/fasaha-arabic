export interface CampusFacility {
  id: string;
  nameWithTashkeel: string;
  namePlain: string;
  englishMeaning: string;
  category: "facility" | "classroom" | "admin" | "outdoor";
  icon: string;
  description: string;
  itemsFound: string[];
}

export interface ModelSentence {
  id: string;
  arabicWithTashkeel: string;
  arabicPlain: string;
  englishTranslation: string;
  phonetic: string;
  type: "nominal" | "verbal";
  typeLabel: string;
  grammarAnalysis: {
    part: string;
    role: string;
    colorClass: string;
  }[];
}

export interface WordClassificationItem {
  id: string;
  wordWithTashkeel: string;
  wordPlain: string;
  type: "noun" | "verb" | "particle";
  meaning: string;
}

export interface GenderProfessionPair {
  id: string;
  masculineWithTashkeel: string;
  masculinePlain: string;
  feminineWithTashkeel: string;
  femininePlain: string;
  englishTitle: string;
  icon: string;
  description: string;
}

export interface SpatialDirectionSentence {
  id: string;
  arabicWithTashkeel: string;
  arabicPlain: string;
  preposition: string;
  prepositionMeaning: string;
  englishTranslation: string;
  subject: string;
  referencePoint: string;
  icon: string;
}

export interface PerspectiveQuestion {
  id: string;
  item: string;
  questionText: string;
  perspectiveTarget: "بالنسبة للطلاب" | "بالنسبة للمدرس";
  correctAnswer: string;
  options: string[];
  explanation: string;
}

// 1 & 4. FACILITIES (10 Primary School Facilities)
export const schoolFacilities: CampusFacility[] = [
  {
    id: "classrooms",
    nameWithTashkeel: "فُصُولٌ دِرَاسِيَّةٌ",
    namePlain: "فصول دراسية",
    englishMeaning: "Classrooms",
    category: "classroom",
    icon: "meeting_room",
    description: "حجرات التعلم المجهزة بالسبورة، المقاعد، والمكاتب لاستيعاب الطلاب وتلقي الدروس.",
    itemsFound: ["سَبُّورَةٌ", "مَقَاعِدُ الطُّلَّابِ", "مَكْتَبُ المُعَلِّمِ", "شَاشَةٌ ذَكِيَّةٌ"],
  },
  {
    id: "registration",
    nameWithTashkeel: "مَكْتَبُ التَّسْجِيلِ",
    namePlain: "مكتب التسجيل",
    englishMeaning: "Registration Office",
    category: "admin",
    icon: "assignment",
    description: "المقر الإداري المخصص لاستقبال أولياء الأمور وتسجيل بيانات الطلاب الجدد وإصدار البطاقات.",
    itemsFound: ["مَلَفَّاتُ الطُّلَّابِ", "حَوَاسِيبُ التَّسْجِيلِ", "اسْتِمَارَاتُ القَبُولِ"],
  },
  {
    id: "library",
    nameWithTashkeel: "المَكْتَبَةُ المَدْرَسِيَّةُ",
    namePlain: "المكتبة المدرسية",
    englishMeaning: "School Library",
    category: "facility",
    icon: "local_library",
    description: "واحة القراءة والاطلاع الهادئة الزاخرة بالقصص وكتب التراث والمراجع العلمية.",
    itemsFound: ["رُفُوفُ الكُتُبِ", "قِصَصٌ وَمَرَاجِعُ", "طَاوِلَاتُ المُطَالَعَةِ", "فِهْرِسُ الكُتُبِ"],
  },
  {
    id: "canteen",
    nameWithTashkeel: "المَقْصَفُ المَدْرَسِيُّ",
    namePlain: "المقصف المدرسي",
    englishMeaning: "School Canteen / Cafeteria",
    category: "facility",
    icon: "restaurant",
    description: "المكان المخصص لبيع الوجبات الصحية الخفيفة، العصائر، والماء للطلاب في وقت الفسحة.",
    itemsFound: ["شَطَائِرُ صِحِّيَّةٌ", "عَصَائِرُ طَازَجَةٌ", "طَابُورُ الطُّلَّابِ", "قَائِمَةُ الأَسْعَارِ"],
  },
  {
    id: "courtyard",
    nameWithTashkeel: "سَاحَةُ المَدْرَسَةِ",
    namePlain: "ساحة المدرسة",
    englishMeaning: "School Courtyard / Playground",
    category: "outdoor",
    icon: "sports_soccer",
    description: "الفناء الخارجي الواسع لإقامة الطابور الصباحي، التمارين الرياضية، وقضاء استراحة الفسحة.",
    itemsFound: ["سَارِيَةُ العَلَمِ", "أَشْجَارٌ مُظَلِّلَةٌ", "مَلْعَبُ الكُرَةِ", "مَقَاعِدُ الِاسْتِرَاحَةِ"],
  },
  {
    id: "admin_office",
    nameWithTashkeel: "مَكْتَبُ الإِدَارَةِ",
    namePlain: "مكتب الإدارة",
    englishMeaning: "Administration Office",
    category: "admin",
    icon: "corporate_fare",
    description: "مقر إدارة شؤون المدرسة والقيام بمهام الإشراف والمتابعة والتنسيق العام.",
    itemsFound: ["مَكْتَبُ المَدِيرِ", "سِجِلَّاتُ الحُضُورِ", "شَهَادَاتُ التَّقْدِيرِ", "هَاتِفُ الإِدَارَةِ"],
  },
  {
    id: "teachers_room",
    nameWithTashkeel: "مَكْتَبُ المُدَرِّسِينَ وَالمُدِيرَاتِ",
    namePlain: "مكتب المدرسين والمديرات",
    englishMeaning: "Staff Room / Teachers' Lounge",
    category: "admin",
    icon: "group_work",
    description: "قاعة استراحة واجتماعات هيئة التدريس وتحضير الدروس وتصحيح الواجبات.",
    itemsFound: ["مَكَاتِبُ المُعَلِّمِينَ", "كُتُبُ المَنَاهِجِ", "جَدْوَلُ الحِصَصِ", "أَوْرَاقُ العَمَلِ"],
  },
  {
    id: "lab",
    nameWithTashkeel: "المُخْتَبَرُ العِلْمِيُّ",
    namePlain: "المختبر العلمي",
    englishMeaning: "Science Laboratory",
    category: "facility",
    icon: "biotech",
    description: "معمل مجهز بالأدوات والمجاهر وأنابيب الاختبار لإجراء التجارب العلمية العملية.",
    itemsFound: ["مَجَاهِرُ ضَوْئِيَّةٌ", "أَنَابِيبُ اخْتِبَارٍ", "مُجَسَّمُ الكُرَةِ الأَرْضِيَّةِ", "مَوَادُّ التَّجَارِبِ"],
  },
  {
    id: "restrooms",
    nameWithTashkeel: "الحَمَّامَاتُ وَالمَرَافِقُ الصِّحِّيَّةُ",
    namePlain: "الحمامات والمرافق الصحية",
    englishMeaning: "Restrooms",
    category: "facility",
    icon: "wash",
    description: "المرافق الصحية النظيفة المخصصة لغسيل الأيدي والوضوء مع توفير أدوات النظافة.",
    itemsFound: ["أَحْوَاضُ الغَسِيلِ", "صَابُونُ التَّطْهِيرِ", "مَرَايَا الحَائِطِ"],
  },
  {
    id: "main_gate",
    nameWithTashkeel: "بَوَّابَةُ المَدْرَسَةِ الرَّئِيسِيَّةُ",
    namePlain: "بوابة المدرسة الرئيسية",
    englishMeaning: "Main School Gate",
    category: "outdoor",
    icon: "door_front",
    description: "المدخل الرئيسي الآمن لدخول وخروج الطلاب والحافلات المدرسية بإشراف الحارس.",
    itemsFound: ["غُرْفَةُ الحَارِسِ", "لَافِتَةُ اسْمِ المَدْرَسَةِ", "مَمَرُّ المُشَاةِ"],
  },
];

// 2. MODEL SENTENCES
export const modelSentences: ModelSentence[] = [
  {
    id: "s1",
    arabicWithTashkeel: "مَدْرَسَتِي جَمِيلَةٌ",
    arabicPlain: "مدرستي جميلة",
    englishTranslation: "My school is beautiful.",
    phonetic: "[ Madrasatī Jamīlah ]",
    type: "nominal",
    typeLabel: "جُمْلَةٌ اسْمِيَّةٌ (Nominal Sentence)",
    grammarAnalysis: [
      { part: "مَدْرَسَتِي", role: "مُبْتَدَأٌ مَرْفُوعٌ (المحور الذي نتحدث عنه)", colorClass: "text-primary font-bold" },
      { part: "جَمِيلَةٌ", role: "خَبَرٌ مَرْفُوعٌ (الجزء الذي تتم به الفائدة)", colorClass: "text-secondary font-bold" },
    ],
  },
  {
    id: "s2",
    arabicWithTashkeel: "أَنَا أُحِبُّ مَدْرَسَتِي",
    arabicPlain: "أنا أحب مدرستي",
    englishTranslation: "I love my school.",
    phonetic: "[ Anā Uḥibbu Madrasatī ]",
    type: "verbal",
    typeLabel: "جُمْلَةٌ فِعْلِيَّةٌ (Verbal Sentence)",
    grammarAnalysis: [
      { part: "أُحِبُّ", role: "فِعْلٌ مُضَارِعٌ (الحدث المقترن بزمن الحاضر)", colorClass: "text-red-600 font-bold" },
      { part: "الفَاعِلُ (أَنَا)", role: "فَاعِلٌ ضَمِيرٌ (من قام بالفعل)", colorClass: "text-purple-600 font-bold" },
      { part: "مَدْرَسَتِي", role: "مَفْعُولٌ بِهِ مَنْصُوبٌ (من وقع عليه الحب)", colorClass: "text-amber-600 font-bold" },
    ],
  },
  {
    id: "s3",
    arabicWithTashkeel: "يَعُودُ الطُّلَّابُ مِنَ المَدْرَسَةِ",
    arabicPlain: "يعود الطلاب من المدرسة",
    englishTranslation: "The students return from school.",
    phonetic: "[ Ya‘ūdu aṭ-ṭullābu mina al-madrasah ]",
    type: "verbal",
    typeLabel: "جُمْلَةٌ فِعْلِيَّةٌ سِيَاقِيَّةٌ",
    grammarAnalysis: [
      { part: "يَعُودُ", role: "فِعْلٌ مُضَارِعٌ مَرْفُوعٌ", colorClass: "text-red-600 font-bold" },
      { part: "الطُّلَّابُ", role: "فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ", colorClass: "text-purple-600 font-bold" },
      { part: "مِنَ المَدْرَسَةِ", role: "جَارٌّ وَمَجْرُورٌ (حرف جر + اسم مجرور)", colorClass: "text-blue-600 font-bold" },
    ],
  },
  {
    id: "s4",
    arabicWithTashkeel: "الطَّالِبُ يَحْتَرِمُ مُعَلِّمَهُ",
    arabicPlain: "الطالب يحترم معلمه",
    englishTranslation: "The student respects his teacher.",
    phonetic: "[ Aṭ-ṭālibu yaḥtarimu mu‘allimahu ]",
    type: "nominal",
    typeLabel: "جُمْلَةٌ اسْمِيَّةٌ خَبَرُهَا فِعْلِيٌّ",
    grammarAnalysis: [
      { part: "الطَّالِبُ", role: "مُبْتَدَأٌ مَرْفُوعٌ", colorClass: "text-primary font-bold" },
      { part: "يَحْتَرِمُ", role: "فِعْلٌ مُضَارِعٌ (الفاعل مستتر: هو)", colorClass: "text-red-600 font-bold" },
      { part: "مُعَلِّمَهُ", role: "مَفْعُولٌ بِهِ مَنْصُوبٌ", colorClass: "text-amber-600 font-bold" },
    ],
  },
  {
    id: "s5",
    arabicWithTashkeel: "نَشْتَرِي مِنَ المَقْصَفِ",
    arabicPlain: "نشتري من المقصف",
    englishTranslation: "We buy from the canteen.",
    phonetic: "[ Nashtarī mina al-maqṣaf ]",
    type: "verbal",
    typeLabel: "جُمْلَةٌ فِعْلِيَّةٌ سِيَاقِيَّةٌ",
    grammarAnalysis: [
      { part: "نَشْتَرِي", role: "فِعْلٌ مُضَارِعٌ (الفاعل مستتر تقديره: نحن)", colorClass: "text-red-600 font-bold" },
      { part: "مِنَ", role: "حَرْفُ جَرٍّ", colorClass: "text-teal-600 font-bold" },
      { part: "المَقْصَفِ", role: "اسْمٌ مَجْرُورٌ", colorClass: "text-blue-600 font-bold" },
    ],
  },
];

// 3. PARTS OF SPEECH CLASSIFICATION (أقسام الكلمة: اسم / فعل / حرف)
export const wordClassificationItems: WordClassificationItem[] = [
  // Nouns (الأسماء)
  { id: "w1", wordWithTashkeel: "مَدْرَسَتُنَا", wordPlain: "مدرستنا", type: "noun", meaning: "Our school" },
  { id: "w2", wordWithTashkeel: "المَكَاتِبُ", wordPlain: "المكاتب", type: "noun", meaning: "Desks / Offices" },
  { id: "w3", wordWithTashkeel: "طَالِبٌ", wordPlain: "طالب", type: "noun", meaning: "Student" },
  { id: "w4", wordWithTashkeel: "المُعَلِّمُ", wordPlain: "المعلم", type: "noun", meaning: "The teacher" },
  { id: "w5", wordWithTashkeel: "سَاحَةٌ", wordPlain: "ساحة", type: "noun", meaning: "Courtyard" },

  // Verbs (الأفعال)
  { id: "w6", wordWithTashkeel: "يَحْتَرِمُ", wordPlain: "يحترم", type: "verb", meaning: "Respects" },
  { id: "w7", wordWithTashkeel: "يَلْعَبُ", wordPlain: "يلعب", type: "verb", meaning: "Plays" },
  { id: "w8", wordWithTashkeel: "يَشْرَبُ", wordPlain: "يشرب", type: "verb", meaning: "Drinks" },
  { id: "w9", wordWithTashkeel: "يَعُودُ", wordPlain: "يعود", type: "verb", meaning: "Returns" },
  { id: "w10", wordWithTashkeel: "نَشْتَرِي", wordPlain: "نشتري", type: "verb", meaning: "We buy" },

  // Particles (الحروف)
  { id: "w11", wordWithTashkeel: "فِي", wordPlain: "في", type: "particle", meaning: "In" },
  { id: "w12", wordWithTashkeel: "مِنْ", wordPlain: "من", type: "particle", meaning: "From" },
  { id: "w13", wordWithTashkeel: "عَلَى", wordPlain: "على", type: "particle", meaning: "On / Upon" },
  { id: "w14", wordWithTashkeel: "إِلَى", wordPlain: "إلى", type: "particle", meaning: "To / Towards" },
  { id: "w15", wordWithTashkeel: "بِـ", wordPlain: "بـ", type: "particle", meaning: "With / In" },
];

// 7. GENDER CONVERSION TABLE (7 Professions & Roles)
export const genderProfessionPairs: GenderProfessionPair[] = [
  {
    id: "g1",
    masculineWithTashkeel: "المُدِيرُ",
    masculinePlain: "المدير",
    feminineWithTashkeel: "المُدِيرَةُ",
    femininePlain: "المديرة",
    englishTitle: "Principal / Director",
    icon: "manage_accounts",
    description: "المسؤول الأول عن قيادة المدرسة والتنسيق بين أقسامها.",
  },
  {
    id: "g2",
    masculineWithTashkeel: "المُدَرِّسُ",
    masculinePlain: "المدرس",
    feminineWithTashkeel: "المُدَرِّسَةُ",
    femininePlain: "المدرسة",
    englishTitle: "Teacher",
    icon: "school",
    description: "من يتولى الشرح والتعليم وإرشاد الطلاب في الفصل الدراسي.",
  },
  {
    id: "g3",
    masculineWithTashkeel: "الطَّالِبُ",
    masculinePlain: "الطالب",
    feminineWithTashkeel: "الطَّالِبَةُ",
    femininePlain: "الطالبة",
    englishTitle: "Student",
    icon: "person",
    description: "من يطلب العلم ويداوم بانتظام على مقاعد الدراسة.",
  },
  {
    id: "g4",
    masculineWithTashkeel: "الحَارِسُ",
    masculinePlain: "الحارس",
    feminineWithTashkeel: "الحَارِسَةُ",
    femininePlain: "الحارسة",
    englishTitle: "Guard",
    icon: "security",
    description: "المسؤول عن سلامة المدرسة وأمن البوابات وتنظيم الدخول.",
  },
  {
    id: "g5",
    masculineWithTashkeel: "أَمِينُ المَكْتَبَةِ",
    masculinePlain: "أمين المكتبة",
    feminineWithTashkeel: "أَمِينَةُ المَكْتَبَةِ",
    femininePlain: "أمينة المكتبة",
    englishTitle: "Librarian",
    icon: "auto_stories",
    description: "المشرف على إعارة وفهرسة الكتب ومساعدة القراء والباحثين.",
  },
  {
    id: "g6",
    masculineWithTashkeel: "عَامِلُ المُخْتَبَرِ",
    masculinePlain: "عامل المختبر",
    feminineWithTashkeel: "عَامِلَةُ المُخْتَبَرِ",
    femininePlain: "عاملة المختبر",
    englishTitle: "Lab Technician",
    icon: "science",
    description: "المسؤول عن نظافة وتجهيز أدوات المعمل والتجارب العلمية.",
  },
  {
    id: "g7",
    masculineWithTashkeel: "عَامِلُ المَقْصَفِ",
    masculinePlain: "عامل المقصف",
    feminineWithTashkeel: "عَامِلَةُ المَقْصَفِ",
    femininePlain: "عاملة المقصف",
    englishTitle: "Canteen Worker",
    icon: "storefront",
    description: "من يُعد الوجبات الخفيفة والعصائر ويبيعها للطلاب بنظافة وبشاشة.",
  },
];

// 8. CLASSROOM SPATIAL PREPOSITIONS (ظروف المكان والاتجاهات)
export const spatialDirectionSentences: SpatialDirectionSentence[] = [
  {
    id: "sp1",
    arabicWithTashkeel: "الطُّلَّابُ أَمَامَ المُدَرِّسِ.",
    arabicPlain: "الطلاب أمام المدرس.",
    preposition: "أَمَامَ",
    prepositionMeaning: "In front of",
    englishTranslation: "The students are in front of the teacher.",
    subject: "الطلاب",
    referencePoint: "المدرس",
    icon: "arrow_upward",
  },
  {
    id: "sp2",
    arabicWithTashkeel: "السَّبُّورَةُ خَلْفَ المُدَرِّسِ.",
    arabicPlain: "السبورة خلف المدرس.",
    preposition: "خَلْفَ",
    prepositionMeaning: "Behind",
    englishTranslation: "The board is behind the teacher.",
    subject: "السبورة",
    referencePoint: "المدرس",
    icon: "arrow_downward",
  },
  {
    id: "sp3",
    arabicWithTashkeel: "المِرْوَحَةُ فَوْقَ الطُّلَّابِ.",
    arabicPlain: "المروحة فوق الطلاب.",
    preposition: "فَوْقَ",
    prepositionMeaning: "Above / Over",
    englishTranslation: "The ceiling fan is above the students.",
    subject: "المروحة",
    referencePoint: "الطلاب",
    icon: "north",
  },
  {
    id: "sp4",
    arabicWithTashkeel: "الكَرَاسِي تَحْتَ الطُّلَّابِ.",
    arabicPlain: "الكراسي تحت الطلاب.",
    preposition: "تَحْتَ",
    prepositionMeaning: "Under / Beneath",
    englishTranslation: "The chairs are under the students.",
    subject: "الكراسي",
    referencePoint: "الطلاب",
    icon: "south",
  },
  {
    id: "sp5",
    arabicWithTashkeel: "الطُّلَّابُ يَمِينَ المُدَرِّسِ.",
    arabicPlain: "الطلاب يمين المدرس.",
    preposition: "يَمِينَ",
    prepositionMeaning: "To the right of",
    englishTranslation: "The boy students are to the teacher's right.",
    subject: "الطلاب الذكور",
    referencePoint: "المدرس",
    icon: "east",
  },
  {
    id: "sp6",
    arabicWithTashkeel: "الطَّالِبَاتُ يَسَارَ المُدَرِّسِ.",
    arabicPlain: "الطالبات يسار المدرس.",
    preposition: "يَسَارَ",
    prepositionMeaning: "To the left of",
    englishTranslation: "The girl students are to the teacher's left.",
    subject: "الطالبات الإناث",
    referencePoint: "المدرس",
    icon: "west",
  },
];

// 9. RELATIVE PERSPECTIVE CHALLENGES (الاتجاه النسبي حسب المنظور)
export const perspectiveQuestions: PerspectiveQuestion[] = [
  {
    id: "pq1",
    item: "السَّبُّورَةُ",
    questionText: "أين تقع السبورة (بالنسبة للمدرس) الذي يقف مواجهاً للصف؟",
    perspectiveTarget: "بالنسبة للمدرس",
    correctAnswer: "خَلْفَ المُدَرِّسِ",
    options: ["أَمَامَ المُدَرِّسِ", "خَلْفَ المُدَرِّسِ", "تَحْتَ المُدَرِّسِ", "يَمِينَ المُدَرِّسِ"],
    explanation: "المدرس يقف وظهره إلى السبورة مواجهاً الطلاب، لذلك تقع السبورة «خَلْفَهُ».",
  },
  {
    id: "pq2",
    item: "السَّبُّورَةُ",
    questionText: "أين تقع السبورة (بالنسبة للطلاب) الجالسين في مقاعدهم؟",
    perspectiveTarget: "بالنسبة للطلاب",
    correctAnswer: "أَمَامَ الطُّلَّابِ",
    options: ["خَلْفَ الطُّلَّابِ", "أَمَامَ الطُّلَّابِ", "تَحْتَ الطُّلَّابِ", "يَسَارَ الطُّلَّابِ"],
    explanation: "الطلاب ينظرون مباشرة إلى واجهة الفصل، فالسبورة تكون في مجال نظرهم «أَمَامَهُمْ».",
  },
  {
    id: "pq3",
    item: "مَكْتَبُ المُعَلِّمِ وَالمِنَصَّةُ",
    questionText: "أين يقع مكتب المعلم (بالنسبة للطلاب)؟",
    perspectiveTarget: "بالنسبة للطلاب",
    correctAnswer: "أَمَامَ الطُّلَّابِ",
    options: ["خَلْفَ الطُّلَّابِ", "فَوْقَ الطُّلَّابِ", "أَمَامَ الطُّلَّابِ", "يَمِينَ الطُّلَّابِ"],
    explanation: "مكتب المعلم يتصدر مقدمة الفصل بين السبورة ومقاعد الطلاب، فهو «أَمَامَ» الطلاب.",
  },
  {
    id: "pq4",
    item: "الطَّالِبَاتُ",
    questionText: "أين تجلس الطالبات (بالنسبة للمدرس) وهو يواجه الصف؟",
    perspectiveTarget: "بالنسبة للمدرس",
    correctAnswer: "يَسَارَ المُدَرِّسِ",
    options: ["يَمِينَ المُدَرِّسِ", "يَسَارَ المُدَرِّسِ", "خَلْفَ المُدَرِّسِ", "فَوْقَ المُدَرِّسِ"],
    explanation: "بحسب الرسم التخطيطي لتوزيع الفصل، صف الطالبات يقع على جهة «يَسَار» المدرس.",
  },
  {
    id: "pq5",
    item: "المِرْوَحَةُ",
    questionText: "أين تقع المروحة المثبتة في السقف (بالنسبة للطلاب)؟",
    perspectiveTarget: "بالنسبة للطلاب",
    correctAnswer: "فَوْقَ الطُّلَّابِ",
    options: ["تَحْتَ الطُّلَّابِ", "فَوْقَ الطُّلَّابِ", "خَلْفَ الطُّلَّابِ", "يَسَارَ الطُّلَّابِ"],
    explanation: "المروحة مثبتة في سقف الحجرة الدراسية، لذا موقعها «فَوْقَ» رؤوس الطلاب.",
  },
];
