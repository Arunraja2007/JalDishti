/**
 * JalDrishti Platform - National Watershed Level Statistics
 * Structured for SIH Problem Statement 26015 (SRISHTI-DRISHTI)
 * Aligned with PDF references: 26015, 25017, 26016, 26018, 26019
 */

export const NATIONAL_WATERSHED_METRICS = {
  is_demo_data: true,
  data_label: "DEMO / SAMPLE DATA (PROTOTYPE)",
  official_framework: "PMKSY-WDC 2.0 / DoLR & Central Water Commission Watershed Atlas of India",
  
  summary_metrics: {
    total_watersheds: 12450,
    states_covered: 28,
    monitored_waterbodies: 8240,
    geocoded_images: 24680,
    avg_vegetation_index: 0.68,
    priority_attention_areas: 1842,
    total_treated_area_mha: 14.85,
    water_harvesting_structures: 142300,
    groundwater_recharge_potential_bcm: 4.82
  },

  basin_breakdown: [
    { basin: 'Ganga Basin', count: 3420, area_sqkm: 861452, avg_ndvi: 0.62, risk_score: 64 },
    { basin: 'Godavari Basin', count: 1840, area_sqkm: 312812, avg_ndvi: 0.58, risk_score: 58 },
    { basin: 'Krishna Basin', count: 1650, area_sqkm: 258948, avg_ndvi: 0.54, risk_score: 68 },
    { basin: 'Narmada Basin', count: 720, area_sqkm: 98796, avg_ndvi: 0.72, risk_score: 42 },
    { basin: 'Mahanadi Basin', count: 890, area_sqkm: 141589, avg_ndvi: 0.69, risk_score: 48 },
    { basin: 'Cauvery Basin', count: 680, area_sqkm: 81155, avg_ndvi: 0.65, risk_score: 52 },
    { basin: 'Pennar Basin', count: 420, area_sqkm: 55213, avg_ndvi: 0.42, risk_score: 82 },
    { basin: 'Sabarmati & West Flowing', count: 540, area_sqkm: 68420, avg_ndvi: 0.48, risk_score: 74 },
    { basin: 'Indus & Tributaries', count: 810, area_sqkm: 321289, avg_ndvi: 0.70, risk_score: 38 },
    { basin: 'Brahmaputra Basin', count: 1480, area_sqkm: 194413, avg_ndvi: 0.81, risk_score: 32 }
  ],

  structure_categories: [
    { name: 'Check Dams', count: 8420, share_pct: 34.1, icon: 'Dam', color: '#0284c7' },
    { name: 'Farm Ponds', count: 6150, share_pct: 24.9, icon: 'Waves', color: '#0ea5e9' },
    { name: 'Contour Bunding & Trenches', count: 4320, share_pct: 17.5, icon: 'Layers', color: '#40916c' },
    { name: 'Percolation Tanks', count: 2890, share_pct: 11.7, icon: 'Droplets', color: '#0f4c81' },
    { name: 'Gully Plugs & Silt Traps', count: 1940, share_pct: 7.9, icon: 'ShieldAlert', color: '#b45309' },
    { name: 'Afforestation Plantations', count: 960, share_pct: 3.9, icon: 'Trees', color: '#1b4332' }
  ],

  monthly_ndvi_trends: [
    { month: 'Jun', pre_treatment: 0.28, post_treatment: 0.38 },
    { month: 'Jul', pre_treatment: 0.36, post_treatment: 0.52 },
    { month: 'Aug', pre_treatment: 0.48, post_treatment: 0.69 },
    { month: 'Sep', pre_treatment: 0.52, post_treatment: 0.76 },
    { month: 'Oct', pre_treatment: 0.49, post_treatment: 0.71 },
    { month: 'Nov', pre_treatment: 0.41, post_treatment: 0.64 },
    { month: 'Dec', pre_treatment: 0.35, post_treatment: 0.58 },
    { month: 'Jan', pre_treatment: 0.31, post_treatment: 0.50 },
    { month: 'Feb', pre_treatment: 0.26, post_treatment: 0.44 },
    { month: 'Mar', pre_treatment: 0.22, post_treatment: 0.38 },
    { month: 'Apr', pre_treatment: 0.19, post_treatment: 0.32 },
    { month: 'May', pre_treatment: 0.18, post_treatment: 0.29 }
  ],

  /**
   * SRISHTI-DRISHTI Platform Metrics (PDF 26015)
   * 30m spatial resolution satellite data analytics for geo-coded image
   * interpretation and watershed monitoring
   */
  srishti_drishti: {
    satellite_resolution_m: 30,
    platform_name: 'SRISHTI-DRISHTI',
    sensor_types: ['AWiFS', 'LISS-III', 'LISS-IV', 'Cartosat-1'],
    geocoded_images_interpreted: 18420,
    thematic_maps_generated: 6840,
    spatial_interpretation_accuracy_pct: 91.4,
    change_detection_sites: 342,
    total_images_geotagged: 24680,
    images_spatially_validated: 21340,
    images_pending_interpretation: 3340,
    vegetation_maps_produced: 2180,
    drainage_maps_produced: 1640,
    watershed_intervention_maps: 1820,
    land_use_maps_produced: 3200,
    thematic_output_types: [
      { name: 'Land Use / Land Cover Maps', count: 3200, color: '#40916c' },
      { name: 'Drainage & Hydrology Maps', count: 1640, color: '#0284c7' },
      { name: 'Vegetation / NDVI Maps', count: 2180, color: '#1b4332' },
      { name: 'Watershed Intervention Maps', count: 1820, color: '#ca8a04' },
    ],
  },

  /**
   * AI Predictive Risk Scoring (PDF 25017)
   * ML-based delay & intervention risk model for watershed projects
   */
  predictive_risk: {
    model_name: 'WatershedRisk-ML v2.1',
    total_projects_scored: 12450,
    high_risk_count: 1842,
    medium_risk_count: 3680,
    low_risk_count: 6928,
    model_accuracy_pct: 87.3,
    top_delay_factors: [
      { factor: 'Pending Administrative Approvals', weight_pct: 28, color: '#dc2626' },
      { factor: 'Compensation Disbursement Delays', weight_pct: 22, color: '#ea580c' },
      { factor: 'Legal Disputes & Encumbrances', weight_pct: 18, color: '#ca8a04' },
      { factor: 'Incomplete Documentation', weight_pct: 16, color: '#b45309' },
      { factor: 'Rehabilitation & Resettlement Issues', weight_pct: 11, color: '#64748b' },
      { factor: 'Inter-departmental Coordination', weight_pct: 5, color: '#94a3b8' },
    ],
    state_risk_distribution: [
      { state: 'Rajasthan', high: 312, medium: 580, risk_score: 74 },
      { state: 'Maharashtra', high: 284, medium: 490, risk_score: 68 },
      { state: 'Andhra Pradesh', high: 241, medium: 420, risk_score: 72 },
      { state: 'Madhya Pradesh', high: 198, medium: 380, risk_score: 63 },
      { state: 'Karnataka', high: 176, medium: 340, risk_score: 58 },
      { state: 'Telangana', high: 152, medium: 290, risk_score: 61 },
    ],
  },

  /**
   * Geo-coded Image Spatial Interpretation Framework (PDF 26015)
   * Image analysis techniques, confidence scoring & validation outputs
   */
  geo_image_analysis: {
    total_interpreted: 18420,
    confidence_high_pct: 62.4,
    confidence_medium_pct: 28.8,
    confidence_low_pct: 8.8,
    auto_validated: 15280,
    pending_human_review: 2140,
    rejected_poor_quality: 1000,
    interpretation_methods: [
      { method: 'NDVI Change Detection', images: 6240, color: '#40916c' },
      { method: 'Land Degradation Assessment', images: 4180, color: '#b45309' },
      { method: 'Water Body Dynamics', images: 3820, color: '#0284c7' },
      { method: 'Vegetation Cover Analysis', images: 2680, color: '#1b4332' },
      { method: 'Drainage Pattern Mapping', images: 1500, color: '#0369a1' },
    ],
    spatial_accuracy_metrics: {
      positional_accuracy_m: 15,
      thematic_accuracy_pct: 91.4,
      classification_kappa: 0.87,
    },
  },

  /**
   * Digital Workflow & Validation Metrics (PDF 26016, 26018)
   * Land record digitization stats & acquisition process tracking
   */
  digitization_stats: {
    total_records_processed: 84200,
    extraction_accuracy_pct: 94.2,
    validation_passed: 78840,
    pending_verification: 3680,
    rejected_low_confidence: 1680,
    state_wise_progress: [
      { state: 'Maharashtra', processed: 14200, accuracy: 95.1, status: 'On Track' },
      { state: 'Rajasthan', processed: 12800, accuracy: 93.4, status: 'On Track' },
      { state: 'Madhya Pradesh', processed: 11600, accuracy: 91.8, status: 'Delayed' },
      { state: 'Andhra Pradesh', processed: 10400, accuracy: 94.6, status: 'On Track' },
      { state: 'Karnataka', processed: 9200, accuracy: 96.2, status: 'Ahead' },
      { state: 'Telangana', processed: 7800, accuracy: 92.3, status: 'On Track' },
    ],
  },
};
