# SingleTextViewer

The Single Text Viewer is a variant of the Subject Viewer that's used to display text media.

## Features

// TODO add information about features

## External Setup: Workflows and Subjects

### Workflow

The Workflow of the project can be configured that the Single Text Viewer should be used.

`workflow.configuration = { subject_viewer: 'singleText' }`

There is a fall back to assume rendering the Single Text Viewer if the subject has a single location with an text mime type, but specific configuration on the workflow is preferred.

### Subject

Each Subject has a single text location:

```js
subject.locations = [
  { "text/plain": "subject1234.txt" }
]
```
