# CV Walid ZEIDI — Vue.js

Découpage du CV (HTML statique) en projet Vue 3 + Vite, avec le contenu externalisé dans `db.json`.

## Structure

```
cv-vuejs/
├── db.json                 # source de données (aussi copié dans public/)
├── index.html              # point d'entrée Vite
├── public/
│   ├── db.json             # servi tel quel par Vite en dev/prod (fetch('/db.json'))
│   ├── photo-walid.png
│   └── dossier-*.pdf       # dossiers techniques des projets
└── src/
    ├── main.js
    ├── App.vue              # charge db.json et distribue les données
    ├── style.css            # design system (variables CSS, styles partagés)
    └── components/
        ├── TopBar.vue
        ├── Hero.vue
        ├── ExperienceSection.vue
        ├── ProjectsSection.vue
        ├── StackSection.vue
        ├── IntegrationSection.vue
        ├── FormationSection.vue
        └── SiteFooter.vue
```

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

## Modifier le contenu

Tout le texte du CV (expériences, projets, stack technique, formation, coordonnées) est dans `db.json` — aucune modification de composant `.vue` n'est nécessaire pour changer le contenu.
