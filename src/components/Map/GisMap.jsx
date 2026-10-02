import React, { useState, useEffect, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  WMSTileLayer,
  GeoJSON, 
  Marker, 
  Popup, 
  Tooltip, 
  useMap, 
  useMapEvents,
  Polyline,
  Polygon
} from 'react-leaflet';
import L from 'leaflet';
import { 
  Layers, 
  Search, 
  RotateCcw, 
  Ruler, 
  Square, 
  MapPin, 
  Eye, 
  EyeOff, 
  Camera, 
  Droplets, 
  Mountain, 
  CheckCircle,
  ExternalLink,
  X
} from 'lucide-react';
import { MapService } from '../../services/mapService';
import { GeospatialService } from '../../services/geospatialService';

// Fix default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper component for programmatic map viewport changes
function MapController({ center, zoom, bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12, animate: true });
    } else if (center) {
      map.flyTo(center, zoom || 6, { duration: 1.2 });
    }
  }, [center, zoom, bounds, map]);
  return null;
}

// Helper component for interactive click measurement tool
function MeasurementToolHandler({ activeMode, points, onAddPoint }) {
  useMapEvents({
    click(e) {
      if (activeMode === 'distance' || activeMode === 'area') {
        onAddPoint([e.latlng.lat, e.latlng.lng]);
      }
    }
  });
  return null;
}

