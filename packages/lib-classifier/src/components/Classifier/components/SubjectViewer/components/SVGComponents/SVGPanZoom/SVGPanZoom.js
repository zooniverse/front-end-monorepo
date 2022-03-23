import PropTypes from 'prop-types'
import React, { cloneElement, useRef, useEffect, useState } from 'react'

function SVGPanZoom({
  children,
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
  const scrollContainer = useRef()
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
    },
    [zoom]
  )

  useEffect(() => {
    setZoom(1)
    setViewBox(defaultViewBox)
  }, [src])

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
        setZoom(1)
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
    <div ref={scrollContainer} style={{ width: '100%' }}>
      {cloneElement(children, {
        scale,
        viewBox: `${x} ${y} ${width} ${height}`
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
