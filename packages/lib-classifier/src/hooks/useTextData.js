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

/**
  A custom hook to load text data subjects from Panoptes
*/
export default function useTextData(
  /** Panoptes subject */
  subject,
  /** on data ready callback */
  onReady,
  /** on error callback */
  onError
) {
  const [textData, setTextData] = useState('')

  useEffect(() => onSubjectChange(), [subject])
  
  async function onSubjectChange() {
    if (subject) {
      await handleSubject()
    }
  }

  function onLoad(rawData) {
    setTextData(rawData)
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

  return textData
}
