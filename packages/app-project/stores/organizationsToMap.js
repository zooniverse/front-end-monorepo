export default function organizationsToMap(organizations = []) {
  if (!Array.isArray(organizations)) return organizations
  return Object.fromEntries(organizations.map(organization => [organization.id, organization]))
}
