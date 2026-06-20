// =============================================================================
// Kepler Orbital Elements — J2000 epoch reference
// Source: NASA JPL Planetary Fact Sheet (https://nssdc.gsfc.nasa.gov)
// All angles in degrees. Distances in AU. Periods in Earth days.
// =============================================================================

export interface KeplerElements {
  name: string;
  color: string;
  /** Visual size in the simulation (Three.js units) */
  size: number;
  /** Semi-major axis (AU) */
  a: number;
  /** Eccentricity */
  e: number;
  /** Inclination (deg) — relative to ecliptic */
  i: number;
  /** Mean longitude (deg) at epoch */
  L: number;
  /** Longitude of perihelion (deg) */
  longPeri: number;
  /** Longitude of ascending node (deg) */
  longNode: number;
  /** Orbital period (Earth days) */
  period: number;
  /** Optional: display label (e.g. accent color) */
  ringInner?: number;
  ringOuter?: number;
  ringTilt?: number;
}

export const KEPLER_ELEMENTS: KeplerElements[] = [
  {
    name: "Mercury",
    color: "#a0926b",
    size: 0.25,
    a: 0.3871,
    e: 0.2056,
    i: 7.0049,
    L: 252.25,
    longPeri: 77.46,
    longNode: 48.33,
    period: 87.969,
  },
  {
    name: "Venus",
    color: "#e8cda0",
    size: 0.45,
    a: 0.7233,
    e: 0.0068,
    i: 3.3947,
    L: 181.98,
    longPeri: 131.56,
    longNode: 76.68,
    period: 224.701,
  },
  {
    name: "Earth",
    color: "#4a90d9",
    size: 0.5,
    a: 1.0000,
    e: 0.0167,
    i: 0.0000,
    L: 100.46,
    longPeri: 102.94,
    longNode: 0.0,
    period: 365.256,
  },
  {
    name: "Mars",
    color: "#c1440e",
    size: 0.4,
    a: 1.5237,
    e: 0.0934,
    i: 1.8506,
    L: 355.43,
    longPeri: 336.06,
    longNode: 49.56,
    period: 686.971,
  },
  {
    name: "Jupiter",
    color: "#c88b3a",
    size: 1.6,
    a: 5.2029,
    e: 0.0484,
    i: 1.3040,
    L: 34.40,
    longPeri: 14.27,
    longNode: 100.29,
    period: 4332.59,
  },
  {
    name: "Saturn",
    color: "#e8d5a3",
    size: 1.3,
    a: 9.5370,
    e: 0.0542,
    i: 2.4860,
    L: 49.94,
    longPeri: 92.86,
    longNode: 113.64,
    period: 10759.22,
    ringInner: 1.5,
    ringOuter: 2.4,
    ringTilt: 26.7,
  },
  {
    name: "Uranus",
    color: "#73c2d0",
    size: 1.0,
    a: 19.1913,
    e: 0.0472,
    i: 0.7723,
    L: 313.23,
    longPeri: 170.96,
    longNode: 74.01,
    period: 30688.5,
  },
  {
    name: "Neptune",
    color: "#3f54ba",
    size: 0.95,
    a: 30.0690,
    e: 0.0086,
    i: 1.7700,
    L: 304.88,
    longPeri: 44.97,
    longNode: 131.72,
    period: 60182.0,
  },
];

/** J2000 epoch = January 1, 2000, 12:00 UTC */
export const J2000_EPOCH = Date.UTC(2000, 0, 1, 12, 0, 0);
