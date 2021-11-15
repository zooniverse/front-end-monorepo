import { useState } from 'react'
import counterpart from 'counterpart'
import localeMenu from '@helpers/localeMenu'
import { Box, DropButton } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { SpacedText } from '@zooniverse/react-components'
import { FormDown } from 'grommet-icons'
import styled, { css, withTheme } from 'styled-components'
import LocaleLink from './LocaleLink'

// `tabindex='-1'` is for the button's open state.
const StyledDropButton = styled(DropButton)`
  padding: 10px 10px 10px 15px;
  border-radius: 2em;
  color: white;

  ${props =>
    props.isOpen &&
    css`
      background: ${props.theme.global.colors['accent-1']};
    `}

  &:focus,
  &:hover {
    ${props => css`
      background: ${props.theme.global.colors['accent-1']};
      color: ${props.theme.global.colors['brand']};
    `}
  }
`

const LocaleSwitcher = ({ availableLocales }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onChange = option => {
    counterpart.setLocale(option.key)
  }

  const dropContent = (
    <Box background='brand' elevation='medium' margin={{ top: 'medium ' }}>
      <Box as='ul' pad='none'>
        {availableLocales.map(availableLocale => (
          <Box as='li' key={availableLocale}>
            <LocaleLink availableLocale={availableLocale} />
          </Box>
        ))}
      </Box>
    </Box>
  )

  return (
    <StyledDropButton
      alignSelf='center'
      dropContent={dropContent}
      dropAlign={{ top: 'bottom' }}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      onChange={onChange}
    >
      <Box align='center' direction='row' gap='xsmall' justify='center'>
        <SpacedText weight='bold'>
          {localeMenu[counterpart.getLocale()]}
        </SpacedText>
        <FormDown />
      </Box>
    </StyledDropButton>
  )
}

LocaleSwitcher.propTypes = {
  availableLocales: arrayOf(string),
  theme: shape({
    global: shape({
      colors: shape({
        'accent-1': string,
        brand: string
      })
    })
  })
}

export default withTheme(LocaleSwitcher)
export { LocaleSwitcher }
