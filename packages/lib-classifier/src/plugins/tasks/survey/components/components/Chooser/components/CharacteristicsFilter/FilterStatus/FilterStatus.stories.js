import { Box, Grommet } from 'grommet'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import FilterStatus from './FilterStatus'

export default {
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / FilterStatus',
  component: FilterStatus,
  args: {
    dark: false,
    disabled: false,
    filters: {
      LK: 'CTDG',
      CLR: 'RD'
    }
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

const mockTask = SurveyTask.TaskModel.create(task)

export const Default = ({
  dark,
  disabled,
  filters
}) => {
  const themeMode = dark ? 'dark' : 'light'

  return (
    <Grommet
      background={background}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <Box
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        pad='1em'
        width='380px'
      >
        <FilterStatus
          disabled={disabled}
          filters={filters}
          task={mockTask}
        />    
      </Box>
    </Grommet>
  )
}
