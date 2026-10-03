import React, { useState } from 'react';
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
  FileSearch,
  RefreshCw,
  Bell,
  ChevronRight,
  Radio,
  Cpu,
  Database,
  FlaskConical,
} from 'lucide-react';
import { NATIONAL_WATERSHED_METRICS } from '../../data/nationalStats';

/* ── Spacious Edition design tokens ──────────────────── */

const S = {
  /* layout */
  page:   { display:'flex', flexDirection:'column', height:'100%', overflowY:'auto', background:'#f4f6f3', fontFamily:"'Inter', system-ui, sans-serif" },
  inner:  { padding:'32px 28px 60px', display:'flex', flexDirection:'column', gap:36 },

  /* section heading — Times New Roman, authoritative government */
  sectionHead: {
    fontFamily:"'Times New Roman', Georgia, serif",
    fontSize:13,
    fontWeight:700,
    color:'#1b4332',
    textTransform:'uppercase',
    letterSpacing:'0.09em',
    marginBottom:18,
    paddingBottom:8,
    borderBottom:'2px solid #c8e6c9',
    display:'flex',
    alignItems:'center',
    gap:8,
  },

  /* cards — generous breathing room */
  card: {
    background:'#ffffff',
    border:'1px solid #e0e8e2',
    borderRadius:14,
    padding:'26px 26px',
    boxShadow:'0 2px 8px rgba(27,67,50,0.06)',
  },
  cardTight: {
    background:'#ffffff',
    border:'1px solid #e0e8e2',
    borderRadius:14,
    padding:'22px 24px',
    boxShadow:'0 2px 8px rgba(27,67,50,0.06)',
  },

  /* KPI telemetry card — expanded breathing room */
  kpi: {
    background:'#ffffff',
    border:'1px solid #e0e8e2',
    borderRadius:14,
    padding:'24px 22px 20px',
    boxShadow:'0 2px 8px rgba(27,67,50,0.06)',
    display:'flex',
    flexDirection:'column',
    gap:12,
  },

  /* table — spacious rows */
  th: { textAlign:'left', fontSize:10, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.07em', padding:'13px 16px', borderBottom:'2px solid #e2e8f0', whiteSpace:'nowrap' },
  td: { padding:'18px 16px', fontSize:12, color:'#1e293b', borderBottom:'1px solid #f1f5f9', verticalAlign:'middle' },
};

const WORKFLOW_STEPS = [
  { n:1, title:'Roster Inquiry', sub:'16.2k Field Auths', color:'#0284c7', icon:Database },
  { n:2, title:'Terrain & Bunds', sub:'4128 WDT Auths', color:'#2d6a4f', icon:Layers },
  { n:3, title:'Field Survey', sub:'DRISHTI, Multi-Modal', color:'#7c3aed', icon:Camera },
  { n:4, title:'Remediation', sub:'Contour Bund & C.', color:'#b45309', icon:FlaskConical },
  { n:5, title:'Post-Monsoon', sub:'4111 Seasonal Eval.', color:'#0369a1', icon:Activity },
  { n:6, title:'Impact Audit', sub:'National Grid', color:'#166534', icon:CheckCircle2 },
];

const DIRECTIVES = [
  { code:'DoLR/WDC/2024-129', title:'Post-Monsoon Watershed Monitoring - Reporting Mandate', date:'18 Oct 2025', type:'MANDATE & PROTOCOL' },
  { code:'NRSC-D/2024/0071', title:'SRISHTI Mandate Meeting Geo-Tag Validation in DRISHTI v4.3', date:'12 Oct 2025', type:'GUIDELINES & PROCEDURE' },
];

const GROUND_TRUTH = [
  {
    id:'GT-MH-21400',
    thumbnail:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2245%22%3E%3Crect fill=%22%2340916c%22 width=%2260%22 height=%2245%22 rx=%224%22/%3E%3Ctext fill=%22%23fff%22 font-size=%228%22 x=%2250%25%22 y=%2255%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EEarth%3C/text%3E%3C/svg%3E',
    structure:'Earthen Check Barrier 03',
    intervention:'Case: CCS-MH-P6-023',
    coords:'18°18\'11.4" N, 74°14\'52.0" E',
    sub:'(Catchment-3)',
    officer:'R K Kulkarni / WDT Auth-89',
    timestamp:'Today, 11:08',
    score:91,
    status:'AI Verified',
    color:'#16a34a',
  },
  {
    id:'GT-TN-06488',
    thumbnail:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2245%22%3E%3Crect fill=%22%230284c7%22 width=%2260%22 height=%2245%22 rx=%224%22/%3E%3Ctext fill=%22%23fff%22 font-size=%228%22 x=%2250%25%22 y=%2255%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EPond%3C/text%3E%3C/svg%3E',
    structure:'Percolation Tank – Village',
    intervention:'Case: TN-V-Pool-98',
    coords:'10°34\'58.4" N, 77°45\'11.8" E',
    sub:'(Sub-Block D)',
    officer:'Anita S Pillai (Asst',
    timestamp:'Today, 10:44',
    score:96,
    status:'AI Verified',
    color:'#16a34a',
  },
  {
    id:'GT-RJ-04392',
    thumbnail:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2245%22%3E%3Crect fill=%22%23b45309%22 width=%2260%22 height=%2245%22 rx=%224%22/%3E%3Ctext fill=%22%23fff%22 font-size=%228%22 x=%2250%25%22 y=%2255%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3ECCT%3C/text%3E%3C/svg%3E',
    structure:'Contour Trenches (CCT) Sector 4',
    intervention:'Case: RJ-Rd CCT-98H 411',
    coords:'25°10\'08.4" N, 73°36\'41.3" E',
    sub:'(Sub-Sector 2)',
    officer:'M.M. Shinde Sharmavar',
    timestamp:'Today, 09:15',
    score:87,
    status:'AI Verified',
    color:'#16a34a',
  },
  {
    id:'GT-MP-00391',
    thumbnail:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2245%22%3E%3Crect fill=%22%23475569%22 width=%2260%22 height=%2245%22 rx=%224%22/%3E%3Ctext fill=%22%23fff%22 font-size=%228%22 x=%2250%25%22 y=%2255%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EGully%3C/text%3E%3C/svg%3E',
    structure:'Gully Plug Intervention at Sub-',
    intervention:'Case: MP-I Gully-001',
    coords:'23°06\'54.6" N, 79°51\'00.8" E',
    sub:'(Sub-line 6)',
    officer:'Anita S Pillai (Asgt',
    timestamp:'Yesterday',
    score:72,
    status:'Needs Review',
    color:'#d97706',
  },
];

/* ── Circular confidence gauge ────────────────────────── */
function ConfidenceGauge({ pct, label, color }) {
  const r = 28, cx = 34, cy = 34;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      <svg width={68} height={68}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={6} />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={800} fill={color}>
          {pct}%
        </text>
      </svg>
      <span style={{ fontSize:10, color:'#64748b', fontWeight:600, textAlign:'center', lineHeight:1.2 }}>{label}</span>
    </div>
  );
}

