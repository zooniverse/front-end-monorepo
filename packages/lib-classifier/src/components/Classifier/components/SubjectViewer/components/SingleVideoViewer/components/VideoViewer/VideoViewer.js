import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import { useEffect, useMemo, useState, useRef } from 'react';
import { useTranslation } from '@translations/i18n'
import ReactPlayer from 'react-player'

import locationValidator from '../../../../helpers/locationValidator'

const StyledVideo = styled.video`
  width: 100%;
`

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

  const [volume, setVolume] = useState(1)

  const videoLocation = subject ? subject.locations.find(l => l.type === 'video') : null

  const onReactPlayerReady = () => {
    try {
      // const reactPlayerVideoHeight = playerRef.current?.getInternalPlayer().videoHeight
      // const reactPlayerVideoWidth = playerRef.current?.getInternalPlayer().videoWidth

      // const reactPlayerClientHeight = playerRef.current?.getInternalPlayer().getBoundingClientRect().height
      // const reactPlayerClientWidth = playerRef.current?.getInternalPlayer().getBoundingClientRect().width

      // const target = {
      //   clientHeight: reactPlayerClientHeight,
      //   clientWidth: reactPlayerClientWidth,
      //   naturalHeight: reactPlayerVideoHeight,
      //   naturalWidth: reactPlayerVideoWidth
      // }

      const mockTarget = {
        clientHeight: 0,
        clientWidth: 0,
        naturalHeight: 0,
        naturalWidth: 0
      }
      onReady({ mockTarget })
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
      progressInterval={100} // milliseconds
      ref={playerRef}
      width='100%'
      volume={volume}
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

  useEffect(() => {
    if (playerRef && playerRef.current) {
      playerRef.current.addEventListener('canplay', (event) => {
        console.log('CAN PLAY')
        onReactPlayerReady()
      })
      playerRef.current.addEventListener('volumechange', (event) => {
        // Save muted as true/false in the Subject Viewer store so it persists across subjects
        console.log('VOLUME', event)
      })
    }
      return () => {
        playerRef.current.removeEventListener('canplay', null)
        playerRef.current.removeEventListener('volumechange', null)

      }
  }, [playerRef])

  return (
    <>
      {videoLocation
        ? (
          <SubjectContainer>
            {/* {memoizedViewer} */}
            <StyledVideo ref={playerRef} controls controlsList='nodownload' disablePictureInPicture playsInline src={videoLocation?.url} ref={playerRef} />
          </SubjectContainer>
          )
        : (
          <Box>{t('SubjectViewer.SingleVideoViewerContainer.error')}</Box>
        )}
    </>
  )
}

VideoViewer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onKeyDown: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default VideoViewer
