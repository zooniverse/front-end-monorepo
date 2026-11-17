import { IconActionButton } from '@zooniverse/react-components'
import { ZoomOut } from 'grommet-icons'
import { bool, func } from 'prop-types'

import { useTranslation } from '@translations/i18n'

function ZoomOutButton({ disabled = false, onClick }) {
  const { t } = useTranslation('components')
  const label = t('ImageToolbar.ZoomOutButton.ariaLabel')

  return (
    <IconActionButton
      a11yTitle={label}
      disabled={disabled}
      icon={<ZoomOut size='18px' />}
      onClick={onClick}
      title={label}
    />
  )
}

ZoomOutButton.propTypes = {
  disabled: bool,
  onClick: func.isRequired
}

export default ZoomOutButton
