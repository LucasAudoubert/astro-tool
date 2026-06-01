import type { QuizQuestion, Constellation } from "../types";

export const constellations: Constellation[] = [
  {
    name: "Grande Ourse",
    latinName: "Ursa Major",
    stars: 7,
    season: "spring",
    description:
      "Constellation circumpolaire, visible toute l'année dans l'hémisphère nord.",
  },
  {
    name: "Orion",
    latinName: "Orion",
    stars: 7,
    season: "winter",
    description:
      "Le chasseur céleste, reconnaissable à ses trois étoiles alignées formant la ceinture.",
  },
  {
    name: "Cassiopée",
    latinName: "Cassiopeia",
    stars: 5,
    season: "autumn",
    description:
      "Forme un W caractéristique dans le ciel, visible toute l'année.",
  },
  {
    name: "Lion",
    latinName: "Leo",
    stars: 9,
    season: "spring",
    description: "Constellation du zodiaque représentant le lion de Némée.",
  },
  {
    name: "Scorpion",
    latinName: "Scorpius",
    stars: 18,
    season: "summer",
    description:
      "Constellation du zodiaque, brillante avec l'étoile rouge Antarès.",
  },
  {
    name: "Cygne",
    latinName: "Cygnus",
    stars: 9,
    season: "summer",
    description: "Aussi appelée la Croix du Nord, contient l'étoile Deneb.",
  },
  {
    name: "Pégase",
    latinName: "Pegasus",
    stars: 9,
    season: "autumn",
    description: "Le cheval ailé, reconnaissable à son grand carré d'étoiles.",
  },
  {
    name: "Lyre",
    latinName: "Lyra",
    stars: 5,
    season: "summer",
    description:
      "Petite mais brillante, contient Véga, une des étoiles les plus lumineuses.",
  },
];

