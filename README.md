# DevPerfTracker

Dashboard de Performance Web en Temps Réel

---

## Objectif du projet

DevPerfTracker est une application web permettant d'analyser les performances de n'importe quel site internet grâce à des métriques clés (First Contentful Paint, Largest Contentful Paint, Total Blocking Time, etc.).  
L'application vise à sensibiliser les développeurs à l'importance de la performance web et leur fournir un outil simple pour suivre les scores en temps réel.

---

## Fonctionnalités (MVP)

- Saisie d'une URL à analyser
- Dashboard visuel avec score global et métriques détaillées
- Historique des analyses simulées (mock pour l'instant)
- UI moderne responsive avec **shadcn/ui** et **Tailwind CSS**

---

## Stack Technique

| Partie            | Choix                                  | Justification                                                                 |
|-------------------|-----------------------------------------|-------------------------------------------------------------------------------|
| **Frontend**      | Next.js (App Router)                    | Framework moderne avec rendu SSR/SSG optimisé                                 |
| **UI**            | Tailwind CSS + shadcn/ui                | Rapidité de développement, composants réutilisables, responsive design        |
| **Icônes**        | lucide-react                            | Icônes modernes et légères                                                   |
| **Mock données**  | `useState` + données statiques          | Pour prototyper avant la connexion au backend réel                            |
| **Déploiement**   | Vercel (prévu)                          | Déploiement rapide et scalable sans infrastructure lourde                    |

---
## Design Patterns utilisés

### 1. **Component-Based Architecture (Modèle Composant)**
Chaque élément de l'interface est un composant React indépendant et réutilisable. Cela garantit une bonne maintenabilité et une meilleure évolutivité.

### 2. **Container / Presentational Pattern**
Le composant principal gère la logique (états, événements) tandis que les sous-composants s'occupent uniquement de l'affichage.

### 3. **Command Pattern**
Les actions utilisateur (comme le clic sur "Analyser") encapsulent une logique métier claire sans exposer les détails techniques.

### 4. **Singleton (état centralisé)**
Le stockage des résultats et de l'historique est centralisé dans un composant unique pour garantir la cohérence des données.

### 5. **(Optionnel)** Strategy Pattern
Ce pattern pourrait être utilisé plus tard si plusieurs stratégies d'audit (Lighthouse, PageSpeed, etc.) devaient être supportées.

---
## Prochaines étapes

1. Créer une **API Route** avec Puppeteer + Lighthouse pour obtenir des vraies données
2. Stocker les résultats dans une base de données (MongoDB Atlas ou PlanetScale)
3. Ajouter des visualisations graphiques avec Chart.js
4. Déployer en ligne sur **Vercel** avec CI/CD

---

## Lancer le projet en local

```bash
git clone https://github.com/delphinepb/devperftracker.git
cd devperftracker
npm install
npm run dev
