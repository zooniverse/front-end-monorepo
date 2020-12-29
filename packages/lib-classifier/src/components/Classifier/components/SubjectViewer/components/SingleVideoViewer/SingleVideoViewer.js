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

const SingleVideoViewer = ({ url }) => (
  <Container>
    <ReactPlayer
      className='react-player'
      controls={true}
      url={url}
      width='100%'
      height='100%'
    />
  </Container>
)

SingleVideoViewer.propTypes = {
  url: PropTypes.string
}

SingleVideoViewer.defaultProps = {
  url: ''
}

export default SingleVideoViewer
