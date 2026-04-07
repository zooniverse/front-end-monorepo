import { IconActionButton } from '@zooniverse/react-components'
import { ZoomOut } from 'grommet-icons'
import { func } from 'prop-types'

import { useTranslation } from '@translations/i18n'

function ZoomOutButton({ onClick }) {
  const { t } = useTranslation('components')
  const label = t('ImageToolbar.ZoomOutButton.ariaLabel')

  return (
    <IconActionButton
      a11yTitle={label}
      icon={<ZoomOut color='dark-5' size='18px' />}
      onClick={onClick}
      title={label}
    />
  )
}

ZoomOutButton.propTypes = {
  onClick: func.isRequired
}

export default ZoomOutButton
