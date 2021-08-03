import React from 'react'
import PropTypes from 'prop-types'

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
    <span>
      [{roleDisplayName(role)}]
    </span>
  )
}

UserRole.propTypes = {
  role: PropTypes.object,
}

export default UserRole
