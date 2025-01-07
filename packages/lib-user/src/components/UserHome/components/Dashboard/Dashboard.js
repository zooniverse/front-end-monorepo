import { Anchor, Box, Image, ResponsiveContext, Text } from 'grommet'
import {
  Bookmark,
  Chat,
  Favorite,
  FormNext,
  MailOption
} from 'grommet-icons'
import { useContext } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { bool, shape, string } from 'prop-types'
import { SpacedHeading, SpacedText } from '@zooniverse/react-components'
import { useTranslation } from '../../../../translations/i18n.js'

import DashboardLink from './components/DashboardLink.js'
import StatsTabsContainer from './components/StatsTabs/StatsTabsContainer.js'
import Link from 'next/link'

const Relative = styled(Box)`
  position: relative;
`

const StyledAvatar = styled(Box)`
  width: 140px;
  height: 140px;
  overflow: hidden;
  position: absolute;
  top: 203px;
  border-radius: 50%;

  // For Grommet breakpoint small
  @media (width < 769px) {
    width: 92px;
    height: 92px;
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

  &:focus {
    box-shadow: 0 0 2px 2px
      ${props => props.theme.global.colors[props.theme.global.colors.focus]};
  }
`

// Same as ContentBox
const border = {
  color: {
    dark: 'light-1',
    light: 'light-5'
  },
  side: 'all',
  size: '0.5px'
}

export default function Dashboard({ user, userLoading }) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const { dark } = useTheme()

  return (
    <Box align='center' round={size === 'small' ? false : '16px 16px 8px 8px'}>
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
        round={size === 'small' ? false : '16px 16px 0 0'}
      >
        <StyledAvatar
          background='brand'
          border={{
            size: '6px',
            color: dark ? 'dark-3' : 'neutral-6', // Not sure why we have to manually grab dark from useTheme but ¯\_(ツ)_/¯
            style: 'solid'
          }}
        >
          <Image
            alt={t('common.avatarAlt', { login: user?.login })}
            fit='contain'
            src={
              !user?.avatar_src || userLoading
                ? 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg'
                : user?.avatar_src
            }
          />
        </StyledAvatar>
      </Relative>
      <Box
        fill
        round={size === 'small' ? false : '0 0 8px 8px'}
        border={size === 'small' ? false : border}
        elevation={size === 'small' ? 'none' : 'xsmall'}
        align='center'
        pad={{ bottom: '20px' }}
      >
        {/* Name */}
        <NameContainer
          margin={
            size !== 'small'
              ? { top: '94px', bottom: '20px' }
              : { top: '60px', bottom: '20px' }
          }
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
        <Box direction='row' gap='30px' margin={{ bottom: '30px' }}>
          <DashboardLink
            icon={<Favorite />}
            text={t('UserHome.Dashboard.favorites')}
            href={`https://www.zooniverse.org/favorites/${user?.login}`}
          />
          <DashboardLink
            icon={<Bookmark />}
            text={t('UserHome.Dashboard.collections')}
            href={`https://www.zooniverse.org/collections/${user?.login}`}
          />
          <DashboardLink
            icon={<Chat />}
            text={t('UserHome.Dashboard.comments')}
            href={`https://www.zooniverse.org/users/${user?.login}`}
          />
          <DashboardLink
            icon={<MailOption />}
            text={t('UserHome.Dashboard.messages')}
            href={`https://www.zooniverse.org/inbox`}
          />
        </Box>

        <Box align='center' gap='20px'>
          {/* Stats Preview */}
          <StatsTabsContainer user={user} />
          <Relative fill>
            <StyledStatsLink
              alignSelf={size === 'small' ? 'center' : 'end'}
              forwardedAs={Link}
              href={`/users/${user?.login}/stats`}
              label={<SpacedText>{t('UserHome.Dashboard.moreStats')}</SpacedText>}
              icon={<FormNext />}
              reverse
              color={{ light: 'dark-5', dark: 'white' }}
              gap='large'
            />
          </Relative>
        </Box>
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
