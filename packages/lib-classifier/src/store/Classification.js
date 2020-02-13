import cuid from 'cuid'
import { types, getSnapshot, getType } from 'mobx-state-tree'
import { annotationModels } from '@plugins/tasks'
import AnnotationsStore from './AnnotationsStore'
import Resource from './Resource'

const ClassificationMetadata = types.model('ClassificationMetadata', {
  classifier_version: types.literal('2.0'),
  feedback: types.frozen({}),
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
    already_seen: types.optional(types.boolean, false),
    finished_workflow: types.optional(types.boolean, false),
    retired: types.optional(types.boolean, false),
    selected_at: types.maybe(types.string),
    selection_state: types.maybe(types.string),
    user_has_finished_workflow: types.optional(types.boolean, false)
  }),
  subject_flagged: types.optional(types.boolean, false),
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
    annotations: types.map(types.union(...annotationModels)),
    completed: types.optional(types.boolean, false),
    links: types.frozen({
      project: types.string,
      subjects: types.array(types.string),
      workflow: types.string
    }),
    metadata: types.maybe(ClassificationMetadata)
  })
  .views(self => ({
    toSnapshot () {
      let snapshot = getSnapshot(self)
      let annotations = []
      self.annotations.forEach(annotation => {
        annotations = annotations.concat(annotation.toSnapshot())
      })
      snapshot = Object.assign({}, snapshot, { annotations })
      return snapshot
    }
  }))
  .preProcessSnapshot(snapshot => {
    let newSnapshot = Object.assign({}, snapshot)
    // generate classification IDs, if not present
    newSnapshot.id = snapshot.id || cuid()
    // convert any annotations arrays to a map
    if (snapshot.annotations && Array.isArray(snapshot.annotations)) {
      const annotations = {}
      snapshot.annotations.forEach(annotation => {
        annotation.id = annotation.id || cuid()
        annotations[annotation.id] = annotation
      })
      newSnapshot = Object.assign({}, newSnapshot, { annotations })
    }
    return newSnapshot
  })
  .postProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    // remove temporary classification IDs
    // TODO: leave the ID if it came from Panoptes
    delete newSnapshot.id
    // convert annotations to an array
    newSnapshot.annotations = Object.values(snapshot.annotations)
    return newSnapshot
  })

export { ClassificationMetadata }
export default types.compose('ClassificationResource', Resource, AnnotationsStore, Classification)
