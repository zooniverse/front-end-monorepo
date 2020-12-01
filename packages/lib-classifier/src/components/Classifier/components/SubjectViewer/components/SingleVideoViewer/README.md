# Single Image Viewer

The Single Image Viewer is a variant of the Subject Viewer that's used to
display image media.

// TODO: Update to validate for only allowed image media mime types

## Features

The viewer is coupled with pan and zoom functionality and defaults to render an interaction layer for drawing SVG marks on top of. This interaction layer can be disabled setting the `enableInteractionLayer` prop to false.

## External Setup: Workflows and Subjects

**Workflow**

The Workflow of the project can be configured that the Single Image Viewer should be used.

`workflow.configuration = { subject_viewer: 'singleImage' }`

There is a fall back to assume rendering the Single Image Viewer if the subject has a single location with an image media mime type, but specific configuration on the workflow is preferred. 

**Subject**

Each Subject has a single image media location

```js
subject.locations = [
  { "image/png": "tess1234.png" }
]
```
