import { Anchor, Text } from 'grommet'
import Link from 'next/link'
import { string } from 'prop-types'
import styled from 'styled-components'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const StyledAnchor = styled(Anchor)`
  border-bottom: 2px solid transparent;
  text-decoration: none;

  &:hover {
    border-bottom-color: white;
  }

  &[aria-current='page'] {
    border-bottom-color: white;
  }
`

function NavLink({ color, href = null, label = '' }) {
  const pathname = usePathname()

  const { i18n } = useTranslation()
  const locale = i18n.language

  let isActive = false
  if (locale !== 'en') {
    isActive = pathname?.replace(/^\/[^\/]+/, '') === href
  } else {
    isActive = pathname === href
  }

  return (
    <StyledAnchor as={Link} aria-current={isActive ? 'page' : undefined} href={href}>
      <Text color={color}>{label}</Text>
    </StyledAnchor>
  )
}

NavLink.propTypes = {
  label: string.isRequired,
  href: string.isRequired
}

export default NavLink
