import React from 'react'
import RasterViewer from '../../components/RasterViewer'
import convertLocationToObject from './convertLocationToObject'

const viewers = {
  image: {
    jpeg: RasterViewer,
    jpg: RasterViewer,
    png: RasterViewer
  }
}

function getViewerComponent (location) {
  const { mimeType, mimeSubType, url } = convertLocationToObject(location)
  let Viewer

  try {
    Viewer = viewers[mimeType][mimeSubType]
  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('No subject viewer found for', location)
    } else {
      console.error(error)
    }
    return null
  }

  return (
    <Viewer url={url} />
  )
}

export default getViewerComponent
