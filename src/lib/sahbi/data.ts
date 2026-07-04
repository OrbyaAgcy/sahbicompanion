import type {
  Achievement,
  ArabicVariant,
  Course,
  DialectComparison,
  Expression,
  Vocab,
} from "./types";

export const VARIANTS: ArabicVariant[] = [
  {
    slug: "fusha",
    name: "Arabe standard (Fusha)",
    nativeName: "الفصحى",
    region: "Monde arabe",
    description: "La forme moderne écrite et médiatique, comprise partout.",
    speakers: "~400 M compris",
    available: true,
  },
  {
    slug: "libanais",
    name: "Libanais",
    nativeName: "لبناني",
    region: "Levant",
    description: "Mélodique, urbain, très parlé dans la diaspora.",
    speakers: "~15 M",
    available: true,
  },
  {
    slug: "darija",
    name: "Darija marocaine",
    nativeName: "الدارجة",
    region: "Maroc",
    description: "Riche en berbère, français et espagnol.",
    speakers: "~35 M",
    available: true,
  },
  {
    slug: "egyptien",
    name: "Égyptien",
    nativeName: "مصري",
    region: "Égypte",
    description: "Le dialecte du cinéma arabe, largement compris.",
    speakers: "~100 M",
    available: false,
  },
  {
    slug: "algerien",
    name: "Algérien",
    nativeName: "دزيري",
    region: "Algérie",
    description: "Proche de la darija, teinté d'histoire.",
    speakers: "~40 M",
    available: false,
  },
  {
    slug: "tunisien",
    name: "Tunisien",
    nativeName: "تونسي",
    region: "Tunisie",
    description: "Doux, méditerranéen.",
    speakers: "~12 M",
    available: false,
  },
  {
    slug: "golfe",
    name: "Arabe du Golfe",
    nativeName: "خليجي",
    region: "Péninsule Arabique",
    description: "Parlé aux Émirats, en Arabie, au Koweït.",
    speakers: "~40 M",
    available: false,
  },
  {
    slug: "classique",
    name: "Arabe classique",
    nativeName: "الفصحى التراثية",
    region: "Textes anciens",
    description: "Pour lire poésie, littérature et textes classiques.",
    speakers: "Lecture",
    available: false,
  },
];

export const VARIANT_LABEL: Record<string, string> = Object.fromEntries(
  VARIANTS.map((v) => [v.slug, v.name]),
);

export const OBJECTIVES = [
  "Parler avec ma famille",
  "Voyager",
  "Vivre dans un pays arabe",
  "Comprendre la culture",
  "Travailler",
  "Lire et écrire",
  "Comprendre les médias",
  "Comprendre l'arabe classique",
  "Autre",
];

export const INTERESTS = [
  "Famille",
  "Voyage",
  "Cuisine",
  "Musique",
  "Culture",
  "Religion & histoire",
  "Travail",
  "Relations sociales",
  "Cinéma & séries",
  "Actualité",
  "Vie quotidienne",
  "Entrepreneuriat",
];

export const EXPRESSIONS: Expression[] = [
  {
    id: "e1",
    variant: "libanais",
    arabic: "كيفك؟",
    translit: "kifak? / kifik?",
    translation: "Comment vas-tu ?",
    note: "Informel, à Beyrouth. Réponse standard : Mnih (bien).",
  },
  {
    id: "e2",
    variant: "fusha",
    arabic: "كَيْفَ حَالُكَ؟",
    translit: "kayfa ḥāluka?",
    translation: "Comment vas-tu ? (standard)",
    note: "Forme classique, valable partout à l'écrit.",
  },
  {
    id: "e3",
    variant: "darija",
    arabic: "كيداير؟",
    translit: "kidayr? / kidayra?",
    translation: "Comment ça va ?",
    note: "Au Maroc, informel. Réponse : labas (ça va).",
  },
];

