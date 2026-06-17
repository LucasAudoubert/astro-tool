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
