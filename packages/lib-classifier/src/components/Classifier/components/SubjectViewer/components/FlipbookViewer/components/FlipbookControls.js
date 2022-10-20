import { Button, Box, Grid, Select, ThemeContext } from 'grommet'
import {
  CirclePlay,
  Pause,
  FormNext,
  FormPrevious,
  FormDown
} from 'grommet-icons'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

import controlsTheme from './theme'
import locationValidator from '../../../helpers/locationValidator'

const StyledButton = styled(Button)`
  & > div {
    flex-direction: column;
  }
`

const backgrounds = { dark: 'dark-3', light: 'neutral-6' }

const FlipbookControls = ({
  currentFrame = 0,
  locations = [],
  onFrameChange = () => true,
  onPlayPause = () => true,
  playing = false,
  playIterations = '',
  theme
}) => {
  const { t } = useTranslation('components')
  const timeoutRef = useRef(null)

  const [iterationCounter, setIterationCounter] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const handleKeyDown = event => {
    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault()
        event.stopPropagation()
        handleNext()
        break
      }
      case 'ArrowLeft': {
        event.preventDefault()
        event.stopPropagation()
        handlePrevious()
        break
      }
      default: {
        return true
      }
    }
  }

  const handleFrameChange = frameIndex => {
    onFrameChange(frameIndex)
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

  const resetTimeout = () => {
    setIterationCounter(0)
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
  }

  const flip = () => {
    if (currentFrame < locations.length - 1) {
      onFrameChange(currentFrame + 1)
    } else {
      onFrameChange(0)
    }
  }

  useEffect(() => {
    if (playing && iterationCounter !== parseInt(playIterations)) {
      if (playIterations !== '') {
        setIterationCounter(iterationCounter + 1)
      }
      timeoutRef.current = setTimeout(() => {
        flip()
      }, 1000 / playbackSpeed)
    }

    return () => {
      resetTimeout()
    }
  }, [playing, currentFrame])

  const handlePlaybackSpeed = e => {
    setPlaybackSpeed(Number(e.value.slice(0, e.value.length - 1)))
  }

  const playPauseLabel = playing
    ? 'SubjectViewer.VideoController.pause'
    : 'SubjectViewer.VideoController.play'

  return (
    <ThemeContext.Extend value={controlsTheme}>
      <Box background={backgrounds}>
        <Grid columns={['140px', 'flex']} pad='10px' gap='small'>
          {/** Play/Pause & Speed */}
          <Box direction='row'>
            <Button
              a11yTitle={t(playPauseLabel)}
              onClick={onPlayPause}
              icon={playing ? <Pause /> : <CirclePlay />}
              plain
            />
            <Select
              a11yTitle={t('SubjectViewer.VideoController.playbackSpeed')}
              options={['0.25x', '0.5x', '1x', '2x', '4x']}
              value={`${playbackSpeed}x`}
              onChange={handlePlaybackSpeed}
              plain
              icon={<FormDown />}
              focusIndicator
              style={{
                textAlign: 'right'
              }}
            />
          </Box>

          {/** Image Thumbnails */}
          <Box direction='row' justify='center' gap='small'>
            <StyledButton
              disabled={currentFrame === 0 || playing}
              icon={<FormPrevious />}
              label={t(
                'SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel'
              )}
              onClick={handlePrevious}
              style={{
                border: 'none',
                padding: 0
              }}
            />
            <Box
              aria-label='Image thumbnails'
              direction='row'
              gap='5px'
              pad='5px'
              role='tablist'
            >
              {locations?.length &&
                locations.map((location, index) => {
                  const mimeType = Object.keys(location)[0]
                  const url = location[mimeType]
                  const thumbnailerUrl = `https://thumbnails.zooniverse.org/100x100${url.slice(
                    7,
                    url.length
                  )}`
                  // fetching 100x100 because subject images have varying ratios and we want the image's height to be ~40px

                  const activeFrame = currentFrame === index
                  const tabIndex = activeFrame ? 0 : -1

                  return (
                    <Button
                      key={`${url}-${index}`}
                      aria-controls='flipbook-tab-panel'
                      aria-label={`${t(
                        'SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText'
                      )} ${index + 1}`}
                      aria-selected={activeFrame ? 'true' : 'false'}
                      onClick={() => onFrameChange(index)}
                      onKeyDown={handleKeyDown}
                      role='tab'
                      tabIndex={tabIndex}
                      style={{
                        display: 'flex',
                        height: '40px',
                        width: '40px',
                        padding: '0',
                        backgroundImage: `url(${thumbnailerUrl})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: activeFrame
                          ? `solid 2px ${theme.global.colors['neutral-2']}`
                          : 'none'
                      }}
                    />
                  )
                })}
            </Box>
            <StyledButton
              disabled={currentFrame === locations.length - 1 || playing}
              icon={<FormNext />}
              label={t(
                'SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel'
              )}
              onClick={handleNext}
              style={{
                border: 'none',
                padding: 0
              }}
            />
          </Box>
        </Grid>
      </Box>
    </ThemeContext.Extend>
  )
}

FlipbookControls.propTypes = {
  currentFrame: PropTypes.number,
  locations: PropTypes.arrayOf(locationValidator).isRequired,
  onFrameChange: PropTypes.func,
  onPlayPause: PropTypes.func,
  playIterations: PropTypes.string,
  theme: PropTypes.object
}

export default withTheme(FlipbookControls)
export { FlipbookControls }
