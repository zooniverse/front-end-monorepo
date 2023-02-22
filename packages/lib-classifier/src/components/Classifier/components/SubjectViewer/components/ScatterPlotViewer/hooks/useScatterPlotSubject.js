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

export default function useScatterPlotSubject({
  onError,
  onReady,
  subject
}) {
  const viewer = useRef()
  const [JSONData, setJSONData] = useState({
    data: [],
    chartOptions: {}
  })

  useEffect(function onSubjectChange() {
    function onLoad(JSONData) {
      const container = viewer.current?.container
      const { width: clientWidth, height: clientHeight } = container ? container.getBoundingClientRect() : {}
      const target = { clientWidth, clientHeight, naturalWidth: 0, naturalHeight: 0 }

      if (JSONData?.data) {
        setJSONData(JSONData)
      } else {
        setJSONData({
          chartOptions: {},
          data: JSONData
        })
      }
      onReady(target)
    }

    async function handleSubject() {
      try {
        const JSONData = await requestData(subject)
        if (JSONData) onLoad(JSONData)
      } catch (error) {
        onError(error)
      }
    }

    if (subject) {
      handleSubject()
    }
  }, [subject])

  return { JSONData, viewer }
}