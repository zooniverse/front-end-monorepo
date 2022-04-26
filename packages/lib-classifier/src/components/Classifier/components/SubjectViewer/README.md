# Subject Viewers

A subject viewer is a component designed to render the media of a subject and annotate on top of it if using a certain task type. Workflows going forward should be specifically configured to render a certain viewer. Programmatically selecting a viewer should only be a fallback condition. The configuration can be set per workflow on the admin page of the project at this time. IN the future, a new workflow editor lab page should include an interface for project builders to be able to set this themselves as well as any expected additional configuration for the viewer itself.

## Subject Viewer Types

### Images

- [`SingleImageViewer`](components/SingleImageViewer/README.md) - renders a single image subject. Supports the `InteractionLayer` and pan and zoom.
- [`MultiFrameViewer`](components/MultiFrameViewer/README.md) - renders multi-image subjects up to 10 frames. The currently selected frame is rendered with the `SingleImageViewer` with a sidebar to select the others. Because the selected frame renders with the `SingleImageViewer`, this then supports the `InteractionLayer` as well as pan and zoom for images, too. This has the capacity to be extended to support other media times to render image, video, and text in a flipbook UI style. This should be the standard fallback viewer for multi-media subjects. (Extending to render other media times is TBD).

### Text

- [`SingleTextViewer`](components/SingleTextViewer/README.md) - renders a single text subject.

### Video

- [`SingleVideoViewer`](components/SingleVideoViewer/README.md) - renders a single mp4 video. Supports the `InteractionLayer`.

### JSON

