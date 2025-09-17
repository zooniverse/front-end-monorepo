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
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
`

function TalkComment({
  avatar = '',
  body = '',
  commentLink = '',
  date = '',
  displayName = '',
  login = '',
  projectSlug = '',
  roles = undefined,
  upvoted = false,
  upvotes = 0
}) {
  const { t } = useTranslation('screens')
  
  const localeDate = new Date(date).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  })

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
            alt={t('Talk.avatarAlt', { login })}
            src={avatar || 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg'}
          />
          <Box
            justify='center'
          >
            <StyledDisplayName
              color={{ dark: 'accent-1', light: 'neutral-1' }}
              size='16px'
            >
              {displayName}
            </StyledDisplayName>
            {login ?
              <Text
                size='xsmall'
                uppercase={false}
              >
                @{login}
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
            a11yTitle={t('Talk.goToComment')}
            gap='xsmall'
            href={addQueryParams(commentLink)}
            icon={<Share size='14.667px' />}
            label={<StyledLinkLabel>{t('Talk.goToComment').toUpperCase()}</StyledLinkLabel>}
          />
        </Box>
      </Box>
      <Box
        pad={{ left: '60px', top: 'xsmall'}}
      >
        <Markdownz
          baseURI={''}
          components={markdownComponents}
          projectSlug={projectSlug}
        >
          {body}
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
          size='16px'
        >
          {upvotes}
        </Text>
      </Box>
    </StyledCommentCard>
  )
}

export default TalkComment
