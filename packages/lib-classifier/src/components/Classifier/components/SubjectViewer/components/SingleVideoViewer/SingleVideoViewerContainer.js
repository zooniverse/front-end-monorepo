import React from 'react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import SingleVideoViewer from './SingleVideoViewer'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import withKeyZoom from '../../../withKeyZoom'

class SingleVideoViewerContainer extends React.Component {
  constructor () {
    super()
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
    const { width: clientWidth, height: clientHeight } = {}
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
      enableInteractionLayer, // drawing layer
      loadingState, // subject resource loaded?
      move, // ?
      onKeyDown, // arrow keys to move image
      rotation, // ?
      title //Hmmm what is this?
    } = this.props
    const { img } = this.state
    const { naturalHeight, naturalWidth, src } = img

    return <div>Video Placeholder</div>

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

    const enableDrawing = (loadingState === asyncStates.success) && enableInteractionLayer
    const SubjectImage = 'image'
    const subjectImageProps = {
      height: naturalHeight,
      width: naturalWidth,
      xlinkHref: src
    }

    return (
        <SVGPanZoom
          img={this.subjectImage.current}
          maxZoom={5}
          naturalHeight={naturalHeight}
          naturalWidth={naturalWidth}
        >
          <SingleVideoViewer
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
          </SingleVideoViewer>
        </SVGPanZoom>
    )
  }
}

SingleVideoViewerContainer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  enableRotation: PropTypes.func,
  loadingState: PropTypes.string,
  move: PropTypes.bool,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  rotation: PropTypes.number,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }),
  title: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  })
}

SingleVideoViewerContainer.defaultProps = {
  enableInteractionLayer: true,
  enableRotation: () => null,
  ImageObject: window.Image,
  loadingState: asyncStates.initialized,
  move: false,
  onError: () => true,
  onReady: () => true,
  rotation: 0,
  title: {}
}

export default withKeyZoom(SingleVideoViewerContainer)
export { SingleVideoViewerContainer }
