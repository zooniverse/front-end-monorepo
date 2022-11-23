import { Button, Box, Grid, Select, ThemeContext } from 'grommet'
import {
  CirclePlay,
  Pause,
  FormNext,
  FormPrevious,
  FormDown
} from 'grommet-icons'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import styled, { withTheme, css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { useStores } from '@hooks'

import controlsTheme from './theme'
import locationValidator from '../../../helpers/locationValidator'

const DirectionButton = styled(Button)`
  border: none;
  padding: 0;
    & > div {
      flex-direction: column;
    }
`

const ThumbnailButton = styled(Button)`
  display: flex;
  height: 40px;
  width: 40px;
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

function storeMapper(store) {
  const {
    flipbookSpeed,
    setFlipbookSpeed
  } = store.subjectViewer

  return {
    flipbookSpeed,
    setFlipbookSpeed
  }
}

const FlipbookControls = ({
  currentFrame = 0,
  locations = [],
  onFrameChange = () => true,
  onPlayPause = () => true,
  playing = false
}) => {
  const { flipbookSpeed, setFlipbookSpeed } = useStores(storeMapper)
  const { t } = useTranslation('components')
  const timeoutRef = useRef(null)

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
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
  }

  useEffect(() => {
    if (playing) {
      timeoutRef.current = setTimeout(() => {
        handleNext()
      }, 500 / flipbookSpeed)
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
      <Box background={backgrounds}>
        <Grid
          columns={['120px', 'flex']}
          pad={{ horizontal: '20px', vertical: '10px' }}
          gap='small'
        >
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
              value={`${flipbookSpeed}x`}
              onChange={handlePlaybackSpeed}
              plain
              icon={<FormDown />}
              focusIndicator
              width='70px'
              style={{
                textAlign: 'right'
              }}
            />
          </Box>

          {/** Image Thumbnails */}
          <Box direction='row' justify='center' gap='small'>
            <DirectionButton
              disabled={currentFrame === 0 || playing}
              icon={<FormPrevious />}
              label={t(
                'SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel'
              )}
              onClick={handlePrevious}
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
                  const [url] = Object.values(location)
                  const thumbnailerUrl = `https://thumbnails.zooniverse.org/100x100${url.slice(
                    7,
                    url.length
                  )}`
                  // fetching 100x100 because subject images have varying ratios and we want the image's height to be ~40px

                  const activeFrame = currentFrame === index
                  const tabIndex = activeFrame ? 0 : -1

                  return (
                    <ThumbnailButton
                      key={`${url}-${index}`}
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
                      thumbnailerUrl={thumbnailerUrl}
                    />
                  )
                })}
            </Box>
            <DirectionButton
              disabled={currentFrame === locations.length - 1 || playing}
              icon={<FormNext />}
              label={t(
                'SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel'
              )}
              onClick={handleNext}
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
  playing: PropTypes.bool
}

export default withTheme(observer(FlipbookControls))
