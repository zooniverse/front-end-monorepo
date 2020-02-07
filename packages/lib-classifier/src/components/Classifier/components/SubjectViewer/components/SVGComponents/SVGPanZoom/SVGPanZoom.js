import PropTypes from 'prop-types'
import React, { cloneElement, useContext, useEffect, useState } from 'react'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

function SVGPanZoom ({ children, naturalHeight, naturalWidth, setOnPan, setOnZoom }) {
  setOnPan(onPan)
  setOnZoom(onZoom)

  const defaultViewBox = {
    x: 0,
    y: 0,
    height: naturalHeight,
    width: naturalWidth
  }

  const [ scale, setScale ] = useState(1)
  const [ viewBox, setViewBox ] = useState(defaultViewBox)

  const { svg } = useContext(SVGContext)

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

  function onPan (dx, dy) {
      const newViewBox = Object.assign({}, viewBox)
      newViewBox.x -= dx * 10
      newViewBox.y += dy * 10
      setViewBox(newViewBox)
  }

  function onZoom (type) {
    switch (type) {
      case 'zoomin': {
        const newScale = Math.min(scale + 0.1, 2)
        const newViewBox = scaledViewBox(newScale)
        setScale(newScale)
        setViewBox(newViewBox)
        console.log(newViewBox)
        return
      }
      case 'zoomout': {
        const newScale = Math.max(scale - 0.1, 1)
        const newViewBox = scaledViewBox(newScale)
        setScale(newScale)
        setViewBox(newViewBox)
        return
      }
      case 'zoomto': {
        setScale(1)
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
    event.preventDefault()
    event.stopPropagation()
    const { deltaY } = event
    if (deltaY < 0) {
      onZoom('zoomout', -1)
    } else {
      onZoom('zoomin', 1)
    }
  }

  return (
    <div onWheel={onWheel}>
      {cloneElement(children, { viewBox: `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}` })}
    </div>
  )
}

SVGPanZoom.propTypes = {
  children: PropTypes.node.isRequired,
  naturalHeight: PropTypes.number.isRequired,
  naturalWidth: PropTypes.number.isRequired,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func
}
export default SVGPanZoom
