import { useEffect, useState } from 'react'
import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control/defaults'
import ScaleLine from 'ol/control/ScaleLine'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'

export default function useOLMap(containerRef) {
  const [state, setState] = useState({ map: null, source: null, layer: null, scaleLine: null })

  useEffect(() => {
    if (!containerRef.current) return undefined

    const source = new VectorSource({ features: [] })
    const layer = new VectorLayer({ source })
    const scaleLine = new ScaleLine()
    const map = new Map({
      target: containerRef.current,
      layers: [
        new TileLayer({ preload: 1, source: new OSM() }),
        layer
      ],
      view: new View({ center: [0, 0], zoom: 0 }),
      controls: defaultControls({ zoom: false }).extend([scaleLine])
    })

    setState({ map, source, layer, scaleLine })
    if (typeof window !== 'undefined') window.__olMap = map

    return () => {
      map.setTarget(undefined)
      if (typeof window !== 'undefined' && window.__olMap === map) delete window.__olMap
      setState({ map: null, source: null, layer: null, scaleLine: null })
    }
  }, [containerRef])

  return state
}
