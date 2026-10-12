"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type ScrollProgress = { current: number; invalidate: (() => void) | null };

type WorldStop = {
  camera: [number, number, number];
  look: [number, number, number];
  portal: [number, number, number];
  portalRotation: [number, number, number];
  portalScale: number;
  grid: number;
  timeline: number;
  frame: number;
  fov: number;
  roll?: number;
  settle?: number;
};

function updateSegments(edges: Array<[number, number]>, nodes: Array<{ world: THREE.Vector3 }>, geometry: THREE.BufferGeometry) {
  const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
  for (let index = 0; index < edges.length; index++) {
    const [from, to] = edges[index];
    const a = nodes[from].world, b = nodes[to].world;
    attribute.setXYZ(index * 2, a.x, a.y, a.z);
    attribute.setXYZ(index * 2 + 1, b.x, b.y, b.z);
  }
  attribute.needsUpdate = true;
}

// One waypoint per real chapter, including each individual project. The scroll
// driver maps DOM anchors to these stops instead of dividing the document evenly.
const stops: WorldStop[] = [
  { camera: [0, 0, 8.2], look: [0, 0, 1.5], portal: [1.6, 0, 4.2], portalRotation: [0, 0, 0], portalScale: 1, grid: 0, timeline: 0, frame: 0, fov: 42 },
  { camera: [-0.45, 0.12, 7], look: [-0.25, 0, 0.4], portal: [-1.55, 0.14, 2.8], portalRotation: [0.08, -0.2, 0.22], portalScale: 1.18, grid: 0.12, timeline: 0, frame: 0.28, fov: 41 },
  { camera: [0.28, 0.18, 5.8], look: [0.1, 0, -0.3], portal: [0, 0, 1.7], portalRotation: [0.16, 0.28, -0.1], portalScale: 0.9, grid: 1, timeline: 0, frame: 0.12, fov: 40, roll: 0.018 },
  { camera: [0, 0.02, 4.8], look: [0, 0, -1], portal: [0, 0, 0.5], portalRotation: [0.02, 0, 0], portalScale: 1.18, grid: 0.48, timeline: 0, frame: 0.72, fov: 39, roll: 0.045 },
  { camera: [-1.2, 0.04, 3.5], look: [-0.82, 0, -1.8], portal: [-0.85, 0.02, -0.25], portalRotation: [0, -0.12, -0.1], portalScale: 1.04, grid: 0.28, timeline: 0, frame: 1, fov: 35, roll: -0.035 },
  { camera: [0.04, 0.2, 2.35], look: [0.12, 0, -2.15], portal: [0.12, 0.08, -1.55], portalRotation: [0.1, 0.1, 0.06], portalScale: 0.92, grid: 0.2, timeline: 0, frame: 1, fov: 44, roll: 0.028 },
  { camera: [1.2, -0.08, 0.95], look: [0.82, 0, -2.7], portal: [1.05, 0, -2.9], portalRotation: [-0.08, 0.14, 0.16], portalScale: 1.08, grid: 0.35, timeline: 0, frame: 1, fov: 39, roll: -0.025 },
  { camera: [0.25, 0.08, -0.2], look: [0, 0, -3.1], portal: [0, 0, -4.1], portalRotation: [0, 0, 0], portalScale: 0.96, grid: 0.5, timeline: 1, frame: 0.58, fov: 39 },
  { camera: [-0.32, 0.12, -1.35], look: [-0.12, 0, -4.2], portal: [-0.45, 0.12, -5.1], portalRotation: [0.04, -0.08, -0.18], portalScale: 0.82, grid: 0.34, timeline: 0.52, frame: 0.82, fov: 40 },
  { camera: [0.3, 0.02, -2.5], look: [0.2, 0, -5.1], portal: [0.3, 0, -6.2], portalRotation: [0.02, 0.06, 0.08], portalScale: 0.76, grid: 0.56, timeline: 0.36, frame: 0.9, fov: 41 },
  { camera: [-0.35, 0.06, -3.55], look: [-0.15, 0, -6], portal: [-0.3, 0.04, -7.25], portalRotation: [0, -0.08, 0.12], portalScale: 0.86, grid: 0.72, timeline: 0.4, frame: 0.56, fov: 42, settle: 0.12 },
  { camera: [0.08, 0, -4.55], look: [0, 0, -6.7], portal: [0.15, 0, -8.05], portalRotation: [0, 0.02, -0.04], portalScale: 0.65, grid: 0.12, timeline: 0.08, frame: 0.24, fov: 43, settle: 0.62 },
  { camera: [0, 0.1, -6.15], look: [0, 0, -7.75], portal: [0, 0, -9.35], portalRotation: [0, 0, 0], portalScale: 0.5, grid: 0, timeline: 0, frame: 0.12, fov: 40, settle: 1 },
];

