import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import { useMemo, useRef } from 'react';
import { useTranslation } from '@translations/i18n'
import ReactPlayer from 'react-player'

import locationValidator from '../../../../helpers/locationValidator'

const SubjectContainer = styled.div`
  position: relative;
`

function VideoViewer({
  onError = () => true,
  onReady = () => true,
  subject
}) {
  const { t } = useTranslation('components')
  const playerRef = useRef(null)

  const videoLocation = subject ? subject.locations.find(l => l.type === 'video') : null

  const onReactPlayerReady = () => {
    try {
      const reactPlayerVideoHeight = playerRef.current?.getInternalPlayer().videoHeight
      const reactPlayerVideoWidth = playerRef.current?.getInternalPlayer().videoWidth

      const reactPlayerClientHeight = playerRef.current?.getInternalPlayer().getBoundingClientRect().height
      const reactPlayerClientWidth = playerRef.current?.getInternalPlayer().getBoundingClientRect().width

      const target = {
        clientHeight: reactPlayerClientHeight,
        clientWidth: reactPlayerClientWidth,
        naturalHeight: reactPlayerVideoHeight,
        naturalWidth: reactPlayerVideoWidth
      }

      onReady({ target })
    } catch (error) {
      onError(error)
    }
  }

  const handlePlayerError = (error) => {
    onError(error)
  }

  const memoizedViewer = useMemo(() => (
    <ReactPlayer
      controls
      height='100%'
      onError={handlePlayerError}
      onReady={onReactPlayerReady}
      ref={playerRef}
      width='100%'
      url={videoLocation?.url}
      config={{
        file: { // styling the <video> element
          attributes: {
            controlsList: ['nodownload'],
            style: {
              display: 'block',
              height: '100%',
              width: '100%'
            }
          }
        }
      }}
    />
  ), [videoLocation])

  return (
    <>
      {videoLocation
        ? (
          <SubjectContainer>
            {memoizedViewer}
          </SubjectContainer>
          )
        : (
          <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
        )}
    </>
  )
}

VideoViewer.propTypes = {
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default VideoViewer
