import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import { shape, string } from 'prop-types'
import styled, { css } from 'styled-components'

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
  margin: 5px 5px 0 0;
  ${props =>
    css`
      color: ${props.theme.global.colors.black};
    `}
`

function Role({ role }) {
  const { t } = useTranslation('screens')

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
  
  return(
    <StyledRole
      key={role.id}
      round='xxsmall'
      background={roleColor}
    >
      {roleName}
    </StyledRole>
  )
}

Role.propTypes = {
  role: shape({
    id: string,
    name: string,
    section: string,
    user_id: string
  }).isRequired
}

export default Role
