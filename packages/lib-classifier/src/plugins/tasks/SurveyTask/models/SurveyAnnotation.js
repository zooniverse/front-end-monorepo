import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

const SurveyChoice = types.model('SurveyChoice', {
  answers: types.optional(types.frozen({}), {}),
  choice: types.string,
  filters: types.optional(types.frozen({}), {})
})

const Survey = types.model('Survey', {
  value: types.optional(types.array(SurveyChoice), [])
})
  .views(self => ({
    get isComplete () {
      return self.value.length > 0
    }
  }))

const SurveyAnnotation = types.compose('SurveyAnnotation', Annotation, Survey)

export default SurveyAnnotation
