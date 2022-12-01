import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import PointerIcon from './PointerIcon'
import Button from '../Button'

function AnnotateButton ({ active, onClick }) {
  const { t } = useTranslation('components')
  return (
    <Button
      active={active}
      a11yTitle={t('ImageToolbar.AnnotateButton.ariaLabel')}
      icon={<PointerIcon />}
      onClick={onClick}
    />
  )
}

AnnotateButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

AnnotateButton.defaultProps = {
  active: false,
  onClick: () => console.log('Annotate Button')
}

export default AnnotateButton
