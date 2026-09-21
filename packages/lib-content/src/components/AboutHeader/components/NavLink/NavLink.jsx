/*
  Note that this NavLink component should only be used in cases
  where next/link makes sense and locale is respected. If linking out
  to a page that does not have non-English dictionaries or locale support,
  do not use.
*/

import { Text } from 'grommet'
import Link from 'next/link'
import { string } from 'prop-types'
import styled from 'styled-components'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import getHrefWithLocale from '../../../../helpers/getHrefWithLocale'

const StyledAnchor = styled(Link)`
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

  const hrefWithLocale = getHrefWithLocale(href, locale)
  const isActive = pathname === hrefWithLocale

  return (
    <StyledAnchor aria-current={isActive ? 'page' : undefined} href={hrefWithLocale}>
      <Text color={color}>{label}</Text>
    </StyledAnchor>
  )
}

NavLink.propTypes = {
  label: string.isRequired,
  href: string.isRequired
}

export default NavLink
