import { Box, Button } from 'grommet'
import {
  Image as ImageIcon,
  Pause as PauseIcon,
  Play as PlayIcon
} from 'grommet-icons'
import { arrayOf, bool, func, number, string } from 'prop-types'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import IconActionButton from '../../../../../IconActionButton'
import getSubjectThumbnailSrc from '../../../../helpers/getSubjectThumbnailSrc'
import { useTranslation } from '../../../../../translations/i18n'

const THUMBNAIL_SIZE = 30

const FrameList = styled(Box)`
  box-sizing: border-box;
  min-height: 40px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 5px;
  scrollbar-width: thin;
`

const FrameButton = styled(Button)`
  border: 1.5px solid transparent;
  box-sizing: border-box;
  border-radius: 2px;
  flex: 0 0 auto;
  height: ${THUMBNAIL_SIZE}px;
  min-width: ${THUMBNAIL_SIZE}px;
  overflow: hidden;
  padding: 0;
  width: ${THUMBNAIL_SIZE}px;

  ${props => props.$selected ? `
    border-color: ${props.theme.global.colors.brand};
    box-shadow: 0 0 4px ${props.theme.global.colors['accent-1']};
  ` : ''}
`

const FrameThumbnail = styled(Box)`
  background-image: ${props => `url(${props.$thumbnailUrl})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: inherit;
  height: 100%;
  width: 100%;
`

const FrameThumbnailIcon = styled(Box)`
  align-items: center;
  background: ${props => {
    return props.theme.dark
      ? props.theme.global.colors['dark-4']
      : props.theme.global.colors.white
  }};
  border: 1.5px solid ${props => {
    if (props.$selected) {
      return props.theme.dark
        ? props.theme.global.colors['accent-1']
        : props.theme.global.colors['neutral-1']
    }
    return props.theme.global.colors['light-5']
  }};
  border-radius: inherit;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;

  > svg {
    stroke: ${props => {
      if (props.$selected) {
        return props.theme.dark
          ? props.theme.global.colors['accent-1']
          : props.theme.global.colors['neutral-1']
      }
      return props.theme.dark
        ? props.theme.global.colors.white
        : props.theme.global.colors['dark-3']
    }};
  }
`

function FlipbookControls({
  currentFrame,
  imageSources,
  onFrameChange,
  onPlayPause,
  playing
}) {
  const { t } = useTranslation()
  const selectedButtonRef = useRef(null)

  // Scroll the selected frame button into view when it changes without stealing focus
  useEffect(() => {
    selectedButtonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }, [currentFrame])

  function handlePlayPause(event) {
    event.preventDefault()
    event.stopPropagation()
    onPlayPause()
  }

  function handleFrameClick(event, frameIndex) {
    event.preventDefault()
    event.stopPropagation()
    onFrameChange(frameIndex)
  }

  function handleKeyDown(event, frameIndex) {
    const { key } = event
    let newFrameIndex = frameIndex

    switch (key) {
      case 'ArrowLeft':
        event.preventDefault()
        newFrameIndex = frameIndex > 0 ? frameIndex - 1 : imageSources.length - 1
        break
      case 'ArrowRight':
        event.preventDefault()
        newFrameIndex = frameIndex < imageSources.length - 1 ? frameIndex + 1 : 0
        break
      default:
        return
    }

    onFrameChange(newFrameIndex)
  }

  return (
    <Box
      data-testid='flipbook-controls'
      align='center'
      background={{ dark: 'dark-3', light: 'white' }}
      direction='row'
      gap='xxsmall'
      height='45px'
      pad={{ horizontal: '5px' }}
    >
      <IconActionButton
        a11yTitle={playing
          ? t('SubjectCard.FlipbookControls.pause')
          : t('SubjectCard.FlipbookControls.play')}
        active={playing}
        icon={playing ? <PauseIcon size='16px' /> : <PlayIcon size='16px' />}
        onClick={handlePlayPause}
      />

      <FrameList
        aria-label={t('SubjectCard.FlipbookControls.frames')}
        align='center'
        direction='row'
        gap='10px'
        role='tablist'
      >
        {imageSources.map((source, index) => {
          const selected = index === currentFrame
          const thumbnailUrl = getSubjectThumbnailSrc({ src: source })

          return (
            <FrameButton
              ref={selected ? selectedButtonRef : null}
              key={`${source}-${index}`}
              $selected={selected}
              a11yTitle={t('SubjectCard.FlipbookControls.viewFrame', { frame: index + 1 })}
              aria-label={t('SubjectCard.FlipbookControls.viewFrame', { frame: index + 1 })}
              aria-selected={selected}
              onClick={event => handleFrameClick(event, index)}
              onKeyDown={event => handleKeyDown(event, index)}
              role='tab'
              tabIndex={selected ? 0 : -1}
            >
              {thumbnailUrl ? (
                <FrameThumbnail
                  data-testid='frame-thumbnail-image'
                  $thumbnailUrl={thumbnailUrl}
                />
              ) : (
                <FrameThumbnailIcon $selected={selected} data-testid='frame-thumbnail-icon'>
                  <ImageIcon size='16px' />
                </FrameThumbnailIcon>
              )}
            </FrameButton>
          )
        })}
      </FrameList>
    </Box>
  )
}

FlipbookControls.propTypes = {
  currentFrame: number.isRequired,
  imageSources: arrayOf(string).isRequired,
  onFrameChange: func.isRequired,
  onPlayPause: func.isRequired,
  playing: bool.isRequired
}

export default FlipbookControls
