import { useState } from 'react'
import Link from 'next/link'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { Box, Button, DropButton, Nav } from 'grommet'
import { FormDown } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'

const StyledUl = styled.ul`
  padding-inline-start: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const StyledButton = styled(Button)`
  text-decoration: none;
  border-bottom: 2px solid transparent;

  ${props =>
    props.active &&
    css`
      border-bottom-color: white;
    `}
`

const StyledDropButton = styled(DropButton)`
  border-radius: 2em;
  box-shadow: 2px 2px 4px #e2e5e9, -2px -2px 4px #e2e5e9; // light-3
  position: relative;

  ${props =>
    props.open &&
    css`
      // box-shadow: none;
      // background: #addde0; // accent-1

      // &::after {
      //   content: '';
      //   position: absolute;
      //   bottom: 0;
      //   left: 0;
      //   background: ${props.theme.global.colors.brand};
      //   height: 50%;
      //   width: 100%;
      //   z-index: -1;
      // }
    `}
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

  return (
    <StyledDropButton
      alignSelf='center'
      className={className}
      dropAlign={{ top: 'bottom' }}
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
      round='medium'
      margin={{ top: '20px' }}
      dropContent={
        <Nav aria-label={sidebarLabel} width='100%' background='brand'>
          <StyledUl>
            {sections.map(section => (
              <StyledLi key={section.name}>
                <StyledButton
                  as={Link}
                  active={section.slug === activeSection}
                  aria-current={
                    section.slug === activeSection ? 'true' : 'false'
                  }
                  href={section.slug ? `#${section.slug}` : ''}
                  onClick={section => handleSectionSelect(section.slug)}
                >
                  <SpacedText size='0.875rem' color='white' weight='bold'>
                    {section.name}
                  </SpacedText>
                </StyledButton>
              </StyledLi>
            ))}
          </StyledUl>
        </Nav>
      }
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
        justify='center'
        pad={{ horizontal: '20px', vertical: '10px' }}
        round='small'
      >
        <SpacedText weight='bold' color={{ light: 'brand', dark: '' }}>
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
