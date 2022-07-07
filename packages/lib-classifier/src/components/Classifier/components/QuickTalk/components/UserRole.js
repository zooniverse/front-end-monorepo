import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'grommet'

function roleDisplayName (role) {
  if (
    role.section === 'zooniverse'
    && ['admin', 'team'].indexOf(role.name) >= 0
  ) {
    return 'Zooniverse Team'

  } else if (
    role.section !== 'zooniverse'
    && ['admin', 'scientist', 'owner'].indexOf(role.name) >= 0
  ) {
    return 'Researcher'
  }

  return role.name
}

function UserRole ({ role }) {
  if (!role) return null

  return (
    <Text size='xsmall'>
      [{roleDisplayName(role)}]
    </Text>
  )
}

UserRole.propTypes = {
  role: PropTypes.object,
}

export default UserRole
