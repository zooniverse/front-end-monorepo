import React from 'react'
import PropTypes from 'prop-types'
import { Menu as MenuIcon } from 'grommet-icons'
import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import NarrowMenu from '../NarrowMenu'
import NarrowMenuNavListItem from '../NarrowMenuNavListItem'

export default function NarrowMainNavMenu (props) {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    isAdmin,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs
  } = props
  
  const menuListItems = mainHeaderNavListLabels.map((label) => {
    return mainHeaderNavListURLs.forEach((url) => {
      return {
        label: <NarrowMenuNavListItem text={label} />,
        url
      }
    })
  })

  if (isAdmin) {
    menuListItems.push({
      label: <NarrowMenuNavListItem text={adminNavLinkLabel} />,
      url: adminNavLinkURL
    })
  }

  return (
    <NarrowMenu
      items={menuListItems}
      icon={<MenuIcon color='#B2B2B2' />}  
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