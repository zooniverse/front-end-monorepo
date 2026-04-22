import { IconActionButton } from '@zooniverse/react-components'
import { ZoomIn } from 'grommet-icons'
import { func } from 'prop-types'

import { useTranslation } from '@translations/i18n'

function ZoomInButton({ onClick }) {
  const { t } = useTranslation('components')
  const label = t('ImageToolbar.ZoomInButton.ariaLabel')

  return (
    <IconActionButton
      a11yTitle={label}
      icon={<ZoomIn size='18px' />}
      onClick={onClick}
      title={label}
    />
  )
}

ZoomInButton.propTypes = {
  onClick: func.isRequired
}

export default ZoomInButton
