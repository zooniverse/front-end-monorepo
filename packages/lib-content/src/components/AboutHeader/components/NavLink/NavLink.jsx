import { Anchor, Text } from 'grommet'
import Link from 'next/link'
import { string } from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

const StyledAnchor = styled(Anchor)`
  border-bottom: 2px solid transparent;
  text-decoration: none;

  &:hover {
    border-bottom-color: white;
  }

  &[aria-current=page] {
    border-bottom-color: white;
  }
`

function NavLink({ color, href = null, label = '' }) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (window.location.pathname === href) {
      setIsActive(true)
    }
  }, [])

  return (
    <StyledAnchor
      as={Link}
      aria-current={isActive ? 'page' : undefined}
      href={href}
    >
      <Text color={color}>{label}</Text>
    </StyledAnchor>
  )
}

NavLink.propTypes = {
  label: string.isRequired,
  href: string.isRequired
}

export default NavLink
