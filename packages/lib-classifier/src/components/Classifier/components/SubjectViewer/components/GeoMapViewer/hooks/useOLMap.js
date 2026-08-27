import { useEffect, useState } from 'react'
import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control/defaults'
import ScaleLine from 'ol/control/ScaleLine'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import createOverlayLayer from '../helpers/createOverlayLayer'
import createTileLayer from '../helpers/createTileLayer'

// Incomplete descriptors (drafts saved from the Lab editor) are skipped.
export function isUsableOverlayDescriptor(descriptor) {
  if (!descriptor?.type) return false
  if (descriptor.type === 'wfs') return !!descriptor.url && !!descriptor.typeName
  if (descriptor.type === 'geojson') return !!descriptor.url
  return false
}

export default function useOLMap(containerRef, tileLayers = [], overlayLayers = []) {
  const [state, setState] = useState({ map: null, source: null, layer: null, scaleLine: null, baseLayers: [], overlays: [] })

  useEffect(() => {
    if (!containerRef.current) return undefined

    const source = new VectorSource({ features: [] })
    const layer = new VectorLayer({ source })
    const scaleLine = new ScaleLine()

    const descriptors = tileLayers.length > 0 ? tileLayers : [{ type: 'osm' }]
    const baseTileLayers = descriptors.map(createTileLayer)
    const defaultLayerIndex = Math.max(0, descriptors.findIndex(descriptor => descriptor?.default))
    baseTileLayers.forEach((tileLayer, index) => tileLayer.setVisible(index === defaultLayerIndex))

    // Overlays render above the active basemap, beneath the editable feature layer.
    const overlayOlLayers = overlayLayers.filter(isUsableOverlayDescriptor).map(createOverlayLayer)

    const map = new Map({
      target: containerRef.current,
      layers: [...baseTileLayers, ...overlayOlLayers, layer],
      view: new View({ center: [0, 0], zoom: 0 }),
      controls: defaultControls({ zoom: false }).extend([scaleLine])
    })

    setState({ map, source, layer, scaleLine, baseLayers: baseTileLayers, overlays: overlayOlLayers })

    return () => {
      map.setTarget(undefined)
      setState({ map: null, source: null, layer: null, scaleLine: null, baseLayers: [], overlays: [] })
    }
  }, [containerRef, tileLayers, overlayLayers])

  return state
}
