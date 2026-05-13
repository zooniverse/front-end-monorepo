import { IconActionButton } from '@zooniverse/react-components'
import { Update } from 'grommet-icons'
import { func } from 'prop-types'

import { useTranslation } from '@translations/i18n'

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
    <IconActionButton
      a11yTitle={label}
      icon={<Update size='18px' />}
      onClick={handleClick}
      title={label}
    />
  )
}

ResetButton.propTypes = {
  onClick: func.isRequired
}

export default ResetButton
