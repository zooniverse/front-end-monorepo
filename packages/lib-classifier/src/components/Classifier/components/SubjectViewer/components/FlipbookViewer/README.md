# Flipbook Viewer

The flipbook viewer will display subjects with multiple images in the `locations` array whose workflow configration does not include `multiFrame`. See SubjectStore > Subject > `getViewer()` and ADR 46 for more details.

This viewer assumes all images in one subject have the same dimensions, and is catered toward landscape oriented images. The SVG drawing layer dimensions are determined once `defaultFrame` is loaded. Then, `onReady()` is called (corresponds to SubjecViewerStore's `onSubjectReady()`).

Unlike MultiFrameViewer, the currently viewed frame is saved as FlipbookViewer state rather than in SubjectViewerStore because the flipbook is designed for projects that do not intend to refresh pan, zoom, rotate, nor marks/annotations between frames. If projects wish to do so (like transcription projects), they should use the MultiFrameViewer.

## Workflow Configuration

The "Pan and Zoom" section and the "Multi-Image Options" section in the lab are relevant to the Flipbook Viewer.

## Features

FlipbookControls handles the following features:
- Thumbnails of each frame (ratio inputs)
- Next and previous buttons for navigation between frames

### Refs
- `subjectImage`: Reference to svg layer for handling SVGPanZoom component.

### Props
- `defaultFrame`: (number) Fetched from `metadata.default_frame` or initialized to zero in the subject viewer store.
- `defaultFrameSrc`: (string) Either a placeholder or the subject image url.
= `enableRotation`: (function) Passed from the subject viewer store and called once the first frame image is loaded.
- `invert`: (boolean) Whether the image colors are inverted. Passed from the subject viewer store.
- `move`: (boolean) Passed from subject viewer store and used during panning and zooming.
- `naturalHeight`: (number) Height of the subject image.
- `naturalWidth`: (number) Width of the subject image.
- `onReady`: (function) Function is passed from SubjectViewer and  dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`.
- `playIterations`: (string) Can be '', meaning infinite, or a number represented as a string. Set in the project builder and determines how many times to loop the flipbook.
- `setOnPan`: (function) Passed from subject viewer store and used in SVGPanZoom.
- `setOnZoom`: (function) Passed from subject viewer store and used in SVGPanZoom.
- `subject`: (object) Passed from mobx store via SubjectViewer.

### State Variables
- `currentFrame`: (number) Frame index that determines `viewerSrc`.
- `playing`: (boolean) Whether or not the looping feature is playing.
- `dragMove`: Used in SVGPanZoom.
