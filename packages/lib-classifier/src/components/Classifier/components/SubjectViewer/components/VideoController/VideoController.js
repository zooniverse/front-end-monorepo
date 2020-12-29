import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChapterPrevious, PlayFill, PauseFill } from 'grommet-icons'

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
`

const VideoController = ({ onRewind, isPlaying, onPlayPause }) => (
  <div>
    <Button onClick={onRewind}>
      <ChapterPrevious />
    </Button>
    <Button onClick={onPlayPause}>
      {isPlaying ? <PauseFill /> : <PlayFill />}
    </Button>
  </div>
)

VideoController.propTypes = {
  onRewind: PropTypes.func,
  isPlaying: PropTypes.bool,
  onPlayPause: PropTypes.func
}
VideoController.defaultProps = {
  onRewind: () => {},
  isPlaying: false,
  onPlayPause: () => {}
}

export default VideoController
