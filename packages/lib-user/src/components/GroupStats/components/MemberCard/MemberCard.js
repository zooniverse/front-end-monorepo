import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'
import { useTranslation } from '../../../../translations/i18n.js'

import { Avatar } from '@components/shared'

function MemberCard({
  avatar = '',
  classifications = 0,
  displayName = '',
  login = ''
}) {
  const { t } = useTranslation()
  return (
    <Box
      direction='row'
      gap='xsmall'
    >
      <Avatar
        alt={t('common.avatarAlt', { login })}
        src={avatar || 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg'}
      />
      <Box
        justify='center'
      >
        <SpacedText
          weight='bold'
        >
          {displayName}
        </SpacedText>
        <SpacedText
          uppercase={false}
        >
          {classifications.toLocaleString()} {t('common.classifications')}
        </SpacedText>
      </Box>
    </Box>
  )
}

MemberCard.propTypes = {
  avatar: string,
  classifications: number,
  displayName: string,
  login: string
}

export default MemberCard
