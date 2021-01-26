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
      isPlaying: false,
      playbackRate: 1,
      played: 0,
      duration: 0,
      isSeeking: false
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
    this.player = player
  }

  handleVideoProgress = (state) => {
    const { played } = state
    this.setState((prevState) => {
      if (prevState.isSeeking) return null
      return { played: this.getFixedNumber(played, 5) }
    })
  }

  handleVideoDuration = (duration) => {
    this.setState({ duration })
  }

  handleVideoEnded = () => {
    this.setState({ isPlaying: false })
  }

  handlePlayPause = () => {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }))
  }

  handleSpeedChange = (s) => {
    this.setState({ playbackRate: s })
  }

  handleSliderMouseUp = () => {
    this.setState({ isSeeking: false })
  }

  handleSliderMouseDown = () => {
    this.setState({ isPlaying: false, isSeeking: true })
  }

  handleSliderChange = () => {
    console.log('Slider Change')
  }

  // Updates slider as video plays
  // Slider is clickable; video jumps to time where user clicks
  handleSliderChange = (e) => {
    const played = this.getFixedNumber(e.target.value, 5)
    this.setState(
      (prevState) => {
        const { entities } = prevState
        let { focusing } = prevState
        if (focusing) {
          const { incidents } = entities.annotations[focusing]
          for (let i = 0; i < incidents.length; i += 1) {
            if (played >= incidents[i].time) {
              if (i !== incidents.length - 1 && played >= incidents[i + 1].time)
                continue
              if (incidents[i].status !== SHOW) focusing = ''
              break
            } else if (i === incidents.length - 1) focusing = ''
          }
        }
        return { played, focusing }
      },
      () => {
        this.player.seekTo(played)
      }
    )
  }

  getFixedNumber = (number, digits) => {
    return Math.round(number * 10 ** digits) / 10 ** digits
  }

  render() {
    const { loadingState } = this.props
    const { vid, isPlaying, playbackRate, played, duration } = this.state
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
            playbackRate={playbackRate}
            onProgress={this.handleVideoProgress}
            onDuration={this.handleVideoDuration}
            onEnded={this.handleVideoEnded}
          />
          {/* Drawing layer here */}
        </div>
        <VideoController
          isPlaying={isPlaying}
          played={played}
          playbackRate={playbackRate}
          duration={duration}
          onPlayPause={this.handlePlayPause}
          onSpeedChange={this.handleSpeedChange}
          onSliderMouseUp={this.handleSliderMouseUp}
          onSliderMouseDown={this.handleSliderMouseDown}
          onSliderChange={this.handleSliderChange}
        />
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
