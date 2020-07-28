# withKeyZoom

A decorator that connects a component to the pan and zoom actions in the `SubjectViewer` store, which handles the image toolbar functions. The wrapped component is given an `onKeyDown` handler but focus management is the responsibility of the component author, not this <abbr title="Higher-Order Component">HOC</abbr>.

## keyboard mappings

<dl>
  <dt>+</dt>
  <dd>`SubjectViewer.zoomIn`</dd>
  <dt>-</dt>
  <dd>`SubjectViewer.zoomOut`</dd>
  <dt>left arrow</dt>
  <dd>`SubjectViewer.panLeft`</dd>
  <dt>right arrow</dt>
  <dd>`SubjectViewer.panRight`</dd>
  <dt>up arrow</dt>
  <dd>`SubjectViewer.panUp`</dd>
  <dt>down arrow</dt>
  <dd>`SubjectViewer.panDown`</dd>
</dl>

## Usage

```
  withKeyZoom(MyComponent)
```
or with another connected component
```
  @inject(storeMapper)
  @withKeyZoom
  @observer
  class MyComponent { }
```