export type Platform = {
  id: "deezer" | "apple" | "amazon" | "spotify";
  label: string;
  url: string;
  priority: number; // 1 = très visible, 4 = discret
};

/**
 * Plateformes d'écoute du podcast.
 * Deezer / Apple / Amazon mis en avant.
 * Spotify volontairement discret (cf. brief).
 */
export const platforms: Platform[] = [
  {
    id: "deezer",
    label: "Deezer",
    url: "https://www.deezer.com/fr/show/1001047492",
    priority: 1,
  },
  {
    id: "apple",
    label: "Apple Podcasts",
    url: "https://podcasts.apple.com/fr/podcast/fier-e-s/id1754599625",
    priority: 2,
  },
  {
    id: "amazon",
    label: "Amazon Music",
    url: "https://music.amazon.com/podcasts/87b1fa46-4249-4aeb-bd97-f2c882c90ed4/fier-e-s",
    priority: 3,
  },
  {
    id: "spotify",
    label: "Spotify",
    url: "https://open.spotify.com/show/50cLwcqUBXqzMopriM25YA",
    priority: 4,
  },
];

export const host = {
  name: "Thomas Chinarro",
  pronouns: "il/lui",
  role: "Host & médiateur",
  // Bio générée — à remplacer par le vrai texte de Thomas.
  // TODO: récupérer la vraie bio.
  bio: "Médiateur culturel, animateur d'espaces de parole et amoureux des récits qui dérangent un peu. Thomas tient le micro de Fier.e.s depuis le tout premier épisode : il pose les questions qu'on n'ose pas, écoute sans couper, et tient la conversation jusqu'au bout — même quand ça vacille.",
} as const;

export type Episode = {
  slug: string;
  number: number;
  season: number;
  title: string;
  guest: string;
  guestRole: string;
  description: string;
  duration: string; // ex. "42 min"
  publishedAt: string; // ISO date
  // TODO: récupérer les vraies miniatures via API plateformes (Deezer / Apple Podcasts feed).
  // Pour l'instant on génère un cover typographique côté composant.
  coverUrl?: string;
  links: Partial<Record<Platform["id"], string>>;
  featured?: boolean;
};

/**
 * Épisodes phares (issus du brief — invité·es confirmé·es).
 * Les autres épisodes sont générés en placeholder pour atteindre 30+ entrées
 * crédibles dans le listing. À remplacer par les vrais titres + slugs au fur
 * et à mesure.
 */
export const featuredEpisodes: Episode[] = [
  {
    slug: "elips",
    number: 32,
    season: 3,
    title: "Elips — drag, monstre, et liberté",
    guest: "Elips",
    guestRole: "Drag artist",
    description:
      "Drag club kid, performeur·euse à l'imaginaire monstrueux : Elips parle de bidouille, de personnage, et de ce que ça veut dire occuper la scène quand on ne ressemble à rien de connu.",
    duration: "47 min",
    publishedAt: "2025-05-06",
    links: {},
    featured: true,
  },
  {
    slug: "paloma",
    number: 30,
    season: 3,
    title: "Paloma — la couronne et ce qui vient après",
    guest: "Paloma",
    guestRole: "Drag — gagnante Drag Race France",
    description:
      "Paloma revient sur l'avant, le pendant et le très étrange après d'une victoire à Drag Race France. Conversation sur la fatigue, la communauté et ce que ça change quand 1 million de personnes te regardent.",
    duration: "52 min",
    publishedAt: "2025-04-22",
    links: {},
    featured: true,
  },
  {
    slug: "francois-chaignaud",
    number: 28,
    season: 3,
    title: "François Chaignaud — corps mystiques, scène politique",
    guest: "François Chaignaud",
    guestRole: "Danseur & chorégraphe",
    description:
      "Voix de fausset, costumes baroques et plateaux d'opéra : François Chaignaud raconte comment il bâtit des spectacles à la croisée de la danse, du chant et du sacré queer.",
    duration: "49 min",
    publishedAt: "2025-04-08",
    links: {},
    featured: true,
  },
  {
    slug: "lou-trotignon",
    number: 25,
    season: 3,
    title: "Lou Trotignon — rire de soi, rire pour vivre",
    guest: "Lou Trotignon",
    guestRole: "Humoriste & militant",
    description:
      "Du stand-up à la scène politique, Lou Trotignon parle d'écriture, de transidentité, de blagues qu'on garde, et de celles qu'on jette à la poubelle.",
    duration: "44 min",
    publishedAt: "2025-03-18",
    links: {},
    featured: true,
  },
  {
    slug: "nous-toutes-33",
    number: 22,
    season: 2,
    title: "Nous Toutes 33 — colère organisée",
    guest: "Nous Toutes 33",
    guestRole: "Collectif féministe",
    description:
      "Trois militantes du collectif Nous Toutes 33 racontent l'organisation d'une marche, la sororité concrète, et le travail de fond entre deux gros temps médiatiques.",
    duration: "55 min",
    publishedAt: "2025-02-25",
    links: {},
    featured: true,
  },
  {
    slug: "matthieu-barbin",
    number: 20,
    season: 2,
    title: "Matthieu Barbin — écrire pour ne pas disparaître",
    guest: "Matthieu Barbin",
    guestRole: "Écrivain & artiste",
    description:
      "Matthieu Barbin parle d'écriture comme acte de survie, de l'archive queer, et de la manière dont on transmet quand on n'a pas eu de modèles.",
    duration: "51 min",
    publishedAt: "2025-02-04",
    links: {},
    featured: true,
  },
];

