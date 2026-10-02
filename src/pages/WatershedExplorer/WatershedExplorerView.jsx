import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Search, 
  Filter, 
  MapPin, 
  Layers, 
  Droplets, 
  Sprout, 
  ArrowUpRight,
  ShieldAlert,
  X
} from 'lucide-react';
import { WatershedService } from '../../services/watershedService';

export default function WatershedExplorerView({ 
  watersheds = [], 
  selectedWatershed, 
  onSelectWatershed 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBasin, setSelectedBasin] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  const uniqueBasins = useMemo(() => ['all', ...new Set(watersheds.map(w => w.basin).filter(Boolean))], [watersheds]);
  const uniqueStates = useMemo(() => ['all', ...new Set(watersheds.map(w => w.state).filter(Boolean))], [watersheds]);

  const filteredWatersheds = useMemo(() => {
    return WatershedService.filterWatersheds(watersheds, {
      basin: selectedBasin,
      state: selectedState,
      priority: selectedPriority,
      searchQuery: searchQuery
    });
  }, [watersheds, selectedBasin, selectedState, selectedPriority, searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Sticky Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--green-100)', color: 'var(--green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Compass size={18} />
          </div>
          <div>
            <div className="panel-title">Watershed Explorer</div>
            <div className="panel-subtitle">National Hydrological Inventory ({filteredWatersheds.length} Matches)</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-toolbar">
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            className="map-search-input"
            style={{ width: '100%', border: '1px solid var(--slate-300)', borderRadius: 6, padding: '7px 10px 7px 30px' }}
            placeholder="Search watershed name, district, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: 10 }} />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              style={{ position: 'absolute', right: 10, top: 8, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={14} color="#94a3b8" />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, width: '100%', marginTop: 4 }}>
          <select 
            className="filter-select" 
            style={{ flex: 1 }}
            value={selectedBasin} 
            onChange={(e) => setSelectedBasin(e.target.value)}
          >
            <option value="all">All River Basins</option>
            {uniqueBasins.filter(b => b !== 'all').map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select 
            className="filter-select" 
            style={{ flex: 1 }}
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="all">All Priority Levels</option>
            <option value="Critical">Critical Priority</option>
            <option value="High">High Priority</option>
            <option value="Moderate">Moderate Priority</option>
            <option value="Low">Low / Stable</option>
          </select>
        </div>
      </div>

      {/* Watershed Cards List */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredWatersheds.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--slate-500)' }}>
            <Compass size={36} color="#cbd5e1" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontWeight: 600, fontSize: 14 }}>No watersheds match your filter criteria</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Try clearing the search query or selecting "All River Basins".</div>
          </div>
        ) : (
          filteredWatersheds.map(ws => {
            const isSelected = selectedWatershed?.id === ws.id;

            return (
              <div
                key={ws.id}
                onClick={() => onSelectWatershed(ws)}
                style={{
                  background: isSelected ? 'var(--green-50)' : 'var(--white)',
                  border: isSelected ? '2px solid var(--green-600)' : '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', background: 'var(--slate-100)', color: 'var(--slate-700)', padding: '2px 6px', borderRadius: 4 }}>
                      {ws.code}
                    </span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--slate-900)', marginTop: 4 }}>
                      {ws.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>
                      📍 {ws.district}, {ws.state} ({ws.basin})
                    </div>
                  </div>

                  <span style={{
                    background: ws.priority_level === 'Critical' ? '#fee2e2' : (ws.priority_level === 'High' ? '#ffedd5' : '#dcfce7'),
                    color: ws.priority_level === 'Critical' ? '#991b1b' : (ws.priority_level === 'High' ? '#9a3412' : '#166534'),
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 4,
                    textTransform: 'uppercase'
                  }}>
                    {ws.priority_level}
                  </span>
                </div>

                {/* Metrics Pill Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, background: 'var(--slate-50)', padding: 8, borderRadius: 6 }}>
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--slate-500)', textTransform: 'uppercase' }}>Area</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-900)' }}>{ws.area_sqkm} km²</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--slate-500)', textTransform: 'uppercase' }}>Elevation</div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{ws.elevation_min}-{ws.elevation_max}m</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--slate-500)', textTransform: 'uppercase' }}>Structures</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-700)' }}>{ws.water_structures_count}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--slate-500)', textTransform: 'uppercase' }}>NDVI</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-700)' }}>{ws.ndvi_mean}</div>
                  </div>
                </div>

                {/* Spatial Observation snippet */}
                <p style={{ fontSize: 11, color: 'var(--slate-600)', lineHeight: 1.4, margin: 0 }}>
                  {ws.key_observations}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: isSelected ? 'var(--green-800)' : 'var(--blue-700)' }}>
                  <span>{isSelected ? 'Currently Active on Map' : 'Select & Highlight on Map'}</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
