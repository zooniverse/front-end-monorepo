# Polygon Drawing Tool

Zooniverse's `Polygon` tool is created by using an svg element, `<polyline>`. The `<polyline>` element is defined by the parameter: `points`. The `points` attribute is a string of numbers representing sets of coordinates:

```
<polyline points="0,100 50,25 50,75 100,0" />
```

The `<polyline>` element was used instead of the `<polygon>` element because once 3 points are created, the `<polygon>` element uses an 'auto-close' function which creates a line from the last point to the initial point even if a user wants to continue adding points. This makes creating a polygon confusing.

Reference url: [polyline](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline)

---

## Initial Point

### Methods

- `createMark()` in `./tools/PolygonTool`
- `initialPosition()` in `./marks/Polygon`

To create the initial point, a user clicks anywhere on the drawing surface. A new mark is created, the `x and y` coordinates are captured, rounded to two decimal places and pushed into the mark's `points` array.

---

## Adding Points

### Methods

- `handlePointerDown()` in `./tools/PolygonTool`
- `appendPath()` in `./marks/Polygon`

From the initial point, when a user moves the the cursor, a guideline is created by using the `lastPoint` and the current coordinates of the mouse cursor. The guideline is a dashed line to visually show the user where a line will be created if the user clicks again.

By continuing to click, a user can create as many points as desired to form the polygon.

---

## Undo (Remove a Point)

### Methods

- `onUndoDrawing()` in `./components/Polygon`
- `shortenPath()` in `./marks/Polygon`

A user can Undo (remove) the last point if:

1. At least two points have been created
2. The polygon is not closed

The last set of coordinates in the `points` array is removed.

---

## Close Path

### Methods

- `handleClosePolygon()` in `./components/Polygon`
- `finish()` in `./marks/Mark`
- `isValid()` in `./marks/Polygon`

A valid polygon must have at least 3 points. A user can close a polygon by clicking on the initial point, if at least 3 points have been created.

\*If two points were created and a user clicks on the initial point, `isValid` will return `false` and the annotation will be deleted.

NOTE: Because we use the `<polyline>` element as described above, when a valid polygon is closed, a `<line>` element is used to connect the `lastCoord` to the `initialCoord`. This can be seen in `./components/Polygon`.

---

## Moving a Single Point

A single point can be moved by clicking and dragging on the point while the polygon is being created or once the polygon has been closed.

Each point is wrapped in the `DragHandle` component.

---

## Moving Polygon

### Methods

- `move()` in `./marks/Polygon`

The entire polygon drawing can be moved by clicking on any line and dragging to the desired location.

---

## Deleting Polygon

Clicking the delete button will remove the polygon drawing. This can be done if there is at least one point.

---

## Path Classification Data Structure

When a `<path>` is sent to our api, its sent as an array of objects where each object is an x and y coordinate.

```json
points: [
  {x: 345.18, y:160.65},
  {x: 350.3, y:165.89},
  {x: 355, y:170.42}
]
```
