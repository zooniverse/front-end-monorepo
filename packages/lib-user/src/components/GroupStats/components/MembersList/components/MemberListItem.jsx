import { SpacedText } from '@zooniverse/react-components'
import { Box, Grid, Menu } from 'grommet'
import { More, UserAdmin } from 'grommet-icons'
import { bool, func, shape, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

const StyledMenu = styled(Menu)`
  div {
    padding: 0;
  }
`

const DEFAULT_HANDLER = () => true

const ROLES = {
  ADMIN: 'group_admin',
  MEMBER: 'group_member'
}

function MemberListItem({
  disabled = false,
  handleDelete = DEFAULT_HANDLER,
  handleUpdate = DEFAULT_HANDLER,
  membershipId,
  role,
  user
}) {
  const { t } = useTranslation()
  const createItem = (label, roles) => ({
    disabled,
    label,
    onClick: () => handleUpdate({
      membershipId,
      data: { roles }
    })
  })

  const items = role === ROLES.ADMIN
    ? [createItem(t('GroupStats.MemberListItem.removeAdmin'), [ROLES.MEMBER])]
    : [createItem(t('GroupStats.MemberListItem.giveAdmin'), [ROLES.ADMIN])]

  items.push({
    disabled,
    label: t('GroupStats.MemberListItem.remove'),
    onClick: () => handleDelete({ membershipId })
  })

  return (
    <Box
      align='center'
      as='li'
      direction='row'
      fill='horizontal'
      height={{ min: '32px' }}
      justify='between'
      margin='none'
      pad='none'
    >
      <Grid
        align='center'
        columns={['1.5em', 'small', 'auto']}
        gap='small'
        justify='start'
        justifyContent='start'
      >
        {role === 'group_admin' ? <UserAdmin size='small' /> : <span>{' '}</span>}
        <SpacedText
          color={{ dark: 'neutral-6', light: 'neutral-7' }}
          uppercase={false}
        >
          {user.display_name}
        </SpacedText>
        <SpacedText
          color='light-5'
          uppercase={false}
        >
          @{user.login}
        </SpacedText>
      </Grid>
      <StyledMenu
        a11yTitle={t('GroupStats.MemberListItem.a11y', { name: user.display_name })}
        icon={<More />}
        items={items}
        margin='xsmall'
      />
    </Box>
  )
}

MemberListItem.propTypes = {
  disabled: bool,
  handleDelete: func,
  handleUpdate: func,
  membershipId: string.isRequired,
  role: string.isRequired,
  user: shape({
    display_name: string.isRequired,
    login: string.isRequired
  }).isRequired
}

export default MemberListItem
