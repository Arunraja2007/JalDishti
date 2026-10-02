import React, { useState, useCallback } from 'react';
import {
  Camera,
  MapPin,
  ShieldCheck,
  AlertCircle,
  X,
  ZoomIn,
  Filter,
  ExternalLink,
  Calendar,
  TrendingUp,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  PHOTO_EVIDENCE,
  PHOTO_EVIDENCE_CATEGORIES,
} from '../../data/photoEvidenceData';

/* ─── Lightbox Modal ─────────────────────────────────────────────────────── */
function LightboxModal({ photo, allFiltered, onClose, onNavigate }) {
  const idx = allFiltered.findIndex((p) => p.id === photo.id);

  const goPrev = useCallback(() => {
    const prev = allFiltered[(idx - 1 + allFiltered.length) % allFiltered.length];
    onNavigate(prev);
  }, [idx, allFiltered, onNavigate]);

  const goNext = useCallback(() => {
    const next = allFiltered[(idx + 1) % allFiltered.length];
    onNavigate(next);
  }, [idx, allFiltered, onNavigate]);

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{ zIndex: 3000 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: 880,
          width: '100%',
          maxHeight: '92vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--slate-200)',
        }}
      >
        {/* Lightbox Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid var(--slate-200)',
            background: 'var(--white)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                background: 'var(--green-100)',
                color: 'var(--green-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Camera size={16} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--slate-900)',
                }}
              >
                {photo.title}
              </div>
              <div style={{ fontSize: 11, color: 'var(--slate-500)' }}>
                {photo.location} · {photo.date}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Navigation */}
            <button
              onClick={goPrev}
              title="Previous photo"
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: '1px solid var(--slate-200)',
                background: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--slate-600)',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontSize: 11, color: 'var(--slate-400)' }}>
              {idx + 1} / {allFiltered.length}
            </span>
            <button
              onClick={goNext}
              title="Next photo"
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: '1px solid var(--slate-200)',
                background: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--slate-600)',
              }}
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: '1px solid var(--slate-200)',
                background: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--slate-600)',
                marginLeft: 4,
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Hero Image */}
          <div
            style={{
              width: '100%',
              height: 360,
              position: 'relative',
              background: '#0f172a',
              overflow: 'hidden',
            }}
          >
            <img
              src={photo.img}
              alt={photo.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.95,
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.background = 'var(--slate-100)';
              }}
            />
            {/* Category badge */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                background: 'rgba(15,23,42,0.85)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {
                PHOTO_EVIDENCE_CATEGORIES.find(
                  (c) => c.id === photo.category
                )?.label
              }
            </div>
            {/* Verified badge */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: photo.verified
                  ? 'rgba(21,128,61,0.9)'
                  : 'rgba(180,83,9,0.9)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {photo.verified ? (
                <ShieldCheck size={11} />
              ) : (
                <AlertCircle size={11} />
              )}
              {photo.verified ? 'Field Verified' : 'Unverified / Archive'}
            </div>
            {/* Source attribution */}
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 12,
                fontSize: 10,
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic',
              }}
            >
              © {photo.photographer} · {photo.source}
            </div>
          </div>

          {/* Detail Body */}
          <div
            style={{
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {/* Meta Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 10,
              }}
            >
              {[
                {
                  icon: <MapPin size={14} />,
                  label: 'Location',
                  value: photo.location,
                  color: '#0284c7',
                },
                {
                  icon: <Calendar size={14} />,
                  label: 'Survey Date',
                  value: photo.date,
                  color: '#2d6a4f',
                },
                {
                  icon: <TrendingUp size={14} />,
                  label: 'Impact Metric',
                  value: photo.impact,
                  color: '#b45309',
                },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: 'var(--slate-50)',
                    border: '1px solid var(--slate-200)',
                    borderRadius: 8,
                    padding: '10px 12px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      color: m.color,
                      fontSize: 11,
                      fontWeight: 700,
                      marginBottom: 4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {m.icon}
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--slate-800)',
                      lineHeight: 1.3,
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div
              style={{
                background: 'var(--green-50)',
                border: '1px solid var(--green-200)',
                borderRadius: 8,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--green-800)',
                  marginBottom: 6,
                  textTransform: 'uppercase',
                }}
              >
                Field Observation Notes
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--green-950)',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {photo.description}
              </p>
            </div>

            {/* Intervention + Coords Row */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <div
                style={{
                  flex: 1,
                  minWidth: 180,
                  background: 'var(--blue-50)',
                  border: '1px solid var(--blue-200)',
                  borderRadius: 8,
                  padding: '10px 14px',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--blue-800)',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  Intervention Type
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--blue-900)',
                  }}
                >
                  {photo.intervention}
                </div>
              </div>
              <div
                style={{
                  background: 'var(--slate-50)',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 8,
                  padding: '10px 14px',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--slate-500)',
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  GPS Coordinates
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--blue-700)',
                  }}
                >
                  {photo.coordinates.lat}°N, {photo.coordinates.lng}°E
                </div>
              </div>
            </div>

            {/* Source Attribution */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11,
                color: 'var(--slate-500)',
                padding: '8px 12px',
                background: 'var(--slate-50)',
                borderRadius: 6,
                border: '1px solid var(--slate-200)',
              }}
            >
              <ImageIcon size={13} />
              <span>
                Photo Credit: <b>{photo.photographer}</b> · {photo.source}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Photo Card ─────────────────────────────────────────────────────────── */
