import { useState } from 'react'
import counterpart from 'counterpart'
import localeMenu from '@helpers/localeMenu'
import { Box, Select } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { SpacedText } from '@zooniverse/react-components'

const LocaleToggle = ({ availableLocales }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onChange = (option) => {
    counterpart.setLocale(option.key)
  }

  const dropContent = availableLocales.map(language => (
    <Box key={language} as='ul' pad='none' margin='none'>
      <SpacedText>{localeMenu[language]}</SpacedText>
    </Box>
  ))

  return (
    <Select
      alignSelf='center'
      dropAlign={{ top: 'bottom' }}
      focusIndicator
      isOpen={isOpen}
      multiple={false}
      name='Locale Toggle'
      onChange={({ option }) => onChange(option)}
      onClose={onClose}
      onOpen={onOpen}
      options={dropContent}
      plain
      size='medium'
      value={
        <Box>
          {localeMenu[counterpart.getLocale()]}
        </Box>
      }
    />
  )
}

LocaleToggle.propTypes = {
  availableLanguages: arrayOf(string),
  theme: shape({
    global: shape({
      colors: shape({
        'accent-1': string,
        brand: string
      })
    })
  })
}

export default LocaleToggle
