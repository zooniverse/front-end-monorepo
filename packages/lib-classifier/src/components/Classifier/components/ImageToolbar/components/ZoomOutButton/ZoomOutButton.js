import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import ZoomOutIcon from './ZoomOutIcon'
import Button from '../Button'

function ZoomOutButton({ onClick = () => console.log('Zoom out') }) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.ZoomOutButton.ariaLabel')}
      icon={<ZoomOutIcon />}
      onClick={onClick}
    />
  )
}

ZoomOutButton.propTypes = {
  onClick: PropTypes.func
}

export default ZoomOutButton
