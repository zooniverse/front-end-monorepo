import { composeStory } from '@storybook/react'
import { render, screen, within } from '@testing-library/react'

import { convertStatsSecondsToHours } from '@utils'

import { USERS } from '../../../../../test/mocks/panoptes/index.js'
import { group_member_stats_breakdown } from '../../../../../test/mocks/stats.mock.js'

import Meta, { Default } from './ContributorsList.stories'

describe('components > Contributors > ContributorsList', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should show the contributors', function () {
    render(<DefaultStory />)
    const contributors = screen.getAllByTestId('contributor-stats')
    expect(contributors).to.have.length(group_member_stats_breakdown.length)
  })

  describe('within a single contributor item', function () {
    let contributorItem

    beforeEach(() => {
      render(<DefaultStory />)
      contributorItem = screen.getAllByTestId('contributor-stats')[0]
    })

    it('should show the user\'s avatar', function () {
      const avatar = within(contributorItem).getByAltText(`${USERS[0].login} avatar`)
      expect(avatar).toBeTruthy()
    })

    it('should show the user\'s display name', function () {
      const displayName = within(contributorItem).getByText(USERS[0].display_name)
      expect(displayName).toBeTruthy()
    })

    it('should show the user\'s classifications', function () {
      const classifications = within(contributorItem).getByText(group_member_stats_breakdown[0].count.toLocaleString())
      expect(classifications).toBeTruthy()
    })

    it('should show the user\'s session time', function () {
      const sessionTime = within(contributorItem).getByText(convertStatsSecondsToHours(group_member_stats_breakdown[0].session_time).toLocaleString())
      expect(sessionTime).toBeTruthy()
    })

    it('should show the user\'s project stats', function () {
      const projectStats = within(contributorItem).getAllByTestId('project-stats')
      expect(projectStats).to.have.length(group_member_stats_breakdown[0].project_contributions.length)
    })
  })
})
