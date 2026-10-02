import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  FileText 
} from 'lucide-react';
import { ImageService } from '../../services/imageService';

const SAMPLE_PRESET_IMAGES = [
  { label: 'Masonry Check Dam', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Check_dam_in_Rajasthan%2C_India.jpg/800px-Check_dam_in_Rajasthan%2C_India.jpg', category: 'Check Dam' },
  { label: 'HDPE Lined Farm Pond', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Farm_pond_in_Andhra_Pradesh.jpg/800px-Farm_pond_in_Andhra_Pradesh.jpg', category: 'Farm Pond' },
  { label: 'Concrete Feeder Canal', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Irrigation_canal_Karnataka.jpg/800px-Irrigation_canal_Karnataka.jpg', category: 'Canal' },
  { label: 'Gully Erosion Site', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ravine_erosion_India.jpg/800px-Ravine_erosion_India.jpg', category: 'Soil Erosion' },
  { label: 'Ridge Afforestation', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Contour_bunding_Maharashtra.jpg/800px-Contour_bunding_Maharashtra.jpg', category: 'Vegetation' },
  { label: 'Rejuvenated Water Body', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Chandela_tank_Bundelkhand.jpg/800px-Chandela_tank_Bundelkhand.jpg', category: 'Water Body' },
  { label: 'Continuous Contour Bunding', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Earthen_bunding_Narmada.jpg/800px-Earthen_bunding_Narmada.jpg', category: 'Contour Bunding' },
  { label: 'Loose Boulder Gully Plug', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Loose_boulder_check_dam_Shivalik.jpg/800px-Loose_boulder_check_dam_Shivalik.jpg', category: 'Gully Plug' },
  { label: 'Traditional Oorani Tank', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Oorani_Tamil_Nadu_village_pond.jpg/800px-Oorani_Tamil_Nadu_village_pond.jpg', category: 'Water Body' },
  { label: 'Percolation Tank + Shaft', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Percolation_tank_Gujarat.jpg/800px-Percolation_tank_Gujarat.jpg', category: 'Percolation Tank' }
];

export default function UploadFieldPhotoModal({ isOpen, onClose, onPhotoCreated, watersheds = [] }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    category: 'Check Dam',
    watershed_id: watersheds[0]?.id || 'WS-MH-GOD-01',
    latitude: '19.0350',
    longitude: '74.4120',
    elevation_m: '620',
    date: new Date().toISOString().split('T')[0],
    surveyor: 'Er. Rajesh Varma (Field Officer)',
    agency: 'PMKSY-WDC 2.0 Field Monitoring Unit',
    dimensions: 'Length: 15m | Height: 2.0m',
    storage_capacity_cum: '8500',
    condition: 'Functional / Optimal',
    impact_status: 'Groundwater table elevated +1.8m in 500m radius',
    description: 'Field survey geo-tagging observation recorded under DRISHTI mobile audit protocol.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Check_dam_in_Rajasthan%2C_India.jpg/800px-Check_dam_in_Rajasthan%2C_India.jpg'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (field, val) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: val };
      // Auto-update sample image preset if category changes
      if (field === 'category') {
        const match = SAMPLE_PRESET_IMAGES.find(p => p.category === val);
        if (match) updated.image = match.url;
      }
      if (field === 'watershed_id') {
        const ws = watersheds.find(w => w.id === val);
        if (ws && ws.geometry && ws.geometry.coordinates) {
          const firstCoord = ws.geometry.coordinates[0][0];
          updated.latitude = firstCoord[1].toFixed(4);
          updated.longitude = firstCoord[0].toFixed(4);
          updated.state = ws.state;
          updated.watershed = ws.name;
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const selectedWs = watersheds.find(w => w.id === formData.watershed_id);
      const payload = {
        ...formData,
        watershed: selectedWs ? selectedWs.name : 'Sample Watershed',
        state: selectedWs ? selectedWs.state : 'Maharashtra'
      };

      const newRecord = await ImageService.addObservation(payload);
      setSuccessMsg(`Geo-coded field observation #${newRecord.id} successfully recorded!`);
      setTimeout(() => {
        onPhotoCreated(newRecord);
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-gis animate-fade-in" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--green-100)', color: 'var(--green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={18} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--slate-900)' }}>
                Geo-Coded Field Evidence Ingestion
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>
                DRISHTI / PMKSY Mobile Observation Simulator
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body" style={{ gap: 14 }}>
          {successMsg && (
            <div style={{ background: 'var(--green-100)', color: 'var(--green-800)', padding: 12, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: 4 }}>
                Structure Category *
              </label>
              <select
                className="filter-select"
                style={{ width: '100%' }}
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="Check Dam">Check Dam (Masonry / Earthen)</option>
                <option value="Farm Pond">Farm Pond (Individual / Community)</option>
                <option value="Canal">Feeder Canal / Diversion</option>
                <option value="Soil Erosion">Soil Erosion Gully Site</option>
                <option value="Vegetation">Afforestation / Pasture Plot</option>
                <option value="Water Body">Percolation Tank / Water Body</option>
                <option value="Contour Bunding">Continuous Contour Bunding</option>
                <option value="Gully Plug">Loose Boulder Gully Plug</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: 4 }}>
                Target Watershed *
              </label>
              <select
                className="filter-select"
                style={{ width: '100%' }}
                value={formData.watershed_id}
                onChange={(e) => handleChange('watershed_id', e.target.value)}
              >
                {watersheds.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.district})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: 4 }}>
              Structure / Observation Title *
            </label>
            <input
              type="text"
              className="map-search-input"
              style={{ border: '1px solid var(--slate-300)', borderRadius: 6, padding: '8px 10px', width: '100%' }}
              placeholder="e.g. Masonry Check Dam CD-08 on Kukadi Stream"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: 4 }}>
                Latitude (°N) *
              </label>
              <input
                type="number"
                step="any"
                className="map-search-input"
                style={{ border: '1px solid var(--slate-300)', borderRadius: 6, padding: '6px 8px', width: '100%' }}
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: 4 }}>
                Longitude (°E) *
              </label>
              <input
                type="number"
                step="any"
                className="map-search-input"
                style={{ border: '1px solid var(--slate-300)', borderRadius: 6, padding: '6px 8px', width: '100%' }}
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: 4 }}>
                Survey Date
              </label>
              <input
                type="date"
                className="map-search-input"
                style={{ border: '1px solid var(--slate-300)', borderRadius: 6, padding: '6px 8px', width: '100%' }}
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: 4 }}>
              Select Field Photo Template
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => handleChange('image', preset.url)}
                  style={{
                    border: formData.image === preset.url ? '2px solid var(--green-600)' : '1px solid var(--slate-200)',
                    borderRadius: 6,
                    padding: 4,
                    cursor: 'pointer',
                    background: formData.image === preset.url ? 'var(--green-50)' : 'var(--white)',
                    textAlign: 'center'
                  }}
                >
                  <img src={preset.url} alt={preset.label} style={{ width: '100%', height: 40, objectFit: 'cover', borderRadius: 4 }} />
                  <div style={{ fontSize: 9, color: 'var(--slate-600)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {preset.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: 4 }}>
              Field Description &amp; Ground Evidence Notes
            </label>
            <textarea
              style={{
                width: '100%',
                border: '1px solid var(--slate-300)',
                borderRadius: 6,
                padding: '8px 10px',
                fontSize: 12,
                fontFamily: 'var(--font-sans)',
                resize: 'vertical',
                minHeight: 60
              }}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              <Upload size={14} />
              <span>{isSubmitting ? 'Ingesting Record...' : 'Publish Geo-coded Evidence'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
