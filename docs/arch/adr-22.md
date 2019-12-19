# ADR 22: Drawing tools

## Context

With new drawing tools being developed for the classifier, we need an API that's common to all drawing tools and marks, which can be easily extended by tool developers. This document lays out an overview of the drawing tool model and the public interfaces common to all tools and all marks.

To support drawing, the subject viewer also needs to support:
- rendering a static list of marks from previous drawing task annotations.
- interacting with pointer events to create, edit and delete new marks for the current drawing task annotation.

## Decision

### The subject viewer

The subject viewer will render two components.
- _DrawingToolMarks_ takes an array of marks from drawing task annotations in the classification and renders it as a static, read-only list.
- _InteractionLayer_ wraps a _DrawingToolMarks_ component and adds pointer event support, so that the rendered array of marks can be edited and updated. THis component only acts on marks for the active drawing task.

Marks created by the _InterctionLayer_ are added to a new drawing task annotation, for the current classification, when we click Next or Done to complete the current task.

### The drawing model

A drawing task has drawing tools. Each tool creates marks. On task completion, a drawing annotation is created, which is an array of all drawn marks. Each mark has a corresponding React component which renders the SVG for that particular shape.

## Status

Proposed

## Consequences

### Filesystem

Drawing tools are stored in `lib-classifier/src/plugins/drawingTools`, in three directories:
- _components_: React components that render marks (one for each Mark model) and any helper functions and components.
- _models_: MobX State Tree models for drawing tools and marks.
- _experimental_: Experimental drawing tools, itself subdivided into components and models.

### The drawing tools API

The drawing API is described in detail in the [drawing tools README](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/plugins/drawingTools/README.md).

```js
// get the current drawing tool
const tool = drawingTask.activeTool
// make a mark
const point = tool.createMark({ id:'point1', x: 50, y: 100 })
// move that mark by 100px to the right
mark.move({ x: 100, y: 0 })
// get a subtask
const task = mark.tasks.get('T0.0.0')
// annotate a subtask
mark.addAnnotation(task, 'This is a text annotation.')
```

