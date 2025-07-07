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

| Catégorie            | Optimisation mise en place ou prévue                                     | Impact attendu                                            |
|----------------------|-------------------------------------------------------------------------|-----------------------------------------------------------|
| UI & Accessibilité | Utilisation de **shadcn/ui** et **Tailwind CSS** pour un rendu léger et responsive | Meilleure expérience utilisateur, accessibilité renforcée |
| Performance        | Chargement des composants par onglet (Tabs)                             | Moins de rendu inutile, meilleure réactivité               |
| Réutilisabilité    | Décomposition en composants réutilisables (`AnalyzeForm`, `AnalysisResult`, etc.) | Maintenance facilitée, scalabilité                        |
| API & BDD         | API optimisée (une seule requête par action) + SQLite Prisma             | Rapidité d’accès aux données et légèreté                   |
| Graphiques        | Utilisation de **Recharts** pour des visualisations claires et performantes | Analyse rapide et impact visuel fort                       |
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

---
## Visualisation des données

- Graphique en barres (BarChart) : suivi de l’évolution des scores globaux au fil du temps
- Graphique radar (RadarChart) : comparaison visuelle des scores des métriques d'une analyse

---

## Lancer le projet en local

```bash
git clone https://github.com/delphinepb/devperftracker.git
cd devperftracker
npm install
npm run dev
