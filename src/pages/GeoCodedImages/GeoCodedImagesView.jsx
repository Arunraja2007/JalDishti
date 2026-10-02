import React, { useState, useEffect, useMemo } from 'react';
import { 
  Camera, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Plus, 
  ShieldCheck, 
  ExternalLink,
  Droplets,
  Sprout,
  AlertTriangle,
  Satellite,
  Activity
} from 'lucide-react';
import { ImageService } from '../../services/imageService';
import { NATIONAL_WATERSHED_METRICS } from '../../data/nationalStats';

export default function GeoCodedImagesView({ 
  onSelectPhoto, 
  onOpenUploadModal,
  selectedWatershed 
}) {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');

  useEffect(() => {
    async function fetchPhotos() {
      const data = await ImageService.getAllObservations();
      setPhotos(data);
    }
    fetchPhotos();
  }, []);

  const categories = ['All', 'Check Dam', 'Farm Pond', 'Canal', 'Soil Erosion', 'Vegetation', 'Water Body', 'Contour Bunding', 'Gully Plug'];

  const filteredPhotos = useMemo(() => {
    return photos.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedCondition !== 'All') {
        if (selectedCondition === 'Optimal' && !p.condition.includes('Optimal') && !p.condition.includes('Functional')) return false;
        if (selectedCondition === 'Attention' && !p.condition.includes('Desilting') && !p.condition.includes('Severe') && !p.condition.includes('Maintenance')) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title?.toLowerCase().includes(q);
        const matchWs = p.watershed?.toLowerCase().includes(q);
        const matchSurveyor = p.surveyor?.toLowerCase().includes(q);
        const matchStruct = p.structure_id?.toLowerCase().includes(q);
        if (!matchTitle && !matchWs && !matchSurveyor && !matchStruct) return false;
      }
      return true;
    });
  }, [photos, selectedCategory, selectedCondition, searchQuery]);

  const gi = NATIONAL_WATERSHED_METRICS.geo_image_analysis;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Sticky Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--blue-100)', color: 'var(--blue-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={18} />
          </div>
          <div>
            <div className="panel-title">Geo-Coded Field Evidence</div>
            <div className="panel-subtitle">SRISHTI-DRISHTI · PMKSY DRISHTI Ground Audit ({filteredPhotos.length})</div>
          </div>
        </div>

        <button 
          className="btn-primary" 
          style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={onOpenUploadModal}
        >
          <Plus size={14} />
          <span>Upload Geotag</span>
        </button>
      </div>

      {/* SRISHTI-DRISHTI Interpretation Analytics Strip (PDF 26015) */}
      <div style={{ margin: '12px 16px 0', background: 'linear-gradient(135deg, #0f172a, #0c4a6e)', borderRadius: 10, padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Satellite size={13} color="#38bdf8" />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            SRISHTI-DRISHTI Spatial Interpretation · 30m Satellite Resolution
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { label: 'Auto-Validated', val: gi.auto_validated.toLocaleString(), color: '#4ade80' },
            { label: 'Pending Review', val: gi.pending_human_review.toLocaleString(), color: '#fbbf24' },
            { label: 'Interpretation Accuracy', val: `${gi.spatial_accuracy_metrics.thematic_accuracy_pct}%`, color: '#38bdf8' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: s.color, fontFamily: 'var(--font-display)' }}>{s.val}</div>
              <div style={{ fontSize: 9, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-toolbar">
        <div style={{ width: '100%' }}>
          <input
            type="text"
            className="map-search-input"
            style={{ width: '100%', border: '1px solid var(--slate-300)', borderRadius: 6, padding: '7px 10px' }}
            placeholder="Search structure title, surveyor, structure ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', width: '100%', paddingBottom: 4 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? 'var(--blue-700)' : 'var(--white)',
                color: selectedCategory === cat ? 'var(--white)' : 'var(--slate-700)',
                border: selectedCategory === cat ? '1px solid var(--blue-800)' : '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Evidence Cards */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredPhotos.map(photo => (
          <div 
            key={photo.id} 
            className="evidence-card"
            onClick={() => onSelectPhoto(photo)}
            style={{ cursor: 'pointer' }}
          >
            <div className="evidence-card-img-container">
              <img
                src={photo.image}
                alt={photo.title}
                className="evidence-card-img"
                onError={e => { e.target.onerror=null; e.target.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%23f1f5f9%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%2394a3b8%22 font-size=%2214%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EField Photo%3C/text%3E%3C/svg%3E'; }}
              />
              <div className="evidence-badge-category">
                <Camera size={11} />
                <span>{photo.category}</span>
              </div>
              <div 
                className="evidence-badge-status"
                style={{
                  background: photo.condition.includes('Severe') ? '#fee2e2' : '#dcfce7',
                  color: photo.condition.includes('Severe') ? '#991b1b' : '#166534',
                  border: photo.condition.includes('Severe') ? '1px solid #fca5a5' : '1px solid #86efac'
                }}
              >
                {photo.condition.split('/')[0]}
              </div>
            </div>

            <div className="evidence-card-body">
              <div className="evidence-title">{photo.title}</div>
              
              <div className="evidence-meta-row">
                <span className="evidence-coords">
                  {photo.latitude.toFixed(4)}°N, {photo.longitude.toFixed(4)}°E
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--slate-500)', fontSize: 11 }}>
                  <Calendar size={12} />
                  {photo.date}
                </span>
              </div>

              <div style={{ fontSize: 11, color: 'var(--green-900)', fontWeight: 600 }}>
                📍 {photo.watershed}
              </div>

              <div className="evidence-desc">
                {photo.description}
              </div>

              <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: 8, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
                <span style={{ color: 'var(--slate-500)' }}>Surveyor: {photo.surveyor}</span>
                <span style={{ color: 'var(--blue-700)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span>Inspect Audit</span>
                  <ExternalLink size={12} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
