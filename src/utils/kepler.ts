import * as THREE from "three";
import type { KeplerElements } from "../data/keplerElements";

const degToRad = (d: number) => (d * Math.PI) / 180;

/**
 * Solve Kepler's equation M = E - e*sin(E) for the eccentric anomaly E.
 * Newton-Raphson iteration, converges in < 10 iterations for any e < 0.9.
 */
function solveKepler(M: number, e: number): number {
  let E = M;
  for (let i = 0; i < 10; i++) {
    const dE = (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-7) break;
  }
  return E;
}

/**
 * Compute the heliocentric 3D position of a planet at `daysSinceJ2000` since
 * the J2000 epoch. Returns coordinates in AU (caller applies scale).
 *
 * Reference: Meeus, "Astronomical Algorithms", Ch. 32.
 */
export function getKeplerPosition(
  p: KeplerElements,
  daysSinceJ2000: number,
): THREE.Vector3 {
  // Mean anomaly (M): 360° * days / period, mod 360
  const meanMotion = 360 / p.period;
  const M = degToRad(((p.L - p.longPeri) + meanMotion * daysSinceJ2000) % 360);

  // Eccentric anomaly
  const E = solveKepler(M, p.e);

  // Position in orbital plane (2D)
  const xPrime = p.a * (Math.cos(E) - p.e);
  const yPrime = p.a * Math.sqrt(1 - p.e * p.e) * Math.sin(E);

  // Rotation: argument of perihelion (w), longitude of node (o), inclination (i)
  const i = degToRad(p.i);
  const o = degToRad(p.longNode);
  const w = degToRad(p.longPeri - p.longNode);

  // 3D ecliptic coordinates
  const x =
    xPrime * (Math.cos(w) * Math.cos(o) - Math.sin(w) * Math.sin(o) * Math.cos(i)) -
    yPrime * (Math.sin(w) * Math.cos(o) + Math.cos(w) * Math.sin(o) * Math.cos(i));

  const z =
    xPrime * (Math.cos(w) * Math.sin(o) + Math.sin(w) * Math.cos(o) * Math.cos(i)) -
    yPrime * (Math.sin(w) * Math.sin(o) - Math.cos(w) * Math.cos(o) * Math.cos(i));

  const y =
    xPrime * (Math.sin(w) * Math.sin(i)) +
    yPrime * (Math.cos(w) * Math.sin(i));

  return new THREE.Vector3(x, y, z);
}
