import PropTypes from 'prop-types'
import { cloneElement, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const FullWidthDiv = styled.div`
  width: 100%;
`

function imageScale(imgRef, naturalWidth) {
  const { width: clientWidth, height: clientHeight } = imgRef?.current
    ? imgRef.current.getBoundingClientRect()
    : {}
  const scale = clientWidth / naturalWidth
  return !Number.isNaN(scale) ? scale : 1
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
  const [zoom, setZoom] = useState(1)
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

  useEffect(function onZoomChange() {
    scaleViewBox(zoom)
  }, [zoom])

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
    setZoom(1)
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
      newViewBox.x -= difference.x / 1.5
      newViewBox.y -= difference.y / 1.5
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
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, maxZoom))
        return
      }
      case 'zoomout': {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, minZoom))
        return
      }
      case 'zoomto': {
        setViewBox({
          x: 0,
          y: 0,
          height: naturalHeight,
          width: naturalWidth
        })
        setZoom(1)
        return
      }
    }
  }

  const { x, y, width, height } = viewBox
  const scale = imageScale(imgRef, naturalWidth)

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
