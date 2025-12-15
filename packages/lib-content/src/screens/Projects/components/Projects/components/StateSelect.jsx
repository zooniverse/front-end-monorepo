import { Select as GrommetSelect, ThemeContext } from 'grommet'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'
import selectTheme from './selectTheme'

const DEFAULT_HANDLER = () => true

const StyledSelect = styled(GrommetSelect)`
  text-align: center;
  text-transform: uppercase;
  color: ${props => (props.theme.dark ? 'white' : '#005D69')};
`

function StateSelect({ setProjectState = DEFAULT_HANDLER, value = 'live' }) {
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
      <StyledSelect
        a11yTitle={t('Projects.state.label')}
        id='state-filter-projects-page'
        name='State'
        labelKey='label'
        onChange={({ option }) => handleSelect(option)}
        options={options}
        size='medium'
        value={value}
        valueKey={{ key: 'value', reduce: true }}
      />
    </ThemeContext.Extend>
  )
}

export default StateSelect
