import counterpart from 'counterpart'
import { Anchor, Box } from 'grommet'
import { withRouter } from 'next/router'
import { string } from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function NavLink (props) {
  const { href, label, router: { asPath } } = props
  const isActive = asPath === href
  return (
    <Anchor href={href} size='medium' weight='normal' active={isActive}>
      <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
        {label}
      </Box>
    </Anchor>
  )
}

NavLink.propTypes = {
  label: string.isRequired,
  href: string.isRequired
}

export default withRouter(NavLink)
