import { types, getType } from 'mobx-state-tree'
import Resource from './Resource'
import { SingleChoiceAnnotation, MultipleChoiceAnnotation, Graph2dRangeXAnnotation } from './annotations'

const ClassificationMetadata = types.model('ClassificationMetadata', {
  finishedAt: types.maybe(types.string),
  session: types.maybe(types.string),
  source: types.enumeration(['api', 'sugar']),
  startedAt: types.optional(types.string, (new Date()).toISOString()),
  subjectDimensions: types.array(types.frozen({
    clientHeight: types.integer,
    clientWidth: types.integer,
    naturalHeight: types.integer,
    naturalWidth: types.integer
  })),
  subjectSelectionState: types.frozen({
    alreadySeen: types.optional(types.boolean, false),
    finishedWorkflow: types.optional(types.boolean, false),
    retired: types.optional(types.boolean, false),
    selection_state: types.maybe(types.string),
    user_has_finished_workflow: types.optional(types.boolean, false),
  }),
  userAgent: types.optional(types.string, navigator.userAgent),
  userLanguage: types.string,
  utcOffset: types.optional(types.string, ((new Date()).getTimezoneOffset() * 60).toString()),
  viewport: types.frozen({
    height: types.optional(types.integer, window.innerHeight),
    width: types.optional(types.integer, window.innerWidth)
  }),
  workflowVersion: types.string
})

const Classification = types
  .model('Classification', {
    annotations: types.map(types.union({
      dispatcher: (snapshot) => {
        const snapshotType = getType(snapshot)
        if (snapshotType.name === 'SingleChoiceAnnotation') return SingleChoiceAnnotation
        if (snapshotType.name === 'MultipleChoiceAnnotation') return MultipleChoiceAnnotation
        if (snapshotType.name === 'Graph2dRangeXAnnotation') return Graph2dRangeXAnnotation
      }
    }, SingleChoiceAnnotation, MultipleChoiceAnnotation, Graph2dRangeXAnnotation)),
    completed: types.optional(types.boolean, false),
    links: types.frozen({
      project: types.string,
      subjects: types.array(types.string),
      workflow: types.string
    }),
    metadata: types.maybe(ClassificationMetadata)
  })

export { ClassificationMetadata }
export default types.compose('ClassificationResource', Resource, Classification)
