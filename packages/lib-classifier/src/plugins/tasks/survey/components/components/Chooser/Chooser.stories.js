import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import Chooser from './Chooser'
import { task as mockTask } from '@plugins/tasks/survey/mock-data'

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
          background={{
            dark: 'dark-3',
            light: 'neutral-6'
          }}
          pad='medium'
          width='380px'
        >
          {children}
        </Box>
      </Box>
    </Grommet>
  )
}

export default {
  title: 'Tasks / SurveyTask / Chooser',
  component: Chooser
}

const Template = ({ autoFocus, dark, disabled, filters, selectedChoiceIds, task }) => (
  <StoryContext
    theme={{ ...zooTheme, dark }}
  >
    <Chooser
      autoFocus={autoFocus}
      disabled={disabled}
      filters={filters}
      handleFilter={() => console.log('handleFilter')}
      onChoose={() => console.log('onChoose')}
      selectedChoiceIds={selectedChoiceIds}
      task={task}
    />
  </StoryContext>
)

export const Default = Template.bind({})
Default.args = {
  autoFocus: true,
  dark: false,
  disabled: false,
  filters: {},
  selectedChoiceIds: [],
  task: mockTask
}