function PhotoCard({ photo, onOpen }) {
  const [imgError, setImgError] = useState(false);
  const categoryMeta = PHOTO_EVIDENCE_CATEGORIES.find(
    (c) => c.id === photo.category
  );

  return (
    <div
      className="evidence-card"
      onClick={() => onOpen(photo)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image Container */}
      <div className="evidence-card-img-container" style={{ height: 172 }}>
        {!imgError ? (
          <img
            src={photo.img}
            alt={photo.title}
            className="evidence-card-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--slate-100)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              color: 'var(--slate-400)',
            }}
          >
            <ImageIcon size={28} />
            <span style={{ fontSize: 11 }}>Photo unavailable</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="evidence-badge-category">
          <Camera size={10} />
          {categoryMeta?.label}
        </div>

        {/* Verified Badge */}
        <div
          className="evidence-badge-status"
          style={{
            background: photo.verified ? '#dcfce7' : '#fef3c7',
            color: photo.verified ? '#166534' : '#92400e',
            border: `1px solid ${photo.verified ? '#86efac' : '#fcd34d'}`,
          }}
        >
          {photo.verified ? '✓ Verified' : '⚠ Archive'}
        </div>

        {/* Zoom hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            width: 26,
            height: 26,
            background: 'rgba(15,23,42,0.75)',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
          className="zoom-hint"
        >
          <ZoomIn size={13} />
        </div>
      </div>

      {/* Card Body */}
      <div className="evidence-card-body" style={{ gap: 6 }}>
        <div className="evidence-title" style={{ fontSize: 13 }}>
          {photo.title}
        </div>
        <div
          className="evidence-meta-row"
          style={{ fontSize: 11, color: 'var(--slate-500)' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <MapPin size={10} />
            {photo.location}
          </span>
          <span>{photo.date}</span>
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--green-800)',
            fontWeight: 600,
            background: 'var(--green-50)',
            border: '1px solid var(--green-200)',
            borderRadius: 5,
            padding: '3px 8px',
            display: 'inline-block',
          }}
        >
          {photo.impact}
        </div>
      </div>
    </div>
  );
}

