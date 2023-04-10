# Freehand Line Drawing Tool

The `Freehand Line` tool is an svg element using the `<path>` element. See [Path Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) if unfamiliar. The intention of the tool is to draw one or more partial or completed irregular circles - the `<path>` - on an image subject. Additionally, the user is able to splice/edit their `<path>` to correct an irregularity, which could come from a machine annotation or accidental user input. The complexity of this tool is in maintaining a full undo/redo internal state while creating, extending, editing, and closing the path. The most complex aspect is in maintaining a true undo/redo history while splicing a closed `<path>` and the potential removal of the existing start and end points of the `<path>`. All of this complexity in state is constrained to the `Freehand Line Model`.

## Goals
- User is able to start drawing a `<path>` anywhere on the subject
- User is able to extend an existing, unclosed `<path>`
- User is able to close an unclosed `<path>`
- User is able to edit/splice an existing, unclosed or closed `<path>` to correct part of the path
- User is able to undo all actions performed on the `<path>`
- User is able to redo all undone actions performed on the `<path>` until a new action is performed and destroys the redo saved state

## Configuration
- User is able to configure the line resolution to accomodate preferred `<path>` thickness
- User is able to configure the minimum points a `<path>` should have to be considered a valid `<path>`
- User is able to configure the minimum poitns to create a new Undo action

## Initial Drawing Path Model

### External Model State
```javascript
{
	pathX: types.array(FixedNumber),
  pathY: types.array(FixedNumber),
}
```

When the `<path>` is considered complete and sent to the API, it is sent as an array of x coordinates and an array of y coordinates.

### Internal, Volatile Model State
```javascript
{
  scale: types.number,
  lineResolution: types.optional(types.number, 0.5),
  minimumPoints: types.optional(types.number, 20),
  undoActionPointThreshold: types.optional(types.number, 20),

  points: types.array(SingleCoord),
  dragPoint: types.maybeNull(SingleCoord),
  closePoint: types.maybeNull(SingleCoord),
  pathIsClosed: types.boolean,
  isDragging: false,

  spliceActive: types.boolean,
  spliceReverse: types.boolean,
  spliceThroughBeginning: types.boolean,
  spliceDragPointIndex: types.maybeNull(types.number),
  spliceClosePointIndex: types.maybeNull(types.number),
  splicePoints: types.array(SingleCoord),

  drawActions: types.array(ActionType),
  redoActions: types.array(ActionType),
}
```

Internally, the `<path>` details are stored as an array of `{ x, y }` coordinate objects in the `points` object property. The `dragPoint` indicates the point from which a `<path>` can be extended, or in the case of splicing, is the starting point for the splice. The `closePoint` is the point for which a `<path>` will close which, when unclosed, is the starting point. In the case of splicing, the `closePoint` is the desired end point for the splice action and is proactively chosen by the user. The `pathIsClosed` property is used internally by the model to determine if a `dragPoint` or `closePoint` should be set and displayed. The `isDragging` parameter is used for managing `<path>` extension, specifically tracking `mousedown` and `mouseup` user actions.

The `spliceActive`, `spliceReverse`, `spliceThroughBeginning`, `spliceDragPointIndex`, `spliceClosePointIndex`, and `splicePoints` properties are used to manage active splice state across any undo/redo action state.

The `drawActions` and `redoActions` are an array of objects that contain the successive series of actions that a user has performed. If given an array of valid `drawActions`, the `Freehand Line Model` could successfully draw the user's path. This is used extensively within the tests for this tool.

### Methods

- `initialize(points=[])`

When the tool's model is initiliazed, this method is invoked to setup the internal state. It is passed an array of `{ x, y }` coordinate objects and sets up the `dragPoint`, `closePoint`, and `pathIsClosed` attributes along with sane defaults for all other state properties.

- `isValid()`

A path is only created if a user has clicked and dragged long enough to add the minimum number of coordinates set in the `minimumPoints` property. By default this is 20.

- `closeDistance()`

A path or splice action will autoclose when the `dragPoint` is within 10 scale-adjusted pixels of the `closePoint`. 

- `isCloseToStart()`

This method performs the mathematical calculation for `closeDistance()`

- `pointDistance(p1, p2)`

Calculates the distance between the points `p1` and `p2`

- `findClosestPathPointIndex({ x, y })`

Finds the closest existing `<path>` point to a given `{ x, y }` pair.

- `visiblePathsRender()`

The model translates its internal state into potentially three arrays of `{ x, y }` points for svg rendering. The three potential paths are:

1. Path start point to splice start point or end point
2. Splice start point or end point to path end point
3. Splice start point to splice dragPoint

- `splicePathRender()`

If in a splicing state, this method returns the to-be-removed partial path of points.

- `toData()`

Returns the existing volatile model state object and is used for debugging purposes in the model tests.

- `setDragPoint(point)`, `setClosePoint(point)`, `setScale(scale)`, `setLineResolution(lineResolution)`, `setMinimumPoints(minimumPoints)`, `setUndoActionPointThreshold(undoActionPointThreshold)`,

All of the above are convenience methods describing their intended purpose.

- `initialPosition(event)`

When a user clicks and drags, this is the first method invoked by the parent component and kicks off internal state build and managing/watching for user drag events. It is a required/expected method.

- `initialDrag(point)`

When a user drags after the initial click to create a new `<path>` is invoked, this method handles all drag events. It is a required/expected method invoked by the parent component.

- `close()`

Method that proxies externally-initiated requests to close the existing, unfinished `<path>`.

- `appendPathStart()`

This method is invoked on the `mouseDown` event to extend an existing `<path>` or extend a path in a splice state.

- `appendPath({ x, y })`

This method is invoked on the `mouseMove` event after the `appendPathStart()` method has been invoked. It remains active until the path is closed, the `dragPoint` is within closing distance to the `closePoint` or the user releases the mouse button.

- `appendPathEnd()`

This method is invoked on the `mouseUp` event and ends the current user append or edit activity.

- `closePath()`

Manages the internal model state when either the splice path is closed or when the base `<path>` is closed. Proxies to `closeSplice()` for splices.

- `closeSplice()`

Manages the internal model state upon completion of a splice. Very complex in that the spliced portion of the `<path>` has to handled for all cases: open/closed paths, forward/reverse direction, and removal of existing start/end points in the closed path state.

`undo()`

Performs complementary model state change to each action to return it to a former state. Each undo action object is moved to the `redoActions` property once completed.

`redo()`

Undo the undo. Each redo action is moved to the `undoActions` property once completed.

- `redoActionsClear()`

After several actions have been undone, there is the ability to redo those actions. This method destroys those actions upon new drawing/splicing actions.

`splicePathDragPoint(point)`

Manages the internal model state changes when the user double clicks to create a `spliceDragPoint`.

- `splicePathClosePoint(point)`

Manages the internal model state changes when the user clicks to create a `spliceClosePoint`.

- `splicePathSetup()`

Sets up the internal model state for splicing after `splicePathDragPoint()` and `splicePathClosePoint()` have been invoked.

- `spliceReset()`

Clears internal model splice state.

- `move()`

Required method from parent component that is unused. It is not desired to be able to move/translate the `<path>` in this context.

- `inactive()`

When the user clicks outside of an active path, particularly while in a splicing state, this method undoes all incomplete splicing activity.

- `finish()`

This method is invoked twice - once upon the initial path `mouseup` event and when the user clicks to complete the subject classification entirely. In the first scenario, we ensure the `<path>` is a valid path otherwise it is destroyed. In the second scenario, we convert the internal `{ x, y }` representation to the final model `{ pathX: [], pathY: [] }` data structure for API ingestion.