export const quizQuestions: QuizQuestion[] = [
  // Constellations
  {
    id: "q1",
    question: 'Quelle constellation est aussi appelée la "Croix du Nord" ?',
    options: ["Orion", "Cassiopée", "Cygne", "Grande Ourse"],
    correctIndex: 2,
    explanation:
      "Le Cygne (Cygnus) est aussi appelé la Croix du Nord en raison de sa forme.",
    category: "constellation",
    difficulty: "easy",
  },
  {
    id: "q2",
    question: "Combien d'étoiles principales composent la ceinture d'Orion ?",
    options: ["2", "3", "4", "5"],
    correctIndex: 1,
    explanation:
      "La ceinture d'Orion est composée de 3 étoiles : Alnitak, Alnilam et Mintaka.",
    category: "constellation",
    difficulty: "easy",
  },
  {
    id: "q3",
    question:
      "Quelle étoile brillante fait partie de la constellation de la Lyre ?",
    options: ["Sirius", "Véga", "Bételgeuse", "Rigel"],
    correctIndex: 1,
    explanation:
      "Véga est l'étoile la plus brillante de la Lyre et la 5e étoile la plus brillante du ciel.",
    category: "constellation",
    difficulty: "medium",
  },
  {
    id: "q4",
    question: "Quelle forme dessine Cassiopée dans le ciel ?",
    options: ["Un cercle", "Un W", "Un triangle", "Une croix"],
    correctIndex: 1,
    explanation:
      "Cassiopée forme un W (ou un M selon l'orientation) caractéristique.",
    category: "constellation",
    difficulty: "easy",
  },
  // Planètes
  {
    id: "q5",
    question: "Quelle est la planète la plus massive du système solaire ?",
    options: ["Saturne", "Neptune", "Jupiter", "Uranus"],
    correctIndex: 2,
    explanation: "Jupiter est 318 fois plus massive que la Terre.",
    category: "planet",
    difficulty: "easy",
  },
  {
    id: "q6",
    question: "Quelle planète a la journée la plus courte ?",
    options: ["Mercure", "Jupiter", "Mars", "Terre"],
    correctIndex: 1,
    explanation: "Jupiter tourne sur elle-même en environ 10 heures.",
    category: "planet",
    difficulty: "medium",
  },
  {
    id: "q7",
    question: "Combien de lunes possède Mars ?",
    options: ["0", "1", "2", "4"],
    correctIndex: 2,
    explanation: "Mars possède 2 lunes : Phobos et Deimos.",
    category: "planet",
    difficulty: "medium",
  },
  {
    id: "q8",
    question: "Quelle est la température de surface moyenne de Vénus ?",
    options: ["150°C", "300°C", "462°C", "600°C"],
    correctIndex: 2,
    explanation:
      "Vénus a une température moyenne de 462°C due à son effet de serre extrême.",
    category: "planet",
    difficulty: "hard",
  },
  // Physique
  {
    id: "q9",
    question: "Quelle est la vitesse de la lumière dans le vide ?",
    options: ["200 000 km/s", "299 792 km/s", "350 000 km/s", "150 000 km/s"],
    correctIndex: 1,
    explanation: "La vitesse de la lumière est d'environ 299 792 km/s.",
    category: "physics",
    difficulty: "easy",
  },
  {
    id: "q10",
    question: "Qu'est-ce qu'une année-lumière ?",
    options: [
      "Le temps que met la lumière pour faire le tour de la Terre",
      "La distance parcourue par la lumière en un an",
      "La durée d'une année sur une étoile",
      "L'intensité lumineuse d'une étoile pendant un an",
    ],
    correctIndex: 1,
    explanation:
      "Une année-lumière est la distance parcourue par la lumière en un an, soit environ 9 461 milliards de km.",
    category: "physics",
    difficulty: "easy",
  },
  {
    id: "q11",
    question:
      "Selon la relativité restreinte, que se passe-t-il quand on approche la vitesse de la lumière ?",
    options: [
      "Le temps accélère",
      "Le temps ralentit",
      "Le temps s'arrête puis repart",
      "Rien de spécial",
    ],
    correctIndex: 1,
    explanation:
      "Selon Einstein, le temps ralentit (dilatation du temps) quand on approche la vitesse de la lumière.",
    category: "physics",
    difficulty: "medium",
  },
  {
    id: "q12",
    question: "Quelle est la vitesse de libération de la Terre ?",
    options: ["7.9 km/s", "11.2 km/s", "15.4 km/s", "25.0 km/s"],
    correctIndex: 1,
    explanation:
      "Il faut atteindre 11.2 km/s pour échapper à la gravité terrestre.",
    category: "physics",
    difficulty: "hard",
  },
  // Général
  {
    id: "q13",
    question: "Quelle est l'étoile la plus proche du Soleil ?",
    options: ["Sirius", "Alpha Centauri", "Proxima Centauri", "Bételgeuse"],
    correctIndex: 2,
    explanation:
      "Proxima Centauri est à environ 4.24 années-lumière du Soleil.",
    category: "general",
    difficulty: "medium",
  },
  {
    id: "q14",
    question:
      "Quel est le diamètre approximatif de notre galaxie, la Voie lactée ?",
    options: ["10 000 al", "50 000 al", "100 000 al", "500 000 al"],
    correctIndex: 2,
    explanation:
      "La Voie lactée a un diamètre d'environ 100 000 années-lumière.",
    category: "general",
    difficulty: "hard",
  },
  {
    id: "q15",
    question: "Qu'est-ce qu'un trou noir ?",
    options: [
      "Une étoile très sombre",
      "Un objet dont la gravité empêche même la lumière de s'échapper",
      "Un vide dans l'espace",
      "Une nébuleuse obscure",
    ],
    correctIndex: 1,
    explanation:
      "Un trou noir a une gravité si intense que rien, pas même la lumière, ne peut s'en échapper.",
    category: "general",
    difficulty: "easy",
  },
];
