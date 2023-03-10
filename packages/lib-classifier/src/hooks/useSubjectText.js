import { useEffect, useState } from 'react'

function getSubjectUrl(subject) {
  // Find the first location that has a text MIME type.
  const textLocation = subject.locations.find(l => l['text/plain']) || {}
  const url = Object.values(textLocation)[0]
  if (url) {
    return url
  } else {
    throw new Error('No text url found for this subject')
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
  const body = await response.text()
  return body
}

const DEFAULT_HANDLER = function () {
  return true
}

/**
  A custom hook to load text data subjects from Panoptes
*/
export default function useSubjectText({
  /** Panoptes subject */
  subject,
  /** on data ready callback */
  onReady = DEFAULT_HANDLER,
  /** on error callback */
  onError = DEFAULT_HANDLER
}) {
  const [data, setData] = useState('')
  const [error, setError] = useState(null)

  useEffect(function onSubjectChange() {
    function onLoad(rawData) {
      setData(rawData)
      onReady()
    }

    async function handleSubject() {
      try {
        const rawData = await requestData(subject)
        if (rawData) onLoad(rawData)
      } catch (error) {
        setError(error)
        onError(error)
      }
    }

    if (subject) {
      handleSubject()
    }
  }, [subject, onReady, onError])

  const loading = !data && !error
  return { data, error, loading }
}
