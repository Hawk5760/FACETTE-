import { useState, useEffect, useRef, useCallback } from "react";
import {
  GLOBAL_HUBS,
  TRADE_ARCS,
  REGIONS,
  REAL_LAND_PATH,
  REAL_BORDERS_PATH,
  REAL_GRATICULE_PATH,
  REAL_EQUATOR_PATH,
  REAL_TROPICS_PATHS,
  WORLD_VIEWBOX,
  type LocationHub,
} from "@/data/worldMapData";

interface ViewBoxRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function InteractiveWorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Active / selected hub
  const [activeHubId, setActiveHubId] = useState<string | null>(null);
  const [hoveredHubId, setHoveredHubId] = useState<string | null>(null);

  // Active region filter
  const [activeRegion, setActiveRegion] = useState<string>("global");

  // Camera viewBox state with smooth interpolation
  const [currentViewBox, setCurrentViewBox] = useState<ViewBoxRect>({
    x: 0,
    y: 0,
    width: WORLD_VIEWBOX.width,
    height: WORLD_VIEWBOX.height,
  });

  const targetViewBoxRef = useRef<ViewBoxRect>({
    x: 0,
    y: 0,
    width: WORLD_VIEWBOX.width,
    height: WORLD_VIEWBOX.height,
  });

  const animFrameRef = useRef<number | null>(null);

  // Scroll illumination progress (0.0 to 1.0)
  const [scrollProgress, setScrollProgress] = useState<number>(0.15);

  // Mouse drag panning state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Live coordinates display
  const [liveCoords, setLiveCoords] = useState<{ lat: string; lon: string } | null>(null);

  // Selected hub object
  const activeHub = GLOBAL_HUBS.find((h) => h.id === (hoveredHubId || activeHubId));

  // Determine if a hub is illuminated based on scroll progress or user interaction
  const isHubIlluminated = useCallback(
    (hub: LocationHub, index: number) => {
      if (activeHubId === hub.id || hoveredHubId === hub.id) return true;
      if (activeRegion !== "global" && hub.region === activeRegion) return true;

      // Sequential scroll-based illumination across geographic waves:
      // Wave 1: South Asia origins (Surat, Jaipur)
      // Wave 2: Middle East & European ateliers (Dubai, Riyadh, Antwerp, Paris, Milan, Geneva, Brussels, London)
      // Wave 3: Global Americas & East Asia flagships (New York, Los Angeles, Hong Kong, Tokyo, Singapore)
      const thresholds: Record<string, number> = {
        surat: 0.12,
        jaipur: 0.16,
        dubai: 0.24,
        riyadh: 0.28,
        antwerp: 0.36,
        paris: 0.42,
        milan: 0.46,
        geneva: 0.50,
        brussels: 0.54,
        london: 0.58,
        "new-york": 0.65,
        "los-angeles": 0.70,
        "hong-kong": 0.76,
        tokyo: 0.82,
        singapore: 0.88,
      };

      const threshold = thresholds[hub.id] ?? (index / GLOBAL_HUBS.length) * 0.8;
      return scrollProgress >= threshold;
    },
    [activeHubId, hoveredHubId, activeRegion, scrollProgress]
  );

  // Track scroll position of the section to subtly illuminate markers
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start when top enters 85% of screen, complete when top is 15% of screen
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.15;
      const total = start - end;
      const current = start - rect.top;

      const progress = Math.max(0.1, Math.min(1.0, current / total));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth camera animation frame loop
  const animateCameraTo = useCallback((target: ViewBoxRect) => {
    targetViewBoxRef.current = target;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startTime = performance.now();
    const duration = 750; // ms smooth glide
    const startBox = { ...currentViewBox };

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Editorial cubic-bezier easeOut
      const ease = 1 - Math.pow(1 - t, 3);

      const nextBox: ViewBoxRect = {
        x: startBox.x + (target.x - startBox.x) * ease,
        y: startBox.y + (target.y - startBox.y) * ease,
        width: startBox.width + (target.width - startBox.width) * ease,
        height: startBox.height + (target.height - startBox.height) * ease,
      };

      setCurrentViewBox(nextBox);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [currentViewBox]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Switch region focus
  const handleSelectRegion = (regionKey: string) => {
    setActiveRegion(regionKey);
    setActiveHubId(null);

    const regionData = REGIONS[regionKey];
    if (regionData) {
      animateCameraTo(regionData.viewBox);
    }
  };

  // Focus directly on a hub
  const handleFocusHub = (hub: LocationHub) => {
    setActiveHubId(hub.id);
    const boxWidth = 200;
    const boxHeight = 130;
    const target: ViewBoxRect = {
      x: Math.max(0, Math.min(WORLD_VIEWBOX.width - boxWidth, hub.x - boxWidth / 2)),
      y: Math.max(0, Math.min(WORLD_VIEWBOX.height - boxHeight, hub.y - boxHeight / 2)),
      width: boxWidth,
      height: boxHeight,
    };
    animateCameraTo(target);
  };

  // Reset to global view
  const handleResetView = () => {
    setActiveRegion("global");
    setActiveHubId(null);
    const globalView = REGIONS["global"]?.viewBox ?? {
      x: 0,
      y: 0,
      width: WORLD_VIEWBOX.width,
      height: WORLD_VIEWBOX.height,
    };
    animateCameraTo(globalView);
  };

  // Zoom controls (+ / -)
  const handleZoom = (factor: number) => {
    const cx = currentViewBox.x + currentViewBox.width / 2;
    const cy = currentViewBox.y + currentViewBox.height / 2;
    const newWidth = Math.max(120, Math.min(WORLD_VIEWBOX.width, currentViewBox.width * factor));
    const newHeight = (newWidth / WORLD_VIEWBOX.width) * WORLD_VIEWBOX.height;

    const target: ViewBoxRect = {
      x: Math.max(0, Math.min(WORLD_VIEWBOX.width - newWidth, cx - newWidth / 2)),
      y: Math.max(0, Math.min(WORLD_VIEWBOX.height - newHeight, cy - newHeight / 2)),
      width: newWidth,
      height: newHeight,
    };
    animateCameraTo(target);
  };

  // Mouse pan drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with primary mouse button
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Live coordinates estimation from SVG viewBox
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      const svgX = currentViewBox.x + relX * currentViewBox.width;
      const svgY = currentViewBox.y + relY * currentViewBox.height;

      // Inverse Natural Earth approximation for telemetry readout
      const lon = ((svgX - 500) / 470) * 180;
      const lat = ((250 - svgY) / 240) * 85;

      const latDir = lat >= 0 ? "N" : "S";
      const lonDir = lon >= 0 ? "E" : "W";

      const latDeg = Math.abs(Math.round(lat));
      const latMin = Math.abs(Math.round((lat % 1) * 60));
      const lonDeg = Math.abs(Math.round(lon));
      const lonMin = Math.abs(Math.round((lon % 1) * 60));

      setLiveCoords({
        lat: `${latDeg}°${latMin.toString().padStart(2, "0")}'${latDir}`,
        lon: `${lonDeg}°${lonMin.toString().padStart(2, "0")}'${lonDir}`,
      });
    }

    if (!isDraggingRef.current || !svgRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    const svgRect = svgRef.current.getBoundingClientRect();
    const scaleX = currentViewBox.width / svgRect.width;
    const scaleY = currentViewBox.height / svgRect.height;

    setCurrentViewBox((prev) => {
      const newX = Math.max(0, Math.min(WORLD_VIEWBOX.width - prev.width, prev.x - dx * scaleX));
      const newY = Math.max(0, Math.min(WORLD_VIEWBOX.height - prev.height, prev.y - dy * scaleY));
      targetViewBoxRef.current = { ...prev, x: newX, y: newY };
      return { ...prev, x: newX, y: newY };
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Formatted viewBox string
  const viewBoxString = `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.width} ${currentViewBox.height}`;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-sm border hairline border-gold/30 bg-[#06080c] overflow-hidden select-none shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
      aria-label="Interactive world map showing Facette & Co. global craftsmanship network"
    >
      {/* 1. EDITORIAL HEADER BAR */}
      <div className="relative z-20 px-5 sm:px-8 py-4 sm:py-5 border-b hairline border-gold/20 bg-[#080b11]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        {/* Left: Cartographic Title & Datum */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-gold/90 animate-pulse" />
          <div>
            <h3 className="font-serif text-lg sm:text-xl text-ivory tracking-wide leading-none">
              FACETTE &amp; CO. — GLOBAL ATELIER MAP
            </h3>
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold/70 mt-1">
              PROJECTION: NATURAL EARTH I · WGS84 REAL DATUM · 15 NODES
            </p>
          </div>
        </div>

        {/* Right: Regional Camera Presets */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-[9px] uppercase tracking-[0.26em] text-muted-foreground mr-1 hidden md:inline">
            CAMERA VIEW:
          </span>
          {Object.entries(REGIONS).map(([key, reg]) => {
            const isSelected = activeRegion === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectRegion(key)}
                className={`text-[10px] uppercase tracking-[0.22em] px-2.5 py-1.5 rounded transition-all duration-300 border ${
                  isSelected
                    ? "bg-gold/15 text-gold border-gold/50 shadow-[0_0_12px_rgba(213,181,129,0.2)]"
                    : "text-ivory/60 border-transparent hover:text-ivory hover:border-gold/20"
                }`}
              >
                {reg.label.replace(" Network", "").replace(" Ateliers", "").replace(" Hubs", "").replace(" & Markets", "")}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN MAP CANVAS */}
      <div
        className={`relative w-full aspect-[2/1] min-h-[380px] sm:min-h-[480px] md:min-h-[580px] lg:min-h-[660px] cursor-grab ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setHoveredHubId(null);
          setLiveCoords(null);
        }}
      >
        {/* Ambient atmospheric backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,_rgba(213,181,129,0.06)_0%,_transparent_75%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(14,61,61,0.08)_0%,_transparent_50%)] pointer-events-none" />

        {/* Corner architectural registration brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold/40 pointer-events-none z-10" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold/40 pointer-events-none z-10" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold/40 pointer-events-none z-10" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold/40 pointer-events-none z-10" />

        {/* Real Vector SVG Map */}
        <svg
          ref={svgRef}
          viewBox={viewBoxString}
          className="w-full h-full object-cover transition-none"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Real world vector map"
        >
          <defs>
            {/* Dark gold land gradient */}
            <radialGradient id="darkGoldLand" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#181c25" />
              <stop offset="45%" stopColor="#141720" />
              <stop offset="85%" stopColor="#0f1118" />
              <stop offset="100%" stopColor="#0b0d13" />
            </radialGradient>

            {/* Subtle warm gold land metallic sheen */}
            <linearGradient id="goldLandSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d5b581" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#d5b581" stopOpacity="0.05" />
            </linearGradient>

            {/* Golden glow filter for nodes */}
            <filter id="luminousGold" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Intense active node glow */}
            <filter id="intenseActiveGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="6" result="blurBig" />
              <feGaussianBlur stdDeviation="2" result="blurSmall" />
              <feMerge>
                <feMergeNode in="blurBig" />
                <feMergeNode in="blurSmall" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LAYER 1: Cartographic Graticules & Reference Lat/Lon Grid */}
          <g opacity={0.65}>
            <path
              d={REAL_GRATICULE_PATH}
              fill="none"
              stroke="#d5b581"
              strokeWidth="0.4"
              strokeOpacity="0.08"
              strokeDasharray="2 3"
            />
            {/* Equator (0° Latitude) */}
            <path
              d={REAL_EQUATOR_PATH}
              fill="none"
              stroke="#d5b581"
              strokeWidth="0.65"
              strokeOpacity="0.18"
              strokeDasharray="4 4"
            />
            {/* Tropic of Cancer (23.4° N) */}
            <path
              d={REAL_TROPICS_PATHS.cancer}
              fill="none"
              stroke="#d5b581"
              strokeWidth="0.45"
              strokeOpacity="0.12"
              strokeDasharray="3 4"
            />
            {/* Tropic of Capricorn (23.4° S) */}
            <path
              d={REAL_TROPICS_PATHS.capricorn}
              fill="none"
              stroke="#d5b581"
              strokeWidth="0.45"
              strokeOpacity="0.12"
              strokeDasharray="3 4"
            />
            {/* Prime Meridian (0° Longitude) */}
            <path
              d={REAL_TROPICS_PATHS.primeMeridian}
              fill="none"
              stroke="#d5b581"
              strokeWidth="0.45"
              strokeOpacity="0.12"
              strokeDasharray="3 4"
            />
          </g>

          {/* LAYER 2: Real Continental Landmasses (Subtle dark-gold) */}
          <g>
            {/* Land base fill */}
            <path
              d={REAL_LAND_PATH}
              fill="url(#darkGoldLand)"
              stroke="#d5b581"
              strokeWidth="0.75"
              strokeOpacity="0.38"
            />
            {/* Subtle metallic gold parchment sheen overlay */}
            <path
              d={REAL_LAND_PATH}
              fill="url(#goldLandSheen)"
              pointerEvents="none"
            />
            {/* Fine gold interior national borders */}
            <path
              d={REAL_BORDERS_PATH}
              fill="none"
              stroke="#d5b581"
              strokeWidth="0.45"
              strokeOpacity="0.22"
              strokeDasharray="1 1.5"
            />
          </g>

          {/* LAYER 3: Spherical Great-Circle Trade & Sourcing Arcs */}
          <g className="trade-arcs">
            {TRADE_ARCS.map((arc) => {
              const isSourceActive =
                activeHubId === arc.sourceId || hoveredHubId === arc.sourceId;
              const isTargetActive =
                activeHubId === arc.targetId || hoveredHubId === arc.targetId;
              const isConnectedToActive = isSourceActive || isTargetActive;
              const isAnyActive = Boolean(activeHubId || hoveredHubId);

              // Restrained editorial arc styling
              let strokeOpacity = 0.16;
              let strokeWidth = 0.75;
              let strokeColor = "#d5b581";

              if (isConnectedToActive) {
                strokeOpacity = 0.85;
                strokeWidth = 1.6;
                strokeColor = "#ffffff";
              } else if (isAnyActive) {
                strokeOpacity = 0.05;
              }

              return (
                <g key={arc.id}>
                  {/* Base arc */}
                  <path
                    d={arc.path}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={strokeOpacity}
                    strokeDasharray={isConnectedToActive ? "none" : "2 3"}
                    className="transition-all duration-500"
                  />
                  {/* Illuminated pulse particle on active connections */}
                  {isConnectedToActive && (
                    <path
                      d={arc.path}
                      fill="none"
                      stroke="#d5b581"
                      strokeWidth={2}
                      strokeOpacity={0.9}
                      strokeDasharray="4 24"
                      className="animate-[dash_8s_linear_infinite]"
                      filter="url(#luminousGold)"
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* LAYER 4: Glowing Gold Location Markers */}
          <g className="location-markers">
            {GLOBAL_HUBS.map((hub, index) => {
              const isSelected = activeHubId === hub.id;
              const isHovered = hoveredHubId === hub.id;
              const isActive = isSelected || isHovered;
              const illuminated = isHubIlluminated(hub, index);

              // Staggered breathing delay
              const delaySec = (index * 0.45) % 3.5;

              return (
                <g
                  key={hub.id}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredHubId(hub.id)}
                  onMouseLeave={() => setHoveredHubId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFocusHub(hub);
                  }}
                >
                  {/* Hit target for effortless hovering */}
                  <circle cx={hub.x} cy={hub.y} r={16} fill="transparent" />

                  {/* Slow restrained pulse ring */}
                  {illuminated && (
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isActive ? 11 : 6.5}
                      fill="none"
                      stroke="#d5b581"
                      strokeWidth={isActive ? 1.2 : 0.65}
                      strokeOpacity={isActive ? 0.6 : 0.3}
                      style={{
                        animation: `svg-pulse 3.8s ease-in-out infinite`,
                        animationDelay: `${delaySec}s`,
                      }}
                    />
                  )}

                  {/* Luminous aura */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isActive ? 7 : illuminated ? 4 : 2.5}
                    fill="#d5b581"
                    opacity={isActive ? 0.35 : illuminated ? 0.18 : 0.08}
                    filter={isActive ? "url(#intenseActiveGlow)" : "url(#luminousGold)"}
                    className="transition-all duration-500"
                  />

                  {/* Primary gold node core */}
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isActive ? 3.4 : illuminated ? 2.4 : 1.6}
                    fill={isActive ? "#ffffff" : "#d5b581"}
                    filter={isActive ? "url(#luminousGold)" : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Pure jewel micro-core center */}
                  {illuminated && (
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isActive ? 1.4 : 0.9}
                      fill="#ffffff"
                    />
                  )}

                  {/* Editorial Typographic City Label */}
                  <g
                    transform={`translate(${hub.x + 5}, ${hub.y - 4})`}
                    className="pointer-events-none transition-opacity duration-300"
                    opacity={isActive ? 1 : illuminated ? 0.85 : 0.4}
                  >
                    {/* Subtle label backdrop for legibility */}
                    <rect
                      x={-2}
                      y={-9}
                      width={hub.name.length * 5.8 + 8}
                      height={12}
                      fill="#06080c"
                      fillOpacity={isActive ? 0.85 : 0.6}
                      rx={1}
                    />
                    <text
                      x={2}
                      y={0}
                      fill={isActive ? "#ffffff" : illuminated ? "#e9e4dc" : "#9ca3af"}
                      fontSize={isActive ? "8.5" : "7.5"}
                      fontFamily="sans-serif"
                      letterSpacing="0.16em"
                      fontWeight={isActive ? "500" : "400"}
                      className="uppercase select-none"
                    >
                      {hub.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        {/* 3. EDITORIAL FLOATING DOSSIER CARD */}
        {activeHub && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 max-w-[280px] sm:max-w-xs md:max-w-sm pointer-events-auto">
            <div className="bg-[#0b0e14]/95 border hairline border-gold/60 p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.9)] backdrop-blur-md rounded-sm animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-start justify-between gap-3 border-b hairline border-gold/20 pb-3">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-gold font-medium">
                    {activeHub.country} · {activeHub.coordsDisplay}
                  </p>
                  <h4 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide mt-0.5">
                    {activeHub.name}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveHubId(null);
                    setHoveredHubId(null);
                  }}
                  className="text-muted-foreground hover:text-gold text-sm px-1.5 py-0.5"
                  aria-label="Close dossier"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold/90 font-medium">
                  {activeHub.role}
                </p>
                <p className="text-xs text-ivory/80 leading-relaxed font-light">
                  {activeHub.details}
                </p>
              </div>

              {/* Connections list */}
              <div className="mt-4 pt-3 border-t hairline border-gold/15">
                <p className="text-[9px] uppercase tracking-[0.24em] text-muted-foreground mb-2">
                  DIRECT TRADE ARCS ({activeHub.connections.length}):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeHub.connections.map((connId) => {
                    const connHub = GLOBAL_HUBS.find((h) => h.id === connId);
                    if (!connHub) return null;
                    return (
                      <button
                        key={connId}
                        type="button"
                        onClick={() => handleFocusHub(connHub)}
                        className="text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded bg-white/[0.04] border hairline border-gold/25 text-ivory/80 hover:text-gold hover:border-gold transition-colors"
                      >
                        → {connHub.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Focus button */}
              <div className="mt-4 flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleFocusHub(activeHub)}
                  className="text-[9px] uppercase tracking-[0.22em] text-gold hover:underline flex items-center gap-1"
                >
                  FOCUS CAMERA ON HUB ↗
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground hover:text-ivory"
                >
                  RESET VIEW
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. CAMERA ZOOM & PAN CONTROLS (Bottom Right) */}
        <div className="absolute bottom-5 right-5 z-20 flex flex-col gap-1.5 bg-[#0a0d14]/85 border hairline border-gold/30 p-1.5 backdrop-blur-md rounded shadow-xl">
          <button
            type="button"
            onClick={() => handleZoom(0.7)}
            className="w-7 h-7 flex items-center justify-center text-ivory hover:text-gold hover:bg-white/[0.06] rounded text-base transition-colors font-mono"
            title="Zoom In"
            aria-label="Zoom in"
          >
            +
          </button>
          <div className="h-px w-full bg-gold/20" />
          <button
            type="button"
            onClick={() => handleZoom(1.4)}
            className="w-7 h-7 flex items-center justify-center text-ivory hover:text-gold hover:bg-white/[0.06] rounded text-base transition-colors font-mono"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            −
          </button>
          <div className="h-px w-full bg-gold/20" />
          <button
            type="button"
            onClick={handleResetView}
            className="w-7 h-7 flex items-center justify-center text-[10px] text-ivory/70 hover:text-gold hover:bg-white/[0.06] rounded transition-colors uppercase font-mono"
            title="Reset to World View"
            aria-label="Reset world view"
          >
            1:1
          </button>
        </div>

        {/* 5. LIVE COORDINATES & TELEMETRY STATUS (Bottom Left) */}
        <div className="absolute bottom-4 left-5 z-20 pointer-events-none flex items-center gap-4 text-[9px] uppercase tracking-[0.24em] text-gold/75">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" />
            <span>DIRECT SOURCING &amp; ATELIER NETWORK</span>
          </div>
          {liveCoords && (
            <div className="hidden sm:inline font-mono text-ivory/60 border-l hairline border-gold/30 pl-4">
              LAT {liveCoords.lat} · LON {liveCoords.lon}
            </div>
          )}
          <div className="hidden md:inline text-muted-foreground border-l hairline border-gold/30 pl-4">
            SCROLL ACTIVATION: {Math.round(scrollProgress * 100)}%
          </div>
        </div>
      </div>

      {/* 6. GEOGRAPHIC HUBS DIRECTORY (4 Synchronized Editorial Columns) */}
      <div className="p-6 sm:p-10 border-t hairline border-gold/20 bg-[#080b11] grid gap-8 sm:gap-10 md:grid-cols-4">
        {/* EUROPE */}
        <div>
          <div className="flex items-center justify-between border-b hairline border-gold/30 pb-3 mb-5">
            <p className="eyebrow !text-gold">EUROPE</p>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
              6 ATELIERS
            </span>
          </div>
          <ul className="space-y-4">
            {GLOBAL_HUBS.filter((h) => h.region === "europe").map((hub) => {
              const isSelected = activeHubId === hub.id || hoveredHubId === hub.id;
              return (
                <li
                  key={hub.id}
                  onMouseEnter={() => setHoveredHubId(hub.id)}
                  onMouseLeave={() => setHoveredHubId(null)}
                  onClick={() => handleFocusHub(hub)}
                  className={`cursor-pointer transition-all duration-300 p-2.5 -mx-2.5 rounded group ${
                    isSelected
                      ? "bg-white/[0.05] border-l-2 border-gold pl-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-serif text-xl sm:text-2xl text-ivory tracking-wide group-hover:text-gold transition-colors">
                      {hub.name}
                    </p>
                    <span className="text-[8px] font-mono text-gold/60 tracking-wider">
                      {hub.coordsDisplay}
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-1 line-clamp-1">
                    {hub.subtitle}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* MIDDLE EAST */}
        <div>
          <div className="flex items-center justify-between border-b hairline border-gold/30 pb-3 mb-5">
            <p className="eyebrow !text-gold">MIDDLE EAST</p>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
              2 HUBS
            </span>
          </div>
          <ul className="space-y-4">
            {GLOBAL_HUBS.filter((h) => h.region === "middle-east").map((hub) => {
              const isSelected = activeHubId === hub.id || hoveredHubId === hub.id;
              return (
                <li
                  key={hub.id}
                  onMouseEnter={() => setHoveredHubId(hub.id)}
                  onMouseLeave={() => setHoveredHubId(null)}
                  onClick={() => handleFocusHub(hub)}
                  className={`cursor-pointer transition-all duration-300 p-2.5 -mx-2.5 rounded group ${
                    isSelected
                      ? "bg-white/[0.05] border-l-2 border-gold pl-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-serif text-xl sm:text-2xl text-ivory tracking-wide group-hover:text-gold transition-colors">
                      {hub.name}
                    </p>
                    <span className="text-[8px] font-mono text-gold/60 tracking-wider">
                      {hub.coordsDisplay}
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-1 line-clamp-1">
                    {hub.subtitle}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ASIA */}
        <div>
          <div className="flex items-center justify-between border-b hairline border-gold/30 pb-3 mb-5">
            <p className="eyebrow !text-gold">ASIA</p>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
              5 HUBS
            </span>
          </div>
          <ul className="space-y-4">
            {GLOBAL_HUBS.filter((h) => h.region === "asia").map((hub) => {
              const isSelected = activeHubId === hub.id || hoveredHubId === hub.id;
              return (
                <li
                  key={hub.id}
                  onMouseEnter={() => setHoveredHubId(hub.id)}
                  onMouseLeave={() => setHoveredHubId(null)}
                  onClick={() => handleFocusHub(hub)}
                  className={`cursor-pointer transition-all duration-300 p-2.5 -mx-2.5 rounded group ${
                    isSelected
                      ? "bg-white/[0.05] border-l-2 border-gold pl-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-serif text-xl sm:text-2xl text-ivory tracking-wide group-hover:text-gold transition-colors">
                      {hub.name}
                    </p>
                    <span className="text-[8px] font-mono text-gold/60 tracking-wider">
                      {hub.coordsDisplay}
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-1 line-clamp-1">
                    {hub.subtitle}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* AMERICAS */}
        <div>
          <div className="flex items-center justify-between border-b hairline border-gold/30 pb-3 mb-5">
            <p className="eyebrow !text-gold">THE AMERICAS</p>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
              2 FLAGSHIPS
            </span>
          </div>
          <ul className="space-y-4">
            {GLOBAL_HUBS.filter((h) => h.region === "americas").map((hub) => {
              const isSelected = activeHubId === hub.id || hoveredHubId === hub.id;
              return (
                <li
                  key={hub.id}
                  onMouseEnter={() => setHoveredHubId(hub.id)}
                  onMouseLeave={() => setHoveredHubId(null)}
                  onClick={() => handleFocusHub(hub)}
                  className={`cursor-pointer transition-all duration-300 p-2.5 -mx-2.5 rounded group ${
                    isSelected
                      ? "bg-white/[0.05] border-l-2 border-gold pl-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-serif text-xl sm:text-2xl text-ivory tracking-wide group-hover:text-gold transition-colors">
                      {hub.name}
                    </p>
                    <span className="text-[8px] font-mono text-gold/60 tracking-wider">
                      {hub.coordsDisplay}
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-1 line-clamp-1">
                    {hub.subtitle}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
