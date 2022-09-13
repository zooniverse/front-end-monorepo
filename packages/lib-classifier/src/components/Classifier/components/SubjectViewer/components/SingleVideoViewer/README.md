# Single Video Viewer

The Single Video Viewer is a variant of the Subject Viewer that's used to
display video media. See also [Subject Viewers Info](https://github.com/zooniverse/front-end-monorepo/blob/master/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/README.md).

The only allowed video media type is mp4.

## Features

SingleVideoViewerContainer handles state for SingleVideoViewer and VideoController. It's also contains an svg and InteractionLayer for drawing on a video subject. The svg layer is displayed regardless of whether a project has drawing tools enabled?

When SingleVideoViewerContainer mounts, it creates a <video> HTML element in `preload()` and sets the `src` as the subject's url.

Then, `getVideoSize()` returns the following dimensions:
- `clientHeight` and `clientWidth` are the dimensions of the SVG placed on top of the video player for drawing tool interactions.
- `naturalHeight` and `naturalWidth` are the dimensions of the <video> displaying the subject.

Refs
- `interactionLayerSVG`: Reference to svg element displayed on top of video subject. Needed for drawing tools' InteractionLayer.
- `player`: Reference to `react-player` components.
- `transformLayer`: Needed for drawing tools' InteractionLayer.

Props
- `enableInteractionLayer`: (boolean) When `true`, the <InteractionLayer> is rendered on top of the video subject.
= `loadingState`: (asyncStates) Passed from SubjectViewer. This is the viewer's loading state, not the subject's loading state.
- `onError`: (function) Passed from SubjectViewer and called if `onLoad()` fails.
- `onKeyDown`: (function) Used for drawing tools components.
- `onReady`: (function) Called after component mounts with dimensions of <video> and svg interaction layer. Function is passed from SubjectViewer and  dimensions are added to classification metatdata.
- `subject`: (object) Passed from mobx store via SubjectViewer.

State Variables
- `clientWidth`: (number) Returned from `getBoundingClientRect()` on the svg element that belongs to InteractionLayer for drawing tools.
- `duration`: (number) Duration of the video subject. Seconds rounded to 3 decimal places.
= `isPlaying`: (boolean) Whether or not the video subject is playing.
- `isSeeking`: (boolean) Whether or not a user is interacting with the VideoController > Slider
= `naturalHeight`: (number) Height of <video> displaying the subject.
= `naturalWidth`: (number) Width of the <video> displaying the subject.
- `played`: (number) Current played timestamp of video subject.
- `vid`: (html element) <video> displaying the subject.

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
