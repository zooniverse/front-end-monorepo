import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'

const AudioSpectrogramSubject = types
  .refinement(
    Subject.named('AudioSpectrogramSubject'),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.total === 2 && counts.audio === 1 && counts.images === 1
    })

export default AudioSpectrogramSubject
