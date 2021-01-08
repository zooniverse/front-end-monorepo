import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CirclePlay, PauseFill } from 'grommet-icons'
import FormattedTime from './FormattedTime'
import Slider from './Slider'

const ControllerWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 2fr 0.5fr;
  gap: 5px 5px;
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: center; */
`

const ButtonGroup = styled.div`
  border: 2px solid red;
  /* display: grid;
  grid-template-rows: auto;
  align-items: center; */
`

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
`

const SliderWrapper = styled.div`
  border: 2px solid blue;
`

const SpeedButton = styled(Button)`
  &:focus {
    font-weight: 700;
    color: #00979d;
  }
`

const TimeWrapper = styled.div`
  border: 2px solid green;
  /* justify-self: end; */
  /* margin-right: 10px; */
`

const VideoSpeed = styled.div`
  border: 2px solid orchid;
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
    <ControllerWrapper>
      <ButtonGroup>
        <Button onClick={onPlayPause}>
          {isPlaying ? <PauseFill /> : <CirclePlay />}
        </Button>
      </ButtonGroup>
      <TimeWrapper>
        <FormattedTime seconds={played * duration} />
        {' / '}
        <FormattedTime seconds={duration} />
      </TimeWrapper>
      <SliderWrapper>
        <Slider
          played={played}
          onMouseUp={onSliderMouseUp}
          onMouseDown={onSliderMouseDown}
          onChange={onSliderChange}
        />
      </SliderWrapper>
      <VideoSpeed>
        <SpeedButton onClick={() => onSpeedChange(0.25)}>0.25</SpeedButton>
        <SpeedButton onClick={() => onSpeedChange(0.5)}>0.5</SpeedButton>
        <SpeedButton onClick={() => onSpeedChange(1)}>1.0</SpeedButton>
      </VideoSpeed>
    </ControllerWrapper>
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