/* ── Mini inline bar ─────────────────────────────────── */
function MiniBar({ pct, color }) {
  return (
    <div style={{ width:'100%', height:5, background:'#f1f5f9', borderRadius:3, overflow:'hidden' }}>
      <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:3 }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT – SPACIOUS EDITION
   ════════════════════════════════════════════════════════ */
export default function DashboardView({ watersheds = [], onSelectWatershed, onNavigateToTab }) {
  const m  = NATIONAL_WATERSHED_METRICS.summary_metrics;
  const sd = NATIONAL_WATERSHED_METRICS.srishti_drishti;
  const pr = NATIONAL_WATERSHED_METRICS.predictive_risk;
  const gi = NATIONAL_WATERSHED_METRICS.geo_image_analysis;
  const ds = NATIONAL_WATERSHED_METRICS.digitization_stats;
  const bb = NATIONAL_WATERSHED_METRICS.basin_breakdown;

  const riskPct = {
    high:   ((pr.high_risk_count   / pr.total_projects_scored) * 100).toFixed(1),
    medium: ((pr.medium_risk_count / pr.total_projects_scored) * 100).toFixed(1),
    low:    ((pr.low_risk_count    / pr.total_projects_scored) * 100).toFixed(1),
  };

  return (
    <div style={S.page}>

      {/* ── Sticky header ── */}
      <div style={{ position:'sticky', top:0, zIndex:10, background:'#ffffff', borderBottom:'1px solid #d0e8d8', padding:'12px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:'#d8f3dc', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Compass size={16} color="#1b4332" />
          </div>
          <div>
            <div style={{ fontFamily:"'Times New Roman', serif", fontSize:14, fontWeight:700, color:'#1b4332', letterSpacing:'0.02em' }}>Overview &amp; Dashboard</div>
            <div style={{ fontSize:10, color:'#64748b', marginTop:2 }}>SRISHTI-DRISHTI · PMKSY-WDC 2.0 · National Watershed Telemetry</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontFamily:'monospace', fontSize:10, color:'#0284c7', background:'#e0f2fe', border:'1px solid #bae6fd', padding:'3px 10px', borderRadius:5, fontWeight:700 }}>
            SRISHTI HOM NDVI 99.62
          </span>
          <span style={{ fontSize:10, background:'#d8f3dc', color:'#1b4332', padding:'3px 10px', borderRadius:5, fontWeight:700 }}>
            DEMO / PROTOTYPE
          </span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ padding:'10px 28px', display:'flex', alignItems:'center', gap:4, fontSize:10, color:'#94a3b8' }}>
        <span>Catchment-3</span><ChevronRight size={10} /><span>Sub-Ward-S</span><ChevronRight size={10} /><span style={{ color:'#1b4332', fontWeight:600 }}>Catalogued Plots</span>
      </div>

      <div style={S.inner}>

        {/* ══ SECTION 1: KPI TELEMETRY CARDS ══════════════════════ */}
        <div>
          <div style={S.sectionHead}>
            <BarChart3 size={13} color="#1b4332" />
            National Telemetry Overview
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:16 }}>
            {[
              { label:'Monitored Basins', value: m.total_watersheds.toLocaleString(), unit:'Units', sub:`${(m.total_treated_area_mha * 1000).toFixed(0)} Hectares Active Area`, icon:Compass, color:'#1b4332', bg:'#f0fdf4', border:'#a7f3d0' },
              { label:'Built Structures', value: m.water_harvesting_structures.toLocaleString(), unit:'Active', sub:'Check dams, ponds, trenches', icon:Layers, color:'#0369a1', bg:'#f0f9ff', border:'#bae6fd' },
              { label:'SRISHTI Satellite Prime', value:`${sd.spatial_interpretation_accuracy_pct}%`, unit:'Purity', sub:`${gi.spatial_accuracy_metrics.thematic_accuracy_pct}% at Model Confidence`, icon:Satellite, color:'#7c3aed', bg:'#faf5ff', border:'#ddd6fe' },
              { label:'DRISHTI Field Probes', value: m.geocoded_images.toLocaleString(), unit:'Geo-tags', sub:`${gi.auto_validated.toLocaleString()} Auto-verified`, icon:Camera, color:'#0284c7', bg:'#f0f9ff', border:'#bae6fd' },
              { label:'Improvement Capacity', value:`+${m.groundwater_recharge_potential_bcm} BCM`, unit:'Yr', sub:`+${(m.groundwater_recharge_potential_bcm * 0.88).toFixed(2)} MCM Live Surface Water`, icon:TrendingUp, color:'#166534', bg:'#f0fdf4', border:'#a7f3d0' },
            ].map(k => {
              const Icon = k.icon;
              return (
                <div key={k.label} style={{ ...S.kpi, borderColor: k.border, background: k.bg }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{ fontSize:10, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.07em' }}>{k.label}</div>
                    <div style={{ width:28, height:28, borderRadius:7, background:'#ffffff', border:`1px solid ${k.border}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon size={13} color={k.color} />
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:7, marginTop:2 }}>
                    <span style={{ fontFamily:"'Outfit', 'Times New Roman', serif", fontSize:30, fontWeight:800, color:k.color, lineHeight:1 }}>{k.value}</span>
                    <span style={{ fontSize:12, color:'#64748b', fontWeight:600 }}>{k.unit}</span>
                  </div>
                  <div style={{ fontSize:11, color:'#64748b', lineHeight:1.4, marginTop:2 }}>{k.sub}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ SECTION 2: OPERATIONAL WORKFLOW (WDC-Cycle) ═════════ */}
        <div>
          <div style={S.sectionHead}>
            <Activity size={13} color="#1b4332" />
            Operational Workflow (WDC-Cycle)
            <span style={{ marginLeft:'auto', fontSize:10, color:'#64748b', fontWeight:400, textTransform:'none', letterSpacing:'normal', fontFamily:'Inter, sans-serif' }}>
              SHG Stream-6-Phase · PMKSY/SDG
            </span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12 }}>
            {WORKFLOW_STEPS.map(step => {
              const Icon = step.icon;
              return (
                <div key={step.n} style={{ ...S.cardTight, borderLeft:`4px solid ${step.color}`, padding:'18px 18px', display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:step.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:13, fontWeight:800 }}>{step.n}</div>
                  <div style={{ paddingTop:2 }}>
                    <div style={{ fontFamily:"'Times New Roman', serif", fontSize:13, fontWeight:700, color:'#1e293b', marginBottom:4 }}>{step.title}</div>
                    <div style={{ fontSize:11, color:'#64748b' }}>{step.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ SECTION 3: TWO-COLUMN — SPATIAL SUMMARY + RISK MATRIX */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22, alignItems:'start' }}>

          {/* LEFT: Watershed Spatial Summary */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ ...S.card }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                <div style={{ fontFamily:"'Times New Roman', serif", fontSize:13, fontWeight:700, color:'#1b4332' }}>
                  Shivpanga Basin · Spatial Summary
                </div>
                <span style={{ fontFamily:'monospace', fontSize:9, background:'#f1f5f9', color:'#475569', padding:'3px 8px', borderRadius:4, border:'1px solid #e2e8f0' }}>
                  NEC-24.19°/Ref-V2
                </span>
              </div>

              {/* Overlay layer toggles */}
              <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:16 }}>
                {['River Waters','Catchment Bounds','Sub-Watershed','SRISHTI Geology'].map((lyr, i) => (
                  <label key={lyr} style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'#475569', cursor:'pointer', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:5, padding:'4px 10px' }}>
                    <input type="checkbox" defaultChecked={i < 2} style={{ width:10, height:10, accentColor:'#1b4332' }} />
                    {lyr}
                  </label>
                ))}
              </div>

              {/* Probe coordinates bar */}
              <div style={{ background:'#0f172a', borderRadius:7, padding:'10px 14px', marginBottom:16, display:'flex', gap:18, flexWrap:'wrap' }}>
                {[
                  { label:'LBL', val:'73°13\'22.2" N' },
                  { label:'LNG', val:'21°07\'48.4" E' },
                  { label:'ALT', val:'430.68 MSL' },
                  { label:'Cluster Pos', val:'3' },
                ].map(c => (
                  <div key={c.label}>
                    <div style={{ fontSize:8, color:'#64748b', textTransform:'uppercase' }}>{c.label}</div>
                    <div style={{ fontFamily:'monospace', fontSize:10, color:'#38bdf8', fontWeight:700 }}>{c.val}</div>
                  </div>
                ))}
              </div>

              {/* Basin priority list */}
              <div style={{ fontSize:11, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10 }}>Priority Watershed Units</div>
              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                {watersheds.slice(0, 4).map(ws => (
                  <div
                    key={ws.id}
                    onClick={() => onSelectWatershed(ws)}
                    style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 14px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:9, cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='#f0fdf4'; e.currentTarget.style.borderColor='#74c69d'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='#f8fafc'; e.currentTarget.style.borderColor='#e2e8f0'; }}
                  >
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:'#1e293b', fontFamily:"'Times New Roman', serif" }}>{ws.name}</div>
                      <div style={{ fontSize:10, color:'#64748b', marginTop:3 }}>📍 {ws.district}, {ws.state} · {ws.area_sqkm} km²</div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:5 }}>
                      <span style={{ fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:4,
                        background: ws.priority_level==='Critical'?'#fee2e2':ws.priority_level==='High'?'#ffedd5':'#dcfce7',
                        color:       ws.priority_level==='Critical'?'#991b1b':ws.priority_level==='High'?'#9a3412':'#166534' }}>
                        {ws.priority_level}
                      </span>
                      <span style={{ fontSize:10, fontFamily:'monospace', color:'#0369a1', fontWeight:600 }}>NDVI {ws.ndvi_mean}</span>
                    </div>
                  </div>
                ))}
                <button onClick={() => onNavigateToTab('explorer')} style={{ background:'none', border:'none', color:'#2d6a4f', fontSize:11, fontWeight:600, cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:5, padding:'8px 0' }}>
                  View all {watersheds.length} units <ArrowRight size={12} />
                </button>
              </div>

              {/* Drainage morphometry footer */}
              <div style={{ marginTop:18, borderTop:'1px solid #f1f5f9', paddingTop:14, display:'flex', gap:20, flexWrap:'wrap' }}>
                {[
                  { label:'Bifurcation 2.42' },
                  { label:'Density 2.18 km/km²' },
                  { label:'Circularity 0.68' },
                ].map(d => (
                  <div key={d.label} style={{ fontSize:10, color:'#64748b' }}>
                    <span style={{ color:'#1b4332', fontWeight:700, fontFamily:'monospace', fontSize:11 }}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: AI Risk Matrix + Directives */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

            {/* AI Risk Matrix */}
            <div style={{ ...S.card }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                <div style={{ fontFamily:"'Times New Roman', serif", fontSize:13, fontWeight:700, color:'#1b4332' }}>At Risk &amp; Situation Matrix</div>
                <Brain size={15} color="#7c3aed" />
              </div>

              {/* Risk count */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <span style={{ fontSize:11, color:'#475569' }}>Critical Escalation &amp; Situation</span>
                <span style={{ fontFamily:"'Outfit', serif", fontSize:17, fontWeight:800, color:'#991b1b' }}>{pr.high_risk_count.toLocaleString()} Basins</span>
              </div>

              {/* Tricolor bar */}
              <div style={{ display:'flex', height:10, borderRadius:5, overflow:'hidden', gap:1, marginBottom:10 }}>
                <div style={{ flex:pr.high_risk_count, background:'#dc2626' }} title={`High: ${riskPct.high}%`} />
                <div style={{ flex:pr.medium_risk_count, background:'#f59e0b' }} title={`Medium: ${riskPct.medium}%`} />
                <div style={{ flex:pr.low_risk_count, background:'#22c55e' }} title={`Low: ${riskPct.low}%`} />
              </div>
              <div style={{ display:'flex', gap:12, fontSize:10, marginBottom:18 }}>
                {[{l:'Low',pct:riskPct.low,c:'#16a34a'},{l:'Med',pct:riskPct.medium,c:'#d97706'},{l:'High',pct:riskPct.high,c:'#dc2626'}].map(r => (
                  <span key={r.l} style={{ color:r.c, fontWeight:700 }}>{r.l}: {r.pct}%</span>
                ))}
              </div>

              {/* CRITICAL INTERVENTION ALERT */}
              <div style={{ background:'#fef2f2', border:'2px solid #fca5a5', borderRadius:11, padding:'18px 18px', marginBottom:18 }}>
                <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:10 }}>
                  <AlertTriangle size={14} color="#dc2626" />
                  <span style={{ fontFamily:"'Times New Roman', serif", fontSize:11, fontWeight:700, color:'#991b1b', textTransform:'uppercase', letterSpacing:'0.05em' }}>Critical Intervention Alert</span>
                  <span style={{ marginLeft:'auto', fontSize:9, background:'#dc2626', color:'#fff', padding:'2px 7px', borderRadius:3, fontWeight:700 }}>0.78</span>
                </div>
                <div style={{ fontSize:11, color:'#7f1d1d', lineHeight:1.6, marginBottom:12 }}>
                  Catchment Sector 73 (Shivpanga): Elevated storm-runoff velocities detected, high probability of earthen bund breaching and breach.
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:10, color:'#991b1b', fontFamily:'monospace' }}>Match: 99-75% DIC COPY</span>
                  <span style={{ fontSize:10, background:'#dc2626', color:'#fff', padding:'3px 10px', borderRadius:4, fontWeight:700, cursor:'pointer' }}>Dispatch Team</span>
                </div>
              </div>

              {/* Deep Learning Geo Qualifier */}
              <div style={{ display:'flex', gap:18, alignItems:'center', padding:'14px 0', borderTop:'1px solid #f1f5f9', borderBottom:'1px solid #f1f5f9', marginBottom:18 }}>
                <ConfidenceGauge pct={gi.confidence_high_pct} label="Geo-Qualifier Confidence" color="#16a34a" />
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Times New Roman', serif", fontSize:12, fontWeight:700, color:'#1e293b', marginBottom:6 }}>Deep Learning Geo Qualifier</div>
                  <div style={{ fontSize:10, color:'#64748b', lineHeight:1.6 }}>
                    {gi.confidence_high_pct}% Classification Confidence from internal Geo-SRISHTI inferentials.
                  </div>
                </div>
              </div>

              {/* WDC-2.0 Basin Priority */}
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:10 }}>WDC-2.0 Basin Priority Index</div>
                {[
                  { label:'Shivpanga Composite', tier:'Tier 1 (High Priority)', color:'#dc2626' },
                  { label:'Drought Vulnerability', val:'0.64 (Severe)', color:'#ea580c' },
                  { label:'Deposition Trend', val:'-1.2k t / Yr (Intensifying)', color:'#d97706' },
                ].map(b => (
                  <div key={b.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:'1px solid #f8fafc' }}>
                    <span style={{ fontSize:11, color:'#475569' }}>{b.label}</span>
                    <span style={{ fontSize:10, fontWeight:700, color:b.color }}>{b.tier || b.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Directives & Circulars */}
            <div style={{ ...S.cardTight }}>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:16 }}>
                <Bell size={14} color="#1b4332" />
                <span style={{ fontFamily:"'Times New Roman', serif", fontSize:13, fontWeight:700, color:'#1b4332' }}>Directives &amp; Circulars</span>
              </div>
              {DIRECTIVES.map(d => (
                <div key={d.code} style={{ padding:'12px 0', borderBottom:'1px solid #f1f5f9', display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:'#2d6a4f', marginTop:5, flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:11, color:'#1e293b', fontWeight:600, lineHeight:1.5, marginBottom:4 }}>{d.title}</div>
                    <div style={{ fontSize:9, color:'#94a3b8', fontFamily:'monospace' }}>Dated: {d.date} · {d.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ SECTION 4: TELEMETRY CHARTS ROW ════════════════════ */}
        <div>
          <div style={S.sectionHead}>
            <Activity size={13} color="#1b4332" />
            Surface Runoff, Infiltration &amp; Satellite Telemetry
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>

            {/* Runoff + Infiltration bars */}
            <div style={{ ...S.card }}>
              <div style={{ fontFamily:"'Times New Roman', serif", fontSize:12, fontWeight:700, color:'#1b4332', marginBottom:4 }}>Surface Runoff &amp; Infiltration Rate</div>
              <div style={{ fontSize:10, color:'#64748b', marginBottom:14 }}>Annual surface runoff mm & (Terrain-specific) average infiltration values</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {NATIONAL_WATERSHED_METRICS.monthly_ndvi_trends.slice(0,6).map(t => (
                  <div key={t.month} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:10, color:'#64748b', width:24, flexShrink:0 }}>{t.month}</span>
                    <div style={{ flex:1, display:'flex', gap:3 }}>
                      <div style={{ flex: t.pre_treatment, height:14, background:'#b7e4c7', borderRadius:2 }} />
                      <div style={{ flex: t.post_treatment, height:14, background:'#2d6a4f', borderRadius:2, opacity:0.85 }} />
                    </div>
                    <span style={{ fontFamily:'monospace', fontSize:10, color:'#2d6a4f', fontWeight:700 }}>{t.post_treatment}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:14, marginTop:16, fontSize:10, color:'#64748b' }}>
                <span style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:10, height:8, background:'#b7e4c7', borderRadius:2 }} />Pre-treatment</span>
                <span style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:10, height:8, background:'#2d6a4f', borderRadius:2 }} />Post-treatment</span>
              </div>
              <div style={{ marginTop:14, fontSize:11, color:'#64748b' }}>
                Peak Retention: <b style={{ color:'#1b4332' }}>428.0</b> &nbsp;|&nbsp; Saturation Recharging: <b style={{ color:'#0369a1' }}>-22.48</b>
              </div>
            </div>

            {/* Satellite Telemetry Health */}
            <div style={{ ...S.card }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                <div style={{ fontFamily:"'Times New Roman', serif", fontSize:13, fontWeight:700, color:'#1b4332' }}>Satellite Telemetry Health (NRSC)</div>
                <Satellite size={14} color="#7c3aed" />
              </div>
              <div style={{ fontSize:10, color:'#64748b', marginBottom:18 }}>Parametric + geometric pulse/live satellite statistics</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[
                  { label:'Cartosat/DEM (Elevation)', val:'ACTIVE', pct:94, color:'#16a34a' },
                  { label:'CELIBRATE (95.81)', sub:'CELIBRATE (94.42)', val:'ACTIVE (LATENCY: 99s6)', pct:88, color:'#0284c7' },
                ].map(s => (
                  <div key={s.label} style={{ background:'#f8fafc', borderRadius:9, padding:'12px 14px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'#475569', marginBottom:8 }}>
                      <span style={{ fontFamily:'monospace', fontWeight:600 }}>{s.label}</span>
                      <span style={{ color:s.color, fontWeight:700 }}>{s.val}</span>
                    </div>
                    <MiniBar pct={s.pct} color={s.color} />
                    {s.sub && <div style={{ fontSize:9, color:'#94a3b8', marginTop:5, fontFamily:'monospace' }}>{s.sub}</div>}
                  </div>
                ))}
              </div>

              {/* Confidence score grid */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10, marginTop:16 }}>
                {[
                  { label:'Auto-Validated', val:gi.auto_validated.toLocaleString(), color:'#16a34a', bg:'#f0fdf4' },
                  { label:'Pending Review', val:gi.pending_human_review.toLocaleString(), color:'#d97706', bg:'#fffbeb' },
                  { label:'Low Quality', val:gi.rejected_poor_quality.toLocaleString(), color:'#dc2626', bg:'#fef2f2' },
                ].map(s => (
                  <div key={s.label} style={{ background:s.bg, borderRadius:9, padding:'12px 8px', textAlign:'center' }}>
                    <div style={{ fontFamily:"'Outfit', serif", fontSize:18, fontWeight:800, color:s.color }}>{s.val}</div>
                    <div style={{ fontSize:9, color:s.color, fontWeight:700, textTransform:'uppercase', lineHeight:1.2, marginTop:3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:10, color:'#94a3b8', marginTop:12, fontFamily:'monospace' }}>
                Next Policy: 34118 361 (Cartosat-3) · NRG Priority
              </div>
            </div>
          </div>
        </div>

        {/* ══ SECTION 5: GROUND TRUTH INGESTION TABLE ════════════ */}
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
            <div style={{ ...S.sectionHead, marginBottom:0 }}>
              <Radio size={13} color="#1b4332" />
              Recent Ground Truth Ingestions (DRISHTI Stream)
            </div>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <span style={{ fontSize:10, background:'#f1f5f9', border:'1px solid #e2e8f0', color:'#64748b', padding:'4px 12px', borderRadius:5, fontFamily:'monospace' }}>● All pending in queue</span>
              <button
                onClick={() => onNavigateToTab('geotagged')}
                style={{ background:'#1b4332', color:'#fff', border:'none', borderRadius:7, padding:'7px 16px', fontSize:11, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}
              >
                <RefreshCw size={11} /> Refresh Data
              </button>
            </div>
          </div>

          <div style={{ ...S.card, padding:0, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#f8fafc' }}>
                  {['Evidence','Structure / Intervention','Basin & Coordinates','Survey Officer','Timestamp (CST)','AI Verification','Actions'].map(h => (
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GROUND_TRUTH.map((row, i) => (
                  <tr key={row.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    {/* thumbnail */}
                    <td style={{ ...S.td, width:80 }}>
                      <img src={row.thumbnail} alt={row.structure} style={{ width:62, height:46, borderRadius:7, objectFit:'cover', display:'block' }} />
                    </td>
                    {/* structure */}
                    <td style={S.td}>
                      <div style={{ fontWeight:700, color:'#1e293b', marginBottom:4, fontSize:12 }}>{row.structure}</div>
                      <div style={{ fontSize:10, color:'#94a3b8', fontFamily:'monospace' }}>{row.intervention}</div>
                    </td>
                    {/* coords */}
                    <td style={S.td}>
                      <div style={{ fontFamily:'monospace', fontSize:10, color:'#0369a1', fontWeight:600 }}>{row.coords}</div>
                      <div style={{ fontSize:10, color:'#94a3b8', marginTop:3 }}>{row.sub}</div>
                    </td>
                    {/* officer */}
                    <td style={S.td}>
                      <div style={{ fontSize:11, color:'#334155' }}>{row.officer}</div>
                    </td>
                    {/* timestamp */}
                    <td style={{ ...S.td, whiteSpace:'nowrap' }}>
                      <div style={{ fontSize:11, color:'#475569' }}>{row.timestamp}</div>
                    </td>
                    {/* AI score */}
                    <td style={{ ...S.td, textAlign:'center' }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                        <span style={{ fontFamily:"'Outfit', serif", fontSize:17, fontWeight:800, color:row.color }}>{row.score}</span>
                        <span style={{ fontSize:9, fontWeight:700, color:'#fff', background:row.color, borderRadius:3, padding:'2px 7px' }}>{row.status}</span>
                      </div>
                    </td>
                    {/* actions */}
                    <td style={{ ...S.td, whiteSpace:'nowrap' }}>
                      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                        <button
                          onClick={() => onNavigateToTab('geotagged')}
                          style={{ background:'#ede9fe', color:'#6d28d9', border:'none', borderRadius:5, padding:'4px 12px', fontSize:10, fontWeight:700, cursor:'pointer' }}
                        >Inspect</button>
                        <button
                          onClick={() => onNavigateToTab('reports')}
                          style={{ background:'#f0fdf4', color:'#166534', border:'none', borderRadius:5, padding:'4px 12px', fontSize:10, fontWeight:700, cursor:'pointer' }}
                        >Escalate</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Table footer */}
            <div style={{ padding:'14px 22px', borderTop:'1px solid #f1f5f9', display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fafafa' }}>
              <span style={{ fontSize:10, color:'#94a3b8' }}>Displaying 4 of 4,340,581 live ground truth confidence records.</span>
              <div style={{ display:'flex', gap:10, fontSize:10, color:'#475569' }}>
                <span>Previous</span>
                <span style={{ fontFamily:'monospace' }}>Page 3 of 505,218</span>
                <span>Next</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ SECTION 6: BASIN RISK TABLE + ATTRIBUTION ══════════ */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:14 }}>
          <div style={{ ...S.card }}>
            <div style={S.sectionHead}>
              <Droplets size={13} color="#1b4332" />
              Major River Basin — Hydrological &amp; Risk Profile
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {bb.slice(0, 6).map((b, i) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 80px 80px 80px', gap:12, alignItems:'center', padding:'12px 16px', background: i%2===0?'#f8fafc':'#fff', borderRadius:9, border:'1px solid #f1f5f9' }}>
                  <span style={{ fontFamily:"'Times New Roman', serif", fontWeight:700, color:'#1e293b', fontSize:12 }}>{b.basin}</span>
                  <span style={{ fontSize:12, color:'#475569', textAlign:'center' }}><b>{b.count.toLocaleString()}</b><div style={{ fontSize:9, color:'#94a3b8' }}>Units</div></span>
                  <span style={{ textAlign:'center' }}>
                    <span style={{ fontFamily:'monospace', fontWeight:700, color:'#2d6a4f', fontSize:12 }}>{b.avg_ndvi}</span>
                    <div style={{ fontSize:9, color:'#94a3b8' }}>NDVI</div>
                  </span>
                  <span style={{ textAlign:'center' }}>
                    <span style={{ fontSize:12, fontWeight:700, padding:'4px 9px', borderRadius:5,
                      background: b.risk_score>70?'#fee2e2':b.risk_score>50?'#fef3c7':'#dcfce7',
                      color:       b.risk_score>70?'#991b1b':b.risk_score>50?'#92400e':'#166534' }}>
                      {b.risk_score}
                    </span>
                    <div style={{ fontSize:9, color:'#94a3b8', marginTop:3 }}>Risk</div>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attribution */}
          <div style={{ background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:11, padding:'18px 20px', display:'flex', gap:12 }}>
            <ShieldCheck size={17} color="#0284c7" style={{ flexShrink:0, marginTop:1 }} />
            <div style={{ fontSize:11, color:'#0c4a6e', lineHeight:1.7 }}>
              <b>Data Source — JalDrishti Intelligence Gateway:</b> Satellite imagery from SRISHTI-DRISHTI platform (AWiFS/LISS-III, 30m), Geo-coded images from PMKSY DRISHTI v4.3. AI risk analytics per SIH <b>25017</b>. Thematic mapping per <b>26015</b>. Digitization pipeline per <b>26016 &amp; 26018</b>. Platform: Department of Land Resources, DoLR / MoRD, Govt. of India.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
