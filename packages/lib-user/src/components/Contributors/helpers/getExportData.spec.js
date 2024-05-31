import { PROJECTS, USER, GROUP_MEMBER_USER, GROUP_ADMIN_USER } from '../../../../test/mocks/panoptes'
import { group_member_stats_breakdown } from '../../../../test/mocks/stats.mock'

import { getExportData } from './getExportData'

describe('Contributors > getExportData', function () {
  let projects
  let stats
  let users

  before(function () {
    projects = PROJECTS
    stats = {
      group_member_stats_breakdown
    }
    users = [USER, GROUP_MEMBER_USER, GROUP_ADMIN_USER]
  })

  it('should return an array of arrays with the correct data', function () {
    const projectNames = [
      `Notes from Nature - Capturing California's Flowers`,
      'NEST QUEST GO: EASTERN BLUEBIRDS',
      'Corresponding with Quakers',
      'Wildwatch Kenya is a short project name compared to the longest live project at 80',
      'Planet Hunters TESS'
    ]
    const data = getExportData({ projects, stats, users })

    expect(data).to.eql([
      [
        'Display Name', 'Username', 'Total Classifications', 'Total Hours',
        ...projectNames.flatMap(projectName => [`${projectName} Classifications`, `${projectName} Hours`])
      ],
      [
        'Test User 1', 'TestUser', 13425, 234, 121, 23, 93, 34, 45, 56, 36, 67, 0, 0
      ],
      [ 
        'Student User 1', 'StudentUser', 9574, 345, 0, 0, 56, 34, 45, 56, 23, 67, 0, 0
      ], 
      [ 
        'Teacher User', 'TeacherUser', 648, 456, 0, 0, 0, 0, 45, 56, 3, 67, 56, 45
      ]
    ])
  })
})
