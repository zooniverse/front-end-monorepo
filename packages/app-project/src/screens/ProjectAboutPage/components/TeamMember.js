import { Box, Image } from 'grommet'
import React from 'react'
import { shape, string } from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import NavLink from '@shared/components/NavLink'

const StyledTeamMember = styled(Box)`
  margin-bottom: 14px;
  list-style: none;
  display: flex;
  flex-direction: row;
`

const Placeholder = styled(Box)`
  ${props => css`background: ${props.theme.global.colors['brand']};`}
  height: 60px;
  width: 60px;
`

const StyledAvatar = styled(Box)`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin-right: 10px;
`

const StyledDisplayName = styled(Box)`
    font-size: 14px;
    line-height: 1;
    ${props => css`color: ${props.theme.global.colors['black']};`}
`

const StyledUsername = styled(NavLink)`
  line-height: 1;
    & > * {
      font-size: 12px;
    }
`

const StyledRole = styled(Box)`
  font-size: 10px;
  ${props => css`background: ${props.theme.global.colors['brand']};`}
  ${props => css`color: ${props.theme.global.colors['black']};`}
  display: flex;
  align-items: center;
  width: 100px;
  line-height: 1;
  padding: 5px 0;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 5px;
`

const TeamMember = ({ user }) => {
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
        <StyledUsername link={{ href: ``, text: `@${user.login}` }} />
        <StyledRole round="xxsmall">{user.role}</StyledRole>
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

export default withTheme(TeamMember)
