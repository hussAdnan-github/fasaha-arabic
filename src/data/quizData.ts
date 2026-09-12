export interface MatchPerson {
  id: string;
  namePlain: string;
  nameWithTashkeel: string;
  roleHint: string;
  imageUrl: string;
  matchedTargetId: string;
}

export interface MatchTarget {
  id: string;
  titlePlain: string;
  titleWithTashkeel: string;
  englishLabel: string;
  icon: string;
  badgeBg: string;
  badgeTextColor: string;
}

export interface AudioChoice {
  id: string;
  nameArabic: string;
  nameArabicWithTashkeel: string;
  englishRole: string;
  imageUrl: string;
  isCorrect: boolean;
}

export interface FillQuestion {
  id: string;
  sentenceBefore: string;
  blankWord: string;
  sentenceAfter: string;
  phonetic: string;
  options: {
    id: string;
    text: string;
    label: string;
    isCorrect: boolean;
  }[];
}

export const matchPersons: MatchPerson[] = [
  {
    id: "p_salim",
    namePlain: "سالم",
    nameWithTashkeel: "سَالِمٌ",
    roleHint: "Salim (Grandfather)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJtU3-SHYMVu1CgY-UdYuk7knGBteVi1u2lyxrbqUAcFF1HumJ8NAr2sZNfLX5lF_SNKBepJjXHVQIlgwARHt1cjhRkLB79bxvlXy2zIlWlwT6kYM38_uLMYQGO9V2Dph4v8H5eFy133TJ7OPYXzpnKuEUb1Tuyt8Gywnw3iKt1g_njo9dod3S9vA6R0BcLgjt2PG-eJNsL2FyVHnPDSMjM9D5qYGfCWXn5Rg5pryxh7v3cuqpM1M-5Q",
    matchedTargetId: "t_jadd",
  },
  {
    id: "p_salma",
    namePlain: "سلمى",
    nameWithTashkeel: "سَلْمَى",
    roleHint: "Salma (Mother)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsWumK_qfvFA3wW9wmv_K-YBclvshnl40etsxLaK4W9O-0XVoRG0J614mBNDRWvDm25FX56CRgE7cJnn4SC7pbqT6rG3YBi3Bx7wEBC_Q1dN4ml2M07-Spoi3H63rSlvmr11SD1FEcOohKy0vkcmarAAetoTMTFmgYnm2mSgwqK_vdS2zy5iHA0QYhgd4T8OtqGKw2ovWuQG6Mek00OojIV1f-HT5PsfwfKi5uaSNtLIXVjxlceO9FFQ",
    matchedTargetId: "t_umm",
  },
  {
    id: "p_omar",
    namePlain: "عمر",
    nameWithTashkeel: "عُمَرُ",
    roleHint: "‘Umar (Father)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD07Ra7dZPnrMKQUkmV1D2mjD9XqctafGEASXeu-uTEpBoKfJQ5zfmtOPsBkYPUI8dRPecFjD04tAAuo_y2N1QTf7I4KDvXraxIdYlM5awjUMjQ8fyyPZlcntTXjy_3UgTJzjIQQkVnkh7bpU-reSMahjADsKbdhygqAaZGcwcKSNn37NZAS0OIGpw_b2sM4RgpLibyrq1-aBVVh0ce-LBth5R2r5_hWeHnQi3A37_tdUfnTnYQ5aB4aQ",
    matchedTargetId: "t_ab",
  },
  {
    id: "p_zaynab",
    namePlain: "زينب",
    nameWithTashkeel: "زَيْنَبُ",
    roleHint: "Zaynab (Daughter)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjXVzaDbrUnUolDFaVfooShv0_nMZXGBsC8lt0zNBZeowD7d_v4j_hwSBBCBxgyVBWdcrV15yHySLct4HBQRTWtvNS9YsGWkgbinKSuSoskyLLj1jDk5tcDllnnvzi-bsMlpSaAKFihh3lmpCVcduVnl7Tu-n2sra8wezI-_B0ccrxH8sOKgkRU5FfRKgvfrfPt3MWiGLTvTy0PFiOVnOOzxyC4-9hOc5k-DrDZiJW9lDVhxWEhA67Aw",
    matchedTargetId: "t_ibnah",
  },
  {
    id: "p_ali",
    namePlain: "علي",
    nameWithTashkeel: "عَلِيٌّ",
    roleHint: "‘Ali (Son)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZjsEG_ewnj1_JtYo5JN03Hw57Zc3b4y4piAWy2TzHW8qMJU6WyFXHpH_UuUWHvIjaqFJvJV8U8AC3IyD4sG9YVhMZFnD7lEsQQtwznyY5VVkAAtQb7vNXWe5DU2iNmA7so9i4qV4eNaXH1smAA_b7UOaORylDUKZjF0DbPlzrezqO9Waj7RiDNy5wrX737IQLruMnXbIdADdIpsrSrFgqf9qtc5UuBh2_7knkvWOaOH6qZH5lHBRJw",
    matchedTargetId: "t_ibn",
  },
];

