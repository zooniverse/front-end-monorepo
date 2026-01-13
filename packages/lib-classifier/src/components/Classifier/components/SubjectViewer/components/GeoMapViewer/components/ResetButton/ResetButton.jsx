import { Revert } from 'grommet-icons'
import { func } from 'prop-types'

import { useTranslation } from '@translations/i18n'

import ControlButton from '../ControlButton'

function ResetButton({ onClick }) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.ResetButton.ariaLabel')

  function handleClick() {
    const confirmMessage = t('SubjectViewer.GeoMapViewer.ResetButton.confirm')
    if (window.confirm(confirmMessage)) {
      onClick()
    }
  }
  
  return (
    <ControlButton
      a11yTitle={label}
      icon={<Revert color='dark-5' size='small' />}
      onClick={handleClick}
      title={label}
    />
  )
}

ResetButton.propTypes = {
  onClick: func.isRequired
}

export default ResetButton
