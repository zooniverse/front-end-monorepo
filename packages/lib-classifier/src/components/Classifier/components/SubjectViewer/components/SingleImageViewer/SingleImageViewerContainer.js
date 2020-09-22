import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { draggable } from '@plugins/drawingTools/components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from './SingleImageViewer'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import withKeyZoom from '../../../withKeyZoom'

const DraggableImage = styled(draggable('image'))`
  cursor: move;
`

class SingleImageViewerContainer extends React.Component {
  constructor () {
    super()
    this.dragMove = this.dragMove.bind(this)
    this.setOnDrag = this.setOnDrag.bind(this)
    
    this.imageViewer = React.createRef()
    this.subjectImage = React.createRef()

    this.state = {
      img: {},
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
      console.log('subject', subject)
      const imageUrl = Object.values(subject.locations[0])[0]
      console.log('imageUrl', imageUrl)
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
      move,
      onKeyDown,
      rotation,
      setOnPan,
      setOnZoom,
      title
    } = this.props
    const { img } = this.state
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
    const enableDrawing = (loadingState === asyncStates.success) && enableInteractionLayer
    const SubjectImage = move ? DraggableImage : 'image'
    const subjectImageProps = {
      height: naturalHeight,
      width: naturalWidth,
      xlinkHref: src,
      ...(move && { dragMove: this.dragMove })
    }

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
          <SingleImageViewer
            enableInteractionLayer={enableDrawing}
            height={naturalHeight}
            onKeyDown={onKeyDown}
            ref={this.imageViewer}
            rotate={rotation}
            title={title}
            width={naturalWidth}
          >
            <g ref={this.subjectImage}>
              <SubjectImage
                {...subjectImageProps}
              />
            </g>
          </SingleImageViewer>
        </SVGPanZoom>
      </SVGContext.Provider>
    )
  }
}

SingleImageViewerContainer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  enableRotation: PropTypes.func,
  loadingState: PropTypes.string,
  move: PropTypes.bool,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  rotation: PropTypes.number,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }),
  title: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  })
}

SingleImageViewerContainer.defaultProps = {
  enableInteractionLayer: true,
  enableRotation: () => null,
  ImageObject: window.Image,
  loadingState: asyncStates.initialized,
  move: false,
  onError: () => true,
  onReady: () => true,
  rotation: 0,
  setOnPan: () => true,
  setOnZoom: () => true,
  title: {}
}

export default withKeyZoom(SingleImageViewerContainer)
export { DraggableImage, SingleImageViewerContainer }
