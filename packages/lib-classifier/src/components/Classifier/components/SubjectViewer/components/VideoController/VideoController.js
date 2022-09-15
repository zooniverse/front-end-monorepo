import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grommet, RangeInput, Select, ThemeContext } from 'grommet'
import { CirclePlay, PauseFill } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import formatTimeStamp from '@helpers/formatTimeStamp'

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

const customThemeRangeInput = {
  global: {
    spacing: '16px'
  },
  rangeInput: {
    track: {
      color: 'accent-1',
      height: '6px',
      extend: () => 'border-radius: 10px',
      lower: {
        color: '#F0B200'
      },
      upper: {
        color: 'dark-4'
      }
    },
    thumb: {
      color: '#F0B200'
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
        <Grommet theme={customThemeRangeInput}>
          <Box>
            <RangeInput
              a11yTitle={t('SubjectViewer.VideoController.scrubber')}
              min={0}
              max={1}
              step={0.0001}
              value={timeStamp}
              onMouseUp={onSliderMouseUp}
              onMouseDown={onSliderMouseDown}
              onChange={onSliderChange}
              onInput={onSliderChange}
            />
          </Box>
        </Grommet>
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
