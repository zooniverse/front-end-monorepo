import { useEffect, useState } from 'react'
import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control/defaults'
import ScaleLine from 'ol/control/ScaleLine'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import createTileLayer from '../helpers/createTileLayer'

export default function useOLMap(containerRef, tileLayers = []) {
  const [state, setState] = useState({ map: null, source: null, layer: null, scaleLine: null })

  useEffect(() => {
    if (!containerRef.current) return undefined

    const source = new VectorSource({ features: [] })
    const layer = new VectorLayer({ source })
    const scaleLine = new ScaleLine()

    const descriptors = tileLayers.length > 0 ? tileLayers : [{ type: 'osm' }]
    const baseTileLayers = descriptors.map(createTileLayer)
    const defaultLayerIndex = Math.max(0, descriptors.findIndex(descriptor => descriptor?.default))
    baseTileLayers.forEach((tileLayer, index) => tileLayer.setVisible(index === defaultLayerIndex))

    const map = new Map({
      target: containerRef.current,
      layers: [...baseTileLayers, layer],
      view: new View({ center: [0, 0], zoom: 0 }),
      controls: defaultControls({ zoom: false }).extend([scaleLine])
    })

    setState({ map, source, layer, scaleLine })

    return () => {
      map.setTarget(undefined)
      setState({ map: null, source: null, layer: null, scaleLine: null })
    }
  }, [containerRef, tileLayers])

  return state
}
