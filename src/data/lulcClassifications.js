/**
 * NRSC Standard LULC Classification Taxonomy
 * Aligned with Bhuvan Thematic LULC 1:250K Level-I & Level-II Standards
 */

export const NRSC_LULC_CLASSES = [
  {
    id: 'forest_dense',
    name: 'Dense Forest / Canopy',
    category: 'Forest',
    color: '#1b4332',
    accent: 'green',
    description: 'Land with tree canopy density of 40% and above. High soil moisture and watershed conservation value.'
  },
  {
    id: 'forest_open',
    name: 'Open / Deciduous Forest',
    category: 'Forest',
    color: '#2d6a4f',
    accent: 'green',
    description: 'Lands with tree canopy density between 10% and 40%.'
  },
  {
    id: 'agriculture_cropland',
    name: 'Agricultural Cropland (Kharif/Rabi)',
    category: 'Agriculture',
    color: '#40916c',
    accent: 'green',
    description: 'Cultivated lands under active rainfed and irrigated crop cycles.'
  },
  {
    id: 'plantation',
    name: 'Horticulture & Agro-Forestry',
    category: 'Agriculture',
    color: '#52b788',
    accent: 'green',
    description: 'Orchards, agro-forestry tracts, and social forestry plantations.'
  },
  {
    id: 'grassland_scrub',
    name: 'Grassland & Grazing Land',
    category: 'Grassland',
    color: '#86efac',
    accent: 'green',
    description: 'Pasture lands, scrub tracts, and natural savannah cover.'
  },
  {
    id: 'water_surface',
    name: 'Lakes, Reservoirs & Ponds',
    category: 'Water',
    color: '#0284c7',
    accent: 'blue',
    description: 'Perennial and seasonal surface water storage and inland wetlands.'
  },
  {
    id: 'water_rivers',
    name: 'Rivers & Drainage Canals',
    category: 'Water',
    color: '#0369a1',
    accent: 'blue',
    description: 'River channels, streams, and irrigation conveyance canals.'
  },
  {
    id: 'builtup_settlement',
    name: 'Built-up / Rural Settlement',
    category: 'Built-up',
    color: '#64748b',
    accent: 'neutral',
    description: 'Habitation clusters, farmsteads, and infrastructure corridors.'
  },
  {
    id: 'barren_ravines',
    name: 'Barren Land / Gully Ravines',
    category: 'Barren Land',
    color: '#b45309',
    accent: 'earth',
    description: 'Severely eroded gully lands, rocky outcrops, and degraded wastelands needing priority conservation.'
  }
];

export const NATIONAL_LULC_DISTRIBUTION = [
  { name: 'Agriculture (Cropland)', pct: 54.2, area_sqkm: 1780000, color: '#40916c' },
  { name: 'Forest & Plantations', pct: 21.8, area_sqkm: 715000, color: '#1b4332' },
  { name: 'Grassland & Scrub', pct: 9.4, area_sqkm: 308000, color: '#86efac' },
  { name: 'Surface Water Bodies', pct: 5.6, area_sqkm: 184000, color: '#0284c7' },
  { name: 'Built-up Settlements', pct: 4.8, area_sqkm: 157000, color: '#64748b' },
  { name: 'Barren & Degraded Wastelands', pct: 4.2, area_sqkm: 138000, color: '#b45309' }
];
