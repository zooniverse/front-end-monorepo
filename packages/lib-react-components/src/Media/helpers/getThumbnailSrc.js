export default function getThumbnailSrc({ height = '', origin, src, width = 999 }) {
  if (!src) return undefined

  if (src.endsWith('.gif')) return src

  let srcPath = src.split('//').pop()
  srcPath = srcPath.replace('static.zooniverse.org/', '')

  return `${origin}/${width}x${height}/${srcPath}`
}