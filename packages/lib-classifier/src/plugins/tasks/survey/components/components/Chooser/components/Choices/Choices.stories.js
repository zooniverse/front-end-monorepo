import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import SurveyTask from '@plugins/tasks/survey'
import { task, taskWithMoreThanTwentyChoices } from '@plugins/tasks/survey/mock-data'

import Choices from './Choices'

export default {
  title: 'Tasks / Survey / Chooser / Choices',
  component: Choices,
  args: {
    dark: false,
    disabled: false
  },
  argTypes: {
    onChoose: { 
      action: 'onChoose'
    }
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const mockTask = SurveyTask.TaskModel.create(task)
const filteredChoiceIds = Array.from(mockTask.choicesOrder)

const mockTaskWithMoreThanTwentyChoices = SurveyTask.TaskModel.create(taskWithMoreThanTwentyChoices)
const filteredChoiceIdsMoreThanTwenty = Array.from(taskWithMoreThanTwentyChoices.choicesOrder)

const Template = ({
  dark,
  disabled,
  filteredChoiceIds,
  onChoose,
  task
}) => {
  const themeMode = dark ? 'dark' : 'light'

  return (
    <Grommet
      background={background}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <Box
        align='end'
        fill='horizontal'
      >
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
    </Grommet>
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
