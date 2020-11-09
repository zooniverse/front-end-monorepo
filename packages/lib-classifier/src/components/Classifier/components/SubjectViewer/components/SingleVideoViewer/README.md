# Single Video Viewer

The Single Video Viewer is a variant of the Subject Viewer that's used to
display video media.

// TODO: Update to validate for only allowed video media mime types

## Features

The viewer is coupled with pan and zoom functionality and defaults to render an interaction layer for drawing SVG marks on top of. This interaction layer can be disabled setting the `enableInteractionLayer` prop to false.

## External Setup: Workflows and Subjects

**Workflow**

The Workflow of the project can be configured that the Single Video Viewer should be used.

`workflow.configuration = { subject_viewer: 'singleVideo' }`

There is a fall back to assume rendering the Single Video Viewer if the subject has a single location with an video media mime type, but specific configuration on the workflow is preferred.

**Subject**

Each Subject has a single video media location

```js
subject.locations = [
  { "video/mp4": "tess1234.mp4" }
]
```
