import React, { useMemo } from 'react'
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
  playbackRate = '1x',
  timeStamp = 0 // A percentage between 0 and 1
}) => {
  const { t } = useTranslation('components')
  const playPauseLabel = isPlaying ? 'SubjectViewer.VideoController.pause' : 'SubjectViewer.VideoController.play'

  const sliderValue = timeStamp * duration

  const displayedDuration = useMemo(() => {
    return formatTimeStamp(duration)
  }, [duration])

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'light-3'
      }}
    >

      {/* Slider */}
      <Box pad={{ horizontal: 'xsmall', top: 'xsmall' }}>
        <Grommet theme={customThemeRangeInput}>
          <RangeInput
            a11yTitle={t('SubjectViewer.VideoController.scrubber')}
            min={0}
            max={duration}
            step={0.1}
            value={sliderValue}
            onChange={onSliderChange}
          />
        </Grommet>
      </Box>

      {/* Play/Pause */}
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

          {/* Time */}
          <Box direction='row' alignSelf='center'>
            <time dateTime={`P${Math.round(sliderValue)}S`}>
              {formatTimeStamp(sliderValue)}
            </time>
            {' / '}
            <time dateTime={`P${Math.round(duration)}S`}>
              {displayedDuration}
            </time>
          </Box>
        </Box>

        {/* Rate */}
        <Box direction='row' alignSelf='center' pad={{ right: 'small' }}>
          <ThemeContext.Extend value={customSelectTheme}>
            <Select
              a11yTitle={t('SubjectViewer.VideoController.playbackSpeed')}
              options={['0.25x', '0.5x', '1x']}
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
  onSliderChange: PropTypes.func,
  playbackRate: PropTypes.string,
  timeStamp: PropTypes.number
}

export default VideoController
