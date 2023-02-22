import { useEffect, useRef, useState } from 'react'

import { findLocationsByMediaType } from '@helpers'

function getSubjectUrl(subject) {
  let jsonLocation = {}
  // Find locations that have a JSON MIME type.
  // TODO: do we need to support txt file fallback?
  const locations = findLocationsByMediaType(subject.locations, 'application') || []
  if (locations?.length > 0 && locations[0]) {
    jsonLocation = locations[0]
  }
  const url = Object.values(jsonLocation)[0]
  if (url) {
    return url
  } else {
    throw new Error('No JSON url found for this subject')
  }
}

async function requestData(subject) {
  const url = getSubjectUrl(subject)
  const response = await fetch(url)
  if (!response.ok) {
    const error = new Error(response.statusText)
    error.status = response.status
    throw error
  }
  const responseData = await response.json()

  return responseData
}

export default function useDataImageSubject({
  onError,
  onReady,
  subject
}) {
  const viewer = useRef()
  const [imageLocation, setImageLocation] = useState(null)
  const [JSONData, setJSONData] = useState({
    data: [],
    chartOptions: {}
  })

  useEffect(function onSubjectChange() {
    function onLoad(JSONData) {
      let imageLocation = {}
      const container = viewer.current?.container
      const locations = findLocationsByMediaType(subject.locations, 'image')
      if (locations?.length > 0) {
        // Presumably 2 image locations will be found
        // The first will be the fallback to display something in Talk
        // Even if there's only one, this is fine
        imageLocation = locations.reverse()[0]
      }

      const { width: clientWidth, height: clientHeight } = container ? container.getBoundingClientRect() : {}
      const target = { clientWidth, clientHeight, naturalWidth: 0, naturalHeight: 0 }

      setImageLocation(imageLocation)
      setJSONData(JSONData)
      onReady(target)
    }

    async function handleSubject() {
      try {
        const JSONData = await requestData(subject)
        if (JSONData) onLoad(JSONData)
      } catch (error) {
        console.error(error)
        onError(error)
      }
    }

    if (subject) {
      handleSubject()
    }
  }, [subject])

  return { imageLocation, JSONData, viewer }
}