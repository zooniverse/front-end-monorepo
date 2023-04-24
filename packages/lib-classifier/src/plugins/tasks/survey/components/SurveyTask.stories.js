import { Box } from 'grommet'
import asyncStates from '@zooniverse/async-states'

import { task } from '@plugins/tasks/survey/mock-data'
import { MockTask } from '@stories/components'

import SurveyTask from './SurveyTask'

export default {
  title: 'Tasks / Survey',
  component: SurveyTask,
  args: {
    subjectReadyState: asyncStates.success
  },
  argTypes: {
    subjectReadyState: {
      type: 'select',
      options: Object.keys(asyncStates)
    }
  }
}

const Template = ({
  subjectReadyState,
  task
}) => {
  const tasks = { T0: task }

  return (
    <Box
      fill='horizontal'
      align='end'
    >
      <MockTask
        isThereTaskHelp={false}
        subjectReadyState={subjectReadyState}
        tasks={tasks}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  task
}

const taskWithoutCharacteristics = { ...task, characteristics: {} }
export const NoFilters = Template.bind({})
NoFilters.args = {
  task: taskWithoutCharacteristics
}
