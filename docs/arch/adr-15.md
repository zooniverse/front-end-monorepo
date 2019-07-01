# ADR 15: Drawing tools API

June 19, 2019

## Context

The way the drawing tools currently function on Panoptes-Front-End (PFE) have numerous issues including:

- Updating the classification annotation on each touch or pointer event which causes unnecessary re-rendering of the DOM
- The separation concerns are not clear between components and stores. Multiple components can update the annotation making it hard to debug or add new features to. 
  - Example: The `MarkingsRenderer` and the `FrameAnnotator` both call change handlers that update the classification annotation? Can the drawing annotation be updated by both or is one solely responsible? It is unclear by reading the code. Why does something named `MarkingsRenderer` update the annotation?


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
- Have a component, the markings renderer, that manages the rendering of previous annotation marks as read only. It will hide them if hide previous marks is toggled.
- These two components will initially use separate SVG layers that connect to the same stores. Later any duplicated code will be refactored into a higher order component.
- Have a multi-image subject viewer that will create an interactive layer and markings renderer for each frame. Each interactive layer will initialize its own event stream. We will have to continue to support the configuration of having drawing marks across all frames and of independent marks for each frame. TODO: example of what these mean and how they will be accomplished.

## Status

Proposed

## Consequences

- This is the first time rx.js will be used in our code and there will be a learning curve.
- The current feedback code may need refactoring as it is written only for the D3.js interactive plot subject viewers.
