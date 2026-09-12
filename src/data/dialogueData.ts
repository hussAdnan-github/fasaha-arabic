export interface DialogueMessage {
  id: string;
  speaker: "zainab" | "ali";
  speakerName: string;
  speakerRole: string;
  speakerGender: "female" | "male";
  speakerAvatar: string;
  speakerBadge: string;
  indicatorText: string;
  badgeBg: string;
  textPlain: string;
  textWithTashkeel: string;
  phonetic: string;
  translation: string;
}

export interface DialogueExchange {
  id: string;
  exchangeTitle: string;
  messages: DialogueMessage[];
}

export const dialogueExchanges: DialogueExchange[] = [
  {
    id: "exchange-1",
    exchangeTitle: "التَّبَادُلُ الأَوَّل: إِلقَاءُ السَّلَامِ وَرَدُّه",
    messages: [
      {
        id: "z1",
        speaker: "zainab",
        speakerName: "زَيْنَب",
        speakerRole: "طالبة",
        speakerGender: "female",
        speakerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnCs0mFxpSxgfyBHvBBSZGcz8a7gj02XEfJTg9R5EgNoyqy3sHD1AR34gZ3CXGlzj1dODCrt0A6Iwjrjk_R0FboC8GkBkKXLMtKu0D2VF5v38Yik1jntozFMrnWHKRnHhUUAwA1eGWGupIj0p89qweGZZvNMbovqFv1DWH7b34kWmFrMZ45xvKOKVNmEliAKAMuNlql7rKDIzzFFGIhNlYd05bGR_dWcH3M-_sFcviiX2XNyNXL654gg",
        speakerBadge: "♀",
        indicatorText: "هَذِهِ زَيْنَبُ تَبْدَأُ بِالسَّلَام",
        badgeBg: "bg-primary-fixed text-on-primary-fixed",
        textPlain: "السلام عليكم ورحمة الله",
        textWithTashkeel: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ",
        phonetic: "[ As-salāmu ‘alaykum wa-raḥmatullāh ]",
        translation: "“Peace be upon you and the mercy of God”",
      },
      {
        id: "a1",
        speaker: "ali",
        speakerName: "عَلِيّ",
        speakerRole: "طالب",
        speakerGender: "male",
        speakerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkcs6t0g_FBKfoauviJvx2uXLwYzaRftRyy9Zg3E8zoZ2gRzDAbF1UDhnEPW1FfrkemjG5cWiQ4Ea0MgvZlhUagQ_AlYiF37WYgq_skx2cGgqOPS-0J_4MT6zFFQJ5D2C-M1VwSyvgFcMIo4CQObnNtMYlFDcWKYXTDK9fSSQV1F6C90L0afzXuGfyfa1t-P3LBqIvR-iIKLdMYtJ5nx2r7cEOQarrXxIr213J8V9KtsjdZMj8ak4KWg",
        speakerBadge: "♂",
        indicatorText: "عَلِيٌّ يَرُدُّ السَّلَامَ كَامِلاً",
        badgeBg: "bg-tertiary-fixed text-on-tertiary-fixed",
        textPlain: "وعليكم السلام ورحمة الله وبركاته",
        textWithTashkeel: "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
        phonetic: "[ Wa ‘alaykumu as-salāmu wa-raḥmatullāhi wa-barakātuh ]",
        translation: "“And unto you peace, and the mercy of God and His blessings”",
      },
    ],
  },
  {
    id: "exchange-2",
    exchangeTitle: "التَّبَادُلُ الثَّانِي: تَحِيَّةُ الصَّبَاح",
    messages: [
      {
        id: "a2",
        speaker: "ali",
        speakerName: "عَلِيّ",
        speakerRole: "طالب",
        speakerGender: "male",
        speakerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNyP6ab59NmDE4CASzfrIAgB43E3ksZz-rt_VSxhgdzfwPPGv1aGgd6f1uiKCZ-LD5c9IHazkiJsoc9GLrJuqd_zmB0P1vY3rHWrpn5NN1GJ0lBGahG6R89a1b9WtsXg9fWsJuuNlWoOmWPr2ebEsLn_RdV8RP1lLzavP9qcJeJS2uNknJ_g_aCJmeU8lzqQBYRhG0zTA8Idqy7E0TicsnvDELou2KR9fw92yi6KndJwssnqlE0bhxmA",
        speakerBadge: "♂",
        indicatorText: "تَحِيَّةُ الصَّبَاحِ (Good Morning)",
        badgeBg: "bg-secondary-fixed text-on-secondary-fixed",
        textPlain: "صباح الخير يا زينب",
        textWithTashkeel: "صَبَاحُ الخَيْرِ يَا زَيْنَبُ",
        phonetic: "[ Ṣabāḥul-khayri yā Zaynab ]",
        translation: "“Good morning, Zainab”",
      },
      {
        id: "z2",
        speaker: "zainab",
        speakerName: "زَيْنَب",
        speakerRole: "طالبة",
        speakerGender: "female",
        speakerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqjpCWfFUmdoRx47rR2QmKvd3PzKoDdzFk7m64rdyagEx2pkxb-QB58YNZCV35HPsPuQxVOJJsTMOsFFNN18cAvlAUBhuYjWrYmPlqj2QoRzcPApmc7diXJbQglkBwY2CGzb-vUiScXnStyCDELIfLBBB3Uod_1fxDO-kob0rNM4IIvOcacVkzY2V9AyMVlwhto_5KFru6C1hcVRCQgBv4IcvJApspe8Kp4Vm70fqoMjFeZrn_cDpiIA",
        speakerBadge: "♀",
        indicatorText: "رَدُّ تَحِيَّةِ الصَّبَاحِ (Morning of Light)",
        badgeBg: "bg-secondary-fixed text-on-secondary-fixed",
        textPlain: "صباح النور يا علي",
        textWithTashkeel: "صَبَاحُ النُّورِ يَا عَلِيُّ",
        phonetic: "[ Ṣabāḥun-nūri yā ‘Alī ]",
        translation: "“Morning of light (Good morning), Ali”",
      },
    ],
  },
  {
    id: "exchange-3",
    exchangeTitle: "التَّبَادُلُ الثَّالِث: السُّؤَالُ عَنِ الحَالِ وَالاطْمِئْنَان",
    messages: [
      {
        id: "z3",
        speaker: "zainab",
        speakerName: "زَيْنَب",
        speakerRole: "طالبة",
        speakerGender: "female",
        speakerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV08Fj_eoIRXs4vsy0FVqYW324PTlIivkswFY6CqtLDGTPx2Ln1RqI3CvRQhKDF0zxqeFJRFoeVkURAYjnkUN_J-DpuGwzN7SHJ-0_3lG-zcJpai26DXlzupNEuMVyFSv4i5BJ4MS88t031ulB3kqq8aNUFxgQL5oT46goBux0msYm4RnHyguCJXqQVnejKpxK2dLBK2Hiki4yWeTPw8R_9ALCiSrWYfVLCi6LD4EknsGD-lsmiTVxJQ",
        speakerBadge: "♀",
        indicatorText: "سُؤَالُ الحَالِ (Inquiry)",
        badgeBg: "bg-tertiary-fixed text-on-tertiary-fixed",
        textPlain: "كيف الحال اليوم؟",
        textWithTashkeel: "كَيْفَ الحَالُ اليَوْمَ؟",
        phonetic: "[ Kayfal-ḥālu al-yawm? ]",
        translation: "“How are you doing today?”",
      },
      {
        id: "a3",
        speaker: "ali",
        speakerName: "عَلِيّ",
        speakerRole: "طالب",
        speakerGender: "male",
        speakerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxOIan0qO9JaDc_H3a4M_7oKo3NZ08jqu2ZU2vP-6yon68pWiWhf2TiPFPk0oiwlWQbGVa5eQMXJVvgIou_F8Mbw9ztD_fUWNLPGTdiY0Pot5mG0vsk_RDqDs3Ed4uDdrvrH5bTEkQ-OxUBfseSaNT0Rs4tqNIXt2CFuGkCtAO3-cnT9qaSYs0VN3J1B0WVHuXZMNFtLa6wijm_Pgqn_VtFkLOMnJrg0G_HcGlP4Apf2kdccMhFOilxw",
        speakerBadge: "♂",
        indicatorText: "الحَمْدُ للهِ وَرَدُّ السُّؤَال (Feminine: حَالُكِ)",
        badgeBg: "bg-primary-fixed text-on-primary-fixed",
        textPlain: "بخير والحمد لله، وكيف حالك أنتِ؟",
        textWithTashkeel: "بِخَيْرٍ وَالحَمْدُ للهِ، وَكَيْفَ حَالُكِ أَنْتِ؟",
        phonetic: "[ Bikhayrin wal-ḥamdu lillāh, wa kayfa ḥālukī anti? ]",
        translation: "“I am fine, praise be to God! And how are you?”",
      },
    ],
  },
];
