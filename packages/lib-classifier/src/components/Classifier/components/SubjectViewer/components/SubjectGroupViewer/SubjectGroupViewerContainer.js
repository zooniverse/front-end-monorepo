import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import React from 'react'
import PropTypes from 'prop-types'
import { draggable } from '@plugins/drawingTools/components'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import SubjectGroupViewer from './SubjectGroupViewer'
import locationValidator from '../../helpers/locationValidator'
import withKeyZoom from '../../../withKeyZoom'

function preventDefault (e) {
  e.preventDefault()
}

function storeMapper (stores) {
  const {
    enableRotation,
    rotation,
    setOnZoom,
    setOnPan
  } = stores.classifierStore.subjectViewer
  
  // TODO
  const cellHeight = 1000
  const cellWidth = 1200
  const cellStyle = {
    stroke: '#fff',
    strokeWidth: '4',
    fill: '#000'
  }
  const gridColumns = 3
  const gridRows = 3

  return {
    cellHeight,
    cellWidth,
    cellStyle,
    gridColumns,
    gridRows,
    enableRotation,
    rotation,
    setOnZoom,
    setOnPan
  }
}

const DraggableImage = draggable('image')
const DraggableRect = draggable('rect')

class SubjectGroupViewerContainer extends React.Component {
  constructor () {
    super()
    this.dragMove = this.dragMove.bind(this)
    this.imageViewer = React.createRef()
    this.subjectImage = React.createRef()
    this.scrollContainer = React.createRef()

    this.state = {
      images: [],
      panX: 0,
      panY: 0,
      zoom: 1,
    }
  }

  componentDidMount () {
    this.props.enableRotation()
    this.onLoad()

    // TODO: check if these are necessary
    // IIRC these are used to listen for pan and zoom actions outside of this component.
    // i.e. zoom in/out actions from the iamge controls. 
    // this.props.setOnPan(this.onPan.bind(this))
    this.props.setOnZoom(this.onZoom.bind(this))
    
    this.scrollContainer.current.addEventListener('wheel', preventDefault)
  }
  
  componentWillUmount () {
    // TODO
    // this.setOnPan(() => true)
    this.setOnZoom(() => true)
    
    this.scrollContainer.current.removeEventListener('wheel', preventDefault)
  }

  fetchImage (url) {
    const { ImageObject } = this.props
    return new Promise((resolve, reject) => {
      const img = new ImageObject()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
      return img
    })
  }

  dragMove (event, difference) {
    this.onDrag && this.onDrag(event, difference)
  }

  async preload () {
    const { subject } = this.props
    if (subject && subject.locations) {
      // TODO: Validate for allowed image media mime types
      
      const imageUrls = subject.locations.map(obj => Object.values(obj)[0])
      const images = await Promise.all(
        imageUrls.map(url => this.fetchImage(url))
      )
      
      this.setState({ images })
      return images
    }
    return {}
  }

  async getImageSize () {
    const svg = this.imageViewer.current || {}
    const { width: clientWidth, height: clientHeight } = svg.getBoundingClientRect && svg.getBoundingClientRect() || {}
    const { gridRows, gridColumns, cellWidth, cellHeight } = this.props
    
    const naturalWidth = gridColumns * cellWidth
    const naturalHeight = gridRows * cellHeight
    
    return {
      clientHeight,
      clientWidth,
      naturalHeight,
      naturalWidth
    }
  }

