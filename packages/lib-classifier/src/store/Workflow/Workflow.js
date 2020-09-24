import { flow, tryReference, types } from 'mobx-state-tree'
import Resource from '../Resource'
import SubjectSetStore from './SubjectSetStore'
import WorkflowConfiguration from './WorkflowConfiguration'

// The db type for steps is jsonb which is being serialized as an empty object when not defined.
// Steps will be stored as an array of pairs to preserve order.
const Workflow = types
  .model('Workflow', {
    active: types.optional(types.boolean, false),
    configuration: WorkflowConfiguration,
    display_name: types.string,
    first_task: types.optional(types.string, ''),
    grouped: types.optional(types.boolean, false),
    links: types.frozen({}),
    steps: types.union(types.frozen({}), types.array(types.array(
      types.union(types.string, types.frozen())
    ))),
    subjectSets: types.optional(SubjectSetStore, () => SubjectSetStore.create({})),
    tasks: types.maybe(types.frozen()),
    version: types.string
  })

  .views(self => ({
    get subjectSetId () {
      const activeSet = tryReference(() => self.subjectSets.active)
      return activeSet?.id
    },

    get usesTranscriptionTask () {
      return self.tasks && Object.values(self.tasks).some(task => {
        return task.type === 'transcription'
      })
    }
  }))

  .actions(self => {
    function * selectSubjectSet(id) {
      const validSets = self.links.subject_sets || []
      if (validSets.indexOf(id) > -1) {
        yield self.subjectSets.setActive(id)
        return tryReference(() => self.subjectSets.active)
      }
      throw new Error(`No subject set ${id} for workflow ${self.id}`)
    }

    return {
      selectSubjectSet: flow(selectSubjectSet)
    }
  })

export default types.compose('WorkflowResource', Resource, Workflow)
