import { Button, Box, ThemeContext } from 'grommet'
import {
  DocumentText,
  FormNext,
  FormPrevious
} from 'grommet-icons'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react';
import styled, { withTheme, css } from 'styled-components'
import { useTranslation } from '@translations/i18n'

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

const TextButton = styled(Button)`
  align-items: center;
  border: solid 1px ${props => props.theme.global.colors['light-3']};
  display: flex;
  justify-content: center;
  padding: 0;
  ${props => css`height: ${props.thumbnailDimension};`}
  ${props => css`width: ${props.thumbnailDimension};`}
  &:hover {
    box-shadow: 0px 0px 0px 2px ${props => props.theme.global.colors['brand']};
  }
  &[aria-selected=true] {
    border: solid 2px ${props => props.theme.global.colors['neutral-2']};
  }
`

const backgrounds = { dark: 'dark-3', light: 'neutral-6' }

const ImageAndTextControls = ({
  currentFrame = 0,
  locations = [],
  onFrameChange = () => true
}) => {
  const { t } = useTranslation('components')
  
  /** DefaultLayout for classify page styling has breakpoints at 768px and 1160px
   * In ImageAndTextControls we're simply checking for when this component is < 450px
   * which happens both before and after the 768px layout breakpoint
   */
  const [smallScreenStyle, setSmallScreenStyle] = useState(false)
  const controlsContainer = useRef(null)
  const resizeObserver = useRef(null)

  useEffect(() => {
    resizeObserver.current = new window.ResizeObserver((entries) => {
      if (entries[0].contentRect.width < 500) {
        setSmallScreenStyle(true)
      } else {
        setSmallScreenStyle(false)
      }
    })

    if (controlsContainer.current) {
      resizeObserver.current.observe(controlsContainer.current)
    }

    return () => {
      if (controlsContainer.current) {
        resizeObserver.current.unobserve(controlsContainer.current)
      }
    }
  }, [])

  const handleKeyDown = (event) => {
    const index = currentFrame
    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault()
        event.stopPropagation()

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
    onFrameChange(index)
  }

  return (
    <ThemeContext.Extend value={controlsTheme}>
      <Box background={backgrounds} ref={controlsContainer}>
        <Box
          fill
          pad={smallScreenStyle ? { horizontal: '10px', vertical: '5px' } : { horizontal: '20px', vertical: '10px' }}
          gap={smallScreenStyle ? 'xsmall' : 'small'}
        >
          <Box direction='row' justify='center' gap={smallScreenStyle ? 'xsmall' : 'small'}>
            <DirectionButton
              a11yTitle={smallScreenStyle ? t('SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel') : ''}
              icon={<FormPrevious />}
              label={smallScreenStyle ? '' : t('SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel')}
              onClick={handlePrevious}
            />
            <Box
              aria-label='Image thumbnail and text icon'
              direction='row'
              gap='5px'
              role='tablist'
              align='center'
            >
              {locations?.length &&
                locations.map((location, index) => {
                  const [mimeType] = Object.keys(locations[index])
                  const [url] = Object.values(location)
                  
                  const activeFrame = currentFrame === index
                  const tabIndex = activeFrame ? 0 : -1

                  if (mimeType !== 'text/plain') {
                    // fetching 100x100 because subject images have varying ratios and we want the image's height to be ~40px
                    const thumbnailerUrl = `https://thumbnails.zooniverse.org/100x100${url.slice(
                      7,
                      url.length
                    )}` 
                    return (
                      <ThumbnailButton
                        key={`${url}-${index}`}
                        id={`thumbnail-${index}`}
                        aria-controls='image-and-text-tab-panel'
                        aria-label={t(
                          'SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText'
                        )}
                        aria-selected={activeFrame ? 'true' : 'false'}
                        onClick={() => handleThumbnailClick(index)}
                        onKeyDown={handleKeyDown}
                        role='tab'
                        tabIndex={tabIndex}
                        thumbnailDimension={smallScreenStyle ? '30px' : '40px'}
                        thumbnailerUrl={thumbnailerUrl}
                      />
                    )
                  } else {
                    return (
                      <TextButton
                        key={`${url}-${index}`}
                        id={`thumbnail-${index}`}
                        aria-controls='image-and-text-tab-panel'
                        aria-label={t(
                          'SubjectViewer.ImageAndTextViewer.textIconAltText'
                        )}
                        aria-selected={activeFrame ? 'true' : 'false'}
                        icon={<DocumentText />}
                        onClick={() => handleThumbnailClick(index)}
                        onKeyDown={handleKeyDown}
                        role='tab'
                        tabIndex={tabIndex}
                        thumbnailDimension={smallScreenStyle ? '30px' : '40px'}
                      />
                    )
                  }
                })}
            </Box>
            <DirectionButton
              a11yTitle={smallScreenStyle ? t('SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel') : ''}
              icon={<FormNext />}
              label={smallScreenStyle ? '' : t('SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel')}
              onClick={handleNext}
            />
          </Box>
        </Box>
      </Box>
    </ThemeContext.Extend>
  )
}

ImageAndTextControls.propTypes = {
  currentFrame: PropTypes.number,
  locations: PropTypes.arrayOf(locationValidator).isRequired,
  onFrameChange: PropTypes.func
}

export default withTheme(ImageAndTextControls)
