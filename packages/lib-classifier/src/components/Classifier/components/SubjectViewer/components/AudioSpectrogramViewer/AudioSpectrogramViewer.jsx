import { arrayOf, func, shape } from 'prop-types'
import { Box } from 'grommet'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

import locationValidator from '../../helpers/locationValidator'

const SpectrogramContainer = styled(Box)`
  position: relative;
  overflow: hidden;
`

const ProgressMarker = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(66, 133, 244, 0.9);
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
  pointer-events: none;
  transition: left 0.1s linear;
  z-index: 1;
`

const DEFAULT_HANDLER = () => {}

function AudioSpectrogramViewer({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const { t } = useTranslation('components')
  const audioRef = useRef(null)
  const [played, setPlayed] = useState(0)

  const audioLocation = subject ? subject.locations.find(l => l.type === 'audio') : null
  const imageLocation = subject ? subject.locations.find(l => l.type === 'image') : null

  if (!audioLocation || !imageLocation) {
    return <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
  }

  const handleImageLoad = (e) => {
    const { naturalHeight, naturalWidth, clientHeight, clientWidth } = e.target
    onReady({ target: { clientHeight, clientWidth, naturalHeight, naturalWidth } })
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration
      if (isFinite(duration) && duration > 0) {
        setPlayed(audioRef.current.currentTime / duration)
      }
    }
  }

  const handleEnded = () => {
    setPlayed(0)
  }

  const handleError = (e) => {
    onError(e)
  }

  return (
    <Box width='100%'>
      {/* Spectrogram image with progress marker overlay */}
      <SpectrogramContainer>
        <img
          alt='Spectrogram'
          onLoad={handleImageLoad}
          src={imageLocation.url}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
        <ProgressMarker
          data-testid='spectrogram-progress-marker'
          style={{ left: `${played * 100}%` }}
        />
      </SpectrogramContainer>

      {/* Native audio controls */}
      <audio
        ref={audioRef}
        controls
        controlsList='nodownload'
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        preload='auto'
        src={audioLocation.url}
        style={{ width: '100%' }}
      />
    </Box>
  )
}

AudioSpectrogramViewer.propTypes = {
  onError: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default AudioSpectrogramViewer
