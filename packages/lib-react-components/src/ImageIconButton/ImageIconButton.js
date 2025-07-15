import { Image } from 'grommet-icons'
import { bool, string } from 'prop-types'

import { useTranslation } from '../translations/i18n'
import IconActionButton from '../IconActionButton'

function ImageIconButton({
  disabled = false,
  href = '',
  ...props
}) {
  const { t } = useTranslation()

  return (
    <IconActionButton
      a11yTitle={t('ImageIconButton.viewImage')}
      disabled={disabled}
      href={disabled ? undefined : href}
      icon={<Image />}
      rel='noopener noreferrer'
      target='_blank'
      {...props}
    />
  )
}

ImageIconButton.propTypes = {
  disabled: bool,
  href: string
}

export default ImageIconButton
