import { useEffect, useRef, useState } from 'react'

import { findLocationsByMediaType } from '@helpers'
import JSONData from '@store/JSONData'

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

export default function useSubjectJSON({
  onError,
  onReady,
  subject
}) {
  const viewer = useRef()
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(function onSubjectChange() {
    function onLoad() {
      const container = viewer.current?.container
      const { width: clientWidth, height: clientHeight } = container ? container.getBoundingClientRect() : {}
      const target = { clientWidth, clientHeight, naturalWidth: 0, naturalHeight: 0 }
      onReady(target)
    }

    async function handleSubject() {
      try {
        const rawData = await requestData(subject)
        if (rawData) {
          const jsonData = JSONData.create(rawData)
          setData(jsonData)
          onLoad()
        }
      } catch (error) {
        setError(error)
        onError(error)
      }
    }

    if (subject) {
      handleSubject()
    }
  }, [subject])

  const loading = !data && !error
  return { loading, data, error, viewer }
}
