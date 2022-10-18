import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu } from 'grommet-icons'
import NarrowMenu from '../NarrowMenu/index.js'
import NarrowMenuNavListItem from '../NarrowMenuNavListItem/index.js'

const StyledMenuIcon = styled(Menu)`
  width: 1em;
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
      items={menuListItems}
      label={<StyledMenuIcon color='#B2B2B2' text='Main Navigation' />}
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