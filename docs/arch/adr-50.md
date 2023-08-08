# ADR 50: Separate Frames Viewer

May 2023


## Context

To support non-transcription projects that use multi-image subjects, we built a separate frames viewer with the same features and some additional features as the PFE frontend app. This subject viewer displays when `workflow.configuration.multi_image_mode` is `separate`, or if `subjectViewer.separateFramesView` is toggled to `true` from the flipbook viewer. A subject should have more than one location and all locations are images.

 There is a plan to add fine-grained choice of subject viewer to the project builder in the future, but any relevant changes to the separate frames viewer will be discussed in another ADR.


## Features

Configurable options in the project builder handled by the separate frames viewer are:
- Layout
    - Defaults to 1-column (`col`)
    - All options are `col`, `grid2`, `grid3`, `row`
- Choose whether to clone drawn marks between all frames
    - Defaults to false
    - `workflow.configuration.multi_image_clone_markers`

Choosing the appropriate separate frames viewer layout is up to the project team. For instance, a subject with portrait-oriented images will easily be displayed in a 3-column grid in constrast to a subject with landscape-oreinted images which would work best in a 1-column layout.

Regardless of the selected layout, the component code will switch to the 1-column layout when an individual frame's width in the browser is less than `minFrameWidth` as defined in SeparateFramesViewer.js.

Note that `enable_switching_flipbook_and_separate` in WorkflowConfiguration store enables the "switch to separate frames view" in Flipbook Controls.

### SeparateFrame Component

The separate frames viewer has a repeatable component that is designed to include an image toolbar affecting only one frame. This SeparateFrame component is in contrast to the generalized ImageToolbar in the classifier layout components, which relies on the subject viewer store to handle pan, zoom, rotate, and invert state. In SeparateFrame, local state is used for those features instead.

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
