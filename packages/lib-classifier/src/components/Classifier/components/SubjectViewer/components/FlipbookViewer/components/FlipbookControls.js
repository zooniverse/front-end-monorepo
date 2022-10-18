import { Button, Box, Grid } from 'grommet'
import { CirclePlay, Pause, FormNext, FormPrevious } from 'grommet-icons'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

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
  playIterations = '',
  theme
}) => {
  const { t } = useTranslation('components')

  const handleKeyDown = (event) => {
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

  const timeoutRef = useRef(null)

  const [playing, setPlaying] = useState(false)
  const [iterationCounter, setIterationCounter] = useState(0)

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

  const onPlayPause = () => {
    if (!playing) {
      setPlaying(true)
    } else {
      resetTimeout()
      setPlaying(false)
    }
  }

  useEffect(() => {
    if (playing) {
      timeoutRef.current = setTimeout(() => {
        flip()
      }, 1000)
    }

    return () => {
      resetTimeout()
    }
  }, [playing, currentFrame])

  const playPauseLabel = playing
    ? 'SubjectViewer.VideoController.pause'
    : 'SubjectViewer.VideoController.play'

  return (
    <Box background={backgrounds}>
      <Grid columns={['120px', 'flex']} pad='10px'>
        {/** Play/Pause & Speed go here */}
        <Button
          a11yTitle={t(playPauseLabel)}
          onClick={onPlayPause}
          icon={playing ? <Pause /> : <CirclePlay />}
          plain
        />

        {/** Image Thumbnails */}
        <Box direction='row' justify='between'>
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
                const thumbnailerUrl = `https://thumbnails.zooniverse.org/100x100${url.slice(7, url.length)}`
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
                    onClick={() => handleFrameChange(index)}
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
  )
}

FlipbookControls.propTypes = {
  currentFrame: PropTypes.number.isRequired,
  locations: PropTypes.arrayOf(locationValidator).isRequired,
  onFrameChange: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default withTheme(FlipbookControls)
export { FlipbookControls }
