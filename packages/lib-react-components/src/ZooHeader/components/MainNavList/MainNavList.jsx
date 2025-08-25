import { arrayOf, bool, string } from 'prop-types'
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
  adminMode: bool,
  adminNavLinkLabel: string.isRequired,
  adminNavLinkURL: string.isRequired,
  isNarrow: bool,
  mainHeaderNavListLabels: arrayOf(string).isRequired,
  mainHeaderNavListURLs: arrayOf(string).isRequired,
}
