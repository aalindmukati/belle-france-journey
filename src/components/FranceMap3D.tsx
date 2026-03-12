// @ts-nocheck
import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

// ── Region shape outlines (simplified polygons) ──
const ILE_DE_FRANCE: [number, number][] = [
  [-0.1, 2.4], [0.3, 2.6], [0.8, 2.5], [1.1, 2.3], [1.0, 1.9],
  [0.7, 1.6], [0.2, 1.5], [-0.2, 1.7], [-0.1, 2.1], [-0.1, 2.4],
];

const PROVENCE: [number, number][] = [
  [0.8, -0.3], [1.4, -0.1], [2.0, -0.3], [2.6, -0.8], [2.4, -1.5],
  [1.8, -2.0], [1.2, -2.0], [0.8, -1.5], [0.6, -0.9], [0.8, -0.3],
];

const BRITTANY: [number, number][] = [
  [-2.2, 1.4], [-1.8, 1.8], [-1.4, 1.9], [-1.0, 1.7], [-1.0, 1.3],
  [-1.2, 0.9], [-1.6, 0.7], [-2.0, 0.8], [-2.3, 1.0], [-2.2, 1.4],
];

// Full France outline
const FRANCE_OUTLINE: [number, number][] = [
  [-1.2, 2.8], [-0.4, 3.1], [0.5, 3.2], [1.0, 3.1], [1.6, 3.3],
  [2.2, 3.2], [2.5, 2.6], [2.8, 2.2], [2.6, 1.6], [2.8, 1.0],
  [2.4, 0.5], [2.0, 0.0], [2.2, -0.5], [2.6, -1.0], [2.4, -1.5],
  [1.8, -2.0], [1.2, -2.4], [0.6, -2.2], [0.0, -2.4], [-0.4, -2.0],
  [-0.8, -1.4], [-1.4, -1.0], [-1.8, -0.4], [-2.0, 0.2], [-1.8, 0.8],
  [-2.2, 1.4], [-1.8, 1.8], [-1.6, 2.2], [-1.2, 2.8],
];

interface RegionData {
  name: string;
  frenchName: string;
  markerPos: [number, number, number];
  color: string;
  highlightColor: string;
  outline: [number, number][];
  description: string;
  capital: string;
  highlights: string[];
}

const REGIONS: RegionData[] = [
  {
    name: "Île-de-France",
    frenchName: "Île-de-France",
    markerPos: [0.5, 2.0, 0.55],
    color: "#c8102e",
    highlightColor: "#e63946",
    outline: ILE_DE_FRANCE,
    description: "The political, cultural, and economic heart of France. Home to Paris — the City of Light — with its world-class museums, iconic architecture, and vibrant café culture.",
    capital: "Paris",
    highlights: ["Eiffel Tower", "The Louvre", "Versailles"],
  },
  {
    name: "Provence",
    frenchName: "Provence-Alpes-Côte d'Azur",
    markerPos: [1.6, -1.0, 0.55],
    color: "#c9a84c",
    highlightColor: "#dbb94e",
    outline: PROVENCE,
    description: "Sun-drenched lavender fields, olive groves, and azure Mediterranean coastline. A region of extraordinary natural beauty that has inspired artists for centuries.",
    capital: "Marseille",
    highlights: ["Lavender Fields", "Calanques", "Palais des Papes"],
  },
  {
    name: "Brittany",
    frenchName: "Bretagne",
    markerPos: [-1.6, 1.3, 0.55],
    color: "#2563eb",
    highlightColor: "#3b82f6",
    outline: BRITTANY,
    description: "A rugged Celtic peninsula with dramatic coastlines, ancient standing stones, and a fiercely independent cultural identity. Famous for its crêpes and cider.",
    capital: "Rennes",
    highlights: ["Mont Saint-Michel", "Saint-Malo", "Carnac Stones"],
  },
];

// ── Helper: create extruded shape from points ──
function createShapeGeometry(points: [number, number][], depth: number, bevel = true) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1]);
  }
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel,
    bevelThickness: bevel ? 0.04 : 0,
    bevelSize: bevel ? 0.03 : 0,
    bevelSegments: 2,
  });
}

// ── Helper: create line from points ──
function createLine(points: [number, number][], z: number, color: string, opacity = 1) {
  const verts = points.map(([x, y]) => new THREE.Vector3(x, y, z));
  const geo = new THREE.BufferGeometry().setFromPoints(verts);
  const mat = new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity });
  return new THREE.Line(geo, mat);
}

// ── France base shape ──
const FranceBase = () => {
  const geometry = useMemo(() => createShapeGeometry(FRANCE_OUTLINE, 0.3, true), []);
  return (
    <mesh geometry={geometry} position={[0, 0, -0.15]} receiveShadow castShadow>
      <meshStandardMaterial color="#1e3a5f" roughness={0.5} metalness={0.15} />
    </mesh>
  );
};

// ── France country border ──
const FranceBorder = () => {
  const line = useMemo(() => createLine(FRANCE_OUTLINE, 0.2, "#c9a84c", 0.9), []);
  return <primitive object={line} />;
};

