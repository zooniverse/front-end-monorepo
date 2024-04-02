export const AdminGroupCard = {
  displayName: 'Group Name',
  classifications: 1234,
  contributors: 89,
  hours: 567,
  projects: 10,
  role: 'group_admin'
}

export const MemberGroupCard = {
  ...AdminGroupCard,
  role: 'group_member'
}
