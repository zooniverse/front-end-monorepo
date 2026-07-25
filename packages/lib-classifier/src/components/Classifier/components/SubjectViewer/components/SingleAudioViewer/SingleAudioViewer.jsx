import { arrayOf, func, number, shape, string } from 'prop-types'
import { Box } from 'grommet'
import { useRef, useState } from 'react'
import { useTranslation } from '@translations/i18n'
import locationValidator from '../../helpers/locationValidator'
import AudioController from './components/AudioController'

function AudioPlaceholderIcon () {
  return (
    <svg
      width='162'
      height='162'
      viewBox='0 0 162 162'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: '50%', height: '50%' }}
    >
      <g fill='#005D69' stroke='none'>
        <path d='M81 15C47.8438 15 20.5 39.8125 16.5 71.875C19.4375 70.6875 22.625 71 26 71C34.2812 71 41 76.7188 41 85V125C41 133.281 34.2812 137 26 137C12.1875 137 0 128.812 0 115V80C0 35.8125 36.8125 0 81 0C125.188 0 162 35.8125 162 80V115C162 128.812 149.812 137 136 137C127.719 137 121 133.281 121 125V85C121 76.7188 127.719 71 136 71C139.375 71 142.562 70.6562 145.5 71.875C141.5 39.8125 114.156 15 81 15Z' />
      </g>
      <g transform='translate(28,155) scale(0.0125,-0.0125)' fill='#00979d' stroke='none'>
        <path d='M3940 7864 c-19 -2 -87 -9 -150 -15 -267 -25 -599 -98 -870 -191 -1143 -395 -2043 -1295 -2438 -2438 -92 -267 -161 -581 -194 -875 -17 -158 -17 -652 0 -810 68 -611 271 -1198 589 -1698 24 -37 43 -71 43 -76 0 -5 -78 -77 -173 -162 -223 -199 -555 -531 -639 -639 -75 -98 -98 -138 -98 -175 0 -23 3 -25 46 -25 117 0 560 226 1043 532 l123 78 66 -72 c101 -113 255 -260 390 -373 596 -501 1325 -809 2117 -897 158 -17 652 -17 810 0 911 101 1737 495 2375 1132 637 638 1031 1464 1132 2375 17 158 17 652 0 810 -65 584 -250 1137 -547 1629 -36 59 -65 112 -65 116 0 4 88 87 196 185 403 366 642 616 706 742 33 63 33 64 13 79 -66 50 -435 -129 -1037 -503 -91 -56 -170 -103 -175 -103 -5 0 -56 52 -113 116 -113 125 -289 289 -440 409 -569 454 -1248 738 -1990 830 -118 15 -637 29 -720 19z m544 -1419 c308 -36 550 -107 832 -245 228 -112 512 -315 666 -476 l37 -39 -151 -105 c-267 -185 -524 -370 -883 -635 -192 -142 -357 -258 -365 -258 -8 1 -53 17 -100 37 -281 117 -607 70 -849 -123 -232 -185 -354 -489 -310 -776 7 -50 14 -93 14 -97 0 -3 -169 -138 -375 -300 -206 -162 -508 -399 -670 -526 -162 -128 -298 -232 -302 -232 -22 0 -154 280 -216 460 -84 245 -121 458 -129 745 -12 431 67 791 257 1181 321 654 931 1149 1640 1329 98 25 307 61 390 68 123 10 397 6 514 -8z m1959 -1352 c122 -236 211 -512 252 -783 25 -164 31 -477 11 -643 -37 -318 -107 -558 -246 -842 -339 -692 -998 -1202 -1750 -1355 -658 -134 -1344 -1 -1901 368 -121 81 -317 239 -377 304 l-22 25 267 188 c330 233 720 515 956 692 l178 134 79 -30 c473 -183 1001 85 1131 574 22 83 31 268 17 350 l-7 40 677 532 c372 293 680 532 683 533 4 0 27 -39 52 -87z' />
      </g>
    </svg>
  )
}

const DEFAULT_HANDLER = () => {}

function SingleAudioViewer({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  setVolume = DEFAULT_HANDLER,
  setAudioSpeed = DEFAULT_HANDLER,
  audioSpeed = '1x',
  subject,
  volume = 1
}) {
  const { t } = useTranslation('components')
  const audioRef = useRef(null)

  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [played, setPlayed] = useState(0)

  const audioLocation = subject ? subject.locations.find(l => l.type === 'audio') : null

  if (!audioLocation) {
    return <Box>{t('SubjectViewer.SingleAudioViewerContainer.error')}</Box>
  }

  /* ==================== audio element event handlers ==================== */

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration
      setDuration(isFinite(dur) ? dur : 0)
    }
    onReady()
  }

  const handleTimeUpdate = () => {
    if (!isSeeking && audioRef.current) {
      const audioDuration = audioRef.current.duration
      if (isFinite(audioDuration) && audioDuration > 0) {
        setPlayed(audioRef.current.currentTime / audioDuration)
      }
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setPlayed(0)
  }

  const handleError = (e) => {
    onError(e)
  }

  /* ==================== controller handlers ==================== */

  const handlePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }

  const handleSetPlaybackSpeed = (speed) => {
    setAudioSpeed(speed)
    if (audioRef.current) {
      audioRef.current.playbackRate = Number(speed.slice(0, -1))
    }
  }

  const handleSeekMouseDown = () => {
    setIsSeeking(true)
  }

  const handleSeekChange = (e) => {
    const value = parseFloat(e.target.value)
    setPlayed(value)
    if (audioRef.current) {
      audioRef.current.currentTime = value * duration
    }
  }

  const handleSeekMouseUp = () => {
    setIsSeeking(false)
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <Box width='100%'>
      {/* Subject area: placeholder icon */}
      <Box
        align='center'
        background={{ light: 'white', dark: 'dark-1' }}
        justify='center'
        width='100%'
        height={{ max: '25rem' }}
        style={{ aspectRatio: '1 / 1' }}
      >
        <AudioPlaceholderIcon />
      </Box>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onDurationChange={handleLoadedMetadata}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        preload='auto'
        src={audioLocation.url}
        style={{ display: 'none' }}
      />

      {/* Custom audio toolbar */}
      <AudioController
        audioRef={audioRef}
        duration={duration}
        isPlaying={isPlaying}
        handleSeekChange={handleSeekChange}
        handleSeekMouseDown={handleSeekMouseDown}
        handleSeekMouseUp={handleSeekMouseUp}
        onPlayPause={handlePlayPause}
        onSpeedChange={handleSetPlaybackSpeed}
        played={played}
        playbackSpeed={audioSpeed}
        setVolume={handleVolumeChange}
        volume={volume}
      />
    </Box>
  )
}

SingleAudioViewer.propTypes = {
  audioSpeed: string,
  onError: func,
  onReady: func,
  setAudioSpeed: func,
  setVolume: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  }),
  volume: number
}

export default SingleAudioViewer
