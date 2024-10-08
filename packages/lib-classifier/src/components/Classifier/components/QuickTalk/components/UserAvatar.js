import PropTypes from 'prop-types'
import { Box, Image } from 'grommet'
import { useTranslation } from '@translations/i18n'

const DEFAULT_AVATAR = 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg'

function UserAvatar ({
  src,
  displayName = '',
  size = '3em',
}) {
  const { t } = useTranslation('components')
  const imgSrc = (src && src.length > 0) ? src : DEFAULT_AVATAR

  return (
    <Box
      alignSelf='center'
      width={size}
      height={size}
    >
      <Image
        alt={t('QuickTalk.aria.userAvatar', { name: displayName })}
        src={imgSrc}
        fallback={DEFAULT_AVATAR}
      />
    </Box>
  )
}

UserAvatar.propTypes = {
  src: PropTypes.string,
  displayName: PropTypes.string,
  size: PropTypes.string,  // Any CSS string
}

export default UserAvatar
