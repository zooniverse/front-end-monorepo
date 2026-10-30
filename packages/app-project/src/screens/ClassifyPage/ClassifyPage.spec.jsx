import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as Stories from './ClassifyPage.stories'
import {
  EXTERNAL_WORKFLOW,
  Page,
  STANDARD_WORKFLOW,
  loadingStore
} from './ClassifyPage.stories'
const {
  ExternalWorkflow,
  ExternalWorkflowBeforeAppLoads,
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
      render(<ExternalWorkflowBeforeAppLoads />)
      await screen.findByRole('link', DEPARTURE_LINK)
      expect(screen.queryAllByRole('status')).to.have.lengthOf(0)
    })
  })

  /*
    Clicking Classify in the project header drops the workflow from the URL, on a
    project with more than one active workflow. The main area keeps showing the last
    selected workflow, whichever kind it is.
  */
  describe('when the header Classify link drops the workflow from the URL', function () {
    it('should keep the departure screen', async function () {
      const { rerender } = render(
        <Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={EXTERNAL_WORKFLOW} />
      )
      await screen.findByRole('link', DEPARTURE_LINK)

      rerender(<Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={undefined} />)

      expect(screen.getByRole('link', DEPARTURE_LINK)).toBeDefined()
      expect(screen.queryAllByRole('status')).to.have.lengthOf(0)
    })

    it('should keep a standard workflow classifier', async function () {
      const { rerender } = render(
        <Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={STANDARD_WORKFLOW} />
      )
      expect((await screen.findAllByRole('status', {}, { timeout: 8000 })).length).to.be.above(0)

      rerender(<Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={undefined} />)

      expect(screen.queryAllByRole('status').length).to.be.above(0)
      expect(screen.queryByRole('link', DEPARTURE_LINK)).to.equal(null)
    })

    it('should swap to the departure screen when an external workflow is picked from the menu', async function () {
      const { rerender } = render(
        <Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={STANDARD_WORKFLOW} />
      )
      expect((await screen.findAllByRole('status', {}, { timeout: 8000 })).length).to.be.above(0)

      rerender(<Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={undefined} />)
      rerender(<Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={EXTERNAL_WORKFLOW} />)

      await screen.findByRole('link', DEPARTURE_LINK)
      expect(screen.queryAllByRole('status')).to.have.lengthOf(0)
    })

    it('should swap to the classifier when a standard workflow is picked from the menu', async function () {
      const { rerender } = render(
        <Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={EXTERNAL_WORKFLOW} />
      )
      await screen.findByRole('link', DEPARTURE_LINK)

      rerender(<Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={undefined} />)
      rerender(<Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={STANDARD_WORKFLOW} />)

      expect((await screen.findAllByRole('status', {}, { timeout: 8000 })).length).to.be.above(0)
      expect(screen.queryByRole('link', DEPARTURE_LINK)).to.equal(null)
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
