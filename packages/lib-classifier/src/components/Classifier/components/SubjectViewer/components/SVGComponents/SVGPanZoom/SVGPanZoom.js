import PropTypes from 'prop-types'
import React, { cloneElement, createRef, useEffect, useState } from 'react'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

function SVGPanZoom ({ children, img, naturalHeight, naturalWidth, setOnDrag, setOnPan, setOnZoom }) {
  const scrollContainer = createRef()
  const defaultViewBox = {
    x: 0,
    y: 0,
    height: naturalHeight,
    width: naturalWidth
  }

  const [ scale, setScale ] = useState(1)
  const [ subjectScale, setSubjectScale ] = useState(1)
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

  useEffect(function onScaleChange () {
    const newViewBox = scaledViewBox(scale)
    setViewBox(newViewBox)
  }, [scale])

  function onImageChange (img) {
    const { width: clientWidth, height: clientHeight } = img ? img.getBoundingClientRect() : {}
    const subjectScale = clientWidth / naturalWidth
    setSubjectScale(subjectScale)
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
        const newScale = Math.min(scale + 0.1, 2)
        setScale(prevScale => Math.min(prevScale + 0.1, 2))
        onImageChange(img)
        return
      }
      case 'zoomout': {
        const newScale = Math.max(scale - 0.1, 1)
        setScale(prevScale => Math.max(prevScale - 0.1, 1))
        onImageChange(img)
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
    const { deltaY } = event
    if (deltaY < 0) {
      onZoom('zoomout', -1)
    } else {
      onZoom('zoomin', 1)
    }
  }

  return (
    <div ref={scrollContainer} onWheel={onWheel}>
      {cloneElement(children, { scale: subjectScale, viewBox: `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}` })}
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
