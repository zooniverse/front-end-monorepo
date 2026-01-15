import { Location } from 'grommet-icons'
import { func } from 'prop-types'

import { useTranslation } from '@translations/i18n'

import ControlButton from '../ControlButton'

function RecenterButton({ onClick }) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.RecenterButton.ariaLabel')
  
  return (
    <ControlButton
      a11yTitle={label}
      icon={<Location color='dark-5' size='small' />}
      onClick={onClick}
      title={label}
    />
  )
}

RecenterButton.propTypes = {
  onClick: func.isRequired
}

export default RecenterButton
