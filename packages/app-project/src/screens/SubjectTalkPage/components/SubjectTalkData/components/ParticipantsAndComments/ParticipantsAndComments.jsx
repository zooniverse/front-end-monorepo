import { Box, Text } from 'grommet'
import { Chat, User } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { number } from 'prop-types'

function ParticipantsAndComments({ commentsCount, usersCount }) {
  const { t } = useTranslation('screens')

  return (
    <Box
      align='center'
      direction='row'
      gap='xxsmall'
    >
      <span
        id='participants-icon'
        aria-hidden='true'
      >
        <User
          a11yTitle={t('Talk.Comment.participants')}
          size='12px'
        />
      </span>
      <Text
        aria-labelledby='participants-icon'
        data-testid='participants-count'
      >
        {usersCount}
      </Text>
      <span 
        id='comments-icon'
        aria-hidden='true'
      >
        <Chat
          a11yTitle={t('Talk.Comment.comments')}
          size='12px'
        />
      </span>
      <Text
        aria-labelledby='comments-icon'
        data-testid='comments-count'
      >
        {commentsCount}
      </Text>
    </Box>
  )
}

ParticipantsAndComments.propTypes = {
  commentsCount: number,
  usersCount: number
}

export default ParticipantsAndComments
