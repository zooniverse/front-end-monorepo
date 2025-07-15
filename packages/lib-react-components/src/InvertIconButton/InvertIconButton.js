import { bool } from 'prop-types'

import { useTranslation } from '../translations/i18n'
import IconActionButton from '../IconActionButton'
import InvertIcon from './InvertIcon'

function InvertIconButton({
  checked = false,
  ...props
}) {
  const { t } = useTranslation()

  const label = checked ? 'InvertIconButton.reset' : 'InvertIconButton.invert'

  return (
    <IconActionButton
      a11yTitle={t(label)}
      active={checked}
      aria-checked={checked}
      icon={<InvertIcon />}
      role='checkbox'
      {...props}
    />
  )
}

InvertIconButton.propTypes = {
  checked: bool
}

export default InvertIconButton
