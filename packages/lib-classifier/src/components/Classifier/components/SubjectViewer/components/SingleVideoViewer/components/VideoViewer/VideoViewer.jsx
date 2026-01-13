import { arrayOf, bool, func, shape } from 'prop-types'
import styled, { css } from 'styled-components'
import { Box } from 'grommet'
import { useMemo, useRef } from 'react'
import { useTranslation } from '@translations/i18n'
import ReactPlayer from 'react-player'

import locationValidator from '../../../../helpers/locationValidator'

const SubjectContainer = styled.div`
  position: relative;

  video {
    filter: invert(${props => (props.$invert ? 1 : 0)});

    ${props =>
      props.$limitSubjectHeight &&
      css`
        display: flex;
        width: auto;
        max-height: 90vh;
        max-width: 100%;
        margin-left: auto;
      `}
  }
`

function VideoViewer({
  invert = false,
  limitSubjectHeight = false,
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
              width: limitSubjectHeight ? 'auto' : '100%'
            }
          }
        }
      }}
    />
  ), [videoLocation])

  return (
    <>
      {videoLocation ? (
        <SubjectContainer
          $invert={invert}
          $limitSubjectHeight={limitSubjectHeight}
        >
          {memoizedViewer}
        </SubjectContainer>
      ) : (
        <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
      )}
    </>
  )
}

VideoViewer.propTypes = {
  invert: bool,
  limitSubjectHeight: bool,
  onError: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default VideoViewer
