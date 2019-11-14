# ADR 19: multiFrame Viewer

November 14, 2019

## Context

As part of the lib-classifier, we are developing a component for displaying multi-frame subjects in the classification interface. Initially, we referred to this viewer as the PagesViewer, but changed the name to multiFrame Viewer to reflect more general use cases. In the first iteration, we will focus on multiImage features necessary for transcription projects. As projects with different requirements, such as ecology projects, move to the new classifier, we can add new features to the filmstrip component (see decisions 6 an 7).

See the [InVision document for the Pages Viewer](https://projects.invisionapp.com/d/main#/console/12924056/393421254/preview) and Issue #1142.

## Decisions

1. **When to Render:** There will be an explicit workflow configuration (i.e., `{ subject_viewer: 'multiFrame' }`) for the multiFrame Viewer. However, as a fallback, the multiFrame subject viewer will render if (1) the subject delivered to the client has multiple frames and (2) the workflow is not configured to display all frames at once. 
2. **Number of Frames:** The multiFrame Viewer will display up to ten frames. All frames after the tenth frame will be ignored.
3. **Frame Display**: For every frame that is an image, the filmstrip will render a thumbnail of the image. The fallback for non image frames will be a dot. Later, we will need to think about subjects with mixed media frames. HTML Inputs will be used instead of HTML buttons to display each frame.
4. **Selected Image Display**: The selected image will be displayed using the SingleImageViewer.
5. **Location of Filmstrip:** The filmstrip will be located to the left of the displayed image. This will help for images that are tall as well as make the interface easier to use for volunteers navigating by keyboard or screen reader (see https://github.com/zooniverse/front-end-monorepo/issues/1262).
6. **Playing Slideshow**: Although adding a slideshow play button will be necessary for non-transcription projects, at this time, the play button is a necessary enhancement/future feature. 
7. **Collapsing Filmstrip**: Adding a button to collapse the image previews into pagination dots is an enhancement/future feature.

## Status
Proposed

## Consequences
- The workflow editor will need to be updated to communicate the new filmstrip viewer option(s)

- We should evaluate how many projects use the display-all-frames-at-once workflow configuration. This will help determine if the feature should be deprecated.

- We need to control for number of frames per subject during the subject uploading processes. It would be frustrating to learn about the frame limitation after uploading a subject set.

- For PFE projects accustom to using the dot frame pagination, we will need to replicate features like play-slideshow.
