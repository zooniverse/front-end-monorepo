import { Box, Image } from 'grommet'
import { shape, string } from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import NavLink from '@shared/components/NavLink'
import { withRouter } from 'next/router'

const StyledTeamMember = styled(Box)`
  margin-bottom: 14px;
  list-style: none;
  display: flex;
  flex-direction: row;
`

const Placeholder = styled(Box)`
  height: 50px;
  width: 50px;
  ${props =>
    css`
      background: ${props.theme.global.colors['brand']};
    `}
`

const StyledAvatar = styled(Box)`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 10px;
`

const StyledDisplayName = styled(Box)`
  font-size: 14px;
  line-height: 1;
  word-wrap: break-word;
  ${props =>
    css`
      color: ${props.theme.global.colors['black']};
    `}
`

const StyledUsername = styled(NavLink)`
  line-height: 1;
  & > * {
    word-wrap: break-word;
    font-size: 12px;
  }
`

const StyledRole = styled(Box)`
  font-size: 10px;
  display: flex;
  align-items: center;
  width: 100px;
  line-height: 1;
  padding: 5px 0;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 5px;
  ${props =>
    css`
      color: ${props.theme.global.colors['black']};
    `}
`

// TO DO: how to tell if user is part of zooniverse team??

const TeamMember = ({ user, theme, router }) => {
  const { owner, project } = router.query
  const baseUrl = `/projects/${owner}/${project}/users`

  return (
    <StyledTeamMember as="li">
      <StyledAvatar overflow="hidden" width="30%">
        {!user.avatar_src ? (
          <Placeholder />
        ) : (
          <Image alt={user.display_name} fit="cover" src={user.avatar_src} />
        )}
      </StyledAvatar>
      <Box flex={true} direction="column">
        <StyledDisplayName>{user.display_name}</StyledDisplayName>
        <StyledUsername
          link={{ href: `${baseUrl}/${user.login}`, text: `@${user.login}` }}
        />
        {user.roles &&
          user.roles.length &&
          user.roles.map(role => (
            <StyledRole
              key={role}
              round="xxsmall"
              background={
                user.role === 'owner'
                  ? theme.global.colors['neutral-4']
                  : theme.global.colors.brand
              }
            >
              {role}
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
    role: string
  })
}

export default withRouter(withTheme(TeamMember))
