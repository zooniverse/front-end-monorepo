# ADR 15: Drawing tools API

June 19, 2019

## Context

The way the drawing tools currently function on Panoptes-Front-End (PFE) have numerous issues including:

- Re-rendering the DOM more than necessary
- Updating the classification annotation on each touch or pointer event

Both of these can cause significant performance issues.

- The separation concerns are not clear between components and stores. Multiple components can update what is being rendered making it hard to debug or add new features to. 

## Decision

What we do not want to do:
- Re-render on every pointer or touch event.
- update annotation state while drawing is in progress.
- support more than one drawing task in a step.
- Use D3.js since it has its own internal data store and it would be complicated to integrate that with a observable stream.

What we do want to do:
- Have a component, the interactive layer, that manages the interaction with the marks and pointer and touch events.
  - It should not allow events to bubble so the events are encapsulated to just the interaction with the subject. This is to help prevent browser scroll during drawing.
  - Events will be observed and be streamed via an observable. We will use rx.js to create an observer/observable event stream.
  - The last state of the event stream will be used to add an annotation to the classification when next or done is clicked.
- Have a component, the markings renderer, that manages the rendering of previous annotation marks as read only. It will hide them if hide previous marks is toggled.
- These two components will initially use separate SVG layers that connect to the same stores. Later any duplicated code will be refactored into a higher order component.

## Status

Proposed

## Consequences

- This is the first time rx.js will be used in our code and there will be a learning curve.
- The current feedback code may need refactoring as it is written only for the D3.js interactive plot subject viewers.
- How do we integrate this with multi-image subjects?
