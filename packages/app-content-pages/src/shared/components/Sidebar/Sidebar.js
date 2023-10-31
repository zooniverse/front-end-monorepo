import Link from 'next/link'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'
import { Box, Button, Nav } from 'grommet'

const StyledUl = styled.ul`
  padding-inline-start: 0;
`

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
`

const StyledButton = styled(Button)`
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

  &:hover {
    font-weight: bold;
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
  const { t } = useTranslation('components')

  return (
    <Nav aria-label={ariaLabel} className={className}>
      <StyledUl>
        {sections.map(section => (
          <StyledLi key={section.name}>
            <StyledButton
              as={Link}
              active={section.slug === activeSection}
              aria-current={section.slug === activeSection ? 'true' : 'false'}
              href={section.slug ? `#${section.slug}` : ''}
              onClick={() => setActiveSection(section.slug)}
            >
              {section.name}
            </StyledButton>
          </StyledLi>
        ))}
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
