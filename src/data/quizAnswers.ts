/**
 * Quiz answers map
 * ----------------------------------------------------------------
 * Pour chaque question, on définit soit:
 *  - `options`: un QCM à 4 propositions avec `correctIndex`
 *  - `answer`: la réponse texte (mode flashcard)
 *
 * Les clés correspondent à l'identifiant généré depuis le numéro d'index
 * de la question dans son groupe de difficulté (ex: "Easy-0", "Medium-12").
 *
 * Pour les questions non listées ici, le système retombe sur le mode
 * flashcard avec extraction de la réponse depuis le hint.
 */

export interface ChoiceEntry {
  /** 4 options, la première ou n'importe laquelle peut être correcte selon correctIndex */
  options: string[];
  correctIndex: number;
}

export const CHOICES: Record<string, ChoiceEntry> = {
  /* ============== EASY ============== */
  "Easy-0": {
    options: ["Vénus", "Mars", "Mercure", "Terre"],
    correctIndex: 0,
  },
  "Easy-1": {
    options: [
      "Système Solaire",
      "Système Stellaire",
      "Système Terrestre",
      "Système Galactique",
    ],
    correctIndex: 0,
  },
  "Easy-2": {
    options: ["Mars", "Jupiter", "Saturne", "Vénus"],
    correctIndex: 0,
  },
  "Easy-3": {
    options: ["Titan", "Ganymède", "Io", "Europe"],
    correctIndex: 0,
  },
  "Easy-4": {
    options: ["7", "8", "9", "10"],
    correctIndex: 1,
  },
  "Easy-5": {
    options: ["Uranus", "Neptune", "Saturne", "Pluton"],
    correctIndex: 1,
  },
  "Easy-6": {
    options: [
      "La Lune cache le Soleil",
      "La Terre passe devant la Lune",
      "Le Soleil s'éteint",
      "Une ombre géante",
    ],
    correctIndex: 0,
  },
  "Easy-7": {
    options: [
      "Une sphère parfaite",
      "Un ellipsoïde aplati",
      "Un cube",
      "Un disque",
    ],
    correctIndex: 1,
  },
  "Easy-8": {
    options: [
      "La force qui nous attire vers le sol",
      "Une énergie lumineuse",
      "Un champ magnétique",
      "Un courant d'air",
    ],
    correctIndex: 0,
  },
  "Easy-9": {
    options: ["Voie Lactée", "Andromède", "Triangulum", "Magellan"],
    correctIndex: 0,
  },
  "Easy-10": {
    options: [
      "Hydrogène et hélium",
      "Oxygène et carbone",
      "Fer et nickel",
      "Eau et méthane",
    ],
    correctIndex: 0,
  },
  "Easy-11": {
    options: ["Jupiter", "Saturne", "Mars", "Neptune"],
    correctIndex: 0,
  },
  "Easy-12": {
    options: [
      "Une éclipse",
      "Un transit",
      "Une occultation",
      "Un équinoxe",
    ],
    correctIndex: 0,
  },
  "Easy-13": {
    options: ["Mercure", "Mars", "Pluton", "Vénus"],
    correctIndex: 0,
  },
  "Easy-14": {
    options: ["Télescope", "Microscope", "Périscope", "Stéthoscope"],
    correctIndex: 0,
  },
  "Easy-15": {
    options: [
      "Repérer les étoiles",
      "Prédire la météo",
      "Naviguer sur Terre",
      "Compter les planètes",
    ],
    correctIndex: 0,
  },
  "Easy-16": {
    options: [
      "Des millions de degrés",
      "Quelques centaines",
      "10 000°C",
      "Zéro absolu",
    ],
    correctIndex: 0,
  },
  "Easy-17": {
    options: [
      "Personne qui voyage dans l'espace",
      "Personne qui observe les étoiles",
      "Robot de la NASA",
      "Satellite artificiel",
    ],
    correctIndex: 0,
  },
  "Easy-18": {
    options: [
      "Valentina Terechkova",
      "Sally Ride",
      "Youri Gagarine",
      "Mae Jemison",
    ],
    correctIndex: 0,
  },
  "Easy-19": {
    options: [
      "Neil Armstrong",
      "Buzz Aldrin",
      "Youri Gagarine",
      "Alan Shepard",
    ],
    correctIndex: 0,
  },
  "Easy-20": {
    options: ["Terre", "Mars", "Vénus", "Jupiter"],
    correctIndex: 0,
  },
  "Easy-21": {
    options: ["2", "1", "4", "Aucune"],
    correctIndex: 0,
  },
  "Easy-22": {
    options: [
      "Astre produisant sa propre lumière",
      "Planète brillante",
      "Satellite de la Terre",
      "Trou dans le ciel",
    ],
    correctIndex: 0,
  },
  "Easy-23": {
    options: ["Vénus", "Mercure", "Mars", "Jupiter"],
    correctIndex: 0,
  },
  "Easy-24": {
    options: [
      "Astre de glace et poussière avec une chevelure",
      "Une étoile qui s'éteint",
      "Une grosse météorite",
      "Une planète gazeuse",
    ],
    correctIndex: 0,
  },
  "Easy-25": {
    options: ["Le vent solaire", "L'ionosphère", "La magnétosphère", "L'héliosphère"],
    correctIndex: 0,
  },
  "Easy-26": {
    options: [
      "Une révolution autour du Soleil",
      "Une rotation de la Terre",
      "Un cycle lunaire",
      "Une saison",
    ],
    correctIndex: 0,
  },
  "Easy-27": {
    options: ["Ganymède", "Titan", "Io", "Callisto"],
    correctIndex: 0,
  },
  "Easy-28": {
    options: ["L'astronomie", "L'astrologie", "La cosmologie", "L'astrophysique"],
    correctIndex: 0,
  },
  "Easy-29": {
    options: ["Blanc", "Jaune", "Rouge", "Orange"],
    correctIndex: 0,
  },
  "Easy-30": {
    options: [
      "Environ 8 minutes",
      "1 seconde",
      "1 heure",
      "24 heures",
    ],
    correctIndex: 0,
  },
  "Easy-31": {
    options: ["Perseverance", "Curiosity", "Spirit", "Opportunity"],
    correctIndex: 0,
  },
  "Easy-32": {
    options: [
      "Objet si dense que la lumière ne s'échappe pas",
      "Une étoile éteinte",
      "Un trou dans l'espace",
      "Une galaxie sombre",
    ],
    correctIndex: 0,
  },
  "Easy-33": {
    options: [
      "Une traînée lumineuse dans l'atmosphère",
      "Une étoile qui tombe",
      "Un astéroïde",
      "Une comète",
    ],
    correctIndex: 0,
  },
  "Easy-34": {
    options: [
      "La ceinture d'astéroïdes",
      "La ceinture de Kuiper",
      "Le nuage d'Oort",
      "L'anneau de Saturne",
    ],
    correctIndex: 0,
  },
  "Easy-35": {
    options: [
      "National Aeronautics and Space Administration",
      "New Aero Space Agency",
      "North Atlantic Space Association",
      "National Astro Society Agency",
    ],
    correctIndex: 0,
  },
  "Easy-36": {
    options: [
      "Rose ou brunâtre",
      "Bleu",
      "Noir",
      "Vert",
    ],
    correctIndex: 0,
  },
  "Easy-37": {
    options: ["Mercure", "Vénus", "Terre", "Mars"],
    correctIndex: 0,
  },
  "Easy-38": {
    options: ["4", "2", "8", "12"],
    correctIndex: 0,
  },
  "Easy-39": {
    options: [
      "Nuage de gaz et poussières",
      "Étoile en formation",
      "Galaxie lointaine",
      "Trou de l'espace",
    ],
    correctIndex: 0,
  },
  "Easy-40": {
    options: ["Polaris", "Sirius", "Véga", "Bételgeuse"],
    correctIndex: 0,
  },
  "Easy-41": {
    options: [
      "Planète hors du système solaire",
      "Planète éteinte",
      "Étoile double",
      "Astéroïde géant",
    ],
    correctIndex: 0,
  },
  "Easy-42": {
    options: [
      "Communication, météo, observation",
      "Décoration spatiale",
      "Pollution lumineuse",
      "Énergie solaire",
    ],
    correctIndex: 0,
  },
  "Easy-43": {
    options: [
      "Station Spatiale Internationale",
      "Institut Spatial Solaire",
      "Image Satellitaire Spatiale",
      "Inter Satellite Système",
    ],
    correctIndex: 0,
  },
  "Easy-44": {
    options: ["Elliptique", "Circulaire", "Carrée", "Triangulaire"],
    correctIndex: 0,
  },
  "Easy-45": {
    options: [
      "La galaxie du Triangle",
      "La Voie Lactée",
      "Magellan",
      "Aucune",
    ],
    correctIndex: 0,
  },
  "Easy-46": {
    options: ["Non, c'est le vide", "Oui, légèrement", "Oui, très fort", "Seulement les ultrasons"],
    correctIndex: 0,
  },
  "Easy-47": {
    options: ["Un astronome", "Un astrologue", "Un cosmonaute", "Un physicien"],
    correctIndex: 0,
  },
  "Easy-48": {
    options: ["Sol", "Helios", "Sunnus", "Lumos"],
    correctIndex: 0,
  },
  "Easy-49": {
    options: [
      "Non, elle réfléchit celle du Soleil",
      "Oui, faiblement",
      "Oui, très fort",
      "Seulement la nuit",
    ],
    correctIndex: 0,
  },
  "Easy-50": {
    options: ["Mercure", "Vénus", "Terre", "Mars"],
    correctIndex: 0,
  },
  "Easy-51": {
    options: ["Voie Lactée", "Andromède", "Triangulum", "Centaurus"],
    correctIndex: 0,
  },
  "Easy-52": {
    options: ["8", "7", "9", "12"],
    correctIndex: 0,
  },
  "Easy-53": {
    options: ["Le Soleil", "La Lune", "Les étoiles", "Les planètes"],
    correctIndex: 0,
  },
  "Easy-54": {
    options: ["Rouge", "Bleue", "Verte", "Jaune"],
    correctIndex: 0,
  },
  "Easy-55": {
    options: ["Jupiter", "Saturne", "Neptune", "Uranus"],
    correctIndex: 0,
  },
  "Easy-56": {
    options: ["La Lune", "Le Soleil", "Mars", "Vénus"],
    correctIndex: 0,
  },
  "Easy-57": {
    options: [
      "Un météore qui se consume",
      "Une vraie étoile qui tombe",
      "Un satellite",
      "Une comète",
    ],
    correctIndex: 0,
  },
  "Easy-58": {
    options: ["Saturne", "Jupiter", "Uranus", "Neptune"],
    correctIndex: 0,
  },
  "Easy-59": {
    options: [
      "Environ 1 an",
      "1 jour",
      "1 mois",
      "10 ans",
    ],
    correctIndex: 0,
  },

  /* ============== MEDIUM ============== */
  "Medium-0": {
    options: ["687 jours", "365 jours", "1000 jours", "88 jours"],
    correctIndex: 0,
  },
  "Medium-1": {
    options: [
      "Soleil à sa position la plus haute/basse",
      "Équinoxe de printemps",
      "Lever du soleil",
      "Passage de la Lune",
    ],
    correctIndex: 0,
  },
  "Medium-2": {
    options: [
      "La zone Boucle d'or",
      "La ceinture d'astéroïdes",
      "Le trou noir central",
      "La couronne solaire",
    ],
    correctIndex: 0,
  },
  "Medium-3": {
    options: [
      "Dioxyde de carbone",
      "Oxygène",
      "Hydrogène",
      "Azote",
    ],
    correctIndex: 0,
  },
  "Medium-4": {
    options: [
      "Distance Terre-Soleil",
      "Distance Terre-Lune",
      "1 million de km",
      "10 millions de km",
    ],
    correctIndex: 0,
  },
  "Medium-5": {
    options: [
      "Période de rotation (jour sidéral)",
      "Révolution",
      "Précession",
      "Translation",
    ],
    correctIndex: 0,
  },
  "Medium-6": {
    options: [
      "Stade final d'une étoile",
      "Une planète gazeuse",
      "Une nova",
      "Une naine blanche",
    ],
    correctIndex: 0,
  },
  "Medium-7": {
    options: ["Photomètre", "Thermomètre", "Sismographe", "Baromètre"],
    correctIndex: 0,
  },
  "Medium-8": {
    options: [
      "Méthode pour mesurer la distance des étoiles proches",
      "Effet optique",
      "Calcul de température",
      "Une illusion",
    ],
    correctIndex: 0,
  },
  "Medium-9": {
    options: ["L'hydrogène", "L'oxygène", "L'hélium", "Le carbone"],
    correctIndex: 0,
  },
  "Medium-10": {
    options: [
      "Anomalie gravitationnelle",
      "Un trou noir supermassif",
      "Une galaxie",
      "Un pulsar",
    ],
    correctIndex: 0,
  },
  "Medium-11": {
    options: [
      "Groupement dense d'étoiles anciennes",
      "Amas de galaxies",
      "Nébuleuse",
      "Constellation",
    ],
    correctIndex: 0,
  },
  "Medium-12": {
    options: [
      "Verrouillage gravitationnel",
      "Force centrifuge",
      "Tidal locking",
      "Rotation rapide",
    ],
    correctIndex: 0,
  },
  "Medium-13": {
    options: [
      "Étoile qui fusionne H en He",
      "Étoile jeune",
      "Naine rouge",
      "Géante bleue",
    ],
    correctIndex: 0,
  },
  "Medium-14": {
    options: [
      "Environ 333 000 fois",
      "100 fois",
      "10 000 fois",
      "1 million de fois",
    ],
    correctIndex: 0,
  },
  "Medium-15": {
    options: [
      "Entre planète géante et étoile",
      "Une planète morte",
      "Un astéroïde",
      "Un trou noir",
    ],
    correctIndex: 0,
  },
  "Medium-16": {
    options: [
      "Méthode des transits / vitesse radiale",
      "Télescope direct",
      "Par le son",
      "Par l'odeur",
    ],
    correctIndex: 0,
  },
  "Medium-17": {
    options: [
      "Durée du jour = durée de la nuit",
      "Soleil au zénith",
      "Solstice d'été",
      "Nuit la plus longue",
    ],
    correctIndex: 0,
  },
  "Medium-18": {
    options: [
      "Glace d'eau et débris rocheux",
      "Hydrogène",
      "Poussière noire",
      "Fer",
    ],
    correctIndex: 0,
  },
  "Medium-19": {
    options: [
      "Passage d'un corps devant un autre",
      "Mouvement orbital",
      "Lune qui tourne",
      "Comète qui passe",
    ],
    correctIndex: 0,
  },
  "Medium-20": {
    options: [
      "Rayonnement invisible plus énergétique",
      "Lumière visible",
      "Rayon X uniquement",
      "Infrarouge",
    ],
    correctIndex: 0,
  },
  "Medium-21": {
    options: ["Orion", "Cassiopée", "Grande Ourse", "Lyre"],
    correctIndex: 0,
  },
  "Medium-22": {
    options: [
      "Diffusion de Rayleigh",
      "Réflexion",
      "Réfraction",
      "Absorption",
    ],
    correctIndex: 0,
  },
  "Medium-23": {
    options: [
      "Galaxie avec bande centrale d'étoiles",
      "Spirale classique",
      "Galaxie elliptique",
      "Galaxie irrégulière",
    ],
    correctIndex: 0,
  },
  "Medium-24": {
    options: [
      "Spectre lumineux (loi de Wien)",
      "Couleur apparente",
      "Distance",
      "Masse",
    ],
    correctIndex: 0,
  },
  "Medium-25": {
    options: [
      "Météore brûle, météorite touche le sol",
      "Pareil",
      "Météore est sur Terre",
      "Météorite est dans l'espace",
    ],
    correctIndex: 0,
  },
  "Medium-26": {
    options: [
      "Luminosité vue depuis la Terre",
      "Luminosité réelle",
      "Distance",
      "Température",
    ],
    correctIndex: 0,
  },
  "Medium-27": {
    options: [
      "Environ 10 milliards d'années",
      "1 million d'années",
      "100 000 ans",
      "1 trillion d'années",
    ],
    correctIndex: 0,
  },
  "Medium-28": {
    options: [
      "Télescope à lentilles",
      "Télescope à miroirs",
      "Radio-télescope",
      "Lunette",
    ],
    correctIndex: 0,
  },
  "Medium-29": {
    options: [
      "Télescope à miroirs",
      "Télescope à lentilles",
      "Spectroscope",
      "Jumelles",
    ],
    correctIndex: 0,
  },
  "Medium-30": {
    options: ["Vénus", "Mars", "Jupiter", "Saturne"],
    correctIndex: 0,
  },
  "Medium-31": {
    options: [
      "Flux de particules chargées solaires",
      "Brise terrestre",
      "Courant d'air spatial",
      "Magnétisme pur",
    ],
    correctIndex: 0,
  },
  "Medium-32": {
    options: [
      "Taches solaires",
      "Trous coronaux",
      "Éruptions",
      "Protubérances",
    ],
    correctIndex: 0,
  },
  "Medium-33": {
    options: [
      "Explosion thermonucléaire d'une naine blanche",
      "Mort d'une étoile massive",
      "Collision de planètes",
      "Effondrement stellaire",
    ],
    correctIndex: 0,
  },
  "Medium-34": {
    options: [
      "Limite vent solaire / milieu interstellaire",
      "Frontière de la galaxie",
      "Limite d'une nébuleuse",
      "Bord du système solaire (physique)",
    ],
    correctIndex: 0,
  },
  "Medium-35": {
    options: [
      "La capacité à fusionner l'hydrogène",
      "La taille",
      "La température",
      "La composition",
    ],
    correctIndex: 0,
  },
  "Medium-36": {
    options: ["Ceinture de Kuiper", "Ceinture d'astéroïdes", "Nuage d'Oort", "Anneau de Saturne"],
    correctIndex: 0,
  },
  "Medium-37": {
    options: [
      "Gaz et poussières entre les étoiles",
      "Matière entre les planètes",
      "Étoiles éteintes",
      "Trous noirs",
    ],
    correctIndex: 0,
  },
  "Medium-38": {
    options: ["Un amas de galaxies", "Une constellation", "Un système", "Une nébuleuse"],
    correctIndex: 0,
  },
  "Medium-39": {
    options: ["Environ 12 ans", "1 an", "30 ans", "100 ans"],
    correctIndex: 0,
  },
  "Medium-40": {
    options: [
      "L'ensemble des longueurs d'onde",
      "Les couleurs visibles",
      "Les rayons X",
      "Les ondes radio",
    ],
    correctIndex: 0,
  },
  "Medium-41": {
    options: [
      "Interaction vent solaire / champ magnétique",
      "Aurore boréale artificielle",
      "Lumière des étoiles",
      "Réflexion lunaire",
    ],
    correctIndex: 0,
  },
  "Medium-42": {
    options: [
      "Enveloppe de gaz d'une étoile mourante",
      "Disque protoplanétaire",
      "Région HII",
      "Nébuleuse obscure",
    ],
    correctIndex: 0,
  },
  "Medium-43": {
    options: ["Orbite géostationnaire", "Orbite basse", "Orbite polaire", "Orbite de transfert"],
    correctIndex: 0,
  },
  "Medium-44": {
    options: ["La Voie Lactée", "Andromède", "Magellan", "Triangulum"],
    correctIndex: 0,
  },
  "Medium-45": {
    options: [
      "Étoile à neutrons émettant un signal périodique",
      "Quasar",
      "Trou noir",
      "Magnétar",
    ],
    correctIndex: 0,
  },
  "Medium-46": {
    options: [
      "Proche du zéro absolu (2,7 K)",
      "0°C",
      "100°C",
      "−50°C",
    ],
    correctIndex: 0,
  },
  "Medium-47": {
    options: [
      "Étoile dont la luminosité change",
      "Étoile qui bouge",
      "Étoile double",
      "Étoile jeune",
    ],
    correctIndex: 0,
  },
  "Medium-48": {
    options: ["Système binaire", "Système triple", "Nébuleuse", "Constellation"],
    correctIndex: 0,
  },
  "Medium-49": {
    options: [
      "Effondrement d'une étoile massive",
      "Coalescence de naines",
      "Naine noire",
      "Collision cosmique",
    ],
    correctIndex: 0,
  },
  "Medium-50": {
    options: [
      "Unité de distance, pas de temps",
      "Mesure de temps",
      "Unité de masse",
      "Vitesse de la lumière",
    ],
    correctIndex: 0,
  },
  "Medium-51": {
    options: [
      "La comète contient beaucoup plus de glace",
      "L'astéroïde est plus petit",
      "Pareil",
      "Différence de couleur",
    ],
    correctIndex: 0,
  },
  "Medium-52": {
    options: ["Andromède", "Voie Lactée", "Triangulum", "Magellan"],
    correctIndex: 0,
  },
  "Medium-53": {
    options: [
      "Mort explosive d'une étoile massive",
      "Naissance d'une étoile",
      "Collision de planètes",
      "Fin d'un système",
    ],
    correctIndex: 0,
  },
  "Medium-54": {
    options: [
      "Environ 5 500°C",
      "1 000°C",
      "15 000°C",
      "1 million °C",
    ],
    correctIndex: 0,
  },
  "Medium-55": {
    options: [
      "Zone au-delà de Neptune remplie d'objets glacés",
      "Ceinture entre Mars et Jupiter",
      "Anneau de Saturne",
      "Disque d'accrétion",
    ],
    correctIndex: 0,
  },
  "Medium-56": {
    options: [
      "Une Unité Astronomique (UA)",
      "1 million de km",
      "1 milliard de km",
      "1 parsec",
    ],
    correctIndex: 0,
  },
  "Medium-57": {
    options: [
      "Étoile à neutrons qui tourne très vite",
      "Une nova",
      "Un quasar",
      "Une supernova",
    ],
    correctIndex: 0,
  },
  "Medium-58": {
    options: ["La gravité", "Le magnétisme", "L'électricité", "La pression"],
    correctIndex: 0,
  },
  "Medium-59": {
    options: [
      "Nouvelle (entre Terre et Soleil)",
      "Pleine Lune",
      "Premier quartier",
      "Dernier quartier",
    ],
    correctIndex: 0,
  },

  /* ============== HARD ============== */
  "Hard-0": {
    options: [
      "Masse max d'une naine blanche, ~1,4 M☉",
      "Limite d'un trou noir",
      "Température de fusion",
      "Distance Terre-Lune",
    ],
    correctIndex: 0,
  },
  "Hard-1": {
    options: [
      "Décalage vers le rouge",
      "Décalage vers le bleu",
      "Absorption",
      "Réflexion",
    ],
    correctIndex: 0,
  },
  "Hard-2": {
    options: [
      "Émission thermique près de l'horizon",
      "Rayon cosmique",
      "Vent solaire",
      "Rayonnement fossile",
    ],
    correctIndex: 0,
  },
  "Hard-3": {
    options: [
      "Pourquoi le ciel nocturne est noir",
      "Le paradoxe du singe savant",
      "L'aplatissement de la galaxie",
      "Le paradoxe de Fermi",
    ],
    correctIndex: 0,
  },
  "Hard-4": {
    options: [
      "Par spallation cosmique",
      "Par fusion stellaire",
      "Par fission",
      "Par rayonnement fossile",
    ],
    correctIndex: 0,
  },
  "Hard-5": {
    options: ["La rotation (moment cinétique)", "La masse", "La charge", "La température"],
    correctIndex: 0,
  },
  "Hard-6": {
    options: [
      "Changement de saveur des neutrinos",
      "Variation d'énergie",
      "Collision atomique",
      "Radioactivité",
    ],
    correctIndex: 0,
  },
  "Hard-7": {
    options: [
      "Le cycle CNO",
      "Chaîne proton-proton",
      "Triple alpha",
      "Fusion du fer",
    ],
    correctIndex: 0,
  },
  "Hard-8": {
    options: [
      "Étoile jeune en contraction",
      "Naine brune",
      "Géante rouge",
      "Étoile à neutrons",
    ],
    correctIndex: 0,
  },
  "Hard-9": {
    options: [
      "Taux d'expansion de l'univers",
      "Température du Soleil",
      "Distance Terre-Lune",
      "Vitesse lumière",
    ],
    correctIndex: 0,
  },
  "Hard-10": {
    options: [
      "Reconnexion magnétique / courants Birkeland",
      "Effet photoélectrique",
      "Réflexion",
      "Diffusion",
    ],
    correctIndex: 0,
  },
  "Hard-11": {
    options: [
      "Capture rapide de neutrons",
      "Capture lente",
      "Fission",
      "Spallation",
    ],
    correctIndex: 0,
  },
  "Hard-12": {
    options: [
      "Capture lente dans étoiles AGB",
      "Capture rapide",
      "Fission",
      "Radioactivité",
    ],
    correctIndex: 0,
  },
  "Hard-13": {
    options: ["Ère de la recombinaison", "Ère de l'inflation", "Ère du fer", "Big Bang"],
    correctIndex: 0,
  },
  "Hard-14": {
    options: [
      "Mouvement de l'étoile hôte",
      "Distance radiale",
      "Température",
      "Masse",
    ],
    correctIndex: 0,
  },
  "Hard-15": {
    options: [
      "Maintenir la courbe de rotation plate",
      "Former des étoiles",
      "Produire de la lumière",
      "Chauffer le cœur",
    ],
    correctIndex: 0,
  },
  "Hard-16": {
    options: [
      "Stade final d'une naine blanche refroidie",
      "Étoile à neutrons",
      "Trou noir",
      "Planète",
    ],
    correctIndex: 0,
  },
  "Hard-17": {
    options: ["2GM/c²", "E = mc²", "F = ma", "PV = nRT"],
    correctIndex: 0,
  },
  "Hard-18": {
    options: [
      "Déviation de la lumière par un objet massif",
      "Réflexion",
      "Réfraction",
      "Effet Doppler",
    ],
    correctIndex: 0,
  },
  "Hard-19": {
    options: [
      "Trois propriétés observables (masse, charge, spin)",
      "Quatre",
      "Deux",
      "Une",
    ],
    correctIndex: 0,
  },
  "Hard-20": {
    options: [
      "Expansion brutale de l'univers primordial",
      "Effondrement",
      "Stabilisation",
      "Refroidissement",
    ],
    correctIndex: 0,
  },
  "Hard-21": {
    options: [
      "Interférométrie laser (LIGO/VIRGO)",
      "Radar",
      "Lunettes astronomiques",
      "Photographie",
    ],
    correctIndex: 0,
  },
  "Hard-22": {
    options: [
      "Déplacement apparent des astres",
      "Distance réelle",
      "Couleur modifiée",
      "Luminosité",
    ],
    correctIndex: 0,
  },
  "Hard-23": {
    options: [
      "Variations de l'orbite terrestre",
      "Cycles solaires",
      "Variations lunaires",
      "Éruptions volcaniques",
    ],
    correctIndex: 0,
  },
  "Hard-24": {
    options: [
      "Étoile à neutrons au champ magnétique intense",
      "Naine brune",
      "Quasar",
      "Pulsar classique",
    ],
    correctIndex: 0,
  },
  "Hard-25": {
    options: [
      "Combiner plusieurs signaux pour simuler un grand miroir",
      "Lentille optique",
      "Photographie longue",
      "Capteur CCD",
    ],
    correctIndex: 0,
  },
  "Hard-26": {
    options: [
      "Luminosité maximale d'une étoile en équilibre",
      "Température limite",
      "Distance",
      "Masse",
    ],
    correctIndex: 0,
  },
  "Hard-27": {
    options: [
      "Mesure de l'intensité d'une raie",
      "Longueur d'onde",
      "Fréquence",
      "Période",
    ],
    correctIndex: 0,
  },
  "Hard-28": {
    options: [
      "Masse gravitationnelle = masse inertielle",
      "Force = masse × accélération",
      "E = mc²",
      "PV = nRT",
    ],
    correctIndex: 0,
  },
  "Hard-29": {
    options: [
      "Ondes de densité",
      "Force centrifuge",
      "Effondrement",
      "Collision",
    ],
    correctIndex: 0,
  },
  "Hard-30": {
    options: [
      "Galaxie avec noyau actif (raies larges)",
      "Galaxie spirale classique",
      "Galaxie elliptique",
      "Galaxie naine",
    ],
    correctIndex: 0,
  },
  "Hard-31": {
    options: [
      "Pression de dégénérescence électronique",
      "Force gravitationnelle",
      "Réaction nucléaire",
      "Effet photoélectrique",
    ],
    correctIndex: 0,
  },
  "Hard-32": {
    options: [
      "Distorsion du CMB par amas de galaxies",
      "Effet Doppler",
      "Effet Zeeman",
      "Effet photoélectrique",
    ],
    correctIndex: 0,
  },
  "Hard-33": {
    options: [
      "Relation magnitude / température",
      "Spectre électromagnétique",
      "Tableau périodique",
      "Diagramme HR (lui-même)",
    ],
    correctIndex: 0,
  },
  "Hard-34": {
    options: [
      "Fusion dans les étoiles massives",
      "Spallation",
      "Radioactivité",
      "Big Bang",
    ],
    correctIndex: 0,
  },
  "Hard-35": {
    options: [
      "Énergie associée à l'espace en MQ",
      "Énergie noire",
      "Matière noire",
      "Énergie cinétique",
    ],
    correctIndex: 0,
  },
  "Hard-36": {
    options: [
      "Le fond diffus cosmologique (CMB)",
      "L'abondance d'hélium",
      "Le redshift",
      "Les quasars",
    ],
    correctIndex: 0,
  },
  "Hard-37": {
    options: [
      "Asymétrie matière-antimatière",
      "Formation d'étoiles",
      "Supernovae",
      "Trous noirs",
    ],
    correctIndex: 0,
  },
  "Hard-38": {
    options: [
      "Étude des mouvements stellaires",
      "Photographie",
      "Cartographie",
      "Spectroscopie",
    ],
    correctIndex: 0,
  },
  "Hard-39": {
    options: [
      "Trou noir entre 100 et 100 000 M☉",
      "Trou noir primordial",
      "Trou noir supermassif",
      "Trou noir stellaire",
    ],
    correctIndex: 0,
  },
  "Hard-40": {
    options: [
      "Réseau de diffraction pour séparer les ordres",
      "Prisme",
      "Filtre",
      "Polariseur",
    ],
    correctIndex: 0,
  },
  "Hard-41": {
    options: [
      "Élargissement par agitation thermique",
      "Effet Zeeman",
      "Effet photoélectrique",
      "Effet Compton",
    ],
    correctIndex: 0,
  },
  "Hard-42": {
    options: [
      "Particules chargées dans un champ magnétique",
      "Émission thermique",
      "Radioactivité",
      "Effet Doppler",
    ],
    correctIndex: 0,
  },
  "Hard-43": {
    options: [
      "Étoile massive ayant perdu son hydrogène",
      "Naine rouge",
      "Naine blanche",
      "Étoile à neutrons",
    ],
    correctIndex: 0,
  },
  "Hard-44": {
    options: [
      "Temps mesuré par un observateur à l'infini",
      "Temps local",
      "Temps propre",
      "Temps de Planck",
    ],
    correctIndex: 0,
  },
  "Hard-45": {
    options: [
      "Extinction et rougissement interstellaire",
      "Réflexion",
      "Absorption totale",
      "Diffusion simple",
    ],
    correctIndex: 0,
  },
  "Hard-46": {
    options: [
      "Groupe lâche de quelques centaines d'étoiles jeunes",
      "Amas globulaire",
      "Galaxie",
      "Nébuleuse",
    ],
    correctIndex: 0,
  },
  "Hard-47": {
    options: [
      "Galaxie pauvre en gaz, peu de formation",
      "Galaxie spirale",
      "Galaxie irrégulière",
      "Quasar",
    ],
    correctIndex: 0,
  },
  "Hard-48": {
    options: [
      "Luminosité totale sur toutes les λ",
      "Luminosité visible",
      "Magnitude apparente",
      "Distance",
    ],
    correctIndex: 0,
  },
  "Hard-49": {
    options: [
      "Mouvement angulaire apparent dans le ciel",
      "Vitesse radiale",
      "Distance",
      "Masse",
    ],
    correctIndex: 0,
  },
  "Hard-50": {
    options: [
      "L'écho lumineux du Big Bang",
      "La lumière des étoiles",
      "Le vent solaire",
      "Rayonnement synchrotron",
    ],
    correctIndex: 0,
  },
  "Hard-51": {
    options: ["L'horizon des événements", "La singularité", "L'ergosphère", "Le disque d'accrétion"],
    correctIndex: 0,
  },
  "Hard-52": {
    options: [
      "Loi de Hubble-Lemaître",
      "Loi de Kepler",
      "Loi de Newton",
      "Loi d'Ohm",
    ],
    correctIndex: 0,
  },
  "Hard-53": {
    options: [
      "Matière invisible avec attraction gravitationnelle",
      "Poussière cosmique",
      "Matière ordinaire",
      "Énergie noire",
    ],
    correctIndex: 0,
  },
  "Hard-54": {
    options: [
      "Résidu d'une étoile ayant épuisé son carburant",
      "Étoile jeune",
      "Planète",
      "Trou noir",
    ],
    correctIndex: 0,
  },
  "Hard-55": {
    options: [
      "Noyau brillant d'une galaxie active lointaine",
      "Pulsar",
      "Quasar (lui-même)",
      "Nébuleuse",
    ],
    correctIndex: 0,
  },
  "Hard-56": {
    options: [
      "Distance min avant dislocation",
      "Distance de sécurité",
      "Distance min entre planètes",
      "Limite d'orbite",
    ],
    correctIndex: 0,
  },
  "Hard-57": {
    options: [
      "Chaîne proton-proton",
      "Cycle CNO",
      "Triple alpha",
      "Fusion du fer",
    ],
    correctIndex: 0,
  },
  "Hard-58": {
    options: [
      "Courbure de la lumière par un corps massif",
      "Réflexion",
      "Réfraction",
      "Absorption",
    ],
    correctIndex: 0,
  },
  "Hard-59": {
    options: ["Singularité", "Horizon", "Disque", "Ergosphère"],
    correctIndex: 0,
  },

  /* ============== IMPOSSIBLE ============== */
  "Impossible-0": {
    options: [
      "Très petite, liée à l'énergie du vide",
      "Exactement 1",
      "Zéro",
      "Infinie",
    ],
    correctIndex: 0,
  },
  "Impossible-1": {
    options: [
      "Gravité quantique",
      "Relativité générale seule",
      "Mécanique quantique seule",
      "Théorie des cordes",
    ],
    correctIndex: 0,
  },
  "Impossible-2": {
    options: [
      "Mystère qui accélère l'expansion",
      "Matière noire",
      "Énergie classique",
      "Énergie cinétique",
    ],
    correctIndex: 0,
  },
  "Impossible-3": {
    options: [
      "Une singularité initiale",
      "Un point chaud",
      "Une étoile massive",
      "Un plasma",
    ],
    correctIndex: 0,
  },
  "Impossible-4": {
    options: ["10 ou 11", "3", "4", "26"],
    correctIndex: 0,
  },
  "Impossible-5": {
    options: [
      "Notre univers n'est qu'un parmi d'autres",
      "Notre univers est unique",
      "Univers parallèles identiques",
      "Multivers prouve Big Bang",
    ],
    correctIndex: 0,
  },
  "Impossible-6": {
    options: [
      "Le champ qui donne la masse aux particules",
      "Une particule de lumière",
      "Un neutrino",
      "Un électron",
    ],
    correctIndex: 0,
  },
  "Impossible-7": {
    options: [
      "Dilatation temporelle gravitationnelle",
      "Ralentissement de la lumière",
      "Effet Doppler temporel",
      "Compression relativiste",
    ],
    correctIndex: 0,
  },
  "Impossible-8": {
    options: [
      "La déchirure de l'espace-temps",
      "La mort thermique",
      "Le Big Crunch",
      "L'expansion stable",
    ],
    correctIndex: 0,
  },
  "Impossible-9": {
    options: [
      "Environ 10^96 kg/m³",
      "1 kg/m³",
      "10 kg/m³",
      "1 g/cm³",
    ],
    correctIndex: 0,
  },
  "Impossible-10": {
    options: [
      "Expansion exponentielle juste après le Big Bang",
      "Inflation monétaire",
      "Accélération actuelle",
      "Effondrement",
    ],
    correctIndex: 0,
  },
  "Impossible-11": {
    options: [
      "Constante de Hubble (~70 km/s/Mpc)",
      "Vitesse de la lumière",
      "1 km/s",
      "1 000 km/s",
    ],
    correctIndex: 0,
  },
  "Impossible-12": {
    options: [
      "Formule de Bekenstein-Hawking",
      "E = mc²",
      "PV = nRT",
      "Loi de Newton",
    ],
    correctIndex: 0,
  },
  "Impossible-13": {
    options: [
      "Conflit entre probabilité de vie ET et absence de preuves",
      "Paradoxe du tout ou rien",
      "Paradoxe de Zénon",
      "Paradoxe EPR",
    ],
    correctIndex: 0,
  },
  "Impossible-14": {
    options: [
      "Kerr en rotation, Schwarzschild statique",
      "Kerr plus grand",
      "Kerr plus chaud",
      "Aucune différence",
    ],
    correctIndex: 0,
  },
  "Impossible-15": {
    options: [
      "Émission thermique des trous noirs",
      "Rayon cosmique",
      "Rayon gamma",
      "Rayon X",
    ],
    correctIndex: 0,
  },
  "Impossible-16": {
    options: [
      "Accrétion et fusions galactiques",
      "Big Bang",
      "Effondrement stellaire",
      "Explosion de supernova",
    ],
    correctIndex: 0,
  },
  "Impossible-17": {
    options: [
      "Information du volume encodée sur la surface",
      "Volume projeté en 2D",
      "Surface projetée en 3D",
      "Hologramme parfait",
    ],
    correctIndex: 0,
  },
  "Impossible-18": {
    options: [
      "Échelle où les effets quantiques dominent",
      "Masse du Soleil",
      "Masse d'un proton",
      "Masse de la Terre",
    ],
    correctIndex: 0,
  },
  "Impossible-19": {
    options: [
      "Violation explique l'asymétrie matière-antimatière",
      "La symétrie est parfaite",
      "La symétrie est conservée",
      "La symétrie n'existe pas",
    ],
    correctIndex: 0,
  },
  "Impossible-20": {
    options: [
      "Champ scalaire responsable de l'expansion",
      "Particule de lumière",
      "Boson W",
      "Gluon",
    ],
    correctIndex: 0,
  },
  "Impossible-21": {
    options: [
      "Énergie noire dynamique (quintessence)",
      "Énergie constante",
      "Énergie nulle",
      "Énergie infinie",
    ],
    correctIndex: 0,
  },
  "Impossible-22": {
    options: [
      "Métrique traversable + énergie exotique",
      "Solution triviale",
      "Trou noir habituel",
      "Impossible à définir",
    ],
    correctIndex: 0,
  },
  "Impossible-23": {
    options: [
      "Zéro ou proche de zéro",
      "1 eV",
      "Masse du proton",
      "Masse du Higgs",
    ],
    correctIndex: 0,
  },
  "Impossible-24": {
    options: [
      "Disparité entre échelle faible et Planck",
      "Paradoxe de la matière",
      "Problème de l'antimatière",
      "Problème de Hubble",
    ],
    correctIndex: 0,
  },
  "Impossible-25": {
    options: [
      "Extension des objets en cordes",
      "Points ponctuels",
      "Particules classiques",
      "Ondes électromagnétiques",
    ],
    correctIndex: 0,
  },
  "Impossible-26": {
    options: [
      "Création de zones d'énergie négative",
      "Conservation stricte",
      "Symétrie parfaite",
      "Pas d'effet",
    ],
    correctIndex: 0,
  },
  "Impossible-27": {
    options: [
      "Modes B dans la polarisation du CMB",
      "Modes E",
      "Mode mixte",
      "Absence de polarisation",
    ],
    correctIndex: 0,
  },
  "Impossible-28": {
    options: [
      "Correspondance AdS/CFT",
      "M-théorie",
      "Supersymétrie",
      "Big Bounce",
    ],
    correctIndex: 0,
  },
  "Impossible-29": {
    options: [
      "Solutions classiques en espace euclidien",
      "Photons virtuels",
      "Particules réelles",
      "Aucune solution",
    ],
    correctIndex: 0,
  },
  "Impossible-30": {
    options: [
      "Excès de matière sur antimatière",
      "Symétrie parfaite",
      "Conservation stricte",
      "Pas de rôle",
    ],
    correctIndex: 0,
  },
  "Impossible-31": {
    options: [
      "Axions comme matière noire froide",
      "WIMPs",
      "MACHOs",
      "Neutrinos",
    ],
    correctIndex: 0,
  },
  "Impossible-32": {
    options: [
      "Solution d'Einstein avec boucles temporelles",
      "Univers en expansion",
      "Trou de ver",
      "Big Crunch",
    ],
    correctIndex: 0,
  },
  "Impossible-33": {
    options: [
      "Observateur accéléré perçoit rayonnement thermique",
      "L'observateur voit l'Univers",
      "L'observateur voyage dans le temps",
      "L'observateur disparaît",
    ],
    correctIndex: 0,
  },
  "Impossible-34": {
    options: [
      "Charge électrique en plus de la rotation",
      "Différence de masse",
      "Différence de température",
      "Aucune",
    ],
    correctIndex: 0,
  },
  "Impossible-35": {
    options: [
      "Distribution de la matière selon l'échelle",
      "Spectre solaire",
      "Spectre visible",
      "Spectre infrarouge",
    ],
    correctIndex: 0,
  },
  "Impossible-36": {
    options: [
      "Existence de neutrinos très lourds",
      "Existence de photons",
      "Annihilation de protons",
      "Asymétrie faible",
    ],
    correctIndex: 0,
  },
  "Impossible-37": {
    options: [
      "Perte apparente d'information quantique",
      "Conservation stricte",
      "Symétrie classique",
      "Pas de paradoxe",
    ],
    correctIndex: 0,
  },
  "Impossible-38": {
    options: [
      "120 ordres de grandeur au-dessus de la valeur observée",
      "Exactement la valeur observée",
      "10 fois plus",
      "1 million de fois plus",
    ],
    correctIndex: 0,
  },
  "Impossible-39": {
    options: [
      "Mouvement global vers le grand attracteur",
      "Mouvement nul",
      "Rotation propre",
      "Mouvement aléatoire",
    ],
    correctIndex: 0,
  },
  "Impossible-40": {
    options: [
      "Unification des forces à haute énergie",
      "Découverte du Higgs",
      "Brisure de symétrie",
      "Effondrement quantique",
    ],
    correctIndex: 0,
  },
  "Impossible-41": {
    options: [
      "Défauts topologiques dans l'espace-temps",
      "Photons massifs",
      "Antimatière condensée",
      "Matière noire",
    ],
    correctIndex: 0,
  },
  "Impossible-42": {
    options: [
      "Singularité sans horizon (interdite)",
      "Trou noir classique",
      "Trou de ver",
      "Univers observable",
    ],
    correctIndex: 0,
  },
  "Impossible-43": {
    options: [
      "Rebond lors de la contraction maximale",
      "Mort thermique",
      "Expansion continue",
      "Effondrement",
    ],
    correctIndex: 0,
  },
  "Impossible-44": {
    options: [
      "Pente douce (slow-roll) du potentiel",
      "Pente raide",
      "Pente plate",
      "Aucun potentiel",
    ],
    correctIndex: 0,
  },
  "Impossible-45": {
    options: [
      "Proportionnelle au quart de l'aire en unités de Planck",
      "Proportionnelle à l'aire cubique",
      "Constante",
      "Indépendante",
    ],
    correctIndex: 0,
  },
  "Impossible-46": {
    options: [
      "Gravité comme phénomène statistique",
      "Force fondamentale",
      "Effet quantique",
      "Force classique",
    ],
    correctIndex: 0,
  },
  "Impossible-47": {
    options: [
      "Cohérence mathématique des anomalies",
      "Preuve expérimentale",
      "Mesure directe",
      "Calculs classiques",
    ],
    correctIndex: 0,
  },
  "Impossible-48": {
    options: [
      "Analogie entre accélération et horizon gravitationnel",
      "Rayonnement fossile",
      "Rayonnement stellaire",
      "Rayonnement cosmique",
    ],
    correctIndex: 0,
  },
  "Impossible-49": {
    options: [
      "Gagnent plus de masse par CMB qu'ils n'en perdent",
      "Perdent toujours de la masse",
      "Équilibre parfait",
      "Disparaissent instantanément",
    ],
    correctIndex: 0,
  },
  "Impossible-50": {
    options: [
      "Rayonnement relique des neutrinos découplés",
      "Rayonnement des étoiles",
      "Rayonnement fossile (CMB)",
      "Rayonnement X",
    ],
    correctIndex: 0,
  },
  "Impossible-51": {
    options: ["1/137", "1", "1/1000", "100"],
    correctIndex: 0,
  },
  "Impossible-52": {
    options: [
      "Information codée sur la surface limite",
      "Information perdue",
      "Symétrie stricte",
      "Conservation classique",
    ],
    correctIndex: 0,
  },
  "Impossible-53": {
    options: [
      "Univers en expansion accélérée permanente",
      "Univers statique",
      "Big Crunch",
      "Univers cyclique",
    ],
    correctIndex: 0,
  },
  "Impossible-54": {
    options: [
      "Charge magnétique gravitationnelle (masse de torsion)",
      "Charge électrique",
      "Spin",
      "Masse classique",
    ],
    correctIndex: 0,
  },
  "Impossible-55": {
    options: [
      "Particule sans masse (brisure de symétrie)",
      "Boson W",
      "Gluon",
      "Photon lourd",
    ],
    correctIndex: 0,
  },
  "Impossible-56": {
    options: [
      "Taux d'expansion différents selon les directions",
      "Univers isotrope",
      "Univers homogène",
      "Univers statique",
    ],
    correctIndex: 0,
  },
  "Impossible-57": {
    options: [
      "Freinage de la croissance des amas",
      "Formation stellaire",
      "Émission de rayons X",
      "Aucune influence",
    ],
    correctIndex: 0,
  },
  "Impossible-58": {
    options: [
      "Dimensions supplémentaires courbées",
      "Univers classique",
      "Big Bang",
      "Multivers",
    ],
    correctIndex: 0,
  },
  "Impossible-59": {
    options: [
      "Trop légère sans fine-tuning (problème de naturalité)",
      "Trop lourde",
      "Correcte naturellement",
      "Sans rapport",
    ],
    correctIndex: 0,
  },
  "Impossible-60": {
    options: [
      "Valeurs des constantes permettant la vie",
      "Hasard pur",
      "Multivers strict",
      "Théorie unifiée",
    ],
    correctIndex: 0,
  },
  "Impossible-61": {
    options: [
      "Ondes sonores figées dans la distribution de matière",
      "Oscillations du Soleil",
      "Vibrations atomiques",
      "Échos radio",
    ],
    correctIndex: 0,
  },
  "Impossible-62": {
    options: [
      "Univers fermé, ouvert ou plat (Ω = 1)",
      "Toujours plat",
      "Toujours fermé",
      "Toujours ouvert",
    ],
    correctIndex: 0,
  },
  "Impossible-63": {
    options: [
      "Comportement chaotique de la métrique près d'une singularité",
      "Expansion régulière",
      "Contraction stable",
      "Univers statique",
    ],
    correctIndex: 0,
  },
  "Impossible-64": {
    options: [
      "Réseaux de spin et volumes discrets",
      "Espace-temps continu",
      "Particules ponctuelles",
      "Mécanique classique",
    ],
    correctIndex: 0,
  },
  "Impossible-65": {
    options: [
      "Mélange des modes E et B par lentilles",
      "Effet Doppler",
      "Effet Zeeman",
      "Effet photoélectrique",
    ],
    correctIndex: 0,
  },
  "Impossible-66": {
    options: [
      "Champ scalaire variable expliquant l'accélération",
      "Constante cosmologique seule",
      "Matière noire",
      "Énergie classique",
    ],
    correctIndex: 0,
  },
  "Impossible-67": {
    options: [
      "Échelle où les effets quantiques dominent la gravité",
      "0 K",
      "100 K",
      "1 000 K",
    ],
    correctIndex: 0,
  },
  "Impossible-68": {
    options: [
      "Évaporation finale via Hawking",
      "Expansion éternelle",
      "Stabilité",
      "Big Crunch",
    ],
    correctIndex: 0,
  },
  "Impossible-69": {
    options: [
      "Indice sur les interactions lors de l'inflation",
      "Distribution des étoiles",
      "Distance des galaxies",
      "Masse des particules",
    ],
    correctIndex: 0,
  },
};
