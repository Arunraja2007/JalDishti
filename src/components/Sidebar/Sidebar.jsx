import React from 'react';
import { NavLink } from 'react-router-dom';
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
  ShieldCheck,
  Satellite
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard',        path: '/dashboard',           label: 'Dashboard',                icon: LayoutDashboard,    theme: 'green', group: 'Overview' },
  { id: 'explorer',         path: '/explorer',            label: 'Watershed Explorer',        icon: Compass,            theme: 'green', group: 'Geospatial' },
  { id: 'srishti_drishti',  path: '/srishti-drishti',     label: 'SRISHTI-DRISHTI Analysis',  icon: Satellite,          theme: 'blue',  group: 'Geospatial' },
  { id: 'geotagged',        path: '/geo-coded-images',    label: 'Geo-coded Images',          icon: Camera,             theme: 'blue',  group: 'Field Evidence' },
  { id: 'photo_evidence',   path: '/photo-evidence',      label: 'Photo Evidence',            icon: Images,             theme: 'blue',  group: 'Field Evidence' },
  { id: 'lulc',             path: '/land-use-land-cover', label: 'Land Use / Land Cover',     icon: Layers,             theme: 'green', group: 'Biophysical' },
  { id: 'water',            path: '/water-resources',     label: 'Water Resources',           icon: Droplets,           theme: 'blue',  group: 'Hydrology' },
  { id: 'terrain',          path: '/terrain-analysis',    label: 'Terrain Analysis',          icon: Mountain,           theme: 'green', group: 'Biophysical' },
  { id: 'vegetation',       path: '/vegetation-ndvi',     label: 'Vegetation / NDVI',         icon: Sprout,             theme: 'green', group: 'Biophysical' },
  { id: 'change_detection', path: '/change-detection',    label: 'Change Detection',          icon: SplitSquareVertical,theme: 'blue',  group: 'Evaluation' },
  { id: 'reports',          path: '/reports',             label: 'Reports & Assessments',     icon: FileText,           theme: 'green', group: 'Evaluation' },
];

export default function Sidebar() {
  const uniqueGroups = [...new Set(NAV_ITEMS.map(i => i.group))];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-nav-group">
        {uniqueGroups.map(groupName => (
          <div key={groupName} style={{ marginBottom: 8 }}>
            <div className="sidebar-nav-label">{groupName}</div>
            {NAV_ITEMS.filter(item => item.group === groupName).map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  id={`nav-btn-${item.id}`}
                  className={({ isActive }) =>
                    `nav-item-btn${isActive ? (item.theme === 'green' ? ' active-green' : ' active-blue') : ''}`
                  }
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                >
                  <Icon size={18} className="nav-icon" />
                  <span>{item.label}</span>
                </NavLink>
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
