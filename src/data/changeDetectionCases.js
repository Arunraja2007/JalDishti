/**
 * JalDrishti Platform - Change Detection & Impact Assessment Cases
 * Real-world prototype cases demonstrating Before vs After geospatial interpretation.
 */

export const CHANGE_DETECTION_CASES = [
  {
    id: 'CASE-01',
    watershed_id: 'WS-MH-GOD-01',
    watershed_name: 'Ralegan-Siddhi Upper Godavari Micro-Watershed',
    state: 'Maharashtra',
    title: 'Ridge-to-Valley Comprehensive Conservation (2018 vs 2024)',
    intervention_type: 'Continuous Contour Trenching + 14 Check Dams',
    timeline: { before_year: 2018, after_year: 2024 },
    before_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ravine_erosion_India.jpg/800px-Ravine_erosion_India.jpg',
    after_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Check_dam_in_Rajasthan%2C_India.jpg/800px-Check_dam_in_Rajasthan%2C_India.jpg',
    metrics: {
      vegetation_gain_pct: 38.4,
      water_spread_increase_pct: 54.0,
      soil_loss_reduction_pct: 62.5,
      groundwater_rise_m: 3.8,
      cropping_intensity_increase_pct: 45.0
    },
    spatial_summary: "Satellite NDVI analysis indicates a shift from sparse thorny scrub (NDVI 0.24) in 2018 to dense multi-layer canopy (NDVI 0.62) in 2024. Water surface retention extended from 4 months to 11 months per hydrologic cycle.",
    ground_verification_status: "Verified by SLNA Audit / Field Evidence GEO-OBS-01 & GEO-OBS-05"
  },
  {
    id: 'CASE-02',
    watershed_id: 'WS-AP-PNR-03',
    watershed_name: 'Ananthapuramu Drought-Prone Pennar Sub-basin',
    state: 'Andhra Pradesh',
    title: 'HDPE Lined Farm Pond Network Expansion (2019 vs 2024)',
    intervention_type: '35 Farm Ponds with Micro-irrigation',
    timeline: { before_year: 2019, after_year: 2024 },
    before_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ravine_erosion_India.jpg/800px-Ravine_erosion_India.jpg',
    after_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Farm_pond_in_Andhra_Pradesh.jpg/800px-Farm_pond_in_Andhra_Pradesh.jpg',
    metrics: {
      vegetation_gain_pct: 29.2,
      water_spread_increase_pct: 78.0,
      soil_loss_reduction_pct: 44.0,
      groundwater_rise_m: 2.1,
      cropping_intensity_increase_pct: 52.0
    },
    spatial_summary: "Multi-temporal satellite imagery verifies that farm ponds enabled double cropping (Kharif Groundnut followed by Rabi Chickpea) across 160 hectares of formerly single-crop dryland.",
    ground_verification_status: "Verified via DRISHTI App / Field Evidence GEO-OBS-02"
  },
  {
    id: 'CASE-03',
    watershed_id: 'WS-MP-BTW-02',
    watershed_name: 'Bundelkhand Betwa-Dhasan Catchment',
    state: 'Madhya Pradesh',
    title: 'Traditional Chandela Tank Rejuvenation & Desilting',
    intervention_type: 'Deepening & Silt Application on 120 Arable Farms',
    timeline: { before_year: 2020, after_year: 2024 },
    before_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ravine_erosion_India.jpg/800px-Ravine_erosion_India.jpg',
    after_img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Chandela_tank_Bundelkhand.jpg/800px-Chandela_tank_Bundelkhand.jpg',
    metrics: {
      vegetation_gain_pct: 32.0,
      water_spread_increase_pct: 65.0,
      soil_loss_reduction_pct: 51.0,
      groundwater_rise_m: 4.5,
      cropping_intensity_increase_pct: 38.0
    },
    spatial_summary: "Surface water spread increased from 11.2 Ha to 28.5 Ha post-desilting. Silt application improved soil organic carbon in surrounding agricultural parcels.",
    ground_verification_status: "Verified via DoLR Nodal Audit / Field Evidence GEO-OBS-06"
  }
];
