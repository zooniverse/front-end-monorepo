import React from 'react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import SingleVideoViewer from './SingleVideoViewer'
import withKeyZoom from '../../../withKeyZoom'

class SingleVideoViewerContainer extends React.Component {
  constructor () {
    super()
    this.imageViewer = React.createRef()
    this.subjectImage = React.createRef()

    this.state = {
      vid: {},
    }
  }

  componentDidMount () {
    this.onLoad()
  }

  async onLoad () {
    const { onError, onReady } = this.props
    try {
      const { clientHeight, clientWidth, naturalHeight, naturalWidth } = await this.getVideoSize()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    } catch (error) {
      console.error(error)
      onError(error)
    }
  }

  async getVideoSize () {
    const vid = await this.preload()
    const { width: clientWidth, height: clientHeight } = {}
    return {
      clientHeight,
      clientWidth,
      naturalHeight: vid.naturalHeight,
      naturalWidth: vid.naturalWidth
    }
  }

  async preload () {
    const { subject } = this.props
    if (subject && subject.locations) {
      const vid = Object.values(subject.locations[0])[0]
      console.log("videoUrl: ", vid)
      this.setState({ vid })
      console.log("this.state: ", this.state)
      return vid
    }
    return {}
  }

  render () {
    const {
      enableInteractionLayer, // drawing layer
      loadingState, // subject resource loaded?
      title //Hmmm what is this?
    } = this.props
    const { vid } = this.state
    const { naturalHeight, naturalWidth, src } = vid

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
          <SingleVideoViewer
            enableInteractionLayer={enableDrawing}
            height={naturalHeight}
            ref={this.imageViewer}
            title={title}
            width={naturalWidth}
          >
            <g ref={this.subjectImage}>
              <SubjectImage
                {...subjectImageProps}
              />
            </g>
          </SingleVideoViewer>
    )
  }
}

SingleVideoViewerContainer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
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
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  title: {}
}

export default withKeyZoom(SingleVideoViewerContainer)
export { SingleVideoViewerContainer }
