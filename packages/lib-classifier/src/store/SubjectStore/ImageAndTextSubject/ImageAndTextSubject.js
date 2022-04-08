import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'
import TextSubject from '../shared/TextSubject.js'

const ImageAndTextSubject = types
  .refinement(
    'ImageAndTextSubject',
    types.compose('ImageAndTextSubject', Subject, TextSubject),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.total === 2 && counts.images === 1 && counts.text === 1
    })

export default ImageAndTextSubject
