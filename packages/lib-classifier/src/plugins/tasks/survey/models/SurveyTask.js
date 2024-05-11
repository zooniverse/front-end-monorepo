import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../models/Task'
import SurveyAnnotation from './SurveyAnnotation'

const CharacteristicValue = types.model('CharacteristicValue', {
  label: types.string,
  image: types.string
})

const Characteristic = types.model('Characteristic', {
  label: types.string,
  values: types.map(CharacteristicValue),
  valuesOrder: types.array(types.string)
})

const Answer = types.model('Answer', {
  label: types.string
})

const Question = types.model('Question', {
  label: types.string,
  multiple: types.optional(types.boolean, false),
  required: types.optional(types.boolean, false),
  answersOrder: types.array(types.string),
  answers: types.map(Answer)
})

const Choice = types.model('Choice', {
  label: types.string,
  description: types.maybe(types.string),
  noQuestions: types.optional(types.boolean, false),
  images: types.array(types.string),
  characteristics: types.map(types.array(types.string)),
  confusionsOrder: types.array(types.string),
  confusions: types.map(types.string)
})

const Survey = types.model('Survey', {
  // alwaysShowThumbnails is deprecated in favor of the `thumbnails` property
  alwaysShowThumbnails: types.maybe(types.boolean),
  annotation: types.safeReference(SurveyAnnotation),
  characteristics: types.optional(types.map(Characteristic), {}),
  characteristicsOrder: types.array(types.string),
  choices: types.map(Choice),
  choicesOrder: types.array(types.string),
  exclusions: types.array(types.string),
  images: types.map(types.string),
  inclusions: types.array(types.string),
  // map question IDs to question objects.
  questions: types.map(Question),
  // map choice IDs to question IDs.
  questionsMap: types.map(types.array(types.string)),
  // order of question IDs to be asked.
  questionsOrder: types.array(types.string),
  thumbnails: types.maybe(
    types.enumeration('thumbnails', ['show', 'hide', 'default'])
  ),
  type: types.literal('survey')
})
  .preProcessSnapshot(snapshot => {
    if (snapshot.hasOwnProperty('alwaysShowThumbnails')) {
      const newSnapshot = { ...snapshot }
      // 'true' and 'false' are both true.
      if (snapshot.alwaysShowThumbnails === 'false') {
        newSnapshot.alwaysShowThumbnails = false
      }
      if (snapshot.alwaysShowThumbnails === 'true') {
        newSnapshot.alwaysShowThumbnails = true
      }
      newSnapshot.alwaysShowThumbnails = !!newSnapshot.alwaysShowThumbnails
      /*
      See the lab editor for the thumbnails/alwaysShowThumbnails logic:
      https://github.com/zooniverse/Panoptes-Front-End/blob/9ca8f70f0d6e836ca931168915c9aed02edf8b1d/app/classifier/tasks/survey/editor.cjsx#L330
      */
      if (!newSnapshot.hasOwnProperty('thumbnails')) {
        newSnapshot.thumbnails = newSnapshot.alwaysShowThumbnails ? 'show' : 'default'
      }
      return newSnapshot
    }
    return snapshot
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
