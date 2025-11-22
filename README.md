# Prime Machine — Générateur de Nombres Premiers  
Application React moderne permettant de récupérer un nombre aléatoire via une API simulée, de le valider avec Zod, de déterminer s’il est premier, et de stocker l’information dans un store Zustand avec un cache interne. L’interface est construite avec TailwindCSS et la navigation utilise TanStack Router. Le projet a été réalisé en binôme dans le cadre du TP “Générateur de nombres premiers optimisé”.



##  Technologies utilisées  
React, Vite, TailwindCSS, TanStack Router, TanStack Query, Zod, Zustand, ES Modules.



## Fonctionnalités  
L’application récupère un nombre aléatoire entre 0 et 999 via une API simulée, puis valide ce nombre avec Zod qui n’accepte que les valeurs comprises entre 1 et 50. Les erreurs Zod sont normales et affichées proprement. Le projet inclut également une fonction optimisée de vérification de primalité, un cache interne pour éviter les recalculs, un formulaire permettant à l’utilisateur de tester lui-même un nombre, un historique complet des nombres testés, une gestion propre des erreurs d’API, et une interface moderne utilisant TailwindCSS. Le TanStack Router Devtools est accessible en bas à gauche pour le debug.



##  Structure du projet  
Le projet est organisé de manière professionnelle :  
- `/api` : API simulée  
- `/schemas` : validation Zod  
- `/service` : logique métier (vérification des nombres premiers)  
- `/stores` : Zustand (store + cache)  
- `/hooks` : hooks personnalisés TanStack Query  
- `/components` : composants UI  
- `/pages` : pages React  
- `/routes` : routes TanStack Router  
- `main.jsx` : point d’entrée  
- `index.css` : style Tailwind  



## Comportement attendu  
- Nombre API entre 1 et 50 → succès  
- Nombre API hors intervalle → erreur Zod affichée  
- Entrée utilisateur → analyse immédiate  
- Nombre déjà analysé → résultat instantané via cache  



##  Installation & Lancement du projet  
Pour lancer le projet après l’avoir récupéré depuis GitHub, il suffit de suivre les commandes standard suivantes dans un terminal :

```bash
git clone <https://github.com/Louange-03/TP-Generateur>
cd app        # ou dans le dossier où se trouve votre projet
npm install   # installe toutes les dépendances
npm run dev   # lance le serveur de développement
