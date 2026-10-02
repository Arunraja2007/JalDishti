# JalDrishti: Geospatial Watershed Intelligence Platform

> **SIH Problem Statement 26015**:  
> *"Application of Geospatial Techniques for visualization and analysis to interpret Geo-Coded Images to enhance watershed Development Outcomes."*

---

## 🌿💧 Visual & Architectural Philosophy

**JalDrishti** (*जल्ड्रिष्टि*) is an environmental GIS and watershed intelligence dashboard built for decision-makers, watershed development teams (WDT), and State Level Nodal Agencies (SLNA).

The platform bridges satellite remote sensing data with geo-tagged ground photographic evidence under the **PMKSY-WDC 2.0** and **DRISHTI / SRISHTI** frameworks:

- 🌿 **Nature Green**: Land Use, Terraced Slopes, Afforestation, Vegetation Index (NDVI) & Ecology
- 💧 **Water Blue**: River Basins, Surface Storage Tanks, Check Dams, Canals & Hydrology
- 🗺️ **Geospatial Map**: National Watershed Boundaries, Drainage Orders & Hypsometry
- 📍 **Field Evidence**: High-resolution Geo-coded Field Photographs with EXIF & GPS Audit Trails

---

## 🚀 Key Platform Features

1. **All-India Geospatial Viewport**:
   - Leaflet/React-Leaflet interactive GIS map with smooth panning across major Indian basins (Godavari, Krishna, Narmada, Mahanadi, Ganga sub-basins, Cauvery, Pennar, Sabarmati, Chambal, Shivalik).
   - Basemap switcher: CartoDB Positron (clean light), Esri Satellite Aerial, OpenTopoMap (terrain hypsometry), and OpenStreetMap.
   - Vector overlays: Watershed boundaries, Strahler stream networks (orders 1–4), surface water bodies, and LULC zones.
   - **Interactive Measurement Tool**: Measure on-the-fly linear stream distances (km) and polygon catchment areas (km² / Hectares).

2. **Geo-coded Field Photo Audit (DRISHTI Standard)**:
   - Field observation markers across structure categories (*Check Dams, Farm Ponds, Canals, Soil Erosion Gullies, Vegetation, Water Bodies, Contour Bunds, Gully Plugs*).
   - High-fidelity evidence cards with GPS Lat/Lng, elevation, azimuth, structure dimensions, storage capacity, and status badges.
   - **Interactive Field Evidence Simulator**: Allows surveyors to record and publish new geo-tagged observations with instant live map synchronization.

3. **Land Use / Land Cover (LULC)**:
   - NRSC 1:250,000 standard classification taxonomy (Dense Forest, Agriculture, Grassland, Water Bodies, Built-up, Barren).
   - Area and percentage breakdown analytics per watershed.
   - Official **NRSC Bhuvan LULC WMS** integration toggle.

4. **Water Resources & Hydrological Monitoring**:
   - Surface water body inventories, storage capacity metrics (TCM), and pre-monsoon vs. post-monsoon water spread dynamics.
   - Water harvesting structures tracking (masonry check dams, earthen bunds, percolation tanks with recharge shafts).

5. **Terrain & DEM Hypsometry**:
   - Topographic elevation profiles from ridge to valley (CCT on ridge top, check dams on mid-slope, percolation tanks in valley bed).
   - Slope classification: Nearly Level (0–3%), Gentle (3–8%), Moderate (8–15%), Steep (15–30%), and Escarpment (>30%).

6. **Multi-Temporal Change Detection**:
   - Interactive Before vs. After split slider comparing pre-treatment degraded terrain with post-intervention restored watersheds.
   - Measurable ground gain statistics: Vegetation canopy (+38%), water spread area (+54%), and soil loss reduction (-62%).

7. **Official Watershed Assessment Reports**:
   - Printable / exportable assessment document containing official MoRD / NRSC format headers, location profile, LULC table, photographic audit logs, and digital signature sign-off.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + Vite
- **Mapping & GIS**: Leaflet 1.9 + React-Leaflet 4.2
- **Icons & Visuals**: Lucide React
- **Design System**: Vanilla CSS with custom Nature Green & Water Blue design tokens (`src/styles/tokens.css`)
- **Geographic Data Format**: GeoJSON (EPSG:4326) & OGC WMS (EPSG:4326 / EPSG:3857)

