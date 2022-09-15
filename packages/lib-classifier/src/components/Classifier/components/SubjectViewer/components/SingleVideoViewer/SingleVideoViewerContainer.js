import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'
import locationValidator from '../../helpers/locationValidator'
import SingleVideoViewer from './SingleVideoViewer'
import VideoController from '../VideoController/VideoController'
import getFixedNumber from '../../helpers/getFixedNumber'

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
  enableInteractionLayer = true,
  onError = () => true,
  onReady = () => true,
  onKeyDown = () => true,
  subject
}) {
  const [clientWidth, setClientWidth] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
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
      setVideoHeight(reactPlayerVideoHeight)
      setVideoWidth(reactPlayerVideoWidth)

      const { width: svgClientWidth, height: svgClientHeight } = interactionLayerSVG.current?.getBoundingClientRect()
      setClientWidth(svgClientWidth)

      const target = {
        clientHeight: svgClientHeight,
        clientWidth: svgClientWidth,
        naturalHeight: reactPlayerVideoHeight,
        naturalWidth: reactPlayerVideoWidth
      }
      onReady({ target })
    } catch (error) {
      onError(error)
    }
  }

  /* ==================== SingleVideoViewer react-player ==================== */

  const handleVideoProgress = reactPlayerState => {
    const { played } = reactPlayerState
    const fixedNumber = getFixedNumber(played, 5)
    // TO DO: Why wouldn't you set timestamp when seeking?
    if (!isSeeking) {
      setTimeStamp(fixedNumber)
    }
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

  const handleSliderMouseUp = () => {
    setIsSeeking(false)
  }

  const handleSliderMouseDown = () => {
    setIsPlaying(false)
    setIsSeeking(true)
  }

  /* When VideoController > Slider is clicked or scrubbed */
  const handleSliderChange = e => {
    const played = getFixedNumber(e.target.value, 5)
    playerRef?.current.seekTo(played)
  }

  const handlePlayerError = (error) => {
    onError(error)
  }

  const canvas = transformLayer?.current
  const interactionLayerScale = clientWidth / videoWidth

  return (
    <>
      {videoSrc
        ? (
          <SubjectContainer>
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
            {/* Drawing Layer */}
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
                      {enableInteractionLayer && (
                        <InteractionLayer
                          scale={interactionLayerScale}
                          duration={duration}
                          height={videoHeight}
                          played={timeStamp}
                          width={videoWidth}
                        />
                      )}
                    </g>
                  </svg>
                </SVGContext.Provider>
              </Box>
            </DrawingLayer>
          </SubjectContainer>
          )
        : (
          <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
          )}
      <VideoController
        isPlaying={isPlaying}
        played={timeStamp}
        playbackRate={playbackRate}
        duration={duration}
        onPlayPause={handlePlayPause}
        onSpeedChange={handleSpeedChange}
        onSliderMouseUp={handleSliderMouseUp}
        onSliderMouseDown={handleSliderMouseDown}
        onSliderChange={handleSliderChange}
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
