import { Box } from 'grommet'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import FilterStatus from './FilterStatus'

export default {
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / FilterStatus',
  component: FilterStatus,
  args: {
    disabled: false,
    filters: {
      LK: 'CTDG',
      CLR: 'RD'
    }
  }
}

const mockTask = SurveyTask.TaskModel.create(task)

export const Default = ({ disabled, filters }) => {
  return (
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
  )
}

export const Open = ({ disabled, filters }) => {
  return (
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
        filterOpen={true}
        filters={filters}
        task={mockTask}
      />
    </Box>
  )
}
