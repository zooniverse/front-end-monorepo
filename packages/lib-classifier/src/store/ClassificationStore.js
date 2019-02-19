import asyncStates from '@zooniverse/async-states'
import counterpart from 'counterpart'
import cuid from 'cuid'
import _ from 'lodash'
import { autorun, toJS } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import { Split } from 'seven-ten'

import Classification, { ClassificationMetadata } from './Classification'
import ResourceStore from './ResourceStore'
import { SingleChoiceAnnotation, MultipleChoiceAnnotation, Graph2dRangeXAnnotation } from './annotations'
import {
  ClassificationQueue,
  convertMapToArray,
  sessionUtils
} from './utils'
import { isServiceWorkerAvailable, isBackgroundSyncAvailable } from '../helpers/featureDetection'

const ClassificationStore = types
  .model('ClassificationStore', {
    active: types.maybe(types.reference(Classification)),
    resources: types.map(Classification),
    type: types.optional(types.string, 'classifications')
  })
  .views(self => ({
    get currentAnnotations () {
      if (self.active) {
        return self.active.annotations
      }
    },

    get classificationQueue () {
      const client = getRoot(self).client.panoptes
      return new ClassificationQueue(client, self.onClassificationSaved)
    }
  }))
  .actions(self => {
    function afterAttach () {
      createSubjectObserver()
    }

    function createSubjectObserver () {
      const subjectDisposer = autorun(() => {
        const subject = getRoot(self).subjects.active
        if (subject) {
          self.reset()
          self.createClassification(subject)
        }
      })
      addDisposer(self, subjectDisposer)
    }

    function createClassification (subject) {
      const tempID = cuid()
      const projectID = getRoot(self).projects.active.id
      const workflow = getRoot(self).workflows.active

      const newClassification = Classification.create({
        id: tempID, // Generate an id just for serialization in MST. Should be dropped before POST...
        links: {
          project: projectID,
          subjects: [subject.id],
          workflow: workflow.id
        },
        metadata: ClassificationMetadata.create({
          source: subject.metadata.intervention ? 'sugar' : 'api',
          subjectSelectionState: {
            alreadySeen: subject.alreadySeen,
            finishedWorkflow: subject.finishedWorkflow,
            retired: subject.retired,
            selection_state: subject.selectionState,
            user_has_finished_workflow: subject.userHasFinishedWorkflow,
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
      const classification = self.active
      classification.metadata = Object.assign({}, classification.metadata, newMetadata)
    }

    function getAnnotationType (taskType) {
      const taskTypes = {
        single: SingleChoiceAnnotation,
        multiple: MultipleChoiceAnnotation,
        graph2dRangeX: Graph2dRangeXAnnotation
      }

      return taskTypes[taskType] || undefined
    }

    function createDefaultAnnotation (task) {
      const classification = self.active
      if (classification) {
        const annotationModel = getAnnotationType(task.type)
        const newAnnotation = annotationModel.create({ task: task.taskKey })
        classification.annotations.put(newAnnotation)
        return newAnnotation
      }

      if (!classification) console.error('No active classification. Cannot create default annotations.')
    }

    function addAnnotation (annotationValue, task) {
      const classification = self.active
      if (classification) {
        const annotation = classification.annotations.get(task.taskKey) || createDefaultAnnotation(task)
        annotation.value = annotationValue
      }
    }

    function removeAnnotation (taskKey) {
      const classification = self.active
      const workflow = getRoot(self).workflows.active
      const isPersistAnnotationsSet = workflow.configuration.persist_annotations
      if (classification && !isPersistAnnotationsSet) classification.annotations.delete(taskKey)
    }

    function completeClassification (event) {
      event.preventDefault()
      const classification = self.active
      // TODO store intervention metadata if we have a user...
      self.updateClassificationMetadata({
        session: sessionUtils.getSessionID(),
        finishedAt: (new Date()).toISOString(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      })

      classification.completed = true
      // Convert from observables
      const classificationToSubmit = toJS(classification, { exportMapsAsObjects: false })
      delete classificationToSubmit.id // remove temp id
      classificationToSubmit.annotations = convertMapToArray(classificationToSubmit.annotations)

      const convertedMetadata = {}
      Object.entries(classificationToSubmit.metadata).forEach((entry) => {
        const key = _.snakeCase(entry[0])
        convertedMetadata[key] = entry[1]
      })
      classificationToSubmit.metadata = convertedMetadata

      console.log('Completed classification', classificationToSubmit)
      self.submitClassification(classificationToSubmit)
    }

    function onClassificationSaved (savedClassification) {
      Split.classificationCreated(savedClassification) // Metric log needs classification id
    }

    function * submitClassification (classification) {
      console.log('Saving classification')
      const root = getRoot(self)
      const client = root.client.panoptes
      self.loadingState = asyncStates.posting

      if (!isServiceWorkerAvailable() || !isBackgroundSyncAvailable()) {
        // Use fallback queuing class
        self.classificationQueue.add(classification)
      } else {
        try {
          const response = yield client.post(`/${self.type}`, { classifications: classification })
          if (response.ok) {
            const savedClassification = response.body.classifications[0]
            console.log(`Saved classification ${savedClassification.id}`)
            // TODO: instead of callback here, let's add a Split store that uses an observer
            self.onClassificationSaved(savedClassification)
            self.loadingState = asyncStates.success
          }
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }

    return {
      addAnnotation,
      afterAttach,
      completeClassification,
      createClassification,
      createDefaultAnnotation,
      onClassificationSaved,
      removeAnnotation,
      submitClassification: flow(submitClassification),
      updateClassificationMetadata
    }
  })

export default types.compose('ClassificationResourceStore', ResourceStore, ClassificationStore)
