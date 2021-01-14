import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Select } from 'grommet'
import { CirclePlay, PauseFill } from 'grommet-icons'
import FormattedTime from './FormattedTime'
import Slider from './Slider'

const VideoController = ({
  isPlaying,
  onPlayPause,
  onSpeedChange,
  played,
  playbackRate,
  duration,
  onSliderMouseUp,
  onSliderMouseDown,
  onSliderChange
}) => {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'light-3'
      }}
    >
      <Box pad={{ horizontal: 'xsmall', top: 'xsmall' }}>
        <Slider
          played={played}
          onMouseUp={onSliderMouseUp}
          onMouseDown={onSliderMouseDown}
          onChange={onSliderChange}
        />
      </Box>

      <Box direction='row' justify='between'>
        <Box direction='row'>
          <Box
            a11yTitle='Video Play and Pause button'
            alignSelf='center'
            pad={{ horizontal: 'small' }}
          >
            <Button onClick={onPlayPause}>
              {isPlaying ? <PauseFill /> : <CirclePlay />}
            </Button>
          </Box>

          <Box a11yTitle='Video playback speed selection' width='140px'>
            <Select
              options={[0.25, 0.5, 1]}
              value={playbackRate}
              onChange={({ option }) => onSpeedChange(option)}
              plain={true}
            />
          </Box>
        </Box>

        <Box
          a11yTitle='Video player time played and total time'
          direction='row'
          alignSelf='center'
          pad={{ right: 'small' }}
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
  playbackRate: PropTypes.number,
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
  playbackRate: 1,
  duration: 0,
  onPlayPause: () => {},
  onSpeedChange: () => {},
  onSliderMouseUp: () => {},
  onSliderMouseDown: () => {},
  onSliderChange: () => {}
}

export default VideoController
