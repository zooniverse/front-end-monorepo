import counterpart from 'counterpart'
import { Anchor, Box } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { string } from 'prop-types'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function NavLink (props) {
  const { href, label, router: { asPath } } = props
  const isActive = asPath === href
  return (
    <Link href={href} passHref >
      <Anchor
        aria-current={ isActive ? 'page' : undefined }
        size='medium'
        weight='normal'
        active={isActive}
      >
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
          {label}
        </Box>
      </Anchor>
    </Link>
  )
}

NavLink.propTypes = {
  label: string.isRequired,
  href: string.isRequired
}

export default withRouter(NavLink)
