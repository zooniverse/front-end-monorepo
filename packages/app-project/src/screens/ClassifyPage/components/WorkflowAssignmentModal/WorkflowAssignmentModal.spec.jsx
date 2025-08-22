import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './WorkflowAssignmentModal.stories'

describe('Component > WorkflowAssignmentModal', function () {
  const DefaultStory = composeStory(Default, Meta)

  describe('essential component parts', function () {
    beforeEach(function () {
      render(<DefaultStory />)
    })

    it('should have a cancel button', function () {
      expect(screen.getByText('Classify.WorkflowAssignmentModal.cancel'))
    })

    it('should render a confirmation link', function () {
      const link = document.querySelector(`a[href='/zooniverse/snapshot-serengeti/classify/workflow/1234'`)
      expect(link).toBeDefined()
    })

    it('should have a labeled checkbox', function () {
      expect(screen.getByLabelText('Classify.WorkflowAssignmentModal.dismiss')).toBeDefined()
    })
  })

  describe('when modal has been dismissed', function () {
    before(function () {
      window.sessionStorage.setItem('workflowAssignmentModalDismissed', 'true')
    })

    after(function () {
      window.sessionStorage.removeItem('workflowAssignmentModalDismissed', 'true')
    })

    it('the modal should not be active', function () {
      render(<DefaultStory />)
      expect(document.querySelector(`a[href='/zooniverse/snapshot-serengeti/classify/workflow/1234'`)).to.equal(null)
    })
  })
})
