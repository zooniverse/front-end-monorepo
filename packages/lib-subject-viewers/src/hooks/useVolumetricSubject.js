// Inspired by useSubjectJSON.js in the lib-classifier package
import { useEffect, useState } from 'react'

const DEFAULT_HANDLER = () => {}

export const useVolumetricSubject = ({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) => {
  // sometimes proxy objects are sent in and attribute detection fails
  subject = JSON.parse(JSON.stringify(subject))

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
        setError(err)
        onError(err)
      })
  }, [subject])

  return {
    data,
    loading: !data && !error,
    error
  }
}