export const matchTargets: MatchTarget[] = [
  {
    id: "t_umm",
    titlePlain: "أم",
    titleWithTashkeel: "أُمٌّ",
    englishLabel: "Mother",
    icon: "woman",
    badgeBg: "bg-secondary-fixed/50",
    badgeTextColor: "text-secondary-container",
  },
  {
    id: "t_jadd",
    titlePlain: "جد",
    titleWithTashkeel: "جَدٌّ",
    englishLabel: "Grandfather",
    icon: "elderly",
    badgeBg: "bg-tertiary-fixed/50",
    badgeTextColor: "text-tertiary",
  },
  {
    id: "t_ab",
    titlePlain: "أب",
    titleWithTashkeel: "أَبٌ",
    englishLabel: "Father",
    icon: "man",
    badgeBg: "bg-secondary-fixed/50",
    badgeTextColor: "text-secondary-container",
  },
  {
    id: "t_ibnah",
    titlePlain: "ابنة / أخت",
    titleWithTashkeel: "ابْنَةٌ / أُخْتٌ",
    englishLabel: "Daughter / Sister",
    icon: "girl",
    badgeBg: "bg-primary-fixed/50",
    badgeTextColor: "text-primary",
  },
  {
    id: "t_ibn",
    titlePlain: "ابن / أخ",
    titleWithTashkeel: "ابْنٌ / أَخٌ",
    englishLabel: "Son / Brother",
    icon: "boy",
    badgeBg: "bg-tertiary-fixed/50",
    badgeTextColor: "text-tertiary",
  },
];

