import { Box } from 'grommet'

import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import Choice from './Choice'

const mockTask = SurveyTask.TaskModel.create(task)

export default {
  title: 'Tasks / Survey / Choice',
  component: Choice,
  args: {
    choiceId: 'KD'
  },
  argTypes: {
    choiceId: {
      type: 'select',
      options: mockTask.choicesOrder
    }
  }
}

export const Default = ({ choiceId }) => {
  return (
    <Box align='end' fill='horizontal'>
      <Box
        background={{
          dark: 'dark-3',
          light: 'neutral-6'
        }}
        pad='1em'
        width='540px'
      >
        <Choice choiceId={choiceId} task={mockTask} />
      </Box>
    </Box>
  )
}
