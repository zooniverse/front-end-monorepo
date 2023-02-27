# Layout Components

The Classifier's layout components are built specifically for certain workflow task types and certain subject types. The Layout component looks for workflow task type and subject type, and returns the appropriate layout.

`default` is set in `/Layouts/helpers/getLayout.js`, and `default` will always be returned as a fallback.

## MaxWidth

This is currently the default layout component.

On viewports smaller than 768px, the vertical grid layout displays the subject area stacked above the task area.

In the horizontal layout, the grid area ratio of `subject:task` on viewport widths 768px to 70rem is `9:5`.

In the horizontal layout, the grid area ratio of `subject:task` on viewports widths larger than 70rem is `minmax(auto,100rem):25rem`. The subject image's width is allowed to grow as viewport width increases up to a subject image width of 100rem. The max width prevents subject images from being so large on extra-wide viewports that volunteers must scroll down to see the entire image.

## NoMaxWidth

This layout is assigned to transcription workflows via the Worklfow.js store model. The NoMaxWidth layout allows transcription subject images to have an unlimited max width. Volunteer feedback indicated that transcription tasks are easier to accomplish when subject images are allowed to grow as much as possible in the viewport.

On viewports smaller than 768px, the vertical grid layout displays the subject area stacked above the task area.

In the horizontal layout, the grid area ratio of `subject:task` on all viewport widths larger than 768px is `9:5`.

## MultiFrame
