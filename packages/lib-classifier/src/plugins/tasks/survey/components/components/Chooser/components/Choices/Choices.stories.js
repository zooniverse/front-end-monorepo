import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import Choices from './Choices'
import SurveyTask from '@plugins/tasks/survey'
import { task, taskWithMoreThanTwentyChoices } from '@plugins/tasks/survey/mock-data'

const mockTask = SurveyTask.TaskModel.create(task)
const filteredChoiceIds = Array.from(mockTask.choicesOrder)

const mockTaskWithMoreThanTwentyChoices = SurveyTask.TaskModel.create(taskWithMoreThanTwentyChoices)
const filteredChoiceIdsMoreThanTwenty = Array.from(taskWithMoreThanTwentyChoices.choicesOrder)

function StoryContext (props) {
  const { children, theme } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
      themeMode={(theme.dark) ? 'dark' : 'light'}
    >
      <Box
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        pad='medium'
        width='380px'
      >
        {children}
      </Box>
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Chooser / Choices',
  component: Choices,
  argTypes: {
    onChoose: { action: 'onChoose' },
  }
}

const Template = ({
  dark,
  disabled,
  filteredChoiceIds,
  onChoose,
  task
}) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <Choices
      disabled={disabled}
      filteredChoiceIds={filteredChoiceIds}
      onChoose={onChoose}
      task={task}
    />
  </StoryContext>
)

export const LessThirtyMoreTwenty = Template.bind({})
LessThirtyMoreTwenty.args = {
  dark: false,
  disabled: false,
  filteredChoiceIds: filteredChoiceIdsMoreThanTwenty,
  task: mockTaskWithMoreThanTwentyChoices
}

export const LessTwentyMoreFive = Template.bind({})
LessTwentyMoreFive.args = {
  dark: false,
  disabled: false,
  filteredChoiceIds,
  task: mockTask
}

export const LessThanSix = Template.bind({})
LessThanSix.args = {
  dark: false,
  disabled: false,
  filteredChoiceIds: Array.from(filteredChoiceIds).splice(0, 4),
  task: mockTask
}
