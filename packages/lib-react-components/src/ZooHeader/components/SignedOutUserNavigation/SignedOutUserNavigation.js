import PropTypes from 'prop-types'
import { Box } from 'grommet'
import NavButton from './components/NavButton'
import NarrowMainNavMenu from '../NarrowMainNavMenu'
import { useTranslation } from '../../../translations/i18n'

export default function SignedOutUserNavigation({
  adminNavLinkLabel,
  adminNavLinkURL,
  isAdmin,
  isNarrow,
  mainHeaderNavListLabels,
  mainHeaderNavListURLs,
  register,
  signIn,
  user
}) {
  const { t } = useTranslation()

  if (Object.keys(user).length === 0 && signIn) {
    return (
      <>
        <NavButton label={t('ZooHeader.SignedOutUserNavigation.signIn')} onClick={signIn} />
        <NavButton label={t('ZooHeader.SignedOutUserNavigation.register')} onClick={register} />
        {isNarrow &&
          <NarrowMainNavMenu
            adminNavLinkLabel={adminNavLinkLabel}
            adminNavLinkURL={adminNavLinkURL}
            isAdmin={isAdmin}
            mainHeaderNavListLabels={mainHeaderNavListLabels}
            mainHeaderNavListURLs={mainHeaderNavListURLs}
          />}
      </>
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