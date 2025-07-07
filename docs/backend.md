# 📄 Backend - DevPerfTracker

Documentation de l'implémentation Backend

---

## 🎯 Objectifs

Mettre en place un backend structuré pour analyser les performances d'un site web en appelant l'API **Google PageSpeed Insights**.

L'objectif est de garantir :
- Une **architecture modulaire et lisible**
- Une **séparation claire des responsabilités**
- Une **API fonctionnelle** prête à être appelée par le frontend

---

## 🏗 Architecture Backend

```
src/
└── app/
    └── api/
        └── analyze/
            ├── controller.ts      // Validation et gestion de la logique de contrôle
            ├── service.ts         // Logique métier : appel à l'API Google
            └── route.ts           // Point d'entrée de l'API (Next.js API Route)
```

### `service.ts` ➔ Logique Métier
- Fait l'appel à l'API Google PageSpeed Insights
- Transforme les données reçues en un format simple utilisable par le frontend

### `controller.ts` ➔ Contrôleur
- Valide l'entrée (URL)
- Appelle le service pour exécuter la logique métier
- Retourne les données ou une erreur

### `route.ts` ➔ Route Next.js
- Expose l'API via un endpoint `/api/analyze`
- Gérait la réponse HTTP (succès ou erreur)

---

## Fonctionnement complet (schéma)

```
Frontend (handleAnalyze dans src/web/services/analyze.ts)
        |
        v
API Route ➔ Controller ➔ Service ➔ Google API ➔ Service ➔ Controller ➔ API Route
```

La page frontend appelle l'API ➔ l'API renvoie un score et des métriques ➔ le Dashboard affiche les résultats.

---

## Avantages de l'architecture

| Avantage                             | Explication                                           |
|--------------------------------------|------------------------------------------------------|
| **Lisibilité**                       | Chaque fichier a un rôle clair                        |
| **Réutilisabilité**                  | La logique peut être réutilisée ailleurs              |
| **Évolutivité**                      | Ajout d'autres services ou types d'analyse facile     |
| **Testabilité**                      | Possibilité de tester les services indépendamment     |

---

