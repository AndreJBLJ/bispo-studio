"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/components/shared/Motion";

/**
 * O abajur Torsa (modelo real da Bispo Decorações) sendo impresso: um plano de corte sobe
 * do pé ao topo conforme a página rola. Dentro do corte, a parede aparece em mint, como o
 * plástico recém-saído do bico. Quando termina, a cúpula acende.
 *
 * `progress` vai de 0 a 1 e vem de fora (ScrollTrigger), lido a cada quadro.
 */
export function TorsaPrint({ progress }: { progress: { current: number } }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current!;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.localClippingEnabled = true;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(26, 1, 0.01, 10);
      scene.add(new THREE.HemisphereLight("#ffffff", "#2a1d6e", 1.4));
      const key = new THREE.DirectionalLight("#ffffff", 2.4);
      key.position.set(0.6, 1.2, 1.1);
      scene.add(key);
      const rim = new THREE.DirectionalLight("#88f9c0", 1.2);
      rim.position.set(-1, 0.4, -0.8);
      scene.add(rim);

      const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
      const tex = new THREE.TextureLoader();
      const [gltf, normalMap] = await Promise.all([
        new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync("/models/torsa.glb"),
        tex.loadAsync("/models/cupula-normal.webp"),
      ]);
      if (disposed) return;
      normalMap.colorSpace = THREE.NoColorSpace;
      normalMap.wrapS = THREE.RepeatWrapping;

      const shade = new THREE.MeshStandardMaterial({
        color: "#e08918",
        roughness: 0.6,
        normalMap,
        normalMapType: THREE.ObjectSpaceNormalMap,
        side: THREE.FrontSide,
        clippingPlanes: [clip],
        emissive: new THREE.Color("#ff9a1f"),
        emissiveIntensity: 0,
      });
      const base = new THREE.MeshStandardMaterial({ color: "#1c1d21", roughness: 0.48, clippingPlanes: [clip] });
      const fresh = new THREE.MeshBasicMaterial({ color: "#88f9c0", side: THREE.BackSide, clippingPlanes: [clip] });

      const model = gltf.scene;
      const extra: import("three").Mesh[] = [];
      model.traverse((o) => {
        const m = o as import("three").Mesh;
        if (!m.isMesh) return;
        if (!m.geometry.attributes.normal) m.geometry.computeVertexNormals();
        const nome = m.parent?.name;
        m.material = nome === "base" ? base : shade;
        const inside = new THREE.Mesh(m.geometry, fresh);
        inside.position.copy(m.position);
        inside.rotation.copy(m.rotation);
        inside.scale.copy(m.scale);
        extra.push(inside);
        m.parent?.add(inside);
      });
      void extra;

      model.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(model, true);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      const spin = new THREE.Group();
      spin.add(model);
      spin.rotation.x = 0.0;
      scene.add(spin);
      const yMin = -size.y / 2;
      const yMax = size.y / 2;

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const fit = (size.y * 1.75) / (2 * Math.tan((camera.fov * Math.PI) / 360));
        const fitW = (size.x * 2.1) / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
        camera.position.set(0, size.y * 0.32, Math.max(fit, fitW));
        camera.lookAt(0, -size.y * 0.02, 0);
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const reduce = reducedMotion();
      let raf = 0;
      let visible = true;
      let eased = 0;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
      io.observe(host);

      const frame = (t: number) => {
        raf = requestAnimationFrame(frame);
        if (!visible) return;
        const target = reduce ? 1 : progress.current;
        eased += (target - eased) * 0.12;
        const printed = Math.min(Math.max(eased / 0.82, 0), 1);
        clip.constant = yMin + (yMax - yMin) * printed + 0.0005;
        shade.emissiveIntensity = Math.max(0, (eased - 0.86) / 0.14) * 1.4;
        spin.rotation.y = reduce ? 0.6 : t * 0.00022 + eased * 1.4;
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(frame);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    start().catch(() => setFailed(true));
    return () => {
      disposed = true;
      cleanup();
    };
  }, [progress]);

  return (
    <div ref={hostRef} style={{ position: "absolute", inset: 0 }}>
      {failed && (
        <img
          src="/portfolio/torsa-02-aceso.webp"
          width={900}
          height={1125}
          alt="Abajur Torsa aceso"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
}
