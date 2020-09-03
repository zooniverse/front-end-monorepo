# Drawing Tools

This directory holds React components and MobX State Tree models for the drawing tools that are available to the drawing task.

Experimental tools should be added to `drawingTools/experimental`.

## React Components

`import { Point } from '@plugins/drawingTools/components'`

A React component for a mark takes a Mark model and renders it as SVG. The basic shape is:
```jsx
const MarkComponent = mark.toolComponent
<MarkComponent active mark={mark} scale={scale} onFinish={onFinish} />
```

 - _mark_ is the mark model to render.
 - _scale_ is the linear scale of the subject image (_clientWidth_ / _naturalWidth_).
 - _active_ is a boolean attribute indicating whether the mark is currently editable.
 - _onFinish_ is a callback that should be called when initial creation of the mark is complete. It resets the drawing canvas and tells it to start listening to clicks to create new marks again.

## Tool models

`import { PointTool } from '@plugins/drawingTools/models/tools'`

The [base Tool model](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/plugins/drawingTools/models/tools/Tool) defines the following common properties and actions for all drawing tools.
- _color (string)_
- _label (string)_
- _max (number = Infinity)_
- _min (number = 0)_
- _details (array)_ An array of task definitions for this tool eg. a text task for a transcription line tool. Task definitions are in the same format as workflow task definitions and can be passed to Task models.
- _tasks (Map)_ A map of Tasks for the subtasks of this tool. Automatically generated from `tool.details`.
- _disabled (boolean)_ Read only. True if new marks cannot be created.
- _isComplete (boolean)_ Read only. True if all required marks have been made and all required mark tasks have been annotated.
- _createMark(snapshot) (Mark)_ Returns a new mark from the supplied snapshot, and stores it.
- _createTask(snapshot) (Task)_ Returns a new task from the supplied snapshot, and stores it.
- _deleteMark(mark)_ Removes the specified mark from this tool.

All tools should extend the Tool model by implementing the following:
- _marks_: a map of mark types for this particular tool eg. `types.map(Line)` for the Line tool.
- _type_: a string uniquely identifying this type of tool.
- _createMark(snapshot)_: an action which creates a new mark from the supplied snapshot, then stores it in `self.marks`.

## Mark models

`import { Point } from '@plugins/drawingTools/models/marks'`

The [base Mark model](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/plugins/drawingTools/models/marks/Mark) defines common properties and actions for all marks.
- _id (string)_ Mark identifier. Automatically generated when a mark is created by a tool.
- _annotations (Map)_ A map of annotations created on this mark by tool tasks.
- _frame (number = 0)_ The subject frame that this mark was made on.
- _toolIndex (number)_ The array index of the tool that created this mark.
- _isComplete (boolean)_ Read only. True if all required tasks have been annotated for this mark.
- _isValid (boolean)_ Read only. True if any required validations pass for this mark (eg. minimum length for a line.)
- _tasks (array)_ Read only. An array of any sub-tasks linked to this mark eg. a text task for a transcription line.
- _tool (Tool)_ Read only. A reference to the tool that created this mark.
- _addAnnotation(task, value)_ Add `value` to the annotation for `task`, which should be a valid task for this mark.

All marks should extend the Mark model by implementing the following views and actions:
- _coords (Object { x, y })_ Read only. Returns the `{ x, y }` coords for this mark.
- _deleteButtonPosition(scale) (Object { x, y })_ Given the image scale, return the `{ x, y }` position for this mark's delete button.
- _toolComponent (React.Component)_ Read only. Returns the React component used to render this mark.
- _initialDrag({ x, y })_ Called on drag when first creating the mark. `{ x, y }` are the new position of the dragged pointer in the frame of the subject image.
- _initialPosition({ x, y })_ Called on initial click/tap when creating the mark. `{ x, y }` are the position of the pointer in the frame of the subject image.
- _move(difference)_ Called on drag when moving the mark. `difference` is the change in position since the last move: `{ x, y }`.
- _setCoordinates(Object)_ Passes in a new set of coordinates for the current shape. The object passed in will depend on the type of shape being described (eg. `{ x1, y1, x2, y2 }` for an SVG line.)

In addition, mark models should extend the base Mark model with any properties specific to the new shape. These mark properties will be passed to Panoptes as the annotation for this mark. Marks may specify the following properties, which have a special meaning when rendering marks.

- _angle (number)_ Rotation angle of the mark in degrees, measure clockwise from the positive x-axis.
- _x (number)_ x position of the mark's centre of rotation, in SVG coordinates relative to the subject image.
- _y (number)_ y position of the mark's centre of rotation, in SVG coordinates relative to the subject image.

## Working with tools and marks
```js
// Create a new drawing tool.
const tool = TranscriptionLine.create({
  color: 'green',
  label: 'Transcribe a line',
  type: 'transcriptionLine'
})

// Add a text task to a drawing tool.
// NB. This is done automatically by the DrawingTask model
// when a tool has tool.details defined.
tool.createTask({
  taskKey: 'T0.0.0',
  instruction: 'Transcribe the marked line.',
  required: 'true',
  type: 'text'
})

// draw some lines.

const line1 = tool.createMark({
  id: 'line1'
  x1: 10,
  y2: 10,
  x2: 200,
  y2: 10
})

const line2 = tool.createMark({
  id: 'line2'
  x1: 10,
  y2: 20,
  x2: 200,
  y2: 20
})

// render subtasks for a mark.

line1.tasks.map(task => renderTask(task))

// add some text to each drawn line.

const task = tool.tasks[0]

let annotation = line1.addAnnotation({ task })

task.setAnnotation(annotation)

task.updateAnnotation('Hello! This is the first line.')

annotation = line2.addAnnotation({ task })

task.setAnnotation(annotation)

task.updateAnnotation('This is the second line of text.')

// check if a line has been completed.

if ( line1.isComplete ) {
  …
}
```
