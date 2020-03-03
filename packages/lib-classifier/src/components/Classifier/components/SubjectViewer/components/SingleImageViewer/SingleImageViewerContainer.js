import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import React from 'react'
import PropTypes from 'prop-types'
import { draggable } from '@plugins/drawingTools/components'

import styled from 'styled-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import SingleImageViewer from './SingleImageViewer'
import locationValidator from '../../helpers/locationValidator'
import withKeyZoom from '../../../withKeyZoom'
import SubTaskPopup from '../../../SubTaskPopup'

function storeMapper (stores) {
  const {
    enableRotation,
    move,
    rotation,
    setOnZoom,
    setOnPan
  } = stores.classifierStore.subjectViewer

  return {
    enableRotation,
    move,
    rotation,
    setOnZoom,
    setOnPan
  }
}

const DraggableImage = styled(draggable('image'))`
  cursor: move;
`

class SingleImageViewerContainer extends React.Component {
  constructor () {
    super()
    this.setOnDrag = this.setOnDrag.bind(this)
    this.dragMove = this.dragMove.bind(this)
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
      move,
      onKeyDown,
      rotation,
      setOnPan,
      setOnZoom
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
            width={naturalWidth}
          >
            <g ref={this.subjectImage}>
              <SubjectImage
                dragMove={this.dragMove}
                height={naturalHeight}
                width={naturalWidth}
                xlinkHref={src}
              />
            </g>
          </SingleImageViewer>
        </SVGPanZoom>
        <SubTaskPopup />
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
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
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
  setOnPan: () => true,
  setOnZoom: () => true
}

@inject(storeMapper)
@withKeyZoom
@observer
class DecoratedSingleImageViewerContainer extends SingleImageViewerContainer { }

export default DecoratedSingleImageViewerContainer
export { DraggableImage, SingleImageViewerContainer }
