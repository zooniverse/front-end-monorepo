import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import ConfusedWith from './ConfusedWith'
// import { task } from '@plugins/tasks/SurveyTask/mock-data'

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
  title: 'Tasks / SurveyTask / ConfusedWith',
  component: ConfusedWith
}

const Template = ({ dark }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <ConfusedWith />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  dark: false
}
