import React, { useState } from 'react';
import { Layers, Info, MapPin, Database, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Header({ onOpenDataSourceModal }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-logo-icon">
          <img src="/logo.svg" alt="JalDrishti Logo" style={{ width: 38, height: 38 }} />
        </div>
        <div className="brand-text-container">
          <div className="brand-title-row">
            <span className="brand-title">JalDrishti</span>
            <span className="sih-badge">SIH PS 26015</span>
          </div>
          <span className="brand-subtitle">Geospatial Watershed Intelligence Platform</span>
        </div>
      </div>

      <div className="header-actions">
        <div className="data-status-badge" title="NRSC Bhuvan & OGD schema reference with sample vector data">
          <div className="pulse-dot"></div>
          <span>Bhuvan / OGD GIS Schema</span>
        </div>

        <button 
          className="btn-outline" 
          style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={onOpenDataSourceModal}
          title="View official government data sources and documentation"
        >
          <Database size={14} color="#2d6a4f" />
          <span>Data Sources & Notice</span>
        </button>
      </div>
    </header>
  );
}
