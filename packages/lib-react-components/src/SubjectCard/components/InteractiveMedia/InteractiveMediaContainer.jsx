import mime from 'mime/lite'
import { arrayOf, node, number, objectOf, shape, string } from 'prop-types'

import InteractiveMedia from './InteractiveMedia'

function InteractiveMediaContainer({
  placeholder,
  previewHeight,
  subject,
  subjectIdTitle,
  width
}) {
  const locations = subject?.locations || []
  const hasSingleLocation = locations.length === 1
  const mediaSrc = hasSingleLocation && locations[0] ? Object.values(locations[0])[0] : null
  const mimeType = mediaSrc ? mime.getType(mediaSrc) : null
  const mediaType = mimeType ? mimeType.split('/')[0] : null
  const supportsSimplePreview = hasSingleLocation && [
    'application',
    'image',
    'text'
  ].includes(mediaType)
  const showBackground = mediaType === 'image'

  return (
    <InteractiveMedia
      mediaSrc={supportsSimplePreview ? mediaSrc : null}
      placeholder={placeholder}
      previewHeight={previewHeight}
      showBackground={showBackground}
      subjectIdTitle={subjectIdTitle}
      width={width}
    />
  )
}

InteractiveMediaContainer.propTypes = {
  placeholder: node,
  previewHeight: number.isRequired,
  subject: shape({
    locations: arrayOf(objectOf(string))
  }),
  subjectIdTitle: string.isRequired,
  width: number.isRequired
}

export default InteractiveMediaContainer
