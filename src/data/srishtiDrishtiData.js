/**
 * SRISHTI-DRISHTI Platform Data
 * Based on SIH Problem Statement 26015:
 * "Application of Geospatial Techniques for visualization and analysis
 *  to interpret Geo-Coded Images to enhance watershed Development Outcomes"
 *
 * Platform: SRISHTI-DRISHTI
 * Satellite: AWiFS / LISS-III / LISS-IV / Cartosat-1 (30m resolution)
 * Organization: DoLR / MoRD, Govt. of India
 */

export const SRISHTI_PLATFORM_INFO = {
  name: 'SRISHTI-DRISHTI',
  full_name: 'Spatial Resource Information System Hub for Tracking Interventions - DRISHTI',
  resolution_m: 30,
  sensors: ['AWiFS', 'LISS-III', 'LISS-IV', 'Cartosat-1 DEM'],
  organization: 'Department of Land Resources (DoLR), Ministry of Rural Development',
  framework: 'PMKSY-WDC 2.0 Geospatial Monitoring Framework',
  purpose: 'Visualization and analysis of geo-coded images to interpret watershed characteristics, monitor interventions, and support evidence-based decision-making',
};

export const THEMATIC_OUTPUTS = [
  {
    id: 'lulc',
    name: 'Land Use / Land Cover (LULC)',
    count: 3200,
    color: '#40916c',
    icon: 'Layers',
    description: 'Biophysical land classification maps derived from multi-temporal satellite imagery using NRSC 1:250K thematic standards.',
    accuracy_pct: 92.1,
    method: 'Supervised Maximum Likelihood Classification + Field Truth',
    resolution: '30m AWiFS / 5.8m LISS-IV',
    parameters: ['Forest Canopy', 'Agriculture (Kharif/Rabi)', 'Grassland & Scrub', 'Surface Water Bodies', 'Built-up', 'Barren/Ravines'],
  },
  {
    id: 'drainage',
    name: 'Drainage & Hydrology Mapping',
    count: 1640,
    color: '#0284c7',
    icon: 'Droplets',
    description: 'Stream network delineation, watershed boundary extraction, and drainage density mapping from CartoDEM 30m elevation model.',
    accuracy_pct: 94.8,
    method: 'DEM-based Automated Watershed Delineation (Arc Hydro/SWAT)',
    resolution: '30m CartoDEM (Cartosat-1 derived)',
    parameters: ['Stream Order (Strahler)', 'Drainage Density', 'Watershed Boundary', 'Ridge Lines', 'Valley Bed Identification'],
  },
  {
    id: 'vegetation',
    name: 'Vegetation / NDVI Analysis',
    count: 2180,
    color: '#1b4332',
    icon: 'Sprout',
    description: 'Temporal NDVI composites derived from AWiFS data to monitor vegetation recovery, biomass gain, and crop vigor post-watershed treatment.',
    accuracy_pct: 91.4,
    method: 'NDVI = (NIR - Red) / (NIR + Red) via multi-date AWiFS composites',
    resolution: '56m AWiFS (seasonal composites)',
    parameters: ['Dense Canopy (NDVI >0.6)', 'Moderate Cover (NDVI 0.35–0.6)', 'Sparse/Fallow (NDVI <0.35)', 'Temporal Change Detection'],
  },
  {
    id: 'intervention',
    name: 'Watershed Intervention Maps',
    count: 1820,
    color: '#ca8a04',
    icon: 'MapPin',
    description: 'Spatial mapping of water harvesting structures, contour bunding zones, afforestation extents, and gully treatment areas from geo-coded field images.',
    accuracy_pct: 89.6,
    method: 'Geo-coded Image Integration with High-resolution LISS-IV / LISS-III',
    resolution: '5.8m LISS-IV (targeted site mapping)',
    parameters: ['Check Dam Locations', 'Farm Pond Extent', 'CCT Trench Lines', 'Afforestation Plots', 'Gully Plug Sites'],
  },
  {
    id: 'change',
    name: 'Multi-Temporal Change Detection',
    count: 1200,
    color: '#7c3aed',
    icon: 'SplitSquareVertical',
    description: 'Before-after satellite image comparison to quantify vegetation recovery, water spread expansion, and land degradation reversal across treatment sites.',
    accuracy_pct: 93.2,
    method: 'Post-Classification Change Matrix + Image Differencing (NDVI delta)',
    resolution: '30m AWiFS (pre/post monsoon composite pair)',
    parameters: ['NDVI Gain/Loss', 'Water Spread Change', 'Land Cover Transition Matrix', 'Erosion / Deposition Zones'],
  },
];

