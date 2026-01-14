The Media component dynamically renders an appropriate child media component based on the mimetype of the source.

### props 

- alt: _(string)_ the alt attribute for accessibility. Either passed onto aria-label or alt.
- controls: _(bool)_ whether or not to show the controls for video and audio. Defaults to true.
- delay: _(number)_ millisecond loading delay for react-progressive-image. Defaults to 0.
- defaultMimeType: _(string)_ default MIME type to use, IF the MIME type can't be guessed from the `src`. 
- fit: _(string)_ CSS object-fit property to set. Grommet prop. Only `'contain'` or `'cover'`.
- height: _(number)_ height in CSS pixels.
- origin: _(string)_ The origin for the Zooniverse thumbnail service. Defaults to `'https://thumbnails.zooniverse.org'`
- placeholder: _(node)_ React component or HTML to render as a child of the placeholder container while the image is loading
- src: _(string)_ the source of the media. Required.
  - NOTE: MIME type and the corresponding child media component is determined by this string. If a MIME type can't be guessed, consider specifying a `defaultMimeType`
- width: _(number)_ width in CSS pixels.

## mimetype is image

ThumbnailImage component is rendered. The source is first processed by the Zooniverse thumbnail service which returns a new source url using the service. While loading is true, a placeholder is rendered, then the image animates in and renders a Grommet Image component. A noscript fallback of native HTML img is for server-side rendering.

All of the props defined for Media are passed along to ThumbnailImage.

## mimetype is video

A Grommet Video component is rendered inside a Grommet Box. All of the props defined for Media is passed along to Video.

## mimetype is audio

A HTML5 audio element is rendered inside a Grommet Box. It has a fallback of supplying a link to the audio file. All of the props defined for Media is passed along to Audio.
