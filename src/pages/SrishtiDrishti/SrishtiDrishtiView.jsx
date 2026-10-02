import React, { useState } from 'react';
import {
  Satellite,
  Layers,
  Sprout,
  Droplets,
  MapPin,
  Camera,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  SplitSquareVertical,
  CheckCircle2,
  Activity,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileSearch,
} from 'lucide-react';
import {
  SRISHTI_PLATFORM_INFO,
  THEMATIC_OUTPUTS,
  SPATIAL_INTERPRETATION_WORKFLOW,
  INTERPRETATION_CASE_STUDIES,
} from '../../data/srishtiDrishtiData';
import { NATIONAL_WATERSHED_METRICS } from '../../data/nationalStats';

const ICON_MAP = {
  Layers: Layers,
  Droplets: Droplets,
  Sprout: Sprout,
  MapPin: MapPin,
  SplitSquareVertical: SplitSquareVertical,
  Camera: Camera,
  Satellite: Satellite,
  ShieldCheck: ShieldCheck,
  TrendingUp: TrendingUp,
  BarChart3: BarChart3,
};

export default function SrishtiDrishtiView({ selectedWatershed }) {
  const [activeOutput, setActiveOutput] = useState(THEMATIC_OUTPUTS[0].id);
  const [expandedCase, setExpandedCase] = useState('CS-01');
  const sd = NATIONAL_WATERSHED_METRICS.srishti_drishti;
  const gi = NATIONAL_WATERSHED_METRICS.geo_image_analysis;

  const activeThematic = THEMATIC_OUTPUTS.find((t) => t.id === activeOutput);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Sticky Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: '#0c4a6e',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Satellite size={18} />
          </div>
          <div>
            <div className="panel-title">SRISHTI-DRISHTI Spatial Analysis</div>
            <div className="panel-subtitle">
              Geo-Coded Image Interpretation · {sd.satellite_resolution_m}m Satellite Resolution
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: 10,
            background: '#dbeafe',
            color: '#1e40af',
            padding: '2px 8px',
            borderRadius: 4,
            fontWeight: 700,
          }}
        >
          SIH #26015
        </span>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Platform Info Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: 16,
            color: '#fff',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <Satellite size={22} color="#38bdf8" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#f0f9ff', marginBottom: 2 }}>
                {SRISHTI_PLATFORM_INFO.full_name}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.4 }}>
                {SRISHTI_PLATFORM_INFO.purpose}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {SRISHTI_PLATFORM_INFO.sensors.map((s) => (
              <span
                key={s}
                style={{
                  background: 'rgba(56,189,248,0.15)',
                  border: '1px solid rgba(56,189,248,0.3)',
                  color: '#7dd3fc',
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '2px 8px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {[
              { label: 'Images Interpreted', val: sd.geocoded_images_interpreted.toLocaleString() },
              { label: 'Thematic Maps Generated', val: sd.thematic_maps_generated.toLocaleString() },
              { label: 'Change Detection Sites', val: sd.change_detection_sites },
              { label: 'Interpretation Accuracy', val: `${sd.spatial_interpretation_accuracy_pct}%` },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 6,
                  padding: '8px 10px',
                }}
              >
                <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-display)' }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Thematic Output Types (PDF 26015 – Expected Solutions a-g) */}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--slate-800)',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Thematic Map & Visualization Products
          </div>

          {/* Tab Pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {THEMATIC_OUTPUTS.map((t) => {
              const Icon = ICON_MAP[t.icon] || Layers;
              const isActive = activeOutput === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveOutput(t.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: isActive ? t.color : 'var(--white)',
                    color: isActive ? '#fff' : 'var(--slate-600)',
                    border: isActive ? `1px solid ${t.color}` : '1px solid var(--slate-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: '5px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={12} />
                  {t.name.split('(')[0].trim()}
                </button>
              );
            })}
          </div>

          {/* Active Thematic Output Detail */}
          {activeThematic && (
            <div
              style={{
                background: 'var(--white)',
                border: `1px solid var(--slate-200)`,
                borderLeft: `4px solid ${activeThematic.color}`,
                borderRadius: 'var(--radius-lg)',
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--slate-900)' }}>{activeThematic.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--slate-600)', marginTop: 3, lineHeight: 1.4 }}>
                    {activeThematic.description}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: activeThematic.color, fontFamily: 'var(--font-display)' }}>
                    {activeThematic.count.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--slate-500)', fontWeight: 600, textTransform: 'uppercase' }}>maps produced</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                  { label: 'Analysis Method', val: activeThematic.method },
                  { label: 'Satellite Resolution', val: activeThematic.resolution },
                ].map((m) => (
                  <div key={m.label} style={{ background: 'var(--slate-50)', borderRadius: 6, padding: '8px 10px' }}>
                    <div style={{ fontSize: 9, color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--slate-800)', fontWeight: 600, lineHeight: 1.3 }}>{m.val}</div>
                  </div>
                ))}
              </div>

              {/* Accuracy Meter */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, color: 'var(--slate-600)', marginBottom: 4 }}>
                  <span>Thematic Accuracy</span>
                  <span style={{ color: activeThematic.color, fontFamily: 'var(--font-mono)' }}>{activeThematic.accuracy_pct}%</span>
                </div>
                <div style={{ width: '100%', height: 8, background: 'var(--slate-100)', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${activeThematic.accuracy_pct}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${activeThematic.color}99, ${activeThematic.color})`,
                      borderRadius: 4,
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
              </div>

              {/* Classification Parameters */}
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: 5 }}>
                Classified Parameters
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {activeThematic.parameters.map((p) => (
                  <span
                    key={p}
                    style={{
                      background: `${activeThematic.color}18`,
                      border: `1px solid ${activeThematic.color}33`,
                      color: activeThematic.color,
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '2px 7px',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Spatial Interpretation Workflow (PDF 26015 – Methodology) */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-800)', textTransform: 'uppercase', marginBottom: 10 }}>
            Spatial Interpretation Workflow
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SPATIAL_INTERPRETATION_WORKFLOW.map((step, idx) => {
              const Icon = ICON_MAP[step.icon] || Activity;
              return (
                <div
                  key={step.step}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--slate-200)',
                    borderRadius: 8,
                    padding: '12px 14px',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    position: 'relative',
                  }}
                >
                  {/* Step number + connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: step.color,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {step.step}
                    </div>
                    {idx < SPATIAL_INTERPRETATION_WORKFLOW.length - 1 && (
                      <div style={{ width: 2, flex: 1, minHeight: 14, background: 'var(--slate-200)', marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <Icon size={13} color={step.color} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-900)' }}>{step.title}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--slate-600)', lineHeight: 1.4, marginBottom: 5 }}>
                      {step.desc}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: step.color,
                        fontWeight: 600,
                        background: `${step.color}12`,
                        border: `1px solid ${step.color}30`,
                        borderRadius: 4,
                        padding: '2px 8px',
                        display: 'inline-block',
                      }}
                    >
                      ▸ Output: {step.output}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Case Studies (PDF 26015 – Expected Solutions) */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-800)', textTransform: 'uppercase', marginBottom: 10 }}>
            Spatial Interpretation Case Studies
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {INTERPRETATION_CASE_STUDIES.map((cs) => {
              const isExpanded = expandedCase === cs.id;
              return (
                <div
                  key={cs.id}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--slate-200)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Case Header */}
                  <button
                    onClick={() => setExpandedCase(isExpanded ? null : cs.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-900)' }}>
                        {cs.site}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--slate-500)', marginTop: 2 }}>
                        📍 {cs.state} · {cs.analysis_type} · {cs.before_year} vs {cs.after_year}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: 10,
                          background: cs.confidence === 'High' ? '#dcfce7' : '#fef3c7',
                          color: cs.confidence === 'High' ? '#166534' : '#92400e',
                          border: `1px solid ${cs.confidence === 'High' ? '#86efac' : '#fcd34d'}`,
                          borderRadius: 4,
                          padding: '2px 6px',
                          fontWeight: 700,
                        }}
                      >
                        {cs.confidence} Confidence
                      </span>
                      {isExpanded ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
                    </div>
                  </button>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div style={{ borderTop: '1px solid var(--slate-100)', padding: '12px 14px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                        {[
                          { label: 'Satellite Data', val: cs.satellite_data },
                          { label: 'Intervention', val: cs.intervention },
                          { label: 'Geo-images Used', val: `${cs.geo_images_used} field photos` },
                          { label: 'GPS', val: `${cs.coordinates.lat}°N, ${cs.coordinates.lng}°E` },
                        ].map((m) => (
                          <div key={m.label} style={{ background: 'var(--slate-50)', borderRadius: 6, padding: '8px 10px' }}>
                            <div style={{ fontSize: 9, color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>{m.label}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-800)' }}>{m.val}</div>
                          </div>
                        ))}
                      </div>

                      {/* Findings Table */}
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: 6 }}>
                        Satellite-Derived Findings
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {cs.findings.map((f) => (
                          <div
                            key={f.metric}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 80px 80px 70px',
                              gap: 6,
                              fontSize: 11,
                              background: 'var(--slate-50)',
                              borderRadius: 6,
                              padding: '7px 10px',
                              alignItems: 'center',
                            }}
                          >
                            <span style={{ fontWeight: 600, color: 'var(--slate-800)' }}>{f.metric}</span>
                            <span style={{ color: '#dc2626', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                              {f.before} {f.unit}
                            </span>
                            <span style={{ color: '#16a34a', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                              {f.after} {f.unit}
                            </span>
                            <span style={{ fontWeight: 700, color: '#0284c7', fontSize: 11 }}>{f.change}</span>
                          </div>
                        ))}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 70px', gap: 6, fontSize: 9, color: 'var(--slate-400)', fontWeight: 700, padding: '0 10px', textTransform: 'uppercase' }}>
                          <span>Parameter</span><span>Before</span><span>After</span><span>Change</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Attribution */}
        <div
          style={{
            background: 'var(--blue-50)',
            border: '1px solid var(--blue-200)',
            borderRadius: 8,
            padding: 12,
            display: 'flex',
            gap: 10,
          }}
        >
          <ShieldCheck size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 11, color: 'var(--blue-900)', lineHeight: 1.5 }}>
            <b>Platform Reference:</b> SRISHTI-DRISHTI geospatial platform operated by{' '}
            <b>{SRISHTI_PLATFORM_INFO.organization}</b>. Analysis based on{' '}
            <b>{SRISHTI_PLATFORM_INFO.framework}</b>. All thematic outputs aligned with NRSC
            1:250K classification standards and field-validated via PMKSY DRISHTI geo-tagging
            protocol.
          </div>
        </div>
      </div>
    </div>
  );
}
