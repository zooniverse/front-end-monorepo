import { Box } from 'grommet'

import FilterLabel from './FilterLabel'

const CTDG_SRC =
  'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/475c469d-448f-4207-8a58-2cb42a3faa60.svg'

export default {
  title: 'Tasks / Survey / Chooser / CharacteristicsFilter / FilterLabel',
  component: FilterLabel,
  args: {
    checked: false,
    selected: false
  }
}

export const Default = ({ checked, selected }) => {
  return (
    <Box justify='center' pad='1em' size='medium'>
      <FilterLabel
        characteristicId='LK'
        checked={checked}
        selected={selected}
        valueId='CTDG'
        valueImageSrc={CTDG_SRC}
        valueLabel='cat/dog'
      />
    </Box>
  )
}
