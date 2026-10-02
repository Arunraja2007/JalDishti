import React from 'react';
import { 
  X, 
  Database, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2,
  FileCode,
  Layers
} from 'lucide-react';

export default function DataSourceNoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-gis animate-fade-in" style={{ maxWidth: 780 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--green-100)', color: 'var(--green-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={18} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--slate-900)' }}>
                Official Geospatial Data Sources &amp; Integrity Notice
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>
                SIH Problem Statement 26015 • NRSC / Bhuvan &amp; OGD Standards
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ gap: 16 }}>
          {/* Integrity Note Box */}
          <div style={{ background: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: 'var(--radius-md)', padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--blue-900)', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              <ShieldCheck size={16} color="#0284c7" />
              <span>Real vs Prototype Demonstration Data Notice</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--blue-950)', lineHeight: 1.5 }}>
              This platform adheres strictly to the official Indian geospatial guidelines. All vector layer schemas (watershed boundaries, stream orders, waterbodies, and field photo records) are formatted according to <b>NRSC Bhuvan Thematic</b> and <b>MoRD DRISHTI</b> specifications. For local development and demonstration without active restricted API credentials, high-fidelity sample datasets have been incorporated and are clearly labelled.
            </p>
          </div>

          {/* Official Sources Table */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--slate-800)', marginBottom: 8, textTransform: 'uppercase' }}>
              Official Catalogues &amp; Access Endpoints
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ border: '1px solid var(--slate-200)', borderRadius: 8, padding: 12, background: 'var(--white)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--green-900)' }}>1. India Hydrological &amp; Watershed Boundaries</span>
                  <a href="https://www.data.gov.in/catalog/hydrological-boundaries" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--blue-700)', fontWeight: 600 }}>
                    <span>Open Govt Data</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div style={{ fontSize: 12, color: 'var(--slate-600)', marginTop: 4 }}>
                  Authority: Open Government Data (data.gov.in) / CWC. Format: SHP/ZIP in EPSG:4326.
                </div>
              </div>

              <div style={{ border: '1px solid var(--slate-200)', borderRadius: 8, padding: 12, background: 'var(--white)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--green-900)' }}>2. Bhuvan Open EO Data Archive (CartoDEM / Resourcesat)</span>
                  <a href="https://bhuvan-app3.nrsc.gov.in/data/download/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--blue-700)', fontWeight: 600 }}>
                    <span>Bhuvan Download Portal</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div style={{ fontSize: 12, color: 'var(--slate-600)', marginTop: 4 }}>
                  Products: CartoDEM 1-arcsec (30m), Resourcesat AWiFS &amp; LISS-III. Requires registered ISRO Bhuvan login for bulk raster tile downloads.
                </div>
              </div>

              <div style={{ border: '1px solid var(--slate-200)', borderRadius: 8, padding: 12, background: 'var(--white)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--green-900)' }}>3. Bhuvan Thematic LULC 1:250K WMS Service</span>
                  <a href="https://bhuvan-app1.nrsc.gov.in/2dresources/bhuvanstore2.php" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--blue-700)', fontWeight: 600 }}>
                    <span>Bhuvan Store</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div style={{ fontSize: 12, color: 'var(--slate-600)', marginTop: 4 }}>
                  WMS Endpoint: <code>https://bhuvan-ras2.nrsc.gov.in/cgi-bin/LULC250K.exe</code>. Layers: <code>LULC250k_2223</code>, <code>LULC250k_1718</code>.
                </div>
              </div>

              <div style={{ border: '1px solid var(--slate-200)', borderRadius: 8, padding: 12, background: 'var(--white)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--green-900)' }}>4. DRISHTI / SRISHTI Field Evidence Schema</span>
                  <span style={{ fontSize: 11, color: 'var(--green-800)', fontWeight: 600 }}>MoRD / PMKSY-WDC 2.0</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--slate-600)', marginTop: 4 }}>
                  Standard fields: Lat, Lng, Elevation, Timestamp, Structure ID, Category, Condition, and Ground Impact Indicator.
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button className="btn-primary" onClick={onClose}>
              Acknowledge &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
