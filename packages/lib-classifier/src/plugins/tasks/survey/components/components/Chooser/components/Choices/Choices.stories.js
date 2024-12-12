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

const Template = ({
  disabled,
  filteredChoiceIds,
  onChoose,
  selectedChoiceIds,
  task
}) => {
  return (
    <Box align='end' fill='horizontal'>
      <Box
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        margin='20px'
        width='498px'
      >
        <Choices
          disabled={disabled}
          filteredChoiceIds={filteredChoiceIds}
          onChoose={onChoose}
          selectedChoiceIds={selectedChoiceIds}
          task={task}
        />
      </Box>
    </Box>
  )
}

export const LessThirtyMoreTwenty = Template.bind({})
LessThirtyMoreTwenty.args = {
  filteredChoiceIds: filteredChoiceIdsMoreThanTwenty,
  selectedChoiceIds: ['RDVRK1', 'KD1'],
  task: mockTaskWithMoreThanTwentyChoices
}

export const LessTwentyMoreFive = Template.bind({})
LessTwentyMoreFive.args = {
  filteredChoiceIds,
  selectedChoiceIds: ['FR', 'KD'],
  task: mockTask
}

export const LessThanSix = Template.bind({})
LessThanSix.args = {
  filteredChoiceIds: Array.from(filteredChoiceIds).splice(0, 4),
  selectedChoiceIds: ['KD'],
  task: mockTask
}
