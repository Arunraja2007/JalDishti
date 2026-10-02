/**
 * JalDrishti Geospatial Platform - Official WMS & Base Layer Configurations
 * Sources cited according to NRSC / ISRO Bhuvan & GoI Open Data specifications.
 */

export const BASEMAP_PROVIDERS = {
  carto_positron: {
    id: 'carto_positron',
    name: 'CartoDB Positron (Clean Light)',
    type: 'tile',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
    subdomains: 'abcd',
    default: true
  },
  esri_imagery: {
    id: 'esri_imagery',
    name: 'Satellite Aerial (Esri World Imagery)',
    type: 'tile',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community',
    maxZoom: 19
  },
  opentopo: {
    id: 'opentopo',
    name: 'OpenTopoMap (Terrain & Contours)',
    type: 'tile',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://openstreetmap.org">OSM</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxZoom: 17
  },
  osm_standard: {
    id: 'osm_standard',
    name: 'OpenStreetMap Standard',
    type: 'tile',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }
};

export const OFFICIAL_BHUVAN_WMS = {
  lulc_250k: {
    id: 'bhuvan_lulc_250k',
    name: 'Bhuvan LULC 1:250K (2022-23)',
    authority: 'NRSC / ISRO',
    url: 'https://bhuvan-ras2.nrsc.gov.in/cgi-bin/LULC250K.exe',
    layers: 'LULC250k_2223',
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    attribution: '&copy; NRSC/ISRO Bhuvan LULC Thematic Service',
    description: 'Official Multi-temporal Land Use Land Cover 1:250,000 scale thematic product by NRSC.'
  },
  thematic_waterbodies: {
    id: 'bhuvan_thematic_waterbodies',
    name: 'Bhuvan Thematic Water Bodies',
    authority: 'NRSC / ISRO',
    url: 'https://bhuvan-ras2.nrsc.gov.in/cgi-bin/waterbodies.exe',
    layers: 'water_bodies_national',
    format: 'image/png',
    transparent: true,
    attribution: '&copy; NRSC/ISRO Thematic Geospatial Services',
    description: 'Bhuvan National Water Bodies Information System monitoring surface water spread.'
  },
  cartodem_elevation: {
    id: 'nrsc_cartodem',
    name: 'CartoDEM 1-arcsec Elevation Grid (30m)',
    authority: 'NRSC / ISRO',
    url: 'https://bhuvan-app3.nrsc.gov.in/data/download/',
    accessNote: 'Available via Bhuvan Open EO Data Archive portal upon free ISRO authentication.'
  }
};
