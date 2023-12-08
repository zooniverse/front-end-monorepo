import convertActiveGroupsWithRoles from './convertActiveGroupsWithRoles.js'

const mockAdminMembership = {
  id: '1',
  links: {
    user_group: '1'
  },
  roles: ['group_admin'],
  state: 'active'
}

const mockMembership = {
  id: '2',
  links: {
    user_group: '2'
  },
  roles: ['group_member'],
  state: 'active'
}

const mockInactiveMembership = {
  id: '3',
  links: {
    user_group: '3'
  },
  roles: ['group_member'],
  state: 'inactive'
}

const mockUserGroup1 = {
  id: '1',
  name: 'mockUserGroup1',
}

const mockUserGroup2 = {
  id: '2',
  name: 'mockUserGroup2',
}

const mockUserGroup3 = {
  id: '3',
  name: 'mockUserGroup3',
}

describe('components > MyGroups > convertActiveGroupsWithRoles', function () {
  it('returns an empty array when membershipsWithGroups is undefined', function () {
    const membershipsWithGroups = undefined
    const activeGroupsWithRoles = convertActiveGroupsWithRoles(membershipsWithGroups)
    expect(activeGroupsWithRoles).to.deep.equal([])
  })

  it('returns an empty array when membershipsWithGroups is null', function () {
    const membershipsWithGroups = null
    const activeGroupsWithRoles = convertActiveGroupsWithRoles(membershipsWithGroups)
    expect(activeGroupsWithRoles).to.deep.equal([])
  })

  it('returns an empty array when membershipsWithGroups is an empty object', function () {
    const membershipsWithGroups = {}
    const activeGroupsWithRoles = convertActiveGroupsWithRoles(membershipsWithGroups)
    expect(activeGroupsWithRoles).to.deep.equal([])
  })

  it('returns an empty array when membershipsWithGroups.memberships is an empty array', function () {
    const membershipsWithGroups = { memberships: [] }
    const activeGroupsWithRoles = convertActiveGroupsWithRoles(membershipsWithGroups)
    expect(activeGroupsWithRoles).to.deep.equal([])
  })

  it('returns an empty array when membershipsWithGroups.linked.user_groups is undefined', function () {
    const membershipsWithGroups = { memberships: [ mockAdminMembership, mockMembership, mockInactiveMembership ], linked: {} }
    const activeGroupsWithRoles = convertActiveGroupsWithRoles(membershipsWithGroups)
    expect(activeGroupsWithRoles).to.deep.equal([])
  })

  it('returns the expected array when membershipsWithGroups\' memberships and linked.user_groups are defined', function () {
    const membershipsWithGroups = {
      memberships: [ mockAdminMembership, mockMembership, mockInactiveMembership ],
      linked: {
        user_groups: [ mockUserGroup1, mockUserGroup2, mockUserGroup3 ]
      }
    }
    const activeGroupsWithRoles = convertActiveGroupsWithRoles(membershipsWithGroups)
    expect(activeGroupsWithRoles).to.deep.equal([
      { ...mockUserGroup1, roles: mockAdminMembership.roles },
      { ...mockUserGroup2, roles: mockMembership.roles }
    ])
  })
})
