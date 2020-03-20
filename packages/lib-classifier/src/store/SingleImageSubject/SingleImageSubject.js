import { types } from 'mobx-state-tree'
import createLocationCounts from '@helpers/createLocationCounts'
import Subject from '../Subject'

const SingleImageSubject = types
  .refinement('SingleImageSubject', Subject, subject => {
    const counts = createLocationCounts(subject)
    return subject.locations.length === 1 && counts.images === 1
  })

  

export default SingleImageSubject
