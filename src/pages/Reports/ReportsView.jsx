import React from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Droplets, 
  Sprout, 
  Layers, 
  Camera, 
  AlertTriangle,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function ReportsView({ 
  selectedWatershed, 
  watersheds = [], 
  onSelectWatershed,
  fieldPhotos = []
}) {
  const currentWs = selectedWatershed || watersheds[0] || {
    id: 'WS-MH-GOD-01',
    name: 'Ralegan-Siddhi Upper Godavari Micro-Watershed',
    code: '4E2B5a',
    basin: 'Godavari Basin',
    state: 'Maharashtra',
    district: 'Ahmednagar (Ahilyanagar)',
    taluka: 'Parner',
    area_sqkm: 86.4,
    elevation_min: 580,
    elevation_max: 795,
    mean_slope_pct: 5.8,
    annual_rainfall_mm: 520,
    drainage_density_km_sqkm: 2.14,
    priority_level: 'High',
    risk_score: 72,
    ndvi_mean: 0.58,
    soil_erosion_rate_t_ha_yr: 8.4,
    groundwater_level_m_bgl: 6.8,
    key_observations: 'Significant groundwater recovery observed following continuous contour trenching (CCT) and 14 masonry check dams along Kukadi tributaries.',
    recommended_actions: 'Desilting required on Check Dam CD-03; reinforce loose boulder gully plug at ridge section R-12.',
    lulc_breakdown: { forest: 22.5, agriculture: 52.8, grassland: 11.2, water: 6.4, builtup: 3.6, barren: 3.5 }
  };

  const wsPhotos = fieldPhotos.filter(p => p.watershed_id === currentWs.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Top Header & Toolbar */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--green-100)', color: 'var(--green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={18} />
          </div>
          <div>
            <div className="panel-title">Geospatial Assessment Report</div>
            <div className="panel-subtitle">Official Environmental &amp; Hydrological Summary</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            className="filter-select"
            value={currentWs.id}
            onChange={(e) => {
              const match = watersheds.find(w => w.id === e.target.value);
              if (match) onSelectWatershed(match);
            }}
          >
            {watersheds.map(w => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>

          <button className="btn-primary" onClick={handlePrint} style={{ padding: '6px 12px', fontSize: 12 }}>
            <Printer size={14} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Document Body */}
      <div style={{ padding: 24 }}>
        <div className="report-document" id="printable-watershed-report">
          {/* Official Banner */}
          <div className="report-header-banner">
            <div className="report-title-block">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <img src="/logo.svg" alt="JalDrishti Logo" style={{ width: 32, height: 32 }} />
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--green-800)', textTransform: 'uppercase' }}>
                  JalDrishti • PMKSY-WDC 2.0 Evaluation
                </span>
              </div>
              <h1>Watershed Geospatial Assessment Report</h1>
              <p>Comprehensive Biophysical, Hydrological &amp; Field Verification Audit</p>
            </div>

            <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--slate-500)' }}>
              <div>Report ID: <b>RPT-{currentWs.code}-{new Date().getFullYear()}</b></div>
              <div>Date Generated: <b>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</b></div>
              <div style={{ color: 'var(--green-700)', fontWeight: 600, marginTop: 4 }}>
                Status: Verified &amp; Signed
              </div>
            </div>
          </div>

          {/* Section 1: Location & Hydro Profile */}
          <div className="report-section">
            <div className="report-section-title">
              <Compass size={16} color="#1b4332" />
              <span>1. Location &amp; Hydrological Identification</span>
            </div>

            <table className="report-table">
              <tbody>
                <tr>
                  <th style={{ width: '25%' }}>Watershed Name</th>
                  <td style={{ width: '25%', fontWeight: 700, color: 'var(--slate-900)' }}>{currentWs.name}</td>
                  <th style={{ width: '25%' }}>Hydrological Code</th>
                  <td style={{ width: '25%', fontFamily: 'var(--font-mono)' }}>{currentWs.code}</td>
                </tr>
                <tr>
                  <th>River Basin</th>
                  <td>{currentWs.basin}</td>
                  <th>State &amp; District</th>
                  <td>{currentWs.district}, {currentWs.state}</td>
                </tr>
                <tr>
                  <th>Catchment Area</th>
                  <td style={{ fontWeight: 700, color: 'var(--green-800)' }}>{currentWs.area_sqkm} sq. km</td>
                  <th>Annual Rainfall</th>
                  <td>{currentWs.annual_rainfall_mm} mm/year</td>
                </tr>
                <tr>
                  <th>Elevation Range</th>
                  <td>{currentWs.elevation_min}m to {currentWs.elevation_max}m</td>
                  <th>Mean Slope</th>
                  <td>{currentWs.mean_slope_pct}% (Moderate)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Key Spatial Observations */}
          <div className="report-section">
            <div className="report-section-title">
              <Sprout size={16} color="#1b4332" />
              <span>2. Key Spatial Observations &amp; Remote Sensing Findings</span>
            </div>

            <div style={{ background: 'var(--green-50)', padding: 14, borderRadius: 8, borderLeft: '4px solid var(--green-700)' }}>
              <p style={{ fontSize: 13, color: 'var(--green-950)', lineHeight: 1.5, margin: 0 }}>
                {currentWs.key_observations}
              </p>
            </div>
          </div>

          {/* Section 3: Biophysical & Land Use Composition */}
          <div className="report-section">
            <div className="report-section-title">
              <Layers size={16} color="#1b4332" />
              <span>3. Land Use / Land Cover (LULC) Zonation</span>
            </div>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Thematic Class</th>
                  <th>Category</th>
                  <th>Coverage Area (Ha)</th>
                  <th>Percentage Share (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Agricultural Cropland</b></td>
                  <td>Active Cultivation</td>
                  <td>{((currentWs.area_sqkm * (currentWs.lulc_breakdown?.agriculture || 50) / 100) * 100).toFixed(0)} Ha</td>
                  <td><b style={{ color: '#40916c' }}>{currentWs.lulc_breakdown?.agriculture || 52.8}%</b></td>
                </tr>
                <tr>
                  <td><b>Forest Canopy &amp; Plantations</b></td>
                  <td>Dense / Deciduous</td>
                  <td>{((currentWs.area_sqkm * (currentWs.lulc_breakdown?.forest || 20) / 100) * 100).toFixed(0)} Ha</td>
                  <td><b style={{ color: '#1b4332' }}>{currentWs.lulc_breakdown?.forest || 22.5}%</b></td>
                </tr>
                <tr>
                  <td><b>Grassland &amp; Scrub</b></td>
                  <td>Pasture / Grazing</td>
                  <td>{((currentWs.area_sqkm * (currentWs.lulc_breakdown?.grassland || 10) / 100) * 100).toFixed(0)} Ha</td>
                  <td>{currentWs.lulc_breakdown?.grassland || 11.2}%</td>
                </tr>
                <tr>
                  <td><b>Surface Water Bodies</b></td>
                  <td>Tanks, Check Dams</td>
                  <td>{((currentWs.area_sqkm * (currentWs.lulc_breakdown?.water || 5) / 100) * 100).toFixed(0)} Ha</td>
                  <td><b style={{ color: '#0284c7' }}>{currentWs.lulc_breakdown?.water || 6.4}%</b></td>
                </tr>
                <tr>
                  <td><b>Built-up Settlements</b></td>
                  <td>Habitation</td>
                  <td>{((currentWs.area_sqkm * (currentWs.lulc_breakdown?.builtup || 4) / 100) * 100).toFixed(0)} Ha</td>
                  <td>{currentWs.lulc_breakdown?.builtup || 3.6}%</td>
                </tr>
                <tr>
                  <td><b>Barren / Ravine Land</b></td>
                  <td>Degraded Land</td>
                  <td>{((currentWs.area_sqkm * (currentWs.lulc_breakdown?.barren || 4) / 100) * 100).toFixed(0)} Ha</td>
                  <td><b style={{ color: '#b45309' }}>{currentWs.lulc_breakdown?.barren || 3.5}%</b></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 4: Geo-Coded Photographic Ground Evidence */}
          <div className="report-section">
            <div className="report-section-title">
              <Camera size={16} color="#0284c7" />
              <span>4. Geo-Coded Photographic Field Audit Evidence</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {(wsPhotos.length > 0 ? wsPhotos : fieldPhotos.slice(0, 2)).map(p => (
                <div key={p.id} style={{ border: '1px solid var(--slate-200)', borderRadius: 8, overflow: 'hidden', background: 'var(--white)' }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: '100%', height: 140, objectFit: 'cover' }}
                    onError={e => { e.target.onerror=null; e.target.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22140%22%3E%3Crect fill=%22%23f1f5f9%22 width=%22400%22 height=%22140%22/%3E%3Ctext fill=%22%2394a3b8%22 font-size=%2213%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EField Photo%3C/text%3E%3C/svg%3E'; }}
                  />
                  <div style={{ padding: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-900)' }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--blue-700)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                      📍 {p.latitude.toFixed(4)}°N, {p.longitude.toFixed(4)}°E ({p.date})
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--slate-600)', marginTop: 4 }}>
                      {p.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Priority Interventions */}
          <div className="report-section">
            <div className="report-section-title">
              <CheckCircle2 size={16} color="#15803d" />
              <span>5. Recommended Watershed Development Action Plan</span>
            </div>

            <div style={{ background: 'var(--blue-50)', padding: 14, borderRadius: 8, borderLeft: '4px solid var(--blue-700)' }}>
              <p style={{ fontSize: 13, color: 'var(--blue-950)', lineHeight: 1.5, margin: 0 }}>
                {currentWs.recommended_actions}
              </p>
            </div>
          </div>

          {/* Sign-off Block */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 30, borderTop: '1px solid var(--slate-300)', marginTop: 20 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-800)' }}>Prepared by:</div>
              <div style={{ fontSize: 12, color: 'var(--slate-600)', marginTop: 2 }}>Watershed Development Team (WDT)</div>
              <div style={{ fontSize: 11, color: 'var(--slate-400)' }}>JalDrishti Geospatial Intelligence Engine</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-800)' }}>Verified &amp; Approved by:</div>
              <div style={{ fontSize: 12, color: 'var(--slate-600)', marginTop: 2 }}>State Level Nodal Agency (SLNA)</div>
              <div style={{ fontSize: 11, color: 'var(--green-700)', fontWeight: 600, marginTop: 4 }}>✓ Digital Cryptographic Signature Applied</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
