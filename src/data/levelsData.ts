export interface StageLessonItem {
  id: string;
  operationNumber?: number;
  titleArabic: string;
  titleEnglish: string;
  href: string;
  icon: string;
  completed: boolean;
  xpReward: number;
  description?: string;
}

export type LessonItem = StageLessonItem;

export interface StageItem {
  id: string;
  stageNumber: number;
  numberLabel: string; // "المرحلة الأولى", "المرحلة الثانية", etc.
  titleArabic: string;
  titleEnglish: string;
  description: string;
  status: "active" | "completed" | "upcoming" | "locked";
  badgeText?: string;
  progressPercent: number;
  totalLessons: number;
  completedLessons: number;
  lessons: StageLessonItem[];
}

export type UnitItem = StageItem;

export interface LevelItem {
  id: string;
  number: number;
  titleArabic: string;
  titleEnglish: string;
  code: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeIcon: string;
  accentClass: string;
  badgeBg: string;
  badgeTextColor: string;
  progressPercent: number;
  xpRequired: number;
  xpEarned: number;
  totalLessons: number;
  completedLessons: number;
  status: "active" | "unlocked" | "locked";
  lockReason?: string;
  stages: StageItem[];
  units: StageItem[]; // Alias for backward compatibility
  previewCompetencies: string[];
  sampleVocab?: { word: string; meaning: string }[];
}

