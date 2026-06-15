/**
 * Service pour l'API Astronomy API
 * https://docs.astronomyapi.com/endpoints/bodies/positions
 */

const API_BASE = "https://api.astronomyapi.com/api/v2";
const APP_ID = import.meta.env.VITE_APPLICATION_ID || "";
const APP_SECRET = import.meta.env.VITE_APPLICATION_SECRET || "";

// Encode credentials en Base64 pour Basic Auth
const credentials = APP_ID && APP_SECRET ? btoa(`${APP_ID}:${APP_SECRET}`) : "";

export interface CelestialPosition {
  name: string;
  type: string;
  ra: number; // Right Ascension (radians)
  dec: number; // Déclinaison (radians)
  distanceKm: number;
  distanceLightYears: number;
  magnitude: number;
  x: number; // Position 3D cartésienne
  y: number;
  z: number;
}

/**
 * Convertir coordonnées sphériques (RA, Dec, distance) en coordonnées cartésiennes 3D
 * RA : 0 to 2π (right ascension)
 * Dec : -π/2 to π/2 (déclinaison)
 * Distance : en km
 */
function sphericalToCartesian(
  ra: number,
  dec: number,
  distanceKm: number,
): { x: number; y: number; z: number } {
  // Normaliser la distance (convertir en unités plus gérables pour la visualisation)
  const distance = distanceKm / 1e7; // Diviser pour avoir des distances visuelles cohérentes

  return {
    x: distance * Math.cos(dec) * Math.cos(ra),
    y: distance * Math.sin(dec),
    z: distance * Math.cos(dec) * Math.sin(ra),
  };
}

/**
 * Récupérer les positions des 8 planètes pour une date donnée
 * @param date ISO date string (YYYY-MM-DD)
 * @param latitude Latitude de l'observateur (défaut: équateur)
 * @param longitude Longitude de l'observateur (défaut: premier méridien)
 */
export async function getPlanetPositions(
  date: string = new Date().toISOString().split("T")[0],
  latitude: number = 0,
  longitude: number = 0,
): Promise<CelestialPosition[]> {
  if (!credentials) {
    throw new Error(
      "Variables d'environnement API manquantes (VITE_APPLICATION_ID, VITE_APPLICATION_SECRET)",
    );
  }

  const planetNames = [
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
  ];

  try {
    // Utiliser l'endpoint /bodies/positions
    const params = new URLSearchParams({
      from_date: date,
      to_date: date,
      longitude: longitude.toString(),
      latitude: latitude.toString(),
    });

    // Créer une requête pour chaque planète
    const promises = planetNames.map((planet) =>
      fetch(
        `${API_BASE}/bodies/positions?${params.toString()}&body=${planet}`,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          // Extraire les données de position
          if (
            data.data &&
            data.data.bodies &&
            data.data.bodies[planet.toLowerCase()]
          ) {
            const body = data.data.bodies[planet.toLowerCase()];
            const position = body.position;
            const extraInfo = body.extraInfo || {};

            const ra = (position.equatorialRightAscension.hours * Math.PI) / 12; // Convertir heures en radians
            const dec =
              (position.equatorialDeclination.degrees * Math.PI) / 180; // Convertir degrés en radians
            const distanceKm = position.distanceFromEarth.km;

            const cartesian = sphericalToCartesian(ra, dec, distanceKm);

            return {
              name: planet,
              type: body.type || "planet",
              ra,
              dec,
              distanceKm,
              distanceLightYears: position.distanceFromEarth.lightYears || 0,
              magnitude: extraInfo.magnitude || 0,
              ...cartesian,
            };
          }
          throw new Error(`No position data for ${planet}`);
        }),
    );

    const positions = await Promise.all(promises);
    return positions;
  } catch (error) {
    console.error("Error fetching planet positions:", error);
    throw error;
  }
}

/**
 * Convertir une distance en km à une chaîne lisible
 */
export function formatDistance(km: number): string {
  if (km < 1_000_000) {
    return `${Math.round(km).toLocaleString("fr-FR")} km`;
  } else if (km < 1_500_000_000) {
    const millions = Math.round(km / 1_000_000);
    return `${millions.toLocaleString("fr-FR")} M km`;
  } else {
    const billions = (km / 1_000_000_000).toFixed(2);
    return `${billions} G km`;
  }
}

/**
 * Formater la magnitude apparente
 */
export function formatMagnitude(magnitude: number): string {
  return magnitude.toFixed(2);
}
