# Circle Drawing Tool

The Circle tool is an SVG basic shape used to draw circles based on a center point and a radius.

`<circle cx="50" cy="50" r="50"/>`

Reference url: [circle](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle)

## Circle Drawing Tool Files

- components/Circle
- models/marks/Circle
- models/tools/CircleTool

## Notes

In the `Circle.js` component file, the circle tag only has the `r` attribute.

`<circle r={radius} />`

This is because the `cx` and `cy` attributes are inherited from the parent, `Mark.js` component file. The `Mark.js` component file sets `cx` and `cy` position using `transform = translate(x, y)`

```jsx
transform =
  mark.x && mark.y ? `${transform} translate(${mark.x}, ${mark.y})` : transform
```

The `Circle` component is then created around its own personal 'scoped' point of `(0, 0)`
A good example of seeing this is looking at the `Guide Line`.

```jsx
<line
  x1={0}
  y1={0}
  x2={handleX}
  y2={handleY}
  strokeWidth={guideWidth}
  strokeDasharray={GUIDE_DASH}
/>
```

`x1` and `y1` is the start point for the `Guide Line` and the center point of the circle!

This is done to make rotate transformations easier (as seen in `RotateRectangle` and `Ellipse`).
Rotation is then done around the shape's center point.
