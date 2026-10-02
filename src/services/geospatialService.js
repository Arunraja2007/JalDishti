/**
 * JalDrishti Platform - Geospatial Analysis & Calculation Utilities
 */

export const GeospatialService = {
  /**
   * Calculate Haversine distance between two [lat, lng] points in kilometers
   */
  calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  },

  /**
   * Calculate approximate polygon area in sq km for coordinates array [[lat, lng], ...]
   */
  calculatePolygonAreaSqKm(coords) {
    if (!coords || coords.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < coords.length; i++) {
      const j = (i + 1) % coords.length;
      const xi = this.deg2rad(coords[i][1]) * 6371 * Math.cos(this.deg2rad((coords[i][0] + coords[j][0]) / 2));
      const yi = this.deg2rad(coords[i][0]) * 6371;
      const xj = this.deg2rad(coords[j][1]) * 6371 * Math.cos(this.deg2rad((coords[i][0] + coords[j][0]) / 2));
      const yj = this.deg2rad(coords[j][0]) * 6371;
      area += (xi * yj - xj * yi);
    }
    return Math.abs(area / 2);
  },

  /**
   * Classify slope percentages into standard soil conservation terrain categories
   */
  classifySlope(slopePct) {
    if (slopePct < 3) return { category: 'Nearly Level (0-3%)', color: '#86efac', recommendation: 'Suitable for broadbed cultivation' };
    if (slopePct < 8) return { category: 'Gentle Slope (3-8%)', color: '#40916c', recommendation: 'Contour bunding & vegetative barriers recommended' };
    if (slopePct < 15) return { category: 'Moderate Slope (8-15%)', color: '#ca8a04', recommendation: 'Continuous contour trenches & check dams required' };
    if (slopePct < 30) return { category: 'Steep Slope (15-30%)', color: '#ea580c', recommendation: 'Staggered trenches, afforestation & silvipasture' };
    return { category: 'Very Steep / Escarpment (>30%)', color: '#dc2626', recommendation: 'Strict protective forestry & gully plug cascading' };
  }
};
