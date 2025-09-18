import { Markdownz } from '@zooniverse/react-components'
import { Anchor, Box, Paragraph, Text } from 'grommet'
import { Like, LikeFill, Share } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'
import { StyledRole } from '../../../../../ProjectAboutPage/components/TeamMember/TeamMember'
import Avatar from './components/Avatar'

const markdownComponents = {
  p: (nodeProps) => <Paragraph color={{ dark: 'neutral-6', light: 'neutral-7' }}>{nodeProps.children}</Paragraph>
}

const StyledCommentCard = styled(Box)`
  &:hover {
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
  }
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
  roles = undefined,
  upvoted = false
}) {
  const { t } = useTranslation('screens')
  
  const localeDate = new Date(comment.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
  
  const upvotes = comment.upvotes ? Object.keys(comment.upvotes).length : 0

  const LikeIcon = upvotes > 0 ? (
    <LikeFill
      size='small'
      color={upvoted ? { dark: 'accent-1', light: 'neutral-1' } : undefined}
    />
  ) : (
    <Like size='small' />
  )

  return (
    <StyledCommentCard
      margin='2px'
      pad='xsmall'
      round='4px'
      tabIndex={0}
    >
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
            {roles?.map(role => {
              let roleName = ''
              let roleColor = 'accent-1'
              if (role.section === 'zooniverse' && ['admin', 'team'].includes(role.name)) {
                roleName = t('About.TeamMember.admin')
                roleColor = 'light-2'
              } else if (['admin', 'scientist', 'owner'].includes(role.name)) {
                roleName = t('About.TeamMember.researcher')
                roleColor = 'neutral-2'
              } else {
                roleName = t(`About.TeamMember.${role.name}`)
              }

              return (
                <StyledRole
                  key={role.id}
                  round='xxsmall'
                  background={roleColor}
                  margin={{ right: '5px' }}
                >
                  {roleName}
                </StyledRole>
              )
            })}
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
        pad={{ left: '60px', top: 'xsmall'}}
      >
        <Markdownz
          baseURI={''}
          components={markdownComponents}
          projectSlug={comment.project_slug}
        >
          {comment.body}
        </Markdownz>
      </Box>
      <Box
        align='center'
        direction='row'
        gap='xxsmall'
        justify='end'
      >
        {LikeIcon}
        <Text
          color={{ dark: 'accent-1', light: 'neutral-1' }}
          size='1rem'
        >
          {upvotes}
        </Text>
      </Box>
    </StyledCommentCard>
  )
}

export default TalkComment
