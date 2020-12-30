import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const Container = styled.div`
  animation: fadein 1s 0s forwards;
  position: relative;
  padding-top: 56.25%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

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
  url,
  isPlaying,
  playbackRate,
  progressInterval,
  onProgress,
  playerRef,
  onDuration
}) => {
  return (
    <Container>
      <ReactPlayer
        className='react-player'
        ref={playerRef}
        controls={true}
        url={url}
        playing={isPlaying}
        playbackRate={playbackRate}
        progressInterval={progressInterval}
        onProgress={onProgress}
        onDuration={onDuration}
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
  onDuration: PropTypes.func
}

SingleVideoViewer.defaultProps = {
  playerRef: () => {},
  url: '',
  isPlaying: false,
  playbackRate: 1,
  progressInterval: 100,
  onProgress: () => {},
  onDuration: () => {}
}

export default SingleVideoViewer