export const audioListeningChallenge = {
  audioPrompt: "الأُمُّ سَلْمَى",
  audioClue: "«الأم سلمى»",
  audioClueWithTashkeel: "«الأُمُّ سَلْمَى»",
  options: [
    {
      id: "opt_omar",
      nameArabic: "الأب عمر",
      nameArabicWithTashkeel: "الأَبُ عُمَرُ",
      englishRole: "Father ‘Umar",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVQuuejG6t_z4-GUHMUKowmL5xi3_yIxIGDG6h1nbwhaQvXgFMDEuzZS69IO-nN-_3Zos3OIdUYTuPouV7jLs5l0KMdqf8pIREfVyqL7PQFCFTqvBrpth5ypc23nnxsepHrqbBPoiqH9mdcI8JsOYfCPAVWY-h8Q9vO56F5MZkNvnoALmee6qhncjlETGd9RrPLB3XcAT_EfrnTXO814GzSN6vPnG2Sz4MYATFNNQlq1jtozz3q9yFxA",
      isCorrect: false,
    },
    {
      id: "opt_salma",
      nameArabic: "الأم سلمى",
      nameArabicWithTashkeel: "الأُمُّ سَلْمَى",
      englishRole: "Mother Salma",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDguuoemHWKcq-wBXClvAIl0emHqcB0a80LwiwkNyyLr_LfRUxvXrA3307-de13rLNY9vo1qP990Q63O4g_PAEjtrjXGj3xrhpDOeygbP-k4VHJoSJrFrjnhFZxztxE8Ig2eb8Xejgt3GiRlyY_ZdLeFiRClU_kBbJvx8O3zT5JCZLPOSqeRN73Y4JK57103CRFg6liIvlmPUXfBajhYHUlC2tYQz2jltP5yAuOWAsrKh3DG3oonR07Pg",
      isCorrect: true,
    },
    {
      id: "opt_salim",
      nameArabic: "الجد سالم",
      nameArabicWithTashkeel: "الجَدُّ سَالِمٌ",
      englishRole: "Grandfather Salim",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNj2ksCduwNiv5ERkEps_1K2Id6HgPz6QT0g-5KxcnRT_ts-fFQtG4O_alHs5VDwMc3UeGLDvS1GXkG6buI5567oWBKQKydA2AFUH_Hc8LqOZw3KJTpmHVDjwvYCnaBvj9jpH1j0J3menN7R4VeAEwPWmbKGcnpLnLYmDyZdtnGx1hHzbOnwMUpujMU2KAtsVVheEGZLuWlqm6TDX0K86cKkf2rJJXGDTE5fHB-BPIUpa84MljuGFRsQ",
      isCorrect: false,
    },
    {
      id: "opt_zaynab",
      nameArabic: "الابنة زينب",
      nameArabicWithTashkeel: "الِابْنَةُ زَيْنَبُ",
      englishRole: "Daughter Zaynab",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEO2S1ZSMIGAOnWQKU250vuz0EMwSDcUSyF8ZuguQkVj1Y7r7lufL-B-dKqQl9oN4JBVT1Q4PJBbRXk4LoYXdC2xyN3kMRAw0HHbJ0pAcU2awjmM8_bOMSsqY_gKZvumpWXGWExf6CYEjNLHFVHVkSIAOc2uYyaZf9lc6KAvzoyt7137C2jdXF8loItlxRrjlXf6FOs0c7JSdw2Ln3Plhmn3tDIxmEsqsM8HpzNYTt28DQn_TFCWti0w",
      isCorrect: false,
    },
  ],
};

export const fillInTheBlankQuestions: FillQuestion[] = [
  {
    id: "q1",
    sentenceBefore: "",
    blankWord: "الجدة مريم في حديقة المنزل",
    sentenceAfter: "",
    phonetic: "[ ... al-jaddatu Maryam fī ḥadīqati al-manzil ]",
    options: [
      { id: "masc", text: "هذا", label: "للمذكر (Masculine)", isCorrect: false },
      { id: "fem", text: "هذه", label: "للمؤنث (Feminine)", isCorrect: true },
    ],
  },
  {
    id: "q2",
    sentenceBefore: "",
    blankWord: "الأب عمر يقرأ الكتاب",
    sentenceAfter: "",
    phonetic: "[ ... al-abu ‘Umar yaqra'u al-kitāb ]",
    options: [
      { id: "masc", text: "هذا", label: "للمذكر (Masculine)", isCorrect: true },
      { id: "fem", text: "هذه", label: "للمؤنث (Feminine)", isCorrect: false },
    ],
  },
  {
    id: "q3",
    sentenceBefore: "",
    blankWord: "بيتنا الجميل والواسع",
    sentenceAfter: "",
    phonetic: "[ ... baytunā al-jamīlu wal-wāsi‘ ]",
    options: [
      { id: "masc", text: "هذا", label: "للمذكر (Masculine)", isCorrect: true },
      { id: "fem", text: "هذه", label: "للمؤنث (Feminine)", isCorrect: false },
    ],
  },
];
