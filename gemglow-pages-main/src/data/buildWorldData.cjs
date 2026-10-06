const fs = require('fs');
const path = require('path');
const topojson = require('topojson-client');
const d3Geo = require('d3-geo');

const world = require('world-atlas/countries-110m.json');

const land = topojson.feature(world, world.objects.land);
const countries = topojson.feature(world, world.objects.countries);
const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

const width = 1000;
const height = 500;

// Editorial Natural Earth 1 projection
const projection = d3Geo.geoNaturalEarth1()
  .fitExtent([[10, 10], [990, 490]], land);

const pathGen = d3Geo.geoPath(projection);

const landPath = pathGen(land);
const borderPath = pathGen(borders);

// Standard graticules (15-degree steps for refined editorial density)
const graticuleGen = d3Geo.geoGraticule().step([20, 20]);
const graticulePath = pathGen(graticuleGen());

// Equator, Tropics & Prime Meridian for luxury cartographic details
const equatorFeature = {
  type: "LineString",
  coordinates: Array.from({ length: 73 }, (_, i) => [-180 + i * 5, 0])
};
const tropicCancerFeature = {
  type: "LineString",
  coordinates: Array.from({ length: 73 }, (_, i) => [-180 + i * 5, 23.4365])
};
const tropicCapricornFeature = {
  type: "LineString",
  coordinates: Array.from({ length: 73 }, (_, i) => [-180 + i * 5, -23.4365])
};
const primeMeridianFeature = {
  type: "LineString",
  coordinates: Array.from({ length: 37 }, (_, i) => [0, -90 + i * 5])
};

const equatorPath = pathGen(equatorFeature);
const tropicCancerPath = pathGen(tropicCancerFeature);
const tropicCapricornPath = pathGen(tropicCapricornFeature);
const primeMeridianPath = pathGen(primeMeridianFeature);

