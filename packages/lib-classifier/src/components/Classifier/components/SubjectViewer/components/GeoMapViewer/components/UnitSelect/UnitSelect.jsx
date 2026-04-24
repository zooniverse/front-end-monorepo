import { Box, Select, Text } from 'grommet'
import { func, string } from 'prop-types'

import { useTranslation } from '@translations/i18n'

export const UNIT_OPTIONS = ['meters', 'kilometers', 'feet', 'miles', 'nautical miles', 'degrees']

function UnitSelect({ onChange, value = 'meters' }) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.UnitSelect.label')

  return (
    <Box direction='row' align='center' gap='small'>
      <Text as='label' htmlFor='unit-select' size='small'>
        {label}
      </Text>
      <Select
        id='unit-select'
        options={UNIT_OPTIONS}
        value={value}
        onChange={({ option }) => onChange(option)}
        size='small'
      />
    </Box>
  )
}

UnitSelect.propTypes = {
  onChange: func.isRequired,
  value: string
}

export default UnitSelect
