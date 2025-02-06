import { useMemo, useState } from 'react'
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
import {
  CirclePlay,
  Expand,
  FormDown,
  Volume,
  VolumeLow,
  VolumeMute,
  Pause
} from 'grommet-icons'
import styled, { css } from 'styled-components'
import { useTranslation } from '@translations/i18n'

import controlsTheme from './theme'
import formatTimeStamp from '@helpers/formatTimeStamp'

const iconSize = '1rem'
const color = { light: 'dark-5', dark: 'white' }

const StyledButton = styled(Button)`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    ${props =>
      props.theme.dark
        ? css`
            background-color: ${props.theme.global.colors['neutral-1']};
          `
        : css`
            background-color: ${props.theme.global.colors['accent-1']};
          `}

    > svg {
      stroke: white;
    }
  }
`

const SpeedSelect = styled(Select)`
  display: flex;
  align-content: center;
  width: 2rem;
  text-align: right;
`

const VolumeContainer = styled(Box)`
  position: relative;
`

const VolumeRange = styled(RangeInput)`
  display: block;
  width: 100px;
  height: 24px;
  padding: 0 8px 0 0;
  background: ${props =>
    props.theme.dark
      ? props.theme.global.colors['dark-1']
      : props.theme.global.colors['light-1']};
  position: absolute;
  left: -30px;
  bottom: 74px;
  transform: rotate(-90deg);
`

const DEFAULT_HANDLER = () => {}

const VideoController = ({
  duration = 0,
  enableDrawing = false,
  isPlaying = false,
  handleFullscreen = DEFAULT_HANDLER,
  handleSeekChange = DEFAULT_HANDLER,
  handleSeekMouseDown = DEFAULT_HANDLER,
  handleSeekMouseUp = DEFAULT_HANDLER,
  onPlayPause = DEFAULT_HANDLER,
  onSpeedChange = DEFAULT_HANDLER,
  playbackSpeed = '1x',
  played = 0, // A percentage between 0 and 1
  setVolume = DEFAULT_HANDLER,
  volume = 1,
  volumeDisabled = false
}) => {
  const { t } = useTranslation('components')
  const [volumeOpen, setVolumeOpen] = useState(false)

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

  const handleSliderPlayPause = e => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      onPlayPause()
    }
  }

  const onVolumeChange = e => {
    setVolume(Number(e.target.value))
  }

  const handleVolumeKeys = e => {
    if (e.key === 'ArrowUp' && volume < 1) {
      e.preventDefault()
      e.stopPropagation()
      setVolume(volume + 0.25)
    } else if (e.key === 'ArrowDown' && volume > 0) {
      e.preventDefault()
      e.stopPropagation()
      setVolume(volume - 0.25)
    }
  }

  return (
    <Box
      background={{ light: 'white', dark: 'dark-1' }}
      pad={{ horizontal: 'small' }}
      border={[
        {
          color: {
            dark: 'dark-1',
            light: 'light-3'
          },
          side: 'all'
        },
        {
          color: {
            dark: 'transparent',
            light: 'transparent'
          },
          side: 'top'
        }
      ]}
    >
      <ThemeContext.Extend value={controlsTheme}>
        <Grid
          columns={['min-content', 'flex', 'min-content']}
          rows={['1fr']}
          data-testid='video subject viewer custom controls'
        >
          <Box direction='row'>
            {/* Play/Pause */}
            <StyledButton
              a11yTitle={t(playPauseLabel)}
              onClick={onPlayPause}
              icon={
                isPlaying ? (
                  <Pause size={iconSize} color={color} />
                ) : (
                  <CirclePlay size={iconSize} color={color} />
                )
              }
              plain
            />

            {/* Speed */}
            <SpeedSelect
              a11yTitle={t('SubjectViewer.VideoController.playbackSpeed')}
              options={['0.25x', '0.5x', '1x']}
              value={playbackSpeed}
              onChange={({ option }) => onSpeedChange(option)}
              plain
              icon={<FormDown size='0.75rem' color={color} />}
              focusIndicator
              size='0.75rem'
              color={color}
            />

            {/* Time */}
            <Box
              direction='row'
              align='center'
              width='max-content'
              pad={{ horizontal: '20px' }}
            >
              <Text size='0.75rem' color={color}>
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
          <Box direction='row' align='center' margin={{ right: '10px' }}>
            <RangeInput
              a11yTitle={t('SubjectViewer.VideoController.scrubber')}
              min={0}
              max={0.999999} // not sure why, this was in the react-player example
              step='any'
              value={played}
              onChange={handleSeekChange}
              onKeyDown={handleSliderPlayPause}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
            />
          </Box>

          <Box align='center' direction='row' fill>
            <VolumeContainer>
              {/* Volume */}
              <StyledButton
                a11yTitle={t(volumeButtonLabel)}
                disabled={volumeDisabled}
                icon={
                  volume <= 0 ? (
                    <VolumeMute size={iconSize} color={color} />
                  ) : volume <= 0.5 ? (
                    <VolumeLow size={iconSize} color={color} />
                  ) : (
                    <Volume size={iconSize} color={color} />
                  )
                }
                onClick={() => setVolumeOpen(!volumeOpen)}
                onKeyDown={handleVolumeKeys}
                plain
              />
              {volumeOpen && (
                <VolumeRange
                  a11yTitle={t('SubjectViewer.VideoController.volumeSlider')}
                  disabled={volumeDisabled}
                  min={0}
                  max={1}
                  step={0.25}
                  onChange={onVolumeChange}
                  onKeyDown={handleVolumeKeys}
                  value={volume}
                />
              )}
            </VolumeContainer>

            {/* Full Screen */}
            {/* {!enableDrawing && ( */}
            <StyledButton
              a11yTitle={t('SubjectViewer.VideoController.fullscreen')}
              icon={<Expand size={iconSize} color={color} />}
              plain
              onClick={handleFullscreen}
            />
          </Box>
        </Grid>
      </ThemeContext.Extend>
    </Box>
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
  onPlayPause: func,
  onSpeedChange: func,
  playbackSpeed: string,
  played: number, // percentage
  volume: number,
  volumeDisabled: bool
}

export default VideoController
