export interface ProgressionColumn {
  stateLabel: string;
  countBadge: string;
  wordPlain: string;
  wordWithTashkeel: string;
  suffixHighlight?: string;
  phonetic: string;
  englishMeaning: string;
  imageUrl: string;
  imageAlt: string;
}

export interface GrammarProgressionRow {
  id: string;
  stepNumber: string;
  titleArabic: string;
  titleEnglish: string;
  pluralTypeBadge: string;
  badgeBg: string;
  badgeTextColor: string;
  singular: ProgressionColumn;
  dual: ProgressionColumn;
  plural: ProgressionColumn;
}

export interface TransformerItem {
  id: string;
  label: string;
  icon: string;
  singular: {
    word: string;
    tashkeel: string;
    phonetic: string;
    demonstrative: string;
    english: string;
  };
  dual: {
    word: string;
    tashkeel: string;
    phonetic: string;
    demonstrative: string;
    english: string;
  };
  plural: {
    word: string;
    tashkeel: string;
    phonetic: string;
    demonstrative: string;
    english: string;
  };
}

export const grammarProgressions: GrammarProgressionRow[] = [
  {
    id: "boy",
    stepNumber: "١",
    titleArabic: "الصبي / الولد",
    titleEnglish: "(Boy progression)",
    pluralTypeBadge: "جمع تكسير (Broken Plural)",
    badgeBg: "bg-primary-fixed",
    badgeTextColor: "text-on-primary-fixed",
    singular: {
      stateLabel: "مفرد (١)",
      countBadge: "مفرد",
      wordPlain: "ولد",
      wordWithTashkeel: "وَلَدٌ",
      phonetic: "[ Walad ]",
      englishMeaning: "One boy (Singular)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADXMw6U_2j9nhlPNdXDNcI25Qo6S0xysvLY7kq6DharHka0xcopIMcoBsTukF2Ipiq3lBuaFZVslrtungY6DvIMj4xTnjQAs9XpflyzCUS6tHPPDFYV8PjNwe-gmbuxVlV9m4s-u5vGP2_ql9M39PC-H02iBXI6gaa0eZJJrJIMPcuZWOzQbozHBhh-PB6Jip9YjDQiZva5Em5_FWXIyxrfSGOSLy2YzZIQSmibktjF03S34gSOb3oKg",
      imageAlt: "A friendly young Arab boy in mint green polo shirt",
    },
    dual: {
      stateLabel: "مثنى (٢) • اللاحقة ـان",
      countBadge: "مثنى",
      wordPlain: "ولدان",
      wordWithTashkeel: "وَلَدَانِ",
      suffixHighlight: "ان",
      phonetic: "[ Waladān ]",
      englishMeaning: "Two boys (Dual +an)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcvMdhVvpcYKVDJfSOCUrhYkCg3eqiMjNQym-Cxs3pmSGnvZBJmrw417eFRjzIlsN6rFo7k6XICfWiy-7eQIZkt9SwAkIfkgbzxAqzULWTiDCPslZNLp0TzTvDgsWVLayphNboCw2Zz1mRxkT8H-5cWjrQnGR_c77Nl7tUUx2hsf9ADkkSGNiFXxBPrQ2To7_ynBIdTi6yX7MOzWLZ0KgBVOwAM4qO9LtIjyMQ_-hZ4Myd-whmk_R4OA",
      imageAlt: "Two friendly young Arab twin brothers side-by-side",
    },
    plural: {
      stateLabel: "جمع (٣+)",
      countBadge: "جمع",
      wordPlain: "أولاد",
      wordWithTashkeel: "أَوْلَادٌ",
      phonetic: "[ Awlād ]",
      englishMeaning: "Group of boys (3+ Plural)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDKM3zRbXK5xwaAyWxVwtZD8p09kvsfElwzNOROVOHHX6nIPAc4J0beVjKujtXtvDt6vzn6_xpbW8g2QCec0tfvl8Li7PumrDCLZPKsLB4ZAk-xeE4sIfuAp51SNLN9tqBLcIKDABEMMgG4xCJKsvCi8KvKGs7_WJ6Gmah_8EBDP5FXTqMfrctK4LbqOZ-vSHsTa4_i3ayYRlhLPZsNIKLissH5-5gIbRKFlmFlt4NfZayCFo2KQqU9Q",
      imageAlt: "A lively cheerful group of four young Arab boys laughing",
    },
  },
  {
    id: "girl",
    stepNumber: "٢",
    titleArabic: "الفتاة / البنت",
    titleEnglish: "(Girl progression)",
    pluralTypeBadge: "جمع مؤنث سالم (Sound Feminine Plural)",
    badgeBg: "bg-error-container",
    badgeTextColor: "text-on-error-container",
    singular: {
      stateLabel: "مفرد (١)",
      countBadge: "مفرد",
      wordPlain: "بنت",
      wordWithTashkeel: "بِنْتٌ",
      phonetic: "[ Bint ]",
      englishMeaning: "One girl (Singular)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx2_aQ6WXmZZgJFUcF0N-DT0VvCNspvs1lnscJM8nDgtBiZNPYABDQcBDJQA1Mueb2Bh91tz1xWZj47ai50Oak6WfOVdTmh7ozFii2la1FXSkRznAoNwHKmP8mUUkRMsOwR2u_YAqiBgfsWdZUMGg9MPvaBSaJD69zb8UGvycbnPTP6SNARpYRMszPraEarBCOj5Amp3intvVDW72GGpwkPp6qt2FF5wchkrpMrAhRlZd3vv0SaxbQvA",
      imageAlt: "A sweet smiling Arab young girl holding a notebook",
    },
    dual: {
      stateLabel: "مثنى (٢) • اللاحقة ـان",
      countBadge: "مثنى",
      wordPlain: "بنتان",
      wordWithTashkeel: "بِنْتَانِ",
      suffixHighlight: "ان",
      phonetic: "[ Bintān ]",
      englishMeaning: "Two girls (Dual +an)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOLr4TYMkFE1pRG5EMGqd9sdWP9RPw0CzDdr_5n5nnb3aAtXo9fuBtnx0MU9A3W-Q8-ga_uadGhhc6paYEq9p5pry9itplaHuqKZnB-SuzTGRhviPt_Qm__Z4aeUVb2Jk3GnNWxgCMp47s0LP8Uc5A8httlz3gmcEhHzFUwjhycIMa2iSqSbJDu46f1Pa-vcBftCYuMknd51GyrEHBsXAWU3qzejlZMYo3W3t_sDEoQATl9tONGmE-Uw",
      imageAlt: "Two cheerful young Arab schoolgirls smiling together",
    },
    plural: {
      stateLabel: "جمع (٣+)",
      countBadge: "جمع",
      wordPlain: "بنات",
      wordWithTashkeel: "بَنَاتٌ",
      phonetic: "[ Banāt ]",
      englishMeaning: "Group of girls (Sound Plural)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb25ton5iesTYdK25H6LAoCZ-WBUuDyeup2gHzg6S9hqnuWSCt00A-aR3fWY23PNMGRbAk2KMkdqYCZcX6v6X1W913Kwlv22gyIujR-M7jmzgkOaPYNPYWZQ4cjQtIdSTP3qkDouDr2oBILePRMJE6WifwYeuYZY-yNwAyuveIsiJwBkMcSHlIObzvXmKR6mWnN0m42YuyjUIvq69i5Q8hN69dhQRl7X3laV2HH633e3F3KlGBAgKGww",
      imageAlt: "A group of four happy young Arab girls celebrating in art classroom",
    },
  },
  {
    id: "man",
    stepNumber: "٣",
    titleArabic: "الرجل",
    titleEnglish: "(Man progression)",
    pluralTypeBadge: "جمع تكسير (Broken Plural)",
    badgeBg: "bg-tertiary-fixed",
    badgeTextColor: "text-on-tertiary-fixed",
    singular: {
      stateLabel: "مفرد (١)",
      countBadge: "مفرد",
      wordPlain: "رجل",
      wordWithTashkeel: "رَجُلٌ",
      phonetic: "[ Rajul ]",
      englishMeaning: "One man (Singular)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCBrQHnejo73Ivw0TQcx3AUEFIVtAGPh9eoCXNLOlDe2OOibA85HgY7zpgfJBVEfeEvXnx_g2ZVzCBR4k11NT5rdSqNCR0tjSLY0MvAJE6RxkBGswbQSaRdtCn4Mndl_dMiWltaLY5Ud4J7jU1LLTFfWZAW5mReU7f2YIsOBzDmrPn8IR2yAM91vdR-Iph8A82DKbOOQQFIqwS0qzrCKOP5TrRtHpX1BUvm9dsPzMLO0DubxSWlTvoww",
      imageAlt: "A distinguished adult Middle Eastern man in navy blazer",
    },
    dual: {
      stateLabel: "مثنى (٢) • اللاحقة ـان",
      countBadge: "مثنى",
      wordPlain: "رجلان",
      wordWithTashkeel: "رَجُلَانِ",
      suffixHighlight: "ان",
      phonetic: "[ Rajulān ]",
      englishMeaning: "Two men (Dual +an)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0IH1y2rxitt5iksa9CEnwkYVSX_-kE6pCTkkd-acyC8kK_fkpuBkF6ztI6BTbtcykwELj-ONAM4QjQO02VHRy_bMvjtaYl___C2VfiWsxEi5y8LnOfgw7PWE9fTTKdC_q78HZH1MBXY2FnZKvID8dRZAVHBqHCq1niMwpKxF1mEtcG1MVh_H6G-TdKKmWBzwEWvUHoQxST83_acVocUp1zcnJ5SQpkUX-km8jyjO1dPrdKCKJyuBUkg",
      imageAlt: "Two Arab professional adult men standing together in conversation",
    },
    plural: {
      stateLabel: "جمع (٣+)",
      countBadge: "جمع",
      wordPlain: "رجال",
      wordWithTashkeel: "رِجَالٌ",
      phonetic: "[ Rijāl ]",
      englishMeaning: "Men (Plural 3+)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkREscrZ4E7YtNKlne0oA5FAeYzCBATt07heU8p9vRlJoe2IpI2HffvhTMv5RfN3snuHA_B6vB462wBij9lAV1gFNRgNQQTvJwr8stpC7VfyWPZKserBiXXyUxyIxVYW0pFZAasqst5p21-zKox-xT2UJeYMc5zykbkLRyKScN2JkTUmdnX6Plms-wSpmg0HMZFLqIZjjl02OGFWayECQTVT9bVUZS8Z3ColHTCyD4nA2qfRovD51f-g",
      imageAlt: "A cooperative team of four Middle Eastern men in discussion",
    },
  },
  {
    id: "woman",
    stepNumber: "٤",
    titleArabic: "المرأة",
    titleEnglish: "(Woman progression - Irregular plural)",
    pluralTypeBadge: "تنبيه: جمع من غير لفظ المفرد (Irregular)",
    badgeBg: "bg-secondary-fixed-dim",
    badgeTextColor: "text-on-secondary-fixed-variant",
    singular: {
      stateLabel: "مفرد (١)",
      countBadge: "مفرد",
      wordPlain: "امرأة",
      wordWithTashkeel: "امْرَأَةٌ",
      phonetic: "[ Imra'ah ]",
      englishMeaning: "One woman (Singular)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4kcKkbbW27AdIXtt_GAhCs7j35TNJDCb6eD9WiAVzWMK_-U9Kw4FjkK0TVaOB-_qyQQUCZ4cKs_jbhYBkmW9-Ic-8S9hHd_G5KW4gz3HVA-c_8ZKlx1EKwiCzcXr5dGYX8V8giK3toaqCvXx44Wup021AgpxFi9aKmHM-CzGxaEbSc90oLCpUvOMNFwOvNDtz9hUSXK1E0v7811Km2RsWLGLbcZ4PUkre29uHvzohoTofUlxTP6j0Sw",
      imageAlt: "A confident smiling Arab woman with emerald headscarf",
    },
    dual: {
      stateLabel: "مثنى (٢) • اللاحقة ـان",
      countBadge: "مثنى",
      wordPlain: "امرأتان",
      wordWithTashkeel: "امْرَأَتَانِ",
      suffixHighlight: "ان",
      phonetic: "[ Imra'atān ]",
      englishMeaning: "Two women (Dual +an)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPVvc--ldN_llO2y-pWvdLTizPHMF6Ire8JgjYSnokbBbK4xQWW7m_K6ZPJDMleixUqaiWqNv_IR2AxZO0nt4d3Rtk6JKVW3t4zahEGksrWl7ymY8axIs42IY9uBm4oBstjZifZ3FmEqNye8qtkfyNXHqfmxXzqeKTGqmdXVSvpYVqgBl7Wd8NBNdrtv7zws5l-zHNjNDYlw56DUD7lMSJvnVwEcbfpxskQVqIootOUwaJ9opnte95DQ",
      imageAlt: "Two professional Arab women collaborating side-by-side",
    },
    plural: {
      stateLabel: "جمع (٣+)",
      countBadge: "جمع",
      wordPlain: "نساء",
      wordWithTashkeel: "نِسَاءٌ",
      phonetic: "[ Nisā' ]",
      englishMeaning: "Women (Irregular Plural 3+)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpji_fclOx6Nu-STTfQmEk60wHLffQUVAGciFU316lAqDlT4gf91dq4Lymn3ygspNTwrwO-6cmHuJw_DB5BPSiLOwagPkHpikR7bgTJtxVlGi3HaGyvaNGPAlIFE3vYBcPfBUD0LIUjAgp2mYPePw2cn3OIG9Ioola7GUenvPrrtZTzp8cLGOEDIzPYfAiMOcYY5gAm_nlwDrzglhVuyka4W6UFoM9xXRfWjJMSteeuQ5nCtY5spVT-g",
      imageAlt: "A diverse group of four Arab women leaders and doctors",
    },
  },
];

