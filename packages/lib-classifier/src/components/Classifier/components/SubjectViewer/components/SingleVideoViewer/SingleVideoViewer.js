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

const SingleVideoViewer = ({ url, isPlaying, playerRef }) => {
  console.log('isPlaying ', isPlaying)
  return (
    <Container>
      <ReactPlayer
        className='react-player'
        ref={playerRef}
        controls={true}
        url={url}
        playing={isPlaying}
        width='100%'
        height='100%'
      />
    </Container>
  )
}

SingleVideoViewer.propTypes = {
  playerRef: PropTypes.func,
  url: PropTypes.string,
  isPlaying: PropTypes.bool
}

SingleVideoViewer.defaultProps = {
  playerRef: () => {},
  url: '',
  isPlaying: false
}

export default SingleVideoViewer
