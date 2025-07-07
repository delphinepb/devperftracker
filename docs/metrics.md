# Documentation des Métriques - DevPerfTracker

Ce document décrit les différentes métriques affichées par DevPerfTracker ainsi que leur signification et les seuils de performance recommandés.

---

## Les Métriques Affichées

| Indicateur | Signification | Unité | Bonnes valeurs |
|-----------|---------------|-------|----------------|
| **FCP (First Contentful Paint)** | Temps d’affichage du premier contenu visible | Secondes (s) | < 1.8s |
| **LCP (Largest Contentful Paint)** | Temps d’affichage du plus grand contenu visible | Secondes (s) | < 2.5s |
| **TBT (Total Blocking Time)** | Temps total où le thread principal est bloqué | Millisecondes (ms) | < 200ms |
| **CLS (Cumulative Layout Shift)** | Stabilité visuelle (décalages inattendus) | Score (0 à 1) | < 0.1 |
| **FID (First Input Delay)** | Temps de réponse entre la première interaction utilisateur et la réponse du navigateur | Millisecondes (ms) | < 100ms |

---

## Interprétation des Scores

- **Vert (Score ≥ 90)** : Excellente performance
- **Jaune (Score entre 70 et 89)** : Performance acceptable mais améliorable
- **Rouge (Score < 70)** : Performance insuffisante nécessitant des optimisations

---

## Exemple Visuel

Chaque carte de résultat contient :
- Le nom et l'icône de la métrique
- La valeur mesurée
- Un badge indiquant la qualité du score
- Une barre de progression visuelle

---

## Pourquoi ces métriques ?

Les métriques sélectionnées sont issues des recommandations de **Google Web Vitals** et permettent de mesurer l’expérience utilisateur réelle d’un site internet. Elles sont essentielles pour garantir un site rapide, fluide et agréable.

---

