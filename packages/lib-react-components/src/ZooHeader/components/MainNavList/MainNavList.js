import React from 'react'
import PropTypes from 'prop-types'
import NavListItem from '../NavListItem'
import { faLeaf, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';

export default function MainNavList (props) {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    isAdmin,
    isNarrow,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs
  } = props

  if (isNarrow) return null

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

MainNavList.defaultProps = {
  isAdmin: false,
  isNarrow: false
}

MainNavList.PropTypes = {
  adminNavLinkLabel: PropTypes.string,
  adminNavLinkURL: PropTypes.string,
  isAdmin: PropTypes.bool,
  isNarrow: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string),
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string),
}