import { useEffect, useState } from 'react'
import { unByKey } from 'ol/Observable'

const ZOOM_EPSILON = 1e-6
const NO_LIMITS = { atMaxZoom: false, atMinZoom: false }

export default function useZoomLimits (map) {
  const [limits, setLimits] = useState(NO_LIMITS)

  useEffect(() => {
    if (!map) return undefined
    let viewKey = null

    function update () {
      const view = map.getView()
      const zoom = view.getZoom()
      if (zoom === undefined) return setLimits(NO_LIMITS)
      setLimits({
        atMaxZoom: zoom >= view.getMaxZoom() - ZOOM_EPSILON,
        atMinZoom: zoom <= view.getMinZoom() + ZOOM_EPSILON
      })
    }

    // constrainMapToExtent replaces the View, so follow whichever view is current.
    function watchView () {
      if (viewKey) unByKey(viewKey)
      viewKey = map.getView().on('change:resolution', update)
      update()
    }

    watchView()
    const mapKey = map.on('change:view', watchView)
    return () => {
      unByKey(mapKey)
      if (viewKey) unByKey(viewKey)
    }
  }, [map])

  return limits
}
