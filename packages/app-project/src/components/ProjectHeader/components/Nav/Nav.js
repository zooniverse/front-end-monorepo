import { Box } from 'grommet'
import Link from 'next/link'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import NavLink from './components/NavLink'

function Nav (props) {
  const { navLinks } = props
  return (
    <Box as='nav' direction='row' gap='medium'>
      {navLinks.map(navLink => (
        <Link href={navLink.href} key={navLink.href} passHref>
          <NavLink
            text={navLink.text}
          />
        </Link>
      ))}
    </Box>
  )
}

Nav.propTypes = {
  navLinks: arrayOf(shape({
    href: string,
    text: string,
  }))
}

export default Nav
