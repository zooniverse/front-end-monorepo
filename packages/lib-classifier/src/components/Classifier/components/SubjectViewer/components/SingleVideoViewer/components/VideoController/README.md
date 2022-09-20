# VideoController

Used in SingleVideoViewer. Custom video controls are necessary for building drawing tools layers on top of a video subject. The `react-player` used to display a video subject has built-in controls, but their position overlaps some of the video. When an svg is placed on top of the player to record annotations, the built-in controls become unusable, hence the need for custom controls displayed below the subject.

## Features

- Play
- Pause
- Display timestamp
- Scrubbing
- Change playback rate
- Adjust the volume
- Request fullscreen

## Props
- `duration`: (number) Duration of video subject in seconds.
- `isPlaying`: (boolean) State variable in SingleVideoViewerContainer determines if video player is playing.
- `handleFullscreen`: (func) Function passed from SingleVideoViewerContainer and called when fullscreen button is clicked.
- `handleVolumeOpen`: (func) Function passed from SingleVideoViewerContainer and called when volume icon is clicked.
- `onPlayPause`: (func) Function passed from SingleVideoViewerContainer and called when player is played or paused.
- `onSpeedChange`: (func) Function passed from SingleVideoViewerContainer and called when the playback rate Select component is changed.
- `onSliderChange`: (func) Function passed from SingleVideoViewerContainer and called when Slider input is changed.
- `onVolumeChange`: (func) Called when the volume range input is changed.
- `playbackRate`: (number) From 0 to 1.
- `timeStamp`: (number) Measured from 0 to 1. The percentage of the video subject played.
- `volume`: (number) Number between 0 and 1.
- `volumeOpen`: (boolean) Controls whether the volume range input is displayed or not.
