import { Image } from 'grommet-icons'
import { bool, string } from 'prop-types'

import { useTranslation } from '../translations/i18n'
import IconActionButton from '../IconActionButton'

function ImageIconButton({
  disabled = false,
  href = null,
  ...props
}) {
  const { t } = useTranslation()

  return (
    <IconActionButton
      a11yTitle={t('ImageIconButton.viewImage')}
      disabled={disabled}
      href={disabled ? undefined : href}
      icon={<Image />}
      target={disabled ? undefined : '_blank'}
      {...props}
    />
  )
}

ImageIconButton.propTypes = {
  disabled: bool,
  href: string
}

export default ImageIconButton
