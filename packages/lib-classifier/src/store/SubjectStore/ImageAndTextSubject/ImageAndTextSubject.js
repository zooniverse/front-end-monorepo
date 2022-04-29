import { types } from 'mobx-state-tree'

import { createLocationCounts } from '@helpers'
import Subject from '../Subject'
import { Text } from '../TextSubject/TextSubject'

const ImageAndTextSubject = types
  .refinement(
    'ImageAndTextSubject',
    types.compose('ImageAndTextSubject', Subject, Text),
    subject => {
      const counts = createLocationCounts(subject)
      return counts.total === 2 && counts.images === 1 && counts.text === 1
    })

export default ImageAndTextSubject
