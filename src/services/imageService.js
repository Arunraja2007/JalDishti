/**
 * JalDrishti Platform - Geo-coded Image & Field Evidence Service Layer
 * Follows DRISHTI / PMKSY Mobile Geo-tagging schema standards.
 */

import { MapService } from './mapService';

// Local reactive observation store for simulation
let dynamicObservations = null;

export const ImageService = {
  async getAllObservations() {
    if (!dynamicObservations) {
      const geojson = await MapService.loadFieldObservationsGeoJson();
      dynamicObservations = geojson.features.map(f => ({
        ...f.properties,
        geometry: f.geometry,
        coordinates: f.geometry.coordinates
      }));
    }
    return [...dynamicObservations];
  },

  async getObservationById(id) {
    const list = await this.getAllObservations();
    return list.find(o => o.id === id) || null;
  },

  async getObservationsByWatershed(watershedId) {
    const list = await this.getAllObservations();
    return list.filter(o => o.watershed_id === watershedId);
  },

  async getObservationsByCategory(category) {
    const list = await this.getAllObservations();
    if (!category || category === 'All') return list;
    return list.filter(o => o.category === category);
  },

  /**
   * Simulate field surveyor uploading a geo-tagged image in real-time
   */
  async addObservation(newObs) {
    const list = await this.getAllObservations();
    const createdObs = {
      id: `GEO-OBS-${String(list.length + 1).padStart(2, '0')}`,
      title: newObs.title || 'New Field Survey Observation',
      category: newObs.category || 'Check Dam',
      watershed_id: newObs.watershed_id || 'WS-MH-GOD-01',
      watershed: newObs.watershed || 'Ralegan-Siddhi Upper Godavari Micro-Watershed',
      state: newObs.state || 'Maharashtra',
      latitude: parseFloat(newObs.latitude) || 19.012,
      longitude: parseFloat(newObs.longitude) || 74.453,
      elevation_m: parseFloat(newObs.elevation_m) || 610,
      date: newObs.date || new Date().toISOString().split('T')[0],
      surveyor: newObs.surveyor || 'Field Surveyor (App User)',
      agency: newObs.agency || 'PMKSY Field Unit',
      structure_id: newObs.structure_id || `STRUCT-${Date.now().toString().slice(-4)}`,
      dimensions: newObs.dimensions || 'Standard specifications',
      storage_capacity_cum: parseFloat(newObs.storage_capacity_cum) || 1500,
      condition: newObs.condition || 'Functional / Optimal',
      impact_status: newObs.impact_status || 'Under Monitoring',
      description: newObs.description || 'Field observation uploaded via JalDrishti mobile simulation.',
      image: newObs.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Check_dam_in_Rajasthan%2C_India.jpg/800px-Check_dam_in_Rajasthan%2C_India.jpg',
      verified: true,
      verification_agency: 'JalDrishti Digital Verification',
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(newObs.longitude) || 74.453, parseFloat(newObs.latitude) || 19.012]
      }
    };

    dynamicObservations.unshift(createdObs);
    return createdObs;
  }
};
