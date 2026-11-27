import { useContext, useMemo, useState } from 'react'
import { bool, func, number, object, shape, string } from 'prop-types'
import {
  Box,
  Button,
  Grid,
  RangeInput,
  ResponsiveContext,
  Select,
  Text,
  ThemeContext
} from 'grommet'
import {
  FormDown,
  Pause,
  Play,
  Volume,
  VolumeLow,
  VolumeMute
} from 'grommet-icons'
import styled, { css } from 'styled-components'
import { useTranslation } from '@translations/i18n'

import controlsTheme from '../../../../helpers/mediaControlsTheme'
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
  padding: 0 8px;
  background: ${props =>
    props.theme.dark
      ? props.theme.global.colors['dark-1']
      : props.theme.global.colors['light-1']};
  position: absolute;
  left: -30px;
  bottom: 80px;
  transform: rotate(-90deg);
`

const DEFAULT_HANDLER = () => {}

const AudioController = ({
  duration = 0,
  isPlaying = false,
  handleSeekChange = DEFAULT_HANDLER,
  handleSeekMouseDown = DEFAULT_HANDLER,
  handleSeekMouseUp = DEFAULT_HANDLER,
  onPlayPause = DEFAULT_HANDLER,
  onSpeedChange = DEFAULT_HANDLER,
  playbackSpeed = '1x',
  played = 0,
  audioRef,
  setVolume = DEFAULT_HANDLER,
  volume = 1,
}) => {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('components')
  const [volumeOpen, setVolumeOpen] = useState(false)

  const playPauseLabel = isPlaying
    ? 'SubjectViewer.AudioController.pause'
    : 'SubjectViewer.AudioController.play'

  const volumeButtonLabel = volumeOpen
    ? 'SubjectViewer.AudioController.closeVolume'
    : 'SubjectViewer.AudioController.openVolume'

  const secondsPlayed = played * duration

  const displayedDuration = useMemo(() => {
    return formatTimeStamp(duration)
  }, [duration])

  const handleSliderKeys = e => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      onPlayPause()
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault()
      e.stopPropagation()
      if (played === 0) return
      const newPlayed = played <= 0.05 ? 0 : played - 0.05
      handleSeekChange({ target: { value: newPlayed } })
    } else if (e.code === 'ArrowRight') {
      e.preventDefault()
      e.stopPropagation()
      if (played === 1) return
      const newPlayed = played >= 0.95 ? 1 : played + 0.05
      handleSeekChange({ target: { value: newPlayed } })
    }
  }

  const onVolumeChange = e => {
    setVolume(parseFloat(e.target.value))
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
      background={{ light: 'white', dark: 'dark-3' }}
      pad={{ horizontal: size === 'small' ? '0' : 'small' }}
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
          data-testid='audio subject viewer custom controls'
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
                  <Play size={iconSize} color={color} />
                )
              }
              plain
            />

            {/* Speed */}
            <SpeedSelect
              a11yTitle={t('SubjectViewer.AudioController.playbackSpeed')}
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
              flex={false}
              margin={{ horizontal: size === 'small' ? '5px' : '10px' }}
            >
              <Text size='0.75rem' color={color} style={{ whiteSpace: 'nowrap' }}>
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
              a11yTitle={t('SubjectViewer.AudioController.scrubber')}
              min={0}
              max={0.999999}
              step={0.01}
              value={played}
              onChange={handleSeekChange}
              onKeyDown={handleSliderKeys}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
            />
          </Box>

          <Box align='center' direction='row' fill>
            <VolumeContainer>
              {/* Volume */}
              <StyledButton
                a11yTitle={t(volumeButtonLabel)}
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
                  a11yTitle={t('SubjectViewer.AudioController.volumeSlider')}
                  min={0}
                  max={1}
                  step={0.25}
                  onChange={onVolumeChange}
                  onKeyDown={handleVolumeKeys}
                  value={volume}
                />
              )}
            </VolumeContainer>
          </Box>
        </Grid>
      </ThemeContext.Extend>
    </Box>
  )
}

AudioController.propTypes = {
  audioRef: shape({ current: object }),
  duration: number,
  isPlaying: bool,
  handleSeekChange: func,
  handleSeekMouseDown: func,
  handleSeekMouseUp: func,
  onPlayPause: func,
  onSpeedChange: func,
  playbackSpeed: string,
  played: number,
  setVolume: func,
  volume: number,
}

export default AudioController
