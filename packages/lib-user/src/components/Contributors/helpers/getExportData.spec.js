import { PROJECTS, USER, GROUP_MEMBER_USER, GROUP_ADMIN_USER } from '../../../../test/mocks/panoptes'
import { group_member_stats_breakdown } from '../../../../test/mocks/stats.mock'

import { getExportData } from './getExportData'

describe('components > Contributors > getExportData', function () {
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
        'Test User 1', 'TestUser', 13425, 65.1, 121, 5.9, 93, 9.7, 45, 15.7, 36, 18.7, 0, 0
      ],
      [ 
        'Student User 1', 'StudentUser', 9574, 95.9, 0, 0, 56, 9.7, 45, 15.6, 23, 18.7, 0, 0
      ], 
      [ 
        'Teacher User 1', 'TeacherUser', 648, 126.8, 0, 0, 0, 0, 45, 15.6, 3, 18.8, 56, 12.6
      ]
    ])
  })
})
