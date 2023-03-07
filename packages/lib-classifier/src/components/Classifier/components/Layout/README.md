# Layout Components

The Classifier's layout components are built specifically for certain workflow configurations. See `workflow.layout` in the `Workflow` model.

Layouts are exported as named exports from `Layout/components`.

```js
 import * as layouts from 'Layout/components'
 const WorkflowLayout = layouts[workflow.layout]
```

Or with the `getLayout` helper. If a layout isn't specified, `getLayout` falls back to the default export.
```js
  import getLayout from 'Layout/helpers/getLayout'
  const WorkflowLayout = getLayout(workflow.layout)
```

## MaxWidth

This is currently the default layout component.

On viewports smaller than 768px, the vertical grid layout displays the subject area stacked above the task area.

In the horizontal layout, the grid area ratio of `subject:task` on viewport widths 768px to 70rem is `9:5`.

In the horizontal layout, the grid area ratio of `subject:task` on viewports widths larger than 70rem is `minmax(auto,100rem):25rem`. The subject image's width is allowed to grow as viewport width increases up to a subject image width of 100rem. On extra-large viewports, the max width prevents subject images from being so large that volunteers must scroll down to see the entire image.

## NoMaxWidth

This layout is assigned to transcription-task workflows via the Worklfow.js store model. The NoMaxWidth layout allows transcription subject images to have an unlimited max width. Volunteer feedback indicated that transcription tasks are easier to accomplish when subject images are allowed to grow as much as possible in the viewport.

In the horizontal layout, the grid area ratio of `subject:task` on all viewport widths larger than 768px is `9:5`.

On viewports smaller than 768px, the vertical grid layout displays the subject area stacked above the task area.
