import mime from 'mime/lite'
import { arrayOf, node, number, objectOf, shape, string } from 'prop-types'

import InteractiveMedia from './InteractiveMedia'

const FLIPBOOK_TOOLBAR_HEIGHT = 45

function InteractiveMediaContainer({
  placeholder,
  previewHeight,
  subject,
  subjectIdTitle,
  width
}) {
  const locations = subject?.locations || []
  const mediaSources = locations.map(location => Object.values(location)[0]).filter(Boolean)

  const hasSingleLocation = locations.length === 1
  const hasMultipleLocations = mediaSources.length > 1
  const mediaSrc = hasSingleLocation && locations[0] ? Object.values(locations[0])[0] : null
  const mimeType = mediaSrc ? mime.getType(mediaSrc) : null
  const mediaType = mimeType ? mimeType.split('/')[0] : null

  const allLocationsAreImages = hasMultipleLocations && mediaSources.every(source => {
    const sourceMimeType = mime.getType(source)
    return sourceMimeType?.startsWith('image/')
  })

  const adjustedPreviewHeight = allLocationsAreImages
    ? previewHeight - FLIPBOOK_TOOLBAR_HEIGHT
    : previewHeight

  const supportsStaticPreview = hasSingleLocation && [
    'application',
    'image',
    'text'
  ].includes(mediaType)
  const showBackground = allLocationsAreImages || mediaType === 'image'

  return (
    <InteractiveMedia
      mediaSources={allLocationsAreImages ? mediaSources : []}
      mediaSrc={supportsStaticPreview ? mediaSrc : null}
      placeholder={placeholder}
      previewHeight={adjustedPreviewHeight}
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
