import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import Choices from './Choices'
import task from '../../../../../data/task'

const filteredChoices = Array.from(task.choicesOrder)

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

const Template = ({ dark, filteredChoices, task }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <Choices
      filteredChoices={filteredChoices}
      onChoose={() => console.log('button clicked')}
      task={task}
    />
  </StoryContext>
)

export const MoreThanTwenty = Template.bind({});
MoreThanTwenty.args = {
  dark: false,
  filteredChoices,
  task
}

export const LessTwentyMoreFive = Template.bind({});
LessTwentyMoreFive.args = {
  dark: false,
  filteredChoices: Array.from(filteredChoices).splice(0, 12),
  task
}

export const LessThanSix = Template.bind({});
LessThanSix.args = {
  dark: false,
  filteredChoices: Array.from(filteredChoices).splice(0, 4),
  task
}
