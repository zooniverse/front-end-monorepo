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

  return {
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
      img: {},
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
      const imageUrl = Object.values(subject.locations[0])[0]
      
      const imageUrls = subject.locations.map(obj => Object.values(obj)[0])
      const images = await Promise.all(
        imageUrls.map(url => this.fetchImage(url))
      )
      
      const img = await this.fetchImage(imageUrl)
      this.setState({ img, images })
      return img
    }
    return {}
  }

  async getImageSize () {
    const img = await this.preload()
    const svg = this.imageViewer.current || {}
    const { width: clientWidth, height: clientHeight } = svg.getBoundingClientRect()
    return {
      clientHeight,
      clientWidth,
      naturalHeight: img.naturalHeight,
      naturalWidth: img.naturalWidth
    }
  }

  async onLoad () {
    const { onError, onReady } = this.props
    try {
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
      enableInteractionLayer,
      loadingState,
      onKeyDown,
      rotation,
      setOnPan,
      setOnZoom
    } = this.props
    const { img, images } = this.state
    const { naturalHeight, naturalWidth, src } = img

    if (loadingState === asyncStates.error) {
      return (
        <div>Something went wrong.</div>
      )
    }

    if (!src) {
      return null
    }
    
    if (!naturalWidth) {
      return null
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
            {images.map((image, index) =>
              <g
                transform={`translate(${index * 10}, ${index * 10})`}
              >
                <DraggableImage
                  ref={this.subjectImage}
                  dragMove={this.dragMove}
                  height={image.naturalHeight / 3}
                  width={image.naturalWidth / 3}
                  xlinkHref={image.src}
                />
              </g>
            )}
          </SubjectGroupViewer>
        </SVGPanZoom>
        <SubTaskPopup />
      </SVGContext.Provider>
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
