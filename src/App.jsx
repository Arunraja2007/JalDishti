import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  // Routes that show the GIS map alongside the panel (split layout)
  const MAP_ROUTES = ['/dashboard', '/explorer'];
  const showMap = MAP_ROUTES.includes(location.pathname);

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

  // Replaces the old onNavigateToTab — maps tab id → URL path
  const handleNavigateToTab = (tabId) => {
    const pathMap = {
      dashboard:        '/dashboard',
      explorer:         '/explorer',
      srishti_drishti:  '/srishti-drishti',
      geotagged:        '/geo-coded-images',
      photo_evidence:   '/photo-evidence',
      lulc:             '/land-use-land-cover',
      water:            '/water-resources',
      terrain:          '/terrain-analysis',
      vegetation:       '/vegetation-ndvi',
      change_detection: '/change-detection',
      reports:          '/reports',
    };
    if (pathMap[tabId]) navigate(pathMap[tabId]);
  };

  return (
    <div className="app-layout">
      {/* Top Navigation Header */}
      <Header onOpenDataSourceModal={() => setIsDataSourceModalOpen(true)} />

      {/* Main Workspace Body */}
      <div className="app-body">
        {/* Left GIS Sidebar — uses NavLink internally */}
        <Sidebar />

        {/* Central Map + Side Panel Workspace */}
        <div className="gis-layout-wrapper">
          {/* GIS Map — only shown on dashboard and explorer */}
          {showMap && (
            <div className="gis-map-viewport">
              <GisMap
                selectedWatershed={selectedWatershed}
                onSelectWatershed={(ws) => setSelectedWatershed(ws)}
                onSelectPhoto={(photo) => setSelectedPhoto(photo)}
                highlightCoords={highlightCoords}
              />
            </div>
          )}

          {/* Page Viewport — full-screen when no map, panel when map is shown */}
          <div className={showMap ? 'gis-panel-viewport' : 'gis-fullscreen-viewport'}>
            <Routes>
              <Route index element={<Navigate to="/dashboard" replace />} />

              <Route
                path="/dashboard"
                element={
                  <DashboardView
                    watersheds={watersheds}
                    onSelectWatershed={(ws) => setSelectedWatershed(ws)}
                    onNavigateToTab={handleNavigateToTab}
                  />
                }
              />

              <Route
                path="/explorer"
                element={
                  <WatershedExplorerView
                    watersheds={watersheds}
                    selectedWatershed={selectedWatershed}
                    onSelectWatershed={(ws) => setSelectedWatershed(ws)}
                  />
                }
              />

              <Route
                path="/srishti-drishti"
                element={
                  <SrishtiDrishtiView
                    selectedWatershed={selectedWatershed}
                  />
                }
              />

              <Route
                path="/geo-coded-images"
                element={
                  <GeoCodedImagesView
                    onSelectPhoto={(p) => setSelectedPhoto(p)}
                    onOpenUploadModal={() => setIsUploadModalOpen(true)}
                    selectedWatershed={selectedWatershed}
                  />
                }
              />

              <Route
                path="/photo-evidence"
                element={<PhotoEvidenceView />}
              />

              <Route
                path="/land-use-land-cover"
                element={
                  <LandUseLandCoverView
                    selectedWatershed={selectedWatershed}
                    watersheds={watersheds}
                    onSelectWatershed={(ws) => setSelectedWatershed(ws)}
                  />
                }
              />

              <Route
                path="/water-resources"
                element={
                  <WaterResourcesView
                    onSelectWaterbody={(wb) => console.log(wb)}
                    onFlyToLocation={handleFlyToLocation}
                  />
                }
              />

              <Route
                path="/terrain-analysis"
                element={
                  <TerrainAnalysisView
                    selectedWatershed={selectedWatershed}
                  />
                }
              />

              <Route
                path="/vegetation-ndvi"
                element={
                  <VegetationNDVIView
                    selectedWatershed={selectedWatershed}
                  />
                }
              />

              <Route
                path="/change-detection"
                element={
                  <ChangeDetectionView
                    onFlyToLocation={handleFlyToLocation}
                  />
                }
              />

              <Route
                path="/reports"
                element={
                  <ReportsView
                    selectedWatershed={selectedWatershed}
                    watersheds={watersheds}
                    onSelectWatershed={(ws) => setSelectedWatershed(ws)}
                    fieldPhotos={fieldPhotos}
                  />
                }
              />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
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
