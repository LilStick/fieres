# 📋 TODO — Fier.e.s

Liste actionnable de tout ce qui reste à faire sur le site.
Pour chaque item :
- 🔴 = bloquant / haute priorité (à faire avant un partage public sérieux)
- 🟡 = qualité (déblocage de fonctionnalités vraies, fin des placeholders)
- 🟢 = polish / V3 / nice-to-have

> **Convention** : coche la case quand c'est fait (`- [x]`). Si tu démarres
> sans finir, écris ton nom à côté → `- [ ] (Arthur, WIP)` pour qu'on
> sache qui bosse dessus.

---

## 🚦 La grosse priorité — passer du hardcodé au live

Tout le contenu du site est aujourd'hui **figé dans `src/data/*.ts`** :
épisodes, plateformes, social wall, chiffres audience. C'est volontaire
pour livrer vite, mais c'est la dette principale à payer.

Objectif : **brancher les APIs réelles** pour que le site reflète
automatiquement les vrais épisodes, les vraies miniatures, les vrais
chiffres. Plus de placeholders, plus de chiffres inventés.

### 🔴 Récupération automatique des épisodes (RSS / API)

- [ ] **Parser le flux RSS** du podcast pour générer `allEpisodes` automatiquement
  - Deezer expose un RSS standard : `https://www.deezer.com/show/<id>/rss` (à valider)
  - Sinon, Apple Podcasts expose le RSS via Look-up API : `https://itunes.apple.com/lookup?id=1754599625&entity=podcast`
  - Ou le RSS d'origine (Acast, Ausha, Anchor, Hostinger, etc. — vérifier sur quel hébergeur Thomas publie)
  - Implémentation suggérée : **route handler** `app/api/episodes/route.ts` qui :
    1. Fetch le flux RSS
    2. Parse XML (lib : `fast-xml-parser` ou `rss-parser`)
    3. Normalise au format `Episode` défini dans `src/data/podcast.ts`
    4. Revalide toutes les heures (ISR : `export const revalidate = 3600`)
  - Effet : remplace les 26 `placeholderEpisodes` par les vrais épisodes
  - Garder une "couche d'enrichissement" locale pour ajouter manuellement des `featured: true`, tags, etc.

- [ ] **Vraies miniatures épisodes** (covers)
  - Le RSS contient toujours `<itunes:image>` par épisode → utiliser ça en priorité
  - Fallback sur la cover du show si miniature épisode absente
  - Stocker l'URL dans `Episode.coverUrl` (déjà prévu dans le type)
  - Bascule `<EpisodeCover>` : si `coverUrl` existe, afficher `<Image>` ; sinon, afficher le placeholder typo actuel

- [ ] **Vraies descriptions épisodes**
  - Le RSS contient `<description>` ou `<itunes:summary>` → propre, à utiliser
  - Strip les balises HTML (`description.replace(/<[^>]+>/g, '')`)

- [ ] **Vraies durées** depuis `<itunes:duration>` (format `mm:ss` ou `hh:mm:ss`)

- [ ] **Vraies dates de publication** depuis `<pubDate>` (format RFC 822)

### 🔴 Stats live des plateformes

Tous les chiffres dans `app/partenariat/page.tsx` (`audience`) sont
**inventés** :
```ts
const audience = [
  { label: "Auditeur·ices / mois", value: "+8 000" },
  { label: "Followers Instagram", value: "+12 000" },
  { label: "Vues TikTok / mois", value: "+250 000" },
  { label: "Festival 2024", value: "+800 personnes" },
];
```

À remplacer par des **vraies données**, idéalement live.

- [ ] **Followers Instagram**
  - **Instagram Graph API** (Business / Creator account requis) :
    `GET /{ig-user-id}?fields=followers_count`
    Doc : https://developers.facebook.com/docs/instagram-api/reference/ig-user
  - Nécessite un App Facebook + token long-lived (à stocker en env var `INSTAGRAM_TOKEN`)
  - Caching côté Next : revalidate toutes les 6h max

- [ ] **Vues / followers TikTok**
  - **TikTok Display API** : `GET /v2/research/user/info/` (champ `follower_count`)
    Doc : https://developers.tiktok.com/doc/research-api-specs-query-user-info
  - Auth OAuth requise, plus chiantos qu'Insta
  - Alternative lo-fi : scraping via **TikTok-Api** unofficial (fragile, à éviter en prod)

- [ ] **Auditeur·ices / mois (écoutes podcast)**
  - **Apple Podcasts Connect API** (analytics auteur) : si Thomas a accès au compte
  - **Spotify for Podcasters** : export CSV manuel, pas d'API publique propre
  - **Deezer Creator** : pas d'API analytics publique
  - **Solution réaliste V2.5** : agréger manuellement chaque mois et stocker dans `data/stats.ts` (genre snapshot mensuel)
  - **Solution V3** : un cron mensuel qui envoie un mail "go updater les chiffres" → c'est OK pour un podcast indépendant

