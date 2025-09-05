import { MetaToolsButton } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import CollectionsIcon from './CollectionsIcon'

const DEFAULT_HANDLER = () => false

export default function CollectionsButton ({
  disabled = false,
  onClick = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  return (
    <MetaToolsButton
      disabled={disabled}
      icon={<CollectionsIcon color='dark-5' size='15px' />}
      text={t('MetaTools.CollectionsButton.add')}
      onClick={onClick}
    />
  )
}

CollectionsButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}
