export interface LessonItem {
  id: string;
  titleArabic: string;
  titleEnglish: string;
  href: string;
  icon: string;
  completed: boolean;
  xpReward: number;
}

export interface UnitItem {
  id: string;
  numberLabel: string;
  titleArabic: string;
  titleEnglish: string;
  description: string;
  lessons: LessonItem[];
}

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
  units: UnitItem[];
  previewCompetencies: string[];
  sampleVocab?: { word: string; meaning: string }[];
}

export const curriculumLevels: LevelItem[] = [
  {
    id: "level-1",
    number: 1,
    titleArabic: "المستوى الأول: الانطلاق والأساسيات",
    titleEnglish: "Level 1: Foundations & Basics",
    code: "A1 • مبتدئ",
    subtitle: "أسرتي وبيتي، المفردات اليومية، والتراكيب الأولى",
    description:
      "تعلّم المفردات الجوهرية للأسرة والبيت، أسماء الإشارة للمذكر والمؤنث، التدرج الإعرابي للمثنى والجمع، وإتقان التحية في حوارات فصيحة.",
    badge: "وسام خبير الأسرة",
    badgeIcon: "military_tech",
    accentClass: "from-primary to-primary-container",
    badgeBg: "bg-primary-fixed text-on-primary-fixed",
    badgeTextColor: "text-primary",
    progressPercent: 75,
    xpRequired: 0,
    xpEarned: 450,
    totalLessons: 5,
    completedLessons: 4,
    status: "active",
    units: [
      {
        id: "unit-1-1",
        numberLabel: "الوحدة الأولى",
        titleArabic: "أسرتي والبيت",
        titleEnglish: "My Family & Home",
        description: "الركيزة الأساسية لتعلم أسماء الأقارب، التذكير والتأنيث، والتحيات العربية الفصيحة.",
        lessons: [
          {
            id: "l1",
            titleArabic: "المفردات المصورة",
            titleEnglish: "Illustrated Vocabulary",
            href: "/",
            icon: "menu_book",
            completed: true,
            xpReward: 100,
          },
          {
            id: "l2",
            titleArabic: "أفراد الأسرة والإشارة",
            titleEnglish: "Family & Demonstratives",
            href: "/family-and-gender",
            icon: "group",
            completed: true,
            xpReward: 120,
          },
          {
            id: "l3",
            titleArabic: "سلم القواعد: النحو",
            titleEnglish: "Grammar Ladder",
            href: "/grammar-ladder",
            icon: "stairs",
            completed: true,
            xpReward: 110,
          },
          {
            id: "l4",
            titleArabic: "المحادثة اليومية",
            titleEnglish: "Daily Dialogue",
            href: "/daily-dialogue",
            icon: "forum",
            completed: true,
            xpReward: 90,
          },
          {
            id: "l5",
            titleArabic: "التمارين التفاعلية الشاملة",
            titleEnglish: "Interactive Practice",
            href: "/interactive-practice",
            icon: "sports_esports",
            completed: false,
            xpReward: 150,
          },
        ],
      },
    ],
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
    titleArabic: "المستوى الثاني: المدرسة والحياة اليومية",
    titleEnglish: "Level 2: School & Daily Life",
    code: "A2 • أساسي",
    subtitle: "في الصف والفناء، أوقات اليوم، والأدوات المدرسية",
    description:
      "التوسع في التعبير عن الأدوات المدرسية، جدول الحصص، التعبير عن الوقت والساعة، صياغة الأسئلة بأدوات الاستفهام (هل، أين، متى، ماذا).",
    badge: "وسام نجم المدرسة",
    badgeIcon: "school",
    accentClass: "from-secondary to-secondary-container",
    badgeBg: "bg-secondary-fixed text-on-secondary-fixed",
    badgeTextColor: "text-secondary",
    progressPercent: 20,
    xpRequired: 400,
    xpEarned: 80,
    totalLessons: 6,
    completedLessons: 1,
    status: "unlocked",
    units: [
      {
        id: "unit-2-1",
        numberLabel: "الوحدة الأولى",
        titleArabic: "في الفصل والمدرسة",
        titleEnglish: "In the Classroom",
        description: "مفردات الأدوات المدرسية وأفعال الدراسة وحوارات الطلاب مع المعلم.",
        lessons: [
          {
            id: "l2-1",
            titleArabic: "أدواتي المدرسية",
            titleEnglish: "School Supplies",
            href: "/#level-2-supplies",
            icon: "backpack",
            completed: true,
            xpReward: 100,
          },
          {
            id: "l2-2",
            titleArabic: "الساعة والأوقات",
            titleEnglish: "Time & Schedule",
            href: "/#level-2-time",
            icon: "schedule",
            completed: false,
            xpReward: 120,
          },
          {
            id: "l2-3",
            titleArabic: "أدوات الاستفهام",
            titleEnglish: "Interrogative Particles",
            href: "/#level-2-questions",
            icon: "help_center",
            completed: false,
            xpReward: 130,
          },
        ],
      },
    ],
    previewCompetencies: [
      "تسمية أكثر من ٢٠ غرضاً مدرسياً وصفيّاً",
      "قراءة الساعة والتعبير عن أوقات الحصص واليوم",
      "استخدام أدوات الاستفهام: مَن، أين، متى، كم، لماذا",
      "إجراء حوار طلب إذن ومساعدة في البيئة المدرسية",
    ],
    sampleVocab: [
      { word: "قَلَمٌ", meaning: "Pen" },
      { word: "كِتَابٌ", meaning: "Book" },
      { word: "سَبُّورَةٌ", meaning: "Whiteboard" },
      { word: "مَدْرَسَةٌ", meaning: "School" },
      { word: "حَقِيبَةٌ", meaning: "Backpack" },
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
    xpRequired: 1000,
    xpEarned: 0,
    totalLessons: 8,
    completedLessons: 0,
    status: "locked",
    lockReason: "يتطلب الوصول إلى ١٠٠٠ XP وإتمام المستوى الثاني",
    units: [
      {
        id: "unit-3-1",
        numberLabel: "الوحدة الأولى",
        titleArabic: "في السوق والمطعم",
        titleEnglish: "At the Market & Restaurant",
        description: "كيف تطلب الطعام وتشتري الخضار وتتحدث عن الأسعار بالفصحى.",
        lessons: [],
      },
      {
        id: "unit-3-2",
        numberLabel: "الوحدة الثانية",
        titleArabic: "الاتجاهات والمواصلات",
        titleEnglish: "Directions & Travel",
        description: "وصف الطرق، محطة الحافلات، المطار، والاتجاهات الأصلية.",
        lessons: [],
      },
    ],
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
    units: [
      {
        id: "unit-4-1",
        numberLabel: "الوحدة الأولى",
        titleArabic: "نوادر العرب وحِكَمهم",
        titleEnglish: "Tales & Proverbs",
        description: "قراءة قصص ذكاء وفطنة وفهم الأمثال الشعبية الشهيرة.",
        lessons: [],
      },
      {
        id: "unit-4-2",
        numberLabel: "الوحدة الثانية",
        titleArabic: "البلاغة والخطابة",
        titleEnglish: "Rhetoric & Public Speaking",
        description: "فنون الإلقاء والتأثير البياني واستخدام التشبيهات البليغة.",
        lessons: [],
      },
    ],
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
