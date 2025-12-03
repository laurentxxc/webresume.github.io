<!--
Sync Impact Report

- Version change: template → 1.0.0
- Modified principles:
	- [PRINCIPLE_1_NAME] -> Minimalism & Accessibility
	- [PRINCIPLE_2_NAME] -> Static-First & Single-Page
	- [PRINCIPLE_3_NAME] -> Privacy & Data Minimization
	- [PRINCIPLE_4_NAME] -> Maintainability & Simplicity
	- [PRINCIPLE_5_NAME] -> Performance & SEO
- Added sections: Constraints & Requirements; Development Workflow
- Removed sections: none
- Templates checked:
	- .specify/templates/plan-template.md ✅ updated (compatible; Constitution Check placeholder supported)
	- .specify/templates/spec-template.md ✅ updated (no conflicts)
	- .specify/templates/tasks-template.md ✅ updated (no conflicts)
	- .specify/templates/commands/* ⚠ pending (directory missing; plan-template.md references '/specify/templates/commands/plan.md')
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): Ratification date missing — please set initial adoption date.
	- Create `.specify/templates/commands/plan.md` or remove its reference in templates.
-->

# WebResume Constitution

## Core Principles

### Minimalism & Accessibility
La présentation du CV doit rester minimale, lisible et accessible.
- MUST: Utiliser un HTML sémantique et du balisage correct (headings, lists, landmarks).
- MUST: Respecter au minimum le niveau WCAG AA là où c'est raisonnable (contraste, navigation au clavier, texte alternatif pour images).
- MUST: Le contenu doit être lisible sur mobile et bureau (responsive) et prendre en charge la navigation clavier.
Raison: Un CV en ligne doit être consultable par le plus grand nombre et mettre le contenu en avant.

### Static-First & Single-Page
Priorité à une page statique (ou simple SPA) générée côté build.
- MUST: L'application privilégie une page statique produite au build (HTML/CSS/JS minimal) et déployable sur GitHub Pages, Vercel, Netlify.
- SHOULD: Éviter les dépendances serveur pour la publication du contenu (pas de stockage d'utilisateurs ni de logique côté serveur nécessaires).
Raison: Simplicité, fiabilité et coût réduit pour héberger le CV.

### Privacy & Data Minimization
La confidentialité de l'auteur et des visiteurs est prioritaire.
- MUST: Aucune collecte de données personnelles des visiteurs par défaut.
- MUST: Aucun tracker tiers (analytics) n'est inclus sans consentement explicite. Si analytics sont utilisés, ils doivent être anonymisés et opt-in.
- SHOULD: Les formulaires (contact) doivent limiter les données demandées et expliciter leur usage.
Raison: Respect de la vie privée et conformité facile aux réglementations (ex. RGPD) pour un site personnel.

### Maintainability & Simplicity
Code simple, petite surface d'attaque et faible dette technique.
- MUST: Favoriser une structure de projet claire (ex: `index.html`, `assets/`, `styles/`, `images/`).
- MUST: Minimiser les dépendances ; préférer CSS/JS légers ou frameworks CDN bien compris.
- SHOULD: Documenter le processus de build/deploy dans `README.md` et garder des scripts de build reproductibles.
Raison: Facilite mises à jour, corrections et portabilité du site.

### Performance & SEO
Le site doit se charger rapidement et être trouvable par les moteurs de recherche.
- MUST: Optimiser les images (formats modernes, compression) et minimiser le JS/ CSS bloquant.
- MUST: Fournir métadonnées de base (meta title, description, open graph) et utiliser balises structurées pour l'information clé.
- SHOULD: Viser un temps de chargement initial faible (optimisation des ressources critiques).
Raison: Performance améliore l'expérience utilisateur et la découvrabilité.

## Constraints & Requirements

- Technologie principale: HTML5, CSS (vanilla ou utilitaire léger), JavaScript minimal (ES2020+ si nécessaire).
- Déploiement ciblé: hébergeurs statiques (GitHub Pages, Vercel, Netlify) ou CDN.
- Accessibilité: WCAG AA ciblé lorsque pertinent.
- Sécurité: ne pas embarquer de secrets côté client; tout secret doit être géré hors-repo.
- Dépendances: éviter les trackers et SDK tiers non essentiels.

## Development Workflow

- Branche principale: `main` (ou `master`) contient la version de production.
- Travail en branches de fonctionnalité: `feat/xxx` → PR vers `main`.
- Revue: au moins une approbation de revue de code (ou approbation du propriétaire du dépôt) avant merge.
- Tests/Validation: vérifier que le build produit un `index.html` valide et lancer des checks d'accessibilité automatisés si disponibles.
- Linting/Formatting: appliquer des règles de style (ex. `prettier`, `stylelint`) pour cohérence.
- Release & Versioning:
	- MAJOR.MINOR.PATCH selon sémantique:
		- MAJOR: changements incompatibles (refonte publique du contenu/structure qui casse les attentes).
		- MINOR: ajout de sections ou fonctionnalités (ex. formulaire de contact, PDF téléchargeable).
		- PATCH: corrections typographiques, optimisations, ajustements mineurs.

## Governance

- Amendements: Toute modification de la constitution se fait via une PR ciblant `main` avec description claire de la modification et justification.
- Approbation: Le dépôt propriétaire (ou les collaborateurs désignés) approuve les amendements. Pour ce projet personnel, l'auteur du dépôt a autorité finale.
- Versioning: La ligne `Version` en tête du document suit la sémantique décrite ci‑dessus. Un changement de principe (ajout/suppression) entraîne au minimum une incrémentation MINOR.
- Conformité: Les PRs liées au contenu public doivent indiquer dans leur description comment elles respectent les principes (accessibilité, vie privée, performance).

**Version**: 1.0.0 | **Ratified**: 2025-12-03 | **Last Amended**: 2025-12-03

