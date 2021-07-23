import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import WorkflowSelectButtons from './WorkflowSelectButtons'

describe('Component > WorkflowSelector > WorkflowSelectorButtons', function () {
  it('should render without crashing', function () {
    expect(render(<WorkflowSelectButtons onSelect={() => { }} />)).to.be.ok()
  })

  describe('when there isn\'t an assigned workflow', function () {
    const workflows = [
      {
        id: '1'
      }, {
        id: '2'
      }
    ]
    it('should render a workflow select link for each workflow', function () {
      render(<WorkflowSelectButtons onSelect={() => { }} workflows={workflows} />)
      expect(screen.getAllByRole('link')).to.have.lengthOf(workflows.length)
    })
  })

  describe('when there is an assigned workflow', function () {
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
    it('should only render links for unlocked workflows', function () {
      render(<WorkflowSelectButtons assignedWorkflowID='1' onSelect={() => { }} workflows={workflows} />)
      expect(screen.getByRole('link', { href: '/projects/undefined/undefined/classify/workflow/1'})).to.exist()
      expect(screen.getAllByRole('link')).to.have.lengthOf(1)
      expect(screen.getByText('workflow 2')).to.exist()
      expect(screen.getByText('workflow 3')).to.exist()
    })
  })
})