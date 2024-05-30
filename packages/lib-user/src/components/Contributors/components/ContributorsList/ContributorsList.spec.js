import { composeStory } from '@storybook/react'
import { render, screen, within } from '@testing-library/react'

import { USERS } from '../../../../../test/mocks/panoptes'
import { group_member_stats_breakdown } from '../../../../../test/mocks/stats.mock'

import Meta, { Default } from './ContributorsList.stories.js'

describe('components > Contributors > ContributorsList', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should show the contributors', function () {
    render(<DefaultStory />)
    const contributors = screen.getAllByTestId('contributor-stats')
    expect(contributors).to.have.length(group_member_stats_breakdown.length)
  })

  describe('within a single contributor item', function () {
    it('should show the user\'s avatar', function () {
      render(<DefaultStory />)
      const avatar = screen.getByAltText(`${USERS[0].login} avatar`)
      expect(avatar).to.be.ok()
    })
  
    it('should show the user\'s display name', function () {
      render(<DefaultStory />)
      const displayName = screen.getByText(USERS[0].display_name)
      expect(displayName).to.be.ok()
    })
  
    it('should show the user\'s classifications', function () {
      render(<DefaultStory />)
      const classifications = screen.getByText(group_member_stats_breakdown[0].count.toLocaleString())
      expect(classifications).to.be.ok()
    })
  
    it('should show the user\'s session time', function () {
      render(<DefaultStory />)
      const sessionTime = screen.getByText(group_member_stats_breakdown[0].session_time.toLocaleString())
      expect(sessionTime).to.be.ok()
    })
  
    it('should show the user\'s project stats', function () {
      render(<DefaultStory />)
      const contributorItem = screen.getAllByTestId('contributor-stats')[0]

      const projectStats = within(contributorItem).getAllByTestId('project-stats')
      expect(projectStats).to.have.length(group_member_stats_breakdown[0].project_contributions.length)
    })
  })
})
