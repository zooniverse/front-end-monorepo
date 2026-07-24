import { Box, Button } from 'grommet'
import { Pause as PauseIcon, Play as PlayIcon } from 'grommet-icons'
import { arrayOf, bool, func, number, string } from 'prop-types'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import IconActionButton from '../../../../../IconActionButton'
import { useTranslation } from '../../../../../translations/i18n'

const THUMBNAIL_SIZE = 30

const Toolbar = styled(Box)`
  height: 45px;
`

const FrameList = styled(Box)`
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
`

const FrameButton = styled(Button)`
  border: 1.5px solid transparent;
  box-sizing: border-box;
  border-radius: 2px;
  flex: 0 0 auto;
  height: ${THUMBNAIL_SIZE}px;
  min-width: ${THUMBNAIL_SIZE}px;
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
  border-radius: 2px;
  height: ${THUMBNAIL_SIZE}px;
  width: ${THUMBNAIL_SIZE}px;
`

function getThumbnailUrl(imageUrl) {
  if (typeof imageUrl !== 'string' || imageUrl.length === 0) {
    return imageUrl
  }

  if (imageUrl.startsWith('https://') || imageUrl.startsWith('http://')) {
    const sourcePath = imageUrl.replace(/^https?:\/\//, '')
    return `https://thumbnails.zooniverse.org/100x100/${sourcePath}`
  }

  return imageUrl
}

function FlipbookControls({
  currentFrame,
  imageSources,
  onFrameChange,
  onPlayPause,
  playing
}) {
  const { t } = useTranslation()
  const selectedButtonRef = useRef(null)

  // Scroll the selected frame button into view when it changes
  useEffect(() => {
    selectedButtonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
    selectedButtonRef.current?.focus()
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
      case 'Home':
        event.preventDefault()
        newFrameIndex = 0
        break
      case 'End':
        event.preventDefault()
        newFrameIndex = imageSources.length - 1
        break
      default:
        return
    }

    onFrameChange(newFrameIndex)
  }

  return (
    <Toolbar
      align='center'
      background={{ dark: 'dark-3', light: 'white' }}
      direction='row'
      gap='xxsmall'
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
              <FrameThumbnail $thumbnailUrl={getThumbnailUrl(source)} />
            </FrameButton>
          )
        })}
      </FrameList>
    </Toolbar>
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
