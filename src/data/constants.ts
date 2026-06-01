// ============================================
// Physical & astronomical constants
// ============================================

export const SPEED_OF_LIGHT = 299_792.458; // km/s
export const LIGHT_YEAR_KM = 9_460_730_472_580.8; // km
export const AU_KM = 149_597_870.7; // km
export const PARSEC_KM = 3.0857e13; // km
export const G = 6.674e-11; // Gravitational constant (N⋅m²/kg²)

// Unit conversions
export const CONVERSIONS = {
  al_km: LIGHT_YEAR_KM,
  ua_km: AU_KM,
  parsec_km: PARSEC_KM,
  al_ua: LIGHT_YEAR_KM / AU_KM,
  parsec_al: PARSEC_KM / LIGHT_YEAR_KM,
  parsec_ua: PARSEC_KM / AU_KM,
};

// Astronomical distances for comparison
export const astronomicalDistances = [
  { name: "Terre → Lune", distance: 384_400, unit: "km" },
  { name: "Terre → Soleil", distance: 1, unit: "UA" },
  { name: "Soleil → Jupiter", distance: 5.2, unit: "UA" },
  { name: "Soleil → Neptune", distance: 30.07, unit: "UA" },
  { name: "Soleil → Proxima Centauri", distance: 4.24, unit: "al" },
  { name: "Soleil → Sirius", distance: 8.6, unit: "al" },
  { name: "Soleil → Bételgeuse", distance: 700, unit: "al" },
  { name: "Voie lactée (diamètre)", distance: 100_000, unit: "al" },
  { name: "Voie lactée → Andromède", distance: 2_500_000, unit: "al" },
];
