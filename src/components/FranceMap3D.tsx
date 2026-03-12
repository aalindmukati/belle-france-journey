import { useRef, useState, useMemo, useCallback, forwardRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

// France outline points (simplified) - scaled to 3D scene
const FRANCE_OUTLINE: [number, number][] = [
  [-1.2, 2.8], [-0.4, 3.1], [0.5, 3.2], [1.0, 3.1], [1.6, 3.3],
  [2.2, 3.2], [2.5, 2.6], [2.8, 2.2], [2.6, 1.6], [2.8, 1.0],
  [2.4, 0.5], [2.0, 0.0], [2.2, -0.5], [2.6, -1.0], [2.4, -1.5],
  [1.8, -2.0], [1.2, -2.4], [0.6, -2.2], [0.0, -2.4], [-0.4, -2.0],
  [-0.8, -1.4], [-1.4, -1.0], [-1.8, -0.4], [-2.0, 0.2], [-1.8, 0.8],
  [-2.2, 1.4], [-1.8, 1.8], [-1.6, 2.2], [-1.2, 2.8],
];

interface RegionMarker {
  name: string;
  frenchName: string;
  position: [number, number, number];
  color: string;
  description: string;
}

const REGIONS: RegionMarker[] = [
  {
    name: "Île-de-France",
    frenchName: "Île-de-France",
    position: [0.5, 1.8, 0.3],
    color: "#c8102e",
    description: "The cultural heart of France, home to Paris",
  },
  {
    name: "Provence",
    frenchName: "Provence",
    position: [1.6, -1.2, 0.3],
    color: "#c9a84c",
    description: "Sun-drenched lavender fields along the Mediterranean",
  },
  {
    name: "Brittany",
    frenchName: "Bretagne",
    position: [-2.0, 1.4, 0.3],
    color: "#1a3a6b",
    description: "A rugged Celtic peninsula with dramatic coastlines",
  },
];

// The 3D France landmass shape
const FranceShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(FRANCE_OUTLINE[0][0], FRANCE_OUTLINE[0][1]);
    for (let i = 1; i < FRANCE_OUTLINE.length; i++) {
      shape.lineTo(FRANCE_OUTLINE[i][0], FRANCE_OUTLINE[i][1]);
    }
    shape.closePath();

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelOffset: 0,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -0.2]} castShadow receiveShadow>
      <meshStandardMaterial
        color="#1a2a4a"
        roughness={0.35}
        metalness={0.2}
      />
    </mesh>
  );
};

// Outline edges using Line2 approach
const FranceOutline = () => {
  const ref = useRef<THREE.Line>(null!);

  const lineGeometry = useMemo(() => {
    const points = FRANCE_OUTLINE.map(([x, y]) => new THREE.Vector3(x, y, 0.25));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ color: "#c9a84c", transparent: true, opacity: 0.7 });
  }, []);

  return (
    <primitive object={new THREE.Line(lineGeometry, lineMaterial)} />
  );
};

// Interactive marker pin
const RegionPin = ({
  region,
  isActive,
  onClick,
}: {
  region: RegionMarker;
  isActive: boolean;
  onClick: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 2 + REGIONS.indexOf(region)) * 0.08;
      meshRef.current.position.y = region.position[1] + floatY;
      const scale = hovered || isActive ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group>
      {/* Pin body */}
      <mesh
        ref={meshRef}
        position={region.position}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        castShadow
      >
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={region.color}
          emissive={region.color}
          emissiveIntensity={hovered || isActive ? 0.6 : 0.2}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Pin stem */}
      <mesh position={[region.position[0], region.position[1] - 0.15, region.position[2] - 0.12]}>
        <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
        <meshStandardMaterial color={region.color} roughness={0.5} />
      </mesh>

      {/* Glow ring */}
      {(hovered || isActive) && (
        <mesh position={region.position}>
          <ringGeometry args={[0.22, 0.32, 32]} />
          <meshBasicMaterial color={region.color} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Pulse ring */}
      <PulseRing position={region.position} color={region.color} active={isActive} />

      {/* Label using Html from drei */}
      <Html
        position={[region.position[0], region.position[1] + 0.45, region.position[2] + 0.1]}
        center
        distanceFactor={8}
      >
        <div
          className="font-display text-sm font-bold text-cream whitespace-nowrap px-2 py-0.5 rounded bg-primary/70 backdrop-blur-sm cursor-pointer hover:bg-primary/90 transition-colors"
          onClick={() => onClick()}
        >
          {region.name}
        </div>
      </Html>
    </group>
  );
};

