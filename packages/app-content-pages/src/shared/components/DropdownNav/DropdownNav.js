import { useState } from 'react'
import Link from 'next/link'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { Box, Button, DropButton, Nav } from 'grommet'
import { FormDown } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'

const StyledButton = styled(Button)`
  text-decoration: none;
  padding: 10px 15px;
  width: 100%;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);

  &:hover,
  :focus {
    ${props =>
      css`
        background: ${props.theme.global.colors['neutral-1']};
      `}
  }

  &[aria-current='true'] {
    ${props =>
      css`
        background: ${props.theme.global.colors['neutral-1']};
      `}
  }
`

const StyledDropButton = styled(DropButton)`
  border-radius: 2em;
  box-shadow: 2px 2px 4px #e2e5e9, -2px -2px 4px #e2e5e9; // light-3
  position: relative;
  min-width: 18rem;

  &:hover {
    ${props => css`
      background: ${props.theme.global.colors['accent-1']};
    `}
  }

  ${props =>
    props.open &&
    css`
      box-shadow: none;
      background: ${props.theme.global.colors['accent-1']};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background: ${props.theme.global.colors.brand};
        height: 50%;
        width: 100%;
        z-index: -1;
      }
    `}
`

const StyledUl = styled.ul`
  padding-inline-start: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
  width: 100%;
`

const DEFAULT_HANDLER = () => {}

function DropdownNav({
  activeSection = '',
  className = '',
  sections = [],
  setActiveSection = DEFAULT_HANDLER,
  sidebarLabel = ''
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSectionSelect = slug => {
    handleClose()
    setActiveSection(slug)
  }

  const dropContent = (
    <Nav aria-label={sidebarLabel} width='100%' background='brand'>
      <StyledUl>
        {sections.map(section => (
          <StyledLi key={section.name}>
            <StyledButton
              as={Link}
              aria-current={section.slug === activeSection ? 'true' : 'false'}
              href={section.slug ? `#${section.slug}` : ''}
              onClick={() => handleSectionSelect(section.slug)}
            >
              <SpacedText size='0.875rem' color='white' weight='bold'>
                {section.name}
              </SpacedText>
            </StyledButton>
          </StyledLi>
        ))}
      </StyledUl>
    </Nav>
  )

  return (
    <StyledDropButton
      alignSelf='center'
      className={className}
      dropAlign={{ top: 'bottom' }}
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
      round='medium'
      margin={{ top: '30px' }}
      dropContent={dropContent}
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
        justify='center'
        pad={{ horizontal: '20px', vertical: '10px' }}
        round='small'
      >
        <SpacedText weight='bold' color={{ light: 'brand', dark: 'white' }}>
          {sidebarLabel}
        </SpacedText>
        <FormDown color='brand' />
      </Box>
    </StyledDropButton>
  )
}

export default DropdownNav

DropdownNav.propTypes = {
  activeSection: string,
  className: string,
  sections: arrayOf(
    shape({
      active: bool,
      name: string,
      setActive: func,
      slug: string
    })
  ),
  setActiveSection: func,
  sidebarLabel: string
}
