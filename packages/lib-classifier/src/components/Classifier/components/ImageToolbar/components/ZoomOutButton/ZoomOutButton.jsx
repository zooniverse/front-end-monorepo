import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import ZoomOutIcon from './ZoomOutIcon'
import Button from '../Button'

function DEFAULT_HANDLER() {
  console.log('zoom out')
  return true
}

function ZoomOutButton({
  disabled = false,
  onClick = DEFAULT_HANDLER,
  onPointerDown = DEFAULT_HANDLER,
  onPointerUp = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.ZoomOutButton.ariaLabel')}
      disabled={disabled}
      icon={<ZoomOutIcon />}
      onClick={onClick}
      onContextMenu={onClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    />
  )
}

ZoomOutButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default ZoomOutButton