export const SPATIAL_INTERPRETATION_WORKFLOW = [
  {
    step: 1,
    title: 'Geo-coded Image Acquisition',
    desc: 'Field surveyors capture GPS-tagged photographs via DRISHTI mobile app during site visits to watershed treatment structures.',
    icon: 'Camera',
    color: '#0284c7',
    output: 'Raw geo-tagged images with GPS coordinates, timestamp, surveyor ID',
  },
  {
    step: 2,
    title: 'Satellite Data Co-registration',
    desc: 'SRISHTI-DRISHTI platform co-registers field images with corresponding 30m satellite tiles (AWiFS/LISS-III) for spatial context.',
    icon: 'Satellite',
    color: '#7c3aed',
    output: 'Image-to-satellite spatial overlay at 30m resolution',
  },
  {
    step: 3,
    title: 'Thematic Classification',
    desc: 'Multi-spectral bands are classified using supervised algorithms (Maximum Likelihood, Random Forest) with field truth from geo-coded images.',
    icon: 'Layers',
    color: '#40916c',
    output: 'LULC, NDVI, Drainage and Intervention thematic maps',
  },
  {
    step: 4,
    title: 'Spatial Interpretation & Validation',
    desc: 'Classified outputs are validated against geo-coded field evidence. Confidence scoring classifies each result as High/Medium/Low reliability.',
    icon: 'ShieldCheck',
    color: '#16a34a',
    output: 'Validated thematic outputs with accuracy assessment (Kappa)',
  },
  {
    step: 5,
    title: 'Change Detection Analysis',
    desc: 'Pre and post-intervention satellite data pairs are compared using image differencing and post-classification change matrices.',
    icon: 'TrendingUp',
    color: '#ca8a04',
    output: 'Change matrices, NDVI delta maps, water spread change polygons',
  },
  {
    step: 6,
    title: 'GIS Dashboard Visualization',
    desc: 'All validated outputs are published on the JalDrishti dashboard as interactive maps, charts, and downloadable reports for planners and administrators.',
    icon: 'BarChart3',
    color: '#0369a1',
    output: 'Interactive GIS dashboard, PDF reports, data exports',
  },
];

export const INTERPRETATION_CASE_STUDIES = [
  {
    id: 'CS-01',
    site: 'Ralegan-Siddhi Micro-Watershed',
    state: 'Maharashtra',
    coordinates: { lat: 18.99, lng: 74.47 },
    analysis_type: 'NDVI Change Detection + LULC',
    before_year: 2018,
    after_year: 2024,
    satellite_data: 'AWiFS 56m + LISS-IV 5.8m',
    findings: [
      { metric: 'NDVI Mean', before: 0.24, after: 0.62, unit: 'index', change: '+158%' },
      { metric: 'Dense Forest Cover', before: 8.2, after: 31.4, unit: '% area', change: '+23.2pp' },
      { metric: 'Water Spread', before: 11.2, after: 28.5, unit: 'Ha', change: '+154%' },
      { metric: 'Barren Land', before: 34.6, after: 12.1, unit: '% area', change: '-22.5pp' },
    ],
    intervention: 'CCT + 14 Check Dams + Afforestation',
    geo_images_used: 84,
    confidence: 'High',
  },
  {
    id: 'CS-02',
    site: 'Ananthapuramu Drought Zone',
    state: 'Andhra Pradesh',
    coordinates: { lat: 14.68, lng: 77.6 },
    analysis_type: 'Water Body Dynamics + LULC',
    before_year: 2019,
    after_year: 2024,
    satellite_data: 'LISS-III 23.5m + AWiFS',
    findings: [
      { metric: 'Irrigated Area', before: 420, after: 980, unit: 'Ha', change: '+133%' },
      { metric: 'Water Body Count', before: 8, after: 35, unit: 'farm ponds', change: '+27' },
      { metric: 'Rabi Crop Extent', before: 12, after: 64, unit: '% area', change: '+52pp' },
      { metric: 'Vegetation Gain', before: 0.31, after: 0.53, unit: 'NDVI', change: '+71%' },
    ],
    intervention: '35 HDPE Farm Ponds + Drip Irrigation',
    geo_images_used: 62,
    confidence: 'High',
  },
  {
    id: 'CS-03',
    site: 'Bundelkhand Betwa-Dhasan Catchment',
    state: 'Madhya Pradesh',
    coordinates: { lat: 24.91, lng: 79.59 },
    analysis_type: 'Change Detection + Thematic Mapping',
    before_year: 2020,
    after_year: 2024,
    satellite_data: 'AWiFS 56m seasonal composites',
    findings: [
      { metric: 'Tank Water Spread', before: 11.2, after: 28.5, unit: 'Ha', change: '+154%' },
      { metric: 'Silt-Applied Farmland', before: 0, after: 120, unit: 'Ha', change: '+120 Ha' },
      { metric: 'Groundwater Level', before: 7.8, after: 3.3, unit: 'm depth', change: '-4.5m (rise)' },
      { metric: 'NDVI Post-monsoon', before: 0.38, after: 0.61, unit: 'index', change: '+61%' },
    ],
    intervention: 'Chandela Tank Desilting + Silt Application',
    geo_images_used: 48,
    confidence: 'Medium',
  },
];
