import React from 'react'
import PropTypes from 'prop-types'
import NavListItem from '../NavListItem'

export default function MainNavList (props) {
  const {
    mainHeaderNavListLabels,
    mainHeaderNavListURLs,
    isAdmin,
    adminNavLinkLabel,
    adminNavLinkURL
  } = props
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}