import React from 'react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import locationValidator from '../../helpers/locationValidator'
import SingleVideoViewer from './SingleVideoViewer'
import VideoController from '../VideoController/VideoController'

class SingleVideoViewerContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      vid: '',
      isPlaying: false
    }
  }

  componentDidMount() {
    this.onLoad()
  }

  /* ==================== get subject ==================== */
  async onLoad() {
    const { onError, onReady } = this.props
    try {
      const {
        clientHeight,
        clientWidth,
        naturalHeight,
        naturalWidth
      } = await this.getVideoSize()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    } catch (error) {
      onError(error)
    }
  }

  async getVideoSize() {
    const vid = await this.preload()
    const { width: clientWidth, height: clientHeight } = {}
    return {
      clientHeight,
      clientWidth,
      naturalHeight: vid.naturalHeight,
      naturalWidth: vid.naturalWidth
    }
  }

  preload() {
    const { subject } = this.props
    if (subject && subject.locations) {
      const vid = Object.values(subject.locations[0])[0]
      this.setState({ vid })
      return vid
    }
    return {}
  }

  /* ==================== video player ==================== */
  handlePlayerRef = (player) => {
    console.log('Im handling it!!!')
    this.player = player
  }

  onVideoPlayPause = () => {
    console.log('Play Me!!!')
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }))
  }

  render() {
    const { loadingState } = this.props
    const { vid, isPlaying } = this.state
    // Erik Todo
    const { naturalHeight, naturalWidth, src } = vid

    if (loadingState === asyncStates.error) {
      return <div>Something went wrong.</div>
    }

    // Erik Todo
    // if (!src) {
    //   return null
    // }

    // if (!naturalWidth) {
    //   return null
    // }

    return (
      <div>
        <div>
          <SingleVideoViewer
            playerRef={this.handlePlayerRef}
            url={vid}
            isPlaying={isPlaying}
          ></SingleVideoViewer>
          {/* Drawing layer here */}
        </div>
        <VideoController onPlayPause={this.onVideoPlayPause} />
      </div>
    )
  }
}

SingleVideoViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

SingleVideoViewerContainer.defaultProps = {
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true
}

export default SingleVideoViewerContainer
