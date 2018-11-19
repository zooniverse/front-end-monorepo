import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import NavButton from './components/NavButton'
import NarrowMainNavMenu from '../NarrowMainNavMenu'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function SignedOutUserNavigation (props) {
  const {
    adminNavLinkLabel,
    adminNavLinkURL,
    isAdmin,
    isNarrow,
    mainHeaderNavListLabels,
    mainHeaderNavListURLs,
    register,
    signIn,
    user
  } = props

  if (Object.keys(user).length === 0 && signIn) {
    return (
      <React.Fragment>
        <Box
          direction='row'
          justify='center'
          pad={{ horizontal: 'medium', vertical: 'small' }}
        >
          <NavButton label={counterpart('SignedOutUserNavigation.signIn')} onClick={signIn} />
          <NavButton label={counterpart('SignedOutUserNavigation.register')} onClick={register} />
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
  adminNavLinkLabel: PropTypes.string.isRequired,
  adminNavLinkURL: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  isNarrow: PropTypes.bool,
  mainHeaderNavListLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainHeaderNavListURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
  register: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string
  }).isRequired
}