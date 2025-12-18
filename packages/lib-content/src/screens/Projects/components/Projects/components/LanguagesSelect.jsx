import { Select as GrommetSelect, ResponsiveContext, ThemeContext } from 'grommet'
import styled from 'styled-components'
import { useContext } from 'react'

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
  const size = useContext(ResponsiveContext)

  return (
    <ThemeContext.Extend value={selectTheme}>
      <StyledSelect
        a11yTitle={t('Projects.languages.label')}
        id='languages-filter-projects-page'
        name='Languages'
        labelKey='label'
        onChange={({ option }) => setLanguages(option.value)}
        options={options}
        size='medium'
        width={size === 'small' ? '100%' : '180px'}
        value={value}
        valueKey={{ key: 'value', reduce: true }}
      />
    </ThemeContext.Extend>
  )
}

export default LanguagesSelect
