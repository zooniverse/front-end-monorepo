import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import InvertIcon from './InvertIcon'
import Button from '../Button'

function InvertButton ({
  active = false,
  disabled = false,
  onClick = () => console.log('Invert Button')
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      active={active}
      aria-pressed={active.toString()}
      a11yTitle={t('ImageToolbar.InvertButton.ariaLabel')}
      disabled={disabled}
      icon={<InvertIcon />}
      onClick={onClick}
    />
  )
}

InvertButton.propTypes = {
  /** (bool): Show invert button as active */
  active: PropTypes.bool,
  /** (bool): Disable the button */
  disabled: PropTypes.bool,
  /** (func): Called when the button is clicked */
  onClick: PropTypes.func
}

export default InvertButton
