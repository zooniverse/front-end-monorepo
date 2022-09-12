import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'
import locationValidator from '../../helpers/locationValidator'
import SingleVideoViewer from './SingleVideoViewer'
import VideoController from '../VideoController/VideoController'
import getFixedNumber from '../../helpers/getFixedNumber'

const ScreenContainer = styled.div`
  position: relative;
`

const DrawingLayer = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  cursor: default;
`

class SingleVideoViewerContainer extends React.Component {
  constructor() {
    super()

    this.interactionLayerSVG = React.createRef()
    this.player = React.createRef()
    this.transformLayer = React.createRef()

    this.state = {
      clientWidth: 0,
      duration: 0,
      isPlaying: false,
      played: 0,
      playbackRate: 1,
      isSeeking: false,
      naturalHeight: 0,
      naturalWidth: 0,
      vid: null
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
      const target = { clientHeight, clientWidth, naturalWidth, naturalHeight }
      this.setState({
        clientWidth: clientWidth,
        naturalHeight: naturalHeight,
        naturalWidth: naturalWidth
      })
      onReady({ target })
    } catch (error) {
      onError(error)
    }
  }

  async getVideoSize() {
    const vid = await this.preload()
    const svg = this.interactionLayerSVG.current
    const { width: clientWidth, height: clientHeight } = svg
      ? svg.getBoundingClientRect()
      : {}

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
      const vid = await this.createVideoElement(videoUrl)
      this.setState({ vid })
      return vid
    }
    return {}
  }

  createVideoElement(url) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.onloadedmetadata = () => resolve(video)
      video.onerror = reject
      video.src = url
      return video
    })
  }

  /* ==================== SingleVideoViewer react-player ==================== */
  handleVideoProgress = (reactPlayerState) => {
    const { played } = reactPlayerState
    const fixedNumber = getFixedNumber(played, 5)
    this.setState((prevState) => {
      if (prevState.isSeeking) return null
      return { played: fixedNumber }
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

  handleSpeedChange = (rate) => {
    this.setState({ playbackRate: rate })
  }

  handleSliderMouseUp = () => {
    this.setState({ isSeeking: false })
  }

  handleSliderMouseDown = () => {
    this.setState({ isPlaying: false, isSeeking: true })
  }

  /* When VideoController > Slider is clicked or scrubbed */
  handleSliderChange = (e) => {
    const played = getFixedNumber(e.target.value, 5)
    this.player?.current.seekTo(played)

    /* Can't find a use case for this code, not sure of its purpose */
    
    // this.setState(
    //   (prevState) => {
    //     console.log(prevState)
    //     // what are entities? what is this for loop doing?
    //     let { focusing } = prevState
    //     if (focusing) {
    //       const { incidents } = prevState?.entities?.annotations?.focusing
    //       for (let i = 0; i < incidents?.length; i += 1) {
    //         if (played >= incidents[i].time) {
    //           if (i !== incidents.length - 1 && played >= incidents[i + 1].time)
    //             continue
    //           if (incidents[i].status !== SHOW) focusing = ''
    //           break
    //         } else if (i === incidents.length - 1) focusing = ''
    //       }
    //     }
    //     return { played, focusing }
    //   }
    // )
  }

  render() {
    const { 
      enableInteractionLayer = true,
      loadingState = asyncStates.initialized,
      onKeyDown 
    } = this.props

    const {
      clientWidth,
      duration,
      isPlaying,
      played,
      playbackRate,
      naturalHeight,
      naturalWidth,
      vid
    } = this.state

    if (loadingState === asyncStates.error) {
      return <div>Something went wrong.</div>
    }

    const canvas = this.transformLayer?.current
    const interactionLayerScale = clientWidth / naturalWidth

    return (
      <>
        <ScreenContainer>
          <SingleVideoViewer
            isPlaying={isPlaying}
            onDuration={this.handleVideoDuration}
            onEnded={this.handleVideoEnded}
            onProgress={this.handleVideoProgress}
            playbackRate={playbackRate}
            playerRef={this.player}
            url={vid?.src}
          />

          {/* Drawing Layer */
          /* Could this be moved to its own component file and why does it have an animation? */}
          <DrawingLayer>
            <Box animation='fadeIn' overflow='hidden'>
              <SVGContext.Provider value={{ canvas }}>
                <svg
                  ref={this.interactionLayerSVG}
                  focusable
                  onKeyDown={onKeyDown}
                  tabIndex={0}
                  viewBox={`0 0 ${naturalWidth} ${naturalHeight}`}
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g ref={this.transformLayer} transform=''>
                    {enableInteractionLayer && (
                      <InteractionLayer
                        scale={interactionLayerScale}
                        duration={duration}
                        height={naturalHeight}
                        played={played}
                        width={naturalWidth}
                      />
                    )}
                  </g>
                </svg>
              </SVGContext.Provider>
            </Box>
          </DrawingLayer>
        </ScreenContainer>
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
      </>
    )
  }
}

SingleVideoViewerContainer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onKeyDown: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default SingleVideoViewerContainer
