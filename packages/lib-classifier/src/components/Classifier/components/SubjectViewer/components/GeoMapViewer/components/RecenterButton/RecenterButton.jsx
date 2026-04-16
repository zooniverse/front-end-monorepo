import { IconActionButton } from '@zooniverse/react-components'
import { Location } from 'grommet-icons'
import { func } from 'prop-types'

import { useTranslation } from '@translations/i18n'

function RecenterButton({ onClick }) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.RecenterButton.ariaLabel')
  
  return (
    <IconActionButton
      a11yTitle={label}
      icon={<Location color='dark-5' size='18px' />}
      onClick={onClick}
      title={label}
    />
  )
}

RecenterButton.propTypes = {
  onClick: func.isRequired
}

export default RecenterButton