// List of editorial global locations with exact geographical coords [longitude, latitude]
const locationDefinitions = [
  // Europe
  {
    id: "antwerp",
    name: "Antwerp",
    country: "Belgium",
    role: "Global Diamond Capital",
    subtitle: "Rough sorting, tender auctions & international diamond trade",
    category: "trading",
    region: "europe",
    coordinates: [4.4025, 51.2194],
    coordsDisplay: "51°13'N 4°24'E",
    details: "Centuries of high-carat sorting, GIA/HRD certification hub and Europe's primary trading exchange.",
    connections: ["paris", "brussels", "dubai", "surat", "new-york"]
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    role: "Haute Joaillerie Gateway",
    subtitle: "Place Vendôme maisons, design commissions & luxury flagships",
    category: "ateliers",
    region: "europe",
    coordinates: [2.3522, 48.8566],
    coordsDisplay: "48°51'N 2°21'E",
    details: "The creative epicentre of global high jewellery, bespoke archival sourcing and luxury house partnerships.",
    connections: ["antwerp", "milan", "london", "geneva"]
  },
  {
    id: "milan",
    name: "Milan",
    country: "Italy",
    role: "Fashion Hardware & Design Studio",
    subtitle: "Precision metallurgical casting, bespoke clasps & luxury components",
    category: "craft",
    region: "europe",
    coordinates: [9.1900, 45.4642],
    coordsDisplay: "45°27'N 9°11'E",
    details: "Master Italian metalwork, architectural hardware engineering and fashion house collaborations.",
    connections: ["paris", "geneva", "dubai"]
  },
  {
    id: "brussels",
    name: "Brussels",
    country: "Belgium",
    role: "Certification & Regulatory Exchange",
    subtitle: "Gemmological authentication, Kimberley Process compliance & trade",
    category: "trading",
    region: "europe",
    coordinates: [4.3517, 50.8503],
    coordsDisplay: "50°51'N 4°21'E",
    details: "Strict compliance standards, ethical sourcing validation and international customs coordination.",
    connections: ["antwerp", "london"]
  },
  {
    id: "geneva",
    name: "Geneva",
    country: "Switzerland",
    role: "Precision Mechanisms & Private Vaults",
    subtitle: "Horological settings, rare gemstones & ultra-high-net-worth commissions",
    category: "craft",
    region: "europe",
    coordinates: [6.1432, 46.2044],
    coordsDisplay: "46°12'N 6°08'E",
    details: "Swiss precision engineering, micro-mechanics, high-horology gemstone setting and private vault curation.",
    connections: ["milan", "paris", "london"]
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    role: "Heritage Houses & Auction Exchange",
    subtitle: "Bond Street luxury houses, sovereign collections & Sotheby's/Christie's",
    category: "trading",
    region: "europe",
    coordinates: [-0.1278, 51.5074],
    coordsDisplay: "51°30'N 0°07'W",
    details: "Historic connection to royal archives, bespoke Mayfair commissions and institutional collector advisory.",
    connections: ["paris", "new-york", "geneva"]
  },

  // Middle East
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    role: "Global Trade Crossroads",
    subtitle: "DIFC, Gold & Diamond Park, volume logistics & bespoke Gulf clients",
    category: "trading",
    region: "middle-east",
    coordinates: [55.2708, 25.2048],
    coordsDisplay: "25°12'N 55°16'E",
    details: "The bridge between Asian manufacturing and European luxury, duty-free bullion exchange and rapid transit.",
    connections: ["antwerp", "riyadh", "surat", "jaipur", "hong-kong"]
  },
  {
    id: "riyadh",
    name: "Riyadh",
    country: "Saudi Arabia",
    role: "Royal & Institutional Gifting",
    subtitle: "Sovereign bespoke commissions, ceremonial metalwork & private salon",
    category: "ateliers",
    region: "middle-east",
    coordinates: [46.6753, 24.7136],
    coordsDisplay: "24°42'N 46°40'E",
    details: "Custom heirloom objet d'art, monumental commemorative items and Gulf royal house commissions.",
    connections: ["dubai"]
  },

  // Asia
  {
    id: "surat",
    name: "Surat",
    country: "India",
    role: "Diamond Cutting & Polishing Epicentre",
    subtitle: "90% of the world's diamonds crafted with microscopic laser precision",
    category: "craft",
    region: "asia",
    coordinates: [72.8311, 21.1702],
    coordsDisplay: "21°10'N 72°49'E",
    details: "State-of-the-art multi-axis laser cutting, optical symmetry polishing and proprietary facet formulas.",
    connections: ["jaipur", "dubai", "antwerp", "hong-kong"]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    role: "Coloured Gemstone Heritage & Lapidary",
    subtitle: "Emerald, ruby & sapphire specialist cutting, historic royal lapidaries",
    category: "craft",
    region: "asia",
    coordinates: [75.7873, 26.9124],
    coordsDisplay: "26°54'N 75°47'E",
    details: "Generational master lapidaries carving, faceting and certifying the finest natural coloured stones.",
    connections: ["surat", "dubai", "hong-kong", "tokyo"]
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    country: "Hong Kong SAR",
    role: "Asia-Pacific Premier Trade Hub",
    subtitle: "International jewellery fairs, high-yield auctions & Asian luxury gate",
    category: "trading",
    region: "asia",
    coordinates: [114.1694, 22.3193],
    coordsDisplay: "22°19'N 114°10'E",
    details: "Key logistics node connecting Indian craft with East Asian connoisseurs, high-tier jade and diamond trading.",
    connections: ["surat", "jaipur", "dubai", "tokyo", "singapore"]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    role: "Ginza Luxury Market & Precision Metallurgical Design",
    subtitle: "Minimalist titanium/platinum craftsmanship & discerning luxury market",
    category: "ateliers",
    region: "asia",
    coordinates: [139.6503, 35.6762],
    coordsDisplay: "35°40'N 139°39'E",
    details: "Uncompromising standards for flawless finish, micro-tolerances and Japanese design philosophy.",
    connections: ["hong-kong", "jaipur"]
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    role: "Southeast Asia Family Office & Bespoke Vaults",
    subtitle: "Ultra-high-net-worth private client advisory & freeport storage",
    category: "trading",
    region: "asia",
    coordinates: [103.8198, 1.3521],
    coordsDisplay: "1°21'N 103°49'E",
    details: "Secure bonded asset holding, private collector salons and Southeast Asian distribution.",
    connections: ["hong-kong", "dubai"]
  },

  // Americas
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    role: "Diamond District & Fifth Avenue Flagships",
    subtitle: "47th Street trade, institutional collectors & corporate bespoke gifts",
    category: "trading",
    region: "americas",
    coordinates: [-74.0060, 40.7128],
    coordsDisplay: "40°42'N 74°00'W",
    details: "Flagship presence connecting international manufacturing directly to American corporate and luxury clients.",
    connections: ["antwerp", "london", "los-angeles"]
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    country: "United States",
    role: "High-Profile Bespoke & Entertainment Styling",
    subtitle: "Red carpet fine jewellery, custom artist commissions & design studio",
    category: "ateliers",
    region: "americas",
    coordinates: [-118.2437, 34.0522],
    coordsDisplay: "34°03'N 118°14'W",
    details: "Exclusive styling atelier for entertainment figures, red carpet statement pieces and bespoke gold hardware.",
    connections: ["new-york"]
  }
];

