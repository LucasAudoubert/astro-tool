// =============================================================================
// Données planétaires — éléments képlériens J2000 + propriétés physiques
// Source : NASA JPL Planetary Fact Sheet
// =============================================================================

export interface PlanetData {
  name: string;
  color: string;
  /** Rayon visuel (unités Three.js) */
  size: number;
  /** Demi-grand axe (UA) */
  a: number;
  /** Excentricité */
  e: number;
  /** Inclinaison (deg) */
  i: number;
  /** Longitude moyenne à l'époque J2000 (deg) */
  L0: number;
  /** Longitude du périhélie (deg) */
  longPeri: number;
  /** Longitude du nœud ascendant (deg) */
  longNode: number;
  /** Période orbitale (jours terrestres) */
  period: number;
  /** Inclinaison de l'axe (deg) */
  axialTilt: number;
  /** Période de rotation (heures). Négatif = rétrograde */
  rotationPeriod: number;
  /** Diamètre équatorial (km) */
  diameterKm: number;
  /** Masse relative à la Terre */
  massEarths: number;
  /** Nombre de lunes */
  moons: number;
  /** Température moyenne (°C) */
  tempC: number;
  /** Durée du jour (heures) */
  dayLengthH: number;
  /** Description courte */
  description: string;
  /** Anneaux */
  hasRings?: boolean;
  ringInner?: number;
  ringOuter?: number;
  ringColor?: string;
}

export const SUN = {
  size: 2.2,
};

/** J2000 epoch = January 1, 2000, 12:00 UTC */
export const J2000_EPOCH = Date.UTC(2000, 0, 1, 12, 0, 0);

export const PLANETS: PlanetData[] = [
  {
    name: "Mercure",
    color: "#a0926b",
    size: 0.32,
    a: 0.3871,
    e: 0.2056,
    i: 7.0049,
    L0: 252.25,
    longPeri: 77.46,
    longNode: 48.33,
    period: 87.969,
    axialTilt: 0.03,
    rotationPeriod: 1407.6,
    diameterKm: 4879,
    massEarths: 0.055,
    moons: 0,
    tempC: 167,
    dayLengthH: 4222.6,
    description:
      "La plus petite planète et la plus proche du Soleil. Sa surface criblée de cratères ressemble à celle de la Lune.",
  },
  {
    name: "Vénus",
    color: "#e8cda0",
    size: 0.6,
    a: 0.7233,
    e: 0.0068,
    i: 3.3947,
    L0: 181.98,
    longPeri: 131.56,
    longNode: 76.68,
    period: 224.701,
    axialTilt: 177.4,
    rotationPeriod: -5832.5,
    diameterKm: 12104,
    massEarths: 0.815,
    moons: 0,
    tempC: 464,
    dayLengthH: 2802,
    description:
      "Surnommée l'étoile du berger, Vénus est enveloppée d'une épaisse atmosphère de CO₂ qui génère un effet de serre extrême.",
  },
  {
    name: "Terre",
    color: "#4a90d9",
    size: 0.65,
    a: 1.0,
    e: 0.0167,
    i: 0.0,
    L0: 100.46,
    longPeri: 102.94,
    longNode: 0.0,
    period: 365.256,
    axialTilt: 23.44,
    rotationPeriod: 23.93,
    diameterKm: 12742,
    massEarths: 1,
    moons: 1,
    tempC: 15,
    dayLengthH: 24,
    description:
      "Notre planète bleue, la seule connue pour abriter la vie. 71 % de sa surface est recouverte d'océans d'eau liquide.",
  },
  {
    name: "Mars",
    color: "#c1440e",
    size: 0.5,
    a: 1.5237,
    e: 0.0934,
    i: 1.8506,
    L0: 355.43,
    longPeri: 336.06,
    longNode: 49.56,
    period: 686.971,
    axialTilt: 25.19,
    rotationPeriod: 24.62,
    diameterKm: 6779,
    massEarths: 0.107,
    moons: 2,
    tempC: -65,
    dayLengthH: 24.7,
    description:
      "La planète rouge doit sa couleur à l'oxyde de fer. Elle possède le plus grand volcan du Système solaire : Olympus Mons.",
  },
  {
    name: "Jupiter",
    color: "#c88b3a",
    size: 1.8,
    a: 5.2029,
    e: 0.0484,
    i: 1.304,
    L0: 34.4,
    longPeri: 14.27,
    longNode: 100.29,
    period: 4332.59,
    axialTilt: 3.13,
    rotationPeriod: 9.93,
    diameterKm: 139820,
    massEarths: 317.8,
    moons: 95,
    tempC: -110,
    dayLengthH: 9.9,
    description:
      "La plus grande planète du Système solaire. Sa Grande Tache Rouge est une tempête anticyclonique persistant depuis plus de 350 ans.",
  },
  {
    name: "Saturne",
    color: "#e8d5a3",
    size: 1.5,
    a: 9.537,
    e: 0.0542,
    i: 2.486,
    L0: 49.94,
    longPeri: 92.86,
    longNode: 113.64,
    period: 10759.22,
    axialTilt: 26.73,
    rotationPeriod: 10.66,
    diameterKm: 116460,
    massEarths: 95.16,
    moons: 146,
    tempC: -140,
    dayLengthH: 10.7,
    description:
      "Célèbre pour ses magnifiques anneaux composés de glace et de roche. C'est la planète la moins dense du Système solaire.",
    hasRings: true,
    ringInner: 1.8,
    ringOuter: 2.8,
    ringColor: "#d9c89a",
  },
  {
    name: "Uranus",
    color: "#73c2d0",
    size: 1.1,
    a: 19.1913,
    e: 0.0472,
    i: 0.7723,
    L0: 313.23,
    longPeri: 170.96,
    longNode: 74.01,
    period: 30688.5,
    axialTilt: 97.77,
    rotationPeriod: -17.24,
    diameterKm: 50724,
    massEarths: 14.54,
    moons: 27,
    tempC: -195,
    dayLengthH: 17.2,
    description:
      "Géante de glace couchée sur le côté (axe incliné à 98°). Son atmosphère de méthane lui donne sa teinte bleu-vert.",
    hasRings: true,
    ringInner: 1.4,
    ringOuter: 1.9,
    ringColor: "#8aa8b0",
  },
  {
    name: "Neptune",
    color: "#3f54ba",
    size: 1.05,
    a: 30.069,
    e: 0.0086,
    i: 1.77,
    L0: 304.88,
    longPeri: 44.97,
    longNode: 131.72,
    period: 60182.0,
    axialTilt: 28.32,
    rotationPeriod: 16.11,
    diameterKm: 49244,
    massEarths: 17.15,
    moons: 14,
    tempC: -200,
    dayLengthH: 16.1,
    description:
      "La planète la plus éloignée du Soleil. Des vents supersoniques pouvant atteindre 2100 km/h y soufflent en permanence.",
    hasRings: true,
    ringInner: 1.3,
    ringOuter: 1.7,
    ringColor: "#5a6a90",
  },
];

