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
  component: Choices
}

const Template = ({ autoFocus, dark, disabled, filteredChoiceIds, task }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <Choices
      autoFocus={autoFocus}
      disabled={disabled}
      filteredChoiceIds={filteredChoiceIds}
      onChoose={() => console.log('button clicked')}
      task={task}
    />
  </StoryContext>
)

export const LessThirtyMoreTwenty = Template.bind({})
LessThirtyMoreTwenty.args = {
  autoFocus: true,
  dark: false,
  disabled: false,
  filteredChoiceIds: filteredChoiceIdsMoreThanTwenty,
  task: mockTaskWithMoreThanTwentyChoices
}

export const LessTwentyMoreFive = Template.bind({})
LessTwentyMoreFive.args = {
  autoFocus: true,
  dark: false,
  disabled: false,
  filteredChoiceIds,
  task: mockTask
}

export const LessThanSix = Template.bind({})
LessThanSix.args = {
  autoFocus: true,
  dark: false,
  disabled: false,
  filteredChoiceIds: Array.from(filteredChoiceIds).splice(0, 4),
  task: mockTask
}
