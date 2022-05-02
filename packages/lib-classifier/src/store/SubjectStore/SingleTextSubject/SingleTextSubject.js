import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'
import { Text } from '../TextSubject/TextSubject'

const SingleTextSubject = types
  .refinement(
    'SingleTextSubject',
    types.compose('SingleTextSubject', Subject, Text),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.total === 1 && counts.text === 1
    })

export default SingleTextSubject
