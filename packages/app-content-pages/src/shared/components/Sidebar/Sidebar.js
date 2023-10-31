import Link from 'next/link'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'
import { Box, Button, Nav } from 'grommet'

const StyledLi = styled.li`
  list-style-type: none;
  padding-top: 15px;
`

const StyledButton = styled(Button)`
  text-decoration: none;
  color: black;
  ${props =>
    props.active &&
    css`
      background: none;
      font-weight: bold;
    `}
`

const DEFAULT_HANDLER = () => {}

function Sidebar({
  activeSection = '',
  className = '',
  sections = [],
  setActiveSection = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')

  return (
    <Nav aria-label={t('Publications.sideBarLabel')} className={className}>
      <Box as='ul'>
        {sections.map(section => (
          <StyledLi key={section.name}>
            <StyledButton
              as={Link}
              active={section.slug === activeSection}
              href={section.slug ? `#${section.slug}` : ''}
              onClick={() => setActiveSection(section.slug)}
            >
              {section.name}
            </StyledButton>
          </StyledLi>
        ))}
      </Box>
    </Nav>
  )
}

export default Sidebar

Sidebar.propTypes = {
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
  setActiveSection: func
}
