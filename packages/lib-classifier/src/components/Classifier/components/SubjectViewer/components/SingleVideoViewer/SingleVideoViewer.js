import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const Container = styled.div`
  animation: fadein 1s 0s forwards;

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 100%;
    }
  }
`

const SingleVideoViewer = ({
  url = '',
  isPlaying = false,
  onDuration = () => true,
  onEnded = () => true,
  onError = () => true,
  onProgress = () => true,
  onReactPlayerReady = () => true,
  playbackRate = 1,
  playerRef = null
}) => {
  return (
    <Container>
      <ReactPlayer
        controls={false}
        height='100%'
        onDuration={onDuration}
        onEnded={onEnded}
        onError={onError}
        onReady={onReactPlayerReady}
        onProgress={onProgress}
        playing={isPlaying}
        playbackRate={playbackRate}
        progressInterval={100} // milliseconds
        ref={playerRef}
        width='100%'
        url={url}
      />
    </Container>
  )
}

SingleVideoViewer.propTypes = {
  playerRef: PropTypes.object,
  url: PropTypes.string,
  isPlaying: PropTypes.bool,
  playbackRate: PropTypes.number,
  onProgress: PropTypes.func,
  onDuration: PropTypes.func,
  onEnded: PropTypes.func
}

export default SingleVideoViewer
