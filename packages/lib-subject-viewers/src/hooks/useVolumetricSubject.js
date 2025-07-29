// Inspired by useSubjectJSON.js in the lib-classifier package
import { useEffect, useState } from 'react'

const DEFAULT_HANDLER = () => {}

export const useVolumetricSubject = ({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) => {
  const [error, setError] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    setData(null)
    setError(null)

    if (!subject) return setError('No subject found')
    if (subject?.subjectJSON) return setData(subject.subjectJSON)

    const jsonLocation = subject.locations.find((l) => l.type === 'application')
    if (!jsonLocation.url) return setError('No JSON url found for this subject')

    fetch(jsonLocation.url)
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
