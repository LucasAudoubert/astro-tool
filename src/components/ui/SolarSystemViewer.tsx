import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useThreeScene } from "../../hooks/useThreeScene";
import {
  getPlanetPositions,
  type CelestialPosition,
  formatDistance,
  formatMagnitude,
} from "../../services/astronomyApi";
import { planets } from "../../data/planets";
import styles from "./SolarSystemViewer.module.css";

interface PlanetMesh extends THREE.Mesh {
  planetData?: CelestialPosition;
  planetInfo?: (typeof planets)[0];
}

export default function SolarSystemViewer() {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<CelestialPosition | null>(
    null,
  );

  const meshesRef = useRef<Map<string, PlanetMesh>>(new Map());
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Créer des planètes mappées par nom
  const planetMap = useMemo(() => {
    const map = new Map();
    planets.forEach((p) => map.set(p.name, p));
    return map;
  }, []);

  const { containerRef, scene, camera } = useThreeScene({
    clearColor: 0x0a0e1a,
    onMount: (scene) => {
      // Créer le soleil
      const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
      const sunMaterial = new THREE.MeshStandardMaterial({
        color: 0xfdcb6e,
        emissive: 0xfdcb6e,
        emissiveIntensity: 1.5,
        roughness: 0.2,
      });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sun.position.set(0, 0, 0);
      scene.add(sun);

      // Ajouter glow au soleil
      const glowGeometry = new THREE.SphereGeometry(6, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xfdcb6e,
        transparent: true,
        opacity: 0.2,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glow);
    },
    onFrame: (scene, camera) => {
      // Rotation du soleil
      const sun = scene.children.find(
        (child) =>
          child instanceof THREE.Mesh &&
          (child as any).geometry?.type === "SphereGeometry",
      );
      if (sun && (sun as PlanetMesh).planetData === undefined) {
        sun.rotation.y += 0.001;
      }

      // Raycasting pour détecter survol
      if (camera) {
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(
          Array.from(meshesRef.current.values()),
        );

        // Reset tous les planètes
        meshesRef.current.forEach((mesh) => {
          const originalScale = (mesh.planetInfo?.radius || 1) / 3000;
          const scaleFactor = Math.max(0.3, Math.min(2, originalScale));
          mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        });

        // Mettre en évidence la planète survolée
        if (intersects.length > 0) {
          const mesh = intersects[0].object as PlanetMesh;
          if (mesh.planetData) {
            setHoveredPlanet(mesh.planetData);
            const originalScale = (mesh.planetInfo?.radius || 1) / 3000;
            const scaleFactor = Math.max(0.3, Math.min(2, originalScale));
            mesh.scale.set(
              scaleFactor * 1.2,
              scaleFactor * 1.2,
              scaleFactor * 1.2,
            );
          }
        } else {
          setHoveredPlanet(null);
        }
      }
    },
  });

  // Récupérer les positions des planètes
  useEffect(() => {
    setLoading(true);
    setError(null);
    meshesRef.current.clear();

    getPlanetPositions(date)
      .then((positions) => {
        if (!scene) return;

        // Supprimer les anciennes mailles
        const toRemove: THREE.Object3D[] = [];
        scene.children.forEach((child) => {
          if (child instanceof THREE.Mesh && (child as PlanetMesh).planetData) {
            toRemove.push(child);
          }
        });
        toRemove.forEach((child) => scene.remove(child));

        // Créer les nouvelles planètes
        positions.forEach((position) => {
          const planetInfo = planetMap.get(position.name);
          if (!planetInfo) return;

          // Créer la géométrie et le matériau
          const size = Math.max(0.3, Math.min(2, planetInfo.radius / 3000));
          const geometry = new THREE.SphereGeometry(size, 32, 32);
          const material = new THREE.MeshStandardMaterial({
            color: planetInfo.color,
            roughness: 0.7,
            metalness: 0.3,
          });

          const mesh = new THREE.Mesh(geometry, material) as PlanetMesh;
          mesh.position.set(position.x, position.y, position.z);
          mesh.planetData = position;
          mesh.planetInfo = planetInfo;

          scene.add(mesh);
          meshesRef.current.set(position.name, mesh);
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading planet positions:", err);
        setError(`Erreur lors du chargement des positions: ${err.message}`);
        setLoading(false);
      });
  }, [date, scene, planetMap]);

  // Gestion du mouvement de la souris
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleToday = () => {
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
  };

  // Calculer les limites de date (±30 jours)
  const today = new Date();
  const minDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.dateControls}>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              min={minDate}
              max={maxDate}
              className={styles.dateInput}
            />
          </label>
          <button onClick={handleToday} className={styles.button}>
            Aujourd'hui
          </button>
        </div>
        {loading && <div className={styles.loading}>Chargement...</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <div
        ref={containerRef}
        className={styles.viewport}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPlanet(null)}
      />

      {hoveredPlanet && (
        <div className={styles.infoPanel}>
          <h3>{hoveredPlanet.name}</h3>
          <div className={styles.infos}>
            <p>
              <span className={styles.label}>Distance:</span>{" "}
              {formatDistance(hoveredPlanet.distanceKm)}
            </p>
            <p>
              <span className={styles.label}>Distance (lumière):</span>{" "}
              {hoveredPlanet.distanceLightYears.toFixed(6)} années-lumière
            </p>
            <p>
              <span className={styles.label}>Magnitude:</span>{" "}
              {formatMagnitude(hoveredPlanet.magnitude)}
            </p>
            <p>
              <span className={styles.label}>RA/Dec:</span>{" "}
              {((hoveredPlanet.ra * 180) / Math.PI).toFixed(2)}° /{" "}
              {((hoveredPlanet.dec * 180) / Math.PI).toFixed(2)}°
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
