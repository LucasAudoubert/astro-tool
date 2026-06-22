/**
 * src/services/proxyClient.ts
 * ---------------------------------------------------------
 * Front-facing API client. Hits the local Node proxy at
 * /api/nasa/*. The proxy handles caching + the secret key.
 *
 * In dev:    Vite proxies /api → http://localhost:5174
 * In prod:   The same server.js serves the SPA + /api
 * ---------------------------------------------------------
 */

const API_BASE = "/api/nasa";

/* ---------- types ---------- */
export interface NeoObject {
  id: string;
  name: string;
  designation?: string;
  date: string;
  category: string;
  hazardous: boolean;
  distance: string; // formatted, e.g. "0.024 AU"
  distanceKm: number;
  velocity: string; // formatted, e.g. "12.4 km/s"
  missDistance: string; // formatted, e.g. "≈ 3.6 M km"
  diameterKm: number;
}

export interface NeoFeedResponse {
  startDate: string;
  count: number;
  hazardous: number;
  objects: NeoObject[];
  cached: boolean;
}

export interface ApodResponse {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  copyright?: string;
  cached?: boolean;
}

/* ---------- helpers ---------- */
async function jsonFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    ...init,
  });
  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.message) detail = body.message;
    } catch {}
    throw new Error(`proxy ${path} → ${detail}`);
  }
  return res.json() as Promise<T>;
}

/* ---------- endpoints ---------- */
export function fetchNeoFeed(startDate?: string): Promise<NeoFeedResponse> {
  const q = startDate ? `?start_date=${encodeURIComponent(startDate)}` : "";
  return jsonFetch<NeoFeedResponse>(`/neo/feed${q}`);
}

export function fetchApod(date?: string): Promise<{ data: ApodResponse; cached: boolean }> {
  const q = date ? `?date=${encodeURIComponent(date)}` : "";
  return jsonFetch<{ data: ApodResponse; cached: boolean }>(`/apod${q}`);
}

/* ---------- EPIC (DSCOVR) ---------- */
export interface EpicImage {
  identifier: string;
  caption: string;
  date: string;
  imageUrl: string;
  thumbnailUrl: string;
  centroidLat?: number;
  centroidLon?: number;
}
export interface EpicResponse {
  date: string;
  count: number;
  images: EpicImage[];
  cached: boolean;
}
export function fetchEpic(date?: string): Promise<EpicResponse> {
  const q = date ? `?date=${encodeURIComponent(date)}` : "";
  return jsonFetch<EpicResponse>(`/epic${q}`);
}

/* ---------- DONKI · Solar Flares (FLR) ---------- */
export type FlareClass = "B" | "C" | "M" | "X";
export interface SolarFlare {
  flrID: string;
  startTime: string;
  peakTime: string;
  endTime: string;
  classType: string; // e.g. "M2.3"
  intensity: 0 | 1 | 2 | 3 | 4;
  peak: number;
  location?: string;
  activeRegion?: number;
}
export interface SolarFlareResponse {
  startDate: string;
  count: number;
  flares: SolarFlare[];
  cached: boolean;
}
export function fetchSolarFlares(startDate?: string): Promise<SolarFlareResponse> {
  const q = startDate ? `?startDate=${encodeURIComponent(startDate)}` : "";
  return jsonFetch<SolarFlareResponse>(`/donki/flr${q}`);
}

/* ---------- InSight · Mars Weather ---------- */
export interface MarsWeatherResponse {
  archived: boolean;
  latestSol?: string;
  season?: string;
  temperature?: { avg?: number; min?: number; max?: number; unit?: string };
  wind?: {
    avg?: number;
    min?: number;
    max?: number;
    unit?: string;
    direction?: string;
  };
  pressure?: { avg?: number; min?: number; max?: number; unit?: string };
  firstUtc?: string;
  lastUtc?: string;
  error?: string;
  message?: string;
  cached: boolean;
}
export function fetchMarsWeather(): Promise<MarsWeatherResponse> {
  return jsonFetch<MarsWeatherResponse>(`/insight`);
}
