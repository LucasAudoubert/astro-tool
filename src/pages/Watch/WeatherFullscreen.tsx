import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CloudSun,
  ExternalLink,
  Loader2,
  MapPin,
  RefreshCw,
} from "lucide-react";
import styles from "./Watch.module.css";

/**
 * Fullscreen weather module — Astrospheric embed.
 *
 * The Astrospheric Embed API is a JS library that injects a forecast control
 * into a target <div>. We inject the script lazily on mount, then call
 * `m_AstrosphericEmbed.Create(containerId, lat, lon)` once it's loaded.
 *
 * Default location: Enghien-les-Bains (≈ 48.97°N, 2.31°E).
 * Users can switch to a few preset observation sites around France.
 */
interface Preset {
  id: string;
  label: string;
  lat: number;
  lon: number;
}

const PRESETS: Preset[] = [
  { id: "enghien", label: "Enghien-les-Bains", lat: 48.97, lon: 2.31 },
  { id: "paris", label: "Paris · IDF", lat: 48.8566, lon: 2.3522 },
  { id: "pic", label: "Pic du Midi", lat: 42.9369, lon: 0.1411 },
  { id: "calanques", label: "Calanques · Marseille", lat: 43.21, lon: 5.45 },
  { id: "alsace", label: "Vosges · Alsace", lat: 48.0, lon: 7.15 },
];

const CONTAINER_ID = "AstrosphericEmbedContainer";
const SCRIPT_SRC =
  "https://astrosphericcloudstorage.blob.core.windows.net/embed/astrosphericembed.js";

// Type-safe global handle for the Astrospheric embed.
type AstrosphericAPI = {
  Create: (containerId: string, lat: number, lon: number) => void;
  ChangeLocation: (lat: number, lon: number) => void;
};

declare global {
  interface Window {
    m_AstrosphericEmbed?: AstrosphericAPI;
  }
}

export default function WeatherFullscreen({ onBack }: { onBack: () => void }) {
  const [presetId, setPresetId] = useState<string>(PRESETS[0].id);
  const [scriptReady, setScriptReady] = useState(
    typeof window !== "undefined" && !!window.m_AstrosphericEmbed,
  );
  const [scriptError, setScriptError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const initOnceRef = useRef(false);

  const current = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];

  // Load the Astrospheric script once on mount.
  useEffect(() => {
    if (window.m_AstrosphericEmbed) {
      setScriptReady(true);
      return;
    }
    const existing = document.querySelector(
      `script[src="${SCRIPT_SRC}"]`,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => setScriptReady(true));
      existing.addEventListener("error", () => setScriptError(true));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => setScriptError(true);
    document.head.appendChild(script);
    return () => {
      // Pas de cleanup — le script peut rester pour de futurs retours sur la vue.
    };
  }, []);

  // Init / ChangeLocation — une seule instance par mount, puis updates via ChangeLocation.
  useEffect(() => {
    if (!scriptReady || !window.m_AstrosphericEmbed) return;
    if (!initOnceRef.current) {
      window.m_AstrosphericEmbed.Create(CONTAINER_ID, current.lat, current.lon);
      initOnceRef.current = true;
    } else {
      window.m_AstrosphericEmbed.ChangeLocation(current.lat, current.lon);
    }
  }, [scriptReady, current.lat, current.lon, reloadKey]);

  // Lock body scroll while fullscreen is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className={styles.fullscreen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* ---- Top control bar ---- */}
      <div className={styles.controlBar}>
        <button
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Retour au menu"
        >
          <ArrowLeft size={16} />
          <span>Retour</span>
        </button>

        <div className={styles.controlBarCenter}>
          <CloudSun size={18} className={styles.controlBarIcon} />
          <div className={styles.controlBarText}>
            <span className={styles.controlBarTitle}>Météo astronomique</span>
            <span className={styles.controlBarSub}>
              Astrospheric · prévisions 72h
            </span>
          </div>
        </div>

        <div className={styles.presetGroup} role="tablist">
          <MapPin size={13} className={styles.presetIcon} />
          {PRESETS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={presetId === p.id}
              className={`${styles.presetChip} ${
                presetId === p.id ? styles.presetChipActive : ""
              }`}
              onClick={() => setPresetId(p.id)}
              title={`${p.label} (${p.lat.toFixed(2)}, ${p.lon.toFixed(2)})`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          className={styles.iconBtn}
          onClick={() => setReloadKey((k) => k + 1)}
          aria-label="Recharger le module"
          title="Recharger le module"
        >
          <RefreshCw size={14} />
        </button>

        <a
          className={styles.iconBtn}
          href={`https://www.astrospheric.com/?latitude=${current.lat}&longitude=${current.lon}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Ouvrir Astrospheric dans un nouvel onglet"
          title="Ouvrir Astrospheric.com"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* ---- Embed area ---- */}
      <div className={styles.embedStage}>
        {!scriptReady && !scriptError && (
          <div className={styles.embedOverlay}>
            <Loader2
              size={32}
              style={{ animation: "spin 1s linear infinite" }}
            />
            <span>Chargement du module Astrospheric…</span>
          </div>
        )}
        {scriptError && (
          <div className={styles.embedOverlay}>
            <CloudSun size={32} color="var(--accent-secondary)" />
            <strong>Astrospheric indisponible</strong>
            <span>
              Vérifie ta connexion réseau puis recharge la page.
            </span>
          </div>
        )}
        <div
          id={CONTAINER_ID}
          key={reloadKey}
          className={styles.embedContainer}
        />
      </div>

      {/* ---- Status footer ---- */}
      <div className={styles.controlFoot}>
        <span>
          POS · {current.label} · {current.lat.toFixed(2)}°, {current.lon.toFixed(2)}°
        </span>
        <span>Astrospheric · Données NOAA / NWS</span>
      </div>
    </motion.div>
  );
}
