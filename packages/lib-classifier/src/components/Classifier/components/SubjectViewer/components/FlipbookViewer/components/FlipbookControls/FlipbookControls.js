import { Button, Box, Grid, Select, ThemeContext } from 'grommet'
import {
  CirclePlay,
  Pause,
  FormNext,
  FormPrevious,
  FormDown
} from 'grommet-icons'
import debounce  from 'lodash/debounce'
import { arrayOf, bool, func, number } from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from '@translations/i18n'

import controlsTheme from './theme'
import locationValidator from '../../../../helpers/locationValidator/index.js'
import ViewModeButton from '../../../SeparateFramesViewer/components/ViewModeButton/ViewModeButton.js'

const SpeedSelect = styled(Select)`
  display: block;
  padding: 0 5px;
  text-align: right;
`

const DirectionButton = styled(Button)`
  border: none;
  padding: 0;
    & > div {
      flex-direction: column;
    }
`

const ThumbnailButton = styled(Button)`
  display: flex;
  ${props => css`height: ${props.thumbnailDimension};`}
  ${props => css`width: ${props.thumbnailDimension};`}
  padding: 0;
  border: none;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${props => css`background-image: url(${props.thumbnailerUrl});`}
  &[aria-selected=true] {
    border: solid 2px ${props => props.theme.global.colors['neutral-2']};
  }
`

const backgrounds = { dark: 'dark-3', light: 'neutral-6' }

const DEFAULT_HANDLER = () => true

