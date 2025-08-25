import mime from 'mime/lite'
import * as Viewers from './components'
import { propTypes, defaultProps } from './helpers/mediaPropTypes'

export default function Media(props) {
  const mimeType = mime.getType(props.src)
  const [ type ] = mimeType ? mimeType.split('/') : []
  const componentProps = {
    ...defaultProps,
    ...props
  }

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
