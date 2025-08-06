import { Markdownz, ZooniverseLogo } from '@zooniverse/react-components'
import { Anchor, Box, Text } from 'grommet'
import { Like, LikeFill, Share } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import Avatar from './components/Avatar'

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
      forwardedAs='li'
      pad='xsmall'
      round='xxsmall'
      tabIndex={0}
    >
      <Box
        justify='between'
        direction='row'
      >
        <Box
          direction='row'
          gap='xsmall'
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
            href={commentLink}
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
