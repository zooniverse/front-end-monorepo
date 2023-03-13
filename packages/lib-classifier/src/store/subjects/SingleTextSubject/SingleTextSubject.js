import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'

const SingleTextSubject = types
  .refinement(
    Subject.named('SingleTextSubject'),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.total === 1 && counts.text === 1
    })

export default SingleTextSubject
