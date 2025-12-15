import { Select as GrommetSelect, ThemeContext } from 'grommet'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'
import selectTheme from './selectTheme'
import localeMenu from '../localeMenu'

const DEFAULT_HANDLER = () => true

const StyledSelect = styled(GrommetSelect)`
  text-align: center;
  text-transform: uppercase;
  color: ${props => (props.theme.dark ? 'white' : '#005D69')};
`

const options = Object.keys(localeMenu).map(key => {
  const value = key.toString()
  const label = localeMenu[key]
  return { label, value }
})

function LanguagesSelect({
  setLanguages = DEFAULT_HANDLER,
  value = undefined
}) {
  const { t } = useTranslation()

  function handleSelect(option) {
    setLanguages(option.value)
  }

  return (
    <ThemeContext.Extend value={selectTheme}>
      <StyledSelect
        a11yTitle={t('Projects.languages.label')}
        id='languages-filter-projects-page'
        name='Languages'
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

export default LanguagesSelect
