import asyncStates from '@zooniverse/async-states'
import { toJS } from 'mobx'
import { getType } from 'mobx-state-tree'
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Paragraph } from 'grommet'

import { withStores } from '@helpers'
import SubjectGroupViewer from './SubjectGroupViewer'
import locationValidator from '../../helpers/locationValidator'
import withKeyZoom from '../../../withKeyZoom'

function preventDefault (e) {
  e.preventDefault()
}

const DEFAULT_CELL_WIDTH = 1200
const DEFAULT_CELL_HEIGHT = 1000
const DEFAULT_CELL_STYLE = {
  stroke: '#fff',
  strokeWidth: '1',
  overlay: 'rgba(41,103,255,0.3)',
  selectedStroke: '#2967FF',
  selectedStrokeWidth: '8',
  focusOutline: '2px dashed rgba(255, 255, 255, 0.5)',
  background: '#000'
}
const DEFAULT_GRID_COLUMNS = 3
const DEFAULT_GRID_ROWS = 3
const DEFAULT_GRID_MAX_WIDTH = ''
const DEFAULT_GRID_MAX_HEIGHT = ''

function storeMapper (classifierStore) {
  const {
    interactionMode,
    setOnPan,
    setOnZoom,
  } = classifierStore.subjectViewer
  
  const {
    active: activeWorkflow
  } = classifierStore.workflows
  
  const viewerConfig = activeWorkflow?.configuration?.subject_viewer_config || {}
  
  const cellWidth = viewerConfig.cell_width || DEFAULT_CELL_WIDTH
  const cellHeight = viewerConfig.cell_height || DEFAULT_CELL_HEIGHT
  const cellStyle = viewerConfig.cell_style || DEFAULT_CELL_STYLE
  const gridColumns = viewerConfig.grid_columns || DEFAULT_GRID_COLUMNS
  const gridRows = viewerConfig.grid_rows || DEFAULT_GRID_ROWS
  const gridMaxWidth = viewerConfig.grid_max_width || DEFAULT_GRID_MAX_WIDTH
  const gridMaxHeight = viewerConfig.grid_max_height || DEFAULT_GRID_MAX_HEIGHT
  
  const {
    activeStepTasks
  } = classifierStore.workflowSteps
  const [currentTask] = activeStepTasks.filter(task => task.type === 'subjectGroupComparison')
  
  const {
    addAnnotation,
    active: classification,
  } = classifierStore.classifications
  
  const isCurrentTaskValidForAnnotation = !!currentTask

  // Note: the Task's Annotations are initialised by the SubjectGroupComparisonTask
  // component. However, do note that it's possible to have a
  // SubjectGroupViewer without a SubjectGroupComparisonTask.
  
  // Currently only supports 1 Subject Group Task in the workflow.
  const allAnnotations = classification ? Array.from(classification.annotations.values()) : []
  const annotation = allAnnotations.find(item => (getType(item).name === 'SubjectGroupComparisonAnnotation'))

  return {
    cellWidth,
    cellHeight,
    cellStyle,
    gridColumns,
    gridRows,
    gridMaxWidth,
    gridMaxHeight,
    
    interactionMode,
    setOnZoom,
    setOnPan,
    
    addAnnotation,
    annotation,
    isCurrentTaskValidForAnnotation,
  }
}

