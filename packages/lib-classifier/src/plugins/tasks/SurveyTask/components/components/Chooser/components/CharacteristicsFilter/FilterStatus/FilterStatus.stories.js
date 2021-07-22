import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'

import FilterStatus from './FilterStatus'

function StoryContext (props) {
  const { children, theme } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'neutral-6'
      }}
      theme={theme}
      themeMode={(theme.dark) ? 'dark' : 'light'}
    >
      {children}
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Chooser / CharacteristicsFilter / FilterStatus',
  component: FilterStatus
}

const Template = ({
  dark,
  disabled,
  task
}) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <FilterStatus
      disabled={disabled}
      task={task}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  dark: false,
  disabled: false,
  task: mockTask
}