export const VOCAB: Vocab[] = [
  { id: "v1", variant: "fusha", arabic: "مَرْحَبًا", translit: "marḥaban", translation: "Bonjour", category: "Salutations" },
  { id: "v2", variant: "fusha", arabic: "شُكْرًا", translit: "shukran", translation: "Merci", category: "Salutations" },
  { id: "v3", variant: "fusha", arabic: "نَعَم", translit: "naʿam", translation: "Oui", category: "Base" },
  { id: "v4", variant: "fusha", arabic: "لا", translit: "lā", translation: "Non", category: "Base" },
  { id: "v5", variant: "fusha", arabic: "مِنْ فَضْلِك", translit: "min faḍlik", translation: "S'il te plaît", category: "Salutations" },
  { id: "v6", variant: "libanais", arabic: "أهلاً", translit: "ahla", translation: "Salut", category: "Salutations" },
  { id: "v7", variant: "libanais", arabic: "منيح", translit: "mnih", translation: "Bien", category: "Base" },
  { id: "v8", variant: "libanais", arabic: "شو", translit: "shu", translation: "Quoi", category: "Questions" },
  { id: "v9", variant: "libanais", arabic: "بحبك", translit: "bḥibbak", translation: "Je t'aime", category: "Émotions" },
  { id: "v10", variant: "libanais", arabic: "يلا", translit: "yalla", translation: "Allez / Vas-y", category: "Base" },
  { id: "v11", variant: "darija", arabic: "لاباس", translit: "labas", translation: "Ça va", category: "Salutations" },
  { id: "v12", variant: "darija", arabic: "بزّاف", translit: "bezzaf", translation: "Beaucoup", category: "Base" },
  { id: "v13", variant: "darija", arabic: "واخا", translit: "wakha", translation: "D'accord", category: "Base" },
  { id: "v14", variant: "darija", arabic: "فين", translit: "fin", translation: "Où", category: "Questions" },
  { id: "v15", variant: "darija", arabic: "بسلامة", translit: "bslama", translation: "Au revoir", category: "Salutations" },
];

// ---- COURSES ----
function mkLesson(id: string, moduleId: string, title: string, desc: string, minutes = 8): Course["modules"][number]["lessons"][number] {
  return {
    id,
    moduleId,
    title,
    description: desc,
    minutes,
    xp: 15,
    steps: [
      { type: "intro", title, body: desc },
      { type: "flashcard", arabic: "مَرْحَبًا", translit: "marḥaban", translation: "Bonjour" },
      {
        type: "choice",
        prompt: "Que signifie ce mot ?",
        arabic: "شُكْرًا",
        translit: "shukran",
        options: ["Bonjour", "Merci", "S'il te plaît", "Au revoir"],
        correct: 1,
      },
      {
        type: "order",
        prompt: "Remets la phrase dans l'ordre : « Bonjour, comment vas-tu ? »",
        tokens: ["حالك", "كيف", "،", "مرحبا"],
        correct: ["مرحبا", "،", "كيف", "حالك"],
      },
      {
        type: "translate",
        prompt: "Traduis en français",
        arabic: "شُكْرًا",
        translit: "shukran",
        answer: "merci",
      },
      {
        type: "listen",
        arabic: "مَرْحَبًا",
        translit: "marḥaban",
        options: ["marḥaban", "shukran", "min faḍlik"],
        correct: 0,
      },
    ],
  };
}

