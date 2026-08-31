import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'

import createWFSSource from './createWFSSource'

const DEFAULT_OVERLAY_STYLE = new Style({
  stroke: new Stroke({ color: 'rgba(80, 80, 80, 0.9)', width: 1.5 })
})

function buildOverlayStyle(descriptor) {
  const style = descriptor?.style
  if (!style) return DEFAULT_OVERLAY_STYLE

  const styleOpts = {}
  if (style.stroke) {
    styleOpts.stroke = new Stroke({
      color: style.stroke.color || 'rgba(80, 80, 80, 0.9)',
      width: style.stroke.width ?? 1.5
    })
  }
  if (style.fill) {
    styleOpts.fill = new Fill({ color: style.fill.color || 'rgba(0, 0, 0, 0)' })
  }
  return new Style(styleOpts)
}

export default function createOverlayLayer(descriptor) {
  return new VectorLayer({
    source: createWFSSource(descriptor),
    style: buildOverlayStyle(descriptor)
  })
}
