import { render } from '@testing-library/react'
import { expect } from 'chai'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import WorkflowSelectButtons from './WorkflowSelectButtons'

describe('Component > WorkflowSelector > WorkflowSelectorButtons', function () {
  const mockRouter = {
    asPath: '/zooniverse/snapshot-serengeti',
    basePath: '/projects',
    locale: 'en',
    push() {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

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

  describe('when workflow assignment is not enabled', function () {
    it('should render a workflow link for each workflow', function () {
      const { getAllByRole } = render(
        <RouterContext.Provider value={mockRouter}>
          <WorkflowSelectButtons workflows={workflows} />
        </RouterContext.Provider>
      )
      expect(getAllByRole('link')).to.have.lengthOf(workflows.length)
    })
  })

  describe('when workflow assignment is enabled', function () {
    describe('when there is an assigned workflow', function () {
      it('should only render links for unlocked workflows', function () {
        const { getAllByRole } = render(
          <RouterContext.Provider value={mockRouter}>
            <WorkflowSelectButtons assignedWorkflowID='2' workflowAssignmentEnabled workflows={workflows} />
          </RouterContext.Provider>
        )
        expect(getAllByRole('link')).to.have.lengthOf(2)
      })

      it('should render other workflows as just text', function () {
        const { getByText } = render(
          <RouterContext.Provider value={mockRouter}>
            <WorkflowSelectButtons assignedWorkflowID='2' workflowAssignmentEnabled workflows={workflows} />
          </RouterContext.Provider>
        )
        expect(getByText('workflow 3')).to.exist()
      })
    })

    describe('when there is not an assigned workflow', function () {
      it('should only render the first level workflow as unlocked', function () {
        const { getAllByRole, getByRole } = render(
          <RouterContext.Provider value={mockRouter}>
            <WorkflowSelectButtons assignedWorkflowID='1' workflowAssignmentEnabled workflows={workflows} />
          </RouterContext.Provider>
        )
        expect(getByRole('link', { href: '/projects/undefined/undefined/classify/workflow/1' })).to.exist()
        expect(getAllByRole('link')).to.have.lengthOf(1)

      })

      it('should render other workflows as just text', function () {
        const { getByText } = render(
          <RouterContext.Provider value={mockRouter}>
            <WorkflowSelectButtons assignedWorkflowID='1' workflowAssignmentEnabled workflows={workflows} />
          </RouterContext.Provider>
        )
        expect(getByText('workflow 2')).to.exist()
        expect(getByText('workflow 3')).to.exist()
      })
    })
  })
})
