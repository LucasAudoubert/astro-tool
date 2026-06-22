import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface UseThreeSceneOptions {
  onMount?: (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ) => void;
  onFrame?: (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    deltaTime: number,
  ) => void;
  onResize?: (width: number, height: number) => void;
  clearColor?: number;
}

export interface UseThreeSceneReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  controls: OrbitControls | null;
}

/**
 * Hook personnalisé pour gérer une scène Three.js avec cycle de vie complet
 */
export function useThreeScene(
  options: UseThreeSceneOptions = {},
): UseThreeSceneReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());

  const handleWindowResize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current)
      return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);

    if (options.onResize) {
      options.onResize(width, height);
    }
  }, [options]);

  const renderLoop = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    const deltaTime = clockRef.current.getDelta();

    if (options.onFrame) {
      options.onFrame(sceneRef.current, cameraRef.current, deltaTime);
    }

    if (controlsRef.current) {
      controlsRef.current.update();
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [options]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Vérifier que le conteneur a des dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    if (width === 0 || height === 0) {
      console.warn("Conteneur Three.js n'a pas de dimensions valides");
      return;
    }

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(options.clearColor || 0x0a0e1a);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100000);
    camera.position.set(0, 50, 50);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    // Cap pixelRatio at 2 — huge perf win on 4K/Retina without visible quality loss
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 5;
    controls.maxDistance = 500;
    controls.zoomSpeed = 0.8;
    controls.rotateSpeed = 0.6;
    controlsRef.current = controls;

    // Ajouter lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 0, 0); // Au centre (soleil)
    scene.add(pointLight);

    // Callback mount
    if (options.onMount) {
      options.onMount(scene, camera, renderer);
    }

    // Lancer la boucle de rendu
    renderLoop();

    // Event listeners
    window.addEventListener("resize", handleWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleWindowResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      controlsRef.current?.dispose();
    };
  }, [renderLoop, handleWindowResize, options]);

  return {
    containerRef,
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    controls: controlsRef.current,
  };
}
