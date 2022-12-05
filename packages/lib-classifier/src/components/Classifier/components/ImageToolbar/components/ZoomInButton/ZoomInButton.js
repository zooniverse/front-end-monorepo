import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import ZoomInIcon from './ZoomInIcon'
import Button from '../Button'

function ZoomInButton ({ onClick }) {
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

ZoomInButton.defaultProps = {
  onClick: () => console.log('Zoom in')
}

export default ZoomInButton
