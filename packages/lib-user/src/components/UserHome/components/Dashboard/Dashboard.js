import { Anchor, Box, Image, ResponsiveContext, Text } from 'grommet'
import { Bookmark, Chat, Favorite, FormNext, MailOption } from 'grommet-icons'
import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { bool, shape, string } from 'prop-types'
import { SpacedHeading, SpacedText } from '@zooniverse/react-components'

import DashboardLink from './components/DashboardLink.js'
import StatsTabsContainer from './components/StatsTabs/StatsTabsContainer.js'

const Relative = styled(Box)`
  position: relative;
`

const StyledAvatar = styled(Image)`
  width: 128px;
  height: 128px;
  object-fit: cover;
  border-radius: 50%;
  border: solid white 6px;
  position: absolute;
  top: 203px;

  // For Grommet breakpoint small
  @media (width < 769px) {
    width: 80px;
    height: 80px;
    top: 137px;
  }
`

const NameContainer = styled(Box)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    ${props =>
      props.theme.dark
        ? css`
            background: linear-gradient(
              90deg,
              transparent 0%,
              #000000 50%,
              transparent 100%
            );
          `
        : css`
            background: linear-gradient(
              90deg,
              transparent 0%,
              #a6a7a9 50%,
              transparent 100%
            );
          `}
  }
`

const StyledStatsLink = styled(Anchor)`
  border-radius: 24px; // Same as HeaderButton
  padding: 10px;
  width: 240px;
  display: flex;
  justify-content: flex-end;
  position: relative;

  ${props =>
    props.theme.dark
      ? css`
          box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.7);
        `
      : css`
          box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
        `}

  &:hover {
    text-decoration: none;
  }
`

const StyledBadge = styled(Text)`
  position: absolute;
  right: 10px;
  top: -12px;
  padding: 3px 5px;
  background: ${props => props.theme.global.colors['neutral-1']};
  border-radius: 15px;
`

export default function Dashboard({ user, userLoading }) {
  const size = useContext(ResponsiveContext)

  return (
    <Box align='center' pad={{ bottom: '40px' }}>
      <Relative
        fill
        align='center'
        height={
          size !== 'small'
            ? { min: '270px', max: '270px' }
            : { min: '180px', max: '180px' }
        }
        background={
          !user?.profile_header || userLoading
            ? 'brand'
            : { image: `url(${user.profile_header})` }
        }
        round={size !== 'small' ? { size: '16px', corner: 'top' } : false}
      >
        <StyledAvatar
          alt='User avatar'
          src={
            !user?.avatar_src || userLoading
              ? 'https://www.zooniverse.org/assets/simple-avatar.png'
              : user?.avatar_src
          }
        />
      </Relative>

      {/* Name */}
      <NameContainer
        margin={{ top: '94px', bottom: '20px' }}
        align='center'
        width='min(100%, 45rem)'
        pad={{ bottom: '20px' }}
      >
        <SpacedHeading
          level={1}
          size='1.5rem'
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          textAlign='center'
          margin={{ bottom: '10px', top: '0' }}
        >
          {userLoading ? ' ' : user?.display_name}
        </SpacedHeading>
        <Text>{userLoading ? ' ' : `@${user?.login}`}</Text>
      </NameContainer>

      {/* Links */}
      <Box direction='row' gap='medium' margin={{ bottom: '30px' }}>
        <DashboardLink
          icon={<Favorite size='1rem' />}
          text='Favorites'
          href={`https://www.zooniverse.org/favorites/${user?.login}`}
        />
        <DashboardLink
          icon={<Bookmark size='1rem' />}
          text='Collections'
          href={`https://www.zooniverse.org/collections/${user?.login}`}
        />
        <DashboardLink
          icon={<Chat size='1rem' />}
          text='Comments'
          href={`https://www.zooniverse.org/users/${user?.login}`}
        />
        <DashboardLink
          icon={<MailOption size='1rem' />}
          text='Messages'
          href={`https://www.zooniverse.org/inbox`}
        />
      </Box>

      <Box align='center' gap='30px'>
        {/* Stats Preview */}
        <StatsTabsContainer user={user} />
        <Relative>
          <StyledStatsLink
            alignSelf={size === 'small' ? 'center' : 'end'}
            href={`/users/${user?.login}/stats`}
            label={<SpacedText>More Stats</SpacedText>}
            icon={<FormNext />}
            reverse
            color={{ light: 'dark-5', dark: 'white' }}
            gap='large'
          />
          <StyledBadge color='white' size='0.75rem' weight='bold'>
            NEW
          </StyledBadge>
        </Relative>
      </Box>
    </Box>
  )
}

Dashboard.propTypes = {
  userLoading: bool,
  user: shape({
    avatar_src: string,
    id: string.isRequired,
    profile_header: string
  })
}
