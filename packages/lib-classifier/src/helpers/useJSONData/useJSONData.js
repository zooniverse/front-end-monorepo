import { useEffect, useState } from 'react'

function getSubjectUrl(subject) {
  // Find the first location that has a JSON MIME type.
  // NOTE: we also temporarily accept plain text, due to quirks with the
  // Panoptes CLI uploading wonky MIME types (@shaun 20181024)
  const jsonLocation = subject.locations.find(l => l['application/json'] || l['text/plain']) || {}
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
  const body = await response.json()
  return body
}

/**
  A custom hook to load JSON data subjects from Panoptes
*/
export default function useJSONData(
  /** Panoptes subject */
  subject,
  /** on data ready callback */
  onReady,
  /** on error callback */
  onError
) {
  const [JSONdata, setJSONdata] = useState({})

  useEffect(() => onSubjectChange(), [subject])
  
  async function onSubjectChange() {
    if (subject) {
      await handleSubject()
    }
  }

  function onLoad(rawData) {
    setJSONdata(rawData)
    onReady()
  }

  async function handleSubject() {
    try {
      const rawData = await requestData(subject)
      if (rawData) onLoad(rawData)
    } catch (error) {
      onError(error)
    }
  }

  return JSONdata
}
