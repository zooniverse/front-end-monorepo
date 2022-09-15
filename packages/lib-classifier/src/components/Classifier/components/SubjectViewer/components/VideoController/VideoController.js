import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Select, ThemeContext } from 'grommet'
import { CirclePlay, PauseFill } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import formatTimeStamp from '@helpers/formatTimeStamp'
import Slider from './components/Slider/Slider'

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
  duration = 0,
  isPlaying = false,
  onPlayPause = () => true,
  onSpeedChange = () => true,
  onSliderChange = () => true,
  onSliderMouseDown = () => true,
  onSliderMouseUp = () => true,
  playbackRate = 1,
  timeStamp = 0
}) => {
  const { t } = useTranslation('components')
  const playPauseLabel = isPlaying
    ? 'SubjectViewer.VideoController.pause'
    : 'SubjectViewer.VideoController.play'

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'light-3'
      }}
    >
      <Box pad={{ horizontal: 'xsmall', top: 'xsmall' }}>
        <Slider
          timeStamp={timeStamp}
          onMouseUp={onSliderMouseUp}
          onMouseDown={onSliderMouseDown}
          onChange={onSliderChange}
        />
      </Box>

      <Box direction='row' justify='between'>
        <Box direction='row'>
          <Box alignSelf='center' pad={{ horizontal: 'small' }}>
            <Button
              a11yTitle={t(playPauseLabel)}
              onClick={onPlayPause}
              icon={isPlaying ? <PauseFill /> : <CirclePlay />}
              plain
            />
          </Box>

          <Box direction='row' alignSelf='center'>
            <time dateTime={`P${Math.round(timeStamp * duration)}S`}>
              {formatTimeStamp(timeStamp * duration)}
            </time>
            {' / '}
            <time dateTime={`P${Math.round(duration)}S`}>
              {formatTimeStamp(duration)}
            </time>
          </Box>
        </Box>

        <Box direction='row' alignSelf='center' pad={{ right: 'small' }}>
          <ThemeContext.Extend value={customSelectTheme}>
            <Select
              a11yTitle={t('SubjectViewer.VideoController.playbackSpeed')}
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
  duration: PropTypes.number,
  isPlaying: PropTypes.bool,
  onPlayPause: PropTypes.func,
  onSpeedChange: PropTypes.func,
  onSliderMouseDown: PropTypes.func,
  onSliderMouseUp: PropTypes.func,
  onSliderChange: PropTypes.func,
  playbackRate: PropTypes.number,
  timeStamp: PropTypes.number
}

export default VideoController
