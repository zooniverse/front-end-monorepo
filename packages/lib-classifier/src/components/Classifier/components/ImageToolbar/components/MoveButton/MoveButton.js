import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import MoveIcon from './MoveIcon'
import Button from '../Button'

function MoveButton({
  active = false,
  onClick = () => console.log('Move Button')
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.MoveButton.ariaLabel')}
      active={active}
      icon={<MoveIcon />}
      onClick={onClick}
    />
  )
}

MoveButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default MoveButton
