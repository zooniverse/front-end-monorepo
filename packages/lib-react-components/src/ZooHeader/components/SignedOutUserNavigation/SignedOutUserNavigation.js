import PropTypes from 'prop-types'
import NavButton from './components/NavButton'
import { useTranslation } from '../../../translations/i18n'

export default function SignedOutUserNavigation({
  register,
  signIn
}) {
  const { t } = useTranslation()

  return (
    <>
      <NavButton
        label={t('ZooHeader.SignedOutUserNavigation.signIn')}
        onClick={signIn}
      />
      <NavButton
        label={t('ZooHeader.SignedOutUserNavigation.register')}
        onClick={register}
      />
    </>
  )
}

SignedOutUserNavigation.propTypes = {
  register: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
}
