import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'

const ImageAndTextSubject = types
  .refinement(
    Subject.named('ImageAndTextSubject'),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.images >= 1 && counts.text >= 1 && counts.total === counts.images + counts.text
    })

export default ImageAndTextSubject
