import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Select, ThemeContext } from 'grommet'
import { CirclePlay, PauseFill } from 'grommet-icons'
import counterpart from 'counterpart'
import en from './locales/en.json'
import FormattedTime from './components/FormattedTime/FormattedTime'
import Slider from './components/Slider/Slider'

counterpart.registerTranslations('en', en)

const customSelectTheme = {
  textInput: {
    extend: 'text-align: center; padding: 0; width: 40px;'
  },
  select: {
    icons: {
      margin: 'xxsmall'
    }
  }
}

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
  let playPauseLabel = isPlaying
    ? 'VideoController.pause'
    : 'VideoController.play'

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
          <Box alignSelf='center' pad={{ horizontal: 'small' }}>
            <Button
              a11yTitle={counterpart(playPauseLabel)}
              onClick={onPlayPause}
              icon={isPlaying ? <PauseFill /> : <CirclePlay />}
              plain
            ></Button>
          </Box>

          <Box direction='row' alignSelf='center'>
            <FormattedTime seconds={played * duration} />
            {' / '}
            <FormattedTime seconds={duration} />
          </Box>
        </Box>

        <Box direction='row' alignSelf='center' pad={{ right: 'small' }}>
          <ThemeContext.Extend value={customSelectTheme}>
            <Select
              a11yTitle={counterpart('VideoController.playbackSpeed')}
              options={[0.25, 0.5, 1]}
              value={playbackRate}
              onChange={({ option }) => onSpeedChange(option)}
              plain
            />
          </ThemeContext.Extend>
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
