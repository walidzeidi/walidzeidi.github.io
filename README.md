# CV Walid ZEIDI — Vue.js

Découpage du CV (HTML statique) en projet Vue 3 + Vite, avec le contenu externalisé dans `db.json`.

## Structure

```
cv-vuejs/
├── db.json                     # source de données (aussi copié dans public/)
├── index.html                  # point d'entrée Vite
├── public/
│   ├── db.json
│   ├── photo-walid.png
│   ├── cv-walid-zeidi.pdf
│   └── dossier-*.pdf           # dossiers techniques des projets
└── src/
    ├── main.js
    ├── App.vue                 # charge db.json (provide/inject), TopBar + router-view + Footer
    ├── router/
    │   └── index.js            # routes: "/" (CV) et "/projets" (page Projets filtrable)
    ├── views/
    │   ├── Home.vue            # Hero, Expérience, Stack, Intégration, Formation
    │   └── Projects.vue        # page dédiée avec filtre par catégorie
    ├── style.css                # design system (variables CSS, styles partagés)
    └── components/
        ├── TopBar.vue           # nav CV/Projets + thème + téléchargement PDF
        ├── Hero.vue
        ├── ExperienceSection.vue
        ├── StackSection.vue
        ├── IntegrationSection.vue
        ├── FormationSection.vue
        └── SiteFooter.vue
```

## Page Projets (`/#/projets`)

Les projets sont classés par `category` dans `db.json` (`Plateforme`, `Site web`, `Logo & identité`). Des onglets en haut de la page filtrent la grille en direct. Un projet sans dossier PDF (`"file": null`) s'affiche comme une carte informative non cliquable plutôt qu'un lien.

Pour ajouter un projet : ajoutez une entrée dans le tableau `projects` de `db.json` avec `id`, `name`, `category` (doit correspondre à une valeur de `projectCategories`), `tagline`, `badge`, et `file` (chemin du PDF ou `null`).

La navigation utilise le mode "hash" de Vue Router (`/#/projets`) plutôt que l'historique HTML5, pour fonctionner sur GitHub Pages sans configuration serveur supplémentaire.

## Installation

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```
Ouvre `http://localhost:5173`. Les données sont chargées via `fetch('/db.json')` depuis `public/db.json`.

## Build production

```bash
npm run build
npm run preview
```

## Utiliser db.json comme vraie API (optionnel)

Un `db.json` à la racine est prêt pour `json-server` si vous préférez servir les données via une API REST plutôt qu'un fichier statique :

```bash
npm run api
# → API disponible sur http://localhost:3001 (ex: /experiences, /projects, /stack...)
```

Dans ce cas, changez le `fetch('/db.json')` de `src/App.vue` par des appels vers `http://localhost:3001/...` (un appel par ressource, json-server exposant chaque clé racine comme une route).

## Formulaire de contact

En bas de la page d'accueil, un formulaire (Nom / Email / Message) envoie un email à `zaidi.walid@gmail.com` via **Formspree** (service gratuit, aucun backend à héberger — indispensable sur GitHub Pages qui ne sert que du statique).

**Configuration obligatoire avant que ça fonctionne :**

1. Créez un compte gratuit sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire, avec `zaidi.walid@gmail.com` comme destinataire
3. Copiez l'URL fournie (`https://formspree.io/f/XXXXXXX`)
4. Collez-la dans `src/components/ContactForm.vue`, ligne `FORMSPREE_ENDPOINT`

Tant que cette étape n'est pas faite, le formulaire affichera un message d'erreur (avec un lien `mailto:` de secours) au lieu d'envoyer le message.

Le plan gratuit de Formspree autorise 50 soumissions par mois, largement suffisant pour un CV personnel.

## Modifier le contenu

Tout le texte du CV (expériences, projets, stack technique, formation, coordonnées) est dans `db.json` — aucune modification de composant `.vue` n'est nécessaire pour changer le contenu.

## Déployer sur walidzeidi.github.io

Ce projet contient déjà `.github/workflows/deploy.yml` qui build et déploie automatiquement sur GitHub Pages à chaque push sur `main`.

```bash
cd cv-vuejs
git init
git add .
git commit -m "CV Vue.js"
git branch -M develop
git remote add origin https://github.com/walidzeidi/walidzeidi.github.io.git
git push -u origin develop
```

Puis dans le repo GitHub : **Settings → Pages → Source → GitHub Actions**.

Après 1-2 minutes, le site est en ligne sur **https://walidzeidi.github.io/**.

Comme ce repo est un repo `<utilisateur>.github.io` (site racine), `base` reste `/` par défaut dans `vite.config.js` — aucune modification nécessaire.

