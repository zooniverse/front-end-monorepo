# Flipbook Viewer

The flipbook viewer displays subjects with multiple images in the `locations` array whose workflow configration does not include `multiFrame`. See SubjectStore > Subject > `getViewer()` and ADR 46 for more details.

This viewer assumes all images in one subject have the same dimensions, and is catered toward landscape oriented or square images. 

?? The SVG drawing layer dimensions are determined once `defaultFrame` is loaded. Then, `onReady()` is called (corresponds to SubjecViewerStore's `onSubjectReady()`).

## Workflow Configuration

The "Pan and Zoom" section and the "Multi-Image Options" section in the lab are relevant to the Flipbook Viewer.

## Features

FlipbookControls handles the following features:
- Thumbnails of each frame (ratio inputs)
- Next and previous buttons for navigation between frames
- Play speed with five options: 0.25x, 0.5x, 1x, 2x, 4x
- Play/Pause button
- Button to switch to separate frames view

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