---

## 📂 Project Structure

```
watershed/
├── src/
│   ├── components/
│   │   ├── Header/                   # Brand logo, status pills, data source modal
│   │   ├── Sidebar/                  # Navigation with land/water theme accents
│   │   ├── Map/                      # Leaflet GIS container, layers, measurement tools
│   │   ├── WatershedInfoPanel/       # Right-side biophysical contextual drawer
│   │   ├── FieldPhotoModal/          # DRISHTI photo inspector & upload simulator
│   │   └── Common/                   # Data source notice modal
│   │
│   ├── pages/
│   │   ├── Dashboard/                # All-India KPI cards, basin breakdowns
│   │   ├── WatershedExplorer/        # Multi-filter search and zoom
│   │   ├── GeoCodedImages/           # Photographic field evidence gallery
│   │   ├── LandUseLandCover/         # LULC classifications and charts
│   │   ├── WaterResources/           # Waterbodies and storage dynamics
│   │   ├── TerrainAnalysis/          # DEM slope and hypsometry profile
│   │   ├── VegetationNDVI/           # Monthly NDVI trends & canopy density
│   │   ├── ChangeDetection/          # Interactive Before/After slider
│   │   └── Reports/                  # Printable assessment reports
│   │
│   ├── services/
│   │   ├── mapService.js             # Layer loading and dynamic styling
│   │   ├── watershedService.js       # Watershed filtering & spatial queries
│   │   ├── imageService.js           # Geo-coded photo store & upload handler
│   │   ├── geospatialService.js      # Haversine distance, polygon area, slope
│   │   └── bhuvanWmsService.js       # NRSC Bhuvan WMS endpoint builder
│   │
│   ├── data/
│   │   ├── nationalStats.js          # Aggregated national metrics
│   │   ├── lulcClassifications.js    # NRSC Level-I / Level-II taxonomy
│   │   ├── changeDetectionCases.js   # Before/After case studies
│   │   └── wmsConfig.js              # WMS & Basemap tile providers
│   │
│   ├── styles/
│   │   ├── tokens.css                # Green & Blue CSS design tokens
│   │   ├── map.css                   # Leaflet overrides, HUDs, custom pins
│   │   ├── components.css            # Responsive layout, cards, reports
│   │   └── index.css                 # Global CSS entry
│   │
│   ├── App.jsx                       # Main application shell
│   └── main.jsx                      # Vite entry point
│
├── public/
│   ├── logo.svg                      # Official JalDrishti emblem (Leaf + Drop)
│   └── sample-data/
│       ├── watersheds.geojson        # India watershed vector boundaries
│       ├── waterbodies.geojson       # Lakes, tanks, reservoirs
│       ├── streams.geojson           # Strahler drainage network (Orders 1-4)
│       ├── field_observations.geojson# DRISHTI geo-tagged photo records
│       ├── lulc_zones.geojson        # Zonal land cover polygons
│       └── images/                   # Field evidence SVG illustrations
│
├── data/                             # Future backend raw GIS archive
│   ├── watershed_boundary/
│   ├── dem/
│   ├── satellite/
│   ├── lulc/
│   ├── waterbodies/
│   ├── geotagged_images/
│   └── metadata/
│       └── metadata.json             # Official data provenance & CRS documentation
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🌐 Official Indian Geospatial Data Sources

| Dataset | Authority / Portal | Endpoint / URL | Product / Format |
|---|---|---|---|
| **India Watershed Boundaries** | GoI Open Government Data (OGD) | [data.gov.in](https://www.data.gov.in/catalog/hydrological-boundaries) | Shapefile ZIP (EPSG:4326) |
| **Bhuvan Open EO Archive** | NRSC / ISRO | [bhuvan-app3.nrsc.gov.in](https://bhuvan-app3.nrsc.gov.in/data/download/) | CartoDEM 30m, Resourcesat AWiFS, LISS-III |
| **Bhuvan Thematic LULC 1:250K** | NRSC / ISRO | [bhuvan-app1.nrsc.gov.in](https://bhuvan-app1.nrsc.gov.in/2dresources/bhuvanstore2.php) | WMS: `https://bhuvan-ras2.nrsc.gov.in/cgi-bin/LULC250K.exe` |
| **Bhuvan Thematic Services** | NRSC / ISRO | [bhuvan-app1.nrsc.gov.in](https://bhuvan-app1.nrsc.gov.in/thematic/thematic/usertasks/download1/tooldown1.php) | Wastelands, Degradation, Waterbodies |
| **DRISHTI / SRISHTI Mobile Geo-tagging** | MoRD / DoLR / PMKSY-WDC | PMKSY-WDC Portal | Geo-tagged field photo records with GPS metadata |

> ℹ️ **Authentication Note**: Bulk raw raster downloads from Bhuvan require a registered ISRO user account. Web Map Service (WMS) endpoints can be consumed directly.

---

## 🔒 Data Integrity: Real vs. Sample Data

- **Real Data**: The platform adheres strictly to the official OGD / NRSC schema and supports live WMS layers (e.g. Bhuvan LULC 2022-23).
- **Sample Data**: High-fidelity vector GeoJSON datasets (e.g. Ralegan Siddhi, Bundelkhand, Ananthapuramu, Cauvery, Chambal) are included in `public/sample-data/` to ensure full offline functionality during prototyping and evaluation. Every prototype dataset is explicitly labelled in the UI.

---

## 📖 How to Add New Datasets

### 1. Adding Watershed Boundaries
Place your GeoJSON file in `public/sample-data/watersheds.geojson` or load it dynamically via `MapService.loadWatershedsGeoJson()`. Ensure properties include `id`, `name`, `code`, `basin`, `state`, `district`, `area_sqkm`, `elevation_min`, `elevation_max`, `mean_slope_pct`, and `priority_level`.

### 2. Adding DEM / Elevation Raster
Download CartoDEM 1-arcsec tiles from the Bhuvan Open Data portal. Place processed GeoTIFF / DEM tiles in `data/dem/`. For web rendering, convert slope and hypsometry to vector contours or serve via Geoserver / MapServer WMS.

### 3. Adding Satellite Imagery (AWiFS / LISS-III / Sentinel-2)
Place orthorectified multi-spectral scenes in `data/satellite/`. Calculate NDVI using `(NIR - Red) / (NIR + Red)` and export classified NDVI zones to GeoJSON in `public/sample-data/`.

### 4. Adding Geo-Coded Field Photos (DRISHTI)
Use the built-in **"Upload Geotag"** simulator modal in the app, or append directly to `public/sample-data/field_observations.geojson`:
```json
{
  "type": "Feature",
  "properties": {
    "id": "GEO-OBS-11",
    "title": "Masonry Check Dam CD-09",
    "category": "Check Dam",
    "watershed_id": "WS-MH-GOD-01",
    "latitude": 19.0210,
    "longitude": 74.4320,
    "elevation_m": 618,
    "date": "2024-04-15",
    "surveyor": "Field Engineer Name",
    "agency": "WDT Parner",
    "dimensions": "Length: 16m | Height: 2.0m",
    "condition": "Functional / Optimal",
    "description": "Structure holding surplus water with zero seepage.",
    "image": "/sample-data/images/check_dam_1.svg",
    "verified": true
  },
  "geometry": {
    "type": "Point",
    "coordinates": [74.4320, 19.0210]
  }
}
```

---

## 💻 Running the Platform Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🏆 SIH Evaluation Checklist

- [x] Nature Green & Water Blue visual identity
- [x] All-India Leaflet map with multiple basemaps & Bhuvan WMS
- [x] Distance and Area measurement tools
- [x] Watershed Explorer with interactive map highlight
- [x] Geo-coded photo evidence with DRISHTI metadata and simulation uploader
- [x] LULC class-wise distribution analysis
- [x] Water resources and storage capacity tracking
- [x] Terrain & DEM hypsometry slope zoning
- [x] Vegetation / NDVI temporal trend analysis
- [x] Before vs. After change detection interactive slider
- [x] Downloadable / printable assessment report generator
- [x] Official data source documentation & notice modal
