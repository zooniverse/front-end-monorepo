import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SurveyAnnotation from './SurveyAnnotation'

const Survey = types.model('Survey', {
  annotation: types.safeReference(SurveyAnnotation),
  characteristics: types.frozen({}),
  characteristicsOrder: types.array(types.string),
  choices: types.frozen({}),
  choicesOrder: types.array(types.string),
  exclusions: types.array(types.string),
  help: types.optional(types.string, ''),
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
    }
  }))

const SurveyTask = types.compose('SurveyTask', Task, Survey)

export default SurveyTask
