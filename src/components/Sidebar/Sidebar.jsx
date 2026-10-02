import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Camera, 
  Images,
  Layers, 
  Droplets, 
  Mountain, 
  Sprout, 
  SplitSquareVertical, 
  FileText,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Satellite
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, theme: 'green', group: 'Overview' },
  { id: 'explorer', label: 'Watershed Explorer', icon: Compass, theme: 'green', group: 'Geospatial' },
  { id: 'srishti_drishti', label: 'SRISHTI-DRISHTI Analysis', icon: Satellite, theme: 'blue', group: 'Geospatial' },
  { id: 'geotagged', label: 'Geo-coded Images', icon: Camera, theme: 'blue', group: 'Field Evidence' },
  { id: 'photo_evidence', label: 'Photo Evidence', icon: Images, theme: 'blue', group: 'Field Evidence' },
  { id: 'lulc', label: 'Land Use / Land Cover', icon: Layers, theme: 'green', group: 'Biophysical' },
  { id: 'water', label: 'Water Resources', icon: Droplets, theme: 'blue', group: 'Hydrology' },
  { id: 'terrain', label: 'Terrain Analysis', icon: Mountain, theme: 'green', group: 'Biophysical' },
  { id: 'vegetation', label: 'Vegetation / NDVI', icon: Sprout, theme: 'green', group: 'Biophysical' },
  { id: 'change_detection', label: 'Change Detection', icon: SplitSquareVertical, theme: 'blue', group: 'Evaluation' },
  { id: 'reports', label: 'Reports & Assessments', icon: FileText, theme: 'green', group: 'Evaluation' },
];

export default function Sidebar({ activeTab, onSelectTab }) {
  // Group navigation items
  const groups = ['Overview', 'Geospatial', 'Field Evidence', 'Biophysical', 'Hydrology', 'Evaluation'];
  const uniqueGroups = [...new Set(NAV_ITEMS.map(i => i.group))];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-nav-group">
        {uniqueGroups.map(groupName => (
          <div key={groupName} style={{ marginBottom: 8 }}>
            <div className="sidebar-nav-label">{groupName}</div>
            {NAV_ITEMS.filter(item => item.group === groupName).map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const activeClass = isActive 
                ? (item.theme === 'green' ? 'active-green' : 'active-blue') 
                : '';

              return (
                <button
                  key={item.id}
                  className={`nav-item-btn ${activeClass}`}
                  onClick={() => onSelectTab(item.id)}
                  id={`nav-btn-${item.id}`}
                >
                  <Icon size={18} className="nav-icon" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="dataset-provenance-box">
          <div className="provenance-title">
            <ShieldCheck size={14} color="#1b4332" />
            <span>Official Standards</span>
          </div>
          <div className="provenance-desc">
            Aligned with NRSC Bhuvan Thematic LULC &amp; PMKSY-WDC 2.0 DRISHTI geo-tagging guidelines.
          </div>
        </div>
      </div>
    </aside>
  );
}