export const COURSES: Course[] = [
  {
    id: "fusha-beginner",
    variant: "fusha",
    title: "Fusha — Débuter",
    description: "Les fondations : alphabet, sons et premiers échanges.",
    level: "A1",
    modules: [
      {
        id: "fusha-m1",
        courseId: "fusha-beginner",
        title: "Alphabet & prononciation",
        description: "Découvrir les lettres et sons de l'arabe.",
        xpReward: 120,
        lessons: [
          mkLesson("fusha-m1-l1", "fusha-m1", "Les 5 premières lettres", "ا ب ت ث ج"),
          mkLesson("fusha-m1-l2", "fusha-m1", "Voyelles courtes", "Fatḥa, kasra, ḍamma"),
          mkLesson("fusha-m1-l3", "fusha-m1", "Sons emphatiques", "ص ض ط ظ"),
        ],
      },
      {
        id: "fusha-m2",
        courseId: "fusha-beginner",
        title: "Salutations",
        description: "Dire bonjour et politesse essentielle.",
        xpReward: 100,
        lessons: [
          mkLesson("fusha-m2-l1", "fusha-m2", "Bonjour et bonsoir", "مرحبا، مساء الخير"),
          mkLesson("fusha-m2-l2", "fusha-m2", "Merci et s'il te plaît", "شكرا، من فضلك"),
          mkLesson("fusha-m2-l3", "fusha-m2", "Comment vas-tu ?", "كيف حالك؟"),
        ],
      },
      {
        id: "fusha-m3",
        courseId: "fusha-beginner",
        title: "Se présenter",
        description: "Dire son nom, son âge, d'où l'on vient.",
        xpReward: 130,
        lessons: [
          mkLesson("fusha-m3-l1", "fusha-m3", "Je m'appelle…", "اسمي…"),
          mkLesson("fusha-m3-l2", "fusha-m3", "Je viens de…", "أنا من…"),
          mkLesson("fusha-m3-l3", "fusha-m3", "Enchanté", "تشرّفت"),
        ],
      },
    ],
  },
  {
    id: "libanais-beginner",
    variant: "libanais",
    title: "Libanais — Débuter",
    description: "Parler comme à Beyrouth, dans la famille et entre amis.",
    level: "A1",
    modules: [
      {
        id: "leb-m1",
        courseId: "libanais-beginner",
        title: "Salutations quotidiennes",
        description: "Kifak, ahla, marhaba.",
        xpReward: 100,
        lessons: [
          mkLesson("leb-m1-l1", "leb-m1", "Ahla et marhaba", "أهلا / مرحبا"),
          mkLesson("leb-m1-l2", "leb-m1", "Kifak / kifik", "كيفك"),
          mkLesson("leb-m1-l3", "leb-m1", "Mnih, tayyeb", "منيح، طيب"),
        ],
      },
      {
        id: "leb-m2",
        courseId: "libanais-beginner",
        title: "Famille & amis",
        description: "Parler des tiens.",
        xpReward: 110,
        lessons: [
          mkLesson("leb-m2-l1", "leb-m2", "Ma famille", "عيلتي"),
          mkLesson("leb-m2-l2", "leb-m2", "Mes amis", "رفقاتي"),
          mkLesson("leb-m2-l3", "leb-m2", "Je t'aime", "بحبك"),
        ],
      },
      {
        id: "leb-m3",
        courseId: "libanais-beginner",
        title: "Commander à manger",
        description: "Au restaurant, au café.",
        xpReward: 120,
        lessons: [
          mkLesson("leb-m3-l1", "leb-m3", "Je voudrais…", "بدي…"),
          mkLesson("leb-m3-l2", "leb-m3", "Un café stp", "قهوة لو سمحت"),
          mkLesson("leb-m3-l3", "leb-m3", "L'addition", "الحساب"),
        ],
      },
    ],
  },
  {
    id: "darija-beginner",
    variant: "darija",
    title: "Darija — Débuter",
    description: "Parler avec les Marocains dès demain.",
    level: "A1",
    modules: [
      {
        id: "dar-m1",
        courseId: "darija-beginner",
        title: "Expressions essentielles",
        description: "Salam, labas, wakha.",
        xpReward: 100,
        lessons: [
          mkLesson("dar-m1-l1", "dar-m1", "Salam et labas", "سلام، لاباس"),
          mkLesson("dar-m1-l2", "dar-m1", "Wakha & bslama", "واخا، بسلامة"),
          mkLesson("dar-m1-l3", "dar-m1", "Choukran bezzaf", "شكرا بزاف"),
        ],
      },
      {
        id: "dar-m2",
        courseId: "darija-beginner",
        title: "Faire connaissance",
        description: "Nom, origine, métier.",
        xpReward: 110,
        lessons: [
          mkLesson("dar-m2-l1", "dar-m2", "Smiti…", "سميتي…"),
          mkLesson("dar-m2-l2", "dar-m2", "Ana men…", "أنا من…"),
          mkLesson("dar-m2-l3", "dar-m2", "Kandir…", "كندير…"),
        ],
      },
      {
        id: "dar-m3",
        courseId: "darija-beginner",
        title: "Se déplacer en ville",
        description: "Taxi, souk, direction.",
        xpReward: 120,
        lessons: [
          mkLesson("dar-m3-l1", "dar-m3", "Fin kayn…", "فين كاين…"),
          mkLesson("dar-m3-l2", "dar-m3", "Bghit nemshi l…", "بغيت نمشي ل…"),
          mkLesson("dar-m3-l3", "dar-m3", "Chhal?", "شحال؟"),
        ],
      },
    ],
  },
];

