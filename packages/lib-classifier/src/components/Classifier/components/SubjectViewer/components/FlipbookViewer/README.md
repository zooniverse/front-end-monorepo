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
- `defaultFrame`: (number) If a subject is configured to have `metadata.default_frame` it's fetched via SubjectViewerStore, otherwise the store will initialize frame as 0.
- `onError`: (function) Passed from SubjectViewer and called if `useSubjectImage()` hook fails.
- `onReady`: (function) Function is passed from SubjectViewer and  dimensions are added to classification metadata. Called after svg layers successfully load with `defaultFrameSrc`.
- `subject`: (object) Passed from mobx store via SubjectViewer.

### State Variables
- `currentFrame`: (number) Frame index that determines `viewerSrc`.
- `viewerSrc`: (string): Image src used by SVGImage.
