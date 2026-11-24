import { useEffect, useRef } from 'react'
import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control/defaults'
import { defaults as defaultInteractions } from 'ol/interaction/defaults'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import styled from 'styled-components'

import { useStores } from '@hooks'
import createTileLayer from '../../SubjectViewer/components/GeoMapViewer/helpers/createTileLayer'
import constrainMapToExtent from '../../SubjectViewer/components/GeoMapViewer/helpers/extentConstraint'
import { fitViewToExtent } from '../../SubjectViewer/components/GeoMapViewer/helpers/mapSelection'
import getGeoFeedbackFeatures from './helpers/getGeoFeedbackFeatures'

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`

function storeMapper (classifierStore) {
  const {
    classifications: { currentAnnotations: annotations },
    feedback: { applicableRules },
    workflows: { active: workflow },
    workflowSteps
  } = classifierStore
  const geoDrawingTask = workflowSteps?.activeStepTasks?.find(task => task.type === 'geoDrawing')

  return {
    annotations,
    applicableRules,
    subjectExtent: geoDrawingTask?.mapContext?.subjectExtent,
    tileLayers: workflow?.configuration?.subject_viewer_config?.tile_layers ?? []
  }
}

function defaultTileLayer (tileLayers) {
  if (!tileLayers.length) return { type: 'osm' }
  return tileLayers.find(descriptor => descriptor?.default) ?? tileLayers[0]
}

export default function GeoFeedback () {
  const { annotations = [], applicableRules = [], subjectExtent, tileLayers } = useStores(storeMapper)
  const mapElement = useRef(null)

  useEffect(function createFeedbackMap () {
    if (!mapElement.current) return undefined

    const source = new VectorSource({
      features: getGeoFeedbackFeatures(annotations, applicableRules)
    })
    const map = new Map({
      target: mapElement.current,
      controls: defaultControls({ rotate: false }),
      interactions: defaultInteractions({ onFocusOnly: false }),
      layers: [
        createTileLayer(defaultTileLayer(tileLayers)),
        new VectorLayer({ source })
      ],
      view: new View({ center: [0, 0], zoom: 2 })
    })
    // Open framed the way the subject first loaded in the classifier (see loadGeoJSON).
    if (subjectExtent) constrainMapToExtent(map, subjectExtent)
    const extent = subjectExtent ?? source.getExtent()
    if (extent.every(Number.isFinite)) fitViewToExtent(map, extent, 0)

    return function destroyFeedbackMap () {
      map.setTarget(undefined)
    }
  }, [annotations, applicableRules, subjectExtent, tileLayers])

  return (
    <MapContainer
      data-testid='geo-feedback-map'
      ref={mapElement}
    />
  )
}
