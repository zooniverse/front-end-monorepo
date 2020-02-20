import PropTypes from 'prop-types'
import React, { cloneElement, createRef, useEffect, useState } from 'react'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

function SVGPanZoom ({
  children,
  img,
  maxZoom,
  minZoom,
  naturalHeight,
  naturalWidth,
  setOnDrag,
  setOnPan,
  setOnZoom
}) {
  const scrollContainer = createRef()
  const defaultViewBox = {
    x: 0,
    y: 0,
    height: naturalHeight,
    width: naturalWidth
  }

  const [ zoom, setZoom ] = useState(1)
  const [ scale, setScale ] = useState(1)
  const [ viewBox, setViewBox ] = useState(defaultViewBox)

  function onMount () {
    setOnDrag(onDrag)
    setOnPan(onPan)
    setOnZoom(onZoom)
    scrollContainer.current.addEventListener('wheel', e => e.preventDefault())
  }

  function onUnmount () {
    setOnDrag(() => true)
    setOnPan(() => true)
    setOnZoom(() => true)
    scrollContainer.current.removeEventListener('wheel', e => e.preventDefault())
  }

  useEffect(() => {
    onMount()
    return onUnmount
  }, [])

  useEffect(function updateImageSize () {
    onImageChange(img)
  }, [img])

  useEffect(function onZoomChange () {
    const newViewBox = scaledViewBox(zoom)
    setViewBox(newViewBox)
  }, [zoom])

  useEffect(function onViewBoxChange () {
    onImageChange(img)
  }, [viewBox])

  function onImageChange (img) {
    const { width: clientWidth, height: clientHeight } = img ? img.getBoundingClientRect() : {}
    const scale = clientWidth / naturalWidth
    setScale(scale)
  }

  function scaledViewBox (scale) {
    const viewBoxScale = 1 / scale
    const xCentre = viewBox.x + viewBox.width / 2
    const yCentre = viewBox.y + viewBox.height / 2
    const width = parseInt(naturalWidth * viewBoxScale, 10)
    const height = parseInt(naturalHeight * viewBoxScale, 10)
    const x = xCentre - width / 2
    const y = yCentre - height / 2
    return { x, y, width, height }
  }

  function onDrag (event, difference) {
    setViewBox(prevViewBox => {
      const newViewBox = Object.assign({}, prevViewBox)
      newViewBox.x -= difference.x / 1.5
      newViewBox.y -= difference.y / 1.5
      return newViewBox
    })
  }

  function onPan (dx, dy) {
    setViewBox(prevViewBox => {
      const newViewBox = Object.assign({}, prevViewBox)
      newViewBox.x -= dx * 10
      newViewBox.y += dy * 10
      return newViewBox
    })
  }

  function onZoom (type) {
    switch (type) {
      case 'zoomin': {
        setZoom(prevZoom => Math.min(prevZoom + 0.1, maxZoom))
        return
      }
      case 'zoomout': {
        setZoom(prevZoom => Math.max(prevZoom - 0.1, minZoom))
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

  function onWheel (event) {
    const { deltaY } = event
    if (deltaY < 0) {
      onZoom('zoomout', -1)
    } else {
      onZoom('zoomin', 1)
    }
  }

  return (
    <div ref={scrollContainer} onWheel={onWheel}>
      {cloneElement(children, { scale, viewBox: `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}` })}
    </div>
  )
}

SVGPanZoom.propTypes = {
  children: PropTypes.node.isRequired,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  naturalHeight: PropTypes.number.isRequired,
  naturalWidth: PropTypes.number.isRequired,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func
}

SVGPanZoom.defaultProps = {
  maxZoom: 2,
  minZoom: 1
}
export default SVGPanZoom
