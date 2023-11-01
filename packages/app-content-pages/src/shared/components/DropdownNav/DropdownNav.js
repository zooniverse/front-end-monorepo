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
`

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
`

const StyledButton = styled(Button)`
  width: 100%;
  text-decoration: none;
  color: black;
  padding: 5px 20px; // Same as Project About page sidebar
  margin-bottom: 5px;
  ${props =>
    props.active &&
    css`
      background: #addde0; // accent-1
      font-weight: bold;
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
    <DropButton
      alignSelf='center'
      className={className}
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
      dropContent={
        <Nav aria-label={sidebarLabel} width='max-content'>
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
                  <SpacedText>{section.name}</SpacedText>
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
    </DropButton>
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
