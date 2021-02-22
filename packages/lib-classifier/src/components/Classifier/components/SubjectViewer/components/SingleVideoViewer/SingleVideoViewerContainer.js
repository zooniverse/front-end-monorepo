import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'

import InteractionLayer from '../InteractionLayer'
import locationValidator from '../../helpers/locationValidator'
import SingleVideoViewer from './SingleVideoViewer'
import VideoController from '../VideoController/VideoController'

const DrawingContainer = styled.div`
  position: absolute;
  top: 50px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  background-color: rgba(221, 221, 221, 0.3);
  width: 500px;
  height: 300px;
  cursor: default;
`

class SingleVideoViewerContainer extends React.Component {
  constructor() {
    super()

    this.videoViewer = React.createRef()

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
    console.log('this.props: ', this.props)

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
      console.log('target: ', target)
      onReady({ target })
    } catch (error) {
      onError(error)
    }
  }

  async getVideoSize() {
    const vid = await this.preload()
    const svg = this.videoViewer.current
    console.log('svg: ', svg)

    const { width: clientWidth, height: clientHeight } = {}
    return {
      clientHeight,
      clientWidth,
      naturalHeight: vid.videoHeight,
      naturalWidth: vid.videoWidth
    }
  }

  async preload() {
    const { subject } = this.props
    if (subject && subject.locations) {
      const videoUrl = Object.values(subject.locations[0])[0]
      const vid = await this.fetchVideo(videoUrl)
      this.setState({ vid })
      return vid
    }
    return {}
  }

  fetchVideo(url) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.onloadedmetadata = () => resolve(video)
      video.onerror = reject
      video.src = url
      return video
    })
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
    const { loadingState, enableInteractionLayer, onKeyDown } = this.props
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

    // const svg = this.videoViewer.current
    const enableDrawing =
      loadingState === asyncStates.success && enableInteractionLayer

    return (
      <div>
        <SingleVideoViewer
          playerRef={this.handlePlayerRef}
          url={vid.src}
          isPlaying={isPlaying}
          playbackRate={playbackRate}
          onProgress={this.handleVideoProgress}
          onDuration={this.handleVideoDuration}
          onEnded={this.handleVideoEnded}
        />

        {/* Drawing Layer */}
        <DrawingContainer>
          SVG drawing layer
          <Box animation='fadeIn' overflow='hidden'>
            <svg
              ref={this.videoViewer}
              focusable
              onKeyDown={onKeyDown}
              tabIndex={0}
              viewBox={'0 0 400 300'}
            >
              {/* {title?.id && title?.text && (
                <title id={title.id}>{title.text}</title>
              )} */}
              {enableInteractionLayer && (
                <InteractionLayer scale={scale} height={height} width={width} />
              )}
            </svg>
          </Box>
        </DrawingContainer>

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
  enableInteractionLayer: PropTypes.bool,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  onKeyDown: PropTypes.func,
  viewBox: PropTypes.string.isRequired,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

SingleVideoViewerContainer.defaultProps = {
  loadingState: asyncStates.initialized,
  enableInteractionLayer: true,
  onKeyDown: () => true,
  onError: () => true,
  onReady: () => true
}

export default SingleVideoViewerContainer
