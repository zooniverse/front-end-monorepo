function convertActiveGroupsWithRoles(membershipsWithGroups = []) {
  let activeGroupsWithRoles = []
  
  if (membershipsWithGroups?.memberships) {
    activeGroupsWithRoles = membershipsWithGroups.linked.user_groups
      .filter((group) => {
        const membershipState = membershipsWithGroups.memberships
          .find((membership) => membership.links.user_group === group.id).state
        return membershipState === 'active'
      })
      .map((group) => {
        const roles = membershipsWithGroups.memberships
          .find((membership) => membership.links.user_group === group.id).roles
        return { ...group, roles }
      })
  }

  return activeGroupsWithRoles
}

export default convertActiveGroupsWithRoles
