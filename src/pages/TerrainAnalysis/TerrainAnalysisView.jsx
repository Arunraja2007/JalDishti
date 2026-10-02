import React from 'react';
import { 
  Mountain, 
  Layers, 
  TrendingDown, 
  Compass, 
  ShieldCheck, 
  AlertCircle,
  Activity
} from 'lucide-react';
import { GeospatialService } from '../../services/geospatialService';

export default function TerrainAnalysisView({ selectedWatershed }) {
  const slopeClasses = [
    { range: '0 - 3%', label: 'Nearly Level (Valley Bed)', share: 38, color: '#86efac', action: 'Suitable for broadbed cultivation & farm ponds' },
    { range: '3 - 8%', label: 'Gentle Slope (Mid Slopes)', share: 32, color: '#40916c', action: 'Contour bunding & vegetative barriers recommended' },
    { range: '8 - 15%', label: 'Moderate Slope (Foot Hills)', share: 18, color: '#ca8a04', action: 'Continuous contour trenches & masonry check dams' },
    { range: '15 - 30%', label: 'Steep Slope (Ridge Slopes)', share: 9, color: '#ea580c', action: 'Staggered trenches, afforestation & silvipasture' },
    { range: '> 30%', label: 'Escarpment / Ridge Crest', share: 3, color: '#dc2626', action: 'Strict protective forestry & gully plug cascading' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--green-100)', color: 'var(--green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mountain size={18} />
          </div>
          <div>
            <div className="panel-title">Terrain &amp; Elevation Analysis</div>
            <div className="panel-subtitle">DEM Hypsometry, Slope &amp; Drainage Morphometry</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Scope Banner */}
        <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 'var(--radius-lg)', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-900)', textTransform: 'uppercase' }}>
              {selectedWatershed ? `Terrain Profile: ${selectedWatershed.name}` : 'National Elevation Baseline (CartoDEM 30m Reference)'}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--green-950)', marginTop: 4 }}>
            {selectedWatershed 
              ? `Elevation ranges from ${selectedWatershed.elevation_min}m to ${selectedWatershed.elevation_max}m with a mean slope of ${selectedWatershed.mean_slope_pct}%.`
              : 'Derived from NRSC CartoDEM 1-arcsecond elevation specifications with ridge-to-valley hydrological delineation.'}
          </div>
        </div>

        {/* Ridge-to-Valley Hypsometric Cross Section Diagram */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 12, textTransform: 'uppercase' }}>
            Ridge-to-Valley Topographic Profile
          </div>

          <svg viewBox="0 0 500 160" width="100%" height="140" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="terrainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#40916c"/>
                <stop offset="100%" stop-color="#1b4332"/>
              </linearGradient>
            </defs>

            {/* Hill Profile curve */}
            <path d="M 10 30 Q 120 40 220 90 T 480 140 L 480 160 L 10 160 Z" fill="url(#terrainGrad)" opacity="0.85"/>
            <path d="M 10 30 Q 120 40 220 90 T 480 140" stroke="#14532d" stroke-width="3" fill="none"/>

            {/* Ridge crest annotation */}
            <circle cx="20" cy="30" r="4" fill="#dc2626"/>
            <text x="30" y="25" fill="#1b4332" font-size="10" font-weight="bold">Ridge Top (795m) - CCT &amp; Afforestation</text>

            {/* Middle slope annotation */}
            <circle cx="220" cy="90" r="4" fill="#ca8a04"/>
            <text x="230" y="85" fill="#1b4332" font-size="10" font-weight="bold">Mid-Slope (680m) - Check Dams &amp; Bunds</text>

            {/* Valley bed annotation */}
            <circle cx="450" cy="140" r="4" fill="#0284c7"/>
            <text x="300" y="155" fill="#0f4c81" font-size="10" font-weight="bold">Valley Bed (580m) - Percolation Tank &amp; Farm Ponds</text>
          </svg>
        </div>

        {/* Slope Classification Table */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 10, textTransform: 'uppercase' }}>
            Slope Classification &amp; Soil Conservation Zoning
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {slopeClasses.map((sc, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: sc.color }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-900)' }}>{sc.label}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--slate-700)' }}>
                    {sc.range} ({sc.share}%)
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--slate-600)', marginTop: 4 }}>
                  Recommendation: {sc.action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CartoDEM Citation */}
        <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 8, padding: 12, display: 'flex', gap: 10 }}>
          <ShieldCheck size={20} color="#2d6a4f" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: 'var(--slate-600)', lineHeight: 1.4 }}>
            <b>Elevation Model Reference:</b> Topographic contours and slope morphometry reflect CartoDEM 1-arcsecond elevation specifications as archived by NRSC Open Data Archive.
          </div>
        </div>
      </div>
    </div>
  );
}
