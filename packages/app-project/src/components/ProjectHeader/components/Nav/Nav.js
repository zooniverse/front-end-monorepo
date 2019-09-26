import counterpart from 'counterpart'
import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import NavLink from './components/NavLink'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function Nav (props) {
  const { navLinks } = props
  return (
    <Box aria-label={counterpart('ProjectNav.ariaLabel')} as='nav'>
      <Box as='ul' direction='row' gap='medium'>
        {navLinks.map(navLink => (
          <Box as='li' key={navLink.href}>
            <NavLink link={navLink} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

Nav.propTypes = {
  navLinks: arrayOf(
    shape({
      href: string,
    })
  )
}

export default Nav
