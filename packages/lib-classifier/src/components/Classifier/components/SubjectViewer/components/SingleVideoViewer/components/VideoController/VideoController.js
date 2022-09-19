import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, RangeInput, Select, Text, ThemeContext } from 'grommet'
import {
  CirclePlay,
  Expand,
  Volume,
  VolumeMute,
  PauseFill
} from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import { withThemeContext } from '@zooniverse/react-components'

// add custom icon sizing here
import controlsTheme from './theme'
import formatTimeStamp from '@helpers/formatTimeStamp'

const VideoController = ({
  duration = 0,
  isPlaying = false,
  handleFullScreen = () => true,
  onPlayPause = () => true,
  onSpeedChange = () => true,
  onSliderChange = () => true,
  onVolumeChange = () => true,
  playbackRate = '1x',
  timeStamp = 0, // A percentage between 0 and 1
  volume = 1
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

        {/* Volume */}
        <Box
          // overflow='visible'
          style={{
            position: 'relative'
          }}
        >
          <Button icon={<Volume size='medium' color='white' />} plain />
          <RangeInput
            a11yTitle={''}
            min={0}
            max={1}
            step={0.25}
            onChange={onVolumeChange}
            style={{
              background: 'black',
              border: 'solid 1px green',
              position: 'absolute',
              right: 0,
              top: '-30px',
              width: '120px',
              height: '30px',
              padding: '8px'
            }}
            value={volume}
          />
        </Box>

        {/* Full Screen */}
        <Button
          icon={<Expand size='medium' color='white' />}
          plain
          onClick={handleFullScreen}
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
  onVolumeChange: PropTypes.func,
  playbackRate: PropTypes.string,
  timeStamp: PropTypes.number
}

export default withThemeContext(VideoController)
export { VideoController }
