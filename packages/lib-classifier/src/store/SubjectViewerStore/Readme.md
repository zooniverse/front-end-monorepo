# SubjectViewerStore

## Actions

- **setOnPan:** register an onPan handler with the subject toolbar. Subject viewers should expose a method with the signature `onPan(dx, dy)` to enable panning.
  - _dx_: -1 (left), 0 (ignored), 1 (right)
  - _dy_: -1 (up), 0 (ignored), 1 (down)
- **setOnZoom:** register an onZoom handler with the subject toolbar. Subject viewers should expose a method with the signature `onZoom(type, value)` to enable zooming.
  - _type:_ `'zoomin'|'zoomout'|'zoomto'`
  - _value:_ An optional number describing a relative change in scale eg. `onZoom('zoomin', 1.2)` or an absolute scale eg. `onZoom(`zoomto`, 1.0)`.
- **panLeft:** pan the subject left.
- **panRight:** pan the subject right.
- **panUp:** pan the subject up.
- **panDown:** pan the subject down.
- **resetView:** reset the subject zoom level to 1 and rotation to 0.
- **zoomIn:** zoom in on the subject.
- **zoomOut:** zoom out on the subject.