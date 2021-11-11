# Freehand Line Drawing Tool

The `Freehand Line` tool is an svg element using the `<path>` element. The `<path>` element is defined by one parameter: `d`. The `d` attribute can be made of up several different commands and parameters. See [Path Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) for a full list.

## Path Commands used in Freehand Line tool

M - `Move To`: This is the starting point and will be the first x and y coordinate for a `<path>`.

L - `Line To`: This takes an x and y coordinate and draws a line from the current position to a new position. As a user draws with the `Freehand Line` tool, many x and y coordinates will be appended to this `L` command.

Z - `Close Path`: We append `Z` to the end of the `<path>` when a user draws a line that returns to the starting point. Once a user's drawing path is within 10px of the starting point, the `Z` will be appended and the path will be closed.

The final composition of the `<path>` is of type `string`.

An example:

```javascript
<path d='M 342,252 L 343,252 344,252 345,252 346,252 Z' />
```

## Initial Drawing Path

### Methods

- `path()`
- `isValid()`

When a user clicks and drags, a `<path>` is created.

At the starting point, one will see a solid handle which has a stroke and fill matching the `currentColor`. If the user releases the mouse button before closing the path, a handle will appear at the last drawing point. The handle will have a stroke matching the `currentColor` and no fill. This transparent handle is an indicator to the user that they can continue drawing!

NOTE: A path is only created if a user has clicked and dragged long enough to add 20 coordinates to the `<path>`.
This is verified using `isValid()`.

## Continue Drawing

### Methods

- `appendPath()`

A user can continue drawing by clicking and dragging on the transparent handle. All coordinates will be appended to the active path via the `appendPath()` method.

## Close Path

### Methods

- `isCloseToStart()`

When a user's drawing path returns to the starting point and is within 10px, the path will close and both handles will no longer be visible. This is done by simply appending `Z` to the end of the `<path>`.

## Undo

### Methods

- `shortenPath()`

Near the starting point is an `Undo` button. When a user clicks this button, 20 coordinates will be removed from the end of the `<path>`. This will be the 20 most recently drawn coordinates.

A user can use the `Undo` feature after a path has been closed!

## Path Classification Data Structure

When a `<path>` is sent to our api, its sent as an array of objects where each object is an x and y coordinate.

```json
points: [
  {x: 345, y:160},
  {x: 350, y:165},
  {x: 355, y:170}
]
```
