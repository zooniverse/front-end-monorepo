export function getActiveGroupsWithRoles(membershipsWithGroups = []) {
  if (!membershipsWithGroups?.memberships || !membershipsWithGroups?.linked?.user_groups) {
    return []
  }

  const activeGroupsWithRolesMap = membershipsWithGroups.linked.user_groups.reduce((activeGroupsWithRoles, group) => {
    const membership = membershipsWithGroups.memberships
      .find((membership) => membership.links.user_group === group.id)

    if (membership?.state === 'active') {
      activeGroupsWithRoles.set(group.id, { ...group, roles: membership.roles })
    }

    return activeGroupsWithRoles
  }, new Map())

  return Array.from(activeGroupsWithRolesMap.values())
}
