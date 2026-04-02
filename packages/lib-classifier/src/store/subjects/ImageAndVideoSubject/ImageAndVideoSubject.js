import { types } from 'mobx-state-tree'
import createLocationCounts from '@helpers/createLocationCounts'
import Subject from '../Subject'

const ImageAndVideoSubject = types
  .refinement(Subject.named('ImageAndVideoSubject'), subject => {
    const counts = createLocationCounts(subject)
    return (
      (counts.images + counts.videos) === subject.locations.length
      && counts.images >= 1
      && counts.videos >= 1
    )
  })

export default ImageAndVideoSubject
