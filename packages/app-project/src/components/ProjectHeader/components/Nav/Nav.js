import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import NavLink from '@shared/components/NavLink'
import en from './locales/en'

counterpart.registerTranslations('en', en)

/**
  Link text styles
*/
const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
`

/**
  Link styles
*/
const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }
  ${props => css`
    &[href]:hover {
      border-bottom-color: ${props.color};
    }
    &:not([href]) {
      cursor: default;
      border-bottom-color: ${props.color};
    }
  `}
`

function Nav({
  navLinks = []
}) {
  return (
    <Box aria-label={counterpart('ProjectNav.ariaLabel')} as='nav'>
      <Box as='ul' direction='row'>
        {navLinks.map(navLink => (
          <Box as='li' key={navLink.href} pad={{ left: 'medium' }}>
            <NavLink
              link={navLink}
              StyledAnchor={StyledAnchor}
              StyledSpacedText={StyledSpacedText}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

Nav.propTypes = {
  navLinks: arrayOf(
    shape({
      href: string
    })
  )
}

export default Nav
