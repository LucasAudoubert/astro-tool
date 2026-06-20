// =============================================================================
// Génération procédurale de textures planétaires via Canvas 2D
// Toutes les textures sont créées à la volée (pas d'assets externes).
// =============================================================================

import * as THREE from "three";

const TEX_SIZE = 512;

/** Crée une texture Three.js à partir d'un canvas 2D. */
function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

/** Seeded RNG (Mulberry32) pour reproductibilité. */
function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bruit pseudo-aléatoire 2D simple. */
function noise2D(_rng: () => number, x: number, y: number, freq: number): number {
  const xi = Math.floor(x * freq);
  const yi = Math.floor(y * freq);
  const xf = x * freq - xi;
  const yf = y * freq - yi;
  const h = (a: number, b: number) => {
    const v = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  const a = h(xi, yi);
  const b = h(xi + 1, yi);
  const c = h(xi, yi + 1);
  const d = h(xi + 1, yi + 1);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

/** FBM (Fractal Brownian Motion) — somme de bruits à fréquences croissantes. */
function fbm(rng: () => number, x: number, y: number, octaves: number, freq: number): number {
  let total = 0;
  let amp = 1;
  let max = 0;
  let f = freq;
  for (let i = 0; i < octaves; i++) {
    total += noise2D(rng, x, y, f) * amp;
    max += amp;
    amp *= 0.5;
    f *= 2;
  }
  return total / max;
}

/** Convertit une couleur hex en tuple RGB. */
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

/** Mélange deux couleurs RGB. */
function mix(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/** Assombrit une couleur. */
function darken(c: [number, number, number], t: number): [number, number, number] {
  return [Math.round(c[0] * (1 - t)), Math.round(c[1] * (1 - t)), Math.round(c[2] * (1 - t))];
}

/** Éclaircit une couleur. */
function lighten(c: [number, number, number], t: number): [number, number, number] {
  return [
    Math.round(c[0] + (255 - c[0]) * t),
    Math.round(c[1] + (255 - c[1]) * t),
    Math.round(c[2] + (255 - c[2]) * t),
  ];
}

// ---------------------------------------------------------------------------
// Texture : planète rocheuse (Mercure, etc.)
// ---------------------------------------------------------------------------
export function makeRockyTexture(baseColor: string, contrast = 1.4, seed = 1): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE / 2;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const rng = makeRng(seed);
  const base = hexToRgb(baseColor);
  const dark = darken(base, 0.55);
  const light = lighten(base, 0.25);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      const n = fbm(rng, u, v, 5, 6);
      const craters = Math.pow(noise2D(rng, u * 8, v * 8, 12), 4);
      const t = Math.min(1, Math.max(0, (n - 0.5) * contrast + 0.5));
      const c = mix(dark, light, t);
      const final = mix(c, darken(c, 0.7), craters * 0.6);
      const idx = (y * canvas.width + x) * 4;
      img.data[idx] = final[0];
      img.data[idx + 1] = final[1];
      img.data[idx + 2] = final[2];
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// ---------------------------------------------------------------------------
// Texture : planète nuageuse (Vénus)
// ---------------------------------------------------------------------------
export function makeCloudyTexture(baseColor: string, seed = 22): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE / 2;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const rng = makeRng(seed);
  const base = hexToRgb(baseColor);
  const dark = darken(base, 0.35);
  const light = lighten(base, 0.4);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      const swirl = fbm(rng, u + Math.sin(v * 6) * 0.1, v, 6, 8);
      const t = Math.min(1, Math.max(0, swirl));
      const c = mix(dark, light, t);
      const idx = (y * canvas.width + x) * 4;
      img.data[idx] = c[0];
      img.data[idx + 1] = c[1];
      img.data[idx + 2] = c[2];
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// ---------------------------------------------------------------------------
// Texture : Terre (océans + continents)
// ---------------------------------------------------------------------------
export function makeEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE / 2;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const rng = makeRng(42);
  const ocean: [number, number, number] = [42, 92, 170];
  const shallow: [number, number, number] = [70, 140, 200];
  const land: [number, number, number] = [60, 130, 70];
  const desert: [number, number, number] = [180, 160, 110];
  const ice: [number, number, number] = [240, 245, 250];

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      const n = fbm(rng, u, v, 6, 5);
      const lat = Math.abs(v - 0.5) * 2; // 0 équateur, 1 pôle
      let c: [number, number, number];
      if (lat > 0.85) {
        c = ice;
      } else if (n < 0.48) {
        c = ocean;
      } else if (n < 0.52) {
        c = shallow;
      } else if (n < 0.78) {
        c = land;
      } else {
        c = desert;
      }
      // Variation locale
      const variation = (fbm(rng, u * 4, v * 4, 3, 12) - 0.5) * 30;
      const final: [number, number, number] = [
        Math.max(0, Math.min(255, c[0] + variation)),
        Math.max(0, Math.min(255, c[1] + variation)),
        Math.max(0, Math.min(255, c[2] + variation)),
      ];
      const idx = (y * canvas.width + x) * 4;
      img.data[idx] = final[0];
      img.data[idx + 1] = final[1];
      img.data[idx + 2] = final[2];
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// ---------------------------------------------------------------------------
// Texture : Mars (rouge avec calottes polaires)
// ---------------------------------------------------------------------------
export function makeMarsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE / 2;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const rng = makeRng(77);
  const rust: [number, number, number] = [193, 68, 14];
  const dark: [number, number, number] = [120, 50, 20];
  const light: [number, number, number] = [220, 130, 80];
  const ice: [number, number, number] = [240, 230, 220];

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      const lat = Math.abs(v - 0.5) * 2;
      const n = fbm(rng, u, v, 5, 6);
      let c: [number, number, number];
      if (lat > 0.88) {
        c = ice;
      } else if (n < 0.4) {
        c = dark;
      } else if (n < 0.7) {
        c = rust;
      } else {
        c = light;
      }
      const variation = (fbm(rng, u * 3, v * 3, 3, 10) - 0.5) * 25;
      const final: [number, number, number] = [
        Math.max(0, Math.min(255, c[0] + variation)),
        Math.max(0, Math.min(255, c[1] + variation)),
        Math.max(0, Math.min(255, c[2] + variation)),
      ];
      const idx = (y * canvas.width + x) * 4;
      img.data[idx] = final[0];
      img.data[idx + 1] = final[1];
      img.data[idx + 2] = final[2];
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// ---------------------------------------------------------------------------
// Texture : géante gazeuse (Jupiter, Saturne) — bandes horizontales
// ---------------------------------------------------------------------------
export function makeGasGiantTexture(colors: string[], seed = 33): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE / 2;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const rng = makeRng(seed);
  const palette = colors.map(hexToRgb);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      // Bandes horizontales + turbulence
      const band = v * palette.length + fbm(rng, u * 3, v * 2, 4, 6) * 1.5;
      const idxBand = Math.floor(band) % palette.length;
      const t = band - Math.floor(band);
      const a = palette[(idxBand + palette.length) % palette.length];
      const b = palette[(idxBand + 1) % palette.length];
      const c = mix(a, b, t);
      // Turbulences locales
      const turb = (fbm(rng, u * 8, v * 8, 3, 14) - 0.5) * 40;
      const final: [number, number, number] = [
        Math.max(0, Math.min(255, c[0] + turb)),
        Math.max(0, Math.min(255, c[1] + turb)),
        Math.max(0, Math.min(255, c[2] + turb)),
      ];
      const i = (y * canvas.width + x) * 4;
      img.data[i] = final[0];
      img.data[i + 1] = final[1];
      img.data[i + 2] = final[2];
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// ---------------------------------------------------------------------------
// Texture : géante de glace (Uranus, Neptune)
// ---------------------------------------------------------------------------
export function makeIceGiantTexture(baseColor: string, seed = 55): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE / 2;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const rng = makeRng(seed);
  const base = hexToRgb(baseColor);
  const dark = darken(base, 0.3);
  const light = lighten(base, 0.2);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      const band = v + fbm(rng, u * 2, v * 3, 4, 5) * 0.15;
      const t = Math.min(1, Math.max(0, band));
      const c = mix(dark, light, t);
      const turb = (fbm(rng, u * 6, v * 6, 3, 12) - 0.5) * 20;
      const final: [number, number, number] = [
        Math.max(0, Math.min(255, c[0] + turb)),
        Math.max(0, Math.min(255, c[1] + turb)),
        Math.max(0, Math.min(255, c[2] + turb)),
      ];
      const i = (y * canvas.width + x) * 4;
      img.data[i] = final[0];
      img.data[i + 1] = final[1];
      img.data[i + 2] = final[2];
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// ---------------------------------------------------------------------------
// Texture : Soleil (surface turbulente chaude)
// ---------------------------------------------------------------------------
export function makeSunTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE / 2;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const rng = makeRng(99);
  const hot: [number, number, number] = [255, 240, 180];
  const mid: [number, number, number] = [255, 200, 80];
  const cool: [number, number, number] = [220, 130, 30];

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width;
      const v = y / canvas.height;
      const n = fbm(rng, u, v, 5, 8);
      const t = Math.min(1, Math.max(0, n));
      let c: [number, number, number];
      if (t < 0.4) c = mix(cool, mid, t / 0.4);
      else c = mix(mid, hot, (t - 0.4) / 0.6);
      const i = (y * canvas.width + x) * 4;
      img.data[i] = c[0];
      img.data[i + 1] = c[1];
      img.data[i + 2] = c[2];
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// ---------------------------------------------------------------------------
// Texture : anneau (bandes radiales)
// ---------------------------------------------------------------------------
export function makeRingTexture(baseColor: string, seed = 13): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(canvas.width, canvas.height);
  const rng = makeRng(seed);
  const base = hexToRgb(baseColor);
  const dark = darken(base, 0.5);
  const light = lighten(base, 0.3);

  for (let x = 0; x < canvas.width; x++) {
    const u = x / canvas.width;
    // Bandes radiales + bruit
    const bands = Math.sin(u * 60) * 0.3 + Math.sin(u * 130) * 0.2 + Math.sin(u * 17) * 0.5;
    const noise = (fbm(rng, u * 4, 0.5, 3, 8) - 0.5) * 0.4;
    const t = Math.min(1, Math.max(0, 0.5 + bands + noise));
    const c = mix(dark, light, t);
    for (let y = 0; y < canvas.height; y++) {
      const idx = (y * canvas.width + x) * 4;
      img.data[idx] = c[0];
      img.data[idx + 1] = c[1];
      img.data[idx + 2] = c[2];
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}