function sampleStop(progress: number) {
  const bounded = THREE.MathUtils.clamp(progress, 0, stops.length - 1);
  const index = Math.min(Math.floor(bounded), stops.length - 2);
  const local = bounded >= stops.length - 1 ? 1 : bounded - index;
  const eased = local * local * (3 - 2 * local);
  const from = stops[index];
  const to = stops[index + 1];
  const sample = (key: keyof WorldStop) => {
    const a = from[key], b = to[key];
    if (Array.isArray(a) && Array.isArray(b)) return a.map((value, axis) => THREE.MathUtils.lerp(value as number, b[axis] as number, eased));
    return THREE.MathUtils.lerp(a as number, b as number, eased);
  };
  return {
    camera: sample("camera") as number[], look: sample("look") as number[], portal: sample("portal") as number[],
    portalRotation: sample("portalRotation") as number[], portalScale: sample("portalScale") as number,
    grid: sample("grid") as number, timeline: sample("timeline") as number,
    frame: sample("frame") as number, fov: sample("fov") as number,
    roll: THREE.MathUtils.lerp(from.roll ?? 0, to.roll ?? 0, eased),
    settle: THREE.MathUtils.lerp(from.settle ?? 0, to.settle ?? 0, eased),
  };
}

function createSegmentGeometry(segmentCount: number) {
  const geometry = new THREE.BufferGeometry();
  const positions = new THREE.BufferAttribute(new Float32Array(segmentCount * 2 * 3), 3);
  positions.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", positions);
  return geometry;
}

