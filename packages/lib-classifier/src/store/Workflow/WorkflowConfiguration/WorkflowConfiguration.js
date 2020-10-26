import { types } from 'mobx-state-tree'
import subjectViewers from '@helpers/subjectViewers'

const WorkflowConfiguration = types.model({
  enable_switching_flipbook_and_separate: types.optional(types.boolean, false),
  hide_classification_summaries: types.optional(types.boolean, false),
  multi_image_mode: types.optional(types.enumeration('multiImageMode', ['flipbook', 'separate']), 'flipbook'),
  subject_viewer: types.maybe(types.enumeration('subjectViewer', [
    'dataImage',
    'lightcurve',
    'multiFrame',
    'singleImage',
    'subjectGroup',
    'variableStar'
  ])),
  subject_viewer_config: types.frozen({})
})
  .views(self => ({
    get viewerType () {
      switch (self.subject_viewer) {
        case 'dataImage': {
          return subjectViewers.dataImage
        }
        case 'lightcurve': {
          return subjectViewers.lightCurve
        }
        case 'multiFrame': {
          return subjectViewers.multiFrame
        }
        case 'singleImage': {
          return subjectViewers.singleImage
        }
        case 'subjectGroup': {
          return subjectViewers.subjectGroup
        }
        case 'variableStar': {
          return subjectViewers.variableStar
        }
        default: {
          return null
        }
      }
    }
  }))

export default WorkflowConfiguration
