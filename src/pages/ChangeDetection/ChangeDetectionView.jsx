import React, { useState } from 'react';
import { 
  SplitSquareVertical, 
  TrendingUp, 
  Droplets, 
  Sprout, 
  ShieldCheck, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { CHANGE_DETECTION_CASES } from '../../data/changeDetectionCases';

export default function ChangeDetectionView({ onFlyToLocation }) {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const activeCase = CHANGE_DETECTION_CASES[activeCaseIndex] || CHANGE_DETECTION_CASES[0];

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--blue-100)', color: 'var(--blue-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SplitSquareVertical size={18} />
          </div>
          <div>
            <div className="panel-title">Multi-Temporal Change Detection</div>
            <div className="panel-subtitle">Before vs After Intervention Impact Assessment</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Case Study Selector Pills */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          {CHANGE_DETECTION_CASES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setActiveCaseIndex(i); setSliderPos(50); }}
              style={{
                background: activeCaseIndex === i ? 'var(--green-700)' : 'var(--white)',
                color: activeCaseIndex === i ? 'var(--white)' : 'var(--slate-700)',
                border: activeCaseIndex === i ? '1px solid var(--green-800)' : '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-md)',
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {c.watershed_name.split(' ')[0]} ({c.timeline.before_year} vs {c.timeline.after_year})
            </button>
          ))}
        </div>

        {/* Case Title Card */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-800)', textTransform: 'uppercase' }}>
            {activeCase.watershed_name} ({activeCase.state})
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--slate-900)', marginTop: 4 }}>
            {activeCase.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--slate-600)', marginTop: 4 }}>
            Intervention Package: <b>{activeCase.intervention_type}</b>
          </div>
        </div>

        {/* Interactive Before / After Split Slider Card */}
        <div className="slider-compare-card">
          <div 
            className="slider-viewport"
            onMouseMove={handleSliderMove}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                setSliderPos((x / rect.width) * 100);
              }
            }}
          >
            {/* After Image (Full width underneath) */}
            <img src={activeCase.after_img} alt="Post-intervention evidence" className="slider-img" />

            {/* Before Image (Clipped overlay on top) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              overflow: 'hidden'
            }}>
              <img src={activeCase.before_img} alt="Pre-intervention evidence" className="slider-img" style={{ filter: 'grayscale(40%) contrast(90%)' }} />
            </div>

            {/* Split Divider Line */}
            <div className="slider-divider-line" style={{ left: `${sliderPos}%` }}>
              <div className="slider-handle-btn">
                <SplitSquareVertical size={16} />
              </div>
            </div>

            {/* Labels */}
            <div className="slider-label-pill label-before">
              ◀ BEFORE ({activeCase.timeline.before_year})
            </div>
            <div className="slider-label-pill label-after">
              AFTER ({activeCase.timeline.after_year}) ▶
            </div>
          </div>
          <div style={{ padding: '8px 12px', background: 'var(--slate-50)', textAlign: 'center', fontSize: 11, color: 'var(--slate-500)' }}>
            Drag or hover across the viewport to compare multi-temporal ground conditions
          </div>
        </div>

        {/* Quantitative Impact Gain Grid */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 10, textTransform: 'uppercase' }}>
            Quantitative Ground &amp; Satellite Impacts
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="stat-cell" style={{ borderLeft: '4px solid var(--green-600)' }}>
              <div className="stat-cell-label">Vegetation Canopy Gain</div>
              <div className="stat-cell-value" style={{ color: 'var(--green-800)' }}>+{activeCase.metrics.vegetation_gain_pct}%</div>
            </div>

            <div className="stat-cell" style={{ borderLeft: '4px solid var(--blue-600)' }}>
              <div className="stat-cell-label">Water Spread Area Increase</div>
              <div className="stat-cell-value" style={{ color: 'var(--blue-800)' }}>+{activeCase.metrics.water_spread_increase_pct}%</div>
            </div>

            <div className="stat-cell" style={{ borderLeft: '4px solid var(--earth-600)' }}>
              <div className="stat-cell-label">Topsoil Loss Reduction</div>
              <div className="stat-cell-value" style={{ color: '#b45309' }}>-{activeCase.metrics.soil_loss_reduction_pct}%</div>
            </div>

            <div className="stat-cell" style={{ borderLeft: '4px solid var(--blue-700)' }}>
              <div className="stat-cell-label">Groundwater Table Rise</div>
              <div className="stat-cell-value" style={{ color: 'var(--blue-900)' }}>+{activeCase.metrics.groundwater_rise_m} meters</div>
            </div>
          </div>
        </div>

        {/* Spatial Summary */}
        <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-900)', marginBottom: 4 }}>
            Spatial Interpretation Summary
          </div>
          <p style={{ fontSize: 12, color: 'var(--green-950)', lineHeight: 1.45, margin: 0 }}>
            {activeCase.spatial_summary}
          </p>
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--green-800)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} color="#16a34a" />
            <span>{activeCase.ground_verification_status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
