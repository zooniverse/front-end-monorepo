import { CircleInformation } from 'grommet-icons'
import { bool, func } from 'prop-types'

import { useTranslation } from '../../../translations/i18n'
import IconActionButton from '../../../IconActionButton'

const DEFAULT_HANDLER = () => true

function MetadataButton({
  disabled = false,
  onClick = DEFAULT_HANDLER,
  ...props
}) {
  const { t } = useTranslation()

  return (
    <IconActionButton
      a11yTitle={t('MetadataIconButton.metadata')}
      disabled={disabled}
      icon={<CircleInformation />}
      onClick={onClick}
      {...props}
    />
  )
}

MetadataButton.propTypes = {
  disabled: bool,
  onClick: func
}

export default MetadataButton
