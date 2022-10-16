import { types } from 'mobx-state-tree'
import createLocationCounts from '@helpers/createLocationCounts'
import Subject from '../Subject'

const ImageSubject = types
  .refinement('ImageSubject', Subject, subject => {
    const counts = createLocationCounts(subject)
    return subject.locations.length > 1 && counts.images === subject.locations.length
  })

export default ImageSubject
