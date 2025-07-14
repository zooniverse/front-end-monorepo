import { useTranslation } from 'next-i18next'

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

export default InvertIconButton
