export interface FamilyMember {
  id: string;
  gender: "masculine" | "feminine";
  namePlain: string;
  nameWithTashkeel: string;
  rolePlain: string;
  roleWithTashkeel: string;
  demonstrative: "هذا" | "هذه";
  demonstrativeWithTashkeel: "هَذَا" | "هَذِهِ";
  fullNamePhrase: string;
  phonetic: string;
  englishMeaning: string;
  markerLabel: string;
  markerValue: string;
  imageUrl: string;
  imageAlt: string;
}

export interface FamilyPair {
  id: string;
  pairNumber: string;
  titleArabic: string;
  titleEnglish: string;
  comparisonBadge: string;
  colorAccent: string;
  masculine: FamilyMember;
  feminine: FamilyMember;
}

export const familyPairs: FamilyPair[] = [
  {
    id: "children",
    pairNumber: "المقارنة الأولى",
    titleArabic: "الأبناء",
    titleEnglish: "Children",
    comparisonBadge: "ابن vs ابنة (+ة)",
    colorAccent: "bg-primary",
    masculine: {
      id: "ali",
      gender: "masculine",
      namePlain: "علي",
      nameWithTashkeel: "عَلِيٌّ",
      rolePlain: "الابن",
      roleWithTashkeel: "الِابْنُ",
      demonstrative: "هذا",
      demonstrativeWithTashkeel: "هَذَا",
      fullNamePhrase: "هذا الابن علي",
      phonetic: "[ Hādhā al-ibnu ‘Alī ]",
      englishMeaning: "This is the son, Ali",
      markerLabel: "علامة التذكير:",
      markerValue: "لفظ خالٍ من تاء التأنيث",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBQ18FwegvPlTa0p3qVej34wabqVq-tV_eBWYVxEP2p91kN6mZa9x3qlKkX3DroEGTEHjq-XcSPZ3MoPMmdnZPcTfOoaRkxYoQO4qN5moWHHVt3UsLjIHDVQNSY5cAHcdN_KEFlbOOqvissueznI-pA6pHwjUp2zVo4shRSxGzGNG8ML95OGbBFxKaiLViiJdbaFJGOOBBfcbZ5-R1ZzO82D1dZam8yEm2zwGxQMZf-oPUDNOa7M7ZGA",
      imageAlt: "Playful flat educational illustration of a cheerful young Arab boy named Ali",
    },
    feminine: {
      id: "zainab",
      gender: "feminine",
      namePlain: "زينب",
      nameWithTashkeel: "زَيْنَبُ",
      rolePlain: "الابنة",
      roleWithTashkeel: "الِابْنَةُ",
      demonstrative: "هذه",
      demonstrativeWithTashkeel: "هَذِهِ",
      fullNamePhrase: "هذه الابنة زينب",
      phonetic: "[ Hādhihī al-ibnatu Zaynab ]",
      englishMeaning: "This is the daughter, Zainab",
      markerLabel: "علامة التأنيث:",
      markerValue: "زيادة التاء المربوطة (ـة)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5TQL9uKR-_-7cjLn0axCRmjh_rEE0A9zm-zSWTCV0MXoGvuIVNBwI0MPjO5tvtAVzaqKO5PBR4fSLRbeiMW-j1ghT3LYTwtuU2emhxynN2kU7M3kPj-Zh8RdqfTr2puND8WbVafppjlci0PSb8Z7X20AiB87U0BtVH0JL65itSusB3P9mJYakF6gJA-CoMOCPpXwRUNQOV2t0-iWngw-_mPulh3KaMv5Av6sWLoyqkwc4ONOr0St8SA",
      imageAlt: "Playful flat educational illustration of a cheerful young Arab girl named Zainab",
    },
  },
  {
    id: "parents",
    pairNumber: "المقارنة الثانية",
    titleArabic: "الوالدان",
    titleEnglish: "Parents",
    comparisonBadge: "أب vs أم (مؤنث حقيقي)",
    colorAccent: "bg-secondary-container",
    masculine: {
      id: "omar",
      gender: "masculine",
      namePlain: "عمر",
      nameWithTashkeel: "عُمَرُ",
      rolePlain: "الأب",
      roleWithTashkeel: "الْأَبُ",
      demonstrative: "هذا",
      demonstrativeWithTashkeel: "هَذَا",
      fullNamePhrase: "هذا الأب عمر",
      phonetic: "[ Hādhā al-abu ‘Umar ]",
      englishMeaning: "This is the father, Omar",
      markerLabel: "التصنيف النحوي:",
      markerValue: "مذكر حقيقي (إنسان)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmBIUMJyYPymPgnhMqCkLezefcG4M9zBS_t_EcfjeqW_T2TadwrdxXihQxIKlRjQPqspnDhGECz-V2LyOHQZoqjvKughGLpU10A1xJpg3K5RQqFXFsnzpRk8ck098sIFM7dUxekgPAK65dcucmPznw6v6L_u_nYl-sBdk9Tn4jN6lfCIYSV-s5rfoELucqq2L8kpLLKGZkyN9h2Fm80pICIOw5DVBdkOFzv1yE1908JWqx9qTRSaN6Cg",
      imageAlt: "Stylized modern portrait illustration of a friendly middle-aged Arab father named Omar",
    },
    feminine: {
      id: "salma",
      gender: "feminine",
      namePlain: "سلمى",
      nameWithTashkeel: "سَلْمَى",
      rolePlain: "الأم",
      roleWithTashkeel: "الْأُمُّ",
      demonstrative: "هذه",
      demonstrativeWithTashkeel: "هَذِهِ",
      fullNamePhrase: "هذه الأم سلمى",
      phonetic: "[ Hādhihī al-ummu Salmā ]",
      englishMeaning: "This is the mother, Salma",
      markerLabel: "التصنيف النحوي:",
      markerValue: "مؤنث معنوي (بدون تاء)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuACE_crm_fqc1D4-ed8uHQsEWVyogy_wFGxhwa8rCM_xq4ZrC0x5pCMu7kirc_VGr_Az9bnUxBkKVux5k5-B5kxOavC-vmC2BkHYDpH95CByaE2rvP8rHGBgUCItcNz7DZaKS15BPk3cmC30VeZIc125K_asctD9mRY3kHYrs3Ykq60wMu0MMolxqHpu_ZdZLd2FviRgb2SwNSevaPrCjFVA04RLdM5smpf6gM8RLOdyitl7RGuKWOVmQ",
      imageAlt: "Stylized modern portrait illustration of a kind Arab mother named Salma",
    },
  },
  {
    id: "grandparents",
    pairNumber: "المقارنة الثالثة",
    titleArabic: "الأجداد",
    titleEnglish: "Grandparents",
    comparisonBadge: "جد vs جدة (+ة)",
    colorAccent: "bg-tertiary-container",
    masculine: {
      id: "salim",
      gender: "masculine",
      namePlain: "سالم",
      nameWithTashkeel: "سَالِمٌ",
      rolePlain: "الجد",
      roleWithTashkeel: "الْجَدُّ",
      demonstrative: "هذا",
      demonstrativeWithTashkeel: "هَذَا",
      fullNamePhrase: "هذا الجد سالم",
      phonetic: "[ Hādhā al-jaddu Sālim ]",
      englishMeaning: "This is the grandfather, Salim",
      markerLabel: "علامة التذكير:",
      markerValue: "لفظ دال على مذكر",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg82QJcpc8SZ5vTE1WyL-uXpPG5Mr-6QT-COif-ZoRpA1YDeOD7zf6Y318dWDN5BGcq_u_6jjdFYYM3BUv-NP9FOD5oLjzgd3xfNvyVMJ7o7fMZTplrL42lMvBe47bQ8p5Sf3S4TPfUHLUqdsMAQUj5zZjXuMWapUVdsVB_4N9soxsdKIn2bNkTOEhGNIdG5hmYmWZaYH5OWj0btwOGakpr0e5SXr2mTRGyMtmnZFcldCE7mVMwPl4PQ",
      imageAlt: "Playful portrait illustration of a wise Arab grandfather named Salim",
    },
    feminine: {
      id: "maryam",
      gender: "feminine",
      namePlain: "مريم",
      nameWithTashkeel: "مَرْيَمُ",
      rolePlain: "الجدة",
      roleWithTashkeel: "الْجَدَّةُ",
      demonstrative: "هذه",
      demonstrativeWithTashkeel: "هَذِهِ",
      fullNamePhrase: "هذه الجدة مريم",
      phonetic: "[ Hādhihī al-jaddatu Maryam ]",
      englishMeaning: "This is the grandmother, Maryam",
      markerLabel: "علامة التأنيث:",
      markerValue: "زيادة التاء المربوطة (ـة)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcNYEdpeNZtax00qn1T9CvfBAYyvJJ1XtWLPJ2pVcHU-gUlLc6qLI-bAXYOL4MMLcPhoS1DFF08ejIHiLC7DQjvP1dqKeqoyd4dO-7KDUydM4lP9nA3xUMTFv00SOECda1cnoiRFbEhU9WomtAtEChS85HPnWT1V0UJ0a1CG4lBRM_72g_UlVO_xcj2BjkxjqmI4wU8mgmW8FCxPLrzVS2P7Nui5BVb2c-DKxcEQlTswSKEdPC6pLlSA",
      imageAlt: "Playful portrait illustration of an affectionate Arab grandmother named Maryam",
    },
  },
];
