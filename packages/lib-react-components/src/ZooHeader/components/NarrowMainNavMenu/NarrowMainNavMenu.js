import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu } from 'grommet-icons'
import NarrowMenu from '../NarrowMenu'
import NarrowMenuNavListItem from '../NarrowMenuNavListItem'

const StyledMenuIcon = styled(Menu)`
  width: 1em;
`

export default function NarrowMainNavMenu (props) {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    isAdmin,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs
  } = props

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
      items={menuListItems}
      icon={<StyledMenuIcon color='#B2B2B2' />}
    />
  )
}

NarrowMainNavMenu.propTypes = {
  adminNavLinkLabel: PropTypes.string,
  adminNavLinkURL: PropTypes.string,
  isAdmin: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string),
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string)
}