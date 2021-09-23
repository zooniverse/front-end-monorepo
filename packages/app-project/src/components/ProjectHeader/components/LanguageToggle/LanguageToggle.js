import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Select } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { useState } from 'react'

const LanguageToggle = ({ availableLanguages }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(null)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onChange = (option) => {
    setCurrentLanguage(option.key)
  }

  const dropContent = availableLanguages.map(language => (
    <Box key={language} as='ul' pad='none' margin='none'>
      <SpacedText>{language}</SpacedText>
    </Box>
  ))

  return (
    <Select
      alignSelf='center'
      dropAlign={{ top: 'bottom' }}
      focusIndicator
      isOpen={isOpen}
      multiple={false}
      name='Language Toggle'
      onChange={({ option }) => onChange(option)}
      onClose={onClose}
      onOpen={onOpen}
      options={dropContent}
      plain
      size='medium'
      value={
        <Box>
          {currentLanguage ? currentLanguage : 'Language'}
        </Box>
      }
    />
  )
}

LanguageToggle.propTypes = {
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

export default LanguageToggle
