import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'
import { Box, Text } from 'grommet'
import { useState, useRef } from 'react'
import { useTranslation } from '@translations/i18n'
import asyncStates from '@zooniverse/async-states'
import ReactPlayer from 'react-player'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import InteractionLayer from '../../../InteractionLayer'
import locationValidator from '../../../../helpers/locationValidator'
import VideoController from '../VideoController'

const SubjectContainer = styled.div`
  position: relative;
  filter: invert(${props => props.$invert ? 1 : 0});
`

const DrawingLayer = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  cursor: default;
`

const DEFAULT_HANDLER = () => true

function VideoWithDrawing({
  invert = false,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  setVideoSpeed = DEFAULT_HANDLER,
  setVolume = DEFAULT_HANDLER,
  subject,
  videoSpeed = '1x',
  volume = 1
}) {
  const [duration, setDuration] = useState(0)
  const [fullscreenError, setFullscreenError] = useState(false) /* No support for iPhones: https://caniuse.com/fullscreen */
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [played, setPlayed] = useState(0)
  const [volumeDisabled, setVolumeDisabled] = useState(true)

  // For drawing tools
  const [clientWidth, setClientWidth] = useState(0)
  const [videoHeight, setVideoHeight] = useState(0)
  const [videoWidth, setVideoWidth] = useState(0)

  const playerRef = useRef()

  // For drawing tools
  const interactionLayerSVG = useRef()
  const transformLayer = useRef()

  const { t } = useTranslation('components')

  /* ==================== load subject ==================== */

  const videoLocation = subject
    ? subject.locations.find(l => l.type === 'video')
    : null
  const enableDrawing = loadingState === asyncStates.success

  /* Audio track detection does not work in Firefox, so we must enable the volume button by default */
  /* Therefore, volume button is enabled in Firefox even if no audio track, see Storybook examples for SingleVIdeoViewer */
  const detectAudioTrack = () => {
    const internalVideo = playerRef.current.getInternalPlayer()
    if (
      typeof internalVideo.webkitAudioDecodedByteCount !== 'undefined' &&
      internalVideo.webkitAudioDecodedByteCount > 0
    ) {
      setVolumeDisabled(false)
    } else if (internalVideo.audioTracks && internalVideo.audioTracks.length) {
      setVolumeDisabled(false)
    } else if (typeof internalVideo.mozHasAudio !== 'undefined') {
      setVolumeDisabled(false)
    }
  }

  const onReactPlayerReady = () => {
    try {
      const reactPlayerVideoHeight =
        playerRef.current?.getInternalPlayer().videoHeight
      const reactPlayerVideoWidth =
        playerRef.current?.getInternalPlayer().videoWidth

      const reactPlayerClientHeight = playerRef.current
        ?.getInternalPlayer()
        .getBoundingClientRect().height
      const reactPlayerClientWidth = playerRef.current
        ?.getInternalPlayer()
        .getBoundingClientRect().width

      const target = {
        clientHeight: reactPlayerClientHeight,
        clientWidth: reactPlayerClientWidth,
        naturalHeight: reactPlayerVideoHeight,
        naturalWidth: reactPlayerVideoWidth
      }
      onReady({ target })
      detectAudioTrack()

      // For drawing tools
      setVideoHeight(reactPlayerVideoHeight)
      setVideoWidth(reactPlayerVideoWidth)
      setClientWidth(reactPlayerClientWidth)
    } catch (error) {
      onError(error)
    }
  }

  /* ==================== react-player ==================== */
  /* See also: https://github.com/cookpete/react-player/blob/master/examples/react/src/App.js */

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSetPlaybackSpeed = speed => {
    setVideoSpeed(speed)
  }

  const handleSeekMouseDown = e => {
    setIsSeeking(true)
  }

  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value))
    playerRef?.current?.seekTo(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = e => {
    setIsSeeking(false)
  }

  const handleVideoProgress = reactPlayerState => {
    const { played } = reactPlayerState // percentage of video played (0 to 1)

    if (!isSeeking) {
      setPlayed(played) // played is value passed to Slider
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  const handleVideoDuration = duration => {
    setDuration(duration)
  }

  /* NOTE: No fullscreen support for iPhones: https://caniuse.com/fullscreen */
  const handleFullscreen = () => {
    try {
      playerRef.current?.getInternalPlayer().requestFullscreen()
    } catch (error) {
      setFullscreenError(true)
    }
  }

  const handlePlayerError = error => {
    onError(error)
  }

  const sanitizedSpeed = Number(videoSpeed.slice(0, -1))

  // For drawing tools
  const canvas = transformLayer?.current
  const interactionLayerScale = clientWidth / videoWidth
  const svgStyle = {}
  svgStyle.touchAction = 'pinch-zoom'

  return (
    <>
      {videoLocation ? (
        <SubjectContainer $invert={invert}>
          <ReactPlayer
            controls={false}
            height='100%'
            onDuration={handleVideoDuration}
            onEnded={handleVideoEnded}
            onError={handlePlayerError}
            onReady={onReactPlayerReady}
            onProgress={handleVideoProgress}
            playing={isPlaying}
            playbackRate={sanitizedSpeed}
            playsinline
            progressInterval={10} // milliseconds
            ref={playerRef}
            width='100%'
            volume={volume}
            url={videoLocation?.url}
            config={{
              file: {
                // styling the <video> element
                attributes: {
                  style: {
                    display: 'block',
                    height: '100%',
                    width: '100%'
                  }
                }
              }
            }}
          />
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
                        played={played}
                        width={videoWidth}
                      />
                    </g>
                  </svg>
                </SVGContext.Provider>
              </Box>
            </DrawingLayer>
          )}
        </SubjectContainer>
      ) : (
        <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
      )}

      {/** See ADR 45 for notes on custom video controls */}
      <VideoController
        duration={duration}
        enableDrawing={enableDrawing}
        isPlaying={isPlaying}
        handleFullscreen={handleFullscreen}
        handleSeekChange={handleSeekChange}
        handleSeekMouseDown={handleSeekMouseDown}
        handleSeekMouseUp={handleSeekMouseUp}
        onPlayPause={handlePlayPause}
        onSpeedChange={handleSetPlaybackSpeed}
        played={played}
        playbackSpeed={videoSpeed}
        playerRef={playerRef}
        setVolume={setVolume}
        volume={volume}
        volumeDisabled={volumeDisabled}
      />
      {fullscreenError && <Text>Fullscreen not supported in some mobile browsers</Text>}
    </>
  )
}

VideoWithDrawing.propTypes = {
  invert: bool,
  loadingState: string,
  onError: func,
  onKeyDown: func,
  onReady: func,
  setVideoSpeed: func,
  setVolume: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  }),
  videoSpeed: string,
  volume: number
}

export default VideoWithDrawing