/* ─── Main View ──────────────────────────────────────────────────────────── */
export default function PhotoEvidenceView() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = PHOTO_EVIDENCE.filter((p) => {
    const matchCat =
      activeCategory === 'all' || p.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.intervention.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const verifiedCount = PHOTO_EVIDENCE.filter((p) => p.verified).length;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}
    >
      {/* Sticky Header */}
      <div className="panel-header-sticky">
        <div className="panel-title-wrap">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'var(--green-100)',
              color: 'var(--green-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Camera size={18} />
          </div>
          <div>
            <div className="panel-title">Photo Evidence Gallery</div>
            <div className="panel-subtitle">
              Real-world field photography · Wikimedia Commons CC-licensed
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
          padding: '14px 20px 0',
        }}
      >
        {[
          {
            value: PHOTO_EVIDENCE.length,
            label: 'Total Photos',
            color: 'var(--green-800)',
            bg: 'var(--green-50)',
            border: 'var(--green-200)',
          },
          {
            value: verifiedCount,
            label: 'Field Verified',
            color: '#166534',
            bg: '#dcfce7',
            border: '#86efac',
          },
          {
            value: PHOTO_EVIDENCE_CATEGORIES.length - 1,
            label: 'Categories',
            color: 'var(--blue-800)',
            bg: 'var(--blue-50)',
            border: 'var(--blue-200)',
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: s.bg,
              border: `1px solid ${s.border}`,
              borderRadius: 8,
              padding: '8px 12px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: s.color,
                fontFamily: 'var(--font-display)',
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: s.color, textTransform: 'uppercase' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Search box */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by title, location, or intervention…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              borderRadius: 8,
              border: '1px solid var(--slate-200)',
              fontSize: 12,
              color: 'var(--slate-700)',
              fontFamily: 'var(--font-sans)',
              outline: 'none',
              boxSizing: 'border-box',
              background: 'var(--white)',
            }}
          />
          <Filter
            size={13}
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--slate-400)',
            }}
          />
        </div>

        {/* Category pills */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            paddingBottom: 4,
          }}
        >
          {PHOTO_EVIDENCE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? PHOTO_EVIDENCE.length
                : PHOTO_EVIDENCE.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: isActive ? cat.color : 'var(--white)',
                  color: isActive ? '#fff' : 'var(--slate-600)',
                  border: isActive
                    ? `1px solid ${cat.color}`
                    : '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '5px 10px',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.label}
                <span
                  style={{
                    fontSize: 10,
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--slate-100)',
                    color: isActive ? '#fff' : 'var(--slate-500)',
                    borderRadius: 10,
                    padding: '0 5px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div
        style={{
          padding: '8px 20px 0',
          fontSize: 11,
          color: 'var(--slate-500)',
          fontWeight: 600,
        }}
      >
        {filtered.length === 0
          ? 'No photos match your filter.'
          : `Showing ${filtered.length} photo${filtered.length !== 1 ? 's' : ''}`}
      </div>

      {/* Photo Grid */}
      <div
        style={{
          padding: '12px 20px 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}
      >
        {filtered.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} onOpen={setLightboxPhoto} />
        ))}
      </div>

      {/* Attribution Footer */}
      <div
        style={{
          margin: '0 20px 20px',
          padding: '10px 14px',
          background: 'var(--slate-50)',
          border: '1px solid var(--slate-200)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
        }}
      >
        <ShieldCheck size={16} color="#2d6a4f" style={{ flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 11, color: 'var(--slate-600)', lineHeight: 1.45 }}>
          <b>Photo Attribution:</b> All images sourced from{' '}
          <span style={{ color: 'var(--blue-700)', fontWeight: 600 }}>
            Wikimedia Commons
          </span>{' '}
          under Creative Commons (CC BY / CC BY-SA 3.0/4.0) licenses. Captions
          include field observation notes aligned with PMKSY-WDC 2.0 DRISHTI
          geo-tagging guidelines.
        </div>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <LightboxModal
          photo={lightboxPhoto}
          allFiltered={filtered}
          onClose={() => setLightboxPhoto(null)}
          onNavigate={setLightboxPhoto}
        />
      )}

      <style>{`
        .evidence-card:hover .zoom-hint {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
