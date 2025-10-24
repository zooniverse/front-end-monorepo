import { Markdownz } from '@zooniverse/react-components'
import { Anchor, Box, Paragraph, Text } from 'grommet'
import { LikeFill, Share } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'
import Avatar from './components/Avatar'
import Role from './components/Role'

const markdownComponents = {
  p: (nodeProps) => <Paragraph color={{ dark: 'neutral-6', light: 'neutral-7' }}>{nodeProps.children}</Paragraph>
}

const StyledCommentCard = styled(Box)`
  &:hover {
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
  }
`

const StyledReplyBox = styled(Box)`
  background: ${props => {
    const lightStart = props.theme.global.colors['neutral-6']
    const lightEnd = props.theme.global.colors['light-1']
    const darkStart = props.theme.global.colors['dark-3']
    const darkEnd = props.theme.global.colors['dark-4']
    return props.theme.dark
      ? `linear-gradient(270deg, ${darkStart} 0%, ${darkEnd} 100%), ${darkEnd}`
      : `linear-gradient(270deg, ${lightStart} 0%, ${lightEnd} 100%), ${lightEnd}`
  }};
`

const StyledDisplayName = styled(Text)`
  letter-spacing: 0.8px;
`

const StyledDate = styled(Text)`
  visibility: visible;

  ${StyledCommentCard}:hover &,
  ${StyledCommentCard}:focus &,
  ${StyledCommentCard}:focus-within & {
    display: none;
  }
`

const StyledLink = styled(Anchor)`
  opacity: 0;
  pointer-events: none;

  ${StyledCommentCard}:hover &,
  ${StyledCommentCard}:focus &,
  ${StyledCommentCard}:focus-within & {
    opacity: 1;
    pointer-events: auto;
  }
`

const StyledLinkLabel = styled(Text)`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
`

const DEFAULT_COMMENT = {
  id: '',
  board_id: '',
  body: '',
  created_at: '',
  discussion_id: '',
  project_slug: '',
  user_display_name: '',
  user_login: ''
}

function TalkComment({
  avatar = '',
  comment = DEFAULT_COMMENT,
  login = '',
  roles = undefined
}) {
  const { t } = useTranslation('screens')
  
  const localeDate = new Date(comment.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
  
  let upvoted = false
  let upvotes = 0
  if (comment?.upvotes) {
    const upvotedLogins = Object.keys(comment.upvotes)
    upvoted = login ? upvotedLogins.includes(login) : false
    upvotes = upvotedLogins.length
  }

  return (
    <StyledCommentCard
      margin='2px'
      pad={{ bottom: 'xsmall', horizontal: 'xsmall' }}
      round='4px'
      tabIndex={0}
    >
      {comment.reply_id ? (
        <StyledReplyBox
          align='center'
          direction='row'
          gap='xxsmall'
          margin={{ left: '60px' }}
        >
            <Text size='0.75rem'>
              {t('Talk.Comment.reply')}
            </Text>
            <Anchor
              href={addQueryParams(`/projects/${comment.project_slug}/users/${comment.reply_user_login}`)}
              size='0.75rem'
              weight='500'
            >
              {t('Talk.Comment.userDisplayNamePossessive', { userDisplayName: comment.reply_user_display_name })}
            </Anchor>
            <Anchor
              href={addQueryParams(`/projects/${comment.project_slug}/talk/${comment.board_id}/${comment.discussion_id}?comment=${comment.reply_id}`)}
              size='0.75rem'
              weight='500'
            >
              {t('Talk.Comment.comment')}
            </Anchor>
        </StyledReplyBox>
      ) : null}
      <Box
        justify='between'
        direction='row'
      >
        <Box
          direction='row'
          gap='10px'
        >
          <Avatar
            alt={t('Talk.Comment.avatarAlt', { login: comment.user_login })}
            src={avatar || 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg'}
          />
          <Box
            justify='center'
          >
            <Anchor href={addQueryParams(`/projects/${comment.project_slug}/users/${comment.user_login}`)}>
              <StyledDisplayName
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                size='1rem'
              >
                {comment.user_display_name}
              </StyledDisplayName>
            </Anchor>
            {comment.user_login ?
              <Text
                size='xsmall'
                uppercase={false}
              >
                @{comment.user_login}
              </Text>
              : null}
          </Box>
          <Box
            height={{ max: '50px' }}
            wrap
          >
            {roles?.map(role => (
              <Role
                key={role.id}
                role={role}
              />
            ))}
          </Box>
        </Box>
        <Box
          align='end'
          pad={{ top: 'xsmall' }}
        >
          <StyledDate
            size='xsmall'
            uppercase={false}
          >
            {localeDate}
          </StyledDate>
          <StyledLink
            a11yTitle={t('Talk.Comment.goToComment')}
            gap='xsmall'
            href={addQueryParams(`/projects/${comment.project_slug}/talk/${comment.board_id}/${comment.discussion_id}?comment=${comment.id}`)}
            icon={<Share size='14.667px' />}
            label={<StyledLinkLabel>{t('Talk.Comment.goToComment').toUpperCase()}</StyledLinkLabel>}
          />
        </Box>
      </Box>
      <Box
        pad={{ left: '60px' }}
      >
        <Markdownz
          baseURI={''}
          components={markdownComponents}
          projectSlug={comment.project_slug}
        >
          {comment.body}
        </Markdownz>
      </Box>
      {upvotes > 0 ? (
        <Box
          align='center'
          direction='row'
          gap='xxsmall'
          justify='end'
        >
          <LikeFill
            size='small'
            color={upvoted ? { dark: 'accent-1', light: 'neutral-1' } : undefined}
          />
          <Text
            color={{ dark: 'accent-1', light: 'neutral-1' }}
            size='1rem'
          >
            {upvotes}
          </Text>
        </Box>
      ) : null}
    </StyledCommentCard>
  )
}

export default TalkComment
