import { Anchor, Box } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { string } from 'prop-types'

function NavLink ({
  href = '',
  label = ''
}) {
  const { asPath } = useRouter()
  const isActive = asPath === href
  return (
    <Link legacyBehavior href={href} passHref>
      <Anchor
        aria-current={isActive ? 'page' : undefined}
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

export default NavLink
