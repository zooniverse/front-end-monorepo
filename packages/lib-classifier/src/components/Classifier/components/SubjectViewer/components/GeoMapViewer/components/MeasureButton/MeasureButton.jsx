import { IconActionButton } from '@zooniverse/react-components'
import { bool, func } from 'prop-types'

import { useTranslation } from '@translations/i18n'
import MeasureIcon from './MeasureIcon'

function MeasureButton({ active = false, onClick }) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.MeasureButton.ariaLabel')

  return (
    <IconActionButton
      a11yTitle={label}
      active={active}
      icon={<MeasureIcon />}
      onClick={onClick}
      title={label}
    />
  )
}

MeasureButton.propTypes = {
  active: bool,
  onClick: func.isRequired
}

export default MeasureButton
