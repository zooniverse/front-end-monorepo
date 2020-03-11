import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import React from 'react'
import PropTypes from 'prop-types'
import { draggable } from '@plugins/drawingTools/components'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import SubjectGroupViewer from './SubjectGroupViewer'
import locationValidator from '../../helpers/locationValidator'
import withKeyZoom from '../../../withKeyZoom'
import SubTaskPopup from '../../../SubTaskPopup'

function storeMapper (stores) {
  const {
    enableRotation,
    rotation,
    setOnZoom,
    setOnPan
  } = stores.classifierStore.subjectViewer
  
  // TODO
  const gridRows = 3
  const gridColumns = 3
  const cellWidth = 400
  const cellHeight = 400

  return {
    cellWidth,
    cellHeight,
    gridRows,
    gridColumns,
    enableRotation,
    rotation,
    setOnZoom,
    setOnPan
  }
}

const DraggableImage = draggable('image')

class SubjectGroupViewerContainer extends React.Component {
  constructor () {
    super()
    this.setOnDrag = this.setOnDrag.bind(this)
    this.dragMove = this.dragMove.bind(this)
    this.imageViewer = React.createRef()
    this.subjectImage = React.createRef()

    this.state = {
      images: [],
    }
  }

  componentDidMount () {
    this.props.enableRotation()
    this.onLoad()
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

  setOnDrag (callback) {
    this.onDrag = callback
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

  render () {
    const {
      cellWidth,
      cellHeight,
      gridRows,
      gridColumns,
      enableInteractionLayer,
      loadingState,
      onKeyDown,
      rotation,
      setOnPan,
      setOnZoom
    } = this.props
    const { images } = this.state
    
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
        <SVGPanZoom
          img={this.subjectImage.current}
          maxZoom={5}
          naturalHeight={naturalHeight}
          naturalWidth={naturalWidth}
          setOnDrag={this.setOnDrag}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
        >
          <SubjectGroupViewer
            enableInteractionLayer={enableInteractionLayer}
            height={naturalHeight}
            onKeyDown={onKeyDown}
            ref={this.imageViewer}
            rotate={rotation}
            width={naturalWidth}
          >
            {images.map((image, index) => this.renderCell(image, index, cellWidth, cellHeight, gridRows, gridColumns))}
          </SubjectGroupViewer>
        </SVGPanZoom>
        <SubTaskPopup />
      </SVGContext.Provider>
    )
  }
  
  renderCell (image, index, cellWidth, cellHeight, gridRows, gridColumns) {
    
    const row = Math.floor(index / gridColumns)
    const col = index % gridColumns
    
    const cellXOffset = col * cellWidth
    const cellYOffset = row * cellHeight
    
    if (
      !image || !image.src || !image.naturalHeight || !image.naturalWidth  // Don't render an image if there's no image to render. Of course.
      || row < 0 || row >= gridRows || col < 0 || col >= gridColumns  // Don't render anything beyond the specified grid.
    ) return null
    
    // TODO: what if there are fewer images than cells in the grid?
    
    const fitRatio = 1
    
    const imageHeight = image.naturalHeight / fitRatio
    const imageWidth = image.naturalWidth / fitRatio
    
    return (
      <g
        transform={`translate(${cellXOffset}, ${cellYOffset})`}
      >
        <DraggableImage
          ref={this.subjectImage}
          dragMove={this.dragMove}
          height={imageHeight}
          width={imageWidth}
          xlinkHref={image.src}
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
