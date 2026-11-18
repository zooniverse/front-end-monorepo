/**
 * Panoptes only exposes a collection's cover as `default_subject_src`, 
 * the first media URL of its default subject (or of the first subject if none is set).
 * Returns the id of the first subject whose first location matches that URL.
 */
export default function getCoverSubjectId(subjects = [], defaultSubjectSrc) {
  if (!defaultSubjectSrc) return undefined

  const coverSubject = subjects.find(subject => {
    const [firstLocation] = subject.locations ?? []
    return firstLocation && Object.values(firstLocation)[0] === defaultSubjectSrc
  })
  return coverSubject?.id
}
