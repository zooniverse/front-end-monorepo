# ADR 49: Flipbook Viewer

May 2023


## Context

To support non-transcription projects that use multi-image subjects, we built a flipbook viewer with the same features as the PFE frontend app. This subject viewer displays when `workflow.configuration.viewer` is undefined and a subject has more than one location and all locations are images.

This viewer assumes all images (locations) in a subject have the same dimensions, and is catered toward landscape oriented or square images.

There is a plan to add fine-grained choice of subject viewer to the project builder in the future, but any relevant changes to the flipbook viewer will be discussed in another ADR.


## Features

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
- Choose whether to clone drawn marks between all frames
    - Defaults to false
    - `workflow.configuration.multi_image_clone_markers`

### Flipbook Controls

- Thumbnails of each frame (ratio inputs) as navigation buttons
- Next and previous buttons for navigation between frames
- Play speed selection with five options: 0.25x, 0.5x, 1x, 2x, 4x
- Play/Pause button
- Button to switch to separate frames view

### With Drawing Tasks

When "Clone markers in all frames" is checked/enabled in the project builder:
- A drawn mark such as a circle should appear on every frame of the flipbook viewer
- The frame that the volunteer added the mark to should still be recorded in its annotation. To implement this feature, refactoring of InteractionLayer's handling of "current frame" is needed
- If a volunteer drags a mark to a new position, that new position should display in all frames

When "Clone markers in all frames" is unchecked/disabled in the project builder:
- A drawn mark should appear only on the frame where it was initially drawn.
- The frame that the volunteer added the mark to should be recorded in its annotation (similar to MultiFrameViewer used for transcription projects)
- If a volunteer drags a mark to a new position, that new position should only apply to the dragged mark


## Status
Accepted
