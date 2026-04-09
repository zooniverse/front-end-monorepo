// The map context provides shared options for working with projections and GeoJSON data across the GeoMapViewer components and helpers.

// The default data projection for GeoJSON data is WGS 84 (EPSG:4326), which uses longitude and latitude coordinates in units of decimal degrees.
export const DEFAULT_DATA_PROJECTION = 'EPSG:4326'

// The default view projection is Web Mercator (EPSG:3857). The default base layer is OpenStreetMap, which uses Web Mercator.
export const DEFAULT_FEATURE_PROJECTION = 'EPSG:3857'
