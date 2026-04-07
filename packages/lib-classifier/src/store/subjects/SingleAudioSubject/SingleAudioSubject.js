import { types } from 'mobx-state-tree'
import createLocationCounts from '@helpers/createLocationCounts'
import Subject from '../Subject'

const SingleAudioSubject = types
  .refinement(Subject.named('SingleAudioSubject'), subject => {
    const counts = createLocationCounts(subject)
    return subject.locations.length === 1 && counts.audio === 1
  })

export default SingleAudioSubject
