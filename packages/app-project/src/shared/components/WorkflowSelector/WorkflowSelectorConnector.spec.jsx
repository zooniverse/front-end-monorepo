import asyncStates from '@zooniverse/async-states'
import { render } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import WorkflowSelectorConnector from './WorkflowSelectorConnector'

describe('Component > WorkflowSelector > WorkflowSelectorConnector', function () {
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
      completeness: 0,
      configuration: {
        external_workflow_url: 'https://example.org/cfe'
      },
      displayName: 'External Workflow',
      id: '32842'
    }
  ]

  function buildStore(experimental_tools) {
    return {
      project: {
        experimental_tools,
        workflow_description: 'Pick a workflow'
      },
      user: {
        loadingState: asyncStates.success,
        personalization: {
          projectPreferences: {
            isLoaded: true,
            settings: {}
          }
        }
      }
    }
  }

  function renderConnector(experimental_tools) {
    return render(
      <RouterContext.Provider value={mockRouter}>
        <WorkflowSelectorConnector
          mockStore={buildStore(experimental_tools)}
          workflows={workflows}
        />
      </RouterContext.Provider>
    )
  }

  it('should derive externalWorkflowEnabled from the external workflow experimental tool', function () {
    const { queryByText } = renderConnector(['external workflow'])
    expect(queryByText(/WorkflowSelector.WorkflowSelectButton.externalWorkflow/)).to.not.equal(null)
  })

  it('should not enable external workflows for a project without the tool', function () {
    const { queryByText } = renderConnector([])
    expect(queryByText(/WorkflowSelector.WorkflowSelectButton.externalWorkflow/)).to.equal(null)
  })
})
