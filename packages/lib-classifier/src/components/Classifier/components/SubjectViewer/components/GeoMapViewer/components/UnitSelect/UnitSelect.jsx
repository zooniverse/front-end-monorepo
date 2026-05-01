import { SpacedText } from '@zooniverse/react-components'
import { Box, Select, ThemeContext } from 'grommet'
import { Down } from 'grommet-icons'
import { func, string } from 'prop-types'

import { useTranslation } from '@translations/i18n'

import unitSelectTheme from './unitSelectTheme'

export const UNIT_OPTIONS = ['meters', 'kilometers', 'feet', 'miles', 'nautical miles']

function UnitSelect({ onChange, value = 'meters' }) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.UnitSelect.label')

  return (
    <ThemeContext.Extend value={unitSelectTheme}>
      <Box direction='row' align='center' gap='small'>
        <SpacedText
          forwardedAs='label'
          htmlFor='unit-select'
          size='1rem'
          weight='bold'
        >
          {label}
        </SpacedText>
        <Select
          id='unit-select'
          icon={<Down size='small' />}
          onChange={({ option }) => onChange(option)}
          options={UNIT_OPTIONS}
          size='small'
          value={value}
        />
      </Box>
    </ThemeContext.Extend>
  )
}

UnitSelect.propTypes = {
  onChange: func.isRequired,
  value: string
}

export default UnitSelect
