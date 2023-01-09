import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import { MobXProviderContext } from 'mobx-react'
import { useContext, useMemo, useState, useRef } from 'react';
import { useTranslation } from '@translations/i18n'
import asyncStates from '@zooniverse/async-states'
import ReactPlayer from 'react-player'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import getFixedNumber from '../../helpers/getFixedNumber'
import InteractionLayer from '../InteractionLayer'
import locationValidator from '../../helpers/locationValidator'
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

function useDrawingTask() {
  const store = useContext(MobXProviderContext)?.classifierStore
  const drawingTasks = store?.workflowSteps.findTasksByType('drawing')
  return !!drawingTasks?.length
}

function SingleVideoViewerContainer({
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  onKeyDown = () => true,
  subject
}) {
  const [clientWidth, setClientWidth] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState('1x')
  const [timeStamp, setTimeStamp] = useState(0)
  const [videoHeight, setVideoHeight] = useState(0)
  const [videoWidth, setVideoWidth] = useState(0)
  const [volume, setVolume] = useState(1)
  const [volumeOpen, toggleVolumeOpen] = useState(false)

  const interactionLayerSVG = useRef()
  const playerRef = useRef()
  const transformLayer = useRef()

  const { t } = useTranslation('components')

  const enableInteractionLayer = useDrawingTask()

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

  const enableDrawing = enableInteractionLayer && loadingState === asyncStates.success

  /* ==================== react-player ==================== */

  const handleVideoProgress = reactPlayerState => {
    const { played } = reactPlayerState // percentage of video played (0 to 1)
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

  const handleSpeedChange = speed => {
    setPlaybackSpeed(speed)
  }

  const handleSliderChange = e => {
    const newTimeStamp = e.target.value
    playerRef?.current?.seekTo(newTimeStamp, 'seconds')
  }

  const handleVolume = e => {
    setVolume(e.target.value)
  }

  const handleVolumeOpen = () => {
    const prevVolumeOpen = volumeOpen
    toggleVolumeOpen(!prevVolumeOpen)
  }

  const handleFullscreen = () => {
    if (fullscreen) {
      try {
        document.exitFullscreen()
        setFullscreen(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        playerRef.current?.getInternalPlayer().requestFullscreen()
        setFullscreen(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handlePlayerError = (error) => {
    onError(error)
  }

  const sanitizedSpeed = Number(playbackSpeed.slice(0, -1))

  /* Memoized so onProgress() and setTimeStamp() don't trigger each other */
  const memoizedViewer = useMemo(() => (
    <ReactPlayer
      controls={!enableDrawing}
      height='100%'
      onDuration={handleVideoDuration}
      onEnded={handleVideoEnded}
      onError={handlePlayerError}
      onReady={onReactPlayerReady}
      onProgress={handleVideoProgress}
      playing={isPlaying}
      playbackSpeed={sanitizedSpeed}
      progressInterval={100} // milliseconds
      ref={playerRef}
      width='100%'
      volume={volume}
      url={videoSrc}
      config={{
        file: { // styling the <video> element
          attributes: {
            controlsList: ['nodownload'],
            style: {
              display: 'block',
              height: '100%',
              width: '100%'
            }
          }
        }
      }}
    />
  ), [enableDrawing, isPlaying, playbackSpeed, videoSrc, volume])

  const canvas = transformLayer?.current
  const interactionLayerScale = clientWidth / videoWidth
  const svgStyle = {}
  if (enableDrawing) {
    svgStyle.touchAction = 'pinch-zoom'
  }

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
                      style={svgStyle}
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

      {/** See ADR 45 for notes on custom video controls */}
      {enableDrawing && (
        <VideoController
          duration={duration}
          enableDrawing={enableDrawing}
          isPlaying={isPlaying}
          handleFullscreen={handleFullscreen}
          handleVolumeOpen={handleVolumeOpen}
          onPlayPause={handlePlayPause}
          onSliderChange={handleSliderChange}
          onSpeedChange={handleSpeedChange}
          onVolumeChange={handleVolume}
          playbackSpeed={playbackSpeed}
          timeStamp={timeStamp}
          volume={volume}
          volumeOpen={volumeOpen}
        />
      )}
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
