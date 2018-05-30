function isRaster (mimeType) {
  return mimeType.startsWith('image/') &&
    mimeType !== 'image/svg+xml'
}

export default isRaster
