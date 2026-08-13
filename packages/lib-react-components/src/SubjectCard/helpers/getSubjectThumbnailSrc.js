const THUMBNAILER_SUPPORTED_SUBJECT_HOSTS = [
  'panoptes-uploads-staging.zooniverse.org',
  'panoptes-uploads.zooniverse.org'
]

function canUseSubjectThumbnailService(src) {
  if (typeof src !== 'string' || src.length === 0) {
    return false
  }

  try {
    const parsedUrl = new URL(src)
    return THUMBNAILER_SUPPORTED_SUBJECT_HOSTS.includes(parsedUrl.hostname)
  } catch {
    return false
  }
}

export default function getSubjectThumbnailSrc({
  height = 100,
  origin = 'https://thumbnails.zooniverse.org',
  src,
  width = 100
} = {}) {
  if (!canUseSubjectThumbnailService(src)) {
    return null
  }

  const srcPath = src.replace(/^https?:\/\//, '')
  return `${origin}/${width}x${height}/${srcPath}`
}
