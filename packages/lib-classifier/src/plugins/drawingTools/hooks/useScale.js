import { useContext, useState } from 'react'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

function getScale(canvas) {
  // JSDOM doesn't support SVG, so we need to check for `getBBox` to run the tests.
  if (canvas?.getBBox) {
    const { width: clientWidth, height: clientHeight } = canvas.getBoundingClientRect()
    const actualWidth = canvas.getBBox().width
    const transformRoot = canvas.closest('g[transform]')
    const transformList = transformRoot.transform?.baseVal
    // the rotation transform is the only item in the list.
    const transform = transformList?.numberOfItems > 0
      ? transformList.getItem(0)
      : null
    const rotationAngle = transform?.angle || 0
    const scale = (rotationAngle % 180 === 0)
      ? clientWidth / actualWidth // rotation is 0 or 180 degrees.
      : clientHeight / actualWidth // rotation is 90 or 270 degrees.
    return !Number.isNaN(scale) ? scale : 1
  }
  // return a scale of 1 in JSDOM.
  return 1
}

export default function useScale() {
  const { canvas } = useContext(SVGContext)
  const [scale, setScale] = useState(1)

  setTimeout(() => {
    const newScale = getScale(canvas)
    if (newScale !== scale) setScale(newScale)
  })

  return scale
}
