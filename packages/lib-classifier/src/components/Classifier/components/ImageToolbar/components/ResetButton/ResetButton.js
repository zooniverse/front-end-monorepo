import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import ResetIcon from './ResetIcon'
import Button from '../Button'

function ResetButton({
  disabled = false,
  onClick = () => console.log('Reset Button')
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.ResetButton.ariaLabel')}
      disabled={disabled}
      icon={<ResetIcon />}
      onClick={onClick}
    />
  )
}

ResetButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default ResetButton
