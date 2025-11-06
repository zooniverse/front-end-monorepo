import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './ProjectStatistics.stories'

/* Note that this UI is animated, so we cannot look for values in AnimatedNumber
components via unit test environment */

describe('Component > ProjectStatisticsContainer', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(<DefaultStory />)
  })

  it('should render a volunteers stat', async function () {
    expect(screen.getByText('ProjectStatistics.volunteers')).toBeDefined()
  })

  it('should render a classifications stat', function () {
    expect(screen.getByText('ProjectStatistics.classifications')).toBeDefined()
  })

  it('should render a subjects stat', function () {
    expect(screen.getByText('ProjectStatistics.subjects')).toBeDefined()
  })

  it('should render a completed subjects stat', function () {
    expect(
      screen.getByText('ProjectStatistics.completedSubjects')
    ).toBeDefined()
  })

  it('should render the percent completed', async function () {
    const percentage = `${Default.args.completeness * 100}%`
    expect(screen.getByText(percentage)).toBeDefined()
  })

  it('should have link to more stats', function () {
    const hrefFound = screen.getByRole('link', {
      name: 'ProjectStatistics.viewMoreStats'
    }).href
    const hrefMatch = DefaultStory.args.linkProps.href
    expect(hrefFound).to.include(hrefMatch)
  })
})
