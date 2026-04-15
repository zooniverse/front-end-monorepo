# Audio Spectrogram Subject (aka Audio + Image Subject)

This Subject model represents a Subject that contains exactly 1 image file and 1 audio file.

Historically, this type of Subject is used by projects like [Chirp Check](https://www.zooniverse.org/projects/hannah-dot-slesinski/chirp-check/), which asks volunteers to analyse audio recordings of bird calls.

- Contextually, the image file is _supposed_ to be a spectrogram of the audio file, though there's no way for us to enforce this through code.
- The order of the image and audio files don't matter.
- The corresponding viewer for this Subject is the [AudioSpectrogramViewer](../../../components/Classifier/components/SubjectViewer/components/AudioSpectrogramViewer/AudioSpectrogramViewer.jsx), which displays both audio and image files simultaneously.
