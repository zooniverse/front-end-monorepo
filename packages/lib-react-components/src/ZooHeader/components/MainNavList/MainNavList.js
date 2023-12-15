import PropTypes from 'prop-types'
import NavListItem from '../NavListItem'
import { Box } from 'grommet'

export default function MainNavList({
  adminMode = false,
  adminNavLinkLabel,
  adminNavLinkURL,
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
      {adminMode &&
        <NavListItem
          label={adminNavLinkLabel}
          url={adminNavLinkURL}
        />}
    </Box>
  )
}

MainNavList.propTypes = {
  adminMode: PropTypes.bool,
  adminNavLinkLabel: PropTypes.string.isRequired,
  adminNavLinkURL: PropTypes.string.isRequired,
  isNarrow: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
}
