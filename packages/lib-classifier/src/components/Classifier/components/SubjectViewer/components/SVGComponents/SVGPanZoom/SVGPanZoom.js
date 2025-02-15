import PropTypes from 'prop-types'
import { cloneElement, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const FullWidthDiv = styled.div`
  width: 100%;
`

/**
 * Get the rotation angle of the drawing canvas.
 * @param {SVGGraphicsElement} node - An SVG node on the drawing canvas.
 * @returns {number} The rotation angle of the drawing canvas.
 * @default 0
 */
function getRotationAngle(node) {
  const transformRoot = node.closest('g[transform]')
  if (transformRoot) {
    const transformList = transformRoot.transform?.baseVal
    // the rotation transform is the only item in the list.
    const transform = transformList?.numberOfItems > 0
      ? transformList.getItem(0)
      : null
    return transform?.angle || 0
  }
  return 0
}

/**
 * Get the scale (screen width / intrinsic width) of the zoomed and rotated drawing canvas.
 * @param {Ref<SVGGraphicsElement>} imgRef - React ref to the SVG image node.
 * @returns {number} The scale of the drawing canvas.
 * @default 1
 */
function imageScale(imgRef) {
  if (imgRef?.current) {
    const { width: clientWidth, height: clientHeight } = imgRef.current.getBoundingClientRect()
    const actualWidth = imgRef.current.getBBox
      ? imgRef.current.getBBox().width
      : imgRef.current.naturalWidth
    const rotationAngle = getRotationAngle(imgRef.current)
    const scale = (rotationAngle % 180 === 0)
      ? clientWidth / actualWidth // rotation is 0 or 180 degrees.
      : clientHeight / actualWidth // rotation is 90 or 270 degrees.
    return !Number.isNaN(scale) ? scale : 1
  }
  return 1
}

/**
 * Get the scale (screen width / intrinsic width) of the zoomed and rotated drawing canvas.
 * @param {Ref<SVGGraphicsElement>} imgRef - React ref to the SVG image node.
 * @returns {number} The scale of the drawing canvas.
 * @default 1
 */
function useScale(imgRef) {
  const [scale, setScale] = useState(1)
  
  setTimeout(() => {
    const newScale = imageScale(imgRef)
    if (scale !== newScale) {
      setScale(newScale)
    }
  })
  return scale
}

const DEFAULT_HANDLER = () => true
function SVGPanZoom({
  imgRef = null,
  children,
  limitSubjectHeight = false,
  maxZoom = 2,
  minZoom = 1,
  naturalHeight,
  naturalWidth,
  setOnDrag = DEFAULT_HANDLER,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  src,
  zooming = true
}) {
  const defaultViewBox = {
    x: 0,
    y: 0,
    height: naturalHeight,
    width: naturalWidth
  }
  const zoom = useRef(1)
  const scale = useScale(imgRef)
  const [viewBox, setViewBox] = useState(defaultViewBox)

  function enableZoom() {
    setOnDrag(onDrag)
    setOnPan(onPan)
    setOnZoom(onZoom)
  }

  function disableZoom() {
    setOnDrag(DEFAULT_HANDLER)
    setOnPan(DEFAULT_HANDLER)
    setOnZoom(DEFAULT_HANDLER)
  }

  useEffect(() => {
    if (zooming) {
      enableZoom()
      return disableZoom
    }
  }, [zooming, src])

  useEffect(() => {
    setViewBox({
      x: 0,
      y: 0,
      height: naturalHeight,
      width: naturalWidth
    })
    zoom.current = 1
  }, [naturalWidth, naturalHeight])

  function scaleViewBox(scale) {
    const viewBoxScale = 1 / scale
    const width = parseInt(naturalWidth * viewBoxScale, 10)
    const height = parseInt(naturalHeight * viewBoxScale, 10)
    setViewBox((prevViewBox) => {
      const xCentre = prevViewBox.x + prevViewBox.width / 2
      const yCentre = prevViewBox.y + prevViewBox.height / 2
      const x = xCentre - width / 2
      const y = yCentre - height / 2
      return { x, y, width, height }
    })
  }

  function onDrag(event, difference) {
    setViewBox((prevViewBox) => {
      const newViewBox = { ...prevViewBox }
      newViewBox.x -= difference.x * .9
      newViewBox.y -= difference.y * .9
      return newViewBox
    })
  }

  function onPan(dx, dy) {
    setViewBox((prevViewBox) => {
      const newViewBox = { ...prevViewBox }
      newViewBox.x += dx * 10
      newViewBox.y += dy * 10
      return newViewBox
    })
  }

  function onZoom(type) {
    switch (type) {
      case 'zoomin': {
        const prevZoom = zoom.current
        zoom.current = Math.min(prevZoom + 0.1, maxZoom)
        scaleViewBox(zoom.current)
        return
      }
      case 'zoomout': {
        const prevZoom = zoom.current
        zoom.current = Math.max(prevZoom - 0.1, minZoom)
        scaleViewBox(zoom.current)
        return
      }
      case 'zoomto': {
        setViewBox({
          x: 0,
          y: 0,
          height: naturalHeight,
          width: naturalWidth
        })
        zoom.current = 1
        return
      }
    }
  }

  const { x, y, width, height } = viewBox

  return (
    <FullWidthDiv>
      {cloneElement(children, {
        scale,
        viewBox: `${x} ${y} ${width} ${height}`,
        svgMaxHeight: limitSubjectHeight ? `min(${naturalHeight}px, 90vh)` : null
      })}
    </FullWidthDiv>
  )
}

SVGPanZoom.propTypes = {
  children: PropTypes.node.isRequired,
  limitSubjectHeight: PropTypes.bool,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  naturalHeight: PropTypes.number.isRequired,
  naturalWidth: PropTypes.number.isRequired,
  setOnDrag: PropTypes.func,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  src: PropTypes.string.isRequired,
  zooming: PropTypes.bool
}

export default SVGPanZoom
