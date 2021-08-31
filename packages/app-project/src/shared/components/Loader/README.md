A placeholder component to render while waiting for an async process to finish like an HTTP request. Wrapped with a Grommet `Box` and renders an animated `Bars` component from `svg-loaders-react`

## Props

Accepts all [`Box`](https://v2.grommet.io/box) props. The `height`, `width`, `margin`, and `pad` props can be used to size the wrapper Box to be a particular area in a layout. The prop `background` can be used to set a background color, particularly useful for setting for light and dark theme.

Additional props are:

- `loadingMessage` _(string)_ Defaults to "Loading." A message set on the aria-label of the wrapper Box to be read out for screen readers.
- `loaderColor` _(string)_ Defaults to the brand color. The color to set the fill color of the SVG loader bars. Since this is not a Grommet component, you cannot pass in the convenience variable color names from our theme.