import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { cities } from '@/data/cities';
import { City } from '@/types/voyager';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  onCitySelect: (city: City) => void;
}

export const WorldMap = ({ onCitySelect }: WorldMapProps) => {
  const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 });
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  return (
    <div className="relative w-full aspect-[2/1] bg-map-water rounded-xl border-2 border-foreground overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-card border-2 border-foreground rounded-lg font-bold text-xl hover:bg-primary transition-colors"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-card border-2 border-foreground rounded-lg font-bold text-xl hover:bg-primary transition-colors"
        >
          −
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-card/90 backdrop-blur-sm border-2 border-foreground rounded-lg px-4 py-2">
          <p className="text-sm font-semibold">🌍 Click a city pin to start planning</p>
        </div>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 130,
          center: [0, 30],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(var(--map-land))"
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: 'hsl(var(--muted))' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {cities.map((city) => (
            <Marker
              key={city.name}
              coordinates={city.coordinates}
              onClick={() => onCitySelect(city)}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              <g className="cursor-pointer">
                <motion.circle
                  r={6 / position.zoom}
                  fill={hoveredCity === city.name ? 'hsl(var(--secondary))' : 'hsl(var(--primary))'}
                  stroke="hsl(var(--foreground))"
                  strokeWidth={2 / position.zoom}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
                {position.zoom > 1.5 && (
                  <text
                    textAnchor="middle"
                    y={-12 / position.zoom}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: `${12 / position.zoom}px`,
                      fontWeight: 700,
                      fill: 'hsl(var(--foreground))',
                    }}
                  >
                    {city.name}
                  </text>
                )}
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredCity && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-4 left-4 bg-card border-2 border-foreground rounded-lg px-4 py-2 z-10"
          >
            <p className="font-bold">{hoveredCity}</p>
            <p className="text-sm text-muted-foreground">
              {cities.find((c) => c.name === hoveredCity)?.country}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
