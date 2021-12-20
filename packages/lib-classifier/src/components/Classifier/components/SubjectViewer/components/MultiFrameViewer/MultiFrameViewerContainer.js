import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import withKeyZoom from '@components/Classifier/components/withKeyZoom'
import { withStores } from '@helpers'
import { draggable } from '@plugins/drawingTools/components'

import FrameCarousel from './FrameCarousel'
import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'


function storeMapper(store) {
  const {
    enableRotation,
    frame,
    move,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  } = store.subjectViewer

  return {
    enableRotation,
    frame,
    move,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  }
}

const DraggableImage = styled(draggable('image'))`
  cursor: move;
`

class MultiFrameViewerContainer extends React.Component {
  constructor () {
    super()
    this.dragMove = this.dragMove.bind(this)
    this.onFrameChange = this.onFrameChange.bind(this)
    this.setOnDrag = this.setOnDrag.bind(this)

    this.subjectImage = React.createRef()
    
    this.state = {
      img: {}
    }
  }

  componentDidMount () {
    this.props.enableRotation()
    this.onLoad()
  }

  componentDidUpdate (prevProps) {
    const { frame } = this.props
    if (prevProps.frame !== frame) {
      this.onLoad()
    }
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

  onFrameChange(frame) {
    const { setFrame } = this.props
    setFrame(frame)
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
    const svgImage = this.subjectImage.current
    const { width: clientWidth, height: clientHeight } = svgImage ? svgImage.getBoundingClientRect() : {}
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
      frame,
      loadingState,
      move,
      onKeyDown,
      rotation,
      setOnPan,
      setOnZoom,
      subject
    } = this.props
    const { img } = this.state
    
    // If image hasn't been fully retrieved, use a placeholder
    const src = img?.src || 'https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png'  // Use this instead of https://www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png to save on network calls
    const naturalWidth = img?.naturalWidth || 800
    const naturalHeight = img?.naturalHeight || 600

    if (loadingState === asyncStates.error) {
      return (
        <div>Something went wrong.</div>
      )
    }

    const enableDrawing = (loadingState === asyncStates.success) && enableInteractionLayer
    const SubjectImage = move ? DraggableImage : 'image'
    const subjectImageProps = {
      height: naturalHeight,
      width: naturalWidth,
      xlinkHref: src,
      ...(move && { dragMove: this.dragMove })
    }

    if (loadingState !== asyncStates.initialized) {
      return (
        <Box
          direction='row'
          fill='horizontal'
        >
          <FrameCarousel
            frame={frame}
            onFrameChange={this.onFrameChange}
            locations={subject.locations}
          />
          <SVGPanZoom
            img={this.subjectImage.current}
            maxZoom={5}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            setOnDrag={this.setOnDrag}
            setOnPan={setOnPan}
            setOnZoom={setOnZoom}
            src={src}
          >
            <SingleImageViewer
              enableInteractionLayer={enableDrawing}
              height={naturalHeight}
              onKeyDown={onKeyDown}
              rotate={rotation}
              width={naturalWidth}
            >
              <g ref={this.subjectImage}>
                <SubjectImage
                  {...subjectImageProps}
                />
              </g>
            </SingleImageViewer>
          </SVGPanZoom>
        </Box>
      )
    }
    return null
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

export default withStores(withKeyZoom(MultiFrameViewerContainer), storeMapper)
export { DraggableImage, MultiFrameViewerContainer }