const PulseRing = ({ position, color, active }: { position: [number, number, number]; color: string; active: boolean }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const pulse = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2;
      ref.current.scale.setScalar(1 + pulse * 0.5);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = active ? (1 - pulse) * 0.4 : (1 - pulse) * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <ringGeometry args={[0.2, 0.25, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  );
};

// Grid floor
const GridFloor = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]} receiveShadow>
    <planeGeometry args={[20, 20]} />
    <meshStandardMaterial color="#0d1b30" roughness={0.9} />
  </mesh>
);

// Floating particles
const Particles = () => {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const positions = useMemo(() => {
    const arr: { pos: THREE.Vector3; speed: number; offset: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4 - 1
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.set(
        p.pos.x + Math.sin(state.clock.elapsedTime * p.speed + p.offset) * 0.3,
        p.pos.y + Math.cos(state.clock.elapsedTime * p.speed * 0.7 + p.offset) * 0.2,
        p.pos.z
      );
      dummy.scale.setScalar(0.02 + Math.sin(state.clock.elapsedTime + p.offset) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#c9a84c" transparent opacity={0.4} />
    </instancedMesh>
  );
};

// Scene content
const SceneContent = ({
  activeRegion,
  setActiveRegion,
}: {
  activeRegion: string | null;
  setActiveRegion: (name: string | null) => void;
}) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 3, 3]} intensity={0.5} color="#c9a84c" />
      <pointLight position={[3, -2, 2]} intensity={0.3} color="#4a7cc9" />

      <FranceShape />
      <FranceOutline />

      {REGIONS.map((region) => (
        <RegionPin
          key={region.name}
          region={region}
          isActive={activeRegion === region.name}
          onClick={() => setActiveRegion(activeRegion === region.name ? null : region.name)}
        />
      ))}

      <Particles />
      <GridFloor />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
};

// Info Panel overlay
const InfoPanel = ({ region, onClose, onNavigate }: { region: RegionMarker; onClose: () => void; onNavigate: () => void }) => (
  <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-96 bg-primary/95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-french-gold/20 animate-fade-in-up z-20">
    <button onClick={onClose} className="absolute top-3 right-4 text-cream/60 hover:text-cream text-lg">✕</button>
    <p className="french-word text-xs mb-1">{region.frenchName}</p>
    <h3 className="font-display text-2xl font-bold text-cream mb-2">{region.name}</h3>
    <div className="tricolor-divider mb-4 !max-w-[80px] !mx-0">
      <span /><span /><span />
    </div>
    <p className="font-body text-sm text-cream/80 leading-relaxed mb-4">{region.description}</p>
    <button
      onClick={onNavigate}
      className="font-body text-sm text-french-gold border-b border-french-gold hover:text-cream hover:border-cream transition-colors"
    >
      Explore this region →
    </button>
  </div>
);

const FranceMap3D = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const navigate = useNavigate();

  const activeData = REGIONS.find((r) => r.name === activeRegion);

  const handleNavigate = useCallback(() => {
    navigate("/regions");
  }, [navigate]);

  return (
    <div className="relative w-full h-full">
      {/* Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-primary/80 backdrop-blur-sm rounded-full px-5 py-2 pointer-events-none">
        <p className="font-body text-xs text-cream/70 text-center">
          Drag to rotate • Scroll to zoom • Click markers to explore
        </p>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 2, 7], fov: 45 }}
        style={{ background: "linear-gradient(180deg, #0a1628 0%, #132240 50%, #0d1b30 100%)" }}
      >
        <SceneContent activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      </Canvas>

      {activeData && (
        <InfoPanel
          region={activeData}
          onClose={() => setActiveRegion(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
};

export default FranceMap3D;