/**
 * Échelle compacte : on compresse les distances pour visualiser tout le système
 * dans un viewport raisonnable. Mercure reste proche, Neptune est ramené.
 */
export function compactDistance(au: number): number {
  // sqrt compresse les grands axes tout en gardant l'ordre
  return Math.sqrt(au) * 4.5;
}

/**
 * Résout l'équation de Kepler et renvoie la position 3D héliocentrique (UA).
 */
export function keplerPosition(
  p: PlanetData,
  daysSinceJ2000: number,
): { x: number; y: number; z: number } {
  const meanMotion = 360 / p.period;
  const M = (((p.L0 - p.longPeri) + meanMotion * daysSinceJ2000) % 360 + 360) % 360;
  const Mrad = (M * Math.PI) / 180;

  // Newton-Raphson
  let E = Mrad;
  for (let k = 0; k < 10; k++) {
    E = E - (E - p.e * Math.sin(E) - Mrad) / (1 - p.e * Math.cos(E));
  }

  const xp = p.a * (Math.cos(E) - p.e);
  const yp = p.a * Math.sqrt(1 - p.e * p.e) * Math.sin(E);

  const iRad = (p.i * Math.PI) / 180;
  const oRad = (p.longNode * Math.PI) / 180;
  const wRad = ((p.longPeri - p.longNode) * Math.PI) / 180;

  const cosW = Math.cos(wRad), sinW = Math.sin(wRad);
  const cosO = Math.cos(oRad), sinO = Math.sin(oRad);
  const cosI = Math.cos(iRad), sinI = Math.sin(iRad);

  const x =
    xp * (cosW * cosO - sinW * sinO * cosI) -
    yp * (sinW * cosO + cosW * sinO * cosI);
  const z =
    xp * (cosW * sinO + sinW * cosO * cosI) -
    yp * (sinW * sinO - cosW * cosO * cosI);
  const y = xp * sinW * sinI + yp * cosW * sinI;

  return { x, y, z };
}
