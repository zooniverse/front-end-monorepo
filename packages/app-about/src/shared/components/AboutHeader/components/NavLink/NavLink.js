import counterpart from 'counterpart'
import { Anchor } from 'grommet'
import Link from 'next/link'
import { string } from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function NavLink (props) {
  return (
    <Link href={props.href} passHref prefetch>
      <Anchor>
        {props.label}
      </Anchor>
    </Link>
  )
}

NavLink.propTypes = {
  label: string.isRequired,
  href: string.isRequired
}

export default NavLink
