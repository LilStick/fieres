# 🎙️ Fier.e.s — Handover

> **Bienvenue.**
> Ce document est destiné à toi, l'ami·e qui reprend le projet.
> Il est volontairement verbeux : prends le temps de le lire en entier
> avant d'écrire la moindre ligne, ça t'évitera de réinventer la roue ou de
> partir dans une direction qui a déjà été tranchée.
>
> Tu utilises Claude Code aussi ? Tant mieux : un fichier `CLAUDE.md` est
> présent à la racine, il sera auto-chargé par Claude dans le repo et lui
> donne les conventions du projet sans que tu aies besoin de les redire.
> **Si tu modifies les conventions, mets `CLAUDE.md` à jour.**
>
> Ce repo a été démarré et structuré sur 3 sessions avec Claude. Ce
> document récapitule **tout** ce qui a été fait, **pourquoi**, et **ce qu'il
> reste à faire**. Bonne reprise 🧡

---

## 📑 Sommaire

1. [Le projet en 30 secondes](#1-le-projet-en-30-secondes)
2. [Historique des décisions](#2-historique-des-décisions)
3. [Setup & premier lancement](#3-setup--premier-lancement)
4. [Sitemap & UX](#4-sitemap--ux)
5. [Architecture du code](#5-architecture-du-code)
6. [Système de design](#6-système-de-design)
7. [Data layer (contenu)](#7-data-layer-contenu)
8. [Composants partagés en détail](#8-composants-partagés-en-détail)
9. [Composants spécifiques](#9-composants-spécifiques)
10. [Animations & smooth scroll](#10-animations--smooth-scroll)
11. [Assets et media kit](#11-assets-et-media-kit)
12. [Tous les TODOs](#12-tous-les-todos)
13. [Idées d'améliorations V3](#13-idées-daméliorations-v3)
14. [Conventions de code](#14-conventions-de-code)
15. [Pièges connus & gotchas](#15-pièges-connus--gotchas)
16. [Travailler avec Claude Code](#16-travailler-avec-claude-code)
17. [Déploiement](#17-déploiement)
18. [Accessibilité](#18-accessibilité)
19. [Glossaire & contacts](#19-glossaire--contacts)

---

## 1. Le projet en 30 secondes

**Fier.e.s** est un podcast queer et engagé porté par l'association **RAGE**,
animé par **Thomas Chinarro**. Le podcast est hebdomadaire, mixe table ronde
et portrait, dure 30-50 min, et a déjà 30+ épisodes répartis sur 4 saisons.

L'asso organise aussi chaque année un **festival** (drag shows, marché, talk,
showcase) — l'édition 2025 a eu lieu le 13 juin à Césure (Paris 5e). Le
statut de la page `/festival` (archive ? teaser 2026 ?) est **à décider avec
Thomas** (cf. section TODOs).

Le site qu'on a construit est un **portfolio podcast** avec une **page
festival** dédiée. Le podcast est central, le festival est mis en avant via
un bandeau sticky + une section featured sur la home.

**Stack** : Next.js 14 (App Router) + TypeScript strict + Tailwind + Framer
Motion + Lenis (smooth scroll).

**Stack volontairement légère** : pas de CMS, pas de DB, pas d'API. Tout est
hardcodé dans `src/data/*`. Le site est 100 % statique, déployable sur Vercel
en 1 clic.

### 🚦 Stratégie 2 phases (la chose la plus importante à comprendre)

L'objectif **n°1** est de **ship un site live et validé par Thomas le plus
vite possible**. On fait le minimum nécessaire pour qu'il puisse partager
le lien, et on garde les chantiers lourds pour plus tard.

**Phase 1 (toi, Arthur)** : intégrer le logo officiel, brancher le RSS
Anchor, optimiser les images, SEO basique, Lorem-ifier les textes inventés,
puis envoyer le lien à Thomas pour qu'il remplisse ses vrais textes.

**Phase 2 (post-launch)** : stats live (Instagram Graph API, TikTok Display
API), social wall oEmbed, page `/episodes/[slug]`, audits A11Y poussés,
Sentry, analytics, CMS Sanity, newsletter, multi-langue, PWA, transcriptions,
formulaires de candidature. On verra ensemble quand on aura le site en ligne.

→ **Toute la checklist Phase 1 ordonnée** est dans
[`TODO.md`](./TODO.md) (en haut du fichier).

---

## 2. Historique des décisions

Ce projet a évolué en 2 grosses étapes :

### V1 — site vitrine festival (1er sprint)

À la base, le site était une **landing page festival** : une seule home,
parallax, hero plein écran, sections programme/artistes/talk/infos/partenaires/footer.
Build à 151 kB First Load JS.

### V2 — pivot portfolio podcast (sprint actuel)

Au cours d'une seconde session, l'orientation a été repensée : le **podcast**
est en réalité le cœur de la marque, et le festival est un side-project
annuel. On a donc :

1. **Déplacé** toute l'ancienne home V1 vers `/festival` (inchangée)
2. **Reconstruit** une nouvelle home portfolio podcast
3. **Ajouté** les pages `/episodes`, `/residence`, `/a-propos`, `/partenariat`
4. **Mutualisé** Navbar + Footer dans le layout root
5. **Ajouté** un bandeau promo festival sticky et une modale d'écoute multi-plateformes
6. **Ajouté** Lenis pour le smooth scroll premium

### Réponses au brief — pourquoi chaque chose est comme elle est

Cette section te détaille **toutes les questions** posées pendant le brief
V2 et **les réponses validées**. Chaque ligne du site a une raison d'être
documentée ici. Lis-le en entier avant de proposer un changement structurel
— tu sauras ce qui a déjà été tranché.

#### Cadrage général

| Question posée | Réponse retenue | Implication concrète sur le site |
|---|---|---|
| Le podcast devient-il le cœur du site, et le festival une page parmi d'autres ? | **Oui** — podcast central, festival mis en avant car promotion en cours | Route `/` = home podcast. Route `/festival` séparée. Bandeau sticky + section featured pour le festival. |
| Podcast et festival : même marque ou marques séparées ? | **Même marque "Fier.e.s"** | Logo unique partout, footer unique, palette unique. |
| Y a-t-il une deadline ? | **ASAP — pour montrer au festival** | Pas de fioritures, on livre du fonctionnel rapidement. |

#### Identité éditoriale du podcast

| Question | Réponse | Conséquence |
|---|---|---|
| Pitch en une phrase ? | "Un podcast queer et engagé qui met en lumière les voix qu'on n'entend pas assez." | Utilisé comme `tagline` dans `brand.ts`, affiché en hero home + en metadata SEO. |
| Public cible ? | **Toute personne curieuse des récits queer / féministes** (pas seulement la communauté) | Le ton du site reste accueillant, pas in-group, lisible pour qui découvre. |
| Format des épisodes ? | **Mix table ronde + interview / portrait** | Le copy parle de "conversation", "portrait", "table ronde" — pas seulement "interview". |
| Durée moyenne ? | **30-50 min** | Affiché dans les meta de chaque épisode. |
| Fréquence ? | **Hebdomadaire** | Mention "Hebdo" sur le hero + dans le footer. |
| Thématiques récurrentes ? | **Toutes** : identités, drag, intimité, politique | Pas de filtre thématique imposé en V2 ; le copy embrasse l'éventail. |
| Saisons ? | **Oui, numérotées**. Dernier épisode mis en avant. Voir+ → liste classée par saison. | `seasons` array dans `podcast.ts`, onglets S1-S4 sur `/episodes`, featured "le plus récent" en haut. |

#### Hôte

| Question | Réponse | Conséquence |
|---|---|---|
| Combien d'hôtes ? | **1 seul** | Section "Aux manettes" en solo, pas de duo/trio. |
| Nom + pronoms + rôle ? | **Thomas Chinarro, il/lui, host & médiateur** | Hardcodé dans `host` (`data/podcast.ts`). |
| Photos HD dispos ? | **Non pour l'instant — placeholders** | Initiales "TC" sur fond orange (cards `host-section.tsx`, `a-propos/page.tsx`). |
| Bio courte ? | **Invente un placeholder cohérent** | Bio actuelle = générée. **À remplacer dès que Thomas envoie le vrai texte.** |

#### Épisodes & catalogue

| Question | Réponse | Conséquence |
|---|---|---|
| Combien d'épisodes existent ? | **30+** | Catalogue rempli (6 réels + 26 placeholders pour atteindre la masse crédible). |
| Lien RSS / plateformes ? | URLs fournies pour Deezer, Spotify, Amazon Music, Apple Podcasts | Tous les liens en dur dans `platforms` (`data/podcast.ts`). |
| 3-5 épisodes phares à mettre en avant ? | **6** : Elips, Paloma (gagnante Drag Race France), François Chaignaud (danseur/chorégraphe), Lou Trotignon (humoriste/militant), Nous Toutes 33 (collectif féministe), Matthieu Barbin (écrivain/artiste) | Section `<FeaturedEpisodes>` sur la home. Chaque card a titre + invité·e + rôle + descriptif. |
| Quel player audio embed ? | **Pas d'embed plateforme**. Modale "choisir une plateforme" en priorité Deezer, avec bouton vers chaque service. | Composant `<ListenModal>` ouvert depuis chaque CTA "Écouter". Aucun iframe Spotify/Deezer en V2. |
| Page dédiée par épisode ? | **Non, page par saison à la place** | `/episodes` liste toutes les saisons. Pas (encore) de `/episodes/[slug]`. |
| Filtres / recherche ? | **Filtre par saison uniquement** | Onglets S1/S2/S3/S4 en V2. Pas de search, pas de tags. |

#### Plateformes audio

| Question | Réponse | Conséquence |
|---|---|---|
| Quelles plateformes en avant ? | **Deezer prio 1, Apple 2, Amazon 3, Spotify discret 4** | Sort de l'array `platforms` triés par `priority`. Spotify volontairement en bas partout (modale, footer, abonnement). **Ne jamais le mettre en premier**. |

#### Réseaux sociaux

| Question | Réponse | Conséquence |
|---|---|---|
| Handles Insta / TikTok / YouTube ? | **Placeholders** pour l'instant | `brand.socials` utilise `@fier.e.s` partout — à remplacer par les vrais comptes podcast quand confirmés. |
| Contenu TikTok ? | **Extraits 30s-1min des épisodes** | Le copy parle de "clips" / "extraits", pas de "sketches originaux". |
| Contenu Instagram ? | **Mix** : extraits, annonces, portraits invité·es, behind-the-scenes | Section social wall mêle les types. |
| Mur Reels / TikTok embed ? | **Les trois (mur + section "suivez-nous" + liens nav/footer) mais pas trop flashy** | `<SocialWall>` : grid 4 TikTok placeholders compacts + colonne 3 Insta placeholders. Sobre, pas saturé. |
| Chaîne YouTube ? | **Pas active — ne pas faire d'embed** | Aucun composant YouTube en V2. |

#### Festival

| Question | Réponse | Conséquence |
|---|---|---|
| /festival reprend la home V1 telle quelle ? | **Oui** | Le contenu de la home V1 a été déplacé tel quel dans `/festival`. Ne pas y toucher sans raison. |
| Mode édition à venir ou archive ? | **Édition à venir, billets actifs** (décidé pendant le brief V2, avant que la date du 13 juin 2025 ne soit passée) ⚠️ **à retrancher avec Thomas avant le launch** (cf. TODO.md → "Festival") | Code reste en mode promo aujourd'hui, mais incohérent calendaire — à corriger en phase 1. |
| Comment promouvoir le festival sur la home podcast ? | **Les deux** : bandeau sticky + section featured | `<FestivalBanner>` en haut de toutes les pages + `<FestivalFeature>` orange sur la home podcast. |
| La résidence Gaîté Lyrique ? | **Les deux** : section home qui linke vers `/residence` | `<ResidenceHighlight>` sur la home + page `/residence` détaillée (Ebony + Tess Kirby). |

#### Direction visuelle

| Question | Réponse | Conséquence |
|---|---|---|
| Charte visuelle ? | **Orange punk-queer V1 partout** | Même palette (orange/ink/bone), même typo (Playfair italic + Space Grotesk) partout. **Ne pas pivoter vers une DA "media sobre"**. |
| Logo podcast vs festival ? | **Même logo "Fier.e.s"** | Un seul jeu de logos pour les deux. PNG officiels dans `medias/`. |
| Cover art épisodes ? | **Placeholder pour l'instant** + réfléchir à un système API pour récupérer les miniatures plateformes | Composant `<EpisodeCover>` génère une cover typo. **TODO** documenté pour parser RSS Deezer / Apple feed. |
| Son sur le site ? | **Aucun** | Pas de jingle, pas d'autoplay, pas d'identité sonore. Le site reste silencieux ; seul l'utilisateur·rice déclenche l'écoute. |

#### CTAs & navigation

| Question | Réponse | Conséquence |
|---|---|---|
| Pages à créer ? | `/`, `/episodes`, `/residence`, `/festival`, `/a-propos`, `/partenariat` | 6 routes statiques. Pas plus en V2. |
| CTA navbar principal ? | **Contextuel** : "Dernier épisode" (modale plateformes) sur la home et toutes les pages podcast ; "Billets" (HelloAsso) sur `/festival/*` | `Navbar` lit `usePathname()` et switch le CTA. **Maintenir cette logique** si tu refactores. |

#### Fonctionnalités

| Question | Réponse | Conséquence |
|---|---|---|
| Newsletter ? | **Pas pour l'instant** (peut-être plus tard) | Aucun formulaire newsletter en V2. Quand ce sera décidé : Brevo ou Buttondown probable. |
| Transcriptions des épisodes ? | **Prévoir l'UI maintenant, vide pour l'instant** | TODO commenté dans `episodes/page.tsx` : "onglet transcription" à brancher. |
| Page presse ? | **Pas de page dédiée** — mention "kit presse dispo sur demande par mail" sur `/partenariat` | Suivi à la lettre dans `app/partenariat/page.tsx`. |

#### Technique

| Question | Réponse | Conséquence |
|---|---|---|
| Stack ? | "Je te laisse cook" → **Next 14 + TS strict + Tailwind + Framer Motion + Lenis** | Stack figée. Lenis a été ajouté pour le smooth scroll premium. |
| CMS ? | **Pas pour l'instant**, hardcodé dans `src/data/*.ts`. TODO Sanity / Notion / Markdown plus tard. | Toute édition contenu = PR sur le code en V2. À convertir en CMS quand l'ajout d'épisode devient pénible. |
| Domaine ? | **Pas décidé** | Placeholder `fier-e-s.fr` dans `brand.ts`. À actualiser quand validé. |

#### Anti-références

| Question | Réponse | Conséquence |
|---|---|---|
| Trucs à éviter absolument ? | **Pas de cookie banner agressif, pas de design corporate / SaaS, pas d'autoplay** | Trois règles d'or. **Ne propose jamais** un gradient bleu start-up, un wizard de cookies bloquant, ou un Reels qui se lance tout seul. |
| Références visuelles inspirantes ? | similiqueer.com, Konbini | Pour comprendre le ton et l'énergie souhaités. |

---

**Si tu changes une décision** : retire ou modifie la ligne correspondante
dans ce tableau, et mets `CLAUDE.md` à jour si la conséquence touche au code.

---

## 3. Setup & premier lancement

### Prérequis

- **Node.js 18+** (testé en local sur 20+)
- **npm** (pas de yarn/pnpm dans le repo)

### Premier lancement

```bash
git clone <repo>
cd fieres
npm install
npm run dev
```

→ Le site se sert sur [http://localhost:3000](http://localhost:3000).

### Build production

```bash
npm run build
npm start
```

Le build doit passer avec **6 routes statiques** :
- `/` (~ 156 kB First Load JS)
- `/episodes` (~ 146 kB)
- `/festival` (~ 149 kB)
- `/residence` (~ 94 kB)
- `/a-propos` (~ 94 kB)
- `/partenariat` (~ 87 kB)

Si le build casse, **lis les erreurs TypeScript** avant tout. Le `strict: true`
fait râler souvent — c'est volontaire.

### Variables d'environnement

**Aucune pour l'instant.** Quand on branchera le RSS Anchor (cf. TODO.md
Phase 1) ou un CMS plus tard, on créera un `.env.local` documenté ici.

---

## 4. Sitemap & UX

### Routes

| Route | Composant | Rôle |
|---|---|---|
| `/` | `app/page.tsx` | **Home podcast** — hero, épisodes phares (6 cards), résidence highlight, hôte, festival featured, social wall |
| `/episodes` | `app/episodes/page.tsx` | Catalogue 30+ épisodes — featured "le plus récent" + onglets saison S1→S4 + listing |
| `/residence` | `app/residence/page.tsx` | Résidence Gaîté Lyrique — Ebony & Tess Kirby |
| `/festival` | `app/festival/page.tsx` | **Ex-home V1 inchangée** — hero, programme, artistes, talk, infos, partenaires |
| `/a-propos` | `app/a-propos/page.tsx` | Manifeste 4 principes + portrait Thomas + contact |
| `/partenariat` | `app/partenariat/page.tsx` | Sponsoring, audience (chiffres TODO), kit presse sur demande |

### Layout commun à toutes les pages

Le `app/layout.tsx` enveloppe **toutes** les pages avec :

1. `<SmoothScrollProvider>` — Lenis (smooth scroll global)
2. `<CustomCursor />` — étoile orange remplace le curseur natif (desktop only, off si reduced motion)
3. `<FestivalBanner />` — bandeau sticky promo festival (fermable, mémorisé en sessionStorage)
4. `<Navbar />` — nav fixe qui se cache au scroll down, réapparaît au scroll up
5. `<main>` — contenu de la page
6. `<Footer />` — footer commun

### Navbar — CTA contextuel

Le bouton orange en haut à droite de la navbar **change en fonction de la
route** :

- **Sur `/festival/*`** → "Billets" → ouvre HelloAsso (`festival.ticketsUrl`)
- **Partout ailleurs** → "Dernier épisode" → ouvre la `<ListenModal>` qui
  liste les plateformes (Deezer en haut, Spotify en bas)

Le mobile menu propose **les deux CTA** côte à côte.

### Bandeau festival sticky

Bandeau orange tout en haut, présent sur **toutes les pages** :
"Festival Fier.e.s — Samedi 13 juin 2025, Césure. [Billets]".

- Fermable via la croix (×)
- État stocké en `sessionStorage` (clé `fieres-banner-dismissed`)
- Pousse la navbar vers le bas via la CSS var `--banner-h`

→ Si tu veux le désactiver pendant le dev, vide ton sessionStorage ou clique
sur la croix.

### Modale d'écoute

Composant `<ListenModal>` — déclenchée par n'importe quel CTA "Dernier
épisode" ou "Écouter". Affiche les 4 plateformes triées par `priority`
(`Deezer 1` → `Spotify 4`). ESC ferme la modale.

---

## 5. Architecture du code

```
fieres/
├── HANDOVER.md          ← ce fichier
├── CLAUDE.md            ← contexte projet pour Claude Code (auto-chargé)
├── README.md            ← README orienté utilisateur·rice final·e
├── medias/              ← assets bruts fournis par RAGE (logo + affiche + kit PDF)
│   ├── Affiche.png
│   ├── FieresLOGOstars_Sansfond.png      (logo blanc, fond transparent)
│   ├── FieresLOGOstars_SansfondNOIR.png  (logo noir, fond transparent)
│   └── KIT MEDIA FIER.E.S.pdf
├── public/              ← (à créer si besoin d'assets statiques)
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← fonts + Lenis + Navbar + Footer + banner
│   │   ├── page.tsx             ← Home podcast
│   │   ├── globals.css          ← styles globaux + classes utilitaires
│   │   ├── episodes/page.tsx
│   │   ├── residence/page.tsx
│   │   ├── festival/page.tsx
│   │   ├── a-propos/page.tsx
│   │   └── partenariat/page.tsx
│   ├── components/
│   │   ├── shared/              ← composants utilisés partout
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── festival-banner.tsx
│   │   │   ├── listen-modal.tsx
│   │   │   ├── smooth-scroll-provider.tsx
│   │   │   ├── custom-cursor.tsx
│   │   │   ├── reveal.tsx
│   │   │   └── star.tsx
│   │   ├── podcast/             ← composants de la home podcast
│   │   │   ├── hero.tsx
│   │   │   ├── featured-episodes.tsx
│   │   │   ├── host-section.tsx
│   │   │   ├── residence-highlight.tsx
│   │   │   ├── festival-feature.tsx
│   │   │   ├── social-wall.tsx
│   │   │   └── episode-cover.tsx
│   │   └── festival/            ← composants de /festival (héritage V1)
│   │       ├── hero.tsx
│   │       ├── programme.tsx
│   │       ├── artists.tsx
│   │       ├── artist-portrait.tsx
│   │       ├── talk.tsx
│   │       ├── practical-info.tsx
│   │       └── partners.tsx
│   ├── data/
│   │   ├── brand.ts             ← marque (nom, contact, socials, nav)
│   │   ├── podcast.ts           ← hôte, plateformes, épisodes, saisons
│   │   ├── residence.ts         ← résidence Gaîté Lyrique
│   │   └── festival.ts          ← date, lieu, programme, artistes, partenaires
│   └── lib/
│       └── utils.ts             ← `cn()` Tailwind merge
├── next.config.mjs              ← config Next (basique, reactStrictMode)
├── tailwind.config.ts           ← couleurs custom + animations keyframes
├── tsconfig.json                ← TypeScript strict + alias @/* → ./src/*
├── postcss.config.mjs           ← tailwind + autoprefixer
├── package.json
└── package-lock.json
```

### Convention de nommage

- Tous les composants en `kebab-case.tsx` (ex. `festival-banner.tsx`)
- Export nommé (jamais `default` sauf pour les `page.tsx` Next imposés)
- Tout le code et tous les commentaires en **français**
- Variables / fonctions en `camelCase`, types en `PascalCase`

### Server vs Client components

- **Toutes les pages `app/.../page.tsx`** sont par défaut Server Components,
  sauf `episodes/page.tsx` qui a `"use client"` (parce qu'il a un state local
  pour les filtres de saison + la modale).
- **Tous les composants animés ou interactifs** sont marqués `"use client"`
  en haut du fichier (`hero.tsx`, `navbar.tsx`, etc.).
- Les composants purement présentationnels (sans state, sans framer)
  peuvent rester Server : `star.tsx`, `artist-portrait.tsx`, `episode-cover.tsx`.

⚠️ **Si tu vois `'useState' is not a function` ou `useEffect undefined`** :
tu as oublié `"use client"` en haut du fichier.

---

## 6. Système de design

### Palette

| Token | Hex | Usage |
|---|---|---|
| `orange` | `#F4620A` | Couleur primaire, CTAs, accents |
| `orange-400` | `#FF8019` | Gradient hero |
| `orange-600` | `#C44E08` | Gradient hero (foncé) |
| `ink` | `#0A0A0A` | Fond noir des sections |
| `bone` | `#F7F2EA` | Texte sur orange, fond crème |
| `white` | `#FFFFFF` | Variante claire |

Toutes ces couleurs sont déclarées dans `tailwind.config.ts` → tu les
utilises comme `bg-orange`, `text-ink`, `border-bone`, etc.

### Typographies

Deux fonts via `next/font` (zero-cost, pas de FOUT) :

| Nom | Famille | Variable CSS | Usage |
|---|---|---|---|
| Display | **Playfair Display** italic 900 | `--font-display` | Titres décoratifs (`font-display`) |
| Body | **Space Grotesk** 400/500/700 | `--font-body` | Corps de texte (`font-body`, par défaut) |

L'usage canonique d'un titre : `font-display text-5xl font-black italic`.

Les très gros titres utilisent du `text-[14vw]` (responsive viewport-based)
plus un `drop-shadow-[6px_6px_0_rgba(0,0,0,1)]` pour l'effet sticker.

### Stickers & ombres

Beaucoup de cards utilisent une **ombre fixe sticker** type
`shadow-[6px_6px_0_0_rgba(0,0,0,1)]` ou `shadow-[10px_10px_0_0_rgba(244,98,10,1)]`.

C'est volontairement plat et imprimé. Pas de soft shadows iOS-style.

### Animations Tailwind custom

Dans `tailwind.config.ts`, on a quelques keyframes :

| Classe | Effet |
|---|---|
| `animate-pulse-cta` | CTA principal qui respire et émet une onde |
| `animate-spin-slow` | Rotation très lente (20s) |
| `animate-twinkle` | Étoile qui scintille |
| `animate-marquee` | Bandeau de texte qui défile à l'infini |

### Bruit (noise)

La classe `.noise` (dans `globals.css`) applique une texture grain SVG en
overlay. À mettre sur les fonds orange pleins pour casser la platitude.

### Utilitaire `.text-stroke`

`text-stroke` rend un texte en contour seul (typo creuse) — utile pour les
hero secondaires.

---

## 7. Data layer (contenu)

**Tout le contenu** du site vit dans `src/data/`. Pas de CMS, pas d'API,
pas de DB. Pour modifier un texte, un horaire, un partenaire → tu édites
le fichier `.ts`, tu commit, Vercel redéploie.

### `data/brand.ts`

Identité marque + nav globale.

```ts
brand.name           // "Fier.e.s"
brand.tagline        // baseline hero podcast
brand.description    // pitch long
brand.domain         // fier-e-s.fr (TODO confirmer)
brand.contactEmail   // fier.e.s.podcast@gmail.com
brand.socials.instagram
brand.socials.tiktok
brand.organizer      // RAGE
navLinks             // array { label, href } pour la nav desktop/mobile
```

### `data/podcast.ts`

**C'est le gros fichier**. Contient :

- `platforms` — array trié par `priority` (1=Deezer, 4=Spotify)
- `host` — Thomas Chinarro (**bio placeholder à remplacer**)
- `featuredEpisodes` — les 6 invité·es phares confirmé·es (Elips, Paloma, etc.)
- `placeholderEpisodes` — 26 épisodes fictifs générés pour étoffer le catalogue (à remplacer)
- `allEpisodes` — featured + placeholders, triés du plus récent au plus ancien
- `latestEpisode` — `allEpisodes[0]`, mis en avant partout
- `seasons` — `allEpisodes` regroupés par numéro de saison

### `data/residence.ts`

Résidence Gaîté Lyrique avec Ebony & Tess Kirby.

- `residence.venue`, `residence.address`
- `residence.pitch`, `residence.description`
- `residence.status` — "À venir" pour l'instant
- `residence.guests[]` — 2 invité·es avec rôle et blurb

### `data/festival.ts`

Toutes les données du festival (héritage V1, intact).

- `festival.date`, `festival.hours`, `festival.venue`
- `festival.ticketsUrl` — HelloAsso
- `festival.manifesto`
- `programme[]` — 4 créneaux du jour
- `artists[]` — 4 artistes drag/musique
- `speakers[]` — 3 du Talk
- `partners[]` — 5 partenaires (Césure, Ville de Paris, etc.)
- `practical` — textes accessibilité, bar, safer

---

## 8. Composants partagés en détail

### `<Navbar />`

- Fixed top, hides on scroll down, reveals on scroll up (seuil 4px hystérésis)
- Logo à gauche → toujours link vers `/`
- 5 liens nav desktop (cachés < md)
- 1 CTA orange (contextuel via `usePathname`)
- Hamburger sur mobile → menu plein écran orange avec gros titres
- Top offset dynamique via `--banner-h` (cf. festival-banner)

### `<Footer />`

- Énorme titre "Fier.e.s" décoratif en haut
- 4 colonnes : marque, écouter (plateformes triées), suivre & contacter, social
- Mention "Podcast & festival organisés par RAGE"
- Liens externes ouverts en `target="_blank" rel="noopener noreferrer"`

### `<FestivalBanner />`

- Sticky `top:0`, `z-60`, hauteur 44px
- `useEffect` set la CSS var `--banner-h` à 44px (ou 0 si fermé)
- `sessionStorage` mémorise le dismiss → reset à chaque nouvel onglet

### `<ListenModal />`

- `role="dialog"` `aria-modal="true"`
- Trap clavier : ESC ferme
- Liste les `platforms` triées par `priority`
- Liens ouverts en `target="_blank"`
- Props : `open`, `onClose`, `episodeTitle?`, `episodeNumber?`
- Si pas de props episode, affiche "Écouter Fier.e.s" / "Dernier épisode"

### `<SmoothScrollProvider />`

- Wrap autour de tout le `<body>`
- Initialise Lenis avec `duration: 1.1`, easing custom (expoOut-like)
- Désactive si `prefers-reduced-motion: reduce`
- Cleanup propre dans le `useEffect` return

### `<CustomCursor />`

- Remplace le curseur natif par une étoile mix-blend-difference
- Scale x1.5 + rotate 12° sur les éléments interactifs (`a`, `button`, `[role=button]`)
- Désactivé si `pointer: coarse` (touch) ou `prefers-reduced-motion: reduce`
- Active la classe `body.has-custom-cursor` qui hide le cursor natif via CSS

### `<Star />`

SVG d'étoile à 5 branches, propre, vectoriel, scalable. Accepte `className`,
`filled` (par défaut true), `style`. Utilise `currentColor` donc tu peux la
colorer via `text-orange`, `text-ink`, etc.

### `<Reveal />`

Wrapper pour fade-in + slide-up au scroll. `threshold: 0.2`. Pas utilisé
partout — la plupart des sections inline leur propre `motion.div`.

---

## 9. Composants spécifiques

### Pages podcast

| Composant | Rôle |
|---|---|
| `podcast/hero.tsx` | Hero plein écran orange + étoiles flottantes + CTA "Écouter le dernier épisode" + carte "dernier ep" |
| `podcast/featured-episodes.tsx` | Grid 3-col des 6 épisodes phares avec covers typo et listen modal |
| `podcast/host-section.tsx` | Portrait + bio Thomas Chinarro (sur fond crème) |
| `podcast/residence-highlight.tsx` | Card résidence Gaîté avec liens vers `/residence` |
| `podcast/festival-feature.tsx` | Section orange grosse promo festival avec CTA billets |
| `podcast/social-wall.tsx` | Grid 4 TikTok placeholders + liste 3 Insta placeholders |
| `podcast/episode-cover.tsx` | **Cover typo placeholder** — réutilisé partout dans le site |

### Pages festival (V1 inchangée)

| Composant | Rôle |
|---|---|
| `festival/hero.tsx` | Hero plein écran orange avec date / lieu / CTA billets |
| `festival/programme.tsx` | 4 cards créneaux + marquee décorative en haut |
| `festival/artists.tsx` | 4 cards artistes avec portraits placeholders |
| `festival/artist-portrait.tsx` | Placeholder initiales + étoiles + fond coloré |
| `festival/talk.tsx` | Section orange + 3 chips speakers |
| `festival/practical-info.tsx` | Adresse, transport, accessibilité, safer + map stylisée |
| `festival/partners.tsx` | Bandeau orange avec logos texte des 5 partenaires |

---

## 10. Animations & smooth scroll

### Framer Motion

Pattern dominant :

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
```

- `once: true` → l'animation joue **une seule fois** par session.
- `amount: 0.2-0.3` → déclenche quand 20-30 % de l'élément est visible.
- L'easing `[0.22, 1, 0.36, 1]` est notre "expo out" custom — utilise-le partout
  pour rester cohérent.

### Hero parallax

Dans `podcast/hero.tsx` et `festival/hero.tsx`, on utilise `useScroll` +
`useTransform` pour faire bouger un fond et le titre indépendamment :

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
```

### Lenis

Lenis tourne en arrière-plan dans `<SmoothScrollProvider>`. Tu n'as **rien à
faire** pour qu'il marche : il intercepte le scroll natif et l'interpole.

⚠️ **Lenis + Framer Motion `useScroll`** : ça marche, mais Framer mesure le
scroll **après** que Lenis l'ait traité. Tu peux voir un léger lag sur certains
parallax. Si ça te gêne, ajoute `Lenis.scrollTo()` synchronisé avec Framer
ou utilise `Lenis.on('scroll', ...)` pour driver des animations.

---

## 11. Assets et media kit

### Ce que RAGE a fourni (`medias/` à la racine)

| Fichier | Description | Dimensions | Format |
|---|---|---|---|
| `Affiche.png` | **Affiche officielle festival 2025** (visuel principal de la campagne) | 2160×2700 | PNG RGBA |
| `FieresLOGOstars_Sansfond.png` | **Logo officiel blanc**, fond transparent | 3543×3543 | PNG RGBA |
| `FieresLOGOstars_SansfondNOIR.png` | **Logo officiel noir**, fond transparent | 3543×3543 | PNG RGBA |
| `KIT MEDIA FIER.E.S.pdf` | Kit média complet (briques, charte, photos invité·es, etc.) | — | PDF 5.8 MB |

Le logo officiel est le mot **"fieres"** stylisé avec une étoile à gauche
(cf. les PNG). Pour l'instant, le site utilise **un placeholder typo
Playfair italique** + une mini étoile SVG. Le vrai logo n'est pas encore
intégré.

### Comment intégrer les assets (recommandation pour toi)

1. **Crée `public/brand/`** :

   ```bash
   mkdir -p public/brand
   cp medias/FieresLOGOstars_Sansfond.png public/brand/logo-white.png
   cp medias/FieresLOGOstars_SansfondNOIR.png public/brand/logo-black.png
   cp medias/Affiche.png public/brand/affiche-2025.png
   cp "medias/KIT MEDIA FIER.E.S.pdf" public/brand/kit-media.pdf
   ```

2. **Optimise les images** (recommandé, surtout l'affiche 3.8 MB) :
   - Convertis l'affiche en `.webp` ou `.avif`
   - Ou laisse-les `.png` et utilise `next/image` qui s'occupe de tout
   - Recommandation : `next/image` avec `placeholder="blur"` et `sizes`

3. **Remplace les usages de `<Star>` + texte "Fier.e.s" par le vrai logo** :

   ```tsx
   import Image from "next/image";
   <Image
     src="/brand/logo-white.png"
     alt="Fier.e.s"
     width={120}
     height={60}
     priority
   />
   ```

   Endroits à modifier :
   - `components/shared/navbar.tsx` (logo en haut à gauche, 2 endroits : desktop + mobile menu)
   - `components/shared/footer.tsx` (gros logo décoratif en haut du footer)
   - `components/podcast/hero.tsx` (le grand "Fier.e.s" central du hero)
   - `components/festival/hero.tsx` (idem festival)

   **Attention** : sur l'orange (`bg-orange`), utilise le logo **noir** ;
   sur l'`ink` (noir), utilise le logo **blanc**.

4. **Affiche festival** :
   - À mettre en arrière-plan du Hero festival, ou en card sur la page `/festival`
   - Ou en OG image (`app/festival/opengraph-image.png`)

5. **Kit média PDF** :
   - Lien dans `/partenariat` (remplace la mention "kit dispo par mail" par
     un vrai lien `/brand/kit-media.pdf`)
   - Lien dans le footer (section "Suivre & contacter")

6. **Mets à jour `data/brand.ts`** :

   ```ts
   export const brand = {
     // ...
     assets: {
       logoWhite: "/brand/logo-white.png",
       logoBlack: "/brand/logo-black.png",
       poster: "/brand/affiche-2025.png",
       mediaKit: "/brand/kit-media.pdf",
     },
   };
   ```

7. **Si tu veux un SVG du logo** (idéal pour scale infini) : converti les
   PNG via Illustrator / Inkscape / un service web. Le résultat sera bien
   plus léger et net.

### À demander à l'équipe Fier.e.s

- **Logo SVG vectoriel** (si dispo) — beaucoup mieux que PNG pour le web
- **Photos HD de Thomas Chinarro** — actuel placeholder "TC" sur fond orange
- **Photos / illustrations des invité·es phares** (Elips, Paloma, etc.)
- **Vraies miniatures des épisodes** (ou alors on lit le RSS Deezer)
- **Photos behind-the-scenes** pour le mur social

---

## 12. Tous les TODOs

👉 **La liste exhaustive et actionnable (avec checkboxes) est dans
[`TODO.md`](./TODO.md)**. Elle couvre : APIs live (RSS, Insta, TikTok),
stats live, intégration des vrais assets, features V3, SEO,
accessibilité, perf, et le bascule festival post-13-juin.

Recherche aussi les TODO inline du code :

```bash
grep -rn "TODO" src/
```

Voici un résumé rapide ci-dessous, par priorité :

### 🔴 Priorité haute (avant montrer à un partenaire / lancer en prod)

| Fichier | TODO |
|---|---|
| `src/data/brand.ts` | Confirmer le **domaine final** (`fier-e-s.fr` ? autre ?) |
| `src/data/brand.ts` | Ajouter l'**URL TikTok réelle** du compte podcast |
| `src/data/brand.ts` | Confirmer l'**URL Instagram** du compte podcast (vs festival) |
| `src/data/podcast.ts` | Récupérer la **vraie bio de Thomas Chinarro** |
| `src/data/podcast.ts` | Remplacer les **26 épisodes placeholder** par les vrais titres (`placeholderTitles`) |
| Partout | Intégrer **le vrai logo PNG** (cf. section 11) à la place des placeholders typo |
| Partout | Remplacer le **portrait TC placeholder** par une vraie photo dès que dispo |

### 🟡 Priorité moyenne (amélioration substantielle)

| Fichier | TODO |
|---|---|
| `src/data/podcast.ts` | **Parser le flux RSS** Deezer ou Apple Podcasts pour générer automatiquement la liste des épisodes |
| `src/components/podcast/episode-cover.tsx` | Récupérer les **vraies miniatures** via API Deezer / Apple (au lieu du cover typo) |
| `src/components/podcast/social-wall.tsx` | Brancher l'**oEmbed Instagram / TikTok** officiel pour les vrais clips |
| `src/app/partenariat/page.tsx` | Remplacer les **chiffres d'audience** par les vrais KPI |
| `src/data/residence.ts` + `src/app/residence/page.tsx` | Confirmer les **dates exactes** de la résidence Gaîté Lyrique |
| `src/app/episodes/page.tsx` | Implémenter l'**onglet "Transcription"** (UI prévue mais vide) |

### 🟢 Priorité basse (nice-to-have / V3)

| Sujet | Où |
|---|---|
| Migrer vers un **CMS** (Sanity ?) quand l'ajout d'épisode devient pénible | — |
| Ajouter une **newsletter** (Brevo / Mailchimp) | — |
| Ajouter des **transcriptions** complètes des épisodes (A11Y + SEO) | — |
| Ajouter des **pages par épisode** `/episodes/[slug]` (actuellement page par saison seulement) | — |
| Ajouter une vraie **recherche fulltext** (Algolia / Pagefind) | — |
| **OG images dynamiques** par page (Next/og) | — |

---

## 13. Idées d'améliorations V3

Tout ce qui n'a pas été implémenté en V2 mais qui pourrait faire passer le
site au niveau supérieur. Tri par "complexité × valeur" approximative.

### Quick wins (1h-2h chacun)

- **OG image** Open Graph pour le partage social (image statique d'abord, dynamique ensuite via `next/og`)
- **Favicon + apple-touch-icon** depuis le logo officiel
- **Sitemap.xml + robots.txt** (Next 14 : `app/sitemap.ts` + `app/robots.ts`)
- **Métadonnées par route** (title spécifique, description) — partiellement fait
- **Smooth anchors** pour les sections internes de la home
- **Compte à rebours J-X jusqu'au festival** sur la home podcast (composant simple)

### Mid-tier (1/2 jour à 1 jour chacun)

- **Pages individuelles d'épisode** `/episodes/[slug]` avec player embed + invité·e détaillé + transcription
- **Lecteur audio inline** sur la home (Deezer embed `<iframe>`) pour le dernier épisode
- **Search par titre / invité·e** sur `/episodes` (client-side fuzzy, type Fuse.js)
- **Filtres tags thématiques** (drag, intimité, politique...) en complément des saisons
- **Système de favoris localStorage** (cœur sur les cards, page "mes favoris")
- **Animations GSAP / Motion One** pour les transitions de page

### Gros chantiers (1+ jour)

- **CMS Sanity** :
  - Studio admin pour Thomas + équipe
  - Schémas : Episode, Speaker, Season, Partner, Page
  - Migration des données actuelles
  - Webhook on-publish → revalidate ISR
- **Multi-langue FR/EN** via `next-intl` ou `next-international`
- **PWA** installable (manifest + service worker via `next-pwa`)
- **Système de candidature en ligne** (formulaire artiste / marché / bénévole)
  - Backend simple : Resend pour l'email, ou Formspree
- **Carte interactive du lieu festival** (au lieu de la map stylisée actuelle)

### Idées créatives (à brainstormer)

- **Easter egg curseur** : confettis quand tu cliques sur une étoile
- **Mode "club" la nuit** : à partir de 22h, le site devient encore plus saturé
- **Sons d'interface optionnels** (toggle dans le footer) : pages qui font des "swoosh"
- **3D / WebGL** sur le hero (étoiles qui flottent en 3D au curseur)
- **Page archive 2024** : un repli historique de l'édition précédente

---

## 14. Conventions de code

### TypeScript

- **Strict mode obligatoire**. Pas de `any` sauf vraiment nécessaire (et avec commentaire).
- Types exportés en `PascalCase` (`Episode`, `Season`, `Platform`).
- `as const` pour les structures de données immuables (`festival`, `brand`, `practical`).

### React

- **Composants nommés**, export nommé (jamais `default` sauf pages Next).
- Props typées **inline** (pas de `interface Props {}` à part) sauf cas complexes.
- `"use client"` **uniquement quand nécessaire** (state, effects, framer, event handlers).
- `useEffect` cleanups **toujours** (sinon mémory leak en dev avec strict mode).

### Tailwind

- **Pas de `@apply` dans `globals.css`** sauf cas rare (`.text-stroke`, `.noise`).
- **Pas de styles inline** sauf valeurs dynamiques (calculées au runtime, ex. positions étoiles).
- Préfère `cn(...)` (helper dans `lib/utils.ts`) pour composer des classes conditionnelles.

### Imports

Alias `@/` → `./src/` (configuré dans `tsconfig.json`). Toujours utiliser
l'alias pour les imports cross-folder :

```tsx
import { brand } from "@/data/brand";        // ✅
import { Star } from "@/components/shared/star"; // ✅
import { Star } from "../../shared/star";    // ❌ Évite
```

### Commits

Convention type **Conventional Commits** :

- `feat: ajoute la page résidence`
- `fix: bandeau festival ne se reaffiche pas après dismiss`
- `chore: bump next 14.2.15 → 14.2.16`
- `docs: complète le handover sur Lenis`
- `refactor: déplace les composants podcast dans /podcast`

---

## 15. Pièges connus & gotchas

### ⚠️ Lenis + scroll programmatique

`window.scrollTo()` est intercepté par Lenis et peut ne pas marcher comme
attendu. Si tu veux scroller en JS, utilise `lenis.scrollTo(target)` plutôt :

```tsx
import { useLenis } from "lenis/react"; // pas installé ici, à ajouter si besoin
```

Pour l'instant on n'utilise pas `useLenis` — on a juste Lenis qui tourne en
arrière-plan.

### ⚠️ Le `id="top"` du hero festival

Sur `/festival`, le hero a `id="top"`. À l'origine c'était pour le bouton
"haut de page". Maintenant le logo de la navbar pointe vers `/` (route),
plus vers `#top` (ancre). L'`id` reste mais n'est plus utilisé. Tu peux
le retirer sans rien casser.

### ⚠️ Le CTA navbar "Dernier épisode" est caché en mobile

Sur mobile (< md), le bouton CTA est remplacé par le burger qui ouvre le
menu plein écran avec **les deux CTA**. C'est volontaire — sinon ça
encombre.

### ⚠️ `latestEpisode` est calculé au build

`allEpisodes` est trié par `publishedAt` desc, et `latestEpisode = allEpisodes[0]`.
Quand tu ajoutes un nouvel épisode dans `podcast.ts`, mets bien une `publishedAt`
récente (format ISO `"2025-05-13"`) sinon il ne sera pas en top.

### ⚠️ La modale d'écoute est instanciée dans Navbar **ET** dans plusieurs pages

Le composant `<ListenModal>` est inclus :
- Dans la Navbar (CTA "Dernier épisode")
- Dans le Hero podcast (CTA "Écouter le dernier épisode")
- Dans les Featured Episodes (au clic sur une card)
- Dans la page `/episodes` (au clic sur un épisode + dernier ep featured)

C'est pas un problème (chaque instance a son propre state `open`), mais si
tu fais un refactor en context global, c'est utile à savoir.

### ⚠️ `noise::before` overlay

La classe `.noise` ajoute un `::before` absolu avec une texture SVG.
**Si le parent n'a pas `position: relative`** (ou `isolate`), l'overlay
peut se placer ailleurs que prévu. La plupart des sections orange utilisent
`relative isolate overflow-hidden`, garde ça.

### ⚠️ TypeScript strict + `pathname?.startsWith`

`usePathname()` renvoie `string | null`. On utilise `pathname?.startsWith(...)`
partout, et on fallback `?? false` pour `active`. Si tu enlèves le `?.` tu
auras une erreur de compile.

### ⚠️ Le festival 2025 est **passé** (selon la date courante)

Le site assume actuellement "festival à venir" (cf. brief). Si tu reprends
après le 13 juin 2025, **mets à jour** :
- `festival.date` dans `data/festival.ts`
- Le mode du bandeau / page festival (passer en "archive" ou teaser nouvelle édition)

---

## 16. Travailler avec Claude Code

Tu utilises Claude Code aussi ? Voilà les bonnes pratiques pour ce repo
spécifiquement.

### Le fichier `CLAUDE.md` à la racine

Quand tu ouvres Claude Code dans ce repo, il auto-charge `CLAUDE.md` (à la
racine). Il y a déjà :
- Les conventions du repo
- Les TODOs prioritaires
- Les pièges à éviter
- Les routes & data layer

→ Tu peux le mettre à jour quand tu changes les conventions.

### Bons prompts pour démarrer

✅ **Bon** :

> "Je veux remplacer le logo placeholder par le vrai logo qui est dans
> `medias/FieresLOGOstars_SansfondNOIR.png`. Faut-il l'optimiser ? Liste-moi
> tous les endroits où il est référencé dans le code avant de modifier."

✅ **Bon** :

> "Ajoute une page `/episodes/[slug]` avec un layout simple : titre,
> description longue, invité·e, player Deezer embed, et liens vers les
> autres plateformes. Génère les routes statiques à partir de `allEpisodes`
> dans `data/podcast.ts`."

❌ **À éviter** :

> "Améliore le site"  (trop vague)

> "Refais le hero"  (sans spec)

### Quand utiliser un sub-agent

Pour les recherches multi-fichiers, utilise `Explore` ou `general-purpose` :

> "Utilise l'agent Explore pour me lister tous les endroits où on importe
> `framer-motion` dans le repo. Je veux comprendre où ajouter `LayoutGroup`."

### Patterns spécifiques au repo

- **Toujours `npm run build`** après changement de schémas TypeScript pour valider.
- **Pas de `npm run lint --fix`** sans review — il peut casser des animations subtiles.
- **Toujours faire un commit avant un gros refactor**, c'est ton parachute.

---

## 17. Déploiement

### Vercel (recommandé, zéro config)

1. Push sur GitHub (déjà fait : `LilStick/festival-fieres`)
2. Va sur [vercel.com/new](https://vercel.com/new)
3. Import le repo, Vercel détecte Next.js automatiquement
4. Déploie

Variables d'env à configurer plus tard (CMS, analytics, etc.) → dashboard Vercel.

### Domaine custom

Quand le domaine sera décidé :
1. Achète sur OVH / Gandi / Cloudflare
2. Dans Vercel → Project Settings → Domains → Add
3. Pointe les DNS comme indiqué par Vercel
4. Met à jour `brand.domain` dans `data/brand.ts`

### Autres options

- **Netlify** : compatible Next.js (avec leur plugin), mêmes specs
- **Cloudflare Pages** : possible mais nécessite `output: "edge"` ou export static
- **OVH / VPS perso** : `next build && next start` derrière un nginx

---

## 18. Accessibilité

Niveau visé : **WCAG AA** (les contrastes orange + ink + bone passent).

### Ce qui est fait

- `lang="fr"` sur `<html>`
- Hiérarchie de titres `h1` → `h2` → `h3` cohérente (1 seul h1 par page)
- `aria-label` sur tous les boutons icon-only
- `aria-hidden` sur les éléments décoratifs (étoiles SVG, noise overlays)
- Focus visible orange sur tout élément interactif
- Liens externes : `target="_blank" rel="noopener noreferrer"`
- Modale : `role="dialog"` `aria-modal="true"` + trap ESC
- Curseur custom + Lenis désactivés sur `prefers-reduced-motion: reduce`
- Pas de cookie banner agressif, pas d'autoplay
- Pas de carrousel automatique

### Ce qui reste à faire

- Tester avec **VoiceOver** (macOS) et **NVDA** (Windows) — pas encore fait
- Vérifier les contrastes du **gradient orange→orange-600** (peut être limite)
- Ajouter **`alt`** descriptifs sur les vraies images (actuellement on a des placeholders)
- Tester en **clavier seul** (Tab/Shift+Tab/Enter/Espace) — fait à 80 %, finir
- Vérifier que le **bandeau festival** ne piège pas le focus

---

## 19. Glossaire & contacts

### Lexique

- **RAGE** — Association loi 1901 qui porte podcast + festival.
- **Fier.e.s** — Le podcast (et le festival).
- **Césure** — Lieu hôte du festival : 13 rue Santeuil, 75005 Paris. Tiers-lieu queer.
- **Gaîté Lyrique** — Lieu de la résidence podcast.
- **HelloAsso** — Plateforme billetterie utilisée.
- **Talk** — Format spécifique du festival : conversation publique avec invité·es.

### Personnes

| Rôle | Nom | Contact |
|---|---|---|
| Référent festival / RAGE | Thomas Chinarro | `fier.e.s.podcast@gmail.com` |
| Host podcast | Thomas Chinarro | `fier.e.s.podcast@gmail.com` |
| Asso | RAGE | `fier.e.s.podcast@gmail.com` |

### Liens utiles

- Billetterie festival : https://www.helloasso.com/associations/rage/evenements/festival-fier-e-s
- Instagram : https://instagram.com/fier.e.s
- Deezer : https://www.deezer.com/fr/show/1001047492
- Apple Podcasts : https://podcasts.apple.com/fr/podcast/fier-e-s/id1754599625
- Amazon Music : https://music.amazon.com/podcasts/87b1fa46-4249-4aeb-bd97-f2c882c90ed4/fier-e-s
- Spotify : https://open.spotify.com/show/50cLwcqUBXqzMopriM25YA

### Repo

- GitHub : https://github.com/LilStick/festival-fieres

---

## 🎁 Bonus — petites attentions trouvées dans le code

- Les titres des sections "voir+" se terminent souvent par un point orange
  (`.`) — c'est un tic identitaire, garde-le.
- Le bouton "Dernier épisode" utilise l'animation `animate-pulse-cta` qui
  émet une onde — c'est un appel à l'action volontairement visible.

---

**Bon code, et fais-toi plaisir.** Si tu as une question, fais une issue ou contacte Thomas. Le projet est petit, propre, et facile à étendre. Profite.

— L'équipe & Claude
