import { CheckBox, Text } from 'grommet'
import { useTranslation } from 'next-i18next/pages'
import { bool, func } from 'prop-types'
import { ThemeProvider } from 'styled-components'

function Label () {
  const { t } = useTranslation('screens')

  return (
    <Text size='0.875rem'>
      {t('Collect.hideSingleSubject')}
    </Text>
  )
}

function MinSubjectsToggle ({ checked = true, onChange }) {
  function handleChange(event) {
    onChange(event.target.checked)
  }

  return (
    <ThemeProvider theme={{ mode: 'dark' }}>
      <CheckBox
        checked={checked}
        label={<Label />}
        onChange={handleChange}
        reverse
        toggle
      />
    </ThemeProvider>
  )
}

MinSubjectsToggle.propTypes = {
  checked: bool,
  onChange: func.isRequired
}

export default MinSubjectsToggle