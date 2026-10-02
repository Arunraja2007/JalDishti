/**
 * JalDrishti Platform - NRSC Bhuvan WMS / WMTS Integration Helper
 */

import { OFFICIAL_BHUVAN_WMS } from '../data/wmsConfig';

export const BhuvanWmsService = {
  getLulcWmsLayerConfig() {
    return OFFICIAL_BHUVAN_WMS.lulc_250k;
  },

  getWaterbodiesWmsConfig() {
    return OFFICIAL_BHUVAN_WMS.thematic_waterbodies;
  },

  buildGetMapUrl(layerKey, bbox, width = 256, height = 256) {
    const config = OFFICIAL_BHUVAN_WMS[layerKey];
    if (!config || !config.url) return null;
    const bboxStr = bbox.join(',');
    return `${config.url}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=${config.layers}&STYLES=&SRS=EPSG:4326&BBOX=${bboxStr}&WIDTH=${width}&HEIGHT=${height}&FORMAT=image/png&TRANSPARENT=TRUE`;
  }
};
