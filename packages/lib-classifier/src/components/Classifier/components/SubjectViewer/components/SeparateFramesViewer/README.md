# Separate Frames Viewer

The separate frames viewer displays subjects with multiple images in the `locations` array. As of now, it can only be enabled if viewing the flipbook viewer first, and then switching to the separate frames view.

## Features

Configurable options in the project builder handled by the separate frames viewer are:
- Layout
    - Defaults to 1-column (`col`)
    - All options are `col`, `grid2`, `grid3`, `row`

Choosing the appropriate separate frames viewer layout is up to the project team. For instance, a subject with portrait-oriented images will easily be displayed in a 3-column grid in constrast to a subject with landscape-oreinted images which would work best in a 1-column layout.

Regardless of the selected layout, the component code will switch to the 1-column layout when an individual frame's width in the browser is less than `minFrameWidth`.

### Props
- `onError`: (function) Function passed from SubjectViewer and called if `useSubjectImage()` hook fails.
- `onReady`: (function) Function is passed from SubjectViewer and  dimensions are added to classification metadata.
- `subject`: (object) Passed from mobx store via SubjectViewer.

## SeparateFrame Component

This repeatable component is designed to include an image toolbar that affects only one frame. This is in contrast to the generalized ImageToolbar in the classifier layout components that relies on the subject viewer store to handle pan, zoom, rotate, and invert state. In SeparateFrame, local state is used for those features instead.
