import { types } from 'mobx-state-tree'
import createLocationCounts from '@helpers/createLocationCounts'
import Subject from '../Subject'

const SingleJSONSubject = types
  .refinement('SingleJSONSubject', Subject, subject => {
    const counts = createLocationCounts(subject)
    return counts.json === 1
  })

export default SingleJSONSubject
