import { bool, elementType, object, oneOfType, shape, string } from 'prop-types'
import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import Link from 'next/link'

import addQueryParams from '@helpers/addQueryParams'

function NavLink({
  color,
  link,
  StyledAnchor = Anchor,
  StyledSpacedText = SpacedText,
  weight,
  ...anchorProps
}) {
  const { externalLink, href, text } = link

  const label = (
    <StyledSpacedText color={color} weight={weight}>
      {text}
    </StyledSpacedText>
  )

  // We don't want to use next/link for external webpages, aka external routes
  // Zooniverse routes that use PFE are considered external!
  // (therefore don't prefetch or call Next.js router functions unless we're confident it's an internal route)
  return (
    <>
      {externalLink ? (
        <StyledAnchor
          href={addQueryParams(href)}
          color={color}
          label={label}
          {...anchorProps}
        />
      ) : (
        <StyledAnchor
          forwardedAs={Link}
          href={addQueryParams(href)}
          color={color}
          label={label}
          {...anchorProps}
        />
      )}
    </>
  )
}

NavLink.propTypes = {
  color: oneOfType([object, string]),
  link: shape({
    as: string,
    externalLink: bool,
    href: string,
    text: string
  }).isRequired,
  StyledAnchor: elementType,
  StyledSpacedText: elementType,
  weight: string
}

export default NavLink
