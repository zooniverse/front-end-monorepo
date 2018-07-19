# Popup

The Popup uses the [Grommet `layer` component](https://v2.grommet.io/layer), which itself uses React 16's (Portals)[https://reactjs.org/docs/portals.html] feature.

![](https://i.kym-cdn.com/photos/images/original/000/337/399/480.gif)

Unfortunately, Enzyme doesn't support portals in shallow rendering, so we create the popup content in `Popup.js`, and use the `WithLayer` HOC to wrap it in a Layer. The default export is the wrapped Popup, and the content is a named export for testing in Enzyme.
