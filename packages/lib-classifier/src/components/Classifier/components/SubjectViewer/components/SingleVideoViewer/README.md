# Single Video Viewer

The Single Video Viewer is a variant of the Subject Viewer that's used to
display video media.

The only allowed video media type is mp4.

## Features

// TODO Will be updated as the new video feature is built.

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
