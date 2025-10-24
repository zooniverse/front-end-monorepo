import { Box } from 'grommet'
import { BlockQuote } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import ParticipantsAndComments from '../ParticipantsAndComments'
import SectionHeading from '../SectionHeading'
import TalkComment from '../TalkComment'

const StyledMentions = styled(Box)`
  max-height: auto;

  @media screen and (max-width: 1280px) {
    max-height: 400px;
  }
`

const StyledOrderedList = styled(Box)`
  list-style: none;
`

function Mentions({
  login = '',
  mentions = [],
  roles = [],
  users = []
}) {
  const { t } = useTranslation('screens')

  return (
    <StyledMentions
      border={{ color: 'light-5', side: 'top', size: '0.5px' }}
      gap='xsmall'
      pad='small'
    >
      <Box
        align='center'
        direction='row'
        gap='small'
      >
        <SectionHeading
          icon={
            <BlockQuote
              color={{ dark: 'light-1', light: 'dark-4' }}
              size='1rem'
            />
          }
          title={t('Talk.mentions')}
        />
        {mentions?.length > 0 && (
          <ParticipantsAndComments
            commentsCount={mentions.length}
            usersCount={mentions.length}
          />
        )}
      </Box>
        <StyledOrderedList
          forwardedAs='ol'
          gap='small'
          margin='none'
          overflow={{ vertical: 'auto' }}
          pad='none'
        >
          {mentions.map(mention => {
            const author = users?.find(user => user.id === mention.user_id)

            const authorRoles = roles?.filter(role => role.user_id === author?.id)
            
            return (
              <li key={mention.id}>
                <TalkComment
                  avatar={author?.avatar_src}
                  comment={mention.comment}
                  login={login}
                  roles={authorRoles}
                />
              </li>
            )
          })}
        </StyledOrderedList>
    </StyledMentions>
  )
}

Mentions.propTypes = {
  login: string,
  mentions: arrayOf(shape({
    id: string,
    user_id: string
  })),
  roles: arrayOf(shape({
    id: string,
    user_id: string
  })),
  users: arrayOf(shape({
    id: string,
    avatar_src: string
  }))
}

export default Mentions
