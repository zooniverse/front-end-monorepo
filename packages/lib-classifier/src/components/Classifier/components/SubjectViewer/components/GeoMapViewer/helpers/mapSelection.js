export function selectFirstFeature(select, features) {
  if (!select || features.length === 0) return
  select.getFeatures().clear()
  select.getFeatures().push(features[0])
  select.dispatchEvent({ type: 'select', selected: [features[0]], deselected: [] })
}

export function clearSelectedFeature(select) {
  if (!select) return
  const deselected = [...select.getFeatures().getArray()]
  if (deselected.length === 0) return
  select.getFeatures().clear()
  select.dispatchEvent({ type: 'select', selected: [], deselected })
}

export function fitViewToFeatures(map, features, duration) {
  map.getView().fit(features.getExtent(), {
    padding: [32, 32, 32, 32],
    maxZoom: 12,
    duration
  })
}
