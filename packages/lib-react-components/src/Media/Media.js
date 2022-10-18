import React from 'react'
import mime from 'mime-types'
import Audio from './components/Audio/index.js'
import ThumbnailImage from './components/ThumbnailImage/index.js'
import Video from './components/Video/index.js'
import { propTypes, defaultProps } from './helpers/mediaPropTypes.js'

export default function Media (props) {
  const mimeType = mime.lookup(props.src)

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
