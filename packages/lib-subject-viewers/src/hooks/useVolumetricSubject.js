// Inspired by useSubjectJSON.js in the lib-classifier package
import { useEffect, useState } from 'react'

export const useVolumetricSubject = ({ onError, onReady, subject }) => {
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    setData(null)
    setError(null)

    if (!subject) return setError('No subject found')
    // subjectJSON is used for testing to avoid network requests
    if (subject?.subjectJSON) return setData(subject.subjectJSON)

    const jsonLocation =
      subject.locations.find(
        (l) => l['application/json']
        ) || { 'application/json': null }

    const url = jsonLocation['application/json'];
    if (!url) return setError('No JSON url found for this subject')

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data)
        onReady()
      })
      .catch((err) => {
        console.log('useVolumetricSubject() error', err)
        onError(err)
      })
  }, [subject])

  return {
    data,
    loading: !data && !error,
    error
  }
}
