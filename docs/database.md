# Database
## Schéma simple (MCD, UML ou table)
```pgsql
+------------+       +-----------+
|   User     |1     ∞|  Analysis |
+------------+       +-----------+
| id (PK)    |       | id (PK)   |
| username   |       | url       |
| password   |       | score     |
| role       |       | date      |
|            |       | metrics   |
|            |       | userId(FK)|
+------------+       +-----------+
```

- Un User peut avoir plusieurs Analyses
- Chaque Analysis appartient à un seul User
---
## Liste des entités 
1. User

Représente un utilisateur pouvant se connecter et lancer des analyses. Utilisé pour la gestion des rôles (admin, user).

2. Analysis

Représente une analyse de performance réalisée par un utilisateur. Stocke les métriques clés et l’historique des audits.

---
## Champs, types, clés primaires / étrangères

| Entité       | Champ    | Type     | Détail                              |
| ------------ | -------- | -------- | ----------------------------------- |
| **User**     | id       | Int      | Clé primaire, auto-incrémentée      |
|              | username | String   | Unique                              |
|              | password | String   | Hashé avec bcrypt                   |
|              | role     | String   | Enum ou texte libre (admin / user)  |
| **Analysis** | id       | Int      | Clé primaire, auto-incrémentée      |
|              | url      | String   | URL analysée                        |
|              | score    | Int      | Score global de performance (0-100) |
|              | date     | DateTime | Date de l’analyse                   |
|              | metrics  | Json     | Détail des métriques clés           |
|              | userId   | Int      | Clé étrangère vers **User.id**      |

---
## Exemples JSON pour au moins 2 entités
1. User
```json
{
  "id": 1,
  "username": "admin",
  "password": "$2a$10$h1JK2Lh89n...",
  "role": "admin"
}
 ```

2. Analysis
```json
{
  "id": 12,
  "url": "https://www.example.com",
  "score": 85,
  "date": "2024-07-10T14:25:43.000Z",
  "metrics": {
    "fcp": { "value": 1.2, "score": 85, "label": "First Contentful Paint" },
    "lcp": { "value": 2.1, "score": 90, "label": "Largest Contentful Paint" },
    "tbt": { "value": 150, "score": 95, "label": "Total Blocking Time" },
    "cls": { "value": 0.05, "score": 100, "label": "Cumulative Layout Shift" },
    "fid": { "value": 90, "score": 98, "label": "First Input Delay" }
  },
  "userId": 1
}

 ```