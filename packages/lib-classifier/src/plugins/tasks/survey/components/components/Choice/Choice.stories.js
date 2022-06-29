import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import Choice from './Choice'
import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'
const mockTask = SurveyTask.TaskModel.create(task)

function StoryContext (props) {
  const { children, theme } = props

  return (
    <Grommet
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      theme={theme}
      themeMode={(theme.dark) ? 'dark' : 'light'}
    >
      <Box
        align='center'
        width='full'
      >
        <Box
          width='380px'
        >
          {children}
        </Box>
      </Box>
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Choice',
  component: Choice
}

const Template = ({ dark, choiceId, task }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <Choice
      choiceId={choiceId}
      task={task}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  dark: false,
  choiceId: 'KD',
  task: mockTask
}
Default.argTypes = {
  choiceId: {
    options: ['KD', 'FR', 'NTHNGHR', 'HMN'],
    control: { type: 'radio' }
  }
}
