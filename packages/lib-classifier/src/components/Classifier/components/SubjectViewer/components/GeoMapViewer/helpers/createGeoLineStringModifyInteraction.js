import { primaryAction } from 'ol/events/condition'
import Modify from 'ol/interaction/Modify'

export function hasLineStringFeature(features) {
  if (!features || features.length === 0) return false
  return features.some((feature) => feature.getGeometry?.()?.getType?.() === 'LineString')
}

function createGeoLineStringModifyInteraction({
  map,
  selectInteraction,
  onModifyEnd,
  getMaxVertices
}) {
  let isModifying = false

  function getSelectedLineStringVertexCount() {
    const feature = selectInteraction.getFeatures().getArray()
      .find((f) => f.getGeometry?.()?.getType?.() === 'LineString')
    if (!feature) return null
    return feature.getGeometry().getCoordinates().length
  }

  const modify = new Modify({
    features: selectInteraction.getFeatures(),
    pixelTolerance: 10,
    condition: (event) => primaryAction(event) && hasLineStringFeature(selectInteraction.getFeatures().getArray()),
    insertVertexCondition: () => {
      const max = typeof getMaxVertices === 'function' ? getMaxVertices() : undefined
      if (typeof max !== 'number') return true
      const count = getSelectedLineStringVertexCount()
      if (count === null) return true
      return count < max
    }
  })

  const startKey = modify.on('modifystart', () => { isModifying = true })
  const endKey = modify.on('modifyend', () => {
    isModifying = false
    onModifyEnd?.()
  })

  map.addInteraction(modify)
  modify.setActive(false)

  return {
    isModifying() {
      return isModifying
    },
    setActive(active) {
      modify.setActive(active)
      if (!active) isModifying = false
    },
    destroy() {
      modify.un('modifystart', startKey.listener)
      modify.un('modifyend', endKey.listener)
      modify.setActive(false)
      isModifying = false
      map.removeInteraction(modify)
    }
  }
}

export default createGeoLineStringModifyInteraction
