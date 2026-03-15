import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const regions = [
  {
    id: "ile-de-france",
    name: "Île-de-France",
    fact: "Home to Paris, the City of Light",
    path: "M 230,180 L 260,165 L 280,175 L 285,200 L 270,215 L 245,210 Z",
    cx: 258,
    cy: 190,
  },
  {
    id: "provence",
    name: "Provence",
    fact: "Produces 80% of the world's lavender oil",
    path: "M 270,330 L 320,310 L 360,330 L 350,370 L 300,380 L 265,360 Z",
    cx: 310,
    cy: 348,
  },
  {
    id: "brittany",
    name: "Brittany",
    fact: "Over 2,700 km of dramatic coastline",
    path: "M 80,170 L 130,155 L 160,170 L 155,200 L 120,210 L 80,200 Z",
    cx: 120,
    cy: 183,
  },
  {
    id: "normandy",
    name: "Normandy",
    fact: "Site of the historic D-Day landings in 1944",
    path: "M 140,130 L 180,115 L 220,125 L 230,150 L 210,165 L 170,170 L 140,155 Z",
    cx: 185,
    cy: 145,
  },
  {
    id: "loire-valley",
    name: "Loire Valley",
    fact: "Home to over 300 Renaissance châteaux",
    path: "M 160,220 L 200,210 L 240,215 L 250,240 L 230,260 L 190,265 L 160,250 Z",
    cx: 205,
    cy: 238,
  },
  {
    id: "alsace",
    name: "Alsace",
    fact: "France's oldest wine route since 1953",
    path: "M 320,140 L 345,130 L 365,145 L 365,180 L 345,195 L 320,180 Z",
    cx: 343,
    cy: 162,
  },
];

const FranceMapSVG = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClick = (id: string) => {
    navigate(`/regions#${id}`);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        {regions.map((r) => (
          <button
            key={r.id}
            onClick={() => handleClick(r.id)}
            className="flex items-center gap-4 p-4 rounded-xl bg-background shadow-md hover:shadow-lg transition-all group text-left"
          >
            <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0" />
            <div>
              <p className="font-display text-lg font-bold group-hover:text-accent transition-colors">{r.name}</p>
              <p className="font-body text-xs text-muted-foreground">{r.fact}</p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative max-w-lg mx-auto">
      <svg viewBox="0 0 420 460" className="w-full h-auto">
        {/* France outline */}
        <path
          d="M 160,30 L 220,20 L 280,40 L 330,30 L 370,60 L 380,120 L 370,180 L 360,240 L 370,300 L 350,370 L 300,400 L 260,430 L 200,440 L 160,410 L 120,370 L 100,310 L 80,260 L 60,200 L 80,150 L 100,100 L 130,60 Z"
          fill="hsl(37, 45%, 93%)"
          stroke="hsl(220, 58%, 10%)"
          strokeWidth="2"
        />
        {/* Region shapes */}
        {regions.map((r) => (
          <g key={r.id}>
            <path
              d={r.path}
              fill={hovered === r.id ? "hsl(45, 52%, 54%)" : "hsl(45, 52%, 54%, 0.2)"}
              stroke="hsl(45, 52%, 54%)"
              strokeWidth="1.5"
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(r.id)}
            />
            <circle cx={r.cx} cy={r.cy} r="5" fill="hsl(45, 52%, 54%)" className="pointer-events-none" />
          </g>
        ))}
      </svg>
      {/* Tooltip */}
      {hovered && (() => {
        const r = regions.find((x) => x.id === hovered)!;
        return (
          <div
            className="absolute bg-primary text-primary-foreground rounded-lg shadow-xl px-4 py-3 pointer-events-none z-10 max-w-[200px]"
            style={{ left: r.cx * (100 / 420) + "%", top: r.cy * (100 / 460) + "%", transform: "translate(-50%, -120%)" }}
          >
            <p className="font-display text-sm font-bold text-french-gold">{r.name}</p>
            <p className="font-body text-xs text-cream/80">{r.fact}</p>
          </div>
        );
      })()}
    </div>
  );
};

export default FranceMapSVG;
