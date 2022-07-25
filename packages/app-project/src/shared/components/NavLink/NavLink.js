import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'

import addQueryParams from '@helpers/addQueryParams'

function NavLink ({
  color,
  disabled = false,
  link,
  router = {},
  StyledAnchor = Anchor,
  StyledSpacedText = SpacedText,
  weight,
  ...anchorProps
}) {
  const { href, pfe, text } = link
  const isCurrentPage = router?.asPath === addQueryParams(href, router)

  const label = <StyledSpacedText children={text} color={color} weight={weight} />

  if (isCurrentPage) {
    return (
      <StyledAnchor color={color} label={label} {...anchorProps} />
    )
  }

  if (disabled) {
    // On the surface this may look odd, since you can't disable links
    // Sometimes we want to render anchors that look like buttons
    // In case of when StyledAnchor is set to use a Grommet Button (Button can be rendered as an anchor if href is defined)
    // This enables us to render links to look like buttons
    // Regardless, though, if disabled is passed along
    // render a placeholder span for a link that is "disabled"
    // Also pass along a disabled prop so it renders like a disabled button
    // If a Grommet Button (or one of the component library buttons) is set to StyledAnchor
    // We also do not wrap it with next.js's Link
    return <StyledAnchor as='span' color={color} disabled label={label} {...anchorProps} />
  }

  return (
    <Link href={addQueryParams(href, router, pfe)} color={color} passHref>
      <StyledAnchor color={color} label={label} {...anchorProps} />
    </Link>
  )
}

NavLink.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  link: PropTypes.shape({
    as: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  router: PropTypes.object,
  StyledAnchor: PropTypes.elementType,
  StyledSpacedText: PropTypes.elementType,
  weight: PropTypes.string
}

export default withRouter(NavLink)
export { NavLink }
