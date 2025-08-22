# DevPerfTracker

Dashboard de Performance Web en Temps Réel

---

## Objectif du projet

DevPerfTracker est une application web permettant d'analyser les performances de n'importe quel site internet grâce à des métriques clés (First Contentful Paint, Largest Contentful Paint, Total Blocking Time, etc.).  
L'application vise à sensibiliser les développeurs à l'importance de la performance web et leur fournir un outil simple pour suivre les scores en temps réel.

- Deux types d’utilisateurs :

  - Admin : peut consulter toutes les analyses
  - User : ne voit que ses propres analyses

---

## Liste des fonctionnalités couvertes

| Fonctionnalité                         | Admin | User |
| -------------------------------------- | ----- | ---- |
| Inscription     | à faire    | à faire   |
| Connexion sécurisée avec **JWT**       | ✔️    | ✔️   |
| Lancement d'une analyse via Google API | ✔️    | ✔️   |
| Visualisation des résultats détaillés  | ✔️    | ✔️   |
| Historique personnel des analyses      | ❌     | ✔️   |
| Accès à **toutes** les analyses        | ✔️    | ❌    |
| Dashboard avec stats globales          | ✔️    | ✔️   |
| Déconnexion (suppression du token)     | ✔️    | ✔️   |

---

## Liste complète des endpoints
### Login
 `POST`  | `http://localhost:3000/api/auth/login` | Public         | Connexion utilisateur, renvoie un JWT  :

 body :
 ```json 
 { "username": "admin", "password": "password" } 
 ``` 

 réponse :
 ```json 
 {
    "token": "exempletoken_zbaidbabaisiansak"
}
 ```

 ### Lancer une analyse 
 `POST`  | `http://localhost:3000/api/analyze` | admin ou user | sécurisé avec JWT | Lancer une analyse et enregistrer le résultat :

body : 
```json
{
  "url": "https://www.google.com/"
}
```

réponse : 
```json
{
    "url": "https://www.google.com/",
    "timestamp": "2025-07-11T08:00:10.509Z",
    "overallScore": 98,
    "metrics": {
        "fcp": {
            "value": 525.5968800771502,
            "score": 100,
            "label": "First Contentful Paint"
        },
        "lcp": {
            "value": 698.0002484996478,
            "score": 99,
            "label": "Largest Contentful Paint"
        },
        "tbt": {
            "value": 119.49999999999989,
            "score": 95,
            "label": "Total Blocking Time"
        },
        "cls": {
            "value": 0,
            "score": 100,
            "label": "Cumulative Layout Shift"
        },
        "fid": {
            "value": 1336.85119279831,
            "score": 99,
            "label": "First Input Delay"
        }
    }
}
```

 ### Récupérer analyse par Id
 `GET`  | `http://localhost:3000/api/analyze/{id}` | admin ou user | sécurisé avec JWT | Récupérer analyse par id, le traitement renvoie erreur si pas le bon JWT 

 exemple réponse : 
 ```json
{
    "id": 2,
    "url": "https://chatgpt.com/",
    "score": 68,
    "date": "2025-07-10T12:35:52.830Z",
    "metrics": {
        "fcp": {
            "value": 1939.681373031357,
            "score": 32,
            "label": "First Contentful Paint"
        },
        "lcp": {
            "value": 2778.383966081969,
            "score": 39,
            "label": "Largest Contentful Paint"
        },
        "tbt": {
            "value": 174,
            "score": 85,
            "label": "Total Blocking Time"
        },
        "cls": {
            "value": 0.01751024428684003,
            "score": 100,
            "label": "Cumulative Layout Shift"
        },
        "fid": {
            "value": 2780.512494204379,
            "score": 84,
            "label": "First Input Delay"
        }
    },
    "userId": 2
}
 ```

 ### Récupérer l'historique d'un utilisateur

 `GET`  | `http://localhost:3000/api/history` | admin ou user  | Récupérer l'historique par utilisateur en fonction du JWT : 
 ```json
 [
    {
        "id": 2,
        "url": "https://chatgpt.com/",
        "score": 68,
        "date": "2025-07-10T12:35:52.830Z",
        "metrics": {
            "fcp": {
                "value": 1939.681373031357,
                "score": 32,
                "label": "First Contentful Paint"
            },
            "lcp": {
                "value": 2778.383966081969,
                "score": 39,
                "label": "Largest Contentful Paint"
            },
            "tbt": {
                "value": 174,
                "score": 85,
                "label": "Total Blocking Time"
            },
            "cls": {
                "value": 0.01751024428684003,
                "score": 100,
                "label": "Cumulative Layout Shift"
            },
            "fid": {
                "value": 2780.512494204379,
                "score": 84,
                "label": "First Input Delay"
            }
        },
        "userId": 2
    },
    {
        "id": 1,
        "url": "https://www.google.com/",
        "score": 96,
        "date": "2025-07-10T12:14:11.427Z",
        "metrics": {
            "fcp": {
                "value": 525.0964139939829,
                "score": 100,
                "label": "First Contentful Paint"
            },
            "lcp": {
                "value": 688.000263653326,
                "score": 99,
                "label": "Largest Contentful Paint"
            },
            "tbt": {
                "value": 150.5,
                "score": 89,
                "label": "Total Blocking Time"
            },
            "cls": {
                "value": 0,
                "score": 100,
                "label": "Cumulative Layout Shift"
            },
            "fid": {
                "value": 1361.201294537831,
                "score": 99,
                "label": "First Input Delay"
            }
        },
        "userId": 2
    }
]
 ```

 ### Récupérer toutes les analyses
 `GET`  | `http://localhost:3000/api/analyze/admin` | admin         | Récupérer toutes les analyses de tous les utilisateurs : 

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

### Exemple erreur renvoyé : 
 ```json
 {
    "error": "Token invalide"
}
 ```
---

## Exemple de token JWT

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NTYyMzU1MSwiZXhwIjoxNjk1NjI3MTUxfQ.Vw9oLW6Yf4AhA3aF6L8w3txwZn1OgPkwbuh
```
Ce token est renvoyé par /api/auth/login et doit être stocké côté client (localStorage) pour les appels protégés.

## Instruction pour lancer le projet

1. Cloner le repo
```bash
git clone https://github.com/delphinepb/devperftracker.git
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables 
```ini
DATABASE_URL="file:./dev.db"
JWT_SECRET="votre_clé_secrète"
PAGESPEED_API_KEY="votre_api_key_google"
```

4. Lancer la base avec Prisma
```csharp
npx prisma migrate dev --name init
npx prisma generate
```

5. Démarrer le projet
```bash
npm run dev
```

6. Accès au site : http://localhost:3000/login
