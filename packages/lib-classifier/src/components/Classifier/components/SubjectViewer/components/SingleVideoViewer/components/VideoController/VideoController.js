import { useMemo } from 'react'
import { bool, func, number, string } from 'prop-types'
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

import controlsTheme from './theme'
import formatTimeStamp from '@helpers/formatTimeStamp'

const iconSize = '16px'

const DEFAULT_HANDLER = () => {}

const VideoController = ({
  duration = 0,
  enableDrawing = false,
  isPlaying = false,
  handleFullscreen = DEFAULT_HANDLER,
  handleSeekChange = DEFAULT_HANDLER,
  handleSeekMouseDown = DEFAULT_HANDLER,
  handleSeekMouseUp = DEFAULT_HANDLER,
  handleVolumeOpen = DEFAULT_HANDLER,
  onPlayPause = DEFAULT_HANDLER,
  onSpeedChange = DEFAULT_HANDLER,
  onVolumeChange = DEFAULT_HANDLER,
  playbackSpeed = '1x',
  played = 0, // A percentage between 0 and 1
  volume = 1,
  volumeOpen = false
}) => {
  console.log('DURATION', duration)
  const { t } = useTranslation('components')
  const playPauseLabel = isPlaying
    ? 'SubjectViewer.VideoController.pause'
    : 'SubjectViewer.VideoController.play'

  const volumeButtonLabel = volumeOpen
    ? 'SubjectViewer.VideoController.closeVolume'
    : 'SubjectViewer.VideoController.openVolume'

  const secondsPlayed = played * duration

  const displayedDuration = useMemo(() => {
    return formatTimeStamp(duration)
  }, [duration])

  return (
    <ThemeContext.Extend value={controlsTheme}>
      <Grid
        columns={['110px', 'flex', 'min-content']}
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
          <Box direction='row' align='center' style={{ minWidth: '4.3rem' }}>
            <Text size='small'>
              <time dateTime={`P${Math.round(secondsPlayed)}S`}>
                {formatTimeStamp(secondsPlayed)}
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
            max={0.999999} // not sure why, this was in the react-player example
            step='any'
            value={played}
            onChange={handleSeekChange}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            style={{
              display: 'block',
              width: '100%'
            }}
          />
        </Box>

        <Box
            align='center'
            justify='center'
            direction='row'
            fill
            gap='small'
          >
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

          {/* Full Screen */}
          {/* {!enableDrawing && ( */}
            <Button
              a11yTitle={t('SubjectViewer.VideoController.fullscreen')}
              icon={<Expand size={iconSize} color='white' />}
              plain
              onClick={handleFullscreen}
            />
          {/* )} */}
        </Box>
      </Grid>
    </ThemeContext.Extend>
  )
}

VideoController.propTypes = {
  duration: number, // in seconds
  enableDrawing: bool,
  isPlaying: bool,
  handleFullscreen: func,
  handleSeekChange: func,
  handleSeekMouseDown: func,
  handleSeekMouseUp: func,
  handleVolumeOpen: func,
  onPlayPause: func,
  onSpeedChange: func,
  onVolumeChange: func,
  playbackSpeed: string,
  played: number, // percentage
  volume: number,
  volumeOpen: bool
}

export default VideoController
