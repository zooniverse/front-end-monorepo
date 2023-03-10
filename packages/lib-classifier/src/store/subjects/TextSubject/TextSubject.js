import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'

const TextSubject = types
  .refinement(
    Subject.named('TextSubject'),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.text > 0
    })

export default TextSubject
