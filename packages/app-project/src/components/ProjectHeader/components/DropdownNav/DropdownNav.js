import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box, DropButton } from 'grommet'
import { FormDown } from 'grommet-icons'
import NavLink from '@shared/components/NavLink'
import { arrayOf, shape, string } from 'prop-types'
import { useState } from 'react';
import styled, { css, withTheme } from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledAnchor = styled(Anchor)`
  padding: 10px 20px;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
  &:focus,
  &:hover {
    ${props => css`background: ${props.theme.global.colors['neutral-1']};`}
    text-decoration: none;
  }
`

// `tabindex="-1"` is for the button's open state.
const StyledDropButton = styled(DropButton)`
  padding: 10px 10px 10px 15px;
  border-radius: 2em;
  color: white;

  ${props => props.isOpen && css`
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

function DropdownNav({
  className,
  navLinks = [],
}) {
  const { t } = useTranslation('components')
  const [ isOpen, setIsOpen ] = useState(false)

  function onClose() {
    setIsOpen(false)
  }

  function onOpen() {
    setIsOpen(true)
  }

  const dropContent = (
    <Box
      as='nav'
      background='brand'
      elevation='medium'
      margin={{ top: 'medium ' }}
    >
      <Box
        as='ul'
        pad="none"
      >
        {navLinks.map(navLink => (
          <Box
            as='li'
            key={navLink.href}
          >
            <NavLink
              color='white'
              link={navLink}
              StyledAnchor={StyledAnchor}
              weight='bold'
            />
          </Box>
        ))}
      </Box>
    </Box>
  )

  return (
    <StyledDropButton
      alignSelf='center'
      className={className}
      dropContent={dropContent}
      dropAlign={{ top: 'bottom' }}
      isOpen={isOpen}
      margin={{ top: 'xsmall' }}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box align='center' direction='row' gap='xsmall' justify='center'>
        <SpacedText weight='bold'>
          {t('ProjectHeader.exploreProject')}
        </SpacedText>
        <FormDown />
      </Box>
    </StyledDropButton>
  )
}

DropdownNav.propTypes = {
  navLinks: arrayOf(
    shape({
      as: string,
      href: string,
      text: string
    })
  ),
  theme: shape({
    global: shape({
      colors: shape({
        'accent-1': string,
        brand: string
      })
    })
  })
}

export default withTheme(DropdownNav)
export {
  DropdownNav,
  StyledDropButton
}
