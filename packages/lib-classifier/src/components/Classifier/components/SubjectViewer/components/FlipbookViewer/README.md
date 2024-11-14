# Flipbook Viewer

The flipbook viewer displays subjects with multiple images in the `locations` array whose workflow configration does not include `multiFrame`. See SubjectStore > Subject > `getViewer()` and ADR 46 for more details.

This viewer assumes all images in one subject have the same dimensions, and is catered toward landscape oriented or square images. 

## Workflow Configuration

Configurable options in the project builder handled by the flipbook viewer are:
- Number of play iterations 
    - Defaults to 3
    - `workflow.configuration.playIterations`
- Autoplay (automatically start looping on page load)
    - Defaults to false
    - `workflow.configuration.flipbook_autoplay`
- Allow volunteers to switch to a separate frames view
    - Defaults to false
    - `workflow.configuration.enable_switching_flipbook_and_separate`

## Features

FlipbookControls handles the following features:
- Thumbnails of each frame (ratio inputs)
- Next and previous buttons for navigation between frames
- Play speed with five options: 0.25x, 0.5x, 1x, 2x, 4x
- Play/Pause button
- Button to switch to separate frames view

### Props
- `defaultFrame`: (number) Fetched from `metadata.default_frame` or initialized to zero in the subject viewer store.
= `enableRotation`: (function) Passed from the subject viewer store and called once the first frame image is loaded.
- `flipbookAutoplay`: (boolean) Fetched from `workflow.configuration.flipbook_autoplay` and defaults to false.
- `invert`: (boolean) Whether the image colors are inverted. Passed from the subject viewer store.
- `limitSubjectHeight`: (boolean) Fetch from `workflow.configuration.limit_subject_height` and passed to SingleImageViewer to handle CenteredLayout.
- `move`: (boolean) Passed from subject viewer store and used during panning and zooming.
- `onKeyDown`: (function) withKeyZoom() is for using keyboard pan and zoom controls while focused on the subject image.
- `onReady`: (function) Function is passed from SubjectViewer and  dimensions are added to classification metadata.
- `playIterations`: (string) Can be '', meaning infinite, or a number represented as a string. Set in the project builder and determines how many times to loop the flipbook.
- `rotation`: (number) Passed from the subject viewer store. Needed in SingleImageViewer to handle transforming (rotating) the image.
- `setOnPan`: (function) Passed from subject viewer store and used in VisXZoom.
- `setOnZoom`: (function) Passed from subject viewer store and used in VisXZoom.
- `subject`: (object) Passed from mobx store via SubjectViewer.

### State Variables
- `currentFrame`: (number) Frame index that determines `viewerSrc`.
- `playing`: (boolean) Whether or not the looping feature is playing.
