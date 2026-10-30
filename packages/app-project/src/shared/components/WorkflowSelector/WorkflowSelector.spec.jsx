import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as Stories from './WorkflowSelector.stories'
const { Default, Error, Loading, WithExternalWorkflow } = composeStories(Stories)

describe('Component > WorkflowSelector', function () {
  describe('workflow description', function () {
    it('should use the workflowDescription prop', function () {
      render(<Default />)
      expect(screen.getByText(/Choose your own adventure/)).toBeDefined()
    })

    it('should use the default message when workflowDescription is empty', function () {
      render(<Default workflowDescription='' />)
      expect(screen.getByText('WorkflowSelector.message')).toBeDefined()
    })
  })

  describe('when the user and their project preferences have loaded', function () {
    it('should render a link for each workflow', function () {
      render(<Default />)
      expect(screen.getAllByRole('link')).to.have.lengthOf(3)
    })
  })

  describe('when the user is still loading', function () {
    it('should not render workflow links', function () {
      render(<Loading />)
      expect(screen.queryAllByRole('link')).to.have.lengthOf(0)
    })
  })

  describe('when the user failed to load', function () {
    it('should render an error message', function () {
      render(<Error />)
      expect(screen.getByText('WorkflowSelector.error')).toBeDefined()
    })
  })

  describe('when the project has an external workflow', function () {
    beforeEach(function () {
      render(<WithExternalWorkflow />)
    })

    it('should label only the external workflow', function () {
      expect(screen.getAllByText(/WorkflowSelector.WorkflowSelectButton.externalWorkflow/)).to.have.lengthOf(1)
    })

    it('should keep the external workflow linked to the classify page', function () {
      const status = screen.getByText(/WorkflowSelector.WorkflowSelectButton.externalWorkflow/)
      const link = screen.getAllByRole('link').find(el => el.contains(status))
      expect(link.getAttribute('href')).to.equal('/test-owner/test-project/classify/workflow/3456')
    })

    it('should still render the standard workflows', function () {
      expect(screen.getAllByRole('link')).to.have.lengthOf(4)
    })
  })
})
