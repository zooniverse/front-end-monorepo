import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import EditIcon from './EditIcon'
import Button from '../Button'

function AnnotateButton({
  active = false,
  onClick = () => console.log('Annotate Button')
}) {
  const { t } = useTranslation('components')
  return (
    <Button
      active={active}
      a11yTitle={t('ImageToolbar.AnnotateButton.ariaLabel')}
      icon={<EditIcon />}
      onClick={onClick}
    />
  )
}

AnnotateButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default AnnotateButton
