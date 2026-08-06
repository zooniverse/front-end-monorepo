import mime from 'mime/lite'
import { arrayOf, node, number, objectOf, shape, string } from 'prop-types'

import SimpleMedia from '../SimpleMedia/SimpleMedia'
import MediaLink from '../MediaLink'
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
  linkTitle,
  placeholder,
  previewHeight,
  subject,
  subjectIdTitle,
  width,
  url
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
        linkTitle={linkTitle}
        mediaSources={sourceList}
        previewHeight={resolvedPreviewHeight}
        subjectIdTitle={subjectIdTitle}
        width={width}
        url={url}
      />
    )
  }

  if (supportsSimplePreview) {
    return (
      <MediaLink
        href={url}
        title={linkTitle}
      >
        <SimpleMedia
          mediaSrc={mediaSrc}
          placeholder={placeholder}
          previewHeight={resolvedPreviewHeight}
          showBackground={showBackground}
          showTitle={false}
          subjectIdTitle={subjectIdTitle}
          width={width}
        />
      </MediaLink>
    )
  }

  return null
}

InteractiveMedia.propTypes = {
  linkTitle: string.isRequired,
  placeholder: node,
  previewHeight: number.isRequired,
  subject: shape({
    locations: arrayOf(objectOf(string))
  }),
  subjectIdTitle: string.isRequired,
  width: number.isRequired,
  url: string.isRequired
}

export default InteractiveMedia
