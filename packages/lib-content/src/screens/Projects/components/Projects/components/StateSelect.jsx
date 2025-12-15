import { Box, Select as GrommetSelect, ThemeContext } from 'grommet'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

import { useTranslation } from '@translations/i18n'
import selectTheme from './selectTheme'

const DEFAULT_HANDLER = () => true

const StyledSelect = styled(GrommetSelect)`
  text-align: center;
  text-transform: uppercase;
`

const StyledLabel = styled(SpacedText)`
  // Visually hidden but remain in the accessibility tree
  position: absolute;
  opacity: 0;
`

function SortBySelect({
  setProjectState = DEFAULT_HANDLER,
  value = '-launch_date'
}) {
  const { t } = useTranslation()

  const options = [
    { label: t('Projects.state.active'), value: 'live' },
    { label: t('Projects.state.paused'), value: 'paused' },
    { label: t('Projects.state.finished'), value: 'finished' }
  ]

  function handleSelect(option) {
    setProjectState(option.value)
  }

  return (
    <ThemeContext.Extend value={selectTheme}>
      <Box>
        <label>
          <StyledLabel htmlFor='state-filter-projects-page'>
            {t('Projects.state.label')}:
          </StyledLabel>
        </label>
        <StyledSelect
          id='state-filter-projects-page'
          name='State'
          labelKey='label'
          onChange={({ option }) => handleSelect(option)}
          options={options}
          size='medium'
          value={value}
          valueKey={{ key: 'value', reduce: true }}
        />
      </Box>
    </ThemeContext.Extend>
  )
}

export default SortBySelect
