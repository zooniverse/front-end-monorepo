import { useState } from 'react'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
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
    & > span {
      border-bottom: 2px solid white;
    }
  }
`

const StyledDropButton = styled(DropButton)`
  border-radius: 2em;
  position: relative;
  min-width: 18rem;

  &:hover, &:focus {
    ${props => css`
      background: ${props.theme.global.colors['neutral-1']};
    `}

    & > div > span {
      color: white;
    }

    & > div > [aria-label='FormDown'] {
      stroke: white;
    }
  }

  ${props =>
    props.open &&
    css`
      background: ${props.theme.global.colors['neutral-1']};

      & > div > span {
        color: white;
      }

      & > div > [aria-label='FormDown'] {
        stroke: white;
      }

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
  activeSection = 0,
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

  const handleSectionSelect = index => {
    handleClose()
    setActiveSection(index)
  }

  const dropContent = (
    <Nav aria-label={sidebarLabel} width='100%' background='brand'>
      <StyledUl>
        {sections.map((section, index) => (
          <StyledLi key={section.name}>
            <StyledButton
              aria-current={index === activeSection ? 'true' : 'false'}
              href={section.slug ? `#${section.slug}` : ''}
              onClick={() => handleSectionSelect(index)}
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
      margin={{ top: '30px' }}
      dropContent={dropContent}
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
        justify='center'
        pad={{ horizontal: '20px', vertical: '10px' }}
      >
        <SpacedText weight='bold' color={{ light: 'neutral-1', dark: 'white' }}>
          {sidebarLabel}
        </SpacedText>
        <FormDown color={{ light: 'neutral-1', dark: 'white' }} />
      </Box>
    </StyledDropButton>
  )
}

export default DropdownNav

DropdownNav.propTypes = {
  activeSection: number,
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