const level1Stages: StageItem[] = [
  {
    id: "stage-1-1",
    stageNumber: 1,
    numberLabel: "المرحلة الأولى",
    titleArabic: "أسرتي وبيتي",
    titleEnglish: "My Family & Home",
    description: "الركيزة الأساسية لتعلم أسماء الأقارب، التذكير والتأنيث، وسلم القواعد والتحيات عبر ٥ عمليات تفاعلية متكاملة.",
    status: "completed",
    badgeText: "المرحلة الأولى • مكتملة بنجاح ✓",
    progressPercent: 100,
    completedLessons: 5,
    totalLessons: 5,
    lessons: [
      {
        id: "l1",
        operationNumber: 1,
        titleArabic: "المفردات المصورة",
        titleEnglish: "Illustrated Vocabulary",
        description: "الكلمات الجوهرية مع التشكيل والصوت والنطق الدقيق",
        href: "/vocabulary",
        icon: "menu_book",
        completed: true,
        xpReward: 100,
      },
      {
        id: "l2",
        operationNumber: 2,
        titleArabic: "أفراد الأسرة والإشارة",
        titleEnglish: "Family & Demonstratives",
        description: "شجرة العائلة والمقارنة بين هذا وهذه",
        href: "/family-and-gender",
        icon: "group",
        completed: true,
        xpReward: 120,
      },
      {
        id: "l3",
        operationNumber: 3,
        titleArabic: "سلم القواعد: النحو",
        titleEnglish: "Grammar Ladder",
        description: "التدرج البصري: المفرد، المثنى (ـان)، والجمع بنوعيه",
        href: "/grammar-ladder",
        icon: "stairs",
        completed: true,
        xpReward: 110,
      },
      {
        id: "l4",
        operationNumber: 4,
        titleArabic: "المحادثة اليومية",
        titleEnglish: "Daily Dialogue",
        description: "إلقاء ورد تحية الإسلام والسؤال عن الحال بالفصحى",
        href: "/daily-dialogue",
        icon: "forum",
        completed: true,
        xpReward: 90,
      },
      {
        id: "l5",
        operationNumber: 5,
        titleArabic: "التمارين التفاعلية الشاملة",
        titleEnglish: "Interactive Practice",
        description: "تحديات التوصيل والتدريب الصوتي وتثبيت المرحلة",
        href: "/interactive-practice",
        icon: "sports_esports",
        completed: true,
        xpReward: 150,
      },
    ],
  },
  {
    id: "stage-1-2",
    stageNumber: 2,
    numberLabel: "المرحلة الثانية",
    titleArabic: "مدرستي وفصلي: البيئة المدرسية",
    titleEnglish: "My School & Classroom",
    description: "المرحلة الثانية في المستوى الأول: المشهد البصري للمدرسة، الجمل الاسمية والفعلية، أقسام الكلمة، مرافق المدرسة، التذكير والتأنيث، وظروف المكان والمنظور النسبي.",
    status: "active",
    badgeText: "المرحلة النشطة الحالية في المستوى الأول",
    progressPercent: 40,
    completedLessons: 4,
    totalLessons: 9,
    lessons: [
      {
        id: "s2-op1",
        operationNumber: 1,
        titleArabic: "المشهد البصري ومبنى المدرسة",
        titleEnglish: "Campus & School Visual Scene",
        description: "رسم تخطيطي تفاعلي يجسد مبنى المدرسة وفناءها وممراتها",
        href: "/stage-2#campus",
        icon: "domain",
        completed: true,
        xpReward: 90,
      },
      {
        id: "s2-op2",
        operationNumber: 2,
        titleArabic: "الجمل الأساسية والنصوص النموذجية",
        titleEnglish: "Model Sentences: My School",
        description: "مدرستي جميلة، أنا أحب مدرستي، والنماذج السياقية",
        href: "/stage-2#sentences",
        icon: "article",
        completed: true,
        xpReward: 100,
      },
      {
        id: "s2-op3",
        operationNumber: 3,
        titleArabic: "التدريب التصنيفي: أقسام الكلمة",
        titleEnglish: "Parts of Speech Classification",
        description: "تصنيف المفردات إلى اسم وفعل وحرف تفاعلياً",
        href: "/stage-2#word-types",
        icon: "category",
        completed: true,
        xpReward: 110,
      },
      {
        id: "s2-op4",
        operationNumber: 4,
        titleArabic: "الحصيلة اللغوية ومرافق المدرسة",
        titleEnglish: "School Facilities & Vocabulary",
        description: "المرافق العشرة: الفصول، المقصف، المكتبة، المختبر، وغيرها",
        href: "/stage-2#facilities",
        icon: "apartment",
        completed: true,
        xpReward: 120,
      },
      {
        id: "s2-op5",
        operationNumber: 5,
        titleArabic: "تدريب الاستيعاب والتذكر",
        titleEnglish: "Comprehension & Memory Practice",
        description: "اكتب ماذا يوجد في الفصل والمقصف والإدارة والساحة",
        href: "/stage-2#facility-quiz",
        icon: "quiz",
        completed: false,
        xpReward: 130,
      },
      {
        id: "s2-op6",
        operationNumber: 6,
        titleArabic: "البنية النحوية والتركيبية",
        titleEnglish: "Grammar & Sentence Structures",
        description: "الجملة الاسمية (مبتدأ + خبر) والجملة الفعلية (فعل + فاعل + مفعول)",
        href: "/stage-2#grammar-structure",
        icon: "schema",
        completed: false,
        xpReward: 120,
      },
      {
        id: "s2-op7",
        operationNumber: 7,
        titleArabic: "المطابقة بين التذكير والتأنيث",
        titleEnglish: "Gender Transformation & Rules",
        description: "جدول تحويل وظائف المدرسة وقواعد المذكر والمؤنث",
        href: "/stage-2#gender-professions",
        icon: "switch_account",
        completed: false,
        xpReward: 110,
      },
      {
        id: "s2-op8",
        operationNumber: 8,
        titleArabic: "الفصل الدراسي وظروف المكان",
        titleEnglish: "Classroom Layout & Spatial Prepositions",
        description: "تطبيق ظروف المكان: أمام، خلف، فوق، تحت، يمين، يسار",
        href: "/stage-2#spatial-classroom",
        icon: "explore",
        completed: false,
        xpReward: 120,
      },
      {
        id: "s2-op9",
        operationNumber: 9,
        titleArabic: "تدريب نسبي على الاتجاهات المكانية",
        titleEnglish: "Relative Perspective Spatial Quiz",
        description: "تعيين الموقع بدقة حسب وجهة النظر (الطلاب مقابل المدرس)",
        href: "/stage-2#perspective-test",
        icon: "compare_arrows",
        completed: false,
        xpReward: 150,
      },
    ],
  },
  {
    id: "stage-1-3",
    stageNumber: 3,
    numberLabel: "المرحلة الثالثة",
    titleArabic: "الأوقات والأنشطة والروتين اليومي",
    titleEnglish: "Daily Routines & Activities",
    description: "المرحلة الثالثة في المستوى الأول للتعبير عن الأنشطة اليومية والتفاعل مع المحيط والمهام المعتادة.",
    status: "upcoming",
    badgeText: "المرحلة التالية في المستوى الأول",
    progressPercent: 0,
    completedLessons: 0,
    totalLessons: 4,
    lessons: [],
  },
];

const level2Stages: StageItem[] = [
  {
    id: "stage-2-1",
    stageNumber: 1,
    numberLabel: "المرحلة الأولى",
    titleArabic: "المجتمع والحي السكني",
    titleEnglish: "Neighborhood & Community",
    description: "مفردات الجيران، الحديقة العامة، المحال التجارية، والأنشطة الاجتماعية.",
    status: "active",
    badgeText: "متاحة لاحقاً",
    progressPercent: 0,
    completedLessons: 0,
    totalLessons: 4,
    lessons: [],
  },
];

