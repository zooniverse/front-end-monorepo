import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChapterPrevious, PlayFill, PauseFill } from 'grommet-icons'
import FormattedTime from './FormattedTime'

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

const Slider = styled.div`
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
  onRewind,
  isPlaying,
  onPlayPause,
  onSpeedChange,
  played,
  duration
}) => {
  // console.log('played: ', played)
  return (
    <ControllerWrapper>
      <ButtonGroup>
        <Button onClick={onRewind}>
          <ChapterPrevious />
        </Button>
        <Button onClick={onPlayPause}>
          {isPlaying ? <PauseFill /> : <PlayFill />}
        </Button>
      </ButtonGroup>
      <TimeWrapper>
        <FormattedTime seconds={played * duration} />
        {' / '}
        <FormattedTime seconds={duration} />
      </TimeWrapper>
      <Slider>Slider</Slider>
      <VideoSpeed>
        <SpeedButton onClick={() => onSpeedChange(0.25)}>0.25</SpeedButton>
        <SpeedButton onClick={() => onSpeedChange(0.5)}>0.5</SpeedButton>
        <SpeedButton onClick={() => onSpeedChange(1)}>1.0</SpeedButton>
      </VideoSpeed>
    </ControllerWrapper>
  )
}

VideoController.propTypes = {
  onRewind: PropTypes.func,
  isPlaying: PropTypes.bool,
  onPlayPause: PropTypes.func,
  onSpeedChange: PropTypes.func,
  played: PropTypes.number,
  duration: PropTypes.number
}
VideoController.defaultProps = {
  onRewind: () => {},
  isPlaying: false,
  onPlayPause: () => {},
  onSpeedChange: () => {},
  played: 0,
  duration: 0
}

export default VideoController
