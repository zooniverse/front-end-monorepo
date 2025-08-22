import { render, screen, waitFor } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, {
  ProjectStatistics
} from './ProjectStatisticsContainer.stories'
import { format } from 'd3'
import {
  ProjectStatisticsContainerMock as projectMock,
  ProjectStatisticsContainerRouterMock as routerMock
} from './ProjectStatisticsContainer.mock.js'

/* Note that this UI is animated, so we cannot look for values in AnimatedNumber
components via unit test environment */

describe('Component > ProjectStatisticsContainer', function () {
  beforeEach(function () {
    const ProjectStatisticsStory = composeStory(ProjectStatistics, Meta)
    render(<ProjectStatisticsStory />)
  })

  it('should render a volunteers stat', async function () {
    expect(screen.getByText('ProjectStatistics.volunteers')).to.be.ok()
  })

  it('should render a classifications stat', function () {
    expect(screen.getByText('ProjectStatistics.classifications')).to.be.ok()
  })

  it('should render a subjects stat', function () {
    expect(screen.getByText('ProjectStatistics.subjects')).to.be.ok()
  })

  it('should render a completed subjects stat', function () {
    expect(screen.getByText('ProjectStatistics.completedSubjects')).to.be.ok()
  })

  it('should render the percent completed', async function () {
    await waitFor(function () {
      const text = document.querySelector('.test-completion-bar text').innerHTML
      expect(text).to.equal(format('.0%')(projectMock.project.completeness))
    })
  })

  it('should have link to more stats', function () {
    const hrefFound = screen.getByRole('link', {
      name: 'ProjectStatistics.viewMoreStats'
    }).href
    const hrefMatch = `https://localhost/projects/${routerMock.query.owner}/${routerMock.query.project}/stats`
    expect(hrefFound).to.be.equal(hrefMatch)
  })
})
