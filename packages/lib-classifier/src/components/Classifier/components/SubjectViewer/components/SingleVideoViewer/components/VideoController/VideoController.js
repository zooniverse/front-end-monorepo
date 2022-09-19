import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, RangeInput, Select, Text, ThemeContext } from 'grommet'
import { CirclePlay, Volume, PauseFill } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import { withThemeContext } from '@zooniverse/react-components'

import controlsTheme from './theme'
import formatTimeStamp from '@helpers/formatTimeStamp'

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
  const playPauseLabel = isPlaying
    ? 'SubjectViewer.VideoController.pause'
    : 'SubjectViewer.VideoController.play'

  const sliderValue = timeStamp * duration

  const displayedDuration = useMemo(() => {
    return formatTimeStamp(duration)
  }, [duration])

  return (
    <ThemeContext.Extend value={controlsTheme}>
      <Box
        background='neutral-7'
        direction='row'
        gap='small'
        pad='xsmall'
        style={{ border: 'solid 1px red' }}
      >
        {/* Play/Pause */}
        <Button
          a11yTitle={t(playPauseLabel)}
          onClick={onPlayPause}
          icon={
            isPlaying ? (
              <PauseFill color='white' size='small' />
            ) : (
              <CirclePlay color='white' size='medium' />
            )
          }
          plain
          margin={isPlaying ? '6px' : '0'}
        />

        {/* Time */}
        <Box direction='row' align='center'>
          <Text size='small'>
            <time dateTime={`P${Math.round(sliderValue)}S`}>
              {formatTimeStamp(sliderValue)}
            </time>
            {' / '}
            <time dateTime={`P${Math.round(duration)}S`}>
              {displayedDuration}
            </time>
          </Text>
        </Box>

        {/* Slider */}
        <Box
          basis='1/2'
          direction='row'
          align='center'
          pad={{ right: 'xsmall' }}
        >
          <RangeInput
            a11yTitle={t('SubjectViewer.VideoController.scrubber')}
            min={0}
            max={duration}
            step={0.1}
            value={sliderValue}
            onChange={onSliderChange}
            style={{
              display: 'block',
              width: '100%'
            }}
          />
        </Box>

        {/* Rate */}
        <Select
          a11yTitle={t('SubjectViewer.VideoController.playbackSpeed')}
          options={['0.25x', '0.5x', '1x']}
          value={playbackRate}
          onChange={({ option }) => onSpeedChange(option)}
          plain
          size='small'
          style={{
            color: 'white',
            display: 'block',
            width: '36px'
          }}
        />
      </Box>
    </ThemeContext.Extend>
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

export default withThemeContext(VideoController)
export { VideoController }
