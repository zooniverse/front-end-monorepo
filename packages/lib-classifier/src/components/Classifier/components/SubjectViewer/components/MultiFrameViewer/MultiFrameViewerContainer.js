import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import { draggable } from '@plugins/drawingTools/components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import FrameCarousel from './FrameCarousel'
import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import withKeyZoom from '../../../withKeyZoom'
import SubTaskPopup from '../../../SubTaskPopup'

function storeMapper (stores) {
  const {
    enableRotation,
    frame,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  } = stores.classifierStore.subjectViewer

  return {
    enableRotation,
    frame,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  }
}

const DraggableImage = draggable('image')

class MultiFrameViewerContainer extends React.Component {
  constructor () {
    super()
    this.dragMove = this.dragMove.bind(this)
    this.onFrameChange = this.onFrameChange.bind(this)
    this.onWheel = this.onWheel.bind(this)
    this.imageViewer = React.createRef()
    this.subjectImage = React.createRef()

    
    this.state = {
      img: {},
      scale: 1,
      viewBox: {
        height: 0,
        width: 0,
        x: 0,
        y: 0
      }
    }
  }

  componentDidMount () {
    this.props.enableRotation()
    this.props.setOnPan(this.onPan.bind(this))
    this.props.setOnZoom(this.onZoom.bind(this))
    this.onLoad()
  }

  componentDidUpdate (prevProps) {
    const { frame } = this.props
    if (prevProps.frame !== frame) {
      this.onLoad()
    }
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

  onFrameChange(frame) {
    const { setFrame } = this.props
    setFrame(frame)
  }

  onPan (dx, dy) {
    this.setState(prevState => {
      const { viewBox } = Object.assign({}, prevState)
      viewBox.x -= dx * 10
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

  onZoom (type) {
    switch (type) {
      case 'zoomin': {
        this.setState(prevState => {
          let { scale } = Object.assign({}, prevState)
          scale = Math.min(scale + 0.1, 2)
          const viewBox = this.scaledViewBox(scale)
          return { scale, viewBox }
        })
        return
      }
      case 'zoomout': {
        this.setState(prevState => {
          let { scale } = Object.assign({}, prevState)
          scale = Math.max(scale - 0.1, 1)
          const viewBox = this.scaledViewBox(scale)
          return { scale, viewBox }
        })
        return
      }
      case 'zoomto': {
        this.setState(prevState => {
          const { naturalHeight, naturalWidth } = prevState.img
          const scale = 1
          const viewBox = {
            x: 0,
            y: 0,
            width: naturalWidth,
            height: naturalHeight
          }
          return { scale, viewBox }
        })
      }
    }
  }

  scaledViewBox (scale) {
    const { img, viewBox } = this.state
    const viewBoxScale = 1 / scale
    const xCentre = viewBox.x + viewBox.width / 2
    const yCentre = viewBox.y + viewBox.height / 2
    const width = parseInt(img.naturalWidth * viewBoxScale, 10)
    const height = parseInt(img.naturalHeight * viewBoxScale, 10)
    const x = xCentre - width / 2
    const y = yCentre - height / 2
    return { x, y, width, height }
  }

  async preload () {
    const { frame, subject } = this.props
    if (subject && subject.locations) {
      // TODO: Validate for allowed image media mime types
      const imageUrl = Object.values(subject.locations[frame])[0]
      const img = await this.fetchImage(imageUrl)
      this.setState({ img })
      return img
    }
    return {}
  }

  async getImageSize () {
    const img = await this.preload()
    const svg = this.imageViewer.current
    const { width: clientWidth, height: clientHeight } = svg ? svg.getBoundingClientRect() : {}
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
      const { viewBox } = this.state
      viewBox.height = naturalHeight
      viewBox.width = naturalWidth
      this.setState({ viewBox })
      this.imageViewer.current && this.imageViewer.current.addEventListener('wheel', this.onWheel)
      onReady({ target })
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }

  render () {
    const {
      enableInteractionLayer,
      frame,
      loadingState,
      onKeyDown,
      rotation,
      subject
    } = this.props
    const { img, viewBox } = this.state
    const { naturalHeight, naturalWidth, src } = img

    if (loadingState === asyncStates.error) {
      return (
        <div>Something went wrong.</div>
      )
    }

    if (!src) {
      return null
    }

    const svg = this.imageViewer.current
    const currentSubjectImage = this.subjectImage.current
    const getScreenCTM = () => svg.getScreenCTM()
    const { width: clientWidth, height: clientHeight } = currentSubjectImage ? currentSubjectImage.getBoundingClientRect() : {}
    const subjectScale = clientWidth / naturalWidth

    return (
      <Box
        direction='row'
      >
        <FrameCarousel
          frame={frame}
          onFrameChange={this.onFrameChange}
          locations={subject.locations}
        />
        <SVGContext.Provider value={{ svg, getScreenCTM }}>
          <SingleImageViewer
            enableInteractionLayer={enableInteractionLayer}
            height={naturalHeight}
            onKeyDown={onKeyDown}
            ref={this.imageViewer}
            rotate={rotation}
            scale={subjectScale}
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
          <SubTaskPopup />
        </SVGContext.Provider>
      </Box>
    )
  }
}

MultiFrameViewerContainer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  enableRotation: PropTypes.func,
  frame: PropTypes.number,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  setFrame: PropTypes.func,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

MultiFrameViewerContainer.defaultProps = {
  enableInteractionLayer: true,
  enableRotation: () => null,
  frame: 0,
  ImageObject: window.Image,
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  setFrame: () => {},
  setOnPan: () => true,
  setOnZoom: () => true
}

@inject(storeMapper)
@withKeyZoom
@observer
class DecoratedMultiFrameViewerContainer extends MultiFrameViewerContainer { }

export default DecoratedMultiFrameViewerContainer
export { MultiFrameViewerContainer }
