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
  const { href, text } = link
  const isCurrentPage = router?.asPath === addQueryParams(href, router)
  const { owner, project } = router ? router.query : {}
  const isPFELink = href.startsWith(`/projects/${owner}/${project}/about`)
  const isProductionAPI = process.env.PANOPTES_ENV === 'production'

  const label = <StyledSpacedText children={text} color={color} weight={weight} />

  if (isCurrentPage) {
    return (
      <StyledAnchor color={color} label={label} {...anchorProps} />
    )
  }
  
  if (isPFELink && isProductionAPI) {
    const PFEHref = addQueryParams(`https://www.zooniverse.org${href}`, router)
    return <StyledAnchor color={color} label={label} href={PFEHref} {...anchorProps} />
  }

  if (disabled) {
    // On the surface this may look odd, but you can't disable links
    // And sometimes we want to render anchors that look like buttons
    // This enables to render a placeholder span for a link that is "disabled"
    // and in case StyledAnchor is set to use a Grommet Button (Button can be rendered as an anchor if href is defined)
    // Also pass along a disabled prop so it renders like a disabled button
    // We also do not wrap it with next.js's Link
    return <StyledAnchor as='span' color={color} disabled label={label} {...anchorProps} />
  }
  
  return (
    <Link href={addQueryParams(href, router)} color={color} passHref>
      <StyledAnchor color={color} label={label} {...anchorProps} />
    </Link>
  )
}

NavLink.propTypes = {
  color: PropTypes.string,
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
