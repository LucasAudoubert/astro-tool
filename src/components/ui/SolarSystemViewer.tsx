import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Play, Pause, X } from "lucide-react";
import styles from "./SolarSystemViewer.module.css";
import { PLANETS, SUN, J2000_EPOCH, keplerPosition, compactDistance, type PlanetData } from "./planetData";
import {
  makeRockyTexture,
  makeCloudyTexture,
  makeEarthTexture,
  makeMarsTexture,
  makeGasGiantTexture,
  makeIceGiantTexture,
  makeSunTexture,
  makeRingTexture,
} from "./planetTextures";

/* ============================================
   SolarSystemViewer — Three.js, 100% autonome
   Aucune dépendance à un hook externe : la scène,
   la caméra, le renderer et les contrôles sont
   gérés entièrement dans ce composant.
   ============================================ */

interface PlanetMesh extends THREE.Mesh {
  planetData: PlanetData;
  orbitRadiusAU: number;
}

const ORBIT_SAMPLES = 256;

function buildPlanetTexture(p: PlanetData): THREE.CanvasTexture {
  switch (p.name) {
    case "Mercure":
      return makeRockyTexture(p.color, 1.4, 11);
    case "Vénus":
      return makeCloudyTexture(p.color, 22);
    case "Terre":
      return makeEarthTexture();
    case "Mars":
      return makeMarsTexture();
    case "Jupiter":
      return makeGasGiantTexture(["#9c6b3f", "#d9b178", "#c9a26a", "#e8d2a0", "#b9885a", "#d9b178"], 33);
    case "Saturne":
      return makeGasGiantTexture(["#c9a96a", "#e3d3a0", "#d4bd8a", "#f0e3bd"], 44);
    case "Uranus":
      return makeIceGiantTexture(p.color, 55);
    case "Neptune":
      return makeIceGiantTexture(p.color, 66);
    default:
      return makeRockyTexture(p.color, 1, 99);
  }
}