const level3Stages: StageItem[] = [
  {
    id: "stage-3-1",
    stageNumber: 1,
    numberLabel: "المرحلة الأولى",
    titleArabic: "في السوق والمطعم",
    titleEnglish: "At the Market & Restaurant",
    description: "كيف تطلب الطعام وتشتري الخضار وتتحدث عن الأسعار بالفصحى.",
    status: "locked",
    badgeText: "مغلقة",
    progressPercent: 0,
    completedLessons: 0,
    totalLessons: 4,
    lessons: [],
  },
  {
    id: "stage-3-2",
    stageNumber: 2,
    numberLabel: "المرحلة الثانية",
    titleArabic: "الاتجاهات والمواصلات",
    titleEnglish: "Directions & Travel",
    description: "وصف الطرق، محطة الحافلات، المطار، والاتجاهات الأصلية.",
    status: "locked",
    badgeText: "مغلقة",
    progressPercent: 0,
    completedLessons: 0,
    totalLessons: 4,
    lessons: [],
  },
];

const level4Stages: StageItem[] = [
  {
    id: "stage-4-1",
    stageNumber: 1,
    numberLabel: "المرحلة الأولى",
    titleArabic: "نوادر العرب وحِكَمهم",
    titleEnglish: "Tales & Proverbs",
    description: "قراءة قصص ذكاء وفطنة وفهم الأمثال الشعبية الشهيرة.",
    status: "locked",
    badgeText: "مغلقة",
    progressPercent: 0,
    completedLessons: 0,
    totalLessons: 5,
    lessons: [],
  },
  {
    id: "stage-4-2",
    stageNumber: 2,
    numberLabel: "المرحلة الثانية",
    titleArabic: "البلاغة والخطابة",
    titleEnglish: "Rhetoric & Public Speaking",
    description: "فنون الإلقاء والتأثير البياني واستخدام التشبيهات البليغة.",
    status: "locked",
    badgeText: "مغلقة",
    progressPercent: 0,
    completedLessons: 0,
    totalLessons: 5,
    lessons: [],
  },
];