- [`ScatterPlotViewer`](components/ScatterPlotViewer/README.md) - renders JSON conforming to a particular convention as an interactive scatter plot. Supports pan and zoom as well as several other configurations at per workflow, per subject, or per data series. Used in several complex composite subject viewers.
- [`BarChartViewer`](components/BarChartViewer/README.md) - renders JSON conforming to a particular convention as an interactive bar chart. Currently only used in the `VariableStarViewer`, but in theory could be used on its own.
- [`LightCurveViewer`](components/LightCurveViewer/README.md) - renders JSON specifically for the Planet Hunters TESS project and coupled with its particular annotation task. This could be reused with other projects if they want to do exactly what PH TESS does, but going forward, the `ScatterPlotViewer` is preferred and the SPV should [enhanced to support a variety of annotation tools](https://github.com/zooniverse/front-end-monorepo/discussions/2421).

### Complex composites

- [`VariableStarViewer`](components/VariableStarViewer/README.md) - renders JSON and an image media file for a composite of two scatter plots, two bar charts, and an image. Supports pan and zoom for each scatter plot independently as well as project specific interactive tools for the scatter plots.
- [`DataImageViewer`](components/DataImageViewer/README.md) - renders JSON as a scatter plot and an image media file side by side. Supports pan and zoom for the scatter plot and image independently.
- [`SubjectGroupViewer`](components/SubjectGroupViewer/README.md) - renders a group of subjects each with their own single image media file. This is meant to only work with the subject group comparison task. Supports pan and zoom for all subjects simultaneously as well as some configurations for rendering.
- [`ImageAndTextViewer`](components/ImageAndTextViewer/README.md) - renders a single image or a single text media file, with a toggle to switch between which media file is displayed.

## Helper components

### Pan and Zoom

Currently, we have four implementations of pan and zoom functionality. An open [discussion](https://github.com/zooniverse/front-end-monorepo/discussions/2427) is on Github about how we support this overall and suggests consolidating where we can to use the VisX implementation so we can better support configuration and zoom to point since the VisX implementation already does. The documentation here will just be summarizing the types and where they are used.

- [`VisXZoom`](components/SVGComponents/VisXZoom) - An extension of the VisX library's pan and zoom functional component. Uses a transformation matrix, boolean control for zoom and pan individual to turn the functions on and off as needed, has configurability for zoom direction, minimum zoom, maximum zoom, zoom in value, and zoom out value, and supports zoom to point. Currently implemented with the `ScatterPlotViewer`, the scatter plots used by the `VariableStarViewer`, and the scatter plot used by `DataImageViewer`. It uses the [`ZoomEventLayer`](components/SVGComponents/ZoomEventLayer) which is a transparent SVG rectangle that has event listeners for double click, on wheel, on key down, on mouse down, on mouse up, on mouse enter, and on mouse leave. Subject viewers using this should set as props the width, height, left and top points of the SVG area to render, as well as, the child subject viewer component to render, a zoom configuration object, and optionally a custom [constrain](https://airbnb.io/visx/docs/zoom#Zoom_constrain) function enabling the ability to constrain pan and zoom directionality and/or pan dimensions. An example of this implementation is used with the [`ZoomingScatterPlot`](components/ScatterPlotViewer/ZoomingScatterPlot). The zoom configuration can be set in the workflow configuration [`subject_viewer_config`](https://github.com/zooniverse/front-end-monorepo/blob/master/docs/arch/adr-27.md) object or in the JSON of a JSON subject. (NOTE: TODO is to finish building out support for configuration being set on the workflow configuration object).
- [`SVGPanZoom`](components/SVGComponents/SVGPanZoom) - A port of the PFE pan and zoom functionality being used with the `SingleImageViewer` and subsequently the `MultiFrameViewer` and anywhere else the `SingleImageViewer` may be used. It does scale transformations on the SVG view box. 
- [`D3`](components/LightCurveViewer) - Since the TESS light curve viewer's render and functionality is transferred to d3, the pan and zoom functionality is directly implemented using d3 and is coupled to the project requirements. This cannot be reused with other subject viewers.
- [`SubjectGroupViewer`](components/SubjectGroupViewer) - This uses a modified version of `SVGPanZoom`, but applies the scale transformation of the view box simultaneously to all subjects in the grid.

### Drawing Interaction

- [`InteractionLayer`](components/InteractionLayer) - A transparent SVG rectangle layered on top of images used with the `SingleImageViewer` and the `SingleVideoViewer` that has event listeners for the pointer events for drawing SVG shape annotation marks on the subject image or video. This layer contains several children components:
  - [`DrawingToolMarks`](components/InteractionLayer/components/DrawingToolMarks) - This is the rendering component of the SVG shape marks actively being drawing by the volunteer. It handles whether a mark is in bounds of the viewer area as well as certain event handling for movement, selection, and deletion of an individual mark.
  - [`PreviousMarks`](components/InteractionLayer/components/PreviousMarks) - This is the rendering component of the SVG shape marks made from previous drawing tasks in previous workflow steps, but during the same classification session.
  - [`SubTaskPopup`](components/SubTaskPopup) - This is the movable pop up modal rendered on click of marks that are associated with a drawing task with a defined set of subtasks to be answered per mark.
  - [`TranscribedLines`](components/TranscribedLines) - This is the rendering component for Caesar reductions of transcriptions made by volunteers from other sessions. It contains the logic for handling when a new mark is created from the previous transcription if the line has not reached consensus or if the line has reached consensus, then to render the completed line and open a modal pop up containing the data that contributed toward consensus.

## Other

- [`ZoomControlButton`](components/ZoomControlButton) - This is a button component that can be used to provide a toggle for when to enable pan and zoom for a particular subject viewer. Currently used by the complex composite viewers of `VariableStarViewer` and `DataImageViewer`.
- [`VideoController`](components/VideoController) - The button toolbar of controls for playing, pausing, and scrubbing a video.
- [`withKeyZoom`](../withKeyZoom/README.md) - A Higher Order Component that can wrap other components to provide keyboard key event listeners for controlling zoom on the subject.
- [`ImageToolbar`](../../../ImageToolbar/README.md) - a side toolbar to control pan, zoom, rotation, and possibly other transformations. A misnomer now since it also is wired up to work with scatter plots. Could potentially have added toggle for full screen mode for certain media types once that layout is implemented. Also contains the launch button for the field guide.
- [`MetaTools`](../../../MetaTools) - a set of buttons rendering below the subject viewer that include displaying a modal popup to view the subject metadata, an add to favorites collections button, an add to any collection button opening a modal, and optionally a toggle to hide previous drawing marks if a drawing task is active in the workflow step.

## Adding new subject viewers

Any new subject viewer whether it's a rendering one type of media or a composite rendering a more complex layout with multiple types of media, all subject viewers should be wrapped by a store connector and a state container component. The store connector should:

- Connect to the `SubjectStore` to pass down the active subject
- Connect to the `SubjectViewerStore` to pass down the `setOnZoom` and `setOnPan` handlers which are used by pan and zoom functionality to wire up the sidebar pan and zoom buttons. Optionally, some viewers may also get addition actions depending on their specific viewer functionality from the `SubjectViewerStore` passed down: `enableAnnotate`, `enableMove`, `enableRotation`, `frame`, `move`, `rotation`, and `setFrame`.
- From the parent `SubjectViewer` as props, `onError` and `onReady`, also from the derived from `SubjectViewerStore`.

The state container component should:

- During mount and on prop change if the subject has changed (either using class lifecycles or a use effect hook), retrieve the subject media location URLs from the subject resource.
- The media source for image and video subjects should be passed down the the HTML element `src` attribute
- For all media, there should be a defined `onLoad` event after the media location is known. What this event does depends on the media type:
  - For images, a preloaded browser `Image` object is created asynchronously as well as client size dimensions retrieved from it by `getBoundingClientRect`
  - For video, an HTML video element is created and client sizes derived from a reference on the SVG rectangle layer wrapping the `InteractionLayer` using `getBoundingClientRect`
  - For JSON, an asynchronous request for the JSON data, parse it, then store it in local component state. Optionally the data can have any required transformations calculated and also stored in component state. The client size dimensions are derived from a wrapper `div` HTML element using a reference and `getBoundingClientRect`.
- Once `onLoad` is completed successfully, `onReady` is called with a parameter to store the client sizes which later get added to the classification metadata.
- If the `onLoad` event fails, then `onError` should be called with the error message.

The return render should be the child subject viewer that has the needed required props passed to it.

The container components for the complex subject viewers like the `VariableStarViewer` and the `DataImageViewer` handle the load of multiple media types as well as may handle data transformations and other component states relevant to the composite, i.e. if pan and zoom is enabled or disabled for one of them. The complex viewers should also have a grid layout defined for how to render all the individual viewers together.

## Future Enhancements

Some immediate enhancements can be:

- An audio media viewer
- A spectrogram viewer containing audio, an image, and additional controller functionality.
- Media support to the `MultiFrameViewer` beyond images
- Refactoring `SingleImageViewer` to use `VisXZoom`
- Implementing the additional layouts design including full screen. 
