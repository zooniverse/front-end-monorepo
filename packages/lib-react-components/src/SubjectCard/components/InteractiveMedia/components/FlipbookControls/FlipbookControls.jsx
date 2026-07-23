import { Box, Button } from 'grommet'
import { Pause as PauseIcon, Play as PlayIcon } from 'grommet-icons'
import { arrayOf, bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

const THUMBNAIL_SIZE = 30

const Toolbar = styled(Box)`
  height: 45px;
`

const FrameList = styled(Box)`
  overflow-x: auto;
  scrollbar-width: thin;
`

const FrameButton = styled(Button)`
  border: none;
  border-radius: 2px;
  height: ${THUMBNAIL_SIZE}px;
  min-width: ${THUMBNAIL_SIZE}px;
  padding: 0;
  width: ${THUMBNAIL_SIZE}px;

  ${props => props.$selected ? `
    border: 1.5px solid ${props.theme.global.colors.brand};
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

  return (
    <Toolbar
      align='center'
      background={{ dark: 'dark-3', light: 'white' }}
      direction='row'
      gap='xsmall'
      pad={{ horizontal: '5px' }}
    >
      <Button
        a11yTitle={playing ? 'Pause flipbook' : 'Play flipbook'}
        icon={playing ? <PauseIcon size='16px' /> : <PlayIcon size='16px' />}
        onClick={handlePlayPause}
        plain
      />

      <FrameList
        aria-label='Flipbook frames'
        align='center'
        direction='row'
        gap='10px'
        role='tablist'
      >
        {imageSources.map((source, index) => {
          const selected = index === currentFrame

          return (
            <FrameButton
              key={`${source}-${index}`}
              $selected={selected}
              a11yTitle={`View frame ${index + 1}`}
              aria-label={`View frame ${index + 1}`}
              aria-selected={selected}
              onClick={event => handleFrameClick(event, index)}
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
