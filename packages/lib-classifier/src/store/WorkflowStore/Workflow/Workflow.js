import { flow, getRoot, tryReference, types } from 'mobx-state-tree'
import Resource from '@store/Resource'
import SubjectSet from '@store/SubjectSet'
import WorkflowConfiguration from './WorkflowConfiguration'

import { convertWorkflowToUseSteps } from '@store/helpers'

// The db type for steps is jsonb which is being serialized as an empty object when not defined.
// Steps will be stored as an array of pairs to preserve order.

const WorkflowStep = types.refinement(
  'WorkflowStep',
  types.array(types.union(types.string, types.frozen())),
  function validateStep([ stepKey, step ]) {
    const keyIsString = typeof stepKey === 'string'
    const stepIsObject = typeof step === 'object'
    return keyIsString && stepIsObject
  }
)

const Workflow = types
  .model('Workflow', {
    active: types.optional(types.boolean, false),
    configuration: WorkflowConfiguration,
    display_name: types.string,
    first_task: types.optional(types.string, ''),
    grouped: types.optional(types.boolean, false),
    links: types.frozen({}),
    prioritized: types.optional(types.boolean, false),
    steps: types.array(WorkflowStep),
    strings: types.map(types.string),
    subjectSet: types.safeReference(SubjectSet),
    tasks: types.maybe(types.frozen()),
    version: types.string
  })
  .preProcessSnapshot(
    /** convert Panoptes workflows to use steps, if necessary. */
    function convertPanoptesWorkflows(snapshot) {
      const workflowHasSteps = (snapshot.steps?.length > 0 && Object.keys(snapshot.tasks).length > 0)
      const newSnapshot = Object.assign({}, snapshot)
      const { steps, tasks } = convertWorkflowToUseSteps(newSnapshot)
      return { ...newSnapshot, steps, tasks }
    }
  )
  .views(self => ({
    get caesarReducer() {
      if (self.usesTranscriptionTask) {
        return 'alice'
      } else if (self.configuration.enable_caesar_data_fetching && self.usesMachineLearnt) {
        return 'machineLearnt'
      }

      return ''
    },

    get hasIndexedSubjects() {
      const activeSet = tryReference(() => self.subjectSet)
      return self.grouped && !!activeSet?.isIndexed
    },

    get layout() {
      if (self.usesTranscriptionTask) {
        return 'noMaxWidth'
      }
      if (self.configuration.layout) {
        return self.configuration.layout
      }
      return 'default'
    },

    get subjectSetId() {
      const activeSet = tryReference(() => self.subjectSet)
      return activeSet?.id
    },

    get usesTranscriptionTask() {
      const anyTranscriptionTasks = self.tasks && Object.values(self.tasks).some(task => {
        return task.type === 'transcription'
      })

      return anyTranscriptionTasks
    },

    get usesMachineLearnt() {
      const toolTypes = ['circle', 'ellipse', 'freehandLine', 'line', 'point', 'polygon', 'rectangle', 'rotateRectangle'];

      const hasAnyMatchingToolType = self.tasks && Object.values(self.tasks)
        .filter(task => !!task.tools)
        .some(task => {
          return task.tools.some(tool => toolTypes.includes(tool.type))
        })

      return hasAnyMatchingToolType
    }
  }))

  .actions(self => {

    function * selectSubjectSet(id) {
      const validSets = self.links.subject_sets || []
      if (validSets.indexOf(id) > -1) {
        const { subjectSets } = getRoot(self)
        const subjectSet = yield subjectSets.getResource(id)
        self.subjectSet = subjectSet.id
        return subjectSet
      }
      throw new Error(`No subject set ${id} for workflow ${self.id}`)
    }

    return {
      selectSubjectSet: flow(selectSubjectSet)
    }
  })

export default types.compose('WorkflowResource', Resource, Workflow)
