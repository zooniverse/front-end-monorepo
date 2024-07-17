import sinon from 'sinon'

import { PROJECTS, USER_GROUPS, USER, GROUP_MEMBER_USER, GROUP_ADMIN_USER } from '../../../../test/mocks/panoptes'
import { group_member_stats_breakdown } from '../../../../test/mocks/stats.mock'

import { generateExport } from './generateExport'

describe('components > Contributors > generateExport', function () {
  let setFilename
  let projects
  let stats
  let users

  before(function () {
    setFilename = sinon.stub()
    projects = PROJECTS
    stats = {
      group_member_stats_breakdown
    }
    users = [USER, GROUP_MEMBER_USER, GROUP_ADMIN_USER]
  })

  after(function () {
    setFilename.resetHistory()
  })

  it('should call setFilename with the correct filename', function () {
    generateExport({
      group: USER_GROUPS[0],
      handleFileName: setFilename,
      projects,
      stats,
      users
    })

    expect(setFilename).to.be.calledWithMatch(/TestGroup.data_export.\d+.csv/)
  })
})
