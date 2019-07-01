const DEFAULT_THUMBNAIL_DIMENSION = 999

export default function getThumbnailSrc({ height = DEFAULT_THUMBNAIL_DIMENSION, origin, src, width = DEFAULT_THUMBNAIL_DIMENSION }) {
  if (!src) return undefined

  if (src.endsWith('.gif')) return src

  let srcPath = src.split('//').pop()
  srcPath = srcPath.replace('static.zooniverse.org/', '')

  return `${origin}/${width}x${height}/${srcPath}`
}