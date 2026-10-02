import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  User, 
  Building, 
  ShieldCheck, 
  Layers, 
  Maximize2, 
  ExternalLink,
  Activity,
  Compass
} from 'lucide-react';

export default function FieldPhotoModal({ photo, onClose, onFlyToLocation }) {
  if (!photo) return null;

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Check Dam': return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' };
      case 'Farm Pond': return { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd' };
      case 'Soil Erosion': return { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' };
      case 'Vegetation': return { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' };
      case 'Water Body': return { bg: '#e0f2fe', text: '#0f4c81', border: '#bae6fd' };
      default: return { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
    }
  };

  const styleBadge = getCategoryColor(photo.category);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-gis animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              background: styleBadge.bg,
              color: styleBadge.text,
              border: `1px solid ${styleBadge.border}`,
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              {photo.category}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--slate-900)' }}>
                {photo.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>
                Structure ID: {photo.structure_id || photo.id}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', display: 'flex' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Main Photo Preview */}
          <div style={{ 
            width: '100%', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'hidden', 
            background: 'var(--slate-950)',
            border: '1px solid var(--slate-200)',
            position: 'relative'
          }}>
            <img 
              src={photo.image} 
              alt={photo.title} 
              style={{ width: '100%', maxHeight: 380, objectFit: 'contain', display: 'block', margin: '0 auto' }} 
            />
            {photo.verified && (
              <div style={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                background: 'rgba(27, 67, 50, 0.9)',
                color: '#ffffff',
                backdropFilter: 'blur(4px)',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <ShieldCheck size={14} color="#86efac" />
                <span>Digitally Verified Field Record</span>
              </div>
            )}
          </div>

          {/* Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <div className="stat-cell">
              <div className="stat-cell-label">GPS Coordinates</div>
              <div className="stat-cell-value" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--blue-700)' }}>
                {photo.latitude.toFixed(4)}°N, {photo.longitude.toFixed(4)}°E
              </div>
            </div>

            <div className="stat-cell">
              <div className="stat-cell-label">Capture Date</div>
              <div className="stat-cell-value">{photo.date}</div>
            </div>

            <div className="stat-cell">
              <div className="stat-cell-label">Associated Watershed</div>
              <div className="stat-cell-value" style={{ fontSize: 12, color: 'var(--green-800)' }}>{photo.watershed}</div>
            </div>

            <div className="stat-cell">
              <div className="stat-cell-label">Surveying Agency / WDT</div>
              <div className="stat-cell-value" style={{ fontSize: 12 }}>{photo.agency} ({photo.surveyor})</div>
            </div>

            <div className="stat-cell">
              <div className="stat-cell-label">Physical Dimensions</div>
              <div className="stat-cell-value" style={{ fontSize: 12 }}>{photo.dimensions || 'Standard Unit'}</div>
            </div>

            <div className="stat-cell">
              <div className="stat-cell-label">Structure Condition</div>
              <div className="stat-cell-value" style={{ fontSize: 12, color: photo.condition.includes('Severe') ? '#dc2626' : '#16a34a' }}>
                {photo.condition}
              </div>
            </div>
          </div>

          {/* Description & Impact Assessment */}
          <div style={{ background: 'var(--slate-50)', padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate-700)', marginBottom: 6, textTransform: 'uppercase' }}>
              Field Assessment &amp; Technical Observations
            </div>
            <p style={{ fontSize: 13, color: 'var(--slate-700)', lineHeight: 1.5 }}>
              {photo.description}
            </p>
            {photo.impact_status && (
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--green-800)', fontWeight: 600 }}>
                <Activity size={15} />
                <span>Measurable Ground Impact: {photo.impact_status}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button className="btn-outline" onClick={onClose}>
              Close Preview
            </button>
            <button 
              className="btn-primary"
              onClick={() => {
                onFlyToLocation({ lat: photo.latitude, lng: photo.longitude });
                onClose();
              }}
            >
              <MapPin size={15} />
              <span>Center &amp; Fly to Marker on Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
