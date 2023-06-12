import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import MoveIcon from './MoveIcon'
import Button from '../Button'

function MoveButton({
  active = false,
  disabled = false,
  onClick = () => console.log('Move Button')
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.MoveButton.ariaLabel')}
      active={active}
      disabled={disabled}
      icon={<MoveIcon />}
      onClick={onClick}
    />
  )
}

MoveButton.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default MoveButton
