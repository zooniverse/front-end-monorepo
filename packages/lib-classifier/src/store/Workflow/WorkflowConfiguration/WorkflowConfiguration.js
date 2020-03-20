import { types } from 'mobx-state-tree'

const WorkflowConfiguration = types.model({
  enable_switching_flipbook_and_separate: types.optional(types.boolean, false),
  hide_classification_summaries: types.optional(types.boolean, false),
  multi_image_mode: types.optional(types.enumeration('multiImageMode', ['flipbook', 'separate']), 'flipbook'),
  subject_viewer: types.maybe(types.enumeration('subjectViewer', ['lightcurve', 'multiFrame', 'subjectGroup']))
})

export default WorkflowConfiguration
