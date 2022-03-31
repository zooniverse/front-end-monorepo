import { autorun } from 'mobx'
import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'

import Annotation from '@plugins/tasks/models/Annotation'

const TextFromSubject = types
  .model('TextFromSubject', {
    taskType: types.literal('textFromSubject'),
    value: types.optional(types.string, '')
  })
  .volatile((self) => ({
    initializedFromSubject: false
  }))
  .views(self => ({
    get isComplete () {
      return self.initializedFromSubject && self.value !== ''
    }
  }))
  .actions(self => {
    function createSubjectObserver () {
      const subjectDisposer = autorun(() => {
        const validSubjectReference = isValidReference(() => getRoot(self).subjects.active)

        if (validSubjectReference) {
          const subject = getRoot(self).subjects.active
          const { content, contentLoadingState } = subject

          if (contentLoadingState === asyncStates.success && !self.initializedFromSubject) {
            self.updateFromSubject(content)
          }
        }
      }, { name: 'TextFromSubjectAnnotation Subject Observer autorun' })
      addDisposer(self, subjectDisposer)
    }

    return {
      afterAttach () {
        createSubjectObserver()
      },

      updateFromSubject (value) {
        self.initializedFromSubject = true
        self.update(value)
      }
    }
  })

const TextFromSubjectAnnotation = types.compose(
  'TextFromSubjectAnnotation',
  Annotation,
  TextFromSubject
)

export default TextFromSubjectAnnotation
