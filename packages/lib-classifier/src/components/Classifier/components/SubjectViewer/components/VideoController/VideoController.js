import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PlayFill, PauseFill } from 'grommet-icons'

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
`

const VideoController = ({ isPlaying, onPlayPause }) => (
  <div>
    <Button onClick={onPlayPause}>
      {isPlaying ? <PauseFill /> : <PlayFill />}
    </Button>
  </div>
)

VideoController.propTypes = {
  isPlaying: PropTypes.bool,
  onPlayPause: PropTypes.func
}
VideoController.defaultProps = {
  isPlaying: false,
  onPlayPause: () => {}
}

export default VideoController
