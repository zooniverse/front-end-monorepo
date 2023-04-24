import { Box } from 'grommet'

import SurveyTask from '@plugins/tasks/survey'
import {
  task,
  taskWithMoreThanTwentyChoices
} from '@plugins/tasks/survey/mock-data'

import Choices from './Choices'

export default {
  title: 'Tasks / Survey / Chooser / Choices',
  component: Choices,
  args: {
    disabled: false
  },
  argTypes: {
    onChoose: {
      action: 'onChoose'
    }
  }
}
const mockTask = SurveyTask.TaskModel.create(task)
const filteredChoiceIds = Array.from(mockTask.choicesOrder)

const mockTaskWithMoreThanTwentyChoices = SurveyTask.TaskModel.create(
  taskWithMoreThanTwentyChoices
)
const filteredChoiceIdsMoreThanTwenty = Array.from(
  taskWithMoreThanTwentyChoices.choicesOrder
)

const Template = ({ disabled, filteredChoiceIds, onChoose, task }) => {
  return (
    <Box align='end' fill='horizontal'>
      <Box
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        pad='1em'
        width='380px'
      >
        <Choices
          disabled={disabled}
          filteredChoiceIds={filteredChoiceIds}
          onChoose={onChoose}
          task={task}
        />
      </Box>
    </Box>
  )
}

export const LessThirtyMoreTwenty = Template.bind({})
LessThirtyMoreTwenty.args = {
  filteredChoiceIds: filteredChoiceIdsMoreThanTwenty,
  task: mockTaskWithMoreThanTwentyChoices
}

export const LessTwentyMoreFive = Template.bind({})
LessTwentyMoreFive.args = {
  filteredChoiceIds,
  task: mockTask
}

export const LessThanSix = Template.bind({})
LessThanSix.args = {
  filteredChoiceIds: Array.from(filteredChoiceIds).splice(0, 4),
  task: mockTask
}
