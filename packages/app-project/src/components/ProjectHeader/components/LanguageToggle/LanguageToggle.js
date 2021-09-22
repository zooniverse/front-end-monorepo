import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, DropButton } from 'grommet'
import { FormDown } from 'grommet-icons'
import { shape, string } from 'prop-types'
import { useState } from 'react'
import styled, { css, withTheme } from 'styled-components'

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
      color: ${props.theme.global.colors.brand};
    `}
  }
`

const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const dropContent = (
    <Box
      as='nav'
      background='brand'
      elevation='medium'
      margin={{ top: 'medium ' }}
    >
      <Box as='ul'>English</Box>
      <Box as='ul'>French</Box>
    </Box>
  )

  return (
    <StyledDropButton
      alignSelf='center'
      dropContent={dropContent}
      dropAlign={{ top: 'bottom' }}
      isOpen={isOpen}
      margin={{ top: 'xsmall' }}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box align='center' direction='row' gap='xsmall' justify='center'>
        <SpacedText weight='bold'>Language</SpacedText>
        <FormDown />
      </Box>
    </StyledDropButton>
  )
}

LanguageToggle.propTypes = {
  theme: shape({
    global: shape({
      colors: shape({
        'accent-1': string,
        brand: string
      })
    })
  })
}

export default withTheme(LanguageToggle)
export { LanguageToggle }
