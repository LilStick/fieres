# 📋 TODO — Fier.e.s

## 🎯 Stratégie : 2 phases distinctes

**Phase 1 = ship ASAP.** Objectif unique : sortir un site **live, validé,
partageable** au plus vite. On fait le minimum nécessaire pour que Thomas
puisse montrer le site, valider le contenu, et le partager. Rien de plus.

**Phase 2 = améliorations lourdes, post-launch.** Stats live, analytics,
audits, CMS, multi-langue, etc. On y reviendra plus tard, quand le site
sera en ligne et que les vraies données seront stables.

> **Convention** : coche la case quand c'est fait (`- [x]`). Si tu démarres
> sans finir, écris ton nom à côté → `- [ ] (Arthur, WIP)` pour qu'on
> sache qui bosse dessus.

---

## ✅ Phase 1 — Checklist launch (ordre conseillé)

À faire par Arthur **avant** de partager le lien à Thomas pour review du
contenu :

- [ ] **1. Intégrer le logo officiel** (cf. section [Assets](#-assets--passer-aux-vrais-visuels))
  - Copier les PNG `medias/` vers `public/brand/`
  - Remplacer placeholder typo dans : navbar, footer, hero podcast, hero festival
- [ ] **2. Brancher le flux RSS Anchor** (cf. section [RSS](#-r%C3%A9cup%C3%A9ration-automatique-des-%C3%A9pisodes-via-le-rss-anchor))
  - Route handler ou Server Component qui fetch `RSS_FEED_URL`
  - Remplace les 26 `placeholderEpisodes` par les vrais ~28 épisodes
  - Vraies covers, vraies durées, vraies dates
- [ ] **3. Optimiser les images** (cf. section [Image opti](#%EF%B8%8F-optimisation-images-phase-1))
  - Convertir l'affiche festival en `.webp` (4 Mo → < 500 kB)
  - Utiliser `next/image` partout (logo, affiche, covers RSS)
  - Ajouter `d3t3ozftmdmh3i.cloudfront.net` dans `next.config.mjs > images.remotePatterns`
- [ ] **4. SEO basique** (cf. section [SEO basique](#-seo-basique-phase-1))
  - `app/sitemap.ts`, `app/robots.ts`
  - Favicon + apple-touch-icon depuis le logo officiel
  - OG image statique 1200×630 + meta og dans `layout.tsx`
- [ ] **5. Passer tous les textes inventés en Lorem ipsum** (cf. section [Lorem](#-basculer-tous-les-textes-invent%C3%A9s-en-lorem-ipsum-phase-1))
  - But : Thomas voit immédiatement où il doit écrire le vrai texte
  - **Important** : ne PAS Lorem-ifier les contenus validés (cf. liste blanche)
- [ ] **6. Envoyer le lien à Thomas pour review**
  - Vercel preview ou autre URL temporaire (à discuter)
  - Thomas remplace chaque Lorem par son texte
  - Itérations courtes par PR / messages

Quand tout est coché → **le site est ready à ship en V2**. La phase 2 peut
attendre.

---

## ❓ Décisions à prendre avec Thomas (bloquantes pour la fin de phase 1)

- [ ] **État de la page `/festival`** — édition 2025 passée. Bascule en
  archive ? Teaser 2026 ? Sera décidé en discussion avec Thomas.
  - Fichier impact : `src/app/festival/page.tsx`,
    `src/components/shared/festival-banner.tsx`,
    `src/data/festival.ts`
- [ ] **Vraie bio Thomas + photos HD** — pour remplacer le Lorem une fois
  que Thomas les a fournies.
- [ ] **Vrais chiffres audience** pour `/partenariat` — quand Thomas aura
  les bons KPI.
- [ ] **Nom de domaine final** + hébergeur (probablement Vercel) — à
  trancher avant le launch public.
- [ ] **Workflow de validation** — Thomas review par captures d'écran ?
  Par Vercel preview ? Par direct GitHub PR ?

---

## 🚦 Phase 1 — Détails techniques

### Légende priorité (à l'intérieur de la phase 1)

- 🔴 = absolument requis pour ship
- 🟡 = important mais peut être bâclé en attendant

### Vue d'ensemble — du hardcodé au live

Tout le contenu du site est aujourd'hui **figé dans `src/data/*.ts`** :
épisodes, plateformes, social wall, chiffres audience. C'est volontaire
pour livrer vite, mais c'est la dette principale à payer.

Objectif : **brancher les APIs réelles** pour que le site reflète
automatiquement les vrais épisodes, les vraies miniatures, les vrais
chiffres. Plus de placeholders, plus de chiffres inventés.

### 🔴 Récupération automatique des épisodes via le RSS Anchor

**Source canonique confirmée** :

```
https://anchor.fm/s/f68999a4/podcast/rss
```

Hébergeur : **Anchor / Spotify for Podcasters**. Référence aussi dispo dans
`src/data/podcast.ts` → constante `RSS_FEED_URL`, et dans
`medias/fluxrss.md`.

Le flux est public, CORS ouvert (`access-control-allow-origin: *`),
mis à jour à chaque publication. **Tout est dedans** : titres, descriptions
HTML, durées, dates, covers par épisode, saison/épisode numéro.

**Format observé** des titres : `FIER.E.S - <INVITÉ·E> / <PERSONA SCÈNE>`
(ex. `FIER.E.S - MATTHIEU BARBIN / SARA FOREVER`). Le `<description>` HTML
contient régulièrement les handles Insta des invité·es, le·la photographe,
et le lieu d'enregistrement.

#### À faire

- [ ] **Parser le flux RSS** pour générer `allEpisodes` automatiquement
  - Lib recommandée : **`rss-parser`** (`npm i rss-parser`) qui gère les
    extensions `itunes:*` proprement, ou **`fast-xml-parser`** si tu veux
    zéro dépendance lourde
  - Implémentation suggérée : **route handler** `app/api/episodes/route.ts`
    qui :
    1. Fetch `RSS_FEED_URL`
    2. Parse XML → array d'items
    3. Normalise au format `Episode` défini dans `src/data/podcast.ts`
    4. Revalide toutes les heures (ISR : `export const revalidate = 3600`)
  - Alternative plus simple V2.5 : fetch direct dans un Server Component
    de `/episodes` (pas de route handler intermédiaire)
  - Effet : remplace les 26 `placeholderEpisodes` par les vrais épisodes
  - Garder une "couche d'enrichissement" locale pour ajouter manuellement
    des `featured: true`, tags, et la `guestRole` (que le RSS n'a pas)

- [ ] **Vraies miniatures épisodes** (covers)
  - Chaque `<item>` du RSS contient `<itunes:image href="...">` (CDN
    CloudFront Anchor)
  - Fallback : `<itunes:image>` du `<channel>` (cover du show)
  - Stocker dans `Episode.coverUrl` (champ déjà prévu)
  - Bascule `<EpisodeCover>` : si `coverUrl` existe → `<Image>` ; sinon →
    placeholder typo actuel
  - ⚠️ Penser à ajouter le domaine `d3t3ozftmdmh3i.cloudfront.net` dans
    `next.config.mjs > images.remotePatterns` pour autoriser `next/image`

- [ ] **Vraies descriptions épisodes** depuis `<description>` ou
  `<itunes:summary>` (HTML — strip les balises avec
  `.replace(/<[^>]+>/g, '')` ou `DOMParser`)

- [ ] **Vraies durées** depuis `<itunes:duration>` (format `hh:mm:ss`,
  ex. `00:37:06` → afficher `37 min`)

- [ ] **Vraies dates** depuis `<pubDate>` (format RFC 822)

- [ ] **Saison + numéro épisode** depuis `<itunes:season>` et
  `<itunes:episode>` (les featured actuels sont en saison 3, mais la saison
  4 existe déjà — vrai catalogue à 28+ épisodes)

- [ ] **Extraire le nom de l'invité·e** du titre via regex
  `/^FIER\.E\.S - (.+?)(?: \/ .+)?$/i`
  - L'invité·e principal·e est entre `-` et `/` (ou tout après `-` s'il
    n'y a pas de `/`)

- [ ] **Lien audio direct** disponible dans `<enclosure url>` — utile pour
  un lecteur audio HTML5 inline plus tard (toujours pas prio en V2)

### 🔴 SEO basique (phase 1)

À faire avant le launch public — sans ça le site n'est pas indexable et
le partage social est moche.

- [ ] **`app/sitemap.ts`** — sitemap.xml généré auto par Next 14
- [ ] **`app/robots.ts`** — robots.txt
- [ ] **Favicon + apple-touch-icon** depuis le logo officiel
  - Files attendus : `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`
- [ ] **`<title>` + `<meta description>`** dédié par page
  - Partiellement fait (chaque `page.tsx` a un `export const metadata`)
  - Vérifier que CHAQUE page a un title spécifique
- [ ] **OG image statique** 1200×630 pour le partage social
  - Fichier : `public/og.png`
  - Référencé dans `app/layout.tsx` → `metadata.openGraph.images`
  - Sur l'image : logo officiel + tagline du podcast

### ⚡️ Optimisation images (phase 1)

L'affiche festival fait 4 Mo en PNG. Sans optimisation, le site rame sur
mobile.

- [ ] **Convertir l'affiche en `.webp`** (cible : < 500 kB sans perte visible)
  - Outils : `cwebp` CLI, ou `squoosh.app`
  - Garder la version PNG pour fallback OG image / social share
- [ ] **`next/image` partout** (pas de `<img>` raw)
  - Logo navbar : `priority` (au-dessus du fold)
  - Affiche : `placeholder="blur"` + `sizes`
  - Covers RSS : `sizes` responsive
- [ ] **Autoriser le CDN Anchor dans `next.config.mjs`**
  ```js
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd3t3ozftmdmh3i.cloudfront.net' },
    ],
  },
  ```

### 🟢 Social wall (Instagram + TikTok) — **phase 2**

> 📌 **Note de lecture** : les sections "Social wall" et "Stats live"
> ci-dessous sont documentées **avec le RSS** (parce qu'elles concernent
> aussi des APIs externes), mais elles font partie de la **Phase 2**.
> Arthur n'y touche pas en phase 1.
>
> Pour le reste de la phase 2 (Features V3, SEO polish, A11Y, perf,
> monitoring, tech debt), voir le bloc **# 🟢 Phase 2** plus bas.

---

> ⚠️ **Décision validée** : on laisse `<SocialWall>` tel quel
> (avec ses captions fictifs) pour le launch. Arthur ne touche pas en
> phase 1.

Aujourd'hui `<SocialWall>` affiche des
captions fictifs :

```ts
// src/components/podcast/social-wall.tsx
const TIKTOK_PLACEHOLDERS = [...];
const INSTA_PLACEHOLDERS = [...];
```

**Plan pragmatique** (du plus simple au plus carré) :

- [ ] **V1 lo-fi — Liste manuelle des derniers URLs**
  - Créer `src/data/social.ts` avec un array de 4-6 URLs TikTok et 3-4 URLs
    Instagram à la main (le top en avant, à actualiser tous les ~15 jours)
  - Effet : on supprime les captions fictifs, on a du vrai contenu
    cliquable avec thumbnail
  - Effort : 30 min de code + 5 min/mois de maintenance

- [ ] **V2 — TikTok oEmbed (sans auth)**
  - Endpoint **public sans token** : `GET https://www.tiktok.com/oembed?url=<post-url>`
  - Retourne `{ html, thumbnail_url, title, author_name, ... }`
  - Workflow : pour chaque URL dans `social.ts`, appeler l'oEmbed côté
    serveur, cacher le résultat
  - Doc : https://developers.tiktok.com/doc/embed-videos
  - Effort : 1-2h ; gros gain visuel

- [ ] **V2 — Instagram oEmbed (sans auth, sans Facebook App)**
  - Endpoint **public** : `GET https://api.instagram.com/oembed/?url=<post-url>`
    (⚠️ déprécié officiellement mais marche encore en novembre 2025)
  - Alternative officielle : Facebook oEmbed
    `GET https://graph.facebook.com/v18.0/instagram_oembed?url=<post-url>&access_token=<token>`
  - Effort : 1h (sans token) ou 2h (avec token Facebook App)

- [ ] **V3 — Récupération auto via Instagram Graph API + TikTok Display API**
  - Pour récupérer **automatiquement** la liste des derniers posts (plus de
    maintenance manuelle)
  - Instagram : Business/Creator account requis, app Facebook, token long-lived
  - TikTok : Display API avec OAuth
  - Effort : 1 jour + setup Facebook App
  - **Pas prio** — la solution manuelle (V1+V2) couvre largement le besoin
    en attendant

- [ ] **Fallback gracieux** dans tous les cas
  - Si l'API tombe ou si pas de token → garder les placeholders typo actuels
  - Pas de `loading…` vide qui casse la page

### 🟢 Stats live des plateformes (pas prio)

> **Pourquoi rétrogradé en 🟢 ?**
> Les chiffres d'audience sur `/partenariat` sont aujourd'hui inventés.
> Brancher des APIs analytics (Instagram Graph, TikTok Display, Apple
> Podcasts Connect, Spotify for Podcasters) demande beaucoup de plumbing
> (app Facebook, OAuth, tokens long-lived, refresh, rate limits) pour un
> écran qui n'est pas le cœur du site.
>
> **Décision V2** : on se concentre d'abord sur finir le site (assets,
> social wall, RSS épisodes). Les stats live, on s'en occupe plus tard,
> quand l'équipe aura validé les vrais chiffres à afficher de toute façon.

**Solution simple en attendant** : éditer manuellement le tableau `audience`
dans `src/app/partenariat/page.tsx` avec les vrais chiffres une fois par
trimestre. C'est tout.

Si un jour ça devient nécessaire de l'automatiser :

- [ ] **Followers Instagram** via Graph API (`GET /{ig-user-id}?fields=followers_count`)
- [ ] **Followers/vues TikTok** via Display API
- [ ] **Auditeur·ices podcast** — pas d'API publique propre (Apple/Spotify/Deezer).
  Recommandation : snapshot mensuel manuel dans `data/stats.ts`
- [ ] **Audience festival** — donnée manuelle stockée dans `data/festival.ts`
  après chaque édition
- [ ] **Implémentation** quand le moment viendra :
  - `src/lib/stats/*.ts` un module par plateforme
  - Route handler `app/api/stats/route.ts` qui agrège
  - Fetch côté Server Component avec `revalidate: 21600` (6h)

---

## 🎨 Assets — passer aux vrais visuels

Les vrais assets officiels sont à la racine dans `medias/`. Voir
**HANDOVER.md section 11** pour le mode d'emploi détaillé.

- [ ] **Copier les assets dans `public/brand/`**
  ```bash
  mkdir -p public/brand
  cp medias/FieresLOGOstars_Sansfond.png public/brand/logo-white.png
  cp medias/FieresLOGOstars_SansfondNOIR.png public/brand/logo-black.png
  cp medias/Affiche.png public/brand/affiche-2025.png
  cp "medias/KIT MEDIA FIER.E.S.pdf" public/brand/kit-media.pdf
  ```

- [ ] **Optimiser les images** (priorité : l'affiche fait 3.8 MB en PNG)
  - Convertir l'affiche en `.webp` (cible : < 500 kB sans perte visible)
  - Garder une version PNG aussi (pour fallback social share, OG image)
  - Logo : déjà raisonnable en PNG (~145 kB), mais idéal serait du SVG

- [ ] **Brancher le vrai logo partout**
  Endroits à modifier :
  - [ ] `src/components/shared/navbar.tsx` — logo gauche (desktop)
  - [ ] `src/components/shared/navbar.tsx` — logo en haut du menu mobile
  - [ ] `src/components/shared/footer.tsx` — gros logo décoratif
  - [ ] `src/components/podcast/hero.tsx` — gros "Fier.e.s" central du hero
  - [ ] `src/components/festival/hero.tsx` — idem hero festival
  - Règle : sur fond orange → logo **noir**, sur fond `ink` (noir) → logo **blanc**
  - Utiliser `next/image` avec `priority` pour le logo navbar (au-dessus du fold)

- [ ] **Ajouter l'affiche officielle**
  - En arrière-plan du hero festival, ou en card sur la page `/festival`
  - Avec `next/image` + `placeholder="blur"` + `sizes` responsive

- [ ] **Référencer le kit média PDF**
  - Lien dans `app/partenariat/page.tsx` (remplacer la mention "kit dispo par mail" par un vrai bouton de téléchargement)
  - Lien en bonus dans le footer ?

- [ ] **Mettre à jour `data/brand.ts`** avec les chemins :
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

- [ ] **Demander un logo SVG vectoriel** à l'équipe — bien mieux que PNG
  pour le scale infini et le poids. Si pas dispo, le créer depuis le PNG
  noir via Illustrator / Inkscape / un service web (Vector Magic, etc.).

- [ ] **Photo HD de Thomas Chinarro** — actuellement placeholder "TC" sur
  fond orange dans `host-section.tsx` et `a-propos/page.tsx`.

- [ ] **Photos / illustrations des invité·es phares** (Elips, Paloma,
  François Chaignaud, Lou Trotignon, Nous Toutes 33, Matthieu Barbin).
  Quand dispos, brancher dans `EpisodeCover` via une prop `imageUrl`.

- [ ] **Photos behind-the-scenes** pour étoffer la section social wall en
  attendant l'oEmbed.

---

## 📝 Contenu — remplacer les placeholders rédactionnels

### 🔴 Basculer tous les textes inventés en Lorem ipsum (phase 1, dernière étape avant review Thomas)

> **Quand ?** Une fois que **logo + RSS + assets** sont en place (étapes
> 1-3 de la checklist Phase 1), Arthur passe sur cette section AVANT
> d'envoyer le lien à Thomas.
>
> **Pourquoi ?** Beaucoup de copy a été générée pour rendre la démo
> crédible (bios, descriptifs d'épisodes, manifestes, blurbs, etc.).
> Le souci : à l'œil nu, ces textes inventés se confondent avec du
> contenu validé. Le **Lorem ipsum sert de signal visuel à Thomas** :
> quand il regarde le site, il voit immédiatement "ici je dois écrire le
> vrai texte". Plus de risque qu'il croie qu'un texte inventé est le vrai.
>
> Workflow validé :
> 1. Arthur finalise structure tech (logo + RSS + assets)
> 2. Arthur Lorem-ifie tous les textes inventés
> 3. Lien envoyé à Thomas pour review
> 4. Thomas remplace chaque Lorem par son vrai texte
> 5. Ship 🚀

**Ce qui doit RESTER tel quel** (validé pendant le brief) :

- ✅ `brand.tagline` — "Un podcast queer et engagé qui met en lumière les voix qu'on n'entend pas assez."
- ✅ `host.name` / `host.pronouns` / `host.role` — Thomas Chinarro, il/lui, host & médiateur
- ✅ `platforms[]` — URLs Deezer / Apple / Amazon / Spotify (réelles)
- ✅ `brand.contactEmail` — `fier.e.s.podcast@gmail.com`
- ✅ Festival 2025 : date, lieu, billetterie HelloAsso
- ✅ Noms des 6 invité·es phares (Elips, Paloma, François Chaignaud, Lou Trotignon, Nous Toutes 33, Matthieu Barbin) + leurs rôles génériques
- ✅ Résidence Gaîté Lyrique : noms Ebony et Tess Kirby

**Ce qui doit être remplacé par du Lorem ipsum** (inventaire complet) :

- [ ] **Bio de Thomas** — `src/data/podcast.ts` → `host.bio` (paragraphe complet)
- [ ] **Citation hôte** — `src/components/podcast/host-section.tsx` → blockquote « On peut pas tout dire, mais on essaie quand même. »
- [ ] **Descriptions des 6 épisodes phares** — `src/data/podcast.ts` → `featuredEpisodes[].description` (6 paragraphes)
- [ ] **Titres des 6 épisodes phares** (les sous-titres après le tiret) — `src/data/podcast.ts` → `featuredEpisodes[].title`
  - ex. "Elips — drag, monstre, et liberté" → "Elips — Lorem ipsum dolor sit amet"
  - Garder le nom de l'invité·e (validé), seul le sous-titre est inventé
- [ ] **26 épisodes placeholders** — `src/data/podcast.ts` → `placeholderTitles[]` (titres, guests, guestRoles fictifs)
  - Idéal : virer entièrement quand le RSS est branché
  - En attendant : passer tous les titles + guest names + guestRoles en Lorem
- [ ] **Description générique des épisodes placeholder** — `src/data/podcast.ts` → la string `"Conversation queer sans filtre, à écouter en marchant..."` dans `buildPlaceholders()`
- [ ] **Méta saisons** (titres et pitches) — `src/data/podcast.ts` → `seasonMeta[]`
  - "Saison 1 — Les premières voix" + pitch → tous inventés
  - À remplacer par les vrais noms / pitches des saisons quand connus
- [ ] **`brand.description`** — `src/data/brand.ts` (paragraphe "Fier.e.s est un podcast hebdomadaire...")
- [ ] **Résidence Gaîté Lyrique** — `src/data/residence.ts`
  - `residence.pitch`
  - `residence.description`
  - `residence.guests[].blurb` × 2 (Ebony + Tess Kirby)
- [ ] **Page À propos** — `src/app/a-propos/page.tsx`
  - Les 4 principes du manifeste (`principles[]`)
  - Texte sous le titre "Quatre principes, qu'on n'oublie jamais."
  - Paragraphe "Fier.e.s, c'est aussi une équipe qui prépare..."
  - Paragraphe sous "Une voix qu'on devrait inviter ?"
- [ ] **Page Partenariat** — `src/app/partenariat/page.tsx`
  - Pitch hero "Fier.e.s est un podcast indépendant — mais on aime..."
  - Les 4 cards d'offres (`offers[]` : Sponsoring épisode, Co-production, Partenaire festival, Kit presse) → bodies à virer en Lorem
  - Les 4 chiffres d'audience (`audience[]`) → déjà notés comme TODO ci-dessus pour les vrais KPI
  - Texte "On en parle ?" + paragraphe sous
- [ ] **Section "Suivre" du social wall** — `src/components/podcast/social-wall.tsx`
  - "Les meilleurs moments des épisodes sortent en clips..."
- [ ] **Captions placeholders TikTok / Insta** — `src/components/podcast/social-wall.tsx`
  - `TIKTOK_PLACEHOLDERS[].caption` × 4
  - `INSTA_PLACEHOLDERS[].caption` × 3
- [ ] **Featured episodes — section intro** — `src/components/podcast/featured-episodes.tsx`
  - "Six conversations à ne pas manquer si tu découvres Fier.e.s..."
- [ ] **Festival feature — section intro** — `src/components/podcast/festival-feature.tsx`
  - "Une journée — drag, marché, talk, showcase. Le podcast quitte le micro pour la scène..."
- [ ] **Résidence highlight — section intro** — `src/components/podcast/residence-highlight.tsx`
  - Identique au pitch dans `residence.ts`
- [ ] **Sous-titres / pitches des sections de la home podcast**
  - `podcast/hero.tsx` — pitch sous le titre
  - `podcast/host-section.tsx` — paragraphe bio
  - Tout `subtitle` / paragraphe de section qui n'est pas un fait validé

**Conseil de mise en œuvre** :

- Préférer un Lorem ipsum **typé** au lieu du classique latin : `loremipsum.io/generator` permet de générer du Lorem en français.
- Garder la **longueur** approximative pour ne pas casser la mise en page.
- Marquer les Lorem dans le code avec un commentaire `// PLACEHOLDER — à remplacer par le vrai texte` pour rendre l'inventaire trivial à retrouver via `grep`.

```bash
grep -rn "PLACEHOLDER" src/    # tous les Lorem identifiés
```

---

### Autres contenus à remplacer (vrais textes attendus)

- [ ] **Vraie bio de Thomas Chinarro**
  - Fichier : `src/data/podcast.ts` → constante `host.bio`
  - Actuel : généré, à remplacer

- [ ] **Vraie liste des 30+ épisodes**
  - Fichier : `src/data/podcast.ts` → tableau `placeholderTitles`
  - À retirer dès que le RSS est branché (cf. section APIs ci-dessus)

- [ ] **Manifeste / charte éditoriale** — actuellement on a 4 principes
  inventés dans `app/a-propos/page.tsx`. À valider ou réécrire avec
  Thomas.

- [ ] **Vrais chiffres d'audience** sur `/partenariat` (cf. section stats live)

- [ ] **Dates exactes de la résidence Gaîté Lyrique**
  - Fichier : `src/data/residence.ts`
  - Actuel : "Status: À venir" + "Dates: À confirmer prochainement"

- [ ] **Vraie liste des partenaires festival** (logos vectoriels manquants)
  - Fichier : `src/data/festival.ts`
  - Idéal : SVG transparent de chaque logo dans `public/partners/`
  - Aujourd'hui : juste du texte stylisé en placeholder

- [ ] **URL Instagram du compte podcast** (si différent du compte festival)
  - Fichier : `src/data/brand.ts` → `brand.socials.instagram.url`

- [ ] **URL TikTok réelle**
  - Fichier : `src/data/brand.ts` → `brand.socials.tiktok.url`

- [ ] **Domaine final décidé**
  - Fichier : `src/data/brand.ts` → `brand.domain`
  - Aujourd'hui : placeholder `fier-e-s.fr`

---

# 🟢 Phase 2 — post-launch, plus tard

> Tout ce qui suit est **explicitement reporté après le ship**. Le site
> tourne, Thomas l'a validé, on est en ligne. C'est seulement ensuite
> qu'on attaque ces chantiers. **Ne pas se laisser distraire** : la phase
> 1 d'abord, en entier.

---

## 🛠️ Features V3 — ce qui n'a pas été codé en V2

### 🟡 Pages individuelles d'épisode

- [ ] **Route `/episodes/[slug]/page.tsx`** — actuellement on a juste
  `/episodes` (catalogue). Une page par épisode permettrait :
  - SEO (chaque épisode = une page indexée)
  - Partage social ciblé (OG image par épisode)
  - Transcription si dispo
  - Cross-link entre épisodes ("avec le même invité·e")
  - Implémentation : `generateStaticParams` à partir de `allEpisodes` → 30+ pages statiques

- [ ] **Player audio inline sur la page épisode**
  - Iframe Deezer embed : `<iframe src="https://widget.deezer.com/widget/dark/episode/<id>">`
  - Ou Apple Podcasts embed : `<iframe src="https://embed.podcasts.apple.com/fr/podcast/...">`
  - À utiliser uniquement sur la page d'épisode dédiée (pas sur la home, pour rester sobre)

### 🟡 Recherche & filtres avancés

- [ ] **Search fulltext sur `/episodes`**
  - Lib client : **Fuse.js** (fuzzy search, léger, ~10 kB)
  - Index sur titre + invité·e + description
  - Input avec debounce (300ms)

- [ ] **Filtres par tag thématique** (drag, intimité, politique, militantisme...)
  - Ajouter `tags: string[]` au type `Episode`
  - Chips de filtre cumulables au-dessus du listing
  - URL sync : `?tag=drag&tag=intimite`

### 🟡 Newsletter

- [ ] **Formulaire newsletter** (quand l'équipe sera prête à le brancher)
  - Outils recommandés : **Buttondown** (le plus simple), Brevo (ex-Sendinblue), Beehiiv
  - Form simple : juste un champ email
  - Endpoint : API route Next qui forward au provider
  - Confirmer le double opt-in obligatoire pour la conformité RGPD

### 🟡 Transcriptions

- [ ] **Onglet "Transcription" sur la page épisodes**
  - UI déjà prévue (TODO commenté dans `episodes/page.tsx`)
  - Source : outils de transcription auto (Whisper / Otter.ai / Descript)
  - Format : Markdown stocké par épisode, ou JSON timecodé
  - SEO énorme : chaque épisode devient indexable sur son contenu

### 🟢 CMS

- [ ] **Migration vers Sanity** (quand l'ajout d'épisode manuel devient pénible)
  - Schemas à créer : `Episode`, `Speaker`, `Season`, `Partner`, `Page`
  - Studio admin pour Thomas + équipe
  - Webhook on-publish → revalidate ISR Next.js
  - Migration script : lire `src/data/*.ts`, push dans Sanity

  Alternative légère : **Notion comme CMS** (lecture seule). Une DB Notion
  pour les épisodes, fetch via Notion API depuis un Server Component.

### 🟢 Multi-langue

- [ ] **FR / EN** via `next-intl` ou `next-international`
  - Probablement pas prioritaire vu le public francophone, mais
  prévoir le routing `[locale]` propre dès maintenant pour ne pas se
  prendre une migration ultérieure.

### 🟢 PWA

- [ ] **Manifest + service worker** pour installable sur téléphone
  - Lib : `next-pwa`
  - Icônes générées depuis le logo SVG

### 🟢 Formulaires de candidature

- [ ] **Candidature marché créateur·rices** (pour le festival)
- [ ] **Candidature bénévole**
- [ ] **Proposition invité·e podcast**
  - Backend simple : **Resend** pour envoi email + une route Next API
  - Ou **Formspree** pour zéro backend

---

## 🌐 SEO polish (phase 2)

> Le SEO **basique** (sitemap, robots, favicon, OG statique) est déjà
> couvert en phase 1. Cette section concerne le **polish post-launch**.

- [ ] **OG images dynamiques** par page via `next/og`
  - Une OG image générée pour chaque épisode (titre + invité·e + cover)
  - Doc : https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-image-generation

- [ ] **Structured data JSON-LD**
  - Schema `PodcastSeries` pour le site
  - Schema `PodcastEpisode` pour chaque épisode (quand pages individuelles existent)
  - Schema `Event` pour le festival
  - Doc : https://schema.org/PodcastSeries

- [ ] **Soumettre le site aux annuaires queer**
  - Que Faire à Paris, Komitid, Têtu, Time Out queer, Yagg...
  - À faire manuellement quand le domaine final sera décidé

---

## ♿ Accessibilité (phase 2)

- [ ] **Audit clavier complet** (Tab / Shift+Tab / Enter / Espace partout)
  - Vérifier que le bandeau festival ne piège pas le focus
  - Vérifier la modale `ListenModal` (Tab loop dedans)
  - Vérifier le menu mobile

- [ ] **Test VoiceOver** (macOS) + **NVDA** (Windows)
  - Hiérarchie des titres
  - Labels ARIA
  - Annonces des sections

- [ ] **Audit contraste WCAG AA** (outil : axe DevTools, Lighthouse)
  - Suspect : gradient orange-400 → orange-600 sur les textes du hero
  - Suspect : texte `text-bone/60` ou `/50` sur fond `ink`

- [ ] **`alt`** descriptifs sur les vraies images (placeholders n'en ont pas besoin)

- [ ] **`prefers-reduced-motion`** déjà respecté (Lenis + cursor). Vérifier
  aussi les `animate-pulse-cta` et autres animations CSS.

- [ ] **Test PMR / lecteurs d'écran avec un·e vrai·e utilisateur·rice** (le top)

---

## ⚡ Performance (phase 2)

> L'**optimisation images** est en phase 1 (cf. section dédiée plus haut).
> Ici on parle d'audit Lighthouse complet, bundle analysis, etc.

- [ ] **Lighthouse audit complet** (mobile + desktop)
  - Cibler : Perf > 90, A11Y > 95, SEO > 95, BP > 95

- [ ] **Image optimization**
  - Toutes les images via `next/image` (pas de `<img>` raw)
  - `sizes` prop pour chaque image responsive
  - `priority` pour le hero (au-dessus du fold)
  - `placeholder="blur"` pour les images lourdes

- [ ] **Police self-hosted** déjà fait (via `next/font`)

- [ ] **Bundle analysis**
  ```bash
  ANALYZE=true npm run build
  ```
  (nécessite d'ajouter `@next/bundle-analyzer` au repo si besoin)

- [ ] **Lighthouse mobile sur la home**
  - Actuelle : 156 kB First Load JS. Cible : < 200 kB total.

---

## 🔍 Monitoring & analytics (phase 2)

> **Trop big pour le launch** (décision validée). Sentry, Lighthouse,
> analytics, uptime : on s'en occupe une fois le site stable, avec du recul
> sur ce dont on a vraiment besoin.

- [ ] **Analytics** — choisir un outil sans cookie tracker (RGPD-friendly)
  - **Plausible** (payant, simple) ou
  - **Umami** (open source, self-host possible) ou
  - **Vercel Analytics** (gratuit pour les sites Vercel, basique mais pratique)

- [ ] **Monitoring erreurs**
  - **Sentry** (free tier suffisant pour un site comme ça)
  - Ou rien : un site statique sans backend a peu d'erreurs runtime

- [ ] **Uptime alerting** (optionnel)
  - BetterStack / UptimeRobot — ping toutes les 5 min

---

## 🚀 Déploiement / DevOps

> Le **déploiement** sera discuté entre Arthur et toi/Thomas — pas de
> décision figée. Probablement Vercel mais à valider ensemble.

### Phase 1

- [ ] **Déployer sur Vercel** (zéro config — voir HANDOVER section 17)
  - À discuter avec Arthur sur le timing (preview en cours de prog ou
    seulement à la fin)
- [ ] **Configurer le domaine final** quand décidé avec Thomas
  - Vercel → Project Settings → Domains
  - Met à jour `brand.domain` dans `data/brand.ts`
  - Vérifier que `metadataBase` dans `layout.tsx` utilise bien le nouveau domaine

### Phase 2

- [ ] **Variables d'environnement Vercel** (quand les APIs seront branchées)
  - `INSTAGRAM_TOKEN`, `TIKTOK_TOKEN` (stats live)
  - `SANITY_PROJECT_ID` / `SANITY_DATASET` / `SANITY_TOKEN` (quand CMS migré)
  - `RESEND_API_KEY` (quand formulaires)

- [ ] **Workflow CI** (optionnel, GitHub Actions)
  - Lint + build sur chaque PR
  - Preview deploy Vercel auto (Vercel le fait par défaut)

- [ ] **Branch protection** sur `main` (interdire push direct, exiger PR)

---

## 🧹 Tech debt / polish (phase 2)

- [ ] **Retirer le `id="top"`** du `festival/hero.tsx` — plus utilisé,
  hérité de la V1.

- [ ] **Composant `<EpisodeCard>` factorisé**
  - Aujourd'hui le rendu des cards épisode est dupliqué entre
    `featured-episodes.tsx` et `episodes/page.tsx`. À factoriser.

- [ ] **Composant `<SectionTitle>` factorisé**
  - Pattern récurrent : `<span>chip orange</span><h2>gros titre</h2>`.
    Factoriser pour éviter la répétition.

- [ ] **Tests unitaires basiques** (au moins sur les helpers)
  - `lib/utils.ts` — `cn()` se teste en 3 lignes
  - Lib de fetch RSS quand elle existera

- [ ] **Storybook ou équivalent** (optionnel)
  - Si on a beaucoup de composants à montrer à l'équipe pour validation.

---

## 🎪 Festival — état de la page (décision avec Thomas)

> ⚠️ **L'édition du 13 juin 2025 est déjà passée** (on est en mai 2026).
> La page `/festival` continue d'afficher "édition à venir, billets actifs"
> comme si on était en pré-juin 2025. **Cette incohérence doit être
> tranchée AVANT le launch public**, en discussion avec Thomas.

Trois options à proposer à Thomas :

- [ ] **Option A — Archive 2025 pure**
  - Bandeau "Édition 2025 — c'est passé, merci à toustes 🧡"
  - CTA "Voir les photos" / "Aftermovie" au lieu de "Billets"
  - Garder le contenu visible (programme, artistes, partenaires) pour mémoire
  - Supprimer le `<FestivalBanner>` sticky du layout

- [ ] **Option B — Archive 2025 + teaser 2026**
  - Page archive comme en A
  - Bandeau sticky modifié : "Édition 2026 — save the date" (sans date précise)
  - Pointe vers une page recap / newsletter pour suivre l'annonce

- [ ] **Option C — Nouvelle édition 2026 confirmée**
  - Remplacer tout le contenu festival pour 2026 (date, lieu, prog, artistes)
  - Garder le mode "billets actifs"
  - Créer optionnellement une route `/festival/archives/2025` pour mémoire

**Fichiers impactés selon l'option** :
- `src/app/festival/page.tsx`
- `src/components/shared/festival-banner.tsx`
- `src/data/festival.ts`
- `src/components/podcast/festival-feature.tsx` (la section featured sur la home podcast)

---

## 📦 Commandes utiles pour bosser sur ces TODOs

```bash
# Lister tous les TODO dans le code
grep -rn "TODO" src/

# Voir où chaque composant est utilisé
grep -rn "FeaturedEpisodes\|EpisodeCover\|ListenModal" src/

# Build pour vérifier que rien ne casse
npm run build

# Dev sur :3000
npm run dev

# Mesurer la perf
npx lighthouse http://localhost:3000 --view
```

---

## 🤝 Conventions pour cocher les items

- Quand tu démarres : `- [ ] (Arthur, WIP) Mon item`
- Quand tu finis : `- [x] Mon item` (et commit avec le numéro de la section)
- Si tu trouves un sous-todo en cours de route : ajoute-le sous l'item parent (indenté)
- Si tu décides qu'un item est obsolète : raye-le (`~~item~~`) avec une raison entre crochets

> Bon code 🧡
