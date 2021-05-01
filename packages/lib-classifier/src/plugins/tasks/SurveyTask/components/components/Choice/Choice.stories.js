import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import Choice from './Choice'
import { task } from '@plugins/tasks/SurveyTask/mock-data'

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
        align='end'
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

export const Default = Template.bind({});
Default.args = {
  dark: false,
  choiceId: 'KD',
  task
}
