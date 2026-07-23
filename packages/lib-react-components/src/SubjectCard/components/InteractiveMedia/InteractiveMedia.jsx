import mime from 'mime/lite'
import { arrayOf, node, number, objectOf, shape, string } from 'prop-types'

import SimpleMedia from '../SimpleMedia/SimpleMedia'
import MultiMedia from './components/MultiMedia'
import { MULTI_MEDIA_CONTROLS_HEIGHT } from './components/MultiMedia'

const SIMPLE_PREVIEW_MEDIA_TYPES = [
  'application',
  'image',
  'text'
]

function getMediaType(source) {
  const mimeType = mime.getType(source)
  return mimeType?.split('/')[0]
}

function getSourceList(subject) {
  return (subject?.locations || []).map(location => Object.values(location)[0]).filter(Boolean)
}

function InteractiveMedia({
  placeholder,
  previewHeight,
  subject,
  subjectIdTitle,
  width
}) {
  const sourceList = getSourceList(subject)
  const hasMultipleSources = sourceList.length > 1
  const mediaSrc = sourceList.length === 1 ? sourceList[0] : null
  const mediaType = getMediaType(mediaSrc)
  const supportsSimplePreview = SIMPLE_PREVIEW_MEDIA_TYPES.includes(mediaType)
  const showBackground = mediaType === 'image'
  const resolvedPreviewHeight = hasMultipleSources
    ? previewHeight - MULTI_MEDIA_CONTROLS_HEIGHT
    : previewHeight

  if (hasMultipleSources) {
    return (
      <MultiMedia
        mediaSources={sourceList}
        placeholder={placeholder}
        previewHeight={resolvedPreviewHeight}
        showBackground={showBackground}
        subjectIdTitle={subjectIdTitle}
        width={width}
      />
    )
  }

  if (supportsSimplePreview) {
    return (
      <SimpleMedia
        mediaSrc={mediaSrc}
        placeholder={placeholder}
        previewHeight={resolvedPreviewHeight}
        showBackground={showBackground}
        showTitle={false}
        subjectIdTitle={subjectIdTitle}
        width={width}
      />
    )
  }

  return null
}

InteractiveMedia.propTypes = {
  placeholder: node,
  previewHeight: number.isRequired,
  subject: shape({
    locations: arrayOf(objectOf(string))
  }),
  subjectIdTitle: string.isRequired,
  width: number.isRequired
}

export default InteractiveMedia
