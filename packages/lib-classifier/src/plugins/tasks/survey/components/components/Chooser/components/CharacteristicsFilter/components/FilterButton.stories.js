import { Box } from 'grommet'

import FilterButton from './FilterButton'

const CTDG_SRC =
  'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/475c469d-448f-4207-8a58-2cb42a3faa60.svg'

export default {
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / FilterButton',
  component: FilterButton,
  args: {
    checked: false
  }
}

export const Default = ({ checked }) => {
  return (
    <Box justify='center' pad='1em' size='medium'>
      <FilterButton
        characteristicId='LK'
        checked={checked}
        valueId='CTDG'
        valueImageSrc={CTDG_SRC}
        valueLabel='cat/dog'
      />
    </Box>
  )
}
