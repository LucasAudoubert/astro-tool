# 🪐 Astro Playground

> Une plateforme interactive pour explorer l'univers : calculateurs astronomiques, simulations physiques, quizzes éducatifs et outils pédagogiques.

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](#licence)

---

## ✨ Fonctionnalités principales

### 🚀 **Pages principales**

| 🎯 Page                | 📋 Descriptions                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Dashboard**          | Vue d'ensemble avec héros animé, catégories explorer, outils rapides, activité récente et widgets de progression |
| **Gravité & Physique** | Calculateurs pour le poids planétaire, simulation de chute libre, force gravitationnelle et énergie de fuite     |
| **Voyage spatial**     | Simulateur de voyage interstellaire avec animation, comparateur de relativité et distances cosmiques             |
| **Système solaire**    | Orbites en temps réel, comparaison des tailles de planètes, jeu interactif de classement                         |
| **Quiz**               | Quizzes interactifs avec catégories, niveaux de difficulté, scores et explications détaillées                    |
| **Convertisseurs**     | Convertisseur d'unités astronomiques (km/UA/années-lumière/parsecs) + calculateur d'âge planétaire               |
| **Événements**         | Calendrier des pluies de météores avec événements à venir                                                        |

### 🎨 **Expérience utilisateur**

- ✨ **Champ d'étoiles animé** en arrière-plan
- 🎯 **Transitions fluides** entre les pages avec framer-motion
- 🌍 **Mode sombre** avec thème spatial (palette violette/bleu)
- 📱 **Design réactif** adapté à tous les appareils
- 🎮 **Animations interactives** (rotations, pulsations, glissements)
- ♿ **Sémantique HTML** et navigation accessible

---

## 🛠️ Stack technique

```
Frontend
├─ React 19 + TypeScript 6
├─ Vite 8 (bundler & dev server)
├─ Framer Motion (animations)
├─ React Router DOM (navigation)
├─ Lucide React (icônes)
└─ CSS Modules (stylisation)

Architecture
├─ Components réutilisables
├─ Pages avec logique métier
├─ Données statiques (constants, planètes, quiz)
└─ Design tokens centralisés
```

---

## 📁 Structure du projet

```
src/
├── types/                  # Interfaces TypeScript partagées
├── data/                   # Données statiques (planètes, quiz, etc.)
│   ├── planets.ts
│   ├── quizzes.ts
│   ├── meteorShowers.ts
│   └── constants.ts
├── styles/                 # Styles globaux et variables
│   ├── global.css
│   └── variables.css
├── components/
│   ├── layout/            # Conteneurs principaux
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   └── ui/                # Composants réutilisables
│       ├── Card.tsx
│       ├── StarField.tsx
│       ├── PageTransition.tsx
│       └── SectionHeader.tsx
├── pages/                 # Pages (routes)
│   ├── Dashboard/
│   ├── Gravity/
│   ├── Travel/
│   ├── SolarSystem/
│   ├── Quiz/
│   ├── Converters/
│   ├── Events/
│   └── Placeholder/       # Pages "coming soon"
├── App.tsx                # Configuration des routes
└── main.tsx               # Point d'entrée
```

---

## 🚀 Installation & Démarrage

### Prérequis

- Node.js `>= 18.0.0`
- npm ou yarn

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/LucasAudoubert/astro-tool.git
cd astro-tool

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev

# 4. Ouvrir dans le navigateur
# → http://localhost:5173
```

### Scripts disponibles

```bash
npm run dev      # Démarrer Vite en mode développement
npm run build    # Build pour la production
npm run preview  # Prévisualiser la build production
npm run lint     # Vérifier le code (ESLint)
```

---

## 📚 Calculateurs & Simulateurs

### ⚖️ Poids planétaire

Calcule ton poids sur n'importe quelle planète ou lune du système solaire en fonction de la gravité locale.

**Formule:** `Poids = Masse × g`

### 🪂 Chute libre

Simule l'impact d'une chute depuis une hauteur donnée sur différentes planètes avec animation réaliste.

**Paramètres:** Hauteur, matériau, planète

### 🌀 Force gravitationnelle

Calcule la force d'attraction entre deux corps célestes selon la loi universelle de Newton.

**Formule:** `F = G × m₁ × m₂ / d²`

### 🚀 Énergie de fuite

Calcule l'énergie nécessaire pour quitter l'orbite d'une planète (vitesse d'échappement).

### 🛸 Voyage spatial

Simule un voyage interstellaire avec calcul du temps et des effets relativistes.

**Paramètres:** Destination, vitesse, facteur de Lorentz

### 🔄 Convertisseur d'unités

Convertit entre les unités astronomiques standards:

- Kilomètres (km)
- Unités Astronomiques (UA)
- Années-lumière (al)
- Parsecs (pc)

### 🌍 Âge planétaire

Calcule ton âge sur différentes planètes basé sur leurs périodes orbitales.

---

## 🎓 Contenu éducatif

### Quiz interactif

- **15 questions** variées
- **Catégories:** Constellations, Planètes, Physique, Général
- **Niveaux de difficulté:** Facile, Moyen, Difficile
- **Feedback immédiat** avec explications

### Calendrier astronomique

- Dates de pluies de météores
- Taux d'activité (ZHR)
- Vitesse des météores
- Constellations concernées

---

## 🎨 Design & Thème

### Palette de couleurs

```css
--accent-primary: #6c5ce7 /* Violet principal */ --accent-secondary: #00cec9
  /* Cyan/turquoise */ --accent-warning: #fdcb6e /* Orange */
  --accent-danger: #ff6b6b /* Rouge */ --bg-primary: #0a0e1a /* Noir profond */
  --text-primary: #ffffff /* Blanc */;
```

### Typographie

- **Police:** Système (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- **Monospace:** Menlo, Courier New (pour les valeurs)

---

## 🔧 Architecture détaillée

### Components réutilisables

**Card** - Conteneur avec animations

```tsx
<Card hover glow delay={0.2}>
  {/* Contenu */}
</Card>
```

**PageTransition** - Animation d'entrée de page

```tsx
<PageTransition>{/* Contenu de la page */}</PageTransition>
```

**StarField** - Arrière-plan animé

```tsx
<StarField /> {/* Se place en position fixed */}
```

### Routing

- Routes définies avec React Router v6
- Outlet avec Layout wrapper
- Transitions fluides entre pages

---

## 🚀 Performance

- **Code splitting** automatique par Vite
- **Lazy loading** des routes
- **Optimisation des images** et icônes SVG
- **Animations GPU-accelerated** via framer-motion
- **CSS Modules** pour éviter les conflits de styles

---

## 📦 Dépendances principales

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "framer-motion": "^13.0.0",
    "lucide-react": "latest",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "vite": "^8.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^6.0.0",
    "eslint": "^9.0.0"
  }
}
```

---

## 🎯 Roadmap

- [ ] Authentification utilisateur
- [ ] Sauvegarde des scores aux quiz
- [ ] Système de badges et récompenses
- [ ] Mode multijoueur pour les quizzes
- [ ] Observatoire virtuel 3D
- [ ] Intégration API données réelles (NASA, Stellarium)
- [ ] PWA (Progressive Web App)
- [ ] Support multilingue

---

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. Fork le repository
2. Crée une branche (`git checkout -b feature/amazing-feature`)
3. Commit tes changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvre une Pull Request

---

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👤 Auteur

**Lucas Audoubert**

- GitHub: [@LucasAudoubert](https://github.com/LucasAudoubert)

---

## 🌟 Remerciements

- 🚀 Inspiré par la passion pour l'astronomie et l'éducation spatiale
- 📚 Données astronomiques de référence scientifique
- 🎨 Design inspiré par l'espace et l'univers

---

## 📞 Support

Pour les questions ou les signalements de bugs, ouvre une [issue](https://github.com/LucasAudoubert/astro-tool/issues) sur GitHub.

---

<div align="center">

**Fait avec ❤️ pour les passionnés d'astronomie**

⭐ Si tu aimes ce projet, n'oublie pas de laisser une star !

</div>

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👤 Auteur

**Lucas Audoubert**

- GitHub: [@LucasAudoubert](https://github.com/LucasAudoubert)

---

## 🌟 Remerciements

- 🚀 Inspiré par la passion pour l'astronomie et l'éducation spatiale
- 📚 Données astronomiques de référence scientifique
- 🎨 Design inspiré par l'espace et l'univers

---

## 📞 Support

Pour les questions ou les signalements de bugs, ouvre une [issue](https://github.com/LucasAudoubert/astro-tool/issues) sur GitHub.

---

<div align="center">

**Fait avec ❤️ pour les passionnés d'astronomie**

⭐ Si tu aimes ce projet, n'oublie pas de laisser une star !

</div>

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

#   a s t r o - t o o l 
 
 
