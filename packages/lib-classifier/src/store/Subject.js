import { types } from 'mobx-state-tree'
import Resource from './Resource'
import createLocationCounts from '../helpers/createLocationCounts'
import subjectViewers from '../helpers/subjectViewers'

const Subject = types
  .model('Subject', {
    locations: types.frozen
  })

  .views(self => ({
    get viewer () {
      const counts = createLocationCounts(self)
      let viewer = null

      if (counts.total === 1) {
        if (counts.images) {
          viewer = subjectViewers.singleImage
        }
      }

      return viewer
    }
  }))

export default types.compose(Resource, Subject)
