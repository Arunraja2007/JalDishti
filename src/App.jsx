import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import GisMap from './components/Map/GisMap';
import WatershedInfoPanel from './components/WatershedInfoPanel/WatershedInfoPanel';
import FieldPhotoModal from './components/FieldPhotoModal/FieldPhotoModal';
import UploadFieldPhotoModal from './components/FieldPhotoModal/UploadFieldPhotoModal';
import DataSourceNoticeModal from './components/Common/DataSourceNoticeModal';

// Pages
import DashboardView from './pages/Dashboard/DashboardView';
import WatershedExplorerView from './pages/WatershedExplorer/WatershedExplorerView';
import GeoCodedImagesView from './pages/GeoCodedImages/GeoCodedImagesView';
import PhotoEvidenceView from './pages/PhotoEvidence/PhotoEvidenceView';
import SrishtiDrishtiView from './pages/SrishtiDrishti/SrishtiDrishtiView';
import LandUseLandCoverView from './pages/LandUseLandCover/LandUseLandCoverView';
import WaterResourcesView from './pages/WaterResources/WaterResourcesView';
import TerrainAnalysisView from './pages/TerrainAnalysis/TerrainAnalysisView';
import VegetationNDVIView from './pages/VegetationNDVI/VegetationNDVIView';
import ChangeDetectionView from './pages/ChangeDetection/ChangeDetectionView';
import ReportsView from './pages/Reports/ReportsView';

import { WatershedService } from './services/watershedService';
import { ImageService } from './services/imageService';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [watersheds, setWatersheds] = useState([]);
  const [fieldPhotos, setFieldPhotos] = useState([]);
  const [selectedWatershed, setSelectedWatershed] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [highlightCoords, setHighlightCoords] = useState(null);

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDataSourceModalOpen, setIsDataSourceModalOpen] = useState(false);

  // Load initial datasets
  useEffect(() => {
    async function initData() {
      const [wsList, photosList] = await Promise.all([
        WatershedService.getAllWatersheds(),
        ImageService.getAllObservations()
      ]);
      setWatersheds(wsList);
      setFieldPhotos(photosList);
      if (wsList.length > 0 && !selectedWatershed) {
        setSelectedWatershed(wsList[0]);
      }
    }
    initData();
  }, []);

  const handlePhotoCreated = (newObs) => {
    setFieldPhotos(prev => [newObs, ...prev]);
    setHighlightCoords({ lat: newObs.latitude, lng: newObs.longitude });
    setSelectedPhoto(newObs);
  };

  const handleFlyToLocation = (coords) => {
    setHighlightCoords(coords);
  };

  return (
    <div className="app-layout">
      {/* Top Navigation Header */}
      <Header onOpenDataSourceModal={() => setIsDataSourceModalOpen(true)} />

      {/* Main Workspace Body */}
      <div className="app-body">
        {/* Left GIS Sidebar */}
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Central Map + Side Panel Workspace */}
        <div className="gis-layout-wrapper">
          {/* Main Leaflet GIS Map Viewport */}
          <div className="gis-map-viewport">
            <GisMap
              selectedWatershed={selectedWatershed}
              onSelectWatershed={(ws) => setSelectedWatershed(ws)}
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              highlightCoords={highlightCoords}
            />
          </div>

          {/* Right GIS Viewport Panel (Tab Driven) */}
          <div className="gis-panel-viewport">
            {activeTab === 'dashboard' && (
              <DashboardView
                watersheds={watersheds}
                onSelectWatershed={(ws) => setSelectedWatershed(ws)}
                onNavigateToTab={setActiveTab}
              />
            )}

            {activeTab === 'explorer' && (
              <WatershedExplorerView
                watersheds={watersheds}
                selectedWatershed={selectedWatershed}
                onSelectWatershed={(ws) => setSelectedWatershed(ws)}
              />
            )}

            {activeTab === 'srishti_drishti' && (
              <SrishtiDrishtiView
                selectedWatershed={selectedWatershed}
              />
            )}

            {activeTab === 'geotagged' && (
              <GeoCodedImagesView
                onSelectPhoto={(p) => setSelectedPhoto(p)}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
                selectedWatershed={selectedWatershed}
              />
            )}

            {activeTab === 'photo_evidence' && (
              <PhotoEvidenceView />
            )}

            {activeTab === 'lulc' && (
              <LandUseLandCoverView
                selectedWatershed={selectedWatershed}
                watersheds={watersheds}
                onSelectWatershed={(ws) => setSelectedWatershed(ws)}
              />
            )}

            {activeTab === 'water' && (
              <WaterResourcesView
                onSelectWaterbody={(wb) => console.log(wb)}
                onFlyToLocation={handleFlyToLocation}
              />
            )}

            {activeTab === 'terrain' && (
              <TerrainAnalysisView
                selectedWatershed={selectedWatershed}
              />
            )}

            {activeTab === 'vegetation' && (
              <VegetationNDVIView
                selectedWatershed={selectedWatershed}
              />
            )}

            {activeTab === 'change_detection' && (
              <ChangeDetectionView
                onFlyToLocation={handleFlyToLocation}
              />
            )}

            {activeTab === 'reports' && (
              <ReportsView
                selectedWatershed={selectedWatershed}
                watersheds={watersheds}
                onSelectWatershed={(ws) => setSelectedWatershed(ws)}
                fieldPhotos={fieldPhotos}
              />
            )}
          </div>
        </div>
      </div>

      {/* Field Photo Inspection Modal */}
      {selectedPhoto && (
        <FieldPhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onFlyToLocation={handleFlyToLocation}
        />
      )}

      {/* Field Photo Upload Simulator Modal */}
      <UploadFieldPhotoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onPhotoCreated={handlePhotoCreated}
        watersheds={watersheds}
      />

      {/* Data Source Notice & Integrity Modal */}
      <DataSourceNoticeModal
        isOpen={isDataSourceModalOpen}
        onClose={() => setIsDataSourceModalOpen(false)}
      />
    </div>
  );
}
