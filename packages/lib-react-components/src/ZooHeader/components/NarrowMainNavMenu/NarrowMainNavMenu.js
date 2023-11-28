import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu } from 'grommet-icons'
import NarrowMenu from '../NarrowMenu'
import NarrowMenuNavListItem from '../NarrowMenuNavListItem'

const StyledMenuIcon = styled(Menu)`
  height: 1rem;
  width: 1rem;
  padding: 0 0 0 20px;
  display: flex;
`

export default function NarrowMainNavMenu({
  adminNavLinkLabel,
  adminNavLinkURL,
  isAdmin = false,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs
}) {
  const menuListItems = mainHeaderNavListLabels.map((label, index) => {
    return {
      label: <NarrowMenuNavListItem text={label} />,
      href: mainHeaderNavListURLs[index]
    }
  })

  if (isAdmin) {
    menuListItems.push({
      label: <NarrowMenuNavListItem text={adminNavLinkLabel} />,
      href: adminNavLinkURL
    })
  }

  return (
    <NarrowMenu
      icon={false}
      items={menuListItems}
      label={<StyledMenuIcon color='#B2B2B2' text='Main Navigation'/>}
    />
  )
}

NarrowMainNavMenu.propTypes = {
  adminNavLinkLabel: PropTypes.string.isRequired,
  adminNavLinkURL: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string).isRequired
}
