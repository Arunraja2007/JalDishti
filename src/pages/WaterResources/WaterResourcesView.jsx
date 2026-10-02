import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Waves, 
  MapPin, 
  ExternalLink, 
  Activity, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { MapService } from '../../services/mapService';

export default function WaterResourcesView({ onSelectWaterbody, onFlyToLocation }) {
  const [waterbodies, setWaterbodies] = useState([]);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [wb, str] = await Promise.all([
        MapService.loadWaterbodiesGeoJson(),
        MapService.loadStreamsGeoJson()
      ]);
      setWaterbodies(wb.features || []);
      setStreams(str.features || []);
    }
    loadData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--blue-100)', color: 'var(--blue-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Droplets size={18} />
          </div>
          <div>
            <div className="panel-title">Water Resources &amp; Hydrology</div>
            <div className="panel-subtitle">Surface Storage, Streams &amp; Recharge Units</div>
          </div>
        </div>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Hydrological Metrics Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          <div className="kpi-card kpi-blue">
            <div className="kpi-icon-wrap">
              <Droplets size={18} />
            </div>
            <div className="kpi-content">
              <span className="kpi-label">Surface Water Storage</span>
              <div className="kpi-value-row">
                <span className="kpi-value">3,140 TCM</span>
              </div>
            </div>
          </div>

          <div className="kpi-card kpi-blue">
            <div className="kpi-icon-wrap">
              <Waves size={18} />
            </div>
            <div className="kpi-content">
              <span className="kpi-label">Monitored Streams</span>
              <div className="kpi-value-row">
                <span className="kpi-value">{streams.length * 14} km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Surface Water Dynamics Box */}
        <div style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: 'var(--radius-lg)', padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={16} color="#0284c7" />
            <span>Seasonal Surface Water Dynamics (Pre vs Post Monsoon)</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--blue-950)', lineHeight: 1.5 }}>
            Watershed interventions across prototype sites have increased post-monsoon water spread area retention from <b>4.2 months</b> to <b>9.8 months</b>, drastically curtailing peak summer drinking water tanker dependencies.
          </p>
        </div>

        {/* Monitored Water Bodies Inventory */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 10, textTransform: 'uppercase' }}>
            Monitored Reservoirs &amp; Percolation Tanks ({waterbodies.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {waterbodies.map(f => {
              const p = f.properties;
              const coords = f.geometry.coordinates[0][0];

              return (
                <div
                  key={p.id}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--slate-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: 12,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => onFlyToLocation && onFlyToLocation({ lat: coords[1], lng: coords[0] })}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--blue-400)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--slate-200)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: 10, background: 'var(--blue-50)', color: 'var(--blue-800)', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                        {p.type}
                      </span>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-900)', marginTop: 4 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--slate-500)', marginTop: 2 }}>
                        📍 {p.watershed_name} ({p.state})
                      </div>
                    </div>

                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-700)', fontFamily: 'var(--font-mono)' }}>
                      {p.current_water_level_pct}% Full
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, background: 'var(--slate-50)', padding: 6, borderRadius: 6, fontSize: 11 }}>
                    <div>Spread Area: <b>{p.water_spread_area_ha} Ha</b></div>
                    <div>Capacity: <b>{p.storage_capacity_tcm} TCM</b></div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, fontSize: 11 }}>
                    <span style={{ color: p.condition.includes('Needs') ? '#dc2626' : 'var(--green-800)', fontWeight: 600 }}>
                      Condition: {p.condition}
                    </span>
                    <span style={{ color: 'var(--blue-700)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <span>View on Map</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
