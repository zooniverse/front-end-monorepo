import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { unByKey } from 'ol/Observable'
import Overlay from 'ol/Overlay'

import DeleteIcon from '@plugins/drawingTools/components/DeleteButton/DeleteIcon'
import getFeatureStyle from '../helpers/getFeatureStyle'
import isLineStringFeature from '../helpers/isLineStringFeature'
import { clearSelectedFeature } from '../helpers/mapSelection'

const ICON_RADIUS = 8
const ICON_BOX = (ICON_RADIUS + 2) * 2

function isFirstVertexStyle(style, feature) {
  const coord = style.getGeometry?.()?.getCoordinates?.()
  if (!coord) return false
  const first = feature.getGeometry().getFirstCoordinate()
  return coord[0] === first[0] && coord[1] === first[1]
}

export default function useSelectionLayer({
  map,
  source,
  layer,
  select,
  geoDrawingTask,
  hasGeoDrawingTask,
  ariaLabel
}) {
  useEffect(() => {
    if (!map || !layer) return undefined

    let isHoveringDelete = false

    layer.setStyle((feature) => {
      const isSelected = hasGeoDrawingTask && select?.getFeatures().getArray().includes(feature)
      const styles = getFeatureStyle({
        feature,
        geoDrawingTask: hasGeoDrawingTask ? geoDrawingTask : null,
        isSelected,
        resolution: map.getView().getResolution()
      })

      if (!styles || !isSelected || !isHoveringDelete || !isLineStringFeature(feature)) {
        return styles
      }

      return styles.filter((style) => !isFirstVertexStyle(style, feature))
    })

    if (!select || !source) return undefined

    const element = document.createElement('div')
    element.style.display = 'none'
    const root = createRoot(element)

    function handleDelete() {
      const current = select.getFeatures()?.item(0)
      if (!isLineStringFeature(current)) return
      source.removeFeature(current)
      clearSelectedFeature(select)
    }

    function invalidateSelected() {
      const selected = select.getFeatures()?.item(0)
      if (selected) selected.changed()
    }

    root.render(
      <button
        aria-label={ariaLabel}
        onClick={(event) => { event.preventDefault(); event.stopPropagation(); handleDelete() }}
        onPointerEnter={() => { isHoveringDelete = true; invalidateSelected() }}
        onPointerLeave={() => { isHoveringDelete = false; invalidateSelected() }}
        style={{ background: 'transparent', border: 0, padding: 0, cursor: 'pointer', lineHeight: 0 }}
        title={ariaLabel}
        type='button'
      >
        <svg height={ICON_BOX} viewBox={`-${ICON_BOX / 2} -${ICON_BOX / 2} ${ICON_BOX} ${ICON_BOX}`} width={ICON_BOX}>
          <DeleteIcon radius={ICON_RADIUS} />
        </svg>
      </button>
    )

    const overlay = new Overlay({ element, positioning: 'center-center', offset: [-16, -16], stopEvent: true })
    map.addOverlay(overlay)

    let changeKey = null
    const selectKey = select.on('select', (event) => {
      if (changeKey) { unByKey(changeKey); changeKey = null }
      // OL caches per-feature style; invalidate both sides on a selection swap.
      ;[...(event.deselected || []), ...(event.selected || [])].forEach((feature) => {
        feature?.changed?.()
      })
      layer.changed()

      const selected = event.selected?.[0]
      if (isLineStringFeature(selected)) {
        overlay.setPosition(selected.getGeometry().getFirstCoordinate())
        element.style.display = ''
        changeKey = selected.on('change', () => {
          overlay.setPosition(selected.getGeometry().getFirstCoordinate())
        })
      } else {
        overlay.setPosition(undefined)
        element.style.display = 'none'
        isHoveringDelete = false
      }
    })

    return () => {
      if (changeKey) unByKey(changeKey)
      unByKey(selectKey)
      map.removeOverlay(overlay)
      root.unmount()
    }
  }, [map, source, layer, select, geoDrawingTask, hasGeoDrawingTask, ariaLabel])
}
