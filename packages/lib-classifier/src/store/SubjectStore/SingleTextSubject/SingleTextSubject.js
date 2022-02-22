import { types } from 'mobx-state-tree'
import createLocationCounts from '@helpers/createLocationCounts'
import Subject from '../Subject'

const SingleTextSubject = types
  .refinement('SingleTextSubject', Subject, subject => {
    const counts = createLocationCounts(subject)
    return subject.locations.length === 1 && counts.text === 1
  })

export default SingleTextSubject
