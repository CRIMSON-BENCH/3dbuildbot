"use client";
// Real 3D CAD viewer using imperative three.js. Compatible with React 19 (no @react-three/fiber).
// Accepts a File (STL/OBJ) or falls back to a stylized placeholder mesh.

import { useEffect, useRef } from "react";

interface Props {
  file?: File | null;
  fallbackShape?: "bracket" | "gear" | "torus" | "cube";
  color?: string;
  height?: number;
}

export function ThreeViewer({ file, fallbackShape = "bracket", color = "#3b82f6", height = 360 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three-stdlib");

      const container = containerRef.current!;
      const w = container.clientWidth;
      const h = height;

      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 5000);
      camera.position.set(80, 60, 100);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const dl = new THREE.DirectionalLight(0xffffff, 1.2);
      dl.position.set(50, 80, 30);
      dl.castShadow = true;
      scene.add(dl);
      scene.add(new THREE.DirectionalLight(0x60a5fa, 0.35));

      // Grid + axes
      const grid = new THREE.GridHelper(200, 40, 0x475569, 0x1e293b);
      grid.position.y = -25;
      scene.add(grid);
      const axes = new THREE.AxesHelper(30);
      axes.position.y = -24.9;
      scene.add(axes);

      // Load geometry
      let mesh: THREE.Mesh | null = null;
      try {
        if (file) {
          const ext = file.name.split(".").pop()?.toLowerCase();
          if (ext === "stl") {
            const { STLLoader } = await import("three-stdlib");
            const buf = await file.arrayBuffer();
            const geom = new STLLoader().parse(buf);
            mesh = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color, metalness: 0.25, roughness: 0.45 }));
          } else if (ext === "obj") {
            const { OBJLoader } = await import("three-stdlib");
            const text = await file.text();
            const grp = new OBJLoader().parse(text);
            grp.traverse((n) => { if ((n as THREE.Mesh).isMesh) (n as THREE.Mesh).material = new THREE.MeshStandardMaterial({ color, metalness: 0.25, roughness: 0.45 }); });
            scene.add(grp);
          }
        }
        if (!mesh && !file) {
          mesh = placeholderMesh(THREE, fallbackShape, color);
        }
        if (mesh) {
          mesh.castShadow = true;
          scene.add(mesh);
          // Fit camera
          const box = new THREE.Box3().setFromObject(mesh);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fitDist = maxDim / (2 * Math.tan((camera.fov * Math.PI) / 360));
          camera.position.copy(center.clone().add(new THREE.Vector3(fitDist, fitDist * 0.7, fitDist)));
          camera.lookAt(center);
          grid.position.y = box.min.y - 2;
          axes.position.y = box.min.y - 1.9;
        }
      } catch {
        if (!mesh) { mesh = placeholderMesh(THREE, fallbackShape, color); scene.add(mesh); }
      }

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.autoRotate = !file;
      controls.autoRotateSpeed = 0.6;

      let raf = 0;
      const loop = () => {
        if (disposed) return;
        controls.update();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      loop();

      const onResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / height;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, height);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        controls.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [file, fallbackShape, color, height]);

  return (
    <div ref={containerRef} style={{ height }} className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
      <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-widest pointer-events-none">Live 3D · drag to orbit</div>
      <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-500 dark:text-slate-500 pointer-events-none">three.js · WebGL</div>
    </div>
  );
}

function placeholderMesh(THREE: typeof import("three"), shape: string, color: string): import("three").Mesh {
  let geom: import("three").BufferGeometry;
  if (shape === "gear") geom = new THREE.TorusGeometry(20, 6, 16, 32);
  else if (shape === "torus") geom = new THREE.TorusKnotGeometry(15, 4, 128, 16);
  else if (shape === "cube") geom = new THREE.BoxGeometry(28, 28, 28);
  else {
    // Bracket: L-shape via merged boxes
    const g1 = new THREE.BoxGeometry(40, 4, 25);
    const g2 = new THREE.BoxGeometry(4, 25, 25);
    g2.translate(-18, 12, 0);
    const merged = new THREE.BufferGeometry();
    const pos1 = g1.attributes.position.array as Float32Array;
    const pos2 = g2.attributes.position.array as Float32Array;
    const combined = new Float32Array(pos1.length + pos2.length);
    combined.set(pos1); combined.set(pos2, pos1.length);
    merged.setAttribute("position", new THREE.BufferAttribute(combined, 3));
    merged.computeVertexNormals();
    geom = merged;
  }
  return new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.4 }));
}
