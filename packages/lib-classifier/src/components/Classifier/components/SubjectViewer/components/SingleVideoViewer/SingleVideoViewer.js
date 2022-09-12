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
  playbackRate = 1,
  progressInterval = 100,
  onProgress = () => {},
  playerRef = () => {},
  onDuration = () => {},
  onEnded = () => {}
}) => {
  return (
    <Container>
      <ReactPlayer
        ref={playerRef}
        controls={false}
        url={url}
        playing={isPlaying}
        playbackRate={playbackRate}
        progressInterval={progressInterval}
        onProgress={onProgress}
        onDuration={onDuration}
        onEnded={onEnded}
        width='100%'
        height='100%'
      />
    </Container>
  )
}

SingleVideoViewer.propTypes = {
  playerRef: PropTypes.func,
  url: PropTypes.string,
  isPlaying: PropTypes.bool,
  playbackRate: PropTypes.number,
  progressInterval: PropTypes.number,
  onProgress: PropTypes.func,
  onDuration: PropTypes.func,
  onEnded: PropTypes.func
}

export default SingleVideoViewer