  async onLoad () {
    const { onError, onReady } = this.props
    try {
      await this.preload()
      const { clientHeight, clientWidth, naturalHeight, naturalWidth } = await this.getImageSize()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }
  
  onDrag (event, difference) {
    // TODO
    const { panX, panY } = this.state
    
    this.setState({
      panX: panX + difference.x,
      panY: panY + difference.y,
    })
  }

  onPan (dx, dy) {
    // TODO
    console.log('+++ onPan: ', dy, dx)
  }

  onZoom (type) {
    const { zoom } = this.state
    
    const ARBITRARY_MIN_ZOOM = 0.5
    const ARBITRARY_MAX_ZOOM = 2
    
    switch (type) {
      case 'zoomin':
        this.setState({ zoom: Math.min(zoom + 0.1, ARBITRARY_MAX_ZOOM) })
        break;
      case 'zoomout':
        this.setState({ zoom: Math.max(zoom - 0.1, ARBITRARY_MIN_ZOOM) })
        break;
      case 'zoomto': {
        this.setState({
          zoom: 1,
          panX: 0,
          panY: 0,
        })
        break;
      }
    }
  }
  
  onWheel (event) {
    const { deltaY } = event
    if (deltaY < 0) {
      this.onZoom('zoomout', -1)
    } else {
      this.onZoom('zoomin', 1)
    }
  }

  render () {
    const {
      cellHeight,
      cellWidth,
      cellStyle,
      gridColumns,
      gridRows,
      enableInteractionLayer,
      loadingState,
      onKeyDown,
      rotation,
      setOnPan,
      setOnZoom
    } = this.props
    const { images, panX, panY, zoom } = this.state
    
    const naturalWidth = gridColumns * cellWidth
    const naturalHeight = gridRows * cellHeight

    if (loadingState === asyncStates.error) {
      return (
        <div>Something went wrong.</div>
      )
    }

    const svg = this.imageViewer.current

    return (
      <SVGContext.Provider value={{ svg }}>
        <div ref={this.scrollContainer} onWheel={this.onWheel.bind(this)}>
          <SubjectGroupViewer
            enableInteractionLayer={enableInteractionLayer}
            height={naturalHeight}
            onKeyDown={onKeyDown}
            ref={this.imageViewer}
            rotate={rotation}
            width={naturalWidth}
          >
            {images.map((image, index) => this.renderCell(
             image, index, cellWidth, cellHeight, gridRows, gridColumns, cellStyle, panX, panY, zoom
            ))}
          </SubjectGroupViewer>
        </div>
      </SVGContext.Provider>
    )
  }
  
  renderCell (image, index, cellWidth, cellHeight, gridRows, gridColumns, cellStyle, panX, panY, zoom) {
    
    const row = Math.floor(index / gridColumns)
    const col = index % gridColumns
    
    const cellXOffset = col * cellWidth
    const cellYOffset = row * cellHeight
    
    if (
      !image || !image.src || !image.naturalHeight || !image.naturalWidth  // Don't render an image if there's no image to render. Of course.
      || row < 0 || row >= gridRows || col < 0 || col >= gridColumns  // Don't render anything beyond the specified grid.
      || !cellWidth || !cellHeight || !gridColumns || !gridRows
    ) return null
    
    // TODO: what if there are fewer images than cells in the grid?
    
    const fitRatio = Math.max(
      image.naturalWidth / cellWidth,
      image.naturalHeight / cellHeight,
    )
    
    const imageHeight = image.naturalHeight / fitRatio
    const imageWidth = image.naturalWidth / fitRatio
    const imageX = (cellWidth - imageWidth) / 2
    const imageY = (cellHeight - imageHeight) / 2
    
    console.log('+++ panX, panY, zoom: ', panX, panY, zoom)
    
    const clipPathID = `subjectGroupViewer-clipPath-${index}`
    
    return (
      <g
        key={image.src}
        transform={`translate(${cellXOffset}, ${cellYOffset})`}
      >
        <clipPath id={clipPathID}>
          <rect width={cellWidth} height={cellHeight} />
        </clipPath>
        <DraggableRect
          fill={cellStyle.fill}
          width={cellWidth}
          height={cellHeight}
          dragMove={this.dragMove}
        />
        <DraggableImage
          ref={this.subjectImage}
          dragMove={this.dragMove}
          height={imageHeight}
          width={imageWidth}
          x={imageX}
          y={imageY}
          xlinkHref={image.src}
          transform={`scale(${zoom}) translate(${panX}, ${panY})`}
          clip-path={`url(#${clipPathID})`}
        />
        <rect
          fill="none"
          stroke={cellStyle.stroke}
          strokeWidth={cellStyle.strokeWidth}
          width={cellWidth}
          height={cellHeight}
        />
      </g>
    )
  }
}

SubjectGroupViewerContainer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  enableRotation: PropTypes.func,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

SubjectGroupViewerContainer.defaultProps = {
  enableInteractionLayer: true,
  enableRotation: () => null,
  ImageObject: window.Image,
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  setOnPan: () => true,
  setOnZoom: () => true
}

@inject(storeMapper)
@withKeyZoom
@observer
class DecoratedSubjectGroupViewerContainer extends SubjectGroupViewerContainer { }

export default DecoratedSubjectGroupViewerContainer
export { SubjectGroupViewerContainer }
