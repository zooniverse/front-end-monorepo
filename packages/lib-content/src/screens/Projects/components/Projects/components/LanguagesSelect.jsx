import { Box, Select as GrommetSelect, ThemeContext } from 'grommet'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

import { useTranslation } from '@translations/i18n'
import selectTheme from './selectTheme'
import localeMenu from '../localeMenu'

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

const options = Object.keys(localeMenu).map((key) => {
  const value = key.toString()
  const label = localeMenu[key]
  return { label, value }
})

function LanguagesSelect({
  setLanguages = DEFAULT_HANDLER,
  value = 'en'
}) {
  const { t } = useTranslation()

  function handleSelect(option) {
    setLanguages(option.value)
  }

  return (
    <ThemeContext.Extend value={selectTheme}>
      <Box>
        <label>
          <StyledLabel htmlFor='languages-filter-projects-page'>
            {t('Projects.languages.label')}:
          </StyledLabel>
        </label>
        <StyledSelect
          id='languages-filter-projects-page'
          name='Languages'
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

export default LanguagesSelect
