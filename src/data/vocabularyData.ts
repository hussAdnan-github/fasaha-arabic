export interface VocabItem {
  id: string;
  wordWithTashkeel: string;
  wordPlain: string;
  englishMeaning: string;
  phonetic: string;
  root: string;
  description: string;
  gender: "masculine" | "feminine" | "special";
  genderLabel: string;
  demonstrative: string;
  imageUrl: string;
  imageAlt: string;
  sentenceWithTashkeel: string;
  sentencePlain: string;
  sentencePhonetic: string;
  sentenceTranslation: string;
  accuracyScore: number;
}

export interface MiniFlashcard {
  id: string;
  wordWithTashkeel: string;
  wordPlain: string;
  englishMeaning: string;
  phonetic: string;
  genderType: "masculine" | "feminine";
  demonstrative: string;
  examplePhrase: string;
}

export const primaryVocabItems: VocabItem[] = [
  {
    id: "usrah",
    wordWithTashkeel: "أُسْرَةٌ",
    wordPlain: "أسرة",
    englishMeaning: "Family",
    phonetic: "[ Us-rah ]",
    root: "أ - س - ر",
    description: "تعني مجموعة الأفراد الذين يعيشون معاً في بيت واحد بمحبة وألفة.",
    gender: "feminine",
    genderLabel: "اسم مؤنث (Feminine)",
    demonstrative: "تستخدم مع: هذه",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKT6ywEZ52Ea7hOsbD66jlYyqY_oDDqS3WRddvDzGP_nZHWfUp-Gw2-njelOVN8NjJSn-Y4z0k0uKShWKXEKlD7F28bV1dkpJVCl5RN0kiNSXY5k08hM1LkUU2tmXX4vXMBUuH6thHO6QBp_hsg9fUmai4e0XworiKO6bIj90HjbP2kurde1bb0MpsxLz7RktGboV_MKeCkImQXsvShJeZdQsDpXe14JTKoiwPoLvMUoquCTi7H5pVdQ",
    imageAlt: "Warm modern illustration of a smiling Middle Eastern family gathering together in a cozy sunlit living room",
    sentenceWithTashkeel: "« هَذِهِ أُسْرَتِي الْحَبِيبَةُ »",
    sentencePlain: "« هذه أسرتي الحبيبة »",
    sentencePhonetic: '"Hāthihi usratī al-ḥabībah"',
    sentenceTranslation: "This is my beloved family.",
    accuracyScore: 96,
  },
  {
    id: "bayt",
    wordWithTashkeel: "بَيْتٌ",
    wordPlain: "بيت",
    englishMeaning: "House / Home",
    phonetic: "[ Bayt ]",
    root: "ب - ي - ت",
    description: "المكان الذي يأوي إليه الإنسان ويجد فيه الراحة والسكينة والأمان مع أحبته.",
    gender: "masculine",
    genderLabel: "اسم مذكر (Masculine)",
    demonstrative: "يستخدم مع: هذا",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gt43F6TOoti-pO2W3vyAcLLoliG4F4pcDNkBta4Ik4kKuMqnACIn-90AjckXdlX0fbPNSq0MkAJ-Vb1LfPzG4sQ4D2cOxwxP1o5VoCaHx5KXL3hk9wuutFcedjE_LvtNZjPOBr98MsPatDgfhXlh1qqsonDkho5dqAcMynTBOJHskL4HoDmtzAIg053asQxgwNrXr6zgrYiHRhCBxb77VsPxI6PBZj2tZOTHA21OovAgME4SH1jdQw",
    imageAlt: "Cozy sunlit Mediterranean Arabic suburban house with arched windows and flowering vines",
    sentenceWithTashkeel: "« هَذَا بَيْتُنَا الْجَمِيلُ »",
    sentencePlain: "« هذا بيتنا الجميل »",
    sentencePhonetic: '"Hādhā baytunā al-jamīl"',
    sentenceTranslation: "This is our beautiful home.",
    accuracyScore: 98,
  },
  {
    id: "madrasa",
    wordWithTashkeel: "مَدْرَسَتِي",
    wordPlain: "مدرستي",
    englishMeaning: "My School",
    phonetic: "[ Mad-ra-sa-tee ]",
    root: "د - ر - س",
    description: "صرح العلم والمعرفة الذي نلتقي فيه بالأصدقاء والمعلمين ونتعلم فيه دروس الحياة.",
    gender: "special",
    genderLabel: "مضاف + ياء المتكلم",
    demonstrative: "ملكية: ياء المتكلم (My)",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAycPwuWXgqdqOnXUgit_46gq6unbHXhgpu3-fPYc6IOILNO6_qop5TOm-whdseUuKNsouAYmohImpb04_OqEEZRKSPb62QpfRwrz-mLfEztkjDRFPhMmAPaFx3uDGCujYDlSdPvzzmbra3CoQPhNFPZpwJnvJ-RAa0glYNsG-KCYto8mMb7Rps51gDKyX9fHLeJNVRTiQELpozaXNTLK5shvev9pvc3xdCB0BmbhVWQILxBWuuckEWHQ",
    imageAlt: "Modern welcoming primary school campus with clock tower, colorful playground, and palm trees",
    sentenceWithTashkeel: "« أَنَا أُحِبُّ مَدْرَسَتِي »",
    sentencePlain: "« أنا أحب مدرستي »",
    sentencePhonetic: '"Anā uḥibbu madrasatī"',
    sentenceTranslation: "I love my school.",
    accuracyScore: 94,
  },
];

export const miniFlashcards: MiniFlashcard[] = [
  {
    id: "ab",
    wordWithTashkeel: "أَبٌ",
    wordPlain: "أب",
    englishMeaning: "Father",
    phonetic: "[ Ab • Father ]",
    genderType: "masculine",
    demonstrative: "مذكر (هذا)",
    examplePhrase: "« أبي الحبيب »",
  },
  {
    id: "umm",
    wordWithTashkeel: "أُمٌّ",
    wordPlain: "أم",
    englishMeaning: "Mother",
    phonetic: "[ Umm • Mother ]",
    genderType: "feminine",
    demonstrative: "مؤنث (هذه)",
    examplePhrase: "« أمي الطيبة »",
  },
  {
    id: "akh",
    wordWithTashkeel: "أَخٌ",
    wordPlain: "أخ",
    englishMeaning: "Brother",
    phonetic: "[ Akh • Brother ]",
    genderType: "masculine",
    demonstrative: "مذكر (هذا)",
    examplePhrase: "« أخي الأكبر »",
  },
  {
    id: "ukht",
    wordWithTashkeel: "أُخْتٌ",
    wordPlain: "أخت",
    englishMeaning: "Sister",
    phonetic: "[ Ukht • Sister ]",
    genderType: "feminine",
    demonstrative: "مؤنث (هذه)",
    examplePhrase: "« أختي الصغيرة »",
  },
];
