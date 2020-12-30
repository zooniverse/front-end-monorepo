import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChapterPrevious, PlayFill, PauseFill } from 'grommet-icons'

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
`

const SpeedButton = styled(Button)`
  &:focus {
    font-weight: 700;
    color: #00979d;
  }
`

const VideoController = ({
  onRewind,
  isPlaying,
  onPlayPause,
  onSpeedChange
}) => (
  <div>
    <Button onClick={onRewind}>
      <ChapterPrevious />
    </Button>
    <Button onClick={onPlayPause}>
      {isPlaying ? <PauseFill /> : <PlayFill />}
    </Button>
    <SpeedButton onClick={() => onSpeedChange(0.25)}>0.25</SpeedButton>
    <SpeedButton onClick={() => onSpeedChange(0.5)}>0.5</SpeedButton>
    <SpeedButton onClick={() => onSpeedChange(1)}>1.0</SpeedButton>
  </div>
)

VideoController.propTypes = {
  onRewind: PropTypes.func,
  isPlaying: PropTypes.bool,
  onPlayPause: PropTypes.func,
  onSpeedChange: PropTypes.func
}
VideoController.defaultProps = {
  onRewind: () => {},
  isPlaying: false,
  onPlayPause: () => {},
  onSpeedChange: () => {}
}

export default VideoController
