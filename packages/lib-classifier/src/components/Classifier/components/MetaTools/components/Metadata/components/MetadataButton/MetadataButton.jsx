import { MetaToolsButton } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import InfoIcon from './InfoIcon'

export default function MetadataButton ({
  disabled = false,
  onClick = () => true
}) {
  const { t } = useTranslation('components')
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<InfoIcon color='dark-5' size='15px' />}
      text={t('MetaTools.MetadataButton.label')}
      onClick={onClick}
    />
  )
}

MetadataButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}
