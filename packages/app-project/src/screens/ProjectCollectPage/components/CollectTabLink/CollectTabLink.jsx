import Link from 'next/link'
import { Anchor } from 'grommet'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'

const StyledAnchor = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`

function CollectTabLink({ active, href, text }) {
  return (
    <Link href={addQueryParams(href)}>
      <StyledAnchor
        aria-current={active ? 'page' : undefined}
        background={active ? 'accent-1' : { light: 'neutral-6', dark: '' }}
        color={{ dark: 'neutral-6', light: 'dark-3' }}
        pad={{ horizontal: '20px', vertical: '5px' }}
        weight={active ? 'bold' : 'normal'}
      >
        {text}
      </StyledAnchor>
    </Link>
  )
}

CollectTabLink.propTypes = {
  active: bool,
  href: string.isRequired,
  text: string.isRequired
}

export default CollectTabLink