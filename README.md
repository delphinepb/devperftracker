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

## Visualisation des données

- Graphique en barres (BarChart) : suivi de l’évolution des scores globaux au fil du temps
- Graphique radar (RadarChart) : comparaison visuelle des scores des métriques d'une analyse

---
## Endpoints API

| Méthode | Route               | Description                                 | Exemple d’appel |
|---------|---------------------|---------------------------------------------|-----------------|
| `POST`  | `/api/analyze`       | Lance l’analyse d’une URL et renvoie les métriques | `POST /api/analyze` avec `{ "url": "https://exemple.com" }` |
| `GET`   | `/api/analyze/:id`   | Récupère les résultats détaillés d’une analyse | `GET /api/analyze/1` |

## Exemple de données de réponse
```json
{
  "url": "https://exemple.com",
  "overallScore": 85,
  "metrics": {
    "fcp": { "value": 1234, "score": 78, "label": "First Contentful Paint" },
    "lcp": { "value": 2345, "score": 82, "label": "Largest Contentful Paint" }
  },
  "timestamp": "2024-07-08T12:00:00Z"
}
```

---

## Lancer le projet en local

```bash
git clone https://github.com/delphinepb/devperftracker.git
cd devperftracker
npm install
npm run dev
