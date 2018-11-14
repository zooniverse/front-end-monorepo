import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import SignInButton from './components/SignInButton'
import NarrowMainNavMenu from '../NarrowMainNavMenu'

export default function SignedOutUserNavigation (props) {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    isAdmin,
    isNarrow,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs,
    signIn,
    user
  } = props

  if (Object.keys(user).length === 0 && signIn) {
    return (
      <React.Fragment>
        <Box
          direction='row'
          justify='center'
          pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        >
          <SignInButton onClick={signIn} />
        </Box>
        {isNarrow &&
          <NarrowMainNavMenu
            adminNavLinkLabel={adminNavLinkLabel}
            adminNavLinkURL={adminNavLinkURL}
            isAdmin={isAdmin}
            mainHeaderNavListLabels={mainHeaderNavListLabels}
            mainHeaderNavListURLs={mainHeaderNavListURLs}
          />}
      </React.Fragment>
    )
  }

  return null
}

SignedOutUserNavigation.defaultProps = {
  isAdmin: false,
  isNarrow: false
}

SignedOutUserNavigation.propTypes = {
  adminNavLinkLabel: PropTypes.string,
  adminNavLinkURL: PropTypes.string,
  isAdmin: PropTypes.bool,
  isNarrow: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string),
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string),
  signIn: PropTypes.func.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string
  }).isRequired
}