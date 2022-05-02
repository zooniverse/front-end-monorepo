# ImageAndTextViewer

The Image and Text Viewer is a variant of the Subject Viewer that's used to display a single image or single text media, with a toggle to switch between which media file is displayed.

## Features

// TODO add information about features

## External Setup: Workflows and Subjects

### Workflow

The Workflow of the project can be configured that the Image and Text Viewer should be used.

`workflow.configuration = { subject_viewer: 'imageAndText' }`

There is a fall back to assume rendering the Image and Text Viewer if the subject has a single location with an image mime type and a single location with a text mime type (two total locations).

### Subject

Each Subject has a single image location and a single text location:

```js
subject.locations = [
  { "image/png": "imageSubject1234.png" },
  { "text/plain": "textSubject1234.txt" }
]
```

Note that an empty text file is not a supported subject location when creating subjects with the [PFE Project Builder](https://help.zooniverse.org/getting-started/example/#uploading-subjects-the-nitty-gritty) or with the [Panoptes CLI](https://github.com/zooniverse/panoptes-cli).
