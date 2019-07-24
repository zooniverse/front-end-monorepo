import counterpart from 'counterpart'
import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import NavLink from './components/NavLink'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function Nav (props) {
  return (
    <Box aria-label={counterpart('ProjectNav.ariaLabel')} as='nav'>
      <Box as='ul' direction='row' gap='medium'>
        {props.navLinks.map(navLink => (
          <Box as='li' key={navLink.as}>
            <NavLink {...navLink} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

Nav.propTypes = {
  navLinks: arrayOf(
    shape({
      as: string
    })
  )
}

export default Nav
