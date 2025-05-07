import { arrayOf, func, number, shape, string } from 'prop-types'
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
      props.theme.dark
        ? css`
            background: ${props.theme.global.colors['neutral-1']};
          `
        : css`
            background: ${props.theme.global.colors['accent-1']};
          `}
  }
`

const DEFAULT_HANDLER = () => {}

function Sidebar({
  activeSection = 0,
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
        {sections.map((section, index) => (
          <StyledLi key={section.name}>
            <StyledButton
              aria-current={index === activeSection ? 'true' : 'false'}
              href={section.slug ? `#${section.slug}` : ''}
              onClick={() => setActiveSection(index)}
            >
              <SpacedText
                color={{ light: 'black', dark: 'white' }}
                weight={index === activeSection ? 'bold' : 'normal'}
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
      name: string,
      slug: string
    })
  ),
  setActiveSection: func
}
