import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import RotateIcon from './RotateIcon'
import Button from '../Button'

function RotateButton({
  disabled = false,
  onClick = () => console.log('Rotate Button')
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.RotateButton.ariaLabel')}
      disabled={disabled}
      icon={<RotateIcon />}
      onClick={onClick}
    />
  )
}

RotateButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default RotateButton