/**
 * Épisodes placeholder pour étoffer le listing — invité·es fictif·ves
 * mais crédibles. À remplacer par les vraies données dès qu'on a accès au RSS.
 * TODO: parser le flux RSS Deezer/Apple et générer cette liste auto.
 */
const placeholderTitles: Array<{
  title: string;
  guest: string;
  guestRole: string;
}> = [
  { title: "Le placard, et après", guest: "Yann B.", guestRole: "Témoignage" },
  { title: "Polyamour mode d'emploi", guest: "Sasha & Jules", guestRole: "Conversation" },
  { title: "La nuit comme refuge", guest: "DJ Mercure", guestRole: "Selector" },
  { title: "Trans et au travail", guest: "Camille R.", guestRole: "Activiste" },
  { title: "Drag adolescent·e", guest: "Pixie", guestRole: "Performer" },
  { title: "Le deuil queer", guest: "Inès L.", guestRole: "Psychologue" },
  { title: "Sexe sobre", guest: "Anonyme", guestRole: "Témoignage" },
  { title: "Lesbiennes, vraiment ?", guest: "Mona & Ada", guestRole: "Autrices" },
  { title: "Une vieille tantouze", guest: "Bernard, 74", guestRole: "Mémoire vive" },
  { title: "Père, fier, fatigué", guest: "Karim H.", guestRole: "Paternité" },
  { title: "L'amour à 16 ans", guest: "Léna", guestRole: "Lycéenne militante" },
  { title: "Église queer, vraiment ?", guest: "Frère Élio", guestRole: "Théologien" },
  { title: "TikTok m'a sauvé·e", guest: "Mae", guestRole: "Créa contenu" },
  { title: "Survivre au lycée", guest: "Sami", guestRole: "Étudiant·e" },
  { title: "Faire enfant ensemble", guest: "Co-parents anonymes", guestRole: "Conversation" },
  { title: "Drag pour les vieilles", guest: "Mère Térèse", guestRole: "Drag senior" },
  { title: "Sport et placard", guest: "Tom V.", guestRole: "Footballeur amateur" },
  { title: "La psy, enfin", guest: "Dr. Inès P.", guestRole: "Psychiatre" },
  { title: "Banlieue & fierté", guest: "Riad", guestRole: "Témoignage" },
  { title: "Couleur de peau, couleur d'amour", guest: "Aïssa & Cléo", guestRole: "Couple" },
  { title: "Bisexuel·le, encore et toujours", guest: "Margaux", guestRole: "Autrice" },
  { title: "Le mariage, et alors ?", guest: "Jean-Phi & David", guestRole: "10 ans après" },
  { title: "Polices et marches", guest: "Acceptess-T", guestRole: "Association" },
  { title: "Le club c'est politique", guest: "Mascarpone", guestRole: "Promoteur·rice" },
  { title: "Asexuel·le et amoureux·se", guest: "Sol", guestRole: "Témoignage" },
  { title: "Drag King 101", guest: "Le Comte", guestRole: "Drag King" },
];

function buildPlaceholders(): Episode[] {
  const start = 1;
  return placeholderTitles.map((p, i) => {
    const number = start + i;
    const season =
      number <= 10 ? 1 : number <= 20 ? 2 : number <= 30 ? 3 : 4;
    // Publication tous les 7 jours en remontant depuis fin 2024.
    const base = new Date("2024-01-15");
    base.setDate(base.getDate() + i * 7);
    return {
      slug: `ep-${number}`,
      number,
      season,
      title: p.title,
      guest: p.guest,
      guestRole: p.guestRole,
      description:
        "Conversation queer sans filtre, à écouter en marchant, en cuisinant, ou en attendant le métro à minuit.",
      duration: `${36 + ((i * 3) % 18)} min`,
      publishedAt: base.toISOString().slice(0, 10),
      links: {},
    };
  });
}

const placeholderEpisodes = buildPlaceholders();

/**
 * Liste complète des épisodes, triée du plus récent au plus ancien.
 */
export const allEpisodes: Episode[] = [
  ...featuredEpisodes,
  ...placeholderEpisodes,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const latestEpisode: Episode = allEpisodes[0];

export type Season = {
  number: number;
  title: string;
  pitch: string;
  episodes: Episode[];
};

/**
 * Regroupe les épisodes par saison.
 */
export const seasons: Season[] = (() => {
  const map = new Map<number, Episode[]>();
  for (const ep of allEpisodes) {
    if (!map.has(ep.season)) map.set(ep.season, []);
    map.get(ep.season)!.push(ep);
  }
  const seasonMeta: Record<number, { title: string; pitch: string }> = {
    1: {
      title: "Saison 1 — Les premières voix",
      pitch: "On démarre. Premiers invité·es, premiers récits, premiers virages.",
    },
    2: {
      title: "Saison 2 — Corps & colères",
      pitch: "Les corps queers, les colères organisées, les premières marches.",
    },
    3: {
      title: "Saison 3 — La scène & le monde",
      pitch: "Drag, danse, écriture : on monte sur scène et on regarde ce que ça raconte.",
    },
    4: {
      title: "Saison 4 — En cours",
      pitch: "La saison en train de s'écrire. Un nouvel épisode chaque semaine.",
    },
  };
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([number, eps]) => ({
      number,
      title: seasonMeta[number]?.title ?? `Saison ${number}`,
      pitch: seasonMeta[number]?.pitch ?? "",
      episodes: eps,
    }));
})();
