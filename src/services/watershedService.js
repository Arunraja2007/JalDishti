/**
 * JalDrishti Platform - Watershed Data Service Layer
 */

import { MapService } from './mapService';
import { NATIONAL_WATERSHED_METRICS } from '../data/nationalStats';

export const WatershedService = {
  async getAllWatersheds() {
    const geojson = await MapService.loadWatershedsGeoJson();
    return geojson.features.map(f => ({
      ...f.properties,
      geometry: f.geometry
    }));
  },

  async getWatershedById(id) {
    const watersheds = await this.getAllWatersheds();
    return watersheds.find(w => w.id === id) || null;
  },

  getNationalMetrics() {
    return NATIONAL_WATERSHED_METRICS;
  },

  filterWatersheds(watersheds, { basin, state, priority, searchQuery }) {
    return watersheds.filter(ws => {
      if (basin && basin !== 'all' && ws.basin !== basin) return false;
      if (state && state !== 'all' && ws.state !== state) return false;
      if (priority && priority !== 'all' && ws.priority_level !== priority) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = ws.name?.toLowerCase().includes(q);
        const matchDistrict = ws.district?.toLowerCase().includes(q);
        const matchState = ws.state?.toLowerCase().includes(q);
        const matchCode = ws.code?.toLowerCase().includes(q);
        if (!matchName && !matchDistrict && !matchState && !matchCode) return false;
      }
      return true;
    });
  }
};
