import React, { useState, useEffect, useRef } from 'react';
import {
  Droplets,
  Waves,
  MapPin,
  ExternalLink,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Layers,
  Camera,
  Upload,
  X,
  ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { MapService } from '../../services/mapService';

/* ── tiny helper ─────────────────────────────────── */
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ── Image Upload Modal ──────────────────────────── */
function ImageUploadModal({ waterbody, onClose, onSave }) {
  const [dragOver, setDragOver] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Field Survey');
  const [saving, setSaving] = useState(false);
  const inputRef = useRef();

  const CATEGORIES = ['Field Survey', 'Flood Event', 'Drought Assessment', 'Post-Monsoon', 'Structure Inspection', 'Other'];

  const handleFiles = async (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (!valid.length) return;
    const results = await Promise.all(valid.map(async (f) => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB',
      url: await readFileAsDataURL(f),
      type: f.type,
    })));
    setPreviews(prev => [...prev, ...results]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSave = async () => {
    if (!previews.length) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // simulate upload
    onSave({
      waterbodyId: waterbody?.id,
      waterbodyName: waterbody?.name,
      images: previews,
      note,
      category,
      timestamp: new Date().toLocaleString('en-IN'),
    });
    setSaving(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: '92%', maxWidth: 560,
        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
      }}>
        {/* Modal Header */}
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Times New Roman', serif", fontSize: 15, fontWeight: 700, color: '#0c4a6e' }}>
              Upload Field Images
            </div>
            {waterbody && (
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                📍 {waterbody.name} · {waterbody.watershed_name}
              </div>
            )}
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} color="#475569" />
          </button>
        </div>

        <div style={{ padding: '18px 22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
            style={{
              border: `2px dashed ${dragOver ? '#0284c7' : '#bae6fd'}`,
              borderRadius: 12,
              padding: '28px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? '#f0f9ff' : '#f8fafc',
              transition: 'all 0.2s',
            }}
          >
            <input ref={inputRef} type="file" multiple accept="image/*" style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)} />
            <Upload size={28} color={dragOver ? '#0284c7' : '#94a3b8'} style={{ margin: '0 auto 10px' }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: dragOver ? '#0284c7' : '#475569' }}>
              {dragOver ? 'Drop images here' : 'Drag & drop images or click to browse'}
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
              JPG, PNG, WEBP · Multiple files supported
            </div>
          </div>

          {/* Preview Grid */}
          {previews.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                {previews.length} Image{previews.length > 1 ? 's' : ''} Selected
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {previews.map((img, i) => (
                  <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0', aspectRatio: '4/3' }}>
                    <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.55)', padding: '4px 6px' }}>
                      <div style={{ fontSize: 9, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.name}</div>
                      <div style={{ fontSize: 8, color: '#94a3b8' }}>{img.size}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPreviews(p => p.filter((_, j) => j !== i)); }}
                      style={{ position: 'absolute', top: 4, right: 4, background: '#dc2626', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={11} color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#1e293b', background: '#f8fafc', outline: 'none' }}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Note */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
              Field Notes (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe site conditions, observations, anomalies..."
              rows={3}
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 12, color: '#1e293b', background: '#f8fafc', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={onClose} style={{ padding: '9px 18px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', color: '#475569', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!previews.length || saving}
            style={{
              padding: '9px 20px', border: 'none', borderRadius: 8,
              background: previews.length ? '#0284c7' : '#cbd5e1',
              color: '#fff', fontSize: 12, fontWeight: 700, cursor: previews.length ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', gap: 7,
            }}
          >
            {saving ? (
              <><span style={{ display: 'inline-block', width: 12, height: 12, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Uploading…</>
            ) : (
              <><CheckCircle2 size={14} /> Save {previews.length > 0 ? `(${previews.length})` : ''}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Image Gallery Modal ─────────────────────────── */
function GalleryModal({ entries, waterbodyName, onClose }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: '94%', maxWidth: 680,
        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
      }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Times New Roman', serif", fontSize: 15, fontWeight: 700, color: '#0c4a6e' }}>
              Field Image Gallery
            </div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>📍 {waterbodyName}</div>
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} color="#475569" />
          </button>
        </div>

        <div style={{ overflowY: 'auto', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {entries.map((entry, ei) => (
            <div key={ei}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: 10, background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 4, fontWeight: 700, marginRight: 8 }}>{entry.category}</span>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{entry.timestamp}</span>
                </div>
              </div>
              {entry.note && (
                <div style={{ fontSize: 12, color: '#475569', background: '#f8fafc', borderRadius: 8, padding: '8px 12px', marginBottom: 10, borderLeft: '3px solid #bae6fd' }}>
                  {entry.note}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {entry.images.map((img, ii) => (
                  <div
                    key={ii}
                    onClick={() => setSelected(img)}
                    style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', aspectRatio: '4/3', position: 'relative' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0284c7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.25)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0)'; }}
                    >
                      <Eye size={20} color="#fff" style={{ opacity: 0.9 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100,
          }}
        >
          <img src={selected.url} alt={selected.name} style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 10, boxShadow: '0 0 60px rgba(0,0,0,0.5)' }} />
          <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} color="#fff" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════ */
export default function WaterResourcesView({ onSelectWaterbody, onFlyToLocation }) {
  const [waterbodies, setWaterbodies] = useState([]);
  const [streams, setStreams] = useState([]);

  // Image upload state
  const [uploadTarget, setUploadTarget] = useState(null); // waterbody object or null (general)
  const [galleryTarget, setGalleryTarget] = useState(null); // { name, entries }
  const [imageStore, setImageStore] = useState({}); // keyed by waterbody id or 'general'
  const [generalUploads, setGeneralUploads] = useState([]);

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

  const handleSaveImages = (entry) => {
    if (entry.waterbodyId) {
      setImageStore(prev => ({
        ...prev,
        [entry.waterbodyId]: [...(prev[entry.waterbodyId] || []), entry],
      }));
    } else {
      setGeneralUploads(prev => [...prev, entry]);
    }
  };

  const totalImages = Object.values(imageStore).flat().reduce((a, e) => a + e.images.length, 0) + generalUploads.reduce((a, e) => a + e.images.length, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', background: '#f4f6f3' }}>

      {/* spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

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

        {/* General Upload Button */}
        <button
          onClick={() => setUploadTarget({})}
          style={{
            marginLeft: 'auto',
            background: '#0284c7', color: '#fff', border: 'none',
            borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
          }}
        >
          <Camera size={14} /> Add Field Images
        </button>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* KPI Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <div className="kpi-card kpi-blue">
            <div className="kpi-icon-wrap"><Droplets size={18} /></div>
            <div className="kpi-content">
              <span className="kpi-label">Surface Water Storage</span>
              <div className="kpi-value-row"><span className="kpi-value">3,140 TCM</span></div>
            </div>
          </div>
          <div className="kpi-card kpi-blue">
            <div className="kpi-icon-wrap"><Waves size={18} /></div>
            <div className="kpi-content">
              <span className="kpi-label">Monitored Streams</span>
              <div className="kpi-value-row"><span className="kpi-value">{streams.length * 14} km</span></div>
            </div>
          </div>
          <div className="kpi-card" style={{ border: '1px solid #bae6fd', background: '#f0f9ff' }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ImageIcon size={16} color="#0284c7" />
            </div>
            <div className="kpi-content">
              <span className="kpi-label">Field Images</span>
              <div className="kpi-value-row">
                <span className="kpi-value" style={{ color: '#0284c7' }}>{totalImages}</span>
              </div>
            </div>
          </div>
        </div>

        {/* General uploaded images banner */}
        {generalUploads.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontFamily: "'Times New Roman', serif", fontSize: 13, fontWeight: 700, color: '#0c4a6e', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Camera size={15} color="#0284c7" /> General Field Images
              </div>
              <button
                onClick={() => setGalleryTarget({ name: 'General Field Survey', entries: generalUploads })}
                style={{ background: '#e0f2fe', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#0369a1', cursor: 'pointer' }}
              >
                View All ({generalUploads.reduce((a, e) => a + e.images.length, 0)})
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {generalUploads.flatMap(e => e.images).slice(0, 5).map((img, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 6, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Surface Water Dynamics */}
        <div style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: 'var(--radius-lg)', padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={16} color="#0284c7" />
            <span>Seasonal Surface Water Dynamics (Pre vs Post Monsoon)</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--blue-950)', lineHeight: 1.5 }}>
            Watershed interventions across prototype sites have increased post-monsoon water spread area retention from <b>4.2 months</b> to <b>9.8 months</b>, drastically curtailing peak summer drinking water tanker dependencies.
          </p>
        </div>

        {/* Monitored Water Bodies */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 10, textTransform: 'uppercase' }}>
            Monitored Reservoirs &amp; Percolation Tanks ({waterbodies.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {waterbodies.map(f => {
              const p = f.properties;
              const coords = f.geometry.coordinates[0][0];
              const entries = imageStore[p.id] || [];
              const imgCount = entries.reduce((a, e) => a + e.images.length, 0);

              return (
                <div
                  key={p.id}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--slate-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: 14,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--blue-300)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--slate-200)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {/* Top row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ cursor: 'pointer' }} onClick={() => onFlyToLocation && onFlyToLocation({ lat: coords[1], lng: coords[0] })}>
                      <span style={{ fontSize: 10, background: 'var(--blue-50)', color: 'var(--blue-800)', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                        {p.type}
                      </span>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-900)', marginTop: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--slate-500)', marginTop: 2 }}>
                        📍 {p.watershed_name} ({p.state})
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue-700)', fontFamily: 'var(--font-mono)' }}>
                      {p.current_water_level_pct}% Full
                    </span>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, background: 'var(--slate-50)', padding: 6, borderRadius: 6, fontSize: 11 }}>
                    <div>Spread Area: <b>{p.water_spread_area_ha} Ha</b></div>
                    <div>Capacity: <b>{p.storage_capacity_tcm} TCM</b></div>
                  </div>

                  {/* Image preview row (if images exist) */}
                  {imgCount > 0 && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, alignItems: 'center' }}>
                      {entries.flatMap(e => e.images).slice(0, 4).map((img, i) => (
                        <div key={i} style={{ width: 44, height: 36, borderRadius: 5, overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                          <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                      {imgCount > 4 && (
                        <span style={{ fontSize: 11, color: '#0284c7', fontWeight: 700 }}>+{imgCount - 4} more</span>
                      )}
                    </div>
                  )}

                  {/* Action Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, gap: 8 }}>
                    <span style={{ color: p.condition.includes('Needs') ? '#dc2626' : 'var(--green-800)', fontWeight: 600, fontSize: 11 }}>
                      Condition: {p.condition}
                    </span>

                    <div style={{ display: 'flex', gap: 8 }}>
                      {/* Upload button */}
                      <button
                        onClick={() => setUploadTarget(p)}
                        style={{
                          background: '#e0f2fe', border: 'none', borderRadius: 6,
                          padding: '5px 12px', fontSize: 11, fontWeight: 700,
                          color: '#0369a1', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 5,
                        }}
                      >
                        <Upload size={12} /> Add Image
                      </button>

                      {/* View Gallery (only if images exist) */}
                      {imgCount > 0 && (
                        <button
                          onClick={() => setGalleryTarget({ name: p.name, entries })}
                          style={{
                            background: '#f0fdf4', border: 'none', borderRadius: 6,
                            padding: '5px 12px', fontSize: 11, fontWeight: 700,
                            color: '#166534', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 5,
                          }}
                        >
                          <Eye size={12} /> View ({imgCount})
                        </button>
                      )}

                      {/* View on Map */}
                      <span
                        onClick={() => onFlyToLocation && onFlyToLocation({ lat: coords[1], lng: coords[0] })}
                        style={{ color: 'var(--blue-700)', fontWeight: 600, fontSize: 11, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                      >
                        <span>Map</span>
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadTarget !== null && (
        <ImageUploadModal
          waterbody={uploadTarget?.id ? uploadTarget : null}
          onClose={() => setUploadTarget(null)}
          onSave={handleSaveImages}
        />
      )}

      {/* Gallery Modal */}
      {galleryTarget && (
        <GalleryModal
          entries={galleryTarget.entries}
          waterbodyName={galleryTarget.name}
          onClose={() => setGalleryTarget(null)}
        />
      )}
    </div>
  );
}
