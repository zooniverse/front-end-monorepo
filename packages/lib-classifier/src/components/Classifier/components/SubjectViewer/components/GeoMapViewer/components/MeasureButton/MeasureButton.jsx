import { IconActionButton } from '@zooniverse/react-components'
import { Compare } from 'grommet-icons'
import { bool, func } from 'prop-types'

import { useTranslation } from '@translations/i18n'

function MeasureButton({ active = false, onClick }) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.MeasureButton.ariaLabel')

  return (
    <IconActionButton
      a11yTitle={label}
      active={active}
      icon={<Compare color='dark-5' size='18px' />}
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
