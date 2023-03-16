import mime from 'mime/lite'
import * as Viewers from './components'
import { propTypes, defaultProps } from './helpers/mediaPropTypes'

export default function Media(props) {
  const mimeType = mime.getType(props.src)
  const [ type ] = mimeType ? mimeType.split('/') : []

  if (type === 'image') {
    return (
      <Viewers.ThumbnailImage {...props} />
    )
  }

  if (type === 'video') {
    return (
      <Viewers.Video {...props} />
    )
  }

  if (type === 'audio') {
    return (
      <Viewers.Audio {...props} />
    )
  }

  if (type === 'application') {
    return (
      <Viewers.Data {...props} />
    )
  }

  return null
}

Media.propTypes = {
  ...propTypes
}

Media.defaultProps = {
  ...defaultProps
}
