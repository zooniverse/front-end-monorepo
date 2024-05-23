import { SpacedText } from '@zooniverse/react-components'
import { Box, Grid, Menu } from 'grommet'
import { More, UserAdmin } from 'grommet-icons'
import { bool, func, shape, string } from 'prop-types'

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
  const createItem = (label, roles) => ({
    disabled,
    label,
    onClick: () => handleUpdate({
      membershipId,
      data: { roles }
    })
  })

  const items = role === ROLES.ADMIN
    ? [createItem('Remove admin access', [ROLES.MEMBER])]
    : [createItem('Give admin access', [ROLES.ADMIN])]

  items.push({
    disabled,
    label: 'Remove member',
    onClick: () => handleDelete({ membershipId })
  })

  return (
    <Box
      align='center'
      as='li'
      direction='row'
      fill='horizontal'
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
        {role === 'group_admin' ? <UserAdmin /> : <span>{' '}</span>}
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
      <Menu
        icon={<More />}
        items={items}
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
