import asyncStates from '@zooniverse/async-states'
import counterpart from 'counterpart'
import cuid from 'cuid'
import _ from 'lodash'
import { autorun, toJS } from 'mobx'
import { addDisposer, flow, getRoot, isValidReference, types } from 'mobx-state-tree'
import { Split } from 'seven-ten'

import Classification, { ClassificationMetadata } from './Classification'
import ResourceStore from './ResourceStore'
import {
  ClassificationQueue,
  sessionUtils
} from './utils'

const ClassificationStore = types
  .model('ClassificationStore', {
    active: types.safeReference(Classification),
    resources: types.map(Classification),
    type: types.optional(types.string, 'classifications')
  })
  .views(self => ({
    annotation (task) {
      const validClassificationReference = isValidReference(() => self.active)
      if (validClassificationReference) {
        return self.active.annotation(task)
      }
      return null
    },

    get currentAnnotations () {
      const validClassificationReference = isValidReference(() => self.active)
      if (validClassificationReference) {
        return self.active.annotations
      }
      return []
    },

    get classificationQueue () {
      const client = getRoot(self).client.panoptes
      const { authClient } = getRoot(self)
      return new ClassificationQueue(client, self.onClassificationSaved, authClient)
    }
  }))
  .volatile(self => {
    return {
      onComplete: () => null
    }
  })
  .actions(self => {
    function afterAttach () {
      createSubjectObserver()
    }

    function createSubjectObserver () {
      const subjectDisposer = autorun(() => {
        const { projects, subjects, workflows } = getRoot(self)
        const validSubjectReference = isValidReference(() => subjects && subjects.active)
        const validWorkflowReference = isValidReference(() => workflows && workflows.active)
        const validProjectReference = isValidReference(() => projects && projects.active)
        if (validSubjectReference && validWorkflowReference && validProjectReference) {
          const subject = getRoot(self).subjects.active
          const workflow = getRoot(self).workflows.active
          const project = getRoot(self).projects.active
          self.reset()
          self.createClassification(subject, workflow, project)
        }
      }, { name: 'ClassificationStore Subject Observer autorun' })
      addDisposer(self, subjectDisposer)
    }

    function createClassification (subject, workflow, project) {
      if (!subject || !workflow || !project) {
        throw new Error('Cannot create a classification without a subject, workflow, project')
      }

      const tempID = cuid()
      const newClassification = Classification.create({
        id: tempID, // Generate an id just for serialization in MST. Should be dropped before POST...
        links: {
          project: project.id,
          subjects: [subject.id],
          workflow: workflow.id
        },
        metadata: ClassificationMetadata.create({
          classifier_version: '2.0',
          source: subject.metadata.intervention ? 'sugar' : 'api',
          subjectSelectionState: {
            already_seen: subject.already_seen,
            finished_workflow: subject.finished_workflow,
            retired: subject.retired,
            selected_at: subject.selected_at,
            selection_state: subject.selection_state,
            user_has_finished_workflow: subject.user_has_finished_workflow
          },
          userLanguage: counterpart.getLocale(),
          workflowVersion: workflow.version
        })
      })

      self.resources.put(newClassification)
      self.setActive(tempID)
      self.loadingState = asyncStates.success
    }

    function updateClassificationMetadata (newMetadata) {
      const validClassificationReference = isValidReference(() => self.active)
      if (validClassificationReference) {
        const classification = self.active
        classification.metadata = Object.assign({}, classification.metadata, newMetadata)
      } else {
        if (process.browser) {
          console.error('No active classification. Cannot update metadata')
        }
      }
    }

    function addAnnotation (task, annotationValue) {
      const validClassificationReference = isValidReference(() => self.active)

      if (validClassificationReference) {
        const classification = self.active
        if (classification) {
          return classification.addAnnotation(task, annotationValue)
        }
      } else {
        if (process.browser) {
          // TODO: throw an error here?
          console.error('No active classification. Cannot add annotation.')
          return null
        }
      }
    }

    function removeAnnotation (taskKey) {
      const validClassificationReference = isValidReference(() => self.active)
      const validWorkflowReference = isValidReference(() => getRoot(self).workflows.active)

      if (validClassificationReference && validWorkflowReference) {
        const classification = self.active
        const workflow = getRoot(self).workflows.active
        const isPersistAnnotationsSet = workflow.configuration.persist_annotations
        if (!isPersistAnnotationsSet) classification.removeAnnotation(taskKey)
      } else {
        if (process.browser) {
          console.error('No active classification or no active workflow. Cannot remove annotation.')
        }
      }
    }

    function completeClassification () {
      const validClassificationReference = isValidReference(() => self.active)
      const validSubjectReference = isValidReference(() => getRoot(self).subjects.active)

      if (validClassificationReference && validSubjectReference) {
        const classification = self.active
        const subjectDimensions = toJS(getRoot(self).subjectViewer.dimensions)

        const metadata = {
          finishedAt: (new Date()).toISOString(),
          session: sessionUtils.getSessionID(),
          subjectDimensions,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        }

        const feedback = getRoot(self).feedback
        if (feedback.isValid) {
          metadata.feedback = toJS(feedback.rules)
        }

        // TODO store intervention metadata if we have a user...
        self.updateClassificationMetadata(metadata)

        classification.completed = true
        // Convert from observables
        let classificationToSubmit = classification.toSnapshot()

        const convertedMetadata = {}
        Object.entries(classificationToSubmit.metadata).forEach((entry) => {
          const key = _.snakeCase(entry[0])
          convertedMetadata[key] = entry[1]
        })
        classificationToSubmit.metadata = convertedMetadata

        const subject = getRoot(self).subjects.active
        self.onComplete(classification.toJSON(), subject.toJSON())

        if (process.browser) {
          console.log('Completed classification', classificationToSubmit)
        }
        return self.submitClassification(classificationToSubmit)
      } else {
        if (process.browser) {
          console.error('No active classification or active subject. Cannot complete classification')
        }
      }
    }

    function onClassificationSaved (savedClassification) {
      Split.classificationCreated(savedClassification) // Metric log needs classification id
    }

    function * submitClassification (classification) {
      self.loadingState = asyncStates.posting

      // Service worker isn't working right now, so let's use the fallback queue for all browsers
      try {
        yield self.classificationQueue.add(classification)
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function setOnComplete (onComplete) {
      self.onComplete = onComplete
    }

    return {
      addAnnotation,
      afterAttach,
      completeClassification,
      createClassification,
      onClassificationSaved,
      removeAnnotation,
      setOnComplete,
      submitClassification: flow(submitClassification),
      updateClassificationMetadata
    }
  })

export default types.compose('ClassificationResourceStore', ResourceStore, ClassificationStore)
