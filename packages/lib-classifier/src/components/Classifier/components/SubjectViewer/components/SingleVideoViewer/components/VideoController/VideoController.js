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
import { useTranslation } from '@translations/i18n'
import { withThemeContext } from '@zooniverse/react-components'

import controlsTheme from './theme'
import formatTimeStamp from '@helpers/formatTimeStamp'

const iconSize = '16px'

const VideoController = ({
  duration = 0,
  enableDrawing = false,
  isPlaying = false,
  handleFullscreen = () => true,
  handleVolumeOpen = () => true,
  onPlayPause = () => true,
  onSpeedChange = () => true,
  onSliderChange = () => true,
  onVolumeChange = () => true,
  playbackSpeed = '1x',
  timeStamp = 0, // A percentage between 0 and 1
  volume = 1,
  volumeOpen = false
}) => {
  const { t } = useTranslation('components')
  const playPauseLabel = isPlaying
    ? 'SubjectViewer.VideoController.pause'
    : 'SubjectViewer.VideoController.play'

  const volumeButtonLabel = volumeOpen
    ? 'SubjectViewer.VideoController.closeVolume'
    : 'SubjectViewer.VideoController.openVolume'

  const sliderValue = timeStamp * duration

  const displayedDuration = useMemo(() => {
    return formatTimeStamp(duration)
  }, [duration])

  return (
    <ThemeContext.Extend value={controlsTheme}>
      <Grid
        columns={['100px', 'flex', '120px']}
        data-testid='video subject viewer custom controls'
        pad='10px' // xsmall regardless of screen size
        style={{ background: '#000000' }}
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
            value={playbackSpeed}
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
              a11yTitle={t(volumeButtonLabel)}
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
                a11yTitle={t('SubjectViewer.VideoController.volumeSlider')}
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
          {enableDrawing && (
            <Button
              a11yTitle={t('SubjectViewer.VideoController.fullscreen')}
              icon={<Expand size={iconSize} color='white' />}
              plain
              onClick={handleFullscreen}
            />
          )}
        </Box>
      </Grid>
    </ThemeContext.Extend>
  )
}

VideoController.propTypes = {
  duration: PropTypes.number,
  isPlaying: PropTypes.bool,
  handleFullscreen: PropTypes.func,
  handleVolumeOpen: PropTypes.func,
  onPlayPause: PropTypes.func,
  onSpeedChange: PropTypes.func,
  onSliderChange: PropTypes.func,
  onVolumeChange: PropTypes.func,
  playbackSpeed: PropTypes.string,
  timeStamp: PropTypes.number,
  volume: PropTypes.number,
  volumeOpen: PropTypes.bool
}

export default withThemeContext(VideoController)
export { VideoController }
