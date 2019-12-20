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
    this.onWheel = this.onWheel.bind(this)
    this.imageViewer = React.createRef()
    this.subjectImage = React.createRef()
    this.state = {
      img: {},
      initialScale: 1,
      scale: 1,
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

  componentWillUnmount () {
    this.imageViewer.current && this.imageViewer.current.removeEventListener('wheel', this.onWheel)
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
    this.setState(prevState => {
      const { viewBox } = Object.assign({}, prevState)
      viewBox.x -= difference.x / 1.5
      viewBox.y -= difference.y / 1.5
      return { viewBox }
    })
  }

  onPan (dx, dy) {
    this.setState(prevState => {
      const { viewBox } = Object.assign({}, prevState)
      viewBox.x += dx * 10
      viewBox.y += dy * 10
      return { viewBox }
    })
  }

  onWheel (event) {
    event.preventDefault()
    const { deltaY } = event
    if (deltaY < 0) {
      this.onZoom('zoomout', -1)
    } else {
      this.onZoom('zoomin', 1)
    }
  }

  onZoom (type, zoomValue) {
    switch (type) {
      case 'zoomin': {
        this.setState(prevState => {
          let { scale, viewBox } = Object.assign({}, prevState)
          const xCentre = viewBox.x + viewBox.width / 2
          const yCentre = viewBox.y + viewBox.height / 2
          viewBox.width = parseInt(viewBox.width * 0.9, 10)
          viewBox.height = parseInt(viewBox.height * 0.9, 10)
          viewBox.x = xCentre - viewBox.width / 2
          viewBox.y = yCentre - viewBox.height / 2
          scale = scale / 0.9
          return { scale, viewBox }
        })
        return
      }
      case 'zoomout': {
        this.setState(prevState => {
          let { scale, viewBox } = Object.assign({}, prevState)
          const xCentre = viewBox.x + viewBox.width / 2
          const yCentre = viewBox.y + viewBox.height / 2
          viewBox.width = parseInt(viewBox.width * 1.1, 10)
          viewBox.height = parseInt(viewBox.height * 1.1, 10)
          viewBox.x = xCentre - viewBox.width / 2
          viewBox.y = yCentre - viewBox.height / 2
          scale = scale / 1.1
          return { scale, viewBox }
        })
        return
      }
      case 'zoomto': {
        this.setState(prevState => {
          const { naturalHeight, naturalWidth } = prevState.img
          const scale = prevState.initialScale
          const viewBox = {
            x: 0,
            y: 0,
            width: naturalWidth,
            height: naturalHeight
          }
          return { scale, viewBox }
        })
        return
      }
    }
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
      const scale = clientWidth / naturalWidth
      const initialScale = scale
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      const { viewBox } = this.state
      viewBox.height = naturalHeight
      viewBox.width = naturalWidth
      this.setState({ initialScale, scale, viewBox })
      this.imageViewer.current && this.imageViewer.current.addEventListener('wheel', this.onWheel)
      onReady({ target })
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }

  render () {
    const { loadingState, onError, onKeyDown, rotation, subject } = this.props
    const { img, scale, viewBox } = this.state
    const { naturalHeight, naturalWidth, src } = img
    const subjectImageElement = this.subjectImage.current

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

