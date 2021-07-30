import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import WorkflowSelectButtons from './WorkflowSelectButtons'

describe('Component > WorkflowSelector > WorkflowSelectorButtons', function () {
  const workflows = [
    {
      completeness: 0.3,
      configuration: {
        level: 1
      },
      displayName: 'workflow 1',
      id: '1'
    }, {
      completeness: 0.6,
      configuration: {
        level: 2
      },
      displayName: 'workflow 2',
      id: '2'
    }, {
      completeness: 0.9,
      configuration: {
        level: 3
      },
      displayName: 'workflow 3',
      id: '3'
    }
  ]
  it('should render without crashing', function () {
    expect(render(<WorkflowSelectButtons onSelect={() => { }} />)).to.be.ok()
  })

  describe('when workflow assignment is not enabled', function () {
    it('should render a workflow link for each workflow', function () {
      render(<WorkflowSelectButtons onSelect={() => { }} workflows={workflows} />)
      expect(screen.getAllByRole('link')).to.have.lengthOf(workflows.length)
    })
  })

  describe('when workflow assignment is enabled', function () {
    describe('when there is an assigned workflow', function () {
      it('should only render links for unlocked workflows', function () {
        render(<WorkflowSelectButtons assignedWorkflowID='2' onSelect={() => { }} workflowAssignmentEnabled workflows={workflows} />)
        expect(screen.getAllByRole('link')).to.have.lengthOf(2)
        
      })

      it('should render other workflows as just text', function () {
        render(<WorkflowSelectButtons assignedWorkflowID='2' onSelect={() => { }} workflowAssignmentEnabled workflows={workflows} />)
        expect(screen.getByText('workflow 3')).to.exist()
      })
    })

    describe('when there is not an assigned workflow', function () {
      it('should only render the first level workflow as unlocked', function () {
        render(<WorkflowSelectButtons assignedWorkflowID='1' onSelect={() => { }} workflowAssignmentEnabled workflows={workflows} />)
        expect(screen.getByRole('link', { href: '/projects/undefined/undefined/classify/workflow/1' })).to.exist()
        expect(screen.getAllByRole('link')).to.have.lengthOf(1)

      })

      it('should render other workflows as just text', function () {
        render(<WorkflowSelectButtons assignedWorkflowID='1' onSelect={() => { }} workflowAssignmentEnabled workflows={workflows} />)
        expect(screen.getByText('workflow 2')).to.exist()
        expect(screen.getByText('workflow 3')).to.exist()
      })
    })
  })
})