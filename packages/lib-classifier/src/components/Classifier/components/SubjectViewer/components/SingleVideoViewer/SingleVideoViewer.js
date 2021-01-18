import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const Container = styled.div`
  animation: fadein 1s 0s forwards;
  height: 100%;
  overflow: hidden;
  width: 100%;

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
    <ReactPlayer controls={true} url={url} />
  </Container>
)

SingleVideoViewer.propTypes = {
  url: PropTypes.string
}

SingleVideoViewer.defaultProps = {
  url: ''
}

export default SingleVideoViewer
