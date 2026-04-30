# Audio Spectrogram Viewer

The Audio Spectrogram Viewer displays an audio file and an image file (a spectrogram corresponding to the audio) simultaneously. It's designed for projects that ask volunteers to analyse sounds.

- This viewer is selected automatically (see [Subject.js](../../../../../../store/subjects/Subject/Subject.js)'s `get viewer()`) when the Subject contains exactly 1 image file and 1 audio file.
- This viewer's corresponding Subject type is the [AudioSpectrogramSubject](../../../../../../store/subjects/AudioSpectrogramSubject/AudioSpectrogramSubject.js).

## Features

- Displays the image file (which _should_ be a spectrogram) above the audio player.
- The image file has a time/progress bar that's synced to the progress of the played audio.
  - When the audio starts playing, the time/progress bar starts at the left of the image. When the audio finishes playing, the time/progress bar finishes at the right of the image.
- The image file can't be interacted with (i.e. no pan or zoom). Only the audio player provides any interactions.
