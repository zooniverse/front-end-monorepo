import { composeStory } from '@storybook/react'
import { render, screen, waitFor } from '@testing-library/react'
import { applyRequestHandlers } from 'msw-storybook-addon'
import nock from 'nock'
import userEvent from '@testing-library/user-event'

import Meta, { Default, Error, NoProjects } from './AllProjects.stories.js'
import { PROJECTS } from './AllProjects.mocks.js'

describe('components > shared > AllProjects', function () {
  const DefaultStory = composeStory(Default, Meta)
  const NoProjectsStory = composeStory(NoProjects, Meta)
  const ErrorStory = composeStory(Error, Meta)

  describe('when there are projectContributions', function () {
    let loadMoreButton
    before(async function () {
      nock('https://panoptes-staging.zooniverse.org')
        .persist() // will run for each render in this describe() block
        .get('/api/projects')
        .query(true)
        .reply(function () {
          if (this.req.options.search.includes('page=1')) {
            return [200, { projects: [...PROJECTS.slice(0, 20)] }]
          }
          return [200, { projects: [...PROJECTS.slice(20)] }] // when page=2
        })
      // 👇 so that the MSW loaders are applied
      await applyRequestHandlers(DefaultStory.parameters.msw)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should show max 20 projects on first render', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        const cards = screen.getAllByRole('link')
        expect(cards.length).to.equal(20)
      })
    })

    it('should have a LoadMore button', async function () {
      render(<DefaultStory />)
      await waitFor(() => {
        loadMoreButton = screen.getByRole('button', { name: 'Load More' })
        expect(loadMoreButton).to.be.ok()
      })
    })

    describe('on Load More click', function () {
      before(async function () {
        const user = userEvent.setup({ delay: null })
        const { rerender } = render(<DefaultStory />)
        await waitFor(() => {
          loadMoreButton = screen.getByRole('button', { name: 'Load More' })
        })
        await user.click(loadMoreButton)
        rerender(<DefaultStory />)
      })

      it('should load more projects', async function () {
        await waitFor(() => {
          const cards = screen.getAllByRole('link')
          expect(cards.length).to.equal(22)
        })
      })

      it('should disable the Load More button when all projects are displayed', function () {
        expect(loadMoreButton.disabled).to.be.true()
      })
    })
  })

  describe('when there are no projectContributions', function () {
    before(async function () {
      nock('https://panoptes-staging.zooniverse.org')
        .persist() // will run for each render in this describe() block
        .get('/api/projects')
        .query(true)
        .reply(200, { projects: [] })
      // 👇 so that the MSW loaders are applied
      await applyRequestHandlers(DefaultStory.parameters.msw)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should not have a LoadMore button', function () {
      render(<NoProjectsStory />)
      expect(screen.queryByLabelText('Load More')).to.be.null()
    })

    it('should show the `no projects` message', function () {
      render(<NoProjectsStory />)
      expect(screen.getByText('No projects found')).to.be.ok()
    })
  })

  describe('when there is a container error', function () {
    before(async function () {
      nock('https://panoptes-staging.zooniverse.org')
        .persist() // will run for each render in this describe() block
        .get('/api/projects')
        .query(true)
        .reply(200, { projects: [] })
      // 👇 so that the MSW loaders are applied
      await applyRequestHandlers(DefaultStory.parameters.msw)
    })

    it('should not have a LoadMore button', function () {
      render(<ErrorStory />)
      expect(screen.queryByLabelText('Load More')).to.be.null()
    })

    it('should show the `error` message', function () {
      render(<ErrorStory />)
      expect(screen.getByText('There was an error')).to.be.ok()
    })
  })
})
