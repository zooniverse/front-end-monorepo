import { arrayOf, bool, string } from 'prop-types'
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
  adminMode = false,
  adminNavLinkLabel,
  adminNavLinkURL,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs
}) {
  const menuListItems = mainHeaderNavListLabels.map((label, index) => {
    return {
      label: <NarrowMenuNavListItem text={label} />,
      href: mainHeaderNavListURLs[index]
    }
  })

  if (adminMode) {
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
  adminMode: bool,
  adminNavLinkLabel: string.isRequired,
  adminNavLinkURL: string.isRequired,
  mainHeaderNavListLabels: arrayOf(string).isRequired,
  mainHeaderNavListURLs: arrayOf(string).isRequired
}
