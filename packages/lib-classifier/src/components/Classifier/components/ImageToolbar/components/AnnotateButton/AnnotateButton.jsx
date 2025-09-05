import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import EditIcon from './EditIcon'
import Button from '../Button'

const DEFAULT_HANDLER = () => {}

function AnnotateButton({
  active = false,
  disabled = false,
  onClick = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      active={active}
      aria-pressed={active.toString()}
      a11yTitle={t('ImageToolbar.AnnotateButton.ariaLabel')}
      disabled={disabled}
      icon={<EditIcon />}
      onClick={onClick}
    />
  )
}

AnnotateButton.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default AnnotateButton