// ── Region shape (elevated, colored) ──
const RegionShape = ({
  region,
  isActive,
  isHovered,
}: {
  region: RegionData;
  isActive: boolean;
  isHovered: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geometry = useMemo(() => createShapeGeometry(region.outline, 0.15, false), [region.outline]);
  const borderLine = useMemo(
    () => createLine(region.outline, 0.35, isActive ? "#ffffff" : region.color, 1),
    [region, isActive]
  );

  useFrame(() => {
    if (meshRef.current) {
      const targetZ = isActive ? 0.1 : isHovered ? 0.05 : 0;
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial
          color={isActive ? region.highlightColor : region.color}
          roughness={0.4}
          metalness={0.2}
          emissive={region.color}
          emissiveIntensity={isActive ? 0.3 : isHovered ? 0.15 : 0.05}
        />
      </mesh>
      <primitive object={borderLine} />
    </group>
  );
};

// ── Interactive marker ──
const RegionMarkerPin = ({
  region,
  isActive,
  onClick,
  onHover,
  onUnhover,
}: {
  region: RegionData;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
  onUnhover: () => void;
}) => {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const [localHover, setLocalHover] = useState(false);

  useFrame((state) => {
    if (sphereRef.current) {
      const bob = Math.sin(state.clock.elapsedTime * 2.5 + REGIONS.indexOf(region) * 2) * 0.06;
      sphereRef.current.position.y = region.markerPos[1] + bob;
      const s = localHover || isActive ? 1.4 : 1;
      sphereRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    }
  });

  return (
    <group>
      {/* Pin connector line */}
      <mesh position={[region.markerPos[0], region.markerPos[1] - 0.05, region.markerPos[2] - 0.15]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 6]} />
        <meshStandardMaterial color={region.color} emissive={region.color} emissiveIntensity={0.2} />
      </mesh>

      {/* Sphere marker */}
      <mesh
        ref={sphereRef}
        position={region.markerPos}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerEnter={() => { setLocalHover(true); onHover(); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setLocalHover(false); onUnhover(); document.body.style.cursor = "auto"; }}
        castShadow
      >
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color={isActive ? "#ffffff" : region.highlightColor}
          emissive={region.color}
          emissiveIntensity={localHover || isActive ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Outer glow */}
      {(localHover || isActive) && (
        <mesh position={region.markerPos}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial color={region.color} transparent opacity={0.15} />
        </mesh>
      )}

      {/* Label */}
      <Html
        position={[region.markerPos[0], region.markerPos[1] + 0.35, region.markerPos[2] + 0.05]}
        center
        distanceFactor={7}
      >
        <div
          className="font-display text-[13px] font-bold whitespace-nowrap px-3 py-1 rounded-md cursor-pointer transition-all duration-200 select-none"
          style={{
            color: isActive ? "#0a1628" : "#f5f0e8",
            background: isActive ? region.highlightColor : "rgba(10,22,40,0.85)",
            border: `1px solid ${isActive ? region.highlightColor : "rgba(201,168,76,0.3)"}`,
            boxShadow: isActive ? `0 0 12px ${region.color}88` : "0 2px 8px rgba(0,0,0,0.4)",
          }}
          onClick={() => onClick()}
        >
          {region.name}
        </div>
      </Html>
    </group>
  );
};

// ── Ambient particles ──
const Particles = () => {
  const count = 40;
  const ref = useRef<THREE.InstancedMesh>(null!);
  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10, -1 - Math.random() * 3),
      speed: 0.1 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const d = new THREE.Object3D();
    data.forEach((p, i) => {
      d.position.set(
        p.pos.x + Math.sin(state.clock.elapsedTime * p.speed + p.offset) * 0.4,
        p.pos.y + Math.cos(state.clock.elapsedTime * p.speed * 0.5 + p.offset) * 0.3,
        p.pos.z
      );
      d.scale.setScalar(0.015 + Math.sin(state.clock.elapsedTime * 0.5 + p.offset) * 0.008);
      d.updateMatrix();
      ref.current.setMatrixAt(i, d.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c9a84c" transparent opacity={0.25} />
    </instancedMesh>
  );
};

// ── Scene ──
const Scene = ({
  activeRegion,
  setActiveRegion,
  hoveredRegion,
  setHoveredRegion,
}: {
  activeRegion: string | null;
  setActiveRegion: (name: string | null) => void;
  hoveredRegion: string | null;
  setHoveredRegion: (name: string | null) => void;
}) => (
  <>
    {/* Lighting — bright and warm */}
    <ambientLight intensity={0.6} />
    <directionalLight position={[4, 8, 6]} intensity={1.5} castShadow color="#fff5e6" />
    <directionalLight position={[-4, 5, 3]} intensity={0.4} color="#a0c4ff" />
    <pointLight position={[0, 0, 4]} intensity={0.6} color="#c9a84c" />

    {/* France base */}
    <FranceBase />
    <FranceBorder />

    {/* Region shapes */}
    {REGIONS.map((r) => (
      <RegionShape
        key={r.name}
        region={r}
        isActive={activeRegion === r.name}
        isHovered={hoveredRegion === r.name}
      />
    ))}

    {/* Markers */}
    {REGIONS.map((r) => (
      <RegionMarkerPin
        key={r.name + "-pin"}
        region={r}
        isActive={activeRegion === r.name}
        onClick={() => setActiveRegion(activeRegion === r.name ? null : r.name)}
        onHover={() => setHoveredRegion(r.name)}
        onUnhover={() => setHoveredRegion(null)}
      />
    ))}

    <Particles />

    {/* Floor */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]} receiveShadow>
      <planeGeometry args={[24, 24]} />
      <meshStandardMaterial color="#0c1829" roughness={0.95} />
    </mesh>

    <OrbitControls
      enablePan={false}
      enableZoom
      minDistance={5}
      maxDistance={11}
      minPolarAngle={Math.PI / 5}
      maxPolarAngle={Math.PI / 2.5}
      autoRotate
      autoRotateSpeed={0.25}
    />
  </>
);

// ── Info panel ──
const InfoPanel = ({
  region,
  onClose,
  onNavigate,
}: {
  region: RegionData;
  onClose: () => void;
  onNavigate: () => void;
}) => (
  <div
    className="absolute top-24 right-4 w-80 md:w-96 rounded-2xl p-6 shadow-2xl z-30 animate-fade-in-up"
    style={{
      background: "linear-gradient(145deg, rgba(10,22,40,0.97), rgba(20,40,70,0.95))",
      border: `1px solid ${region.color}44`,
      backdropFilter: "blur(12px)",
    }}
  >
    <button
      onClick={onClose}
      className="absolute top-3 right-4 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors"
      style={{ color: "#f5f0e8aa", background: "rgba(255,255,255,0.08)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
    >
      ✕
    </button>

    {/* Header */}
    <div className="flex items-center gap-3 mb-3">
      <div className="w-3 h-3 rounded-full" style={{ background: region.color, boxShadow: `0 0 8px ${region.color}` }} />
      <span className="font-body text-xs italic" style={{ color: region.highlightColor }}>{region.frenchName}</span>
    </div>

    <h3 className="font-display text-2xl font-bold mb-1" style={{ color: "#f5f0e8" }}>{region.name}</h3>
    <p className="font-body text-xs mb-4" style={{ color: "#c9a84c99" }}>Capital: {region.capital}</p>

    {/* Tricolor divider */}
    <div className="flex h-0.5 w-16 mb-4 rounded-full overflow-hidden">
      <span className="flex-1" style={{ background: "#0a1628" }} />
      <span className="flex-1" style={{ background: "#ffffff" }} />
      <span className="flex-1" style={{ background: "#c8102e" }} />
    </div>

    <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "#f5f0e8cc" }}>
      {region.description}
    </p>

    {/* Highlights */}
    <div className="flex flex-wrap gap-2 mb-5">
      {region.highlights.map((h) => (
        <span
          key={h}
          className="font-body text-xs px-2.5 py-1 rounded-full"
          style={{ background: `${region.color}22`, color: region.highlightColor, border: `1px solid ${region.color}44` }}
        >
          {h}
        </span>
      ))}
    </div>

    <button
      onClick={onNavigate}
      className="font-body text-sm px-4 py-2 rounded-lg transition-all duration-200"
      style={{
        background: region.color,
        color: "#f5f0e8",
        boxShadow: `0 4px 14px ${region.color}44`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      Explore this region →
    </button>
  </div>
);

// ── Main component ──
const FranceMap3D = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const navigate = useNavigate();

  const activeData = REGIONS.find((r) => r.name === activeRegion);

  const handleNavigate = useCallback(() => {
    navigate("/regions");
  }, [navigate]);

  return (
    <div className="relative w-full h-full">
      {/* Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 rounded-full px-5 py-2 pointer-events-none" style={{ background: "rgba(10,22,40,0.7)", border: "1px solid rgba(201,168,76,0.15)" }}>
        <p className="font-body text-xs text-center" style={{ color: "#f5f0e8aa" }}>
          🖱️ Drag to rotate • Scroll to zoom • Click markers to explore
        </p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1.5 rounded-lg px-3 py-2.5" style={{ background: "rgba(10,22,40,0.8)", border: "1px solid rgba(201,168,76,0.15)" }}>
        {REGIONS.map((r) => (
          <div key={r.name} className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveRegion(activeRegion === r.name ? null : r.name)}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
            <span className="font-body text-xs" style={{ color: activeRegion === r.name ? r.highlightColor : "#f5f0e8aa" }}>{r.name}</span>
          </div>
        ))}
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 42 }}
        style={{ background: "linear-gradient(180deg, #0f1f3a 0%, #162d50 40%, #0c1829 100%)" }}
      >
        <Scene
          activeRegion={activeRegion}
          setActiveRegion={setActiveRegion}
          hoveredRegion={hoveredRegion}
          setHoveredRegion={setHoveredRegion}
        />
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
