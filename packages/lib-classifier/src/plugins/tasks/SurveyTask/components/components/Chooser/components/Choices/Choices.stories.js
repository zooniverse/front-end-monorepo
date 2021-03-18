import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import Choices from './Choices'
import { task } from '@plugins/tasks/SurveyTask/mock-data'

const filteredChoiceIds = Array.from(task.choicesOrder)

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
        pad='1em'
        width='380px'
      >
        {children}
      </Box>
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Choices',
  component: Choices
}

const Template = ({ dark, filteredChoiceIds, task }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <Choices
      filteredChoiceIds={filteredChoiceIds}
      onChoose={() => console.log('button clicked')}
      task={task}
    />
  </StoryContext>
)

export const LessThirtyMoreTwenty = Template.bind({});
LessThirtyMoreTwenty.args = {
  dark: false,
  filteredChoiceIds,
  task
}

export const LessTwentyMoreFive = Template.bind({});
LessTwentyMoreFive.args = {
  dark: false,
  filteredChoiceIds: Array.from(filteredChoiceIds).splice(0, 10),
  task
}

export const LessThanSix = Template.bind({});
LessThanSix.args = {
  dark: false,
  filteredChoiceIds: Array.from(filteredChoiceIds).splice(0, 4),
  task
}
