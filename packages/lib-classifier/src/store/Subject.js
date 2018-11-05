import { getRoot, types } from 'mobx-state-tree'
import Resource from './Resource'
import createLocationCounts from '../helpers/createLocationCounts'
import subjectViewers from '../helpers/subjectViewers'

const Subject = types
  .model('Subject', {
    locations: types.frozen(),
    metadata: types.frozen()
  })

  .views(self => ({
    get viewer () {
      const counts = createLocationCounts(self)

      const subject = getRoot(self).subjects.active
      const workflow = getRoot(self).workflows.active
      const configuration = workflow && workflow.configuration || {}
      let viewer = null

      // If the Workflow configuration specifies a subject viewer, use that.
      // Otherwise, take a guess using the Subject.

      if (configuration.subject_viewer === 'lightcurve') {
        viewer = subjectViewers.lightCurve
      } else if (counts.total === 1) {
        if (counts.images) {
          viewer = subjectViewers.singleImage
        }
      }

      return viewer
    }
  }))

export default types.compose('SubjectResource', Resource, Subject)
