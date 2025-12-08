# Guide de déploiement — WebResume

Ce document explique deux façons simples et rapides de déployer la version statique de votre site `webresume` :
- GitHub Pages (hébergement directement depuis le dépôt)
- Vercel (déploiement continu depuis le dépôt Git)

Le guide suppose que votre site est une application statique (sans étape de build complexe). Si vous avez un outil de build (Vite, Webpack, etc.), adaptez la section `build` en conséquence.

---

**Pré-requis**
- Git installé
- Accès au dépôt distant (GitHub)
- Compte GitHub (pour GitHub Pages)
- Compte Vercel (pour Vercel) si utilisé

---

## 1) Déploiement sur GitHub Pages (méthode simple)

Option A — Déploiement depuis la branche `main` (utiliser `/docs` ou renommer `www/`)
1. Assurez-vous que votre site est prêt et que l'index HTML se trouve dans `www/` (fichier `www/index.html`).
  Si vous préférez que GitHub Pages serve directement depuis `main`, renommez `www/` en `docs/` (GitHub Pages autorise `/` ou `/docs` pour la branche configurée).
2. Poussez vos modifications sur `main` :

```bash
git add .
git commit -m "chore(release): prepare site"
git push origin main
```

3. Ouvrez votre dépôt sur GitHub → `Settings` → `Pages` (section 'Pages' ou `Settings -> Pages`).
4. Dans "Source" choisissez `Branch: main` et `Folder: /docs` (si vous avez renommé `www/` en `docs/`) puis cliquez sur `Save`.
5. Après quelques minutes, GitHub Pages publiera le site à l'URL : `https://<votre-utilisateur>.github.io/<repo>/` ou, si vous utilisez un repo `user.github.io`, à `https://<votre-utilisateur>.github.io/`.

Notes :
- Si vous souhaitez un domaine personnalisé, ajoutez un fichier `CNAME` à la racine contenant votre nom de domaine (ex: `example.com`) et configurez les enregistrements DNS (A / CNAME) selon la documentation GitHub.
- Pour forcer l'utilisation d'une branche dédiée (ex: `gh-pages`), utilisez `git subtree` ou le module `gh-pages` (npm) — utile si vous générez un `dist/` via un build step.

Option B — Branch `gh-pages` (si vous avez un build step)
- Si vous préférez laisser votre site sous `www/`, publiez le contenu de `www/` vers la branche `gh-pages` (option sans renommer en `docs/`). Exemple :

```bash
# Publier le répertoire www/ sur gh-pages (option 1 : git subtree)
git subtree push --prefix www origin gh-pages

# Ou (option 2) avec gh-pages npm :
npx gh-pages -d www
```

Ces commandes publient uniquement le contenu du dossier `www/` sur la branche `gh-pages` utilisée par GitHub Pages.

---

## 2) Déploiement sur Vercel (recommandé pour CI/CD et simplicité)

Vercel est très simple pour les sites statiques.

Option A — Via l'interface web
1. Rendez-vous sur https://vercel.com et connectez-vous.
2. Cliquez sur "Import Project" → connectez votre compte GitHub et sélectionnez le dépôt `webresume`.
3. Pour un site statique sans build :
   - `Framework Preset` : `Other` (ou `Static Site`)
   - `Build Command` : laissez vide (ou `npm run build` si vous en avez une)
   - `Output Directory` : `/` (ou `dist` si vous avez un build)
4. Déployez — Vercel lancera un déploiement initial et fournira une URL de production.

Option B — Via la CLI (rapide, en local)
1. Installez la CLI :

```bash
npm i -g vercel
```

2. Depuis la racine du projet, lancez :

```bash
vercel --prod
```

3. Suivez l'assistant (sélection du scope, du projet); Vercel déployera et retournera l'URL publique.

Notes :
- Vercel supporte les déploiements automatiques à chaque push sur la branche configurée (ex: main).
- Pour un domaine personnalisé, ajoutez-le via l'interface Vercel et suivez les instructions DNS.

---

## 3) Recommandations et checklist pré-release
- Vérifier localement :
  - La page s'ouvre via `python3 -m http.server 8000` et ressemble à la version attendue.
  - Tester les fonctionnalités : bascule de langue, export PDF (header/footer), compatibilité mobile.
- Mettre à jour `CHANGELOG.md` et `README.md` (indiquez la version et la méthode d'installation/déploiement).
- Créer un tag Git annoté :

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

- (Optionnel) Archiver une release (zip) :

```bash
# Si vous souhaitez archiver uniquement le site statique placé dans `www/` :
git archive --format=zip --output=webresume-v1.0.0.zip HEAD:www

# Ou, si `www/` n'est pas disponible via git archive, zip le dossier localement :
# (requiert `zip`)
#(cd www && zip -r ../webresume-v1.0.0.zip .)
```

---

## 4) DNS / domaine personnalisé (résumé)
- GitHub Pages : créer un fichier `CNAME` contenant votre domaine, puis configurer enregistrements DNS (A records vers GitHub IPs ou CNAME vers `username.github.io`). Voir docs GitHub Pages.
- Vercel : ajouter le domaine dans le dashboard Vercel et suivre les instructions pour ajouter les enregistrements DNS fournis.

---

## 5) Post-release (optionnel)
- Mettre en place une action GitHub (workflow) pour vérifier l'accessibilité et exécuter des tests automatisés sur push/tags.
- Ajouter un petit script `release.sh` pour automatiser tag/zip/push.

---

Si vous voulez, je peux :
- ajouter un `CHANGELOG.md` et un tag `v1.0.0` automatiquement, ou
- préparer un petit `GitHub Action` qui publie la release quand on pousse un tag `v*`.

*** Fin du guide ***
