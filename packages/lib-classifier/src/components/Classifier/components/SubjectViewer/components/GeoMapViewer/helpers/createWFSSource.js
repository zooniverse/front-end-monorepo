import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { bbox as bboxStrategy } from 'ol/loadingstrategy'

export default function createWFSSource(descriptor) {
  if (!descriptor) throw new Error('createWFSSource: descriptor is required')
  const { type, url, typeName, attributions } = descriptor
  const sourceOpts = attributions ? { attributions } : {}

  switch (type) {
    case 'wfs': {
      if (!url) throw new Error('createWFSSource: wfs descriptor requires a url')
      if (!typeName) throw new Error('createWFSSource: wfs descriptor requires a typeName')

      return new VectorSource({
        ...sourceOpts,
        format: new GeoJSON(),
        strategy: bboxStrategy,
        url: (extent, _resolution, projection) => {
          const code = projection.getCode()
          const params = new URLSearchParams({
            service: 'WFS',
            version: '2.0.0',
            request: 'GetFeature',
            typeName,
            outputFormat: 'application/json',
            srsname: code,
            bbox: `${extent.join(',')},${code}`
          })
          const separator = url.includes('?') ? '&' : '?'
          return `${url}${separator}${params.toString()}`
        }
      })
    }

    case 'geojson': {
      if (!url) throw new Error('createWFSSource: geojson descriptor requires a url')

      if (url.includes('{bbox}')) {
        return new VectorSource({
          ...sourceOpts,
          format: new GeoJSON(),
          strategy: bboxStrategy,
          url: (extent) => url.replace('{bbox}', encodeURIComponent(extent.join(',')))
        })
      }

      return new VectorSource({
        ...sourceOpts,
        format: new GeoJSON(),
        url
      })
    }

    default:
      throw new Error(`createWFSSource: unknown descriptor type "${type}"`)
  }
}
