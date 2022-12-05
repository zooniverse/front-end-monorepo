import { MetaToolsButton } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import CollectionsIcon from './CollectionsIcon'

export default function CollectionsButton (props) {
  const { t } = useTranslation('components')
  const { disabled, onClick } = props
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

CollectionsButton.defaultProps = {
  disabled: false,
  onClick: () => false
}
