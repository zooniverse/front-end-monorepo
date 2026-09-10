import { arrayOf, bool, func, shape } from 'prop-types'
import { Box } from 'grommet'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import asyncStates from '@zooniverse/async-states'
import { useTranslation } from '@translations/i18n'

import locationValidator from '../../helpers/locationValidator'
import InteractionLayer from '../InteractionLayer'

const SpectrogramContainer = styled.div`
  position: relative;
  overflow: hidden;
`

const SubjectImage = styled.img`
  display: block;
  width: 100%;
  filter: invert(${props => (props.$invert ? 1 : 0)});
`

const ProgressMarker = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(66, 133, 244, 0.9);
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
  pointer-events: none;
  z-index: 1;
`

const InteractionLayerContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const DEFAULT_HANDLER = () => {}

function AudioSpectrogramViewer({
  enableInteractionLayer = true,
  invert = false,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const { t } = useTranslation('components')
  const audioRef = useRef(null)
  const rafRef = useRef(null)
  const [played, setPlayed] = useState(0)

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const audioLocation = subject ? subject.locations.find(l => l.type === 'audio') : null
  const imageLocation = subject ? subject.locations.find(l => l.type === 'image') : null

  if (!audioLocation || !imageLocation) {
    return <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
  }

  function handleImageLoad(e) {
    const { naturalHeight, naturalWidth, clientHeight, clientWidth } = e.target
    onReady({ target: { clientHeight, clientWidth, naturalHeight, naturalWidth } })
  }

  function syncMarker() {
    const audio = audioRef.current
    if (audio?.duration > 0) setPlayed(audio.currentTime / audio.duration)
  }

  function tick() {
    syncMarker()
    rafRef.current = audioRef.current?.paused ? null : requestAnimationFrame(tick)
  }

  function handlePlay() {
    cancelAnimationFrame(rafRef.current)
    syncMarker()
    rafRef.current = requestAnimationFrame(tick)
  }

  function handleStop() {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    syncMarker()
  }

  return (
    <Box width='100%'>
      <SpectrogramContainer>
        <SubjectImage
          alt={`Subject ${subject.id}`}
          src={imageLocation.url}
          onLoad={handleImageLoad}
          $invert={invert}
        />
        <ProgressMarker
          data-testid='spectrogram-progress-marker'
          style={{ left: `${played * 100}%` }}
        />
        {enableInteractionLayer && (
          <InteractionLayerContainer>
            <svg height='100%'>
              {/* InteractionLayer is just a <rect/> so has to be a child of <svg /> */}
              <InteractionLayer height='100%' width='100%' />
            </svg>
          </InteractionLayerContainer>
        )}
      </SpectrogramContainer>
      <audio
        ref={audioRef}
        controls
        controlsList='nodownload'
        onPlay={handlePlay}
        onPause={handleStop}
        onEnded={handleStop}
        onSeeked={syncMarker}
        onError={onError}
        preload='auto'
        src={audioLocation.url}
        style={{ width: '100%' }}
      />
    </Box>
  )
}

AudioSpectrogramViewer.propTypes = {
  enableInteractionLayer: bool,
  invert: bool,
  onError: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default AudioSpectrogramViewer
