import TileLayer from 'ol/layer/Tile'
import WebGLTileLayer from 'ol/layer/WebGLTile'
import OSM from 'ol/source/OSM'
import GeoTIFF from 'ol/source/GeoTIFF'
import TileWMS from 'ol/source/TileWMS'
import XYZ from 'ol/source/XYZ'

import './registerProjections'

const DEFAULT_WMS_FORMAT = 'image/png'

function createTileLayer (descriptor) {
  const { type, url, params, attributions, format, projection } = descriptor || {}
  let source

  switch (type) {
    case 'osm':
      source = new OSM(attributions ? { attributions } : undefined)
      break

    case 'wms': {
      if (!url) throw new Error('createTileLayer: wms descriptor requires a url')
      if (!params?.LAYERS) {
        throw new Error('createTileLayer: wms descriptor requires params.LAYERS')
      }
      source = new TileWMS({
        url,
        params: { ...params, FORMAT: format || params.FORMAT || DEFAULT_WMS_FORMAT },
        ...(attributions ? { attributions } : {}),
        ...(projection ? { projection } : {})
      })
      break
    }

    case 'xyz': {
      if (!url) throw new Error('createTileLayer: xyz descriptor requires a url')
      source = new XYZ({
        url,
        ...(attributions ? { attributions } : {}),
        ...(projection ? { projection } : {})
      })
      break
    }

    case 'cog': {
      if (!url) throw new Error('createTileLayer: cog descriptor requires a url')
      const cogSource = new GeoTIFF({ sources: [{ url }] })
      if (attributions) cogSource.setAttributions(attributions)
      return new WebGLTileLayer({ source: cogSource })
    }

    default:
      throw new Error(`createTileLayer: unknown descriptor type "${type}"`)
  }

  return new TileLayer({ preload: 1, source })
}

export default createTileLayer