export const curriculumLevels: LevelItem[] = [
  {
    id: "level-1",
    number: 1,
    titleArabic: "المستوى الأول: الانطلاق والأساسيات",
    titleEnglish: "Level 1: Foundations & Basics",
    code: "A1 • مبتدئ",
    subtitle: "يتكون من عدة مراحل متدرجة؛ المرحلة الحالية: أسرتي وبيتي",
    description:
      "اللبنة الأولى في رحلة الفصاحة: يتكون هذا المستوى من عدة مراحل متتابعة؛ المرحلة الأولى تركز على الأسرة، المفردات، الإشارة، سلم القواعد والمحادثة، وتليها المرحلة الثانية في البيئة المدرسية.",
    badge: "وسام إتقان المرحلة الأولى",
    badgeIcon: "military_tech",
    accentClass: "from-primary to-primary-container",
    badgeBg: "bg-primary-fixed text-on-primary-fixed",
    badgeTextColor: "text-primary",
    progressPercent: 80,
    xpRequired: 0,
    xpEarned: 450,
    totalLessons: 5,
    completedLessons: 4,
    status: "active",
    stages: level1Stages,
    units: level1Stages,
    previewCompetencies: [
      "التعريف بالنفس وبأفراد الأسرة بالفصحى",
      "التمييز التلقائي بين هذا وهذه",
      "صياغة المثنى بإضافة (ـان) والجمع بنوعيه",
      "إلقاء ورد تحية الإسلام كاملة بنطق سليم",
    ],
    sampleVocab: [
      { word: "أُسْرَةٌ", meaning: "Family" },
      { word: "بَيْتٌ", meaning: "House" },
      { word: "أَبٌ / أُمٌّ", meaning: "Father / Mother" },
      { word: "ابْنٌ / ابْنَةٌ", meaning: "Son / Daughter" },
    ],
  },
  {
    id: "level-2",
    number: 2,
    titleArabic: "المستوى الثاني: المجتمع والحياة اليومية",
    titleEnglish: "Level 2: Community & Daily Life",
    code: "A2 • أساسي",
    subtitle: "المرحلة المتقدمة بعد استكمال كافة مراحل المستوى الأول",
    description:
      "التوسع في التعبير عن الحياة الاجتماعية والبيئة العامة والمواقف الحياتية المتنوعة بعد إنهاء مراحل المستوى الأول.",
    badge: "وسام نجم المجتمع",
    badgeIcon: "school",
    accentClass: "from-secondary to-secondary-container",
    badgeBg: "bg-secondary-fixed text-on-secondary-fixed",
    badgeTextColor: "text-secondary",
    progressPercent: 0,
    xpRequired: 600,
    xpEarned: 0,
    totalLessons: 4,
    completedLessons: 0,
    status: "locked",
    lockReason: "يتطلب إتمام كافة مراحل المستوى الأول والحصول على ٦٠٠ XP",
    stages: level2Stages,
    units: level2Stages,
    previewCompetencies: [
      "التفاعل الفصيح في الأماكن واللقاءات العامة",
      "وصف الأحداث المترابطة والروتين اليومي",
      "إدارة حوارات الشراء والطلب بطلاقة",
    ],
    sampleVocab: [
      { word: "حَيٌّ", meaning: "Neighborhood" },
      { word: "حَدِيقَةٌ", meaning: "Garden" },
      { word: "جَارٌ", meaning: "Neighbor" },
      { word: "مَسْجِدٌ", meaning: "Mosque" },
    ],
  },
  {
    id: "level-3",
    number: 3,
    titleArabic: "المستوى الثالث: في المدينة والمواصلات",
    titleEnglish: "Level 3: City, Market & Transport",
    code: "B1 • متوسط",
    subtitle: "السوق والتسوق، وسائل النقل، والسؤال عن الاتجاهات",
    description:
      "اكتساب مفردات الأماكن العامة، الاتجاهات الجغرافية، الأعداد والأسعار، والمحادثات الواقعية في المتاجر ومحطات القطار.",
    badge: "وسام الرحالة الفصيح",
    badgeIcon: "explore",
    accentClass: "from-tertiary to-tertiary-container",
    badgeBg: "bg-tertiary-fixed text-on-tertiary-fixed",
    badgeTextColor: "text-tertiary",
    progressPercent: 0,
    xpRequired: 1200,
    xpEarned: 0,
    totalLessons: 8,
    completedLessons: 0,
    status: "locked",
    lockReason: "يتطلب الوصول إلى ١٢٠٠ XP وإتمام المستوى الثاني",
    stages: level3Stages,
    units: level3Stages,
    previewCompetencies: [
      "إجراء مفاوضات شراء وطلب وجبات في مطعم فصيح",
      "وصف الطرق الدقيقة وتحديد الاتجاهات الأربعة",
      "استخدام الأعداد الترتيبية والعملات بطلاقة",
      "قراءة لوحات الإرشاد واللافتات في الأماكن العامة",
    ],
    sampleVocab: [
      { word: "سُوقٌ", meaning: "Market" },
      { word: "قِطَارٌ", meaning: "Train" },
      { word: "مَطَارٌ", meaning: "Airport" },
      { word: "شَارِعٌ", meaning: "Street" },
      { word: "مَطْعَمٌ", meaning: "Restaurant" },
    ],
  },
  {
    id: "level-4",
    number: 4,
    titleArabic: "المستوى الرابع: الفصاحة والبيان الأدبي",
    titleEnglish: "Level 4: Eloquence & Literature",
    code: "B2 • متقدم",
    subtitle: "الحكايات التراثية، جماليات التشبيه، وفنون الخطابة",
    description:
      "الغوص في روائع النثر والشعر العربي، فهم الأمثال والحِكَم السائرة، والقدرة على إلقاء خطبة أو سرد قصة بأسلوب أدبي رفيع.",
    badge: "وسام فارس الفصاحة",
    badgeIcon: "workspace_premium",
    accentClass: "from-amber-600 to-amber-800",
    badgeBg: "bg-secondary-fixed-dim text-on-secondary-fixed",
    badgeTextColor: "text-secondary",
    progressPercent: 0,
    xpRequired: 2500,
    xpEarned: 0,
    totalLessons: 10,
    completedLessons: 0,
    status: "locked",
    lockReason: "يتطلب الوصول إلى ٢٥٠٠ XP وإتمام المستوى الثالث",
    stages: level4Stages,
    units: level4Stages,
    previewCompetencies: [
      "تذوق المعاني البلاغية والتشبيهات في الشعر والنثر",
      "سرد حكاية تراثية كاملة بالفصحى الفائقة مع التعبير الصوتي",
      "الإعراب المتقدم للجمل المركبة والمشتقات",
      "كتابة مقال وصفي بأسلوب ناصع وفصيح",
    ],
    sampleVocab: [
      { word: "بَلَاغَةٌ", meaning: "Rhetoric" },
      { word: "حِكْمَةٌ", meaning: "Wisdom" },
      { word: "قَصِيدَةٌ", meaning: "Poem" },
      { word: "خَطَابَةٌ", meaning: "Oratory" },
      { word: "نَادِرَةٌ", meaning: "Anecdote" },
    ],
  },
];
