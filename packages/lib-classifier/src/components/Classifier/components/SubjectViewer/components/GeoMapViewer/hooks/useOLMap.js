import { useEffect, useState } from 'react'
import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control/defaults'
import ScaleLine from 'ol/control/ScaleLine'
import { defaults as defaultInteractions } from 'ol/interaction/defaults'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import createOverlayLayer from '../helpers/createOverlayLayer'
import createTileLayer from '../helpers/createTileLayer'

const FALLBACK_TILE_LAYERS = [{ type: 'osm' }]

// Incomplete descriptors (drafts saved from the Lab editor) are skipped.
export function isUsableOverlayDescriptor(descriptor) {
  if (!descriptor?.type) return false
  if (descriptor.type === 'wfs') return !!descriptor.url && !!descriptor.typeName
  if (descriptor.type === 'geojson') return !!descriptor.url
  return false
}

export default function useOLMap(containerRef, tileLayers = [], overlayLayers = [], activeLayerIndex = 0) {
  const [state, setState] = useState({ map: null, source: null, layer: null, scaleLine: null, overlays: [] })
  const [baseLayer, setBaseLayer] = useState(null)
  const { map } = state

  useEffect(() => {
    if (!containerRef.current) return undefined

    const source = new VectorSource({ features: [] })
    const layer = new VectorLayer({ source })
    const scaleLine = new ScaleLine()

    // Overlays render above the active basemap, beneath the editable feature layer.
    const overlayOlLayers = overlayLayers.filter(isUsableOverlayDescriptor).map(createOverlayLayer)

    const map = new Map({
      target: containerRef.current,
      layers: [...overlayOlLayers, layer],
      view: new View({ center: [0, 0], zoom: 0 }),
      controls: defaultControls({ zoom: false }).extend([scaleLine]),
      // The container's tabindex would otherwise make OL gate drag-pan and wheel-zoom behind focus.
      interactions: defaultInteractions({ onFocusOnly: false })
    })

    setState({ map, source, layer, scaleLine, overlays: overlayOlLayers })

    return () => {
      map.setTarget(undefined)
      setState({ map: null, source: null, layer: null, scaleLine: null, overlays: [] })
    }
  }, [containerRef, overlayLayers])

  // Only the active base layer exists, so hidden layers never request headers or tiles.
  useEffect(() => {
    if (!map) return undefined
    const descriptors = tileLayers.length > 0 ? tileLayers : FALLBACK_TILE_LAYERS
    const tileLayer = createTileLayer(descriptors[activeLayerIndex] ?? descriptors[0])
    map.getLayers().insertAt(0, tileLayer)
    setBaseLayer(tileLayer)

    return () => {
      map.removeLayer(tileLayer)
      tileLayer.dispose()
      setBaseLayer(null)
    }
  }, [map, tileLayers, activeLayerIndex])

  return { ...state, baseLayer }
}
