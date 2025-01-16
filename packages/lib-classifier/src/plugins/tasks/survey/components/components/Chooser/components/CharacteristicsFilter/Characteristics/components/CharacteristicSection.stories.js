import { Box } from 'grommet'
import SurveyTask from '@plugins/tasks/survey'
import { task } from '@plugins/tasks/survey/mock-data'

import CharacteristicSection from './CharacteristicSection'

const mockTask = SurveyTask.TaskModel.create(task)
const characteristicLike = mockTask.characteristics.get('LK')

export default {
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / CharacteristicSection',
  component: CharacteristicSection,
  args: {
    selectedValueId: ''
  },
  argTypes: {
    selectedValueId: {
      type: 'select',
      options: characteristicLike.valuesOrder
    }
  }
}

export const Default = ({ selectedValueId }) => {
  return (
    <Box
      background='linear-gradient(180deg, rgba(255, 255, 255, 0.60) 0%, rgba(239, 242, 245, 0.60) 100%), #FFF;'
      pad='small'
    >
      <CharacteristicSection
        characteristic={characteristicLike}
        characteristicId='LK'
        images={mockTask.images}
        label={mockTask.strings.get('characteristics.LK.label')}
        selectedValueId={selectedValueId}
        strings={mockTask.strings}
      />
    </Box>
  )
}
