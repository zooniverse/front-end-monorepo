import getHeaderItems from './getHeaderItems'

describe('components > GroupStats > getHeaderItems', function () {
  const authUser = {
    id: '24680',
    login: 'testUser'
  }

  const groupAdmin = {
    id: '12345',
    roles: ['group_admin']
  }

  const groupMember = {
    id: '67890',
    roles: ['group_member']
  }

  describe('with private group', function () {
    const privateAggOnly = {
      id: '12345',
      stats_visibility: 'private_agg_only'
    }

    describe('with group member', function () {
      it('should return a link to the user profile', function () {
        const result = getHeaderItems({ authUser, group: privateAggOnly, membership: groupMember })
        expect(result.PrimaryHeaderItem.props.label).to.equal('back to profile')
      })

      it('should return a leave group button', function () {
        const result = getHeaderItems({ authUser, group: privateAggOnly, membership: groupMember })
        expect(result.secondaryHeaderItems[0].props.label).to.equal('Leave Group')
      })
    })

    describe('with group admin', function () {
      it('should return a link to the user profile', function () {
        const result = getHeaderItems({ authUser, group: privateAggOnly, membership: groupAdmin })
        expect(result.PrimaryHeaderItem.props.label).to.equal('back to profile')
      })

      it('should return a copy join link toast', function () {
        const result = getHeaderItems({ authUser, group: privateAggOnly, membership: groupAdmin })
        expect(result.secondaryHeaderItems[0].props.label).to.equal('Copy Join Link')
      })

      it('should return a toast for sharing the group', function () {
        const result = getHeaderItems({ authUser, group: privateAggOnly, membership: groupAdmin })
        expect(result.secondaryHeaderItems[1].props.label).to.equal('Share Group')
      })

      it('should return a manage group button', function () {
        const result = getHeaderItems({ authUser, group: privateAggOnly, membership: groupAdmin })
        expect(result.secondaryHeaderItems[2].props.label).to.equal('Manage Group')
      })
    })
  })

  describe('with public group', function () {
    const publicShowAll = {
      id: '12345',
      stats_visibility: 'public_show_all'
    }

    it('should return a toast for sharing the group if the user is not a member of the group', function () {
      const result = getHeaderItems({ authUser, group: publicShowAll, membership: null })
      expect(result.PrimaryHeaderItem.props.label).to.equal('Share Group')
    })

    describe('with group member', function () {
      it('should return a link to the user profile', function () {
        const result = getHeaderItems({ authUser, group: publicShowAll, membership: groupMember })
        expect(result.PrimaryHeaderItem.props.label).to.equal('back to profile')
      })
  
      it('should return a leave group button', function () {
        const result = getHeaderItems({ authUser, group: publicShowAll, membership: groupMember })
        expect(result.secondaryHeaderItems[0].props.label).to.equal('Leave Group')
      })
  
      it('should return a toast for sharing the group', function () {
        const result = getHeaderItems({ authUser, group: publicShowAll, membership: groupMember })
        expect(result.secondaryHeaderItems[1].props.label).to.equal('Share Group')
      })
    })

    describe('with group admin', function () {
      it('should return a link to the user profile', function () {
        const result = getHeaderItems({ authUser, group: publicShowAll, membership: groupAdmin })
        expect(result.PrimaryHeaderItem.props.label).to.equal('back to profile')
      })
  
      it('should return a copy join link toast', function () {
        const result = getHeaderItems({ authUser, group: publicShowAll, membership: groupAdmin })
        expect(result.secondaryHeaderItems[0].props.label).to.equal('Copy Join Link')
      })

      it('should return a toast for sharing the group', function () {
        const result = getHeaderItems({ authUser, group: publicShowAll, membership: groupAdmin })
        expect(result.secondaryHeaderItems[1].props.label).to.equal('Share Group')
      })

      it('should return a manage group button', function () {
        const result = getHeaderItems({ authUser, group: publicShowAll, membership: groupAdmin })
        expect(result.secondaryHeaderItems[2].props.label).to.equal('Manage Group')
      })
    })
  })
})
