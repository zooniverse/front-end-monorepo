import Link from 'next/link'
import { arrayOf, bool, func, shape, string } from 'prop-types'
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

  ${props =>
    props.active === 'true' &&
    css`
      background: ${props.theme.global.colors['accent-1']};
    `}

  &:hover, :focus {
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
        {sections.map(section => {
          const isActive = section.slug === activeSection
          return (
            <StyledLi key={section.name}>
              <StyledButton
                as={Link}
                active={isActive.toString()}
                aria-current={section.slug === activeSection ? 'true' : 'false'}
                href={section.slug ? `#${section.slug}` : ''}
                onClick={() => setActiveSection(section.slug)}
              >
                <SpacedText
                  color={section.slug === activeSection ? 'black' : { light: 'black', dark: 'white' }}
                  weight={section.slug === activeSection ? 'bold' : 'normal'}
                >
                  {section.name}
                </SpacedText>
              </StyledButton>
            </StyledLi>
          )
        })}
      </StyledUl>
    </Nav>
  )
}

export default Sidebar

Sidebar.propTypes = {
  activeSection: string,
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
