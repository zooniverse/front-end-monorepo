import Link from 'next/link'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { Button, Nav } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'

const StyledUl = styled.ul`
  padding-inline-start: 0;
`

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
`

const StyledButton = styled(Button)`
  text-decoration: none;
  padding: 5px 20px; // Same as Project About page sidebar
  width: 100%;

  &[aria-current='true'] {
    ${props =>
      css`
        background: ${props.theme.global.colors['accent-1']};
      `}
  }

  &:hover,
  :focus {
    > span {
      font-weight: bold;
    }
  }
`

const DEFAULT_HANDLER = () => {}

function Sidebar({
  activeSection = '',
  className = '',
  ariaLabel = '',
  sections = [],
  setActiveSection = DEFAULT_HANDLER
}) {
  return (
    <Nav
      aria-label={ariaLabel}
      className={className}
      margin={{ horizontal: 'auto' }}
    >
      <StyledUl>
        {sections.map(section => (
          <StyledLi key={section.name}>
            <StyledButton
              as={Link}
              aria-current={section.index === activeSection ? 'true' : 'false'}
              href={section.slug ? `#${section.slug}` : ''}
              onClick={() => setActiveSection(section.index)}
            >
              <SpacedText
                color={
                  section.slug === activeSection
                    ? 'black'
                    : { light: 'black', dark: 'white' }
                }
                weight={section.index === activeSection ? 'bold' : 'normal'}
              >
                {section.name}
              </SpacedText>
            </StyledButton>
          </StyledLi>
        ))}
      </StyledUl>
    </Nav>
  )
}

export default Sidebar

Sidebar.propTypes = {
  activeSection: number,
  className: string,
  ariaLabel: string,
  sections: arrayOf(
    shape({
      active: bool,
      name: string,
      setActive: func,
      slug: string
    })
  ),
  setActiveSection: func
}