export default function GisMap({
  selectedWatershed,
  onSelectWatershed,
  onSelectPhoto,
  activeLayerFilters = {},
  highlightCoords = null
}) {
  const INDIA_CENTER = [21.7679, 78.8718];
  const DEFAULT_ZOOM = 5;

  const [basemapKey, setBasemapKey] = useState('carto_positron');
  const [enableBhuvanWms, setEnableBhuvanWms] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Vector data states
  const [watershedsGeoJson, setWatershedsGeoJson] = useState(null);
  const [waterbodiesGeoJson, setWaterbodiesGeoJson] = useState(null);
  const [streamsGeoJson, setStreamsGeoJson] = useState(null);
  const [fieldObsGeoJson, setFieldObsGeoJson] = useState(null);
  const [lulcGeoJson, setLulcGeoJson] = useState(null);

  // Layer Visibility Toggles
  const [visibleLayers, setVisibleLayers] = useState({
    watersheds: true,
    waterbodies: true,
    streams: true,
    photos: true,
    lulc: false
  });

  // Measurement Tool State ('none', 'distance', 'area')
  const [measureMode, setMeasureMode] = useState('none');
  const [measurePoints, setMeasurePoints] = useState([]);

  // Map view target
  const [mapTarget, setMapTarget] = useState({ center: INDIA_CENTER, zoom: DEFAULT_ZOOM, bounds: null });
  const [hoveredWatershedId, setHoveredWatershedId] = useState(null);

  const basemaps = MapService.getBasemapProviders();
  const bhuvanWms = MapService.getOfficialBhuvanWmsConfig();

  // Load GeoJSON layers
  useEffect(() => {
    async function loadData() {
      const [ws, wb, str, fo, lulc] = await Promise.all([
        MapService.loadWatershedsGeoJson(),
        MapService.loadWaterbodiesGeoJson(),
        MapService.loadStreamsGeoJson(),
        MapService.loadFieldObservationsGeoJson(),
        MapService.loadLulcZonesGeoJson()
      ]);
      setWatershedsGeoJson(ws);
      setWaterbodiesGeoJson(wb);
      setStreamsGeoJson(str);
      setFieldObsGeoJson(fo);
      setLulcGeoJson(lulc);
    }
    loadData();
  }, []);

  // Sync selected watershed to map bounds
  useEffect(() => {
    if (selectedWatershed && watershedsGeoJson) {
      const feature = watershedsGeoJson.features.find(f => f.properties.id === selectedWatershed.id);
      if (feature && feature.geometry && feature.geometry.coordinates) {
        const coords = feature.geometry.coordinates[0].map(c => [c[1], c[0]]);
        const bounds = L.latLngBounds(coords);
        setMapTarget({ bounds, center: null, zoom: null });
      }
    }
  }, [selectedWatershed, watershedsGeoJson]);

  // Sync highlight coordinate prop
  useEffect(() => {
    if (highlightCoords) {
      setMapTarget({ center: [highlightCoords.lat, highlightCoords.lng], zoom: 14, bounds: null });
    }
  }, [highlightCoords]);

  // Reset to India
  const handleResetIndia = () => {
    setMapTarget({ center: INDIA_CENTER, zoom: DEFAULT_ZOOM, bounds: null });
    setMeasureMode('none');
    setMeasurePoints([]);
  };

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !watershedsGeoJson) return;
    const q = searchQuery.toLowerCase();
    const found = watershedsGeoJson.features.find(f => 
      f.properties.name.toLowerCase().includes(q) ||
      f.properties.state.toLowerCase().includes(q) ||
      f.properties.district.toLowerCase().includes(q) ||
      f.properties.basin.toLowerCase().includes(q)
    );
    if (found) {
      onSelectWatershed(found.properties);
    }
  };

  // Measurement point handler
  const handleAddMeasurePoint = (point) => {
    setMeasurePoints(prev => [...prev, point]);
  };

  // Calculate measurement results
  let measurementResultText = '';
  if (measureMode === 'distance' && measurePoints.length >= 2) {
    let totalDist = 0;
    for (let i = 0; i < measurePoints.length - 1; i++) {
      totalDist += GeospatialService.calculateDistanceKm(
        measurePoints[i][0], measurePoints[i][1],
        measurePoints[i+1][0], measurePoints[i+1][1]
      );
    }
    measurementResultText = `Distance: ${totalDist.toFixed(2)} km (${measurePoints.length} points)`;
  } else if (measureMode === 'area' && measurePoints.length >= 3) {
    const areaSqKm = GeospatialService.calculatePolygonAreaSqKm(measurePoints);
    const areaHa = (areaSqKm * 100).toFixed(1);
    measurementResultText = `Area: ${areaSqKm.toFixed(2)} km² (${areaHa} Hectares)`;
  }

  // Create custom marker icons for field observations
  const createCustomPhotoIcon = (category) => {
    let pinClass = 'pin-checkdam';
    if (category === 'Farm Pond') pinClass = 'pin-farmpond';
    else if (category === 'Canal') pinClass = 'pin-canal';
    else if (category === 'Soil Erosion') pinClass = 'pin-erosion';
    else if (category === 'Vegetation') pinClass = 'pin-vegetation';
    else if (category === 'Water Body') pinClass = 'pin-waterbody';
    else if (category === 'Contour Bunding' || category === 'Gully Plug') pinClass = 'pin-bund';

    return L.divIcon({
      className: 'custom-leaflet-div-icon',
      html: `
        <div class="custom-marker-pin ${pinClass}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20]
    });
  };

  return (
    <div className="map-container">
      {/* Map Top Bar (Search + Reset + Measurement) */}
      <div className="map-hud-overlay map-hud-top-left">
        <form onSubmit={handleSearch} className="map-search-container">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            className="map-search-input"
            placeholder="Search watershed, river, state, or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={14} color="#94a3b8" />
            </button>
          )}
        </form>

        <button className="map-tool-btn" onClick={handleResetIndia} title="Reset to All-India Extent">
          <RotateCcw size={15} />
          <span>India Overview</span>
        </button>

        {/* Measurement tools */}
        <button 
          className={`map-tool-btn ${measureMode === 'distance' ? 'active' : ''}`}
          onClick={() => {
            setMeasureMode(measureMode === 'distance' ? 'none' : 'distance');
            setMeasurePoints([]);
          }}
          title="Click vertices on map to measure linear distance"
        >
          <Ruler size={15} />
          <span>Distance</span>
        </button>

        <button 
          className={`map-tool-btn ${measureMode === 'area' ? 'water-active' : ''}`}
          onClick={() => {
            setMeasureMode(measureMode === 'area' ? 'none' : 'area');
            setMeasurePoints([]);
          }}
          title="Click vertices to create a closed polygon and calculate area"
        >
          <Square size={15} />
          <span>Area Tool</span>
        </button>

        {measureMode !== 'none' && (
          <div style={{
            background: 'var(--slate-900)',
            color: 'var(--white)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: 'var(--shadow-md)'
          }}>
            <span>{measurementResultText || `Click on map to draw ${measureMode}...`}</span>
            <button 
              onClick={() => { setMeasurePoints([]); setMeasureMode('none'); }}
              style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex' }}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Map Top Right: Basemap & Official WMS Switcher */}
      <div className="map-hud-overlay map-hud-top-right">
        <div className="map-legend-card" style={{ width: 220 }}>
          <div className="map-legend-title">
            <span>Base Layer</span>
            <Layers size={14} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {Object.entries(basemaps).map(([key, config]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, cursor: 'pointer', padding: '2px 0' }}>
                <input
                  type="radio"
                  name="basemap"
                  checked={basemapKey === key}
                  onChange={() => setBasemapKey(key)}
                  style={{ accentColor: '#2d6a4f' }}
                />
                <span style={{ color: basemapKey === key ? 'var(--green-900)' : 'var(--slate-700)', fontWeight: basemapKey === key ? 600 : 400 }}>
                  {config.name}
                </span>
              </label>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--slate-200)', marginTop: 8, paddingTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, cursor: 'pointer', color: '#0369a1', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={enableBhuvanWms}
                onChange={(e) => setEnableBhuvanWms(e.target.checked)}
                style={{ accentColor: '#0284c7' }}
              />
              <span>Bhuvan LULC WMS (NRSC)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Map Bottom Left: Layer Visibility Control & Legend */}
      <div className="map-hud-overlay map-hud-bottom-left">
        <div className="map-legend-card">
          <div className="map-legend-title">
            <span>Map Layers &amp; Legend</span>
            <Layers size={14} />
          </div>

          <div className="legend-item" onClick={() => setVisibleLayers(v => ({ ...v, watersheds: !v.watersheds }))}>
            <div className="legend-item-left">
              <span className="legend-color-dot" style={{ background: '#52b788', border: '1.5px solid #2d6a4f' }}></span>
              <span>⬡ Watershed Boundaries</span>
            </div>
            {visibleLayers.watersheds ? <Eye size={14} color="#2d6a4f" /> : <EyeOff size={14} color="#94a3b8" />}
          </div>

          <div className="legend-item" onClick={() => setVisibleLayers(v => ({ ...v, waterbodies: !v.waterbodies }))}>
            <div className="legend-item-left">
              <span className="legend-color-dot" style={{ background: '#0284c7' }}></span>
              <span>💧 Water Bodies &amp; Tanks</span>
            </div>
            {visibleLayers.waterbodies ? <Eye size={14} color="#0284c7" /> : <EyeOff size={14} color="#94a3b8" />}
          </div>

          <div className="legend-item" onClick={() => setVisibleLayers(v => ({ ...v, streams: !v.streams }))}>
            <div className="legend-item-left">
              <span className="legend-color-dot" style={{ background: '#38bdf8', height: 4, margin: '5px 0' }}></span>
              <span>〰 Drainage Stream Network</span>
            </div>
            {visibleLayers.streams ? <Eye size={14} color="#0284c7" /> : <EyeOff size={14} color="#94a3b8" />}
          </div>

          <div className="legend-item" onClick={() => setVisibleLayers(v => ({ ...v, photos: !v.photos }))}>
            <div className="legend-item-left">
              <span className="legend-color-dot" style={{ background: '#0ea5e9', borderRadius: '50%' }}></span>
              <span>📍 Geo-coded Photo Evidence</span>
            </div>
            {visibleLayers.photos ? <Eye size={14} color="#0284c7" /> : <EyeOff size={14} color="#94a3b8" />}
          </div>

          <div className="legend-item" onClick={() => setVisibleLayers(v => ({ ...v, lulc: !v.lulc }))}>
            <div className="legend-item-left">
              <span className="legend-color-dot" style={{ background: '#1b4332' }}></span>
              <span>🌿 LULC Forest / Agri Zones</span>
            </div>
            {visibleLayers.lulc ? <Eye size={14} color="#2d6a4f" /> : <EyeOff size={14} color="#94a3b8" />}
          </div>
        </div>
      </div>

      {/* Main Leaflet Map Container */}
      <MapContainer
        center={INDIA_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <MapController 
          center={mapTarget.center} 
          zoom={mapTarget.zoom} 
          bounds={mapTarget.bounds} 
        />

        <MeasurementToolHandler
          activeMode={measureMode}
          points={measurePoints}
          onAddPoint={handleAddMeasurePoint}
        />

        {/* Selected Basemap TileLayer */}
        <TileLayer
          key={basemapKey}
          url={basemaps[basemapKey].url}
          attribution={basemaps[basemapKey].attribution}
          maxZoom={basemaps[basemapKey].maxZoom}
        />

        {/* Official NRSC Bhuvan WMS Layer (when enabled) */}
        {enableBhuvanWms && (
          <WMSTileLayer
            url={bhuvanWms.lulc_250k.url}
            layers={bhuvanWms.lulc_250k.layers}
            format={bhuvanWms.lulc_250k.format}
            transparent={true}
            opacity={0.65}
            attribution={bhuvanWms.lulc_250k.attribution}
          />
        )}

        {/* LULC Polygons Layer */}
        {visibleLayers.lulc && lulcGeoJson && (
          <GeoJSON
            key="layer-lulc"
            data={lulcGeoJson}
            style={MapService.getLulcStyle}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(
                `<b>${feature.properties.category}</b>: ${feature.properties.class_name} (${feature.properties.area_ha} Ha)`,
                { className: 'custom-map-tooltip' }
              );
            }}
          />
        )}

        {/* Streams and Drainage Lines */}
        {visibleLayers.streams && streamsGeoJson && (
          <GeoJSON
            key="layer-streams"
            data={streamsGeoJson}
            style={MapService.getStreamStyle}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(
                `<b>${feature.properties.name}</b><br/>Stream Order: ${feature.properties.order} (${feature.properties.type})`,
                { className: 'custom-map-tooltip' }
              );
            }}
          />
        )}

        {/* Waterbodies Layer */}
        {visibleLayers.waterbodies && waterbodiesGeoJson && (
          <GeoJSON
            key="layer-waterbodies"
            data={waterbodiesGeoJson}
            style={MapService.getWaterbodyStyle}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(
                `<b>${feature.properties.name}</b><br/>Type: ${feature.properties.type}<br/>Capacity: ${feature.properties.storage_capacity_tcm} TCM`,
                { className: 'custom-map-tooltip' }
              );
            }}
          />
        )}

        {/* Watershed Boundaries Layer */}
        {visibleLayers.watersheds && watershedsGeoJson && (
          <GeoJSON
            key={`layer-ws-${selectedWatershed?.id}-${hoveredWatershedId}`}
            data={watershedsGeoJson}
            style={(feature) => {
              const isSel = selectedWatershed?.id === feature.properties.id;
              const isHov = hoveredWatershedId === feature.properties.id;
              return MapService.getWatershedStyle(feature, isSel, isHov);
            }}
            onEachFeature={(feature, layer) => {
              layer.on({
                mouseover: () => setHoveredWatershedId(feature.properties.id),
                mouseout: () => setHoveredWatershedId(null),
                click: () => onSelectWatershed(feature.properties)
              });
              layer.bindTooltip(
                `<b>${feature.properties.name}</b><br/>${feature.properties.basin} | Area: ${feature.properties.area_sqkm} km²<br/>Priority: ${feature.properties.priority_level}`,
                { className: 'custom-map-tooltip' }
              );
            }}
          />
        )}

        {/* Geo-coded Field Observation Photo Markers */}
        {visibleLayers.photos && fieldObsGeoJson && fieldObsGeoJson.features.map(f => {
          const p = f.properties;
          const [lng, lat] = f.geometry.coordinates;

          return (
            <Marker
              key={p.id}
              position={[lat, lng]}
              icon={createCustomPhotoIcon(p.category)}
              eventHandlers={{
                click: () => onSelectPhoto(p)
              }}
            >
              <Popup>
                <div style={{ width: 220, padding: 0 }}>
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    style={{ width: '100%', height: 110, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    onError={e => { e.target.onerror=null; e.target.style.background='#e2e8f0'; e.target.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22220%22 height=%22110%22%3E%3Crect fill=%22%23e2e8f0%22 width=%22220%22 height=%22110%22/%3E%3Ctext fill=%22%2394a3b8%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EField Photo%3C/text%3E%3C/svg%3E'; }}
                  />
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-800)', textTransform: 'uppercase' }}>
                      {p.category}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-900)', marginTop: 2 }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--slate-500)', marginTop: 4 }}>
                      {p.date} • {p.watershed}
                    </div>
                    <button 
                      className="btn-primary" 
                      style={{ width: '100%', marginTop: 8, padding: '4px 8px', fontSize: 11, justifyContent: 'center' }}
                      onClick={() => onSelectPhoto(p)}
                    >
                      <Camera size={13} />
                      <span>Inspect Evidence</span>
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Measurement tool drawn polyline / polygon */}
        {measureMode === 'distance' && measurePoints.length > 0 && (
          <Polyline
            positions={measurePoints}
            color="#dc2626"
            weight={3}
            dashArray="6,6"
          />
        )}

        {measureMode === 'area' && measurePoints.length > 0 && (
          <Polygon
            positions={measurePoints}
            color="#0284c7"
            fillColor="#38bdf8"
            fillOpacity={0.35}
            weight={2.5}
            dashArray="4,4"
          />
        )}
      </MapContainer>
    </div>
  );
}
