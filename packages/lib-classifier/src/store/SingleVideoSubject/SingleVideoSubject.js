import { types } from 'mobx-state-tree'
import createLocationCounts from '@helpers/createLocationCounts'
import Subject from '../Subject'

const SingleVideoSubject = types
  .refinement('SingleVideoSubject', Subject, subject => {
    const counts = createLocationCounts(subject)
    return subject.locations.length === 1 && counts.videos === 1
  })

export default SingleVideoSubject
