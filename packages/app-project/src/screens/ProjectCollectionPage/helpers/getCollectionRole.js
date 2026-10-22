const ROLES = ['owner', 'collaborator', 'contributor', 'viewer']

function getCollectionRole(collectionRoles, userId) {
  if (!userId) return null

  const userRole = collectionRoles?.find(role => role.links?.owner?.id === userId)
  return ROLES.find(name => userRole?.roles?.includes(name)) ?? null
}

export default getCollectionRole
