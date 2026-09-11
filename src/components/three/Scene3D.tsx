"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

// R3F camera control is standard per-frame mutation — disable strict hook rules
// R3F camera control — per-frame mutation is the standard pattern
function ScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = total > 0 ? window.scrollY / total : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    targetRef.current += (scrollRef.current - targetRef.current) * 0.05;
    const y = targetRef.current * 6;
    camera.position.y = -y;
    camera.lookAt(0, -y, 0);
  });

  return null;
}

function FloatingShape({
  position,
  speed,
  geometry,
  color,
  wireframe = true,
  opacity = 0.12,
  scrollFactor = 0,
}: {
  position: [number, number, number];
  speed: number;
  geometry: "icosahedron" | "octahedron" | "torus" | "dodecahedron" | "tetrahedron";
  color: string;
  wireframe?: boolean;
  opacity?: number;
  scrollFactor?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const scrollRef = useRef(0);
  const targetScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = total > 0 ? window.scrollY / total : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    targetScroll.current += (scrollRef.current - targetScroll.current) * 0.04;
    const t = state.clock.elapsedTime * speed;
    const sy = targetScroll.current * scrollFactor;
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.y = t * 0.35;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.5 - sy;
    ref.current.position.x = position[0] + Math.cos(t * 0.35) * 0.3;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "icosahedron": return new THREE.IcosahedronGeometry(1.2, 0);
      case "octahedron": return new THREE.OctahedronGeometry(1.2, 0);
      case "torus": return new THREE.TorusGeometry(1, 0.35, 16, 32);
      case "dodecahedron": return new THREE.DodecahedronGeometry(1.2, 0);
      case "tetrahedron": return new THREE.TetrahedronGeometry(1.2, 0);
    }
  }, [geometry]);

  return (
    <mesh ref={ref} position={position} geometry={geo}>
      <meshBasicMaterial color={color} wireframe={wireframe} transparent opacity={opacity} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const scrollRef = useRef(0);
  const targetScroll = useRef(0);
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3) - 0.5) * 35;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 60;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 25 - 5;
    }
    return pos;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = total > 0 ? window.scrollY / total : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    targetScroll.current += (scrollRef.current - targetScroll.current) * 0.03;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015 + targetScroll.current * 0.5;
    ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    ref.current.position.y = -targetScroll.current * 8;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#c87941" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function WaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollRef = useRef(0);
  const targetScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = total > 0 ? window.scrollY / total : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    targetScroll.current += (scrollRef.current - targetScroll.current) * 0.04;
    const geo = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 0.5 + t * 0.6) * 0.25 + Math.cos(y * 0.5 + t * 0.4) * 0.25);
    }
    pos.needsUpdate = true;
    meshRef.current.position.y = -3.5 - targetScroll.current * 4;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3.5, -7]}>
      <planeGeometry args={[22, 16, 35, 35]} />
      <meshBasicMaterial color="#c87941" wireframe transparent opacity={0.055} />
    </mesh>
  );
}

function FloatingRings() {
  const group = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);
  const targetScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = total > 0 ? window.scrollY / total : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    targetScroll.current += (scrollRef.current - targetScroll.current) * 0.04;
    const t = state.clock.elapsedTime;
    group.current.rotation.x = t * 0.08;
    group.current.rotation.z = t * 0.05;
    group.current.position.y = -targetScroll.current * 5;
  });

  return (
    <group ref={group}>
      <mesh position={[-3, 0, -6]}>
        <torusGeometry args={[2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#c87941" transparent opacity={0.08} />
      </mesh>
      <mesh position={[3, 1, -8]} rotation={[0.5, 0.3, 0]}>
        <torusGeometry args={[2.5, 0.012, 16, 100]} />
        <meshBasicMaterial color="#e0935c" transparent opacity={0.06} />
      </mesh>
      <mesh position={[0, -1.5, -5]} rotation={[1.2, 0, 0.5]}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#a85e2b" transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ScrollCamera />
      <FloatingShape position={[-4, 1.5, -5]} speed={0.3} geometry="icosahedron" color="#c87941" opacity={0.08} scrollFactor={3} />
      <FloatingShape position={[4, -1, -6]} speed={0.25} geometry="octahedron" color="#e0935c" opacity={0.07} scrollFactor={5} />
      <FloatingShape position={[0, 2.5, -7]} speed={0.2} geometry="torus" color="#c87941" opacity={0.06} scrollFactor={4} />
      <FloatingShape position={[-2.5, -2, -4]} speed={0.35} geometry="dodecahedron" color="#a85e2b" opacity={0.07} scrollFactor={6} />
      <FloatingShape position={[2.5, 1, -8]} speed={0.15} geometry="tetrahedron" color="#e0935c" opacity={0.06} scrollFactor={2} />
      <FloatingRings />
      <Particles />
      <WaveGrid />
    </Canvas>
  );
}