// Project location coordinates onto map
const locations = locationDefinitions.map((loc) => {
  const [x, y] = projection(loc.coordinates);
  return {
    ...loc,
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100
  };
});

// Generate great-circle trade arc curves
const arcs = [];
const seenArcs = new Set();

locations.forEach((source) => {
  source.connections.forEach((targetId) => {
    const target = locations.find(l => l.id === targetId);
    if (!target) return;

    const key = [source.id, target.id].sort().join("---");
    if (seenArcs.has(key)) return;
    seenArcs.add(key);

    const interpolator = d3Geo.geoInterpolate(source.coordinates, target.coordinates);
    const numPoints = 20;
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const coord = interpolator(i / numPoints);
      const [px, py] = projection(coord);
      points.push([Math.round(px * 10) / 10, Math.round(py * 10) / 10]);
    }

    // Build SVG path string with smooth cubic segments
    let pathString = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      pathString += ` L ${points[i][0]} ${points[i][1]}`;
    }

    arcs.push({
      id: key,
      sourceId: source.id,
      targetId: target.id,
      path: pathString,
      sourceCoords: [source.x, source.y],
      targetCoords: [target.x, target.y]
    });
  });
});

// Regional camera focus bounding boxes for smooth camera movement
// [minX, minY, width, height]
const regions = {
  global: {
    label: "Global Network",
    viewBox: { x: 0, y: 0, width: 1000, height: 500 },
    description: "The complete global ecosystem spanning sourcing, manufacturing, ateliers & flagships"
  },
  europe: {
    label: "European Ateliers",
    viewBox: { x: 440, y: 30, width: 220, height: 160 },
    description: "Antwerp diamond exchange, Place Vendôme haute joaillerie & Milanese metal craft"
  },
  "middle-east": {
    label: "Middle East Hubs",
    viewBox: { x: 580, y: 150, width: 180, height: 140 },
    description: "Dubai global logistics crossroads & Riyadh royal bespoke salon"
  },
  asia: {
    label: "Asian Origins & Markets",
    viewBox: { x: 640, y: 110, width: 320, height: 230 },
    description: "Surat diamond cutting, Jaipur gemstone lapidary & Tokyo/Hong Kong fine trade"
  },
  americas: {
    label: "The Americas",
    viewBox: { x: 120, y: 60, width: 280, height: 200 },
    description: "New York Fifth Avenue flagship trading & Los Angeles bespoke red-carpet ateliers"
  }
};

const output = `// Auto-generated real geographic data from Natural Earth 110m (WGS84 via D3-geo)
// High-fidelity luxury cartographic dataset for Facette & Co.

export interface LocationHub {
  id: string;
  name: string;
  country: string;
  role: string;
  subtitle: string;
  category: "craft" | "trading" | "ateliers";
  region: "europe" | "middle-east" | "asia" | "americas";
  coordinates: [number, number]; // [lon, lat]
  coordsDisplay: string;
  details: string;
  connections: string[];
  x: number;
  y: number;
}

export interface TradeArc {
  id: string;
  sourceId: string;
  targetId: string;
  path: string;
  sourceCoords: [number, number];
  targetCoords: [number, number];
}

export interface RegionView {
  label: string;
  viewBox: { x: number; y: number; width: number; height: number };
  description: string;
}

export const WORLD_VIEWBOX = { width: ${width}, height: ${height} };

export const REAL_LAND_PATH = ${JSON.stringify(landPath)};

export const REAL_BORDERS_PATH = ${JSON.stringify(borderPath)};

export const REAL_GRATICULE_PATH = ${JSON.stringify(graticulePath)};

export const REAL_EQUATOR_PATH = ${JSON.stringify(equatorPath)};

export const REAL_TROPICS_PATHS = {
  cancer: ${JSON.stringify(tropicCancerPath)},
  capricorn: ${JSON.stringify(tropicCapricornPath)},
  primeMeridian: ${JSON.stringify(primeMeridianPath)}
};

export const GLOBAL_HUBS: LocationHub[] = ${JSON.stringify(locations, null, 2)};

export const TRADE_ARCS: TradeArc[] = ${JSON.stringify(arcs, null, 2)};

export const REGIONS: Record<string, RegionView> = ${JSON.stringify(regions, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'worldMapData.ts'), output, 'utf8');
console.log('Successfully generated worldMapData.ts');
console.log('Hubs count:', locations.length);
console.log('Arcs count:', arcs.length);
