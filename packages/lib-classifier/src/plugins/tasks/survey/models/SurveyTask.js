import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SurveyAnnotation from './SurveyAnnotation'

function validateCharacteristic (characteristic) {
  return (
    typeof characteristic.label === 'string' &&
    characteristic.valuesOrder.every(item => typeof item === 'string') &&
    Object.keys(characteristic.values).every(valuesKey => typeof valuesKey === 'string') &&
    Object.values(characteristic.values).every(value => (
      typeof value.label === 'string' &&
      typeof value.image === 'string'
    ))
  )
}

const Characteristics = types.refinement(
  'Characteristics',
  types.frozen(),
  function validate (characteristic) {
    if (characteristic) {
      const validKeys = Object.keys(characteristic).every(key => typeof key === 'string')
      const validValues = Object.values(characteristic).every(value => validateCharacteristic(value))
      return validKeys && validValues
    }
  }
)

const Survey = types.model('Survey', {
  alwaysShowThumbnails: types.maybe(types.boolean),
  annotation: types.safeReference(SurveyAnnotation),
  characteristics: types.optional(types.frozen(Characteristics), {}),
  characteristicsOrder: types.array(types.string),
  choices: types.frozen({}),
  choicesOrder: types.array(types.string),
  exclusions: types.array(types.string),
  images: types.frozen({}),
  inclusions: types.array(types.string),
  questions: types.frozen({}),
  questionsMap: types.frozen({}),
  questionsOrder: types.array(types.string),
  type: types.literal('survey')
})
  .views(self => ({
    defaultAnnotation (id = cuid()) {
      return SurveyAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    },

    isComplete (annotation) {
      if (self.required) {
        return !!annotation?.isComplete
      } else {
        return !annotation._choiceInProgress
      }
    }
  }))

const SurveyTask = types.compose('SurveyTask', Task, Survey)

export default SurveyTask
