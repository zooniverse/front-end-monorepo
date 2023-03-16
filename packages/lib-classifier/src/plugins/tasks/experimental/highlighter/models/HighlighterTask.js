import cuid from 'cuid'
import { types } from 'mobx-state-tree'

import Task from '@plugins/tasks/models/Task'
import HighlighterAnnotation from './HighlighterAnnotation'

export const HighlighterLabel = types.model('HighlighterLabel', {
  color: types.string,
  label: types.string
})

const Highlighter = types.model('Highlighter', {
  annotation: types.safeReference(HighlighterAnnotation),
  highlighterLabels: types.array(HighlighterLabel),
  type: types.literal('highlighter')
})
  .views(self => ({
    defaultAnnotation (id = cuid()) {
      return HighlighterAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type
      })
    }
  }))

const HighlighterTask = types.compose('HighlighterTask', Task, Highlighter)

export default HighlighterTask
