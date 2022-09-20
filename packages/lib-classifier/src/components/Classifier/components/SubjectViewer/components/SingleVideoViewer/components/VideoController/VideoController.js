import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Grid,
  RangeInput,
  Select,
  Text,
  ThemeContext
} from 'grommet'
import { CirclePlay, Expand, Volume, VolumeMute, Pause } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import { withThemeContext } from '@zooniverse/react-components'

// add custom icon sizing here ?
import controlsTheme from './theme'
import formatTimeStamp from '@helpers/formatTimeStamp'

const iconSize = '16px'

const VideoController = ({
  duration = 0,
  isPlaying = false,
  handleFullScreen = () => true,
  handleVolumeOpen = () => true,
  onPlayPause = () => true,
  onSpeedChange = () => true,
  onSliderChange = () => true,
  onVolumeChange = () => true,
  playbackRate = '1x',
  timeStamp = 0, // A percentage between 0 and 1
  volume = 1,
  volumeOpen = false
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
      <Grid
        columns={['100px', 'flex', '120px']}
        pad='10px' // xsmall regardless of screen size
        style={{ background: '#000000', borderTop: 'solid 1px white' }}
      >
        <Box background='neutral-7' direction='row' gap='small'>
          {/* Play/Pause */}
          <Button
            a11yTitle={t(playPauseLabel)}
            onClick={onPlayPause}
            icon={
              isPlaying ? (
                <Pause color='white' size={iconSize} />
              ) : (
                <CirclePlay color='white' size={iconSize} />
              )
            }
            plain
          />

          {/* Time */}
          <Box direction='row' align='center' style={{ minWidth: '66px' }}>
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
        </Box>

        {/* Slider */}
        <Box direction='row' align='center' pad={{ left: 'xsmall' }}>
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

        <Box direction='row' gap='small'>
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
              textAlign: 'right',
              width: '36px'
            }}
          />

          {/* Volume */}
          <Box
            align='center'
            direction='row'
            style={{
              position: 'relative'
            }}
          >
            <Button
              icon={
                volume > 0 ? (
                  <Volume size={iconSize} color='white' />
                ) : (
                  <VolumeMute size={iconSize} color='white' />
                )
              }
              plain
              onClick={handleVolumeOpen}
            />
            {volumeOpen && (
              <RangeInput
                a11yTitle={t('SubjectViewer.VideoController.volume')}
                min={0}
                max={1}
                step={0.25}
                onChange={onVolumeChange}
                style={{
                  background: 'black',
                  display: 'block',
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'top left',
                  position: 'absolute',
                  left: '-100%',
                  bottom: 0,
                  width: '120px',
                  height: '30px',
                  padding: '8px'
                }}
                value={volume}
              />
            )}
          </Box>

          {/* Full Screen */}
          <Button
            icon={<Expand size={iconSize} color='white' />}
            plain
            onClick={handleFullScreen}
          />
        </Box>
      </Grid>
      {/* </Box> */}
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
