import PropTypes from 'prop-types'
import { cloneElement, useEffect, useRef, useState } from 'react'

const DEFAULT_ZOOM = 1

function SVGPanZoom({
  children,
  displayNaturalDimensions = false,
  img,
  maxZoom = 2,
  minZoom = 1,
  naturalHeight,
  naturalWidth,
  setOnDrag = () => true,
  setOnPan = () => true,
  setOnZoom = () => true,
  src,
  zooming = true
}) {
  const defaultViewBox = {
    x: 0,
    y: 0,
    height: naturalHeight,
    width: naturalWidth
  }
  const svgContainerRef = useRef(null)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [viewBox, setViewBox] = useState(defaultViewBox)

  function enableZoom() {
    setOnDrag(onDrag)
    setOnPan(onPan)
    setOnZoom(onZoom)
  }

  function disableZoom() {
    setOnDrag(() => true)
    setOnPan(() => true)
    setOnZoom(() => true)
  }

  useEffect(() => {
    if (zooming) {
      enableZoom()
      return disableZoom
    }
  }, [zooming, src])

  useEffect(
    function onZoomChange() {
      const newViewBox = scaledViewBox(zoom)
      setViewBox(newViewBox)
    }, [zoom])

  useEffect(() => {
    if (displayNaturalDimensions) {
      calcZoomForNaturalDimensions()
    } else {
      setZoom(DEFAULT_ZOOM)
    }
    setViewBox(defaultViewBox)
  }, [src])

  function calcZoomForNaturalDimensions () {
    if (svgContainerRef.current) {
      const zoomForNaturalDimensions = naturalWidth / svgContainerRef.current.getBoundingClientRect().width
      if (zoomForNaturalDimensions < 1) {
        setZoom(zoomForNaturalDimensions)
      }
    }
  }

  function imageScale(img) {
    const { width: clientWidth, height: clientHeight } = img
      ? img.getBoundingClientRect()
      : {}
    const scale = clientWidth / naturalWidth
    return !Number.isNaN(scale) ? scale : 1
  }

  function scaledViewBox(scale) {
    const viewBoxScale = 1 / scale
    const xCentre = viewBox.x + viewBox.width / 2
    const yCentre = viewBox.y + viewBox.height / 2
    const width = parseInt(naturalWidth * viewBoxScale, 10)
    const height = parseInt(naturalHeight * viewBoxScale, 10)
    const x = xCentre - width / 2
    const y = yCentre - height / 2
    return { x, y, width, height }
  }

  function onDrag(event, difference) {
    setViewBox((prevViewBox) => {
      const newViewBox = Object.assign({}, prevViewBox)
      newViewBox.x -= difference.x / 1.5
      newViewBox.y -= difference.y / 1.5
      return newViewBox
    })
  }

  function onPan(dx, dy) {
    setViewBox((prevViewBox) => {
      const newViewBox = Object.assign({}, prevViewBox)
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
        if (displayNaturalDimensions) {
          calcZoomForNaturalDimensions()
        } else {
          setZoom(DEFAULT_ZOOM)
        }
        setViewBox({
          x: 0,
          y: 0,
          width: naturalWidth,
          height: naturalHeight
        })
      }
    }
  }

  const { x, y, width, height } = scaledViewBox(zoom)
  const scale = imageScale(img)

  return (
    <div ref={svgContainerRef} style={{ width: '100%' }}>
      {cloneElement(children, {
        scale,
        viewBox: `${x} ${y} ${width} ${height}`
        // svgStyle: displayNaturalDimensions ? { maxHeight: naturalHeight, maxWidth: naturalWidth } : {}
      })}
    </div>
  )
}

SVGPanZoom.propTypes = {
  children: PropTypes.node.isRequired,
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
