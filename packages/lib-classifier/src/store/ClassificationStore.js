import asyncStates from '@zooniverse/async-states'
import counterpart from 'counterpart'
import cuid from 'cuid'
import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'

import Classification from './Classification'
import ResourceStore from './ResourceStore'
import { SingleChoiceAnnotation, MultipleChoiceAnnotation } from './annotations'

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
        source: subject.metadata.intervention ? 'sugar' : 'api',
        subjectDimensions: (subject.locations.map(() => null)),
        userLanguage: counterpart.getLocale(),
        workflowVersion: workflow.version
      })

      self.resources.put(newClassification)
      self.setActive(tempID)
      self.loadingState = asyncStates.success
    }

    function getAnnotationType (taskType) {
      const taskTypes = {
        single: SingleChoiceAnnotation,
        multiple: MultipleChoiceAnnotation
      }

      return taskTypes[taskType] || undefined
    }

    function createDefaultAnnotation (task) {
      const activeClassification = self.active
      if (activeClassification) {
        const annotationModel = getAnnotationType(task.type)
        const newAnnotation = annotationModel.create({ task: task.taskKey })
        activeClassification.annotations.put(newAnnotation)
        return newAnnotation
      }

      if (!activeClassification) console.error('No active classification. Cannot create default annotations.')
    }

    function addAnnotation (annotationValue, task) {
      const activeClassification = self.active
      if (activeClassification) {
        const annotation = activeClassification.annotations.get(task.taskKey) || createDefaultAnnotation(task)
        annotation.value = annotationValue
      }
    }

    function removeAnnotation (taskKey) {
      const currentClassification = self.active

      if (currentClassification) currentClassification.annotations.delete(taskKey)
    }

    return {
      addAnnotation,
      afterAttach,
      createClassification,
      createDefaultAnnotation,
      removeAnnotation
    }
  })

export default types.compose(ResourceStore, ClassificationStore)
