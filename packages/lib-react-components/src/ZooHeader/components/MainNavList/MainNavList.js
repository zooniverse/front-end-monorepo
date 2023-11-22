import PropTypes from 'prop-types'
import NavListItem from '../NavListItem'
import { Box } from 'grommet'

export default function MainNavList({
  adminNavLinkLabel,
  adminNavLinkURL,
  isAdmin = false,
  isNarrow = false,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs
}) {
  if (isNarrow) return null

  return (
    <Box direction='row' gap='small'>
      {mainHeaderNavListURLs.map((url, i) => (
        <NavListItem
          key={url}
          label={mainHeaderNavListLabels[i]}
          url={url}
        />
      ))}
      {isAdmin &&
        <NavListItem
          label={adminNavLinkLabel}
          url={adminNavLinkURL}
        />}
    </Box>
  )
}

MainNavList.propTypes = {
  adminNavLinkLabel: PropTypes.string.isRequired,
  adminNavLinkURL: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isNarrow: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
}
