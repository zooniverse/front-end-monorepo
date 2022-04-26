# SingleTextViewer

The Single Text Viewer is a variant of the Subject Viewer that's used to display text media.

## Features

// TODO add information about features

## External Setup: Workflows and Subjects

### Workflow

The Workflow of the project can be configured that the Single Text Viewer should be used.

`workflow.configuration = { subject_viewer: 'singleText' }`

There is a fall back to assume rendering the Single Text Viewer if the subject has a single location with a text mime type.

### Subject

Each Subject has a single text location:

```js
subject.locations = [
  { "text/plain": "subject1234.txt" }
]
```

Note that an empty text file is not a supported subject location when creating subjects with the [PFE Project Builder](https://help.zooniverse.org/getting-started/example/#uploading-subjects-the-nitty-gritty) or with the [Panoptes CLI](https://github.com/zooniverse/panoptes-cli).
