import React from 'react';
import { 
  Layers, 
  Sprout, 
  Droplets, 
  Compass, 
  ExternalLink, 
  ShieldCheck,
  PieChart,
  BarChart3
} from 'lucide-react';
import { NRSC_LULC_CLASSES, NATIONAL_LULC_DISTRIBUTION } from '../../data/lulcClassifications';

export default function LandUseLandCoverView({ 
  selectedWatershed, 
  watersheds = [], 
  onSelectWatershed 
}) {
  const currentLulc = selectedWatershed?.lulc_breakdown || {
    forest: 21.8,
    agriculture: 54.2,
    grassland: 9.4,
    water: 5.6,
    builtup: 4.8,
    barren: 4.2
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--green-100)', color: 'var(--green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={18} />
          </div>
          <div>
            <div className="panel-title">Land Use / Land Cover (LULC)</div>
            <div className="panel-subtitle">NRSC 1:250,000 Thematic Classification</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Selected Watershed / National Scope Banner */}
        <div style={{ background: 'var(--green-50)', border: '1px solid var(--green-200)', borderRadius: 'var(--radius-lg)', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-900)', textTransform: 'uppercase' }}>
              {selectedWatershed ? `Scope: ${selectedWatershed.name}` : 'Scope: All-India Average Baseline'}
            </span>
            {selectedWatershed && (
              <span style={{ fontSize: 11, color: 'var(--green-700)', fontWeight: 600 }}>
                Area: {selectedWatershed.area_sqkm} km²
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: 'var(--green-950)', marginTop: 4 }}>
            {selectedWatershed 
              ? `Biophysical distribution of land classifications across ${selectedWatershed.district}, ${selectedWatershed.state}.`
              : 'Showing aggregated national land use distribution derived from Bhuvan multi-temporal thematic surveys.'}
          </div>
        </div>

        {/* LULC Distribution Visual Bars */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 12, textTransform: 'uppercase' }}>
            Class-wise Area Distribution
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NATIONAL_LULC_DISTRIBUTION.map(item => {
              const wsPct = selectedWatershed 
                ? (item.name.includes('Agri') ? currentLulc.agriculture :
                   item.name.includes('Forest') ? currentLulc.forest :
                   item.name.includes('Grass') ? currentLulc.grassland :
                   item.name.includes('Water') ? currentLulc.water :
                   item.name.includes('Built') ? currentLulc.builtup : currentLulc.barren)
                : item.pct;

              return (
                <div key={item.name} style={{ background: 'var(--white)', border: '1px solid var(--slate-200)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 12, height: 12, borderRadius: 3, background: item.color }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--slate-800)' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                      {wsPct}%
                    </span>
                  </div>

                  {/* Progress fill */}
                  <div style={{ width: '100%', height: 8, background: 'var(--slate-100)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${wsPct}%`, height: '100%', background: item.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NRSC Classification Standard Legend Card */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 10, textTransform: 'uppercase' }}>
            NRSC Standard Thematic Classes
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {NRSC_LULC_CLASSES.slice(0, 6).map(cls => (
              <div key={cls.id} style={{ display: 'flex', gap: 10, padding: 10, background: 'var(--slate-50)', borderRadius: 8, border: '1px solid var(--slate-200)' }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: cls.color, marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-900)' }}>{cls.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--slate-600)', marginTop: 2 }}>{cls.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Bhuvan WMS Notice */}
        <div style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: 'var(--radius-md)', padding: 12, display: 'flex', gap: 10 }}>
          <ShieldCheck size={20} color="#0284c7" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: 'var(--blue-900)', lineHeight: 1.4 }}>
            <b>Official WMS Service:</b> Enable the <i>"Bhuvan LULC WMS (NRSC)"</i> toggle on the main map top-right controls to overlay official national raster tiles.
          </div>
        </div>
      </div>
    </div>
  );
}
