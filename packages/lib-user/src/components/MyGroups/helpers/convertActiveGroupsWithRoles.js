function convertActiveGroupsWithRoles(membershipsWithGroups = []) {
  if (!membershipsWithGroups?.memberships) {
    return []
  }

  return membershipsWithGroups.linked.user_groups.reduce((activeGroupsWithRoles, group) => {
    const membership = membershipsWithGroups.memberships
      .find((membership) => membership.links.user_group === group.id)

    if (membership?.state === 'active') {
      activeGroupsWithRoles.push({ ...group, roles: membership.roles })
    }

    return activeGroupsWithRoles
  }, [])
}

export default convertActiveGroupsWithRoles
