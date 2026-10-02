import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as Stories from './ClassifyPage.stories'
const {
  ExternalWorkflow,
  ExternalWorkflowWhileLoading,
  ExternalWorkflowWithoutFlag,
  ExternalWorkflowWithoutUrl
} = composeStories(Stories)

const DEPARTURE_LINK = { name: 'Classify.ExternalWorkflow.button' }

describe('Component > ClassifyPage', function () {
  /** ClassifierWrapper is a next/dynamic import, so warm it before asserting on its loading state. */
  before(async function () {
    await import('./components/ClassifierWrapper')
  })

  describe('with an external workflow', function () {
    beforeEach(function () {
      render(<ExternalWorkflow />)
    })

    it('should link to the external url', function () {
      expect(screen.getByRole('link', DEPARTURE_LINK).href).to.equal('https://example.org/my-workflow')
    })

    it('should render the configured markdown description', function () {
      expect(screen.getByRole('link', { name: 'Learn more' }).href).to.equal('https://www.zooniverse.org/about')
    })

    it('should keep the rest of the classify page', function () {
      expect(screen.getByText('Classify.RecentSubjects.title')).toBeDefined()
    })
  })

  describe('with an external workflow while the app is loading', function () {
    it('should never mount the classifier', async function () {
      render(<ExternalWorkflowWhileLoading />)
      await screen.findByRole('link', DEPARTURE_LINK)
      expect(screen.queryAllByRole('status')).to.have.lengthOf(0)
    })
  })

  describe('without the external workflow experimental tool', function () {
    it('should render the classifier, not the departure screen', async function () {
      render(<ExternalWorkflowWithoutFlag />)
      expect((await screen.findAllByRole('status', {}, { timeout: 8000 })).length).to.be.above(0)
      expect(screen.queryByRole('link', DEPARTURE_LINK)).to.equal(null)
    })
  })

  describe('with the tool enabled but an empty url', function () {
    it('should render the classifier, not the departure screen', async function () {
      render(<ExternalWorkflowWithoutUrl />)
      expect((await screen.findAllByRole('status', {}, { timeout: 8000 })).length).to.be.above(0)
      expect(screen.queryByRole('link', DEPARTURE_LINK)).to.equal(null)
    })
  })
})
