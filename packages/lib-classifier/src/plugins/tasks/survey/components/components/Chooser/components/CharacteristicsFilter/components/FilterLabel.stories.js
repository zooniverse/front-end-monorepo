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
    <Box
      background={{
        dark: 'linear-gradient(180deg, rgba(51, 51, 51, 0.80) 0%, rgba(51, 51, 51, 0.80) 100%), #333333;',
        light: 'linear-gradient(180deg, rgba(255, 255, 255, 0.60) 0%, rgba(239, 242, 245, 0.60) 100%), #FFF;'
      }}
      justify='center'
      pad='1em'
      size='medium'
    >
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
