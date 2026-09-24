import Link from 'next/link'
import { Anchor } from 'grommet'
import { bool, string } from 'prop-types'
import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'

const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  flex-shrink: 0;
  padding: 6px 0;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
  }

  ${props => props.$active && css`
    border-bottom: 3px solid currentColor;
  `}

  ${props => !props.$active && css`
    &:focus, &:hover {
      border-bottom: 3px solid ${props => props.theme.global.colors['neutral-7']};
      color: ${props => props.theme.global.colors['neutral-7']};
    }
  `}
`

function CollectTabLink({ 
  active,
  href,
  icon,
  text 
}) {
  const linkRef = useRef(null)

  useEffect(function scrollActiveTabIntoView() {
    if (active) {
      linkRef.current?.scrollIntoView?.({
        block: 'nearest',
        inline: 'nearest'
      })
    }
  }, [active])

  return (
    <StyledAnchor
      ref={linkRef}
      $active={active}
      aria-current={active ? 'page' : undefined}
      color={active ? 'neutral-1' : { dark: 'neutral-6', light: 'dark-5' }}
      forwardedAs={Link}
      gap='8px'
      href={addQueryParams(href)}
      icon={icon}
      label={text}
      size='1rem'
      weight={active ? 'bold' : 'normal'}
    />
  )
}

CollectTabLink.propTypes = {
  active: bool,
  href: string.isRequired,
  text: string.isRequired
}

export default CollectTabLink
