# Single Video Viewer

The Single Video Viewer is a variant of the Subject Viewer that's used to
display video media. See also [Subject Viewers Info](https://github.com/zooniverse/front-end-monorepo/blob/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/README.md).

The only allowed video media type is mp4.

## Features

SingleVideoViewerContainer handles state for SingleVideoViewer and VideoController. It's also contains an svg and InteractionLayer for drawing on a video subject.

Refs
- `interactionLayerSVG`: Reference to svg element displayed on top of video subject. Needed for drawing tools' InteractionLayer.
- `playerRef`: Reference to `react-player` component.
- `transformLayer`: Needed for drawing tools' InteractionLayer.

Props
- `enableInteractionLayer`: (boolean) When `true`, the <InteractionLayer> is rendered on top of the video subject.
- `onError`: (function) Passed from SubjectViewer and called if `onLoad()` fails.
- `onReady`: (function) Called after component mounts with dimensions of <video> and svg interaction layer. Function is passed from SubjectViewer and  dimensions are added to classification metatdata.
- `onKeyDown`: (function) Used for drawing tools components.
- `subject`: (object) Passed from mobx store via SubjectViewer.

State Variables
- `clientWidth`: (number) Returned from `getBoundingClientRect()` on the <video> element in `react-player`.
- `duration`: (number) Duration of the video subject. Seconds rounded to 3 decimal places.
- `isPlaying`: (boolean) Whether or not the video subject is playing.
- `playbackRate`: (number) 1, 0.5, or 0.25 ratio determines the speed of video playback.
- `timeStamp`: (number) Represented by percent of subject played (0 to 1).
- `videoHeight`: (number) Natural height of video subject file.
- `videoWidth`: (number) Natural width of the video subject file.

## External Setup: Workflows and Subjects

**Workflow**

The Workflow of the project can be configured that the Single Video Viewer should be used.

`workflow.configuration = { subject_viewer: 'singleVideo' }`

There is a fall back to assume rendering the Single Video Viewer if the subject has a single location with an video media mime type, but specific configuration on the workflow is preferred.

**Subject**

Each Subject has a single video media location

```js
subject.locations = [{ 'video/mp4': 'tess1234.mp4' }]
```
