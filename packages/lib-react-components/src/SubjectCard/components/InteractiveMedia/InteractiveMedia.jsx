import { arrayOf, bool, node, number, objectOf, shape, string } from 'prop-types'

import MediaLink from '../MediaLink'
import SimpleMedia from '../SimpleMedia'
import MediaFallback from '../MediaFallback'
import Audio from './components/Audio'
import MultiMedia from './components/MultiMedia'
import Video from './components/Video'
import { MULTI_MEDIA_CONTROLS_HEIGHT } from './components/MultiMedia'

const SIMPLE_PREVIEW_MEDIA_TYPES = [
  'application',
  'image',
  'text'
]

function getMediaType(mimeType) {
  return mimeType?.split('/')[0]
}

function getSources(subject) {
  return (subject?.locations || []).map(location => ({
    mimeType: Object.keys(location)[0],
    url: Object.values(location)[0]
  })).filter(item => item.url)
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
  const sources = getSources(subject)
  const hasMultipleSources = sources.length > 1

  const singleSource = sources.length === 1 ? sources[0] : null
  const singleMediaType = getMediaType(singleSource?.mimeType)
  const supportsSimplePreview = SIMPLE_PREVIEW_MEDIA_TYPES.includes(singleMediaType)

  const resolvedPreviewHeight = hasMultipleSources
    ? previewHeight - MULTI_MEDIA_CONTROLS_HEIGHT
    : previewHeight

  if (hasMultipleSources) {
    return (
      <MultiMedia
        linkTitle={linkTitle}
        placeholder={placeholder}
        sources={sources}
        previewHeight={resolvedPreviewHeight}
        subjectIdTitle={subjectIdTitle}
        width={width}
        url={url}
      />
    )
  }

  if (supportsSimplePreview) {
    return (
      <SimpleMedia
        linkTitle={linkTitle}
        placeholder={placeholder}
        previewHeight={resolvedPreviewHeight}
        showAxes={true}
        showLegend={true}
        showTitle={false}
        subject={subject}
        subjectIdTitle={subjectIdTitle}
        width={width}
        url={url}
      />
    )
  }

  if (singleMediaType === 'video') {
    return (
      <Video
        linkTitle={linkTitle}
        mediaSrc={singleSource.url}
        placeholder={placeholder}
        previewHeight={resolvedPreviewHeight}
        subjectIdTitle={subjectIdTitle}
        width={width}
        url={url}
      />
    )
  }

  if (singleMediaType === 'audio') {
    return (
      <Audio
        linkTitle={linkTitle}
        mediaSrc={singleSource.url}
        placeholder={placeholder}
        previewHeight={resolvedPreviewHeight}
        subjectIdTitle={subjectIdTitle}
        width={width}
        url={url}
      />
    )
  }

  if (singleSource) {
    return (
      <MediaLink href={url} title={linkTitle}>
        <MediaFallback
          alt={subjectIdTitle}
          placeholder={placeholder}
          previewHeight={resolvedPreviewHeight}
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
