import sinon from 'sinon'

import { PROJECTS, USER_GROUPS, USER, GROUP_MEMBER_USER, GROUP_ADMIN_USER } from '../../../../test/mocks/panoptes'
import { group_member_stats_breakdown } from '../../../../test/mocks/stats.mock'

import { generateExport } from './generateExport'

describe('components > Contributors > generateExport', function () {
  let clock
  let projects = PROJECTS
  let stats = {
    group_member_stats_breakdown
  }
  let users = [USER, GROUP_MEMBER_USER, GROUP_ADMIN_USER]

  beforeEach(function () {
    clock = sinon.useFakeTimers(new Date(2023, 3, 15))
  })

  afterEach(function () {
    clock.restore()
  })

  it('should return the expected export data', async function () {
    const { filename, dataExportUrl } = await generateExport({
      group: USER_GROUPS[0],
      projects,
      stats,
      users
    })

    expect(filename).to.equal('TestGroup_data_export_2023-04-15T000000.csv')
    expect(dataExportUrl).to.be.a('string')
  })
})
