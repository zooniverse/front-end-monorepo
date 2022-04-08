import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'
import TextSubject from '../shared/TextSubject'

const SingleTextSubject = types
  .refinement(
    'SingleTextSubject',
    types.compose('SingleTextSubject', Subject, TextSubject),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.length === 1 && counts.text === 1
    })

export default SingleTextSubject
