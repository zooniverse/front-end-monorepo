import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import { CirclePlay, PauseFill } from 'grommet-icons'
import FormattedTime from './FormattedTime'
import Slider from './Slider'

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
  isPlaying,
  onPlayPause,
  onSpeedChange,
  played,
  duration,
  onSliderMouseUp,
  onSliderMouseDown,
  onSliderChange
}) => {
  return (
    <Box background='#000000'>
      <Box pad='xxsmall' border={{ color: 'teal', size: 'small' }}>
        <Slider
          played={played}
          onMouseUp={onSliderMouseUp}
          onMouseDown={onSliderMouseDown}
          onChange={onSliderChange}
        />
      </Box>

      <Box
        direction='row'
        justify='between'
        border={{ color: 'black', size: 'small' }}
      >
        <Box direction='row' border={{ color: 'red', size: 'small' }}>
          <Button onClick={onPlayPause}>
            {isPlaying ? <PauseFill /> : <CirclePlay />}
          </Button>
          <SpeedButton onClick={() => onSpeedChange(0.25)}>0.25</SpeedButton>
          <SpeedButton onClick={() => onSpeedChange(0.5)}>0.5</SpeedButton>
          <SpeedButton onClick={() => onSpeedChange(1)}>1.0</SpeedButton>
        </Box>

        <Box
          direction='row'
          border={{ color: 'blue', size: 'small' }}
          alignSelf='center'
        >
          <FormattedTime seconds={played * duration} />
          {' / '}
          <FormattedTime seconds={duration} />
        </Box>
      </Box>
    </Box>
  )
}

VideoController.propTypes = {
  isPlaying: PropTypes.bool,
  played: PropTypes.number,
  duration: PropTypes.number,
  onPlayPause: PropTypes.func,
  onSpeedChange: PropTypes.func,
  onSliderMouseUp: PropTypes.func,
  onSliderMouseDown: PropTypes.func,
  onSliderChange: PropTypes.func
}
VideoController.defaultProps = {
  isPlaying: false,
  played: 0,
  duration: 0,
  onPlayPause: () => {},
  onSpeedChange: () => {},
  onSliderMouseUp: () => {},
  onSliderMouseDown: () => {},
  onSliderChange: () => {}
}

export default VideoController
