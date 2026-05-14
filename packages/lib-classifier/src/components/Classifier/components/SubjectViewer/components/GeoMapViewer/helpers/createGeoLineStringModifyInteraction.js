import Modify from 'ol/interaction/Modify'

export function hasLineStringFeature(features) {
  if (!features || features.length === 0) return false
  return features.some((feature) => feature.getGeometry?.()?.getType?.() === 'LineString')
}

function createGeoLineStringModifyInteraction({
  map,
  selectInteraction,
  onModifyEnd
}) {
  let isModifying = false

  const modify = new Modify({
    features: selectInteraction.getFeatures(),
    pixelTolerance: 10,
    condition: () => hasLineStringFeature(selectInteraction.getFeatures().getArray())
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
