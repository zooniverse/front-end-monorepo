import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SurveyChoice = types.model('SurveyChoice', {
  answers: types.optional(types.frozen({}), {}),
  choice: types.string,
  filters: types.optional(types.frozen({}), {})
})

const Survey = types.model('Survey', {
  value: types.optional(types.array(SurveyChoice), []),
  _choiceInProgress: types.optional(types.boolean, false)
})
  .views(self => ({
    get isComplete () {
      return self.value.length > 0 && !self._choiceInProgress
    }
  }))
  .actions(self => ({
    setChoiceInProgress (boolean) {
      self._choiceInProgress = boolean
    }
  }))

const SurveyAnnotation = types.compose('SurveyAnnotation', Annotation, Survey)

export default SurveyAnnotation