const FlipbookControls = ({
  currentFrame = 0,
  enableSwitchView = false,
  flipbookSpeed = 1,
  locations = [],
  onFrameChange = DEFAULT_HANDLER,
  onPlayPause = DEFAULT_HANDLER,
  playing = false,
  playIterations,
  setFlipbookSpeed = DEFAULT_HANDLER
}) => {  
  const { t } = useTranslation('components')
  const timeoutRef = useRef(null)

  const [iterationCounter, setIterationCounter] = useState(0)

  /** DefaultLayout for classify page styling has breakpoints at 700px and 1160px
   * In FlipbookControls we're simply checking for when this component is < 450px
   * which happens both before and after the 700px layout breakpoint
   */
  const [smallScreenStyle, setSmallScreenStyle] = useState(false)
  const controlsContainer = useRef(null)

  useEffect(() => {
    const debouncedObserver = debounce((entries) => {
      if (entries[0].contentRect.width < 500) {
        setSmallScreenStyle(true)
      } else {
        setSmallScreenStyle(false)
      }
    }, 100)

    const containerElement = controlsContainer.current

    const resizeObserver = new window.ResizeObserver(debouncedObserver)

    resizeObserver.observe(containerElement)

    return () => {
      // Clean up: clear all current observers when the container element changes
      resizeObserver.disconnect()
    }
  }, [controlsContainer.current])

  const handleKeyDown = (event) => {
    const index = currentFrame
    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault()
        event.stopPropagation()

        if (playing) {
          onPlayPause()
        }
        handleNext()
        if (index < locations.length - 1) {
          document.getElementById(`thumbnail-${index + 1}`).focus()
        } else {
          document.getElementById(`thumbnail-${0}`).focus()
        }
        break
      }
      case 'ArrowLeft': {
        event.preventDefault()
        event.stopPropagation()

        if (playing) {
          onPlayPause()
        }
        handlePrevious()
        if (index > 0) {
          document.getElementById(`thumbnail-${index - 1}`).focus()
        } else {
          document.getElementById(`thumbnail-${locations.length - 1}`).focus()
        }
        break
      }
      default: {
        return true
      }
    }
  }

  const handlePrevious = () => {
    if (currentFrame > 0) {
      onFrameChange(currentFrame - 1)
    } else {
      onFrameChange(locations.length - 1)
    }
  }

  const handleNext = () => {
    if (currentFrame < locations.length - 1) {
      onFrameChange(currentFrame + 1)
    } else {
      onFrameChange(0)
    }
  }

  const handleThumbnailClick = (index) => {
    if (playing) {
      onPlayPause()
    }
    onFrameChange(index)
  }

  const resetTimeout = () => {
    setIterationCounter(0)
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
  }

  const handleIterationCounter = () => {
    if (playIterations !== Infinity) {
      setIterationCounter(iterationCounter + 1)
    }
  }

  useEffect(() => {
    if (playing) {
      if (iterationCounter < playIterations * locations.length) {
        timeoutRef.current = setTimeout(() => {
          handleIterationCounter()
          handleNext()
        }, 500 / flipbookSpeed)
      } else if (iterationCounter === playIterations * locations.length) {
        onPlayPause()
      }
    }

    return () => {
      resetTimeout()
    }
  }, [playing, currentFrame])

  const handlePlaybackSpeed = e => {
    setFlipbookSpeed(Number(e.value.slice(0, e.value.length - 1)))
  }

  const playPauseLabel = playing
    ? 'SubjectViewer.VideoController.pause'
    : 'SubjectViewer.VideoController.play'

  return (
    <ThemeContext.Extend value={controlsTheme}>
      <Box background={backgrounds} ref={controlsContainer}>
        <Grid
          columns={smallScreenStyle ? ['75px', 'flex', '75px'] : ['90px', 'flex', '90px']}
          pad={smallScreenStyle ? { horizontal: '10px', vertical: '5px' } : { horizontal: '20px', vertical: '10px' }}
          gap={smallScreenStyle ? 'xsmall' : 'small'}
        >
          {/** Play/Pause & Speed */}
          <Box direction='row'>
            <Button
              a11yTitle={t(playPauseLabel)}
              onClick={onPlayPause}
              icon={playing ? <Pause size={smallScreenStyle ? '20px' : 'medium'} /> : <CirclePlay size={smallScreenStyle ? '20px' : 'medium'} />}
              plain
            />
            <SpeedSelect
              a11yTitle={t('SubjectViewer.VideoController.playbackSpeed')}
              options={['0.25x', '0.5x', '1x', '2x', '4x']}
              value={`${flipbookSpeed}x`}
              onChange={handlePlaybackSpeed}
              plain
              size={smallScreenStyle ? 'small' : '16px'}
              icon={<FormDown size={smallScreenStyle ? 'small' : '16px'} />}
              focusIndicator
            />
          </Box>

          {/** Image Thumbnails */}
          <Box direction='row' justify='center' gap={smallScreenStyle ? 'xsmall' : 'small'}>
            <DirectionButton
              a11yTitle={smallScreenStyle ? t('SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel') : ''}
              icon={<FormPrevious />}
              label={smallScreenStyle ? '' : t('SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel')}
              onClick={handlePrevious}
            />
            <Box
              aria-label='Image thumbnails'
              direction='row'
              gap='5px'
              role='tablist'
              align='center'
            >
              {locations?.length &&
                locations.map((location, index) => {
                  const thumbnailerUrl = `https://thumbnails.zooniverse.org/100x100${location.url.slice(
                    7,
                    location.url.length
                  )}`
                  // fetching 100x100 because subject images have varying ratios and we want the image's height to be ~40px

                  const activeFrame = currentFrame === index
                  const tabIndex = activeFrame ? 0 : -1

                  return (
                    <ThumbnailButton
                      key={`${location.url}-${index}`}
                      id={`thumbnail-${index}`}
                      aria-controls='flipbook-tab-panel'
                      aria-label={`${t(
                        'SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText'
                      )} ${index + 1}`}
                      aria-selected={activeFrame ? 'true' : 'false'}
                      onClick={() => handleThumbnailClick(index)}
                      onKeyDown={handleKeyDown}
                      role='tab'
                      tabIndex={tabIndex}
                      thumbnailDimension={smallScreenStyle ? '30px' : '40px'}
                      thumbnailerUrl={thumbnailerUrl}
                    />
                  )
                })}
            </Box>
            <DirectionButton
              a11yTitle={smallScreenStyle ? t('SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel') : ''}
              icon={<FormNext />}
              label={smallScreenStyle ? '' : t('SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel')}
              onClick={handleNext}
            />
          </Box>
          <Box justify='center' align='center'>
            {enableSwitchView && <ViewModeButton smallScreenStyle={smallScreenStyle} />}
          </Box>
        </Grid>
      </Box>
    </ThemeContext.Extend>
  )
}

FlipbookControls.propTypes = {
  currentFrame: number,
  enableSwitchView: bool,
  flipbookSpeed: number,
  // locations: arrayOf(locationValidator).isRequired,
  onFrameChange: func,
  onPlayPause: func,
  playing: bool,
  setFlipbookSpeed: func,
}

export default FlipbookControls
