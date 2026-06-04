import proj4 from 'proj4'
import { register } from 'ol/proj/proj4'

// OL only ships EPSG:4326 and EPSG:3857; register the non-web-mercator CRS our COG tile layers use.
const PROJ4_DEFS = {
  'EPSG:26915': '+proj=utm +zone=15 +datum=NAD83 +units=m +no_defs'
}

Object.entries(PROJ4_DEFS).forEach(([code, definition]) => proj4.defs(code, definition))
register(proj4)
