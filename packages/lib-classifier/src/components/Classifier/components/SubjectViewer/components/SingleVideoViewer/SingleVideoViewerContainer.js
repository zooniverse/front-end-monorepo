import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import React, { useMemo, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import asyncStates from '@zooniverse/async-states'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import getFixedNumber from '../../helpers/getFixedNumber'
import InteractionLayer from '../InteractionLayer'
import locationValidator from '../../helpers/locationValidator'
import SingleVideoViewer from './SingleVideoViewer'
import VideoController from './components/VideoController'

const SubjectContainer = styled.div`
  position: relative;
`

const DrawingLayer = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  cursor: default;
`

function SingleVideoViewerContainer({
  enableInteractionLayer = false,
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  onKeyDown = () => true,
  subject
}) {
  const [clientWidth, setClientWidth] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState('1x')
  const [timeStamp, setTimeStamp] = useState(0)
  const [videoHeight, setVideoHeight] = useState(0)
  const [videoWidth, setVideoWidth] = useState(0)

  const interactionLayerSVG = useRef()
  const playerRef = useRef()
  const transformLayer = useRef()

  const { t } = useTranslation('components')

  /* ==================== load subject ==================== */

  const videoSrc = subject ? Object.values(subject.locations[0])[0] : null

  const onReactPlayerReady = () => {
    try {
      const reactPlayerVideoHeight = playerRef.current?.getInternalPlayer().videoHeight
      const reactPlayerVideoWidth = playerRef.current?.getInternalPlayer().videoWidth

      const reactPlayerClientHeight = playerRef.current?.getInternalPlayer().getBoundingClientRect().height
      const reactPlayerClientWidth = playerRef.current?.getInternalPlayer().getBoundingClientRect().width

      setVideoHeight(reactPlayerVideoHeight)
      setVideoWidth(reactPlayerVideoWidth)
      setClientWidth(reactPlayerClientWidth)

      const target = {
        clientHeight: reactPlayerClientHeight,
        clientWidth: reactPlayerClientWidth,
        naturalHeight: reactPlayerVideoHeight,
        naturalWidth: reactPlayerVideoWidth
      }
      onReady({ target })
    } catch (error) {
      onError(error)
    }
  }

  const enableDrawing = loadingState === asyncStates.success && enableInteractionLayer

  /* ==================== SingleVideoViewer react-player ==================== */

  const handleVideoProgress = reactPlayerState => {
    // played is the percentage of video played as determined by react-player (0 to 1)
    const { played } = reactPlayerState
    const fixedNumber = getFixedNumber(played, 3)
    setTimeStamp(fixedNumber)
  }

  const handleVideoDuration = duration => {
    setDuration(duration)
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    const prevStatePlaying = isPlaying
    setIsPlaying(!prevStatePlaying)
  }

  const handleSpeedChange = rate => {
    setPlaybackRate(rate)
  }

  /* When VideoController > Slider is clicked or scrubbed */
  const handleSliderChange = e => {
    const newTimeStamp = e.target.value
    playerRef?.current.seekTo(newTimeStamp, 'seconds')
  }

  const handlePlayerError = (error) => {
    onError(error)
  }

  const canvas = transformLayer?.current
  const interactionLayerScale = clientWidth / videoWidth

  /* Memoized so onProgress() and setTimeStamp() don't trigger each other */
  const memoizedViewer = useMemo(() => (
    <SingleVideoViewer
      isPlaying={isPlaying}
      onDuration={handleVideoDuration}
      onEnded={handleVideoEnded}
      onError={handlePlayerError}
      onReactPlayerReady={onReactPlayerReady}
      onProgress={handleVideoProgress}
      playbackRate={playbackRate}
      playerRef={playerRef}
      url={videoSrc}
    />
  ), [isPlaying, playbackRate, videoSrc])

  return (
    <>
      {videoSrc
        ? (
          <SubjectContainer>
            {memoizedViewer}
            {enableDrawing && (
              <DrawingLayer>
                <Box overflow='hidden'>
                  <SVGContext.Provider value={{ canvas }}>
                    <svg
                      ref={interactionLayerSVG}
                      focusable
                      onKeyDown={onKeyDown}
                      tabIndex={0}
                      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g ref={transformLayer} transform=''>
                        <InteractionLayer
                          scale={interactionLayerScale}
                          duration={duration}
                          height={videoHeight}
                          played={timeStamp}
                          width={videoWidth}
                        />
                      </g>
                    </svg>
                  </SVGContext.Provider>
                </Box>
              </DrawingLayer>
            )}
          </SubjectContainer>
          )
        : (
          <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
          )}
      <VideoController
        duration={duration}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onSliderChange={handleSliderChange}
        onSpeedChange={handleSpeedChange}
        playbackRate={playbackRate}
        timeStamp={timeStamp}
      />
    </>
  )
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
