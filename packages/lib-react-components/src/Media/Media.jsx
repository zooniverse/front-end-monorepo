import mime from 'mime/lite'
import * as Viewers from './components'
import { propTypes, defaultProps } from './helpers/mediaPropTypes'

export default function Media(props) {
  const mimeType = mime.getType(props.src)
  const [ mimeTypeFromUrl ] = mimeType ? mimeType.split('/') : []
  const componentProps = {
    ...defaultProps,
    ...props
  }

  // WARNING: mime.getType() doesn't always return sensible results. If (1) the
  // file extension isn't obvious in the URL, and/or (2) the URL has search
  // params, then the extrapolated MIME type will be incorrect.
  //
  // For example:
  // - https://example.com/valid-image-url returns "undefined"
  // - https://example.com/valid-image.jpg?width=100 returns "undefined"
  //
  // This is pertinent where Markdown is being used. In cases such as these, we
  // can specify a default mime type to fall back on. It can still be wrong
  // (e.g. we set defaultMimeType='image' but the user actually set
  // https://example.com/valid-VIDEO-url) but it should work in most practical
  // cases.
  //
  // See https://github.com/zooniverse/front-end-monorepo/issues/7181
  
  const type = mimeTypeFromUrl || props.defaultMimeType

  if (type === 'image') {
    return (
      <Viewers.ThumbnailImage {...componentProps} />
    )
  }

  if (type === 'video') {
    return (
      <Viewers.Video {...componentProps} />
    )
  }

  if (type === 'audio') {
    return (
      <Viewers.Audio {...componentProps} />
    )
  }

  if (type === 'application') {
    return (
      <Viewers.Data {...componentProps} />
    )
  }

  if (type === 'text') {
    return (
      <Viewers.Text {...componentProps} />
    )
  }

  return null
}

Media.propTypes = {
  ...propTypes
}