- [ ] **Audience festival** (chiffres édition n-1)
  - Pas d'API — donnée stockée manuellement après chaque édition dans `data/festival.ts`

- [ ] **Implémentation suggérée**
  - Créer `src/lib/stats/` avec un module par plateforme (`instagram.ts`, `tiktok.ts`...)
  - Chaque module exporte `async function getXxxStats()` qui fetch + cache
  - Route handler `app/api/stats/route.ts` qui agrège
  - Sur la page `/partenariat`, fetch ces stats côté serveur (Server Component → `await getStats()`)
  - `export const revalidate = 21600` (6h)

### 🟡 Social wall (Instagram + TikTok embeds)

Aujourd'hui `<SocialWall>` affiche des **placeholders fictifs** :
```ts
const TIKTOK_PLACEHOLDERS = [...];
const INSTA_PLACEHOLDERS = [...];
```

Objectif : afficher les **vrais derniers Reels / TikToks**.

- [ ] **Instagram oEmbed**
  - **Instagram Basic Display API** (deprecated décembre 2024) → utiliser Instagram Graph API à la place
  - Endpoint media : `GET /{ig-user-id}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url`
  - Filtrer `media_type === "VIDEO"` ou `"REELS"`
  - Cacher 1h
  - Doc : https://developers.facebook.com/docs/instagram-api/guides/posting/

- [ ] **TikTok oEmbed**
  - Endpoint public sans auth : `GET https://www.tiktok.com/oembed?url=<post-url>`
  - Retourne HTML embed officiel + thumbnail
  - Workflow possible : récupérer la liste des derniers posts via Display API, puis pour chaque URL passer dans oEmbed pour avoir le HTML embed
  - Doc : https://developers.tiktok.com/doc/embed-videos

- [ ] **Fallback gracieux**
  - Si l'API tombe ou si pas de token, garder les placeholders typographiques actuels
  - Pas de `loading...` vide qui casse la page

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

## 🌐 SEO & partage social

### 🔴 Indispensable

- [ ] **`app/sitemap.ts`** — sitemap.xml généré auto par Next 14
- [ ] **`app/robots.ts`** — robots.txt
- [ ] **Favicon + apple-touch-icon** (depuis le logo officiel)
  - Files attendus : `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`
- [ ] **`<title>` + `<meta description>`** dédié par page
  - Partiellement fait (les pages ont des `export const metadata`)
  - Vérifier que CHAQUE page a un title spécifique
- [ ] **OG image globale** (image statique 1200×630 pour le partage social)
  - Fichier : `public/og.png`
  - Référencé dans `app/layout.tsx` → `metadata.openGraph.images`

### 🟡 Polish

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

## ♿ Accessibilité

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

## ⚡ Performance

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

## 🔍 Monitoring & analytics

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

- [ ] **Déployer sur Vercel** (zéro config — voir HANDOVER section 17)

- [ ] **Configurer le domaine final** quand décidé
  - Vercel → Project Settings → Domains
  - Met à jour `brand.domain` dans `data/brand.ts`
  - Vérifier que `metadataBase` dans `layout.tsx` utilise bien le nouveau domaine

- [ ] **Variables d'environnement Vercel** (quand les APIs seront branchées)
  - `INSTAGRAM_TOKEN`
  - `TIKTOK_TOKEN`
  - `RSS_FEED_URL` (si différent du dur)
  - `SANITY_PROJECT_ID` / `SANITY_DATASET` / `SANITY_TOKEN` (quand CMS migré)
  - `RESEND_API_KEY` (quand formulaires)

- [ ] **Workflow CI** (optionnel, GitHub Actions)
  - Lint + build sur chaque PR
  - Preview deploy Vercel auto (Vercel le fait par défaut)

- [ ] **Branch protection** sur `main` (interdire push direct, exiger PR)

---

## 🧹 Tech debt / polish

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

## 🎪 Festival — quand l'édition 2025 sera passée

À faire **après le 13 juin 2025** :

- [ ] **Basculer `/festival` en mode archive**
  - Bandeau "Édition 2025 — c'est passé, merci à toustes 🧡"
  - CTA "Voir les photos" / "Aftermovie" au lieu de "Billets"
  - Garder le contenu visible (programme, artistes, partenaires) pour mémoire

- [ ] **Mettre à jour le bandeau sticky** (`festival-banner.tsx`)
  - Soit le supprimer
  - Soit le passer en mode teaser "Édition 2026 — save the date" quand date connue
  - Soit le faire pointer vers une page recap / aftermovie

- [ ] **Photos de l'édition 2025**
  - Créer une route `/festival/archives/2025/page.tsx`
  - Galerie photo (lightbox)
  - Aftermovie YouTube/Vimeo si dispo

- [ ] **Mettre à jour `festival.date`** dans `src/data/festival.ts`
  - Soit retirer
  - Soit refléter l'édition suivante

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
