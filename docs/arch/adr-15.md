# ADR 15: Drawing tools API

Created: June 19, 2019
Updated: October 31, 2019

## Context

The way the drawing tools currently function on Panoptes-Front-End (PFE) have numerous issues including:

- Updating the classification annotation on each touch or pointer event which causes unnecessary re-rendering of the DOM
- The separation concerns are not clear between components and stores. Multiple components can update the annotation making it hard to debug or add new features to. 
  - Example: The `MarkingsRenderer` and the `FrameAnnotator` both call change handlers that update the classification annotation? Can the drawing annotation be updated by both or is one solely responsible? It is unclear by reading the code. Why does something named `MarkingsRenderer` update the annotation?
- Drawing tools have a complex API that involves exposing static methods to be called by their parent component
- Annotation / classification payloads have no consistent standards for describing data: some tools mark rotation in differing directions, for example.

## Decision

What we do not want to do:
- Re-render on every pointer or touch event.
- update annotation state while drawing is in progress.
- support more than one drawing task in a step.
- Use D3.js since it has its own internal data store and it would be complicated to integrate that with a observable stream.

What we do want to do:
- Have a component, the interactive layer, that manages the interaction with the marks and pointer and touch events.
  - The interactive layer should not allow events to bubble so the events are encapsulated to just the interaction with the subject. This is to help prevent browser scroll during drawing. An attempted fix on PFE for reference: zooniverse/Panoptes-Front-End#5411
  - Events will be observed and be streamed via an observable. We will use rx.js to create an observer/observable event stream.
  - The last state of the event stream will be used to add an annotation to the classification when next or done is clicked.
  - The interactive layer will have local component state to keep track of which mark is selected for editing as well as handle the edit and delete events. 
- Have a component, the markings renderer, that manages the rendering of previous annotation marks as read only. It will hide them if hide previous marks is toggled.
- These two components will initially use separate SVG layers that connect to the same stores. Later any duplicated code will be refactored into a higher order component.
- Have a multi-image subject viewer. We will have to support projects that want each frame to have independent drawing annotations as well as projects that want each frame to have the same drawing annotations. Each frame should have the same pan/zoom function. We have two proposed options in implementation:
  -  Create an interactive layer and markings renderer for each frame. Each interactive layer will initialize its own event stream.
  - Create a single interactive layer and markings renderer and filter what is rendered by the frame index.
  - Projects have requested each frame to have the same pan/zoom function, but we were unable to implement in PFE: zooniverse/Panoptes-Front-End#3465
    - Are there any cases where projects want separate pan/zoom function for each frame?
- Have a schema, or set of schemas, describing annotations.

## Status

Accepted

## Consequences

- This is the first time rx.js will be used in our code and there will be a learning curve.
- The current feedback code may need refactoring as it is written only for the D3.js interactive plot subject viewers.

### rx.js use

We had an early prototype at the start of this proposal using rx.js. This library is an implementation of the proposed observable specification for javascript and has an API for use with browser DOM events. After several months of experimentation, we have decided that we will proceed with implementing the drawing tools just with the browser pointer events API and potentially integrate rx.js at a later date as an enhancement.

In retrospect, trying to incorporate rx.js increased the complexity for implementation and for learning and contributed to delays. For future experiments, we should be sure to structure how we'll go about the experiment including evaluation milestones for its use from the start. 
