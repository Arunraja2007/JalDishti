import React from 'react';
import { 
  Compass, 
  MapPin, 
  Droplets, 
  Camera, 
  Sprout, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Satellite,
  Brain,
  Activity,
  BarChart3,
  FileSearch
} from 'lucide-react';
import { NATIONAL_WATERSHED_METRICS } from '../../data/nationalStats';

export default function DashboardView({ 
  watersheds = [], 
  onSelectWatershed, 
  onNavigateToTab 
}) {
  const m = NATIONAL_WATERSHED_METRICS.summary_metrics;
  const sd = NATIONAL_WATERSHED_METRICS.srishti_drishti;
  const pr = NATIONAL_WATERSHED_METRICS.predictive_risk;
  const gi = NATIONAL_WATERSHED_METRICS.geo_image_analysis;

  const criticalWatersheds = watersheds.filter(w => w.priority_level === 'Critical' || w.priority_level === 'High');

  const riskPct = {
    high: ((pr.high_risk_count / pr.total_projects_scored) * 100).toFixed(1),
    medium: ((pr.medium_risk_count / pr.total_projects_scored) * 100).toFixed(1),
    low: ((pr.low_risk_count / pr.total_projects_scored) * 100).toFixed(1),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Top Sticky Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--green-100)', color: 'var(--green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Compass size={18} />
          </div>
          <div>
            <div className="panel-title">National Watershed Dashboard</div>
            <div className="panel-subtitle">SRISHTI-DRISHTI Platform · PMKSY-WDC 2.0</div>
          </div>
        </div>
        <span style={{ fontSize: 10, background: 'var(--blue-50)', color: 'var(--blue-800)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
          {NATIONAL_WATERSHED_METRICS.data_label}
        </span>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Metric Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <div className="kpi-card kpi-green">
            <div className="kpi-icon-wrap">
              <Compass size={18} />
            </div>
            <div className="kpi-content">
              <span className="kpi-label">Total Watersheds</span>
              <div className="kpi-value-row">
                <span className="kpi-value">{m.total_watersheds.toLocaleString()}</span>
                <span className="kpi-subtext">28 States</span>
              </div>
            </div>
          </div>

          <div className="kpi-card kpi-blue">
            <div className="kpi-icon-wrap">
              <Droplets size={18} />
            </div>
            <div className="kpi-content">
              <span className="kpi-label">Monitored Water Bodies</span>
              <div className="kpi-value-row">
                <span className="kpi-value">{m.monitored_waterbodies.toLocaleString()}</span>
                <span className="kpi-subtext">Tanks & Dams</span>
              </div>
            </div>
          </div>

          <div className="kpi-card kpi-blue">
            <div className="kpi-icon-wrap">
              <Camera size={18} />
            </div>
            <div className="kpi-content">
              <span className="kpi-label">Geo-coded Photos</span>
              <div className="kpi-value-row">
                <span className="kpi-value">{m.geocoded_images.toLocaleString()}</span>
                <span className="kpi-subtext">DRISHTI Tags</span>
              </div>
            </div>
          </div>

          <div className="kpi-card kpi-green">
            <div className="kpi-icon-wrap">
              <Sprout size={18} />
            </div>
            <div className="kpi-content">
              <span className="kpi-label">Mean Veg Index (NDVI)</span>
              <div className="kpi-value-row">
                <span className="kpi-value">{m.avg_vegetation_index}</span>
                <span className="kpi-subtext">+18% Gain</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SRISHTI-DRISHTI Platform Summary (PDF 26015) ── */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a, #0c4a6e)', borderRadius: 'var(--radius-lg)', padding: 16, color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Satellite size={16} color="#38bdf8" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              SRISHTI-DRISHTI Platform · {sd.satellite_resolution_m}m Satellite Data
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {[
              { label: 'Geo-images Interpreted', value: sd.geocoded_images_interpreted.toLocaleString(), sub: 'spatially analysed' },
              { label: 'Thematic Maps Generated', value: sd.thematic_maps_generated.toLocaleString(), sub: 'LULC + Drainage + NDVI' },
              { label: 'Change Detection Sites', value: sd.change_detection_sites, sub: 'before/after validated' },
              { label: 'Interpretation Accuracy', value: `${sd.spatial_interpretation_accuracy_pct}%`, sub: 'Kappa: 0.87' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#f0f9ff', fontFamily: 'var(--font-display)' }}>{s.value}</div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          {/* Thematic output type mini bars */}
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Thematic Output Distribution</div>
            {sd.thematic_output_types.map(t => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 11, color: '#cbd5e1', flex: 1 }}>{t.name}</div>
                <div style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${(t.count / sd.land_use_maps_produced) * 100}%`, height: '100%', background: t.color, borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'var(--font-mono)', width: 40, textAlign: 'right' }}>{t.count.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AI Predictive Risk Scoring (PDF 25017) ── */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Brain size={16} color="#7c3aed" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-800)', textTransform: 'uppercase' }}>
              AI Risk Assessment · {pr.model_name}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 10, background: '#ede9fe', color: '#6d28d9', padding: '2px 7px', borderRadius: 4, fontWeight: 700 }}>
              Model Accuracy: {pr.model_accuracy_pct}%
            </span>
          </div>

          {/* Risk Distribution Bar */}
          <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', gap: 2, marginBottom: 10 }}>
            <div title={`High Risk: ${riskPct.high}%`} style={{ flex: pr.high_risk_count, background: '#dc2626' }} />
            <div title={`Medium Risk: ${riskPct.medium}%`} style={{ flex: pr.medium_risk_count, background: '#f59e0b' }} />
            <div title={`Low Risk: ${riskPct.low}%`} style={{ flex: pr.low_risk_count, background: '#22c55e' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
            {[
              { label: 'High Risk', count: pr.high_risk_count, pct: riskPct.high, bg: '#fee2e2', color: '#991b1b', dot: '#dc2626' },
              { label: 'Medium Risk', count: pr.medium_risk_count, pct: riskPct.medium, bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
              { label: 'Low Risk', count: pr.low_risk_count, pct: riskPct.low, bg: '#dcfce7', color: '#166534', dot: '#22c55e' },
            ].map(r => (
              <div key={r.label} style={{ background: r.bg, border: `1px solid ${r.dot}33`, borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: r.color, fontFamily: 'var(--font-display)' }}>{r.count.toLocaleString()}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: r.color, textTransform: 'uppercase' }}>{r.label}</div>
                <div style={{ fontSize: 10, color: r.dot, fontWeight: 600 }}>{r.pct}%</div>
              </div>
            ))}
          </div>

          {/* Top Delay Factors */}
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate-600)', textTransform: 'uppercase', marginBottom: 6 }}>Top Delay Risk Factors</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {pr.top_delay_factors.map(f => (
              <div key={f.factor} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: f.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: 'var(--slate-700)', flex: 1 }}>{f.factor}</span>
                <div style={{ width: 80, height: 5, background: 'var(--slate-100)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${f.weight_pct * 3}%`, height: '100%', background: f.color, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: f.color, width: 28, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{f.weight_pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Geo-image Interpretation Analytics (PDF 26015) ── */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <FileSearch size={16} color="#0284c7" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-800)', textTransform: 'uppercase' }}>
              Geo-Image Spatial Interpretation Analytics
            </span>
          </div>

          {/* Confidence Score Donut-style bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
            {[
              { label: 'High Confidence', pct: gi.confidence_high_pct, color: '#16a34a', bg: '#dcfce7' },
              { label: 'Medium Confidence', pct: gi.confidence_medium_pct, color: '#ca8a04', bg: '#fef9c3' },
              { label: 'Low / Review', pct: gi.confidence_low_pct, color: '#dc2626', bg: '#fee2e2' },
            ].map(c => (
              <div key={c.label} style={{ background: c.bg, borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: c.color, fontFamily: 'var(--font-display)' }}>{c.pct}%</div>
                <div style={{ fontSize: 10, color: c.color, fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.2 }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* Interpretation methods */}
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate-600)', textTransform: 'uppercase', marginBottom: 6 }}>Analysis Methods Used</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {gi.interpretation_methods.map(m => (
              <div key={m.method} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: 'var(--slate-700)', flex: 1 }}>{m.method}</span>
                <div style={{ width: 80, height: 5, background: 'var(--slate-100)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${(m.images / gi.total_interpreted) * 100}%`, height: '100%', background: m.color, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, color: 'var(--slate-500)', width: 42, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{m.images.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
            {[
              { label: 'Auto-Validated', val: gi.auto_validated.toLocaleString(), color: 'var(--green-700)' },
              { label: 'Pending Review', val: gi.pending_human_review.toLocaleString(), color: '#ca8a04' },
              { label: 'Poor Quality', val: gi.rejected_poor_quality.toLocaleString(), color: '#dc2626' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 6, padding: '8px 10px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--slate-500)', fontWeight: 600, textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas Requiring Attention Alert Card */}
        <div style={{
          background: 'linear-gradient(135deg, #fff7ed, #fef2f2)',
          border: '1px solid #fecaca',
          borderRadius: 'var(--radius-lg)',
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#991b1b' }}>
                {m.priority_attention_areas.toLocaleString()} Critical Watershed Units
              </div>
              <div style={{ fontSize: 12, color: '#7f1d1d', marginTop: 2 }}>
                High soil erosion (&gt;15 t/ha/yr) & depleted groundwater needing immediate PMKSY intervention.
              </div>
            </div>
          </div>
          <button 
            className="btn-outline" 
            style={{ borderColor: '#fca5a5', color: '#991b1b', padding: '6px 12px', fontSize: 12 }}
            onClick={() => onNavigateToTab('explorer')}
          >
            <span>Filter</span>
          </button>
        </div>

        {/* Priority Focus Watersheds List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', textTransform: 'uppercase' }}>
              Priority Watershed Units
            </span>
            <button 
              onClick={() => onNavigateToTab('explorer')} 
              style={{ background: 'none', border: 'none', color: 'var(--green-700)', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <span>View All ({watersheds.length})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {watersheds.slice(0, 5).map(ws => (
              <div
                key={ws.id}
                onClick={() => onSelectWatershed(ws)}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--green-400)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--slate-200)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-900)' }}>
                    {ws.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--slate-500)', marginTop: 2 }}>
                    📍 {ws.district}, {ws.state} • Area: {ws.area_sqkm} km²
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{
                    background: ws.priority_level === 'Critical' ? '#fee2e2' : (ws.priority_level === 'High' ? '#ffedd5' : '#dcfce7'),
                    color: ws.priority_level === 'Critical' ? '#991b1b' : (ws.priority_level === 'High' ? '#9a3412' : '#166534'),
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 4
                  }}>
                    {ws.priority_level}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--blue-700)', fontWeight: 600 }}>
                    NDVI {ws.ndvi_mean}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basin Level Statistics Summary with Risk Scores */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 10, textTransform: 'uppercase' }}>
            Major River Basin — Hydrological & Risk Profile
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {NATIONAL_WATERSHED_METRICS.basin_breakdown.slice(0, 6).map((b, idx) => (
              <div key={idx} style={{ background: 'var(--slate-50)', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--slate-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <span style={{ fontWeight: 600, color: 'var(--slate-800)' }}>{b.basin}</span>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--slate-600)' }}>
                  <span><b>{b.count}</b> Units</span>
                  <span>NDVI: <b style={{ color: 'var(--green-700)' }}>{b.avg_ndvi}</b></span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: 4,
                    background: b.risk_score > 70 ? '#fee2e2' : b.risk_score > 50 ? '#fef3c7' : '#dcfce7',
                    color: b.risk_score > 70 ? '#991b1b' : b.risk_score > 50 ? '#92400e' : '#166534',
                  }}>
                    Risk: {b.risk_score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SRISHTI-DRISHTI Attribution Box (PDF 26015) */}
        <div style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: 8, padding: 12, display: 'flex', gap: 10 }}>
          <ShieldCheck size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 11, color: 'var(--blue-900)', lineHeight: 1.5 }}>
            <b>Data Source:</b> Satellite imagery from SRISHTI-DRISHTI platform (AWiFS/LISS-III, 30m resolution). Geo-coded images integrated with thematic GIS layers for spatial interpretation of watershed interventions per SIH Problem Statement <b>26015</b>. AI risk model per <b>25017</b>. Digitization pipeline per <b>26016 & 26018</b>.
          </div>
        </div>
      </div>
    </div>
  );
}
