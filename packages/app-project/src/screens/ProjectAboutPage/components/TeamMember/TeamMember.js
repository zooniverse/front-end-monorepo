import { Box, Image } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import NavLink from '@shared/components/NavLink'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

const StyledTeamMember = styled(Box)`
  margin-bottom: 30px;
  list-style: none;
  display: flex;
  flex-direction: row;
`

export const StyledAvatar = styled(Box)`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  overflow: hidden;
`

export const StyledDisplayName = styled(Box)`
  font-size: 14px;
  line-height: 1;
  word-wrap: break-word;
  ${props =>
    css`
      color: ${props.theme.dark
          ? props.theme.global.colors['neutral-6']
          : props.theme.global.colors.black};
    `}
`

export const StyledUsername = styled(NavLink)`
  line-height: 1;
  & > * {
    word-wrap: break-word;
    font-size: 12px;
  }
`

export const StyledRole = styled(Box)`
  font-size: 8px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  width: 90px;
  line-height: 1;
  padding: 5px 0;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 5px;
  ${props =>
    css`
      color: ${props.theme.global.colors.black};
    `}
`

// TO DO: how to tell if user is part of zooniverse team??

const TeamMember = ({ user }) => {
  const router = useRouter()
  const { owner, project } = router.query
  const baseUrl = `/${owner}/${project}/users`

  const { publicRuntimeConfig = {} } = getConfig() || {}
  const assetPrefix = publicRuntimeConfig.assetPrefix || ''
  const placeholderAvatar = `${assetPrefix}/assets/simple-avatar.png`

  return (
    <StyledTeamMember as='li'>
      <StyledAvatar>
        {!user.avatar_src ? (
          <Image 
            alt='Placeholder Avatar'
            fit='cover' 
            src={placeholderAvatar} 
          />
        ) : (
          <Image alt={user.display_name} fit='cover' src={user.avatar_src} />
        )}
      </StyledAvatar>
      <Box flex direction='column'>
        <StyledDisplayName color={{ light: 'neutral-7', dark: '' }}>{user.display_name}</StyledDisplayName>
        <StyledUsername
          link={{ href: `${baseUrl}/${user.login}`, text: `@${user.login}` }}
        />
        {user?.roles?.map(role => (
          <StyledRole
            key={role}
            round='xxsmall'
            background={role === 'owner' ? 'neutral-2' : 'accent-1'}
          >
            {role === 'scientist' ? 'researcher' : role}
          </StyledRole>
        ))}
      </Box>
    </StyledTeamMember>
  )
}

TeamMember.propTypes = {
  user: shape({
    avatar_src: string,
    display_name: string,
    id: string.isRequired,
    login: string,
    roles: arrayOf(string)
  })
}

export default TeamMember
