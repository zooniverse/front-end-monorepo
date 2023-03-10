import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'

const ImageAndTextSubject = types
  .refinement(
    Subject.named('ImageAndTextSubject'),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.total === 2 && counts.images === 1 && counts.text === 1
    })

export default ImageAndTextSubject
