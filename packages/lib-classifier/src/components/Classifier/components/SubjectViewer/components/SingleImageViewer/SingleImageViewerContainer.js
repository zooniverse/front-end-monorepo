import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import React from 'react'
import PropTypes from 'prop-types'
import { draggable } from '@plugins/drawingTools/components'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import SingleImageViewer from './SingleImageViewer'
import locationValidator from '../../helpers/locationValidator'
import withKeyZoom from '../../../withKeyZoom'

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

class SingleImageViewerContainer extends React.Component {
  constructor () {
    super()
    this.dragMove = this.dragMove.bind(this)
    this.imageViewer = React.createRef()
    this.subjectImage = React.createRef()
    this.state = {
      img: {},
      viewBox: {
        x: 0,
        y: 0,
        height: 0,
        width: 0
      }
    }
  }

  componentDidMount () {
    this.props.enableRotation()
    this.props.setOnZoom(this.onZoom.bind(this))
    this.props.setOnPan(this.onPan.bind(this))
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
    const { viewBox } = this.state
    viewBox.x -= difference.x
    viewBox.y -= difference.y
    this.setState({ viewBox })
  }

  onPan (dx, dy) {
    const { viewBox } = this.state
    viewBox.x += dx * 10
    viewBox.y += dy * 10
    this.setState({ viewBox })
  }

  onZoom (type, zoomValue) {
    const { viewBox } = this.state
    const xCentre = viewBox.x + viewBox.width / 2
    const yCentre = viewBox.y + viewBox.height / 2
    viewBox.width -= zoomValue * 10
    viewBox.height -= zoomValue * 10
    viewBox.x = xCentre - viewBox.width / 2
    viewBox.y = yCentre - viewBox.height / 2
    this.setState({ viewBox })
  }

  async preload () {
    const { subject } = this.props
    if (subject && subject.locations) {
      // TODO: Add polyfill for Object.values for IE
      const imageUrl = Object.values(subject.locations[0])[0]
      const img = await this.fetchImage(imageUrl)
      this.setState({ img })
      return img
    }
    return {}
  }

  async getImageSize () {
    const img = await this.preload()
    const svg = this.imageViewer.current || {}
    return {
      clientHeight: svg.clientHeight,
      clientWidth: svg.clientWidth,
      naturalHeight: img.naturalHeight,
      naturalWidth: img.naturalWidth
    }
  }

  async onLoad () {
    const { onError, onReady } = this.props
    try {
      const { clientHeight, clientWidth, naturalHeight, naturalWidth } = await this.getImageSize()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      const { viewBox } = this.state
      viewBox.height = naturalHeight
      viewBox.width = naturalWidth
      this.setState({ viewBox })
      onReady({ target })
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }

  render () {
    const { loadingState, onError, onKeyDown, rotation, subject } = this.props
    const { img, viewBox } = this.state
    const { naturalHeight, naturalWidth, src } = img
    const subjectImageElement = this.subjectImage.current
    let scale = 1
    if (subjectImageElement) {
      const { width: clientWidth, height: clientHeight } = subjectImageElement.wrappedComponent.current.getBoundingClientRect()
      scale = clientWidth / naturalWidth
    }

    if (loadingState === asyncStates.error) {
      return (
        <div>Something went wrong.</div>
      )
    }

    if (!src) {
      return null
    }

    const svg = this.imageViewer.current
    const getScreenCTM = () => svg.getScreenCTM()
    
    return (
      <SVGContext.Provider value={{ svg, getScreenCTM }}>
        <SingleImageViewer
          ref={this.imageViewer}
          height={naturalHeight}
          onKeyDown={onKeyDown}
          rotate={rotation}
          scale={scale}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          width={naturalWidth}
        >
          <DraggableImage
            ref={this.subjectImage}
            dragMove={this.dragMove}
            height={naturalHeight}
            width={naturalWidth}
            xlinkHref={src}
          />
        </SingleImageViewer>
      </SVGContext.Provider>
    )
  }
}

SingleImageViewerContainer.wrappedComponent.propTypes = {
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


SingleImageViewerContainer.wrappedComponent.defaultProps = {
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
class DecoratedSingleImageViewerContainer extends SingleImageViewerContainer { }

export default DecoratedSingleImageViewerContainer
export { SingleImageViewerContainer }

