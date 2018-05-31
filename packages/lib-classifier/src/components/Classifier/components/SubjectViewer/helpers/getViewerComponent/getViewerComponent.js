import React from 'react'
import ImageViewer from '../../components/ImageViewer'
import convertLocationToObject from './convertLocationToObject'

const viewers = {
  image: ImageViewer
}

function getViewerComponent (location) {
  const { mimeType, mimeSubType, url } = convertLocationToObject(location)
  let Viewer

  try {
    Viewer = viewers[mimeType]
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