export default function SolarSystemViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // --- État UI (déclenche re-render pour le panneau d'info / contrôles) ---
  const [paused, setPaused] = useState(false);
  const [timeScale, setTimeScale] = useState(8);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [labelPositions, setLabelPositions] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});

  // --- Refs miroirs (évitent les stale closures dans la boucle d'animation) ---
  const pausedRef = useRef(paused);
  const timeScaleRef = useRef(timeScale);
  const showOrbitsRef = useRef(showOrbits);
  const selectedNameRef = useRef<string | null>(selectedName);
  const hoveredNameRef = useRef<string | null>(hoveredName);

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { timeScaleRef.current = timeScale; }, [timeScale]);
  useEffect(() => { showOrbitsRef.current = showOrbits; }, [showOrbits]);
  useEffect(() => { selectedNameRef.current = selectedName; }, [selectedName]);
  useEffect(() => { hoveredNameRef.current = hoveredName; }, [hoveredName]);

  // --- Refs Three.js (objets persistants, pas de re-render) ---
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshesRef = useRef<Map<string, PlanetMesh>>(new Map());
  const orbitLinesRef = useRef<THREE.Line[]>([]);
  const sunMeshRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2(-99, -99));
  const simTimeRef = useRef<number>(Date.now() - J2000_EPOCH);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const cameraDestRef = useRef<THREE.Vector3 | null>(null);
  const orbitTargetRef = useRef<THREE.Vector3 | null>(null);
  const isPointerDownRef = useRef(false);
  const pointerMovedRef = useRef(false);

  const focusOnPlanet = useCallback((name: string | null) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (name === null) {
      cameraDestRef.current = new THREE.Vector3(0, 26, 42);
      orbitTargetRef.current = new THREE.Vector3(0, 0, 0);
      setSelectedName(null);
      return;
    }

    const mesh = meshesRef.current.get(name);
    if (!mesh) return;
    const pos = mesh.position.clone();
    const dist = Math.max(mesh.planetData.size * 7 + 3, 5);
    const offset = new THREE.Vector3(dist * 0.7, dist * 0.5, dist * 0.7);
    cameraDestRef.current = pos.clone().add(offset);
    orbitTargetRef.current = pos.clone();
    setSelectedName((prev) => (prev === name ? null : name));
  }, []);

  // --- Initialisation de la scène (une seule fois) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    camera.position.set(0, 26, 42);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setClearColor(0x03030a, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3;
    controls.maxDistance = 300;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // --- Lumières ---
    const sunLight = new THREE.PointLight(0xfff4d6, 4.5, 0, 0.7);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x1a1a2e, 0.35));

    // --- Soleil ---
    const sunGeo = new THREE.SphereGeometry(SUN.size, 48, 48);
    const sunTex = makeSunTexture();
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);
    sunMeshRef.current = sunMesh;

    const coronaGeo = new THREE.SphereGeometry(SUN.size * 1.35, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(coronaGeo, coronaMat));

    const corona2Geo = new THREE.SphereGeometry(SUN.size * 1.8, 32, 32);
    const corona2Mat = new THREE.MeshBasicMaterial({
      color: 0xff8800,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(corona2Geo, corona2Mat));

    // --- Étoiles (fond) ---
    const starCount = 2200;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 250 + Math.random() * 350;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
      const tint = 0.75 + Math.random() * 0.25;
      starColors[i * 3] = tint;
      starColors[i * 3 + 1] = tint;
      starColors[i * 3 + 2] = tint * (0.92 + Math.random() * 0.08);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.1,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // --- Planètes ---
    PLANETS.forEach((p) => {
      const geo = new THREE.SphereGeometry(p.size, 48, 48);
      const tex = buildPlanetTexture(p);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.85,
        metalness: 0.05,
        emissive: new THREE.Color(p.color),
        emissiveIntensity: 0.04,
      });
      const mesh = new THREE.Mesh(geo, mat) as unknown as PlanetMesh;
      mesh.planetData = p;
      mesh.orbitRadiusAU = p.a;
      mesh.rotation.z = (p.axialTilt * Math.PI) / 180;
      scene.add(mesh);
      meshesRef.current.set(p.name, mesh);

      // Atmosphère subtile pour Terre/Vénus
      if (p.name === "Terre" || p.name === "Vénus") {
        const atmGeo = new THREE.SphereGeometry(p.size * 1.04, 32, 32);
        const atmColor = p.name === "Terre" ? 0x6fb7ff : 0xffdca0;
        const atmMat = new THREE.MeshBasicMaterial({
          color: atmColor,
          transparent: true,
          opacity: 0.12,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
        });
        const atm = new THREE.Mesh(atmGeo, atmMat);
        mesh.add(atm);
      }

      // Anneaux
      if (p.hasRings && p.ringInner && p.ringOuter) {
        const ringGeo = new THREE.RingGeometry(p.ringInner, p.ringOuter, 96, 1);
        // UV radiales pour un mapping correct de la texture d'anneau
        const pos = ringGeo.attributes.position;
        const uv = ringGeo.attributes.uv;
        const v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
          v3.fromBufferAttribute(pos, i);
          const radius = v3.length();
          const t = (radius - p.ringInner) / (p.ringOuter - p.ringInner);
          uv.setXY(i, t, 1);
        }
        const ringTex = makeRingTexture(p.ringColor ?? p.color, p.name.length * 13);
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
      }

      // Orbite (ellipse précomputée)
      const points: THREE.Vector3[] = [];
      const dist = compactDistance(p.a);
      const scaleFactor = dist / p.a;
      const iRad = (p.i * Math.PI) / 180;
      const oRad = (p.longNode * Math.PI) / 180;
      const wRad = ((p.longPeri - p.longNode) * Math.PI) / 180;
      for (let s = 0; s <= ORBIT_SAMPLES; s++) {
        const M = (s / ORBIT_SAMPLES) * Math.PI * 2;
        let E = M;
        for (let k = 0; k < 5; k++) {
          E = E - (E - p.e * Math.sin(E) - M) / (1 - p.e * Math.cos(E));
        }
        const xp = p.a * (Math.cos(E) - p.e);
        const yp = p.a * Math.sqrt(1 - p.e * p.e) * Math.sin(E);
        const cosW = Math.cos(wRad), sinW = Math.sin(wRad);
        const cosO = Math.cos(oRad), sinO = Math.sin(oRad);
        const cosI = Math.cos(iRad), sinI = Math.sin(iRad);
        const x = xp * (cosW * cosO - sinW * sinO * cosI) - yp * (sinW * cosO + cosW * sinO * cosI);
        const z = xp * (cosW * sinO + sinW * cosO * cosI) - yp * (sinW * sinO - cosW * cosO * cosI);
        const y = xp * sinW * sinI + yp * cosW * sinI;
        points.push(new THREE.Vector3(x * scaleFactor, y * scaleFactor, z * scaleFactor));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({ color: p.color, transparent: true, opacity: 0.22 });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      orbitLinesRef.current.push(line);
    });

    // --- Ceinture d'astéroïdes (décorative, entre Mars et Jupiter) ---
    const beltInner = compactDistance(2.1);
    const beltOuter = compactDistance(3.3);
    const asteroidCount = 700;
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidPos = new Float32Array(asteroidCount * 3);
    for (let i = 0; i < asteroidCount; i++) {
      const r = beltInner + Math.random() * (beltOuter - beltInner);
      const theta = Math.random() * Math.PI * 2;
      const yJitter = (Math.random() - 0.5) * 0.5;
      asteroidPos[i * 3] = Math.cos(theta) * r;
      asteroidPos[i * 3 + 1] = yJitter;
      asteroidPos[i * 3 + 2] = Math.sin(theta) * r;
    }
    asteroidGeo.setAttribute("position", new THREE.BufferAttribute(asteroidPos, 3));
    const asteroidMat = new THREE.PointsMaterial({ color: 0x9a8f7a, size: 0.06, sizeAttenuation: true });
    const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
    scene.add(asteroidBelt);

    // --- Resize handling ---
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // --- Raycasting / pointer ---
    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (isPointerDownRef.current) pointerMovedRef.current = true;
    };
    const handlePointerDown = () => {
      isPointerDownRef.current = true;
      pointerMovedRef.current = false;
    };
    const handlePointerUp = () => {
      isPointerDownRef.current = false;
    };
    const handlePointerLeave = () => {
      pointerRef.current.set(-99, -99);
    };
    const handleClick = () => {
      if (pointerMovedRef.current) return;
      const hovered = hoveredNameRef.current;
      focusOnPlanet(hovered);
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointermove", handlePointerMove);
    dom.addEventListener("pointerdown", handlePointerDown);
    dom.addEventListener("pointerup", handlePointerUp);
    dom.addEventListener("pointerleave", handlePointerLeave);
    dom.addEventListener("click", handleClick);

    setIsReady(true);

    // --- Boucle d'animation ---
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.1);
      frameRef.current++;

      if (!pausedRef.current) {
        simTimeRef.current += dt * timeScaleRef.current * 1000 * 86400 * 0.001;
      }
      const days = simTimeRef.current / 86400000;

      if (sunMeshRef.current) sunMeshRef.current.rotation.y += 0.0015;

      meshesRef.current.forEach((mesh) => {
        const p = mesh.planetData;
        const kp = keplerPosition(p, days);
        const dist = compactDistance(p.a);
        const scaleFactor = dist / p.a;
        mesh.position.set(kp.x * scaleFactor, kp.y * scaleFactor, kp.z * scaleFactor);
        const rotSpeed = p.rotationPeriod !== 0 ? (2 * Math.PI) / (Math.abs(p.rotationPeriod) / 24) / 60 : 0;
        mesh.rotation.y += rotSpeed * (p.rotationPeriod < 0 ? -1 : 1) * dt * 4;
      });

      orbitLinesRef.current.forEach((l) => (l.visible = showOrbitsRef.current));

      // Animation caméra (focus fluide)
      if (cameraDestRef.current && orbitTargetRef.current && controlsRef.current && cameraRef.current) {
        cameraRef.current.position.lerp(cameraDestRef.current, 0.045);
        controlsRef.current.target.lerp(orbitTargetRef.current, 0.045);
        if (cameraRef.current.position.distanceTo(cameraDestRef.current) < 0.3) {
          cameraDestRef.current = null;
          orbitTargetRef.current = null;
        }
      }

      // Raycast hover
      if (pointerRef.current.x > -2 && cameraRef.current) {
        raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
        const targets = Array.from(meshesRef.current.values());
        const hits = raycasterRef.current.intersectObjects(targets, false);
        const hit = hits[0]?.object as PlanetMesh | undefined;
        const newHover = hit?.planetData?.name ?? null;
        if (newHover !== hoveredNameRef.current) {
          hoveredNameRef.current = newHover;
          setHoveredName(newHover);
          dom.style.cursor = newHover ? "pointer" : "grab";
        }
      }

      controlsRef.current?.update();

      // Calcul des positions d'écran pour les labels HTML
      if (cameraRef.current && container) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const next: Record<string, { x: number; y: number; visible: boolean }> = {};
        meshesRef.current.forEach((mesh, name) => {
          const v = mesh.position.clone().project(cameraRef.current!);
          const x = (v.x * 0.5 + 0.5) * w;
          const y = (-v.y * 0.5 + 0.5) * h;
          next[name] = { x, y, visible: v.z < 1 };
        });
        setLabelPositions(next);
      }

      rendererRef.current?.render(scene, cameraRef.current!);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      dom.removeEventListener("pointermove", handlePointerMove);
      dom.removeEventListener("pointerdown", handlePointerDown);
      dom.removeEventListener("pointerup", handlePointerUp);
      dom.removeEventListener("pointerleave", handlePointerLeave);
      dom.removeEventListener("click", handleClick);
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          const mat = obj.material as THREE.Material | THREE.Material[];
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        }
      });
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      meshesRef.current.clear();
      orbitLinesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseLeaveContainer = useCallback(() => {
    pointerRef.current.set(-99, -99);
    hoveredNameRef.current = null;
    setHoveredName(null);
  }, []);

  const activeName = selectedName ?? hoveredName;
  const activePlanet = activeName ? PLANETS.find((p) => p.name === activeName) ?? null : null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>Simulation 3D · Éléments képlériens J2000</span>
          <span className={styles.subtitle}>Glisse pour orbiter · Molette pour zoomer · Clique une planète</span>
        </div>
        <div className={styles.controls}>
          <button
            className={styles.button}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Lecture" : "Pause"}
          >
            {paused ? <><Play size={14} /> Lecture</> : <><Pause size={14} /> Pause</>}
          </button>
          <button className={styles.buttonGhost} onClick={() => focusOnPlanet(null)}>
            Vue globale
          </button>
          <div className={styles.sliderWrap}>
            <label className={styles.sliderLabel}>
              Vitesse
              <span className={styles.sliderVal}>{timeScale} j/s</span>
            </label>
            <input
              type="range"
              min={0}
              max={200}
              step={1}
              value={timeScale}
              onChange={(e) => setTimeScale(Number(e.target.value))}
              className={styles.slider}
            />
          </div>
        </div>
      </div>

      <div className={styles.toggles}>
        <button
          className={`${styles.toggle} ${showOrbits ? styles.toggleActive : ""}`}
          onClick={() => setShowOrbits((v) => !v)}
        >
          Orbites
        </button>
        <button
          className={`${styles.toggle} ${showLabels ? styles.toggleActive : ""}`}
          onClick={() => setShowLabels((v) => !v)}
        >
          Labels
        </button>
      </div>

      <div ref={containerRef} className={styles.viewport} onMouseLeave={handleMouseLeaveContainer}>
        {isReady && showLabels && (
          <div className={styles.labelsLayer}>
            {PLANETS.map((p) => {
              const lp = labelPositions[p.name];
              if (!lp || !lp.visible) return null;
              const isActive = activeName === p.name;
              return (
                <button
                  key={p.name}
                  type="button"
                  className={`${styles.planetLabel} ${isActive ? styles.planetLabelActive : ""}`}
                  style={{
                    transform: `translate3d(${lp.x}px, ${lp.y}px, 0) translate(-50%, -50%)`,
                    ["--planet-color" as string]: p.color,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    focusOnPlanet(p.name);
                  }}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        )}

        {activePlanet && (
          <div className={styles.infoPanel} style={{ borderColor: activePlanet.color }}>
            <div className={styles.infoHeader}>
              <span className={styles.infoDot} style={{ background: activePlanet.color }} />
              <h3 style={{ color: activePlanet.color }}>{activePlanet.name}</h3>
              {selectedName === activePlanet.name && (
                <button className={styles.infoClose} onClick={() => focusOnPlanet(null)} aria-label="Fermer">
                  <X size={14} />
                </button>
              )}
            </div>
            <p className={styles.infoDescription}>{activePlanet.description}</p>
            <div className={styles.infos}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Diamètre</span>
                <span className={styles.value}>{activePlanet.diameterKm.toLocaleString("fr-FR")} km</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Masse (Terre = 1)</span>
                <span className={styles.value}>{activePlanet.massEarths.toLocaleString("fr-FR")}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Lunes</span>
                <span className={styles.value}>{activePlanet.moons}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Température moy.</span>
                <span className={styles.value}>{activePlanet.tempC} °C</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Durée du jour</span>
                <span className={styles.value}>{activePlanet.dayLengthH.toLocaleString("fr-FR")} h</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Demi-grand axe</span>
                <span className={styles.value}>{activePlanet.a.toFixed(3)} UA</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Excentricité</span>
                <span className={styles.value}>{activePlanet.e.toFixed(4)}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Inclinaison orbitale</span>
                <span className={styles.value}>{activePlanet.i.toFixed(2)}°</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Période orbitale</span>
                <span className={styles.value}>{activePlanet.period.toLocaleString("fr-FR")} j</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}