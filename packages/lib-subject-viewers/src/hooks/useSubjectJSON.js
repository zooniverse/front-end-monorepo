// Inspired by useSubjectJSON.js in the lib-classifier package

export const useSubjectJSON = ({
  setSubjectData,
  subject
}) => {
  if (!subject) return setSubjectData({ data: null, error: 'No subject found' })
  if (subject?.subjectJSON) return setSubjectData({ data: subject.subjectJSON, error: null })

  const jsonLocation = subject.locations.find(l => l.type === 'application' || l.type === 'text') || {}

  if (!jsonLocation.url) {
    return setSubjectData({
      data: null,
      error: 'No JSON url found for this subject'
    })
  }

  fetch(jsonLocation.url)
    .then((res) => res.json())
    .then((data) => {
      setSubjectData({
        data,
        error: null
      })
    })

  return null
}
