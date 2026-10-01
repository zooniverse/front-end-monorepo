export const ZOOM_ANIMATION_DURATION_MS = 250
// Fit small subjects close enough to annotate, without outrunning aerial imagery.
// Temporarily resetting MAX_FIT_ZOOM to 12 for NfN launch, with intent to set to 19 for detailed views like with Beaver Dams project
export const MAX_FIT_ZOOM = 12
export const SUBJECT_OUTLINE_COLOR = 'rgba(255, 255, 255, 0.9)'
export const SUBJECT_OUTLINE_WIDTH = 2
export const POINTER_MOVE_HIT_CHECK_INTERVAL_MS = 80
export const POINTER_MOVE_HIT_CHECK_MIN_DELTA_PIXELS = 4

export const GEOJSON_READ_OPTIONS = {
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857'
}

export const UNIT_OPTION_TO_SCALE_LINE_UNITS = {
  meters: 'metric',
  kilometers: 'metric',
  feet: 'imperial',
  miles: 'imperial',
  'nautical miles': 'nautical'
}