export function SubjectGroupViewerContainer({
  addAnnotation,
  annotation,
  cellWidth,
  cellHeight,
  cellStyle,
  gridColumns,
  gridRows,
  gridMaxWidth,
  gridMaxHeight,
  ImageObject = window.Image,
  interactionMode = 'annotate',
  isCurrentTaskValidForAnnotation,
  loadingState = asyncStates.initialized,
  onError = () => true,
  onKeyDown = () => true,
  onReady = () => true,
  setOnPan = () => true,
  setOnZoom = () => true,
  subject = undefined
}) {
  const groupViewer = useRef()
  const scrollContainer = useRef()
  const [images, setImages] = useState([])
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [zoom, setZoom] = useState(1)

  function onUnmount() {
    setOnPan(() => true)
    setOnZoom(() => true)
    scrollContainer.current?.removeEventListener('wheel', onWheel)
  }

  function onMount() {
    onLoad()
    setOnPan(onPanViaExternalControls)
    setOnZoom(onZoomViaExternalControls)
    scrollContainer.current?.addEventListener('wheel', onWheel)
    return onUnmount
  }

  useEffect(onMount, [])

  function fetchImage(url) {
    return new Promise((resolve, reject) => {
      const img = new ImageObject()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
      return img
    })
  }

  function dragMove(event, difference) {
    onDrag && onDrag(event, difference)
  }

  async function preload() {
    if (subject?.locations) {
      // TODO: Validate for allowed image media mime types

      let imageUrls = subject.locations.map(obj => Object.values(obj)[0])
      const images = await Promise.all(imageUrls.map(fetchImage))

      setImages(images)
    }
    return
  }

  function getGridSize() {
    const svg = groupViewer.current || {}
    const { width: clientWidth, height: clientHeight } = svg.getBoundingClientRect && svg.getBoundingClientRect() || {}
    
    const gridWidth = gridColumns * cellWidth
    const gridHeight = gridRows * cellHeight
    
    return {
      clientHeight,
      clientWidth,
      gridHeight,
      gridWidth,
    }
  }

  async function onLoad() {
    try {
      await preload()
      const { clientHeight, clientWidth, gridHeight: naturalHeight, gridWidth: naturalWidth } = getGridSize()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }
  
  function onDrag(event, difference) {
    doPan(difference.x, difference.y)
  }

  function onPanViaExternalControls(dx, dy) {
    const ARBITRARY_FACTOR = Math.min(cellWidth, cellHeight) / 20
    
    // TODO: uh, looks like left/right pan is flipped, but that's a separate PR
    
    doPan(dx * ARBITRARY_FACTOR, dy * ARBITRARY_FACTOR)
  }
  
  function doPan(dx, dy) {
    setPanX(panX + dx)
    setPanY(panY + dy)
  }

  function onZoomViaExternalControls(type) {
    doZoom(type)
  }
  
  function doZoom(type) {
    const ARBITRARY_MIN_ZOOM = 1
    const ARBITRARY_MAX_ZOOM = 4
    
    switch (type) {
      case 'zoomin':
        setZoom(Math.min(zoom + 0.1, ARBITRARY_MAX_ZOOM))
        break;
      case 'zoomout':
        setZoom(Math.max(zoom - 0.1, ARBITRARY_MIN_ZOOM))
        break;
      case 'zoomto': {
        setZoom(1)
        setPanX(0)
        setPanY(0)
        break;
      }
    }
  }
  
  function onWheel(event) {
    const { deltaY } = event
    if (deltaY < 0) {
      doZoom('zoomout', -1)
    } else {
      doZoom('zoomin', 1)
    }
    preventDefault(event)
  }
    
  const gridWidth = gridColumns * cellWidth
  const gridHeight = gridRows * cellHeight
    
  if (loadingState === asyncStates.error) {
    return (
      <div>Something went wrong.</div>
    )
  }

  if (!subject
      || !(subject.locations && subject.locations.length > 0)
      || !(cellHeight > 0)
      || !(cellWidth > 0)
      || !(gridColumns > 0)
      || !(gridRows > 0)
  ) {
    return null
  }

  return (
    <div ref={scrollContainer}>
      <SubjectGroupViewer
        ref={groupViewer}
        
        images={images}
        subjectIds={subject.subjectIds}
        
        dragMove={dragMove}
        onKeyDown={onKeyDown}
        
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        cellStyle={cellStyle}
        gridRows={gridRows}
        gridColumns={gridColumns}
        gridMaxWidth={gridMaxWidth}
        gridMaxHeight={gridMaxHeight}
        
        width={gridWidth}
        height={gridHeight}
        
        panX={panX}
        panY={panY}
        zoom={zoom}

        annotation={annotation}
        interactionMode={interactionMode}
        isCurrentTaskValidForAnnotation={isCurrentTaskValidForAnnotation}
      />
    </div>
  )
}

SubjectGroupViewerContainer.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator),
    subjectIds: PropTypes.arrayOf(PropTypes.string),
  }),
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
    
  interactionMode: PropTypes.oneOf(['annotate', 'move']),
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
}

export default withKeyZoom(withStores(SubjectGroupViewerContainer, storeMapper))