export const transformerItems: TransformerItem[] = [
  {
    id: "boy",
    label: "مذكر • عاقل",
    icon: "👦",
    singular: {
      word: "ولد",
      tashkeel: "وَلَدٌ",
      phonetic: "[ Walad ]",
      demonstrative: "هَذَا",
      english: "One Boy",
    },
    dual: {
      word: "ولدان",
      tashkeel: "وَلَدَانِ",
      phonetic: "[ Waladān ]",
      demonstrative: "هَذَانِ",
      english: "Two Boys",
    },
    plural: {
      word: "أولاد",
      tashkeel: "أَوْلَادٌ",
      phonetic: "[ Awlād ]",
      demonstrative: "هَؤُلَاءِ",
      english: "Boys (3+)",
    },
  },
  {
    id: "girl",
    label: "مؤنث • عاقل",
    icon: "👧",
    singular: {
      word: "بنت",
      tashkeel: "بِنْتٌ",
      phonetic: "[ Bint ]",
      demonstrative: "هَذِهِ",
      english: "One Girl",
    },
    dual: {
      word: "بنتان",
      tashkeel: "بِنْتَانِ",
      phonetic: "[ Bintān ]",
      demonstrative: "هَاتَانِ",
      english: "Two Girls",
    },
    plural: {
      word: "بنات",
      tashkeel: "بَنَاتٌ",
      phonetic: "[ Banāt ]",
      demonstrative: "هَؤُلَاءِ",
      english: "Girls (3+)",
    },
  },
  {
    id: "book",
    label: "مذكر • غير عاقل",
    icon: "📖",
    singular: {
      word: "كتاب",
      tashkeel: "كِتَابٌ",
      phonetic: "[ Kitāb ]",
      demonstrative: "هَذَا",
      english: "One Book",
    },
    dual: {
      word: "كتابان",
      tashkeel: "كِتَابَانِ",
      phonetic: "[ Kitābān ]",
      demonstrative: "هَذَانِ",
      english: "Two Books",
    },
    plural: {
      word: "كتب",
      tashkeel: "كُتُبٌ",
      phonetic: "[ Kutub ]",
      demonstrative: "هَذِهِ (لغير العاقل)",
      english: "Books (3+)",
    },
  },
  {
    id: "tree",
    label: "مؤنث • غير عاقل",
    icon: "🌳",
    singular: {
      word: "شجرة",
      tashkeel: "شَجَرَةٌ",
      phonetic: "[ Shajarah ]",
      demonstrative: "هَذِهِ",
      english: "One Tree",
    },
    dual: {
      word: "شجرتان",
      tashkeel: "شَجَرَتَانِ",
      phonetic: "[ Shajaratān ]",
      demonstrative: "هَاتَانِ",
      english: "Two Trees",
    },
    plural: {
      word: "أشجار",
      tashkeel: "أَشْجَارٌ",
      phonetic: "[ Ashjār ]",
      demonstrative: "هَذِهِ (لغير العاقل)",
      english: "Trees (3+)",
    },
  },
];
