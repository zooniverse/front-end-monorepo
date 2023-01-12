import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import ZoomInIcon from './ZoomInIcon'
import Button from '../Button'

function ZoomInButton ({
  onClick = () => console.log('Zoom in')
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.ZoomInButton.ariaLabel')}
      icon={<ZoomInIcon />}
      onClick={onClick}
    />
  )
}

ZoomInButton.propTypes = {
  onClick: PropTypes.func
}

export default ZoomInButton
