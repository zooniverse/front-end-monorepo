import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import { USER } from '../../../../test/mocks/panoptes'
import { STATS } from '../../../../test/mocks/stats.mock.js'

import Meta, { Default } from './MainContent.stories.js'

describe('components > UserStats > MainContent', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should show the user display name', function () {
    render(<DefaultStory />)

    expect(screen.getByText(USER.display_name)).to.be.ok()
  })

  it('should show the user total classifications', function () {
    render(<DefaultStory />)

    expect(screen.getByText(STATS.total_count.toLocaleString())).to.be.ok()
  })

  it('should show "CLASSIFICATIONS" as the active tab', function () {
    render(<DefaultStory />)
    const activeTab = screen.getByRole('tab', { name: 'CLASSIFICATIONS', selected: true })

    expect(activeTab).to.be.ok()
  })

  it('should show "ALL PROJECTS" as the selected project', function () {
    render(<DefaultStory />)
    const projectSelect = screen.getByRole('textbox', { name: 'project-select' })

    expect(projectSelect).to.be.ok()
    expect(projectSelect.value).to.equal('ALL PROJECTS')
  })

  it('should show "LAST 7 DAYS" as the selected date range', function () {
    render(<DefaultStory />)
    const dateRangeSelect = screen.getByRole('textbox', { name: 'date-range-select' })

    expect(dateRangeSelect).to.be.ok()
    expect(dateRangeSelect.value).to.equal('LAST 7 DAYS')
  })

  it('should show a bar chart of classifications stats', function () {
    render(<DefaultStory />)

    expect(screen.getByLabelText('Bar chart of Classifications by Day for Last 7 Days')).to.be.ok()
  })
})
