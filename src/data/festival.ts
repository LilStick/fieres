export const festival = {
  name: "Festival Fier.e.s",
  edition: "Édition 2025",
  tagline: "Un jour, une nuit. Drag, musique, créateur·rices, parole queer.",
  manifesto:
    "Fier.e.s c'est une journée pour célébrer les corps, les voix et les imaginaires queer. Du marché aux drag shows, du talk à la dernière danse — un espace libre, festif et politique, ouvert à toutes et tous.",
  date: {
    label: "Samedi 13 juin 2025",
    iso: "2025-06-13",
    weekday: "Samedi",
    day: "13",
    month: "Juin",
    year: "2025",
  },
  hours: "16h — 00h",
  venue: {
    name: "Césure",
    address: "13 rue Santeuil, 75005 Paris",
    metro: "Censier-Daubenton (ligne 7)",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=C%C3%A9sure+13+rue+Santeuil+75005+Paris",
  },
  ticketsUrl:
    "https://www.helloasso.com/associations/rage/evenements/festival-fier-e-s",
  instagram: {
    handle: "@fier.e.s",
    url: "https://instagram.com/fier.e.s",
  },
  organizer: {
    name: "RAGE",
    description: "Association queer pour la fête et la lutte.",
  },
} as const;

export type ProgramSlot = {
  time: string;
  endTime?: string;
  title: string;
  description: string;
  icon: "shopping-bag" | "mic" | "sparkles" | "music";
  tag: string;
};

export const programme: ProgramSlot[] = [
  {
    time: "16h",
    endTime: "20h",
    title: "Marché des créateur·rices",
    description:
      "Bijoux, fanzines, sérigraphie, vêtements et tatouages : une vingtaine d'artisan·es queer prennent leurs quartiers à Césure.",
    icon: "shopping-bag",
    tag: "Marché",
  },
  {
    time: "18h",
    endTime: "19h30",
    title: "Talk — Les Inverti·es",
    description:
      "Conversation avec Ophélie Joh, Thx4Crying et Fag Plastic. Représentation, internet, prise de parole : trois voix queer qui dérangent.",
    icon: "mic",
    tag: "Talk",
  },
  {
    time: "20h",
    endTime: "22h",
    title: "Drag Show",
    description:
      "Mami Watta (Drag Race France), Sax on the Beach et Snow prennent la scène. Lip-sync, perruques, paillettes, gros chœurs.",
    icon: "sparkles",
    tag: "Drag",
  },
  {
    time: "22h",
    endTime: "00h",
    title: "Showcase — Tess Kirby",
    description:
      "Pop hyper-saturée, basses qui poussent, refrains qui rentrent. Live + DJ set pour finir la nuit comme il se doit.",
    icon: "music",
    tag: "Live",
  },
];

export type Artist = {
  name: string;
  role: string;
  bio: string;
  link?: string;
  /** Accent for the placeholder card */
  accent: "bone" | "orange" | "ink" | "white";
};

export const artists: Artist[] = [
  {
    name: "Mami Watta",
    role: "Drag — Drag Race France",
    bio: "Reine vaporeuse, langue acérée. Mami Watta apporte ses lipsyncs liquides et son aura tropicale.",
    accent: "orange",
  },
  {
    name: "Tess Kirby",
    role: "Showcase musical",
    bio: "Pop hyper-pop entre Charli XCX et un karaoké de minuit. Premier album à venir.",
    accent: "bone",
  },
  {
    name: "Sax on the Beach",
    role: "Drag",
    bio: "Drag baroque, costumes faits main, performances entre opéra et club kid.",
    accent: "ink",
  },
  {
    name: "Snow",
    role: "Drag",
    bio: "Glamour vintage et humour pince-sans-rire. Une présence scénique magnétique.",
    accent: "white",
  },
];

export type Speaker = {
  name: string;
  pitch: string;
};

export const speakers: Speaker[] = [
  {
    name: "Ophélie Joh",
    pitch: "Autrice & créatrice de contenus, voix queer du web francophone.",
  },
  {
    name: "Thx4Crying",
    pitch: "Artiste multidisciplinaire, parle d'amour, de chagrin et de luttes.",
  },
  {
    name: "Fag Plastic",
    pitch: "Performer & curator, agitateur de la scène queer parisienne.",
  },
];

export const partners = [
  { name: "Césure", note: "Lieu hôte" },
  { name: "Ville de Paris", note: "Soutien institutionnel" },
  { name: "SimiliQueer", note: "Partenaire média" },
  { name: "Les Inverti·es", note: "Partenaire programmation" },
  { name: "La Maison Étudiante", note: "Soutien" },
] as const;

export const practical = {
  accessibility:
    "Lieu accessible PMR. Toilettes non genrées. Espace calme disponible pendant toute la soirée.",
  bar: "Bar et restauration sur place toute la soirée — options véganes et sans alcool.",
  age: "Tout public, ambiance club à partir de 22h.",
  safer:
    "Espace safer : une équipe identifiée en t-shirt orange est présente toute la soirée pour t'écouter et intervenir si besoin.",
} as const;

export const navLinks = [
  { label: "Programme", href: "#programme" },
  { label: "Artistes", href: "#artistes" },
  { label: "Talk", href: "#talk" },
  { label: "Infos", href: "#infos" },
] as const;
