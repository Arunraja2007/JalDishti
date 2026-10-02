import React from 'react';
import { 
  X, 
  MapPin, 
  Layers, 
  Droplets, 
  Sprout, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Camera, 
  Mountain,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export default function WatershedInfoPanel({ 
  watershed, 
  onClose, 
  onViewReport, 
  onViewFieldEvidence 
}) {
  if (!watershed) return null;

  const lulc = watershed.lulc_breakdown || {
    forest: 25,
    agriculture: 50,
    grassland: 10,
    water: 5,
    builtup: 5,
    barren: 5
  };

  const getPriorityBadgeClass = (priority) => {
    if (priority === 'Critical') return 'kpi-critical';
    if (priority === 'High') return 'kpi-critical';
    return 'kpi-green';
  };

  return (
    <div className="gis-panel-viewport">
      {/* Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <Compass size={18} color="#2d6a4f" />
          <div>
            <div className="panel-title">Watershed Intelligence</div>
            <div className="panel-subtitle">Spatial &amp; Biophysical Profile</div>
          </div>
        </div>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', display: 'flex' }}
          title="Close watershed details"
        >
          <X size={18} />
        </button>
      </div>

      <div className="ws-detail-panel">
        {/* Hero Card */}
        <div className="ws-hero-card">
          <div className="ws-code-pill">HYDRO-CODE: {watershed.code || 'WS-IND-01'}</div>
          <div className="ws-hero-name">{watershed.name}</div>
          <div className="ws-hero-loc">
            📍 {watershed.district}, {watershed.state} ({watershed.basin})
          </div>
          
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <span style={{ 
              background: watershed.priority_level === 'Critical' ? '#dc2626' : (watershed.priority_level === 'High' ? '#ea580c' : '#16a34a'),
              color: '#ffffff',
              fontSize: 10,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 4,
              textTransform: 'uppercase'
            }}>
              Priority: {watershed.priority_level} (Score: {watershed.risk_score}/100)
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4 }}>
              Status: {watershed.status}
            </span>
          </div>
        </div>

        {/* Key Spatial Observations */}
        <div className="spatial-obs-box">
          <div className="spatial-obs-title">
            <Sprout size={15} color="#1b4332" />
            <span>Key Spatial Observations</span>
          </div>
          <div className="spatial-obs-text">
            {watershed.key_observations || "Dense upper ridge canopy with moderate gully progression in lower third order streams."}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="action-plan-box">
          <div className="action-plan-title">
            <Droplets size={15} color="#0369a1" />
            <span>Intervention Recommendations</span>
          </div>
          <div className="action-plan-text">
            {watershed.recommended_actions || "Construct 4 loose boulder structures in 2nd order streams and implement contour bunding."}
          </div>
        </div>

        {/* Biophysical Metrics Grid */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-600)', marginBottom: 8, textTransform: 'uppercase' }}>
            Biophysical &amp; Hydrological Metrics
          </div>
          <div className="stats-grid-2col">
            <div className="stat-cell">
              <div className="stat-cell-label">Total Catchment Area</div>
              <div className="stat-cell-value" style={{ color: 'var(--green-800)' }}>{watershed.area_sqkm} km²</div>
            </div>
            <div className="stat-cell">
              <div className="stat-cell-label">Elevation Range</div>
              <div className="stat-cell-value">{watershed.elevation_min}m - {watershed.elevation_max}m</div>
            </div>
            <div className="stat-cell">
              <div className="stat-cell-label">Mean Slope</div>
              <div className="stat-cell-value">{watershed.mean_slope_pct}% (Moderate)</div>
            </div>
            <div className="stat-cell">
              <div className="stat-cell-label">Annual Rainfall</div>
              <div className="stat-cell-value" style={{ color: 'var(--blue-700)' }}>{watershed.annual_rainfall_mm} mm/yr</div>
            </div>
            <div className="stat-cell">
              <div className="stat-cell-label">Drainage Density</div>
              <div className="stat-cell-value">{watershed.drainage_density_km_sqkm} km/km²</div>
            </div>
            <div className="stat-cell">
              <div className="stat-cell-label">Mean Vegetation (NDVI)</div>
              <div className="stat-cell-value" style={{ color: 'var(--green-700)' }}>{watershed.ndvi_mean}</div>
            </div>
            <div className="stat-cell">
              <div className="stat-cell-label">Soil Loss Rate</div>
              <div className="stat-cell-value" style={{ color: '#b45309' }}>{watershed.soil_erosion_rate_t_ha_yr} t/ha/yr</div>
            </div>
            <div className="stat-cell">
              <div className="stat-cell-label">Groundwater Depth</div>
              <div className="stat-cell-value" style={{ color: 'var(--blue-800)' }}>{watershed.groundwater_level_m_bgl} m bgl</div>
            </div>
          </div>
        </div>

        {/* LULC Composition Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: 'var(--slate-600)', marginBottom: 6 }}>
            <span>LULC ZONAL COMPOSITION</span>
            <span style={{ color: 'var(--slate-400)', fontWeight: 500 }}>NRSC 1:250K</span>
          </div>

          <div style={{ display: 'flex', height: 16, borderRadius: 6, overflow: 'hidden', marginBottom: 8, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}>
            <div style={{ width: `${lulc.forest}%`, background: '#1b4332' }} title={`Forest: ${lulc.forest}%`} />
            <div style={{ width: `${lulc.agriculture}%`, background: '#40916c' }} title={`Agriculture: ${lulc.agriculture}%`} />
            <div style={{ width: `${lulc.grassland}%`, background: '#86efac' }} title={`Grassland: ${lulc.grassland}%`} />
            <div style={{ width: `${lulc.water}%`, background: '#0284c7' }} title={`Water: ${lulc.water}%`} />
            <div style={{ width: `${lulc.builtup}%`, background: '#64748b' }} title={`Built-up: ${lulc.builtup}%`} />
            <div style={{ width: `${lulc.barren}%`, background: '#b45309' }} title={`Barren: ${lulc.barren}%`} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, fontSize: 11, color: 'var(--slate-600)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#1b4332', borderRadius: 2 }} />
              <span>Forest: {lulc.forest}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#40916c', borderRadius: 2 }} />
              <span>Agri: {lulc.agriculture}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#86efac', borderRadius: 2 }} />
              <span>Scrub: {lulc.grassland}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#0284c7', borderRadius: 2 }} />
              <span>Water: {lulc.water}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#64748b', borderRadius: 2 }} />
              <span>Built: {lulc.builtup}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: '#b45309', borderRadius: 2 }} />
              <span>Barren: {lulc.barren}%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <button 
            className="btn-primary" 
            onClick={() => onViewReport(watershed)}
            style={{ justifyContent: 'center', width: '100%', padding: '10px' }}
          >
            <FileText size={16} />
            <span>Generate Official Assessment Report</span>
          </button>

          <button 
            className="btn-water" 
            onClick={() => onViewFieldEvidence(watershed)}
            style={{ justifyContent: 'center', width: '100%', padding: '10px' }}
          >
            <Camera size={16} />
            <span>Explore Geo-coded Photos ({watershed.geotagged_photos_count || 0})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