export const DIALECT_COMPARISONS: DialectComparison[] = [
  {
    french: "Comment vas-tu ?",
    entries: [
      { variant: "fusha", arabic: "كَيْفَ حَالُكَ؟", translit: "kayfa ḥāluka?" },
      { variant: "libanais", arabic: "كيفك؟", translit: "kifak?" },
      { variant: "darija", arabic: "كيداير؟", translit: "kidayr?" },
      { variant: "egyptien", arabic: "إزيك؟", translit: "izzayak?" },
    ],
  },
  {
    french: "Merci",
    entries: [
      { variant: "fusha", arabic: "شُكْرًا", translit: "shukran" },
      { variant: "libanais", arabic: "مرسي / شكراً", translit: "mersi / shukran" },
      { variant: "darija", arabic: "شكرا بزاف", translit: "shukran bezzaf" },
      { variant: "egyptien", arabic: "شكراً", translit: "shukran" },
    ],
  },
  {
    french: "Combien ça coûte ?",
    entries: [
      { variant: "fusha", arabic: "بِكَمْ هَذَا؟", translit: "bikam hādhā?" },
      { variant: "libanais", arabic: "قدّيش؟", translit: "addēsh?" },
      { variant: "darija", arabic: "بشحال؟", translit: "bshḥal?" },
      { variant: "egyptien", arabic: "بكام دة؟", translit: "bikām da?" },
    ],
  },
  {
    french: "Je t'aime",
    entries: [
      { variant: "fusha", arabic: "أُحِبُّكَ", translit: "uḥibbuka" },
      { variant: "libanais", arabic: "بحبك", translit: "bḥibbak" },
      { variant: "darija", arabic: "كنبغيك", translit: "kanbghik" },
      { variant: "egyptien", arabic: "بحبك", translit: "baḥibbak" },
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { slug: "first-word", title: "Premier mot", description: "Tu as appris ton premier mot.", icon: "✶", unlocked: true },
  { slug: "first-lesson", title: "Première leçon", description: "Une leçon terminée.", icon: "◆", unlocked: true },
  { slug: "reader", title: "Lecteur débutant", description: "Lire 10 mots en arabe.", icon: "❋", unlocked: true },
  { slug: "week", title: "Une semaine régulière", description: "7 jours d'affilée.", icon: "✦", unlocked: false },
  { slug: "greetings", title: "Maître des salutations", description: "Toutes les salutations maîtrisées.", icon: "❖", unlocked: false },
  { slug: "100words", title: "100 mots maîtrisés", description: "100 mots dans ta mémoire.", icon: "◉", unlocked: false },
  { slug: "explorer-lb", title: "Explorateur du Liban", description: "Module libanais terminé.", icon: "▲", unlocked: false },
  { slug: "explorer-ma", title: "Explorateur du Maroc", description: "Module marocain terminé.", icon: "△", unlocked: false },
  { slug: "5min-chat", title: "Conversation de 5 min", description: "Une vraie discussion.", icon: "◐", unlocked: false },
];

export const ALPHABET_LETTERS = [
  { letter: "ا", name: "alif", sound: "a / â" },
  { letter: "ب", name: "bāʾ", sound: "b" },
  { letter: "ت", name: "tāʾ", sound: "t" },
  { letter: "ث", name: "thāʾ", sound: "th (think)" },
  { letter: "ج", name: "jīm", sound: "j / dj" },
  { letter: "ح", name: "ḥāʾ", sound: "ḥ guttural" },
  { letter: "خ", name: "khāʾ", sound: "kh (jota)" },
  { letter: "د", name: "dāl", sound: "d" },
  { letter: "ذ", name: "dhāl", sound: "th (this)" },
  { letter: "ر", name: "rāʾ", sound: "r roulé" },
  { letter: "ز", name: "zāy", sound: "z" },
  { letter: "س", name: "sīn", sound: "s" },
  { letter: "ش", name: "shīn", sound: "ch" },
  { letter: "ص", name: "ṣād", sound: "s emphatique" },
  { letter: "ض", name: "ḍād", sound: "d emphatique" },
  { letter: "ط", name: "ṭāʾ", sound: "t emphatique" },
  { letter: "ظ", name: "ẓāʾ", sound: "z emphatique" },
  { letter: "ع", name: "ʿayn", sound: "ʿ guttural" },
  { letter: "غ", name: "ghayn", sound: "gh (r français)" },
  { letter: "ف", name: "fāʾ", sound: "f" },
  { letter: "ق", name: "qāf", sound: "q profond" },
  { letter: "ك", name: "kāf", sound: "k" },
  { letter: "ل", name: "lām", sound: "l" },
  { letter: "م", name: "mīm", sound: "m" },
  { letter: "ن", name: "nūn", sound: "n" },
  { letter: "ه", name: "hāʾ", sound: "h aspiré" },
  { letter: "و", name: "wāw", sound: "w / ou" },
  { letter: "ي", name: "yāʾ", sound: "y / i" },
];

export const SCENARIOS = [
  { id: "intro", title: "Se présenter", desc: "Nom, origine, ce que tu fais." },
  { id: "resto", title: "Commander au restaurant", desc: "Menu, boissons, addition." },
  { id: "family", title: "Parler avec la famille", desc: "Les tiens, leurs nouvelles." },
  { id: "taxi", title: "Prendre un taxi", desc: "Direction, prix, discussion." },
  { id: "shopping", title: "Acheter quelque chose", desc: "Négocier au souk." },
  { id: "directions", title: "Demander son chemin", desc: "Se repérer en ville." },
  { id: "friends", title: "Entre amis", desc: "Blagues, plans, ambiances." },
  { id: "interview", title: "Entretien pro", desc: "Expérience, motivation." },
  { id: "travel", title: "Voyage", desc: "Aéroport, hôtel, découvertes." },
  { id: "free", title: "Discussion libre", desc: "Comme avec un pote." },
];

export const WEEKLY_ACTIVITY = [
  { day: "Lun", minutes: 12 },
  { day: "Mar", minutes: 18 },
  { day: "Mer", minutes: 8 },
  { day: "Jeu", minutes: 22 },
  { day: "Ven", minutes: 15 },
  { day: "Sam", minutes: 0 },
  { day: "Dim", minutes: 10 },
];

export const SKILL_SCORES = [
  { skill: "Vocabulaire", value: 68 },
  { skill: "Compréhension", value: 55 },
  { skill: "Expression orale", value: 42 },
  { skill: "Lecture", value: 60 },
  { skill: "Écriture", value: 30 },
  { skill: "Grammaire", value: 48 },
];