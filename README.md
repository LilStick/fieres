# Fier.e.s — podcast & festival

> Site officiel du **podcast Fier.e.s** — un podcast queer et engagé qui met
> en lumière les voix qu'on n'entend pas assez.
> Le **festival** annuel, organisé par RAGE, dispose d'une page dédiée.

🔗 **Écouter** → Deezer · Apple · Amazon · Spotify (cf. footer)
📸 **Instagram** → [@fier.e.s](https://instagram.com/fier.e.s)
🎫 **Billetterie festival** → [HelloAsso](https://www.helloasso.com/associations/rage/evenements/festival-fier-e-s)
📧 **Contact** → fier.e.s.podcast@gmail.com

---

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict
- **Tailwind CSS** + **Framer Motion** + **Lenis** (smooth scroll)
- **Lucide React** pour les icônes
- Fonts : **Playfair Display** (titres) + **Space Grotesk** (corps), via `next/font`

## Démarrage rapide

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

Compatible Vercel sans configuration. Push, import, c'est en ligne.

## Sitemap

| Route | Rôle |
|---|---|
| `/` | Home podcast (hub) — hero, épisodes phares, résidence, hôte, festival featured, social wall |
| `/episodes` | Catalogue complet avec filtre par saison |
| `/residence` | Résidence Gaîté Lyrique (Ebony, Tess Kirby) |
| `/festival` | Page festival (édition à venir, billetterie) — ex-home V1 |
| `/a-propos` | Manifeste, hôte, contact |
| `/partenariat` | Sponsoring, co-prod, partenaire festival, kit presse |

Un **bandeau sticky** orange (festival promo) reste affiché sur toutes les
pages tant que l'utilisateur·rice ne le ferme pas (état en sessionStorage).

Le **CTA navbar** est contextuel :
- partout sauf festival → "Dernier épisode" → ouvre une modale de choix de plateforme
- sur `/festival/*` → "Billets" → HelloAsso

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Lenis + Navbar + Footer + bandeau festival
│   ├── globals.css
│   ├── page.tsx                # Home podcast
│   ├── episodes/page.tsx       # Catalogue avec onglets saison
│   ├── residence/page.tsx      # Page résidence Gaîté Lyrique
│   ├── festival/page.tsx       # Page festival (assemble les sections V1)
│   ├── a-propos/page.tsx       # Manifeste + hôte + contact
│   └── partenariat/page.tsx    # Sponsoring + kit presse
├── components/
│   ├── shared/                 # Composants utilisés par podcast ET festival
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── festival-banner.tsx     # Bandeau sticky promo
│   │   ├── listen-modal.tsx        # Modale "choisir une plateforme"
│   │   ├── smooth-scroll-provider.tsx  # Lenis
│   │   ├── custom-cursor.tsx
│   │   ├── reveal.tsx
│   │   └── star.tsx
│   ├── podcast/                # Composants spécifiques home podcast
│   │   ├── hero.tsx
│   │   ├── featured-episodes.tsx
│   │   ├── host-section.tsx
│   │   ├── residence-highlight.tsx
│   │   ├── festival-feature.tsx
│   │   ├── social-wall.tsx
│   │   └── episode-cover.tsx       # Cover typographique placeholder
│   └── festival/               # Composants page festival (héritage V1)
│       ├── hero.tsx
│       ├── programme.tsx
│       ├── artists.tsx
│       ├── artist-portrait.tsx
│       ├── talk.tsx
│       ├── practical-info.tsx
│       └── partners.tsx
├── data/
│   ├── brand.ts                # Marque commune (nom, socials, email, nav)
│   ├── podcast.ts              # Épisodes, hôte, plateformes
│   ├── residence.ts            # Résidence Gaîté Lyrique
│   └── festival.ts             # Programme, artistes, lieu, partenaires
└── lib/
    └── utils.ts                # cn() pour Tailwind merge
```

## Édition du contenu

| Variable | Fichier | Contrôle |
|---|---|---|
| `brand` | `data/brand.ts` | Nom, tagline, contact, réseaux, nav |
| `host` | `data/podcast.ts` | Hôte (Thomas Chinarro) |
| `platforms` | `data/podcast.ts` | Plateformes d'écoute + priorité d'affichage |
| `featuredEpisodes` | `data/podcast.ts` | 6 épisodes mis en avant sur la home |
| `allEpisodes` / `seasons` | `data/podcast.ts` | Catalogue complet + regroupement saison |
| `residence` | `data/residence.ts` | Résidence Gaîté Lyrique |
| `festival` | `data/festival.ts` | Date, lieu, billetterie |
| `programme` | `data/festival.ts` | Créneaux du festival |
| `artists` | `data/festival.ts` | Artistes sur scène |
| `partners` | `data/festival.ts` | Partenaires (Césure, Ville de Paris…) |

## TODOs (consultables aussi via `grep -rn TODO src/`)

| Sujet | Où |
|---|---|
| Récupérer les vraies miniatures épisodes via API Deezer/Apple feed | `data/podcast.ts`, `episode-cover.tsx` |
| Remplacer les épisodes placeholder par le vrai flux RSS | `data/podcast.ts` |
| Récupérer la vraie bio de Thomas Chinarro | `data/podcast.ts` |
| Brancher l'oEmbed Instagram/TikTok officiel pour les vrais clips | `social-wall.tsx` |
| Remplacer les chiffres audience par les vrais KPI | `partenariat/page.tsx` |
| Confirmer les dates de la résidence Gaîté Lyrique | `residence.ts`, `residence/page.tsx` |
| Confirmer le domaine final (fier-e-s.fr ?) | `brand.ts` |
| Confirmer l'URL TikTok réelle du compte podcast | `brand.ts` |
| Ajouter un onglet "Transcription" sur la page épisodes (UI prête, contenu plus tard) | `episodes/page.tsx` |
| Migrer vers un CMS (Sanity recommandé) quand l'ajout d'épisode devient pénible | — |

## Accessibilité

- `lang="fr"`, hiérarchie `h1` → `h3` cohérente
- Contrastes vérifiés (orange `#F4620A` + ink `#0A0A0A` + bone `#F7F2EA`)
- Focus visible orange sur tout élément interactif
- Smooth scroll Lenis désactivé si `prefers-reduced-motion: reduce`
- Curseur custom désactivé sur écran tactile et `prefers-reduced-motion: reduce`
- Modale de plateforme : trap clavier (ESC ferme), `role="dialog"` + `aria-modal`
- Aucun autoplay audio/vidéo
- Bandeau festival fermable (mémorisé en sessionStorage)
- Pas de cookie banner agressif

## Scripts npm

| Script | Action |
|---|---|
| `npm run dev` | Lance le serveur de dev sur `:3000` |
| `npm run build` | Build production optimisé |
| `npm start` | Sert le build production |
| `npm run lint` | Lint le projet |

## Brief V2 (à remplir par l'équipe)

📋 **[BRIEF_V2.md](./BRIEF_V2.md)** — questionnaire à remplir pour caler une V3
plus tard : programmation complète, identité, billetterie, accessibilité,
technique, budget.

## Crédits

Podcast & festival organisés par **RAGE**.

Programmation, partenaires et illustrations originales : © respectifs.
Site V2 — site portfolio podcast fait avec amour, paillettes et caféine.