function CameraRig({ progress, reducedMotion }: { progress: ScrollProgress; reducedMotion: boolean }) {
  const { camera, invalidate } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  useEffect(() => {
    progress.invalidate = invalidate;
    invalidate();
    return () => { if (progress.invalidate === invalidate) progress.invalidate = null; };
  }, [invalidate, progress]);
  useFrame(() => {
    const state = sampleStop(reducedMotion ? 0 : progress.current);
    camera.position.set(state.camera[0], state.camera[1], state.camera[2]);
    lookTarget.current.set(state.look[0], state.look[1], state.look[2]);
    camera.lookAt(lookTarget.current);
    camera.rotation.z = reducedMotion ? 0 : state.roll;
    if (camera instanceof THREE.PerspectiveCamera && camera.fov !== state.fov) {
      camera.fov = state.fov;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

function StoryGeometry({ progress, reducedMotion, mobile }: { progress: ScrollProgress; reducedMotion: boolean; mobile: boolean }) {
  const portal = useRef<THREE.Group>(null);
  const frame = useRef<THREE.Group>(null);
  const frameLayers = useRef<Array<THREE.Mesh | null>>([]);
  const cloud = useRef<THREE.InstancedMesh>(null);
  const orbitOuter = useRef<THREE.Mesh>(null);
  const orbitInner = useRef<THREE.Mesh>(null);
  const portalMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const frameMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const gridMaterial = useRef<THREE.LineBasicMaterial>(null);
  const railMaterial = useRef<THREE.LineBasicMaterial>(null);
  const nodeMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#e0b363", transparent: true, opacity: 0.25, depthWrite: false }), []);
  const count = mobile ? 24 : 40;
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.035, 5, 4), []);
  const gridEdges = useMemo(() => {
    const edges: Array<[number, number]> = [];
    for (let index = 0; index < count; index++) {
      if (index % 8 < 7 && index + 1 < count) edges.push([index, index + 1]);
      if (index + 8 < count) edges.push([index, index + 8]);
    }
    return edges;
  }, [count]);
  const railEdges = useMemo(() => Array.from({ length: count - 2 }, (_, index) => [index, index + 2] as [number, number]), [count]);
  const gridGeometry = useMemo(() => createSegmentGeometry(gridEdges.length), [gridEdges]);
  const railGeometry = useMemo(() => createSegmentGeometry(railEdges.length), [railEdges]);
  useEffect(() => () => { gridGeometry.dispose(); railGeometry.dispose(); }, [gridGeometry, railGeometry]);
  const layouts = useMemo(() => Array.from({ length: count }, (_, index) => {
    const seed = index * 2.399963;
    const col = index % 8;
    const row = Math.floor(index / 8);
    const spacing = mobile ? 0.48 : 0.55;
    const railSpacing = mobile ? 0.095 : 0.07;
    return {
      scatter: new THREE.Vector3(Math.cos(seed) * (0.35 + (index % 5) * 0.18), Math.sin(seed) * (0.28 + (index % 4) * 0.16), Math.sin(seed * 0.7) * 0.9),
      grid: new THREE.Vector3((col - 3.5) * spacing, (row - (Math.ceil(count / 8) - 1) / 2) * spacing, 0),
      rail: new THREE.Vector3(index % 2 === 0 ? -0.58 : 0.58, (index - (count - 1) / 2) * railSpacing, 0),
      structured: new THREE.Vector3(),
      current: new THREE.Vector3(),
      world: new THREE.Vector3(),
    };
  }), [count, mobile]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const state = sampleStop(reducedMotion ? 0 : progress.current);
    if (portal.current) {
      portal.current.position.set(state.portal[0], state.portal[1], state.portal[2]);
      portal.current.rotation.set(state.portalRotation[0], state.portalRotation[1], state.portalRotation[2]);
      portal.current.scale.setScalar(state.portalScale);
    }
    const presence = 1 - state.settle * 0.78;
    if (portalMaterial.current) portalMaterial.current.opacity = (0.2 + state.frame * 0.3 + state.timeline * 0.12) * presence;
    if (orbitOuter.current) orbitOuter.current.rotation.z = reducedMotion ? 0 : state.portalRotation[2] * 0.6;
    if (orbitInner.current) orbitInner.current.rotation.y = reducedMotion ? 0 : state.portalRotation[1] * 0.8;

    if (frame.current) {
      frame.current.position.set(state.portal[0] * -0.8, state.portal[1], state.portal[2] - 0.45);
      frame.current.rotation.set(state.portalRotation[0] * 0.4, state.portalRotation[1] * -0.55, state.portalRotation[2] * -0.6);
      const size = THREE.MathUtils.lerp(0.3, 1, state.frame);
      frame.current.scale.set(1.6 * size, 0.92 * size, size);
    }
    const fold = THREE.MathUtils.clamp(state.grid * 0.82 + state.timeline * 0.42, 0, 1);
    frameLayers.current.forEach((layer, index) => {
      if (!layer) return;
      const side = index % 2 === 0 ? -1 : 1;
      const vertical = index < 2 ? -1 : 1;
      const layerScale = 1 + index * 0.16;
      layer.position.set(side * fold * (0.12 + index * 0.1), vertical * fold * 0.08, -index * 1.15);
      layer.rotation.set(
        state.portalRotation[0] * 0.35 + vertical * fold * 0.24,
        state.portalRotation[1] * -0.45 + side * fold * 0.78,
        state.portalRotation[2] * -0.4 + side * state.timeline * 0.12,
      );
      layer.scale.set(layerScale * (1 + fold * 0.12), layerScale * (1 - fold * 0.12), 1);
    });
    if (frameMaterial.current) frameMaterial.current.opacity = state.frame * 0.36 * presence;

    if (cloud.current) {
      const grid = state.grid;
      const timeline = state.timeline;
      for (let index = 0; index < count; index++) {
        const layout = layouts[index];
        const structured = layout.structured.copy(layout.grid).lerp(layout.rail, timeline);
        const position = layout.current.copy(layout.scatter).lerp(structured, grid);
        layout.world.set(state.portal[0] + position.x, state.portal[1] + position.y, state.portal[2] - 0.55 + position.z * (1 - grid));
        dummy.position.copy(layout.world);
        const scale = (0.45 + grid * 0.55) * (1 + grid * 0.45) * (1 - timeline * 0.28);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        cloud.current.setMatrixAt(index, dummy.matrix);
      }
      cloud.current.instanceMatrix.needsUpdate = true;
    }
    updateSegments(gridEdges, layouts, gridGeometry);
    updateSegments(railEdges, layouts, railGeometry);
    if (gridMaterial.current) gridMaterial.current.opacity = state.grid * (1 - state.timeline * 0.82) * 0.38 * presence;
    if (railMaterial.current) railMaterial.current.opacity = state.timeline * 0.42 * presence;
    nodeMaterial.opacity = (0.16 + state.grid * 0.48 + state.timeline * 0.14) * (reducedMotion ? 0.55 : 1) * presence;
  });

  return <>
    <group ref={portal}>
      <mesh ref={orbitOuter}>
        <torusGeometry args={[1.3, 0.012, 5, mobile ? 32 : 56]} />
        <meshBasicMaterial ref={portalMaterial} color="#c99445" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh ref={orbitInner} rotation={[0.5, 0.1, 0.4]}>
        <torusGeometry args={[0.93, 0.008, 4, mobile ? 28 : 48]} />
        <meshBasicMaterial color="#eeeae1" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh rotation={[0.18, 0.34, 0.1]}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshBasicMaterial color="#c99445" wireframe transparent opacity={0.23} depthWrite={false} />
      </mesh>
      <mesh rotation={[0.18, 0.34, 0.1]}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial color="#eeeae1" wireframe transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>

    <group ref={frame}>
      {(mobile ? [0, 1] : [0, 1, 2, 3]).map((layer) => <mesh key={layer} ref={(node) => { frameLayers.current[layer] = node; }} position={[0, 0, -layer * 1.15]} scale={1 + layer * 0.16}>
        <boxGeometry args={[2.8, 1.6, 0.035]} />
        <meshBasicMaterial ref={layer === 0 ? frameMaterial : undefined} color={layer % 2 === 0 ? "#c99445" : "#eeeae1"} wireframe transparent opacity={layer === 0 ? 0.12 : 0.12 / (layer + 1)} depthWrite={false} />
      </mesh>)}
      <Line points={[[-1.8, -1.15, 0], [1.8, -1.15, 0]]} color="#eeeae1" transparent opacity={0.12} lineWidth={0.6} />
      <Line points={[[-1.8, 1.15, 0], [1.8, 1.15, 0]]} color="#eeeae1" transparent opacity={0.12} lineWidth={0.6} />
      {!mobile && <>
        <Line points={[[-1.8, -1.15, 0], [-2.66, -1.7, -3.45]]} color="#c99445" transparent opacity={0.12} lineWidth={0.5} />
        <Line points={[[1.8, -1.15, 0], [2.66, -1.7, -3.45]]} color="#c99445" transparent opacity={0.12} lineWidth={0.5} />
        <Line points={[[-1.8, 1.15, 0], [-2.66, 1.7, -3.45]]} color="#eeeae1" transparent opacity={0.08} lineWidth={0.5} />
        <Line points={[[1.8, 1.15, 0], [2.66, 1.7, -3.45]]} color="#eeeae1" transparent opacity={0.08} lineWidth={0.5} />
      </>}
    </group>

    <instancedMesh ref={cloud} args={[nodeGeometry, nodeMaterial, count]} />
    <lineSegments geometry={gridGeometry} frustumCulled={false}>
      <lineBasicMaterial ref={gridMaterial} color="#c99445" transparent opacity={0} depthWrite={false} />
    </lineSegments>
    <lineSegments geometry={railGeometry} frustumCulled={false}>
      <lineBasicMaterial ref={railMaterial} color="#e0b363" transparent opacity={0} depthWrite={false} />
    </lineSegments>

    <Line points={[[-5.5, -2.05, -6], [5.5, -2.05, -6]]} color="#c99445" transparent opacity={0.12} lineWidth={0.5} />
    {!mobile && <>
      <Line points={[[-5.5, -1.05, -6], [5.5, -1.05, -6]]} color="#eeeae1" transparent opacity={0.055} lineWidth={0.5} />
      <Line points={[[-5.5, 0, -6], [5.5, 0, -6]]} color="#eeeae1" transparent opacity={0.055} lineWidth={0.5} />
      <Line points={[[-5.5, 1.05, -6], [5.5, 1.05, -6]]} color="#eeeae1" transparent opacity={0.055} lineWidth={0.5} />
    </>}
  </>;
}

export function CinematicWorld({ progress }: { progress: ScrollProgress }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 720px)");
    const update = () => { setReducedMotion(motion.matches); setMobile(compact.matches); progress.invalidate?.(); };
    update();
    motion.addEventListener("change", update);
    compact.addEventListener("change", update);
    return () => { motion.removeEventListener("change", update); compact.removeEventListener("change", update); };
  }, []);
  return <div className="cinematic-world" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 8.2], fov: 42 }} dpr={mobile ? 1 : [1, 1.25]} frameloop="demand" fallback={null} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}>
      <CameraRig progress={progress} reducedMotion={reducedMotion} />
      <StoryGeometry progress={progress} reducedMotion={reducedMotion} mobile={mobile} />
    </Canvas>
  </div>;
}
