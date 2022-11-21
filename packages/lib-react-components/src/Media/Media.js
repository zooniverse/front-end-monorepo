import React from 'react'
import mime from 'mime/lite'
import Audio from './components/Audio'
import ThumbnailImage from './components/ThumbnailImage'
import Video from './components/Video'
import { propTypes, defaultProps } from './helpers/mediaPropTypes'

export default function Media (props) {
  const mimeType = mime.getType(props.src)

  if (mimeType && mimeType.includes('image')) {
    return (
      <ThumbnailImage {...props} />
    )
  }

  if (mimeType && mimeType.includes('video')) {
    return (
      <Video {...props} />
    )
  }

  if (mimeType && mimeType.includes('audio')) {
    return (
      <Audio {...props} />
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
