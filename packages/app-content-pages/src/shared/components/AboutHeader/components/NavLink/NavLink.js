import { Anchor, Box } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { string } from 'prop-types'
import React from 'react'

function NavLink (props) {
  const { href, isPFELink, label, router: { asPath } } = props
  const isActive = asPath === href

  const link = (
    <Anchor active={isActive} href={href} size='medium' weight='normal'>
      <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        {label}
      </Box>
    </Anchor>
  )

  if (isPFELink) {
    return link
  } else {
    return (
      <Link href={href} passHref>
        {link}
      </Link>
    )
  }
}

NavLink.propTypes = {
  label: string.isRequired,
  href: string.isRequired
}

export default withRouter(NavLink)
