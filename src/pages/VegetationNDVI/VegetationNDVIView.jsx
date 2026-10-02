import React from 'react';
import { 
  Sprout, 
  TrendingUp, 
  Leaf, 
  Calendar, 
  ShieldCheck, 
  Activity,
  Layers
} from 'lucide-react';
import { NATIONAL_WATERSHED_METRICS } from '../../data/nationalStats';

export default function VegetationNDVIView({ selectedWatershed }) {
  const trends = NATIONAL_WATERSHED_METRICS.monthly_ndvi_trends;

  const vegDist = [
    { label: 'Dense Canopy (NDVI > 0.6)', share: 34, color: '#1b4332', desc: 'Protected forest reserve, horticulture & irrigated double crops' },
    { label: 'Moderate Canopy (NDVI 0.35 - 0.6)', share: 44, color: '#40916c', desc: 'Rainfed agricultural cropland & open deciduous forest' },
    { label: 'Low / Sparse Cover (NDVI < 0.35)', share: 22, color: '#86efac', desc: 'Grassland scrub, fallow agricultural parcels & ridge wastelands' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--green-100)', color: 'var(--green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={18} />
          </div>
          <div>
            <div className="panel-title">Vegetation &amp; NDVI Analysis</div>
            <div className="panel-subtitle">Normalized Difference Vegetation Index Dynamics</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Scope Banner */}
        <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 'var(--radius-lg)', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-900)', textTransform: 'uppercase' }}>
              {selectedWatershed ? `Vegetation Status: ${selectedWatershed.name}` : 'National Vegetation Baseline (AWiFS / LISS-III)'}
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--green-800)', fontFamily: 'var(--font-mono)' }}>
              Mean NDVI: {selectedWatershed ? selectedWatershed.ndvi_mean : '0.68'}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--green-950)', marginTop: 4 }}>
            Multi-spectral vegetation index derived to assess crop vigor, biomass accumulation, and afforestation survival across watershed micro-catchments.
          </div>
        </div>

        {/* Temporal Monthly NDVI Comparison Chart (SVG) */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', textTransform: 'uppercase' }}>
              Temporal NDVI Trend (Pre vs Post Intervention)
            </span>
            <div style={{ display: 'flex', gap: 10, fontSize: 11 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 3, background: '#94a3b8' }} />
                <span>Pre-Intervention</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 3, background: '#16a34a' }} />
                <span style={{ color: '#16a34a', fontWeight: 600 }}>Post-Intervention</span>
              </span>
            </div>
          </div>

          {/* SVG Multi-month Bar/Line Graph */}
          <div style={{ display: 'flex', alignItems: 'flex-end', height: 140, gap: 6, paddingTop: 20, borderBottom: '1px solid var(--slate-200)' }}>
            {trends.map(t => {
              const heightPre = t.pre_treatment * 130;
              const heightPost = t.post_treatment * 130;

              return (
                <div key={t.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 110 }}>
                    <div style={{ width: 8, height: `${heightPre}px`, background: '#cbd5e1', borderRadius: '2px 2px 0 0' }} title={`Pre: ${t.pre_treatment}`} />
                    <div style={{ width: 8, height: `${heightPost}px`, background: '#40916c', borderRadius: '2px 2px 0 0' }} title={`Post: ${t.post_treatment}`} />
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--slate-600)', fontWeight: 500 }}>{t.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Canopy Density Distribution */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 10, textTransform: 'uppercase' }}>
            Canopy Density &amp; Biomass Zonation
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {vegDist.map((vd, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: vd.color }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-900)' }}>{vd.label}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: vd.color, fontFamily: 'var(--font-mono)' }}>
                    {vd.share}%
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--slate-600)', marginTop: 4 }}>
                  {vd.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
