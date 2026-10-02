/**
 * JalDrishti Platform - Map Service Layer
 * Manages layer loading, style generation, and coordinate calculations.
 */

import { BASEMAP_PROVIDERS, OFFICIAL_BHUVAN_WMS } from '../data/wmsConfig';

export const MapService = {
  getBasemapProviders() {
    return BASEMAP_PROVIDERS;
  },

  getOfficialBhuvanWmsConfig() {
    return OFFICIAL_BHUVAN_WMS;
  },

  async loadWatershedsGeoJson() {
    try {
      const response = await fetch('/sample-data/watersheds.geojson');
      if (!response.ok) throw new Error('Failed to load watersheds GeoJSON');
      return await response.json();
    } catch (err) {
      console.error('Error in loadWatershedsGeoJson:', err);
      return { type: 'FeatureCollection', features: [] };
    }
  },

  async loadWaterbodiesGeoJson() {
    try {
      const response = await fetch('/sample-data/waterbodies.geojson');
      if (!response.ok) throw new Error('Failed to load waterbodies GeoJSON');
      return await response.json();
    } catch (err) {
      console.error('Error in loadWaterbodiesGeoJson:', err);
      return { type: 'FeatureCollection', features: [] };
    }
  },

  async loadStreamsGeoJson() {
    try {
      const response = await fetch('/sample-data/streams.geojson');
      if (!response.ok) throw new Error('Failed to load streams GeoJSON');
      return await response.json();
    } catch (err) {
      console.error('Error in loadStreamsGeoJson:', err);
      return { type: 'FeatureCollection', features: [] };
    }
  },

  async loadFieldObservationsGeoJson() {
    try {
      const response = await fetch('/sample-data/field_observations.geojson');
      if (!response.ok) throw new Error('Failed to load field observations GeoJSON');
      return await response.json();
    } catch (err) {
      console.error('Error in loadFieldObservationsGeoJson:', err);
      return { type: 'FeatureCollection', features: [] };
    }
  },

  async loadLulcZonesGeoJson() {
    try {
      const response = await fetch('/sample-data/lulc_zones.geojson');
      if (!response.ok) throw new Error('Failed to load LULC zones GeoJSON');
      return await response.json();
    } catch (err) {
      console.error('Error in loadLulcZonesGeoJson:', err);
      return { type: 'FeatureCollection', features: [] };
    }
  },

  /**
   * Get dynamic Leaflet style for a Watershed Boundary Feature
   */
  getWatershedStyle(feature, isSelected = false, isHovered = false) {
    const priority = feature?.properties?.priority_level || 'Moderate';
    
    let strokeColor = '#2d6a4f'; // Nature Green default
    let fillColor = '#52b788';

    if (priority === 'Critical') {
      strokeColor = '#b91c1c';
      fillColor = '#ef4444';
    } else if (priority === 'High') {
      strokeColor = '#c2410c';
      fillColor = '#f97316';
    }

    if (isSelected) {
      return {
        color: '#0284c7', // Water Blue highlight
        weight: 3.5,
        opacity: 1,
        fillColor: '#38bdf8',
        fillOpacity: 0.35,
        dashArray: null
      };
    }

    if (isHovered) {
      return {
        color: '#1b4332',
        weight: 2.5,
        opacity: 1,
        fillColor: fillColor,
        fillOpacity: 0.25,
        dashArray: null
      };
    }

    return {
      color: strokeColor,
      weight: 1.8,
      opacity: 0.85,
      fillColor: fillColor,
      fillOpacity: 0.12,
      dashArray: '4, 4'
    };
  },

  /**
   * Get Leaflet style for Waterbodies
   */
  getWaterbodyStyle(feature) {
    return {
      color: '#0369a1',
      weight: 1.5,
      opacity: 0.9,
      fillColor: '#0284c7',
      fillOpacity: 0.55
    };
  },

  /**
   * Get Leaflet style for Streams and Drainage Network
   */
  getStreamStyle(feature) {
    const order = feature?.properties?.order || 1;
    const weights = { 1: 1.5, 2: 2.2, 3: 3.2, 4: 4.2 };
    return {
      color: '#0284c7',
      weight: weights[order] || 2,
      opacity: 0.85,
      lineCap: 'round',
      lineJoin: 'round'
    };
  },

  /**
   * Get Leaflet style for LULC Polygons
   */
  getLulcStyle(feature) {
    const color = feature?.properties?.color || '#40916c';
    return {
      color: color,
      weight: 1,
      opacity: 0.7,
      fillColor: color,
      fillOpacity: 0.4
    };
  }
};
