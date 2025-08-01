import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import { getStatsDateString } from '@utils'

import { USER } from '../../../../test/mocks/panoptes'
import { STATS } from '../../../../test/mocks/stats.mock.js'

import Meta, { Default, NoStats, ParamsValidationMessage } from './MainContent.stories.js'

const todayUTC = getStatsDateString(new Date())
const sevenDaysAgoUTC = getStatsDateString(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000))

describe('components > shared > MainContent', function () {
  const DefaultStory = composeStory(Default, Meta)
  const NoStatsStory = composeStory(NoStats, Meta)
  const ParamsValidationMessageStory = composeStory(ParamsValidationMessage, Meta)

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
    const activeTab = screen.getByRole('tab', { name: 'Classifications', selected: true })

    expect(activeTab).to.be.ok()
  })

  it('should show "ALL PROJECTS" as the selected project', function () {
    render(<DefaultStory />)
    const projectSelectMenu = screen.getByRole('button', { name: 'Select project; Selected: ALL PROJECTS' })
    const projectSelect = screen.getByRole('textbox', { name: 'Select project, ALL PROJECTS' })

    expect(projectSelectMenu).to.be.ok()
    expect(projectSelect).to.be.ok()
    expect(projectSelect.value).to.equal('ALL PROJECTS')
  })

  it('should show "LAST 7 DAYS" as the selected date range', function () {
    render(<DefaultStory />)
    const dateRangeSelectMenu = screen.getByRole('button', { name: 'Select date range; Selected: LAST 7 DAYS' })
    const dateRangeSelect = screen.getByRole('textbox', { name: 'Select date range, LAST 7 DAYS' })

    expect(dateRangeSelectMenu).to.be.ok()
    expect(dateRangeSelect).to.be.ok()
    expect(dateRangeSelect.value).to.equal('LAST 7 DAYS')
  })

  it('should show a bar chart of classifications stats', function () {
    render(<DefaultStory />)

    expect(screen.getByLabelText(`Bar chart of Classifications by Day from ${sevenDaysAgoUTC} to ${todayUTC}`)).to.be.ok()
  })

  it('should show a no data message when there are no stats', function () {
    render(<NoStatsStory />)

    expect(screen.getByText('No data found.')).to.be.ok()
  })

  it('should show a params validation message when there\'s an invalid param', function () {
    render(<ParamsValidationMessageStory />)

    expect(screen.getByText('Invalid project_id, must be a number')).to.be.ok()
  })
})
