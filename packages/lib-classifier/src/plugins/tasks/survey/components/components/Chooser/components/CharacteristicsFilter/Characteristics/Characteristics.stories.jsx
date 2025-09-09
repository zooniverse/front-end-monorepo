import { Box } from 'grommet'
import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import Characteristics from './Characteristics'

const mockTask = SurveyTask.TaskModel.create(task)

export default {
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / Characteristics',
  component: Characteristics,
  args: {
  
  }
}

export const Default = () => {
  return (
    <Box
      width={{ max: '500px'}}
    >
      <Characteristics
        characteristics={mockTask.characteristics}
        characteristicsOrder={mockTask.characteristicsOrder}
        images={mockTask.images}
        strings={mockTask.strings}
      />
    </Box>
  )
}
