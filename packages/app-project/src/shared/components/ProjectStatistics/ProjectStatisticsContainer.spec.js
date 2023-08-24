import { render, screen, waitFor } from '@testing-library/react'
import { within } from '@testing-library/dom'
import { composeStory } from '@storybook/react'
import Meta, { ProjectStatistics } from './ProjectStatisticsContainer.stories.js'
import { format } from 'd3'
import {
  ProjectStatisticsContainerMock as projectMock,
  ProjectStatisticsContainerRouterMock as routerMock,
} from './ProjectStatisticsContainer.mock'

describe('Component > ProjectStatisticsContainer', function () {
  beforeEach(function () {
    const ProjectStatisticsStory = composeStory(ProjectStatistics, Meta)
    render(<ProjectStatisticsStory />)
  })

  it('should render the number of volunteers', function() {
    const el = document.getElementsByClassName('test-stat-project-statistics-volunteers')[0]
    expect(within(el).getByText(projectMock.project.classifiers_count)).to.be.ok()
  })

  it('should render the number of classifications', function() {
    const el = document.getElementsByClassName('test-stat-project-statistics-classifications')[0]
    expect(within(el).getByText(projectMock.project.classifications_count)).to.be.ok()
  })

  it('should render the number of subjects', function() {
    const el = document.getElementsByClassName('test-stat-project-statistics-subjects')[0]
    expect(within(el).getByText(projectMock.project.subjects_count)).to.be.ok()
  })

  it('should render the number of completed subjects', function() {
    const el = document.getElementsByClassName('test-stat-project-statistics-completed-subjects')[0]
    expect(within(el).getByText(projectMock.project.retired_subjects_count)).to.be.ok()
  })

  it('should render the percent completed', async function() {
    await waitFor(function() {
      const text = document.querySelector('.test-completion-bar text').innerHTML
      expect(text).to.equal(format('.0%')(projectMock.project.completeness))
    })
  })

  it('should have link to more stats', function() {
    const hrefFound = screen.getByRole('link', { name: 'ProjectStatistics.viewMoreStats' }).href;
    const hrefMatch = `https://localhost/projects/${routerMock.query.owner}/${routerMock.query.project}/stats`
    expect(hrefFound).to.be.equal(hrefMatch)
  })
  
})
