import { shallow } from 'enzyme'
import * as React from 'react'
import sinon from 'sinon'
import WorkflowSelectorConnector from './WorkflowSelectorConnector'
import WorkflowSelector from './WorkflowSelector'
import { expect } from 'chai'

describe('Component > Hero > WorkflowSelector > WorkflowSelectorConnector', function () {
  const WORKFLOW_DESCRIPTION = 'Sit nulla mi metus tellus aenean lobortis litora'
  let wrapper, mockStore, stubbedContext, componentWrapper, workflows

  before(function () {
    mockStore = {
      store: {
        project: {
          workflow_description: WORKFLOW_DESCRIPTION
        },
        user: {
          loadingState: 'success',
          personalization: { 
            projectPreferences: {
              isLoaded: true,
              settings: { workflow_id: '5' }
            }
          }
        }
      }
    }
    stubbedContext = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    workflows = [{ id: '5' }]
    wrapper = shallow(
      <WorkflowSelectorConnector
        workflows={workflows}
      />
    )
    componentWrapper = wrapper.find(WorkflowSelector)
  })

  after(function() {
    stubbedContext.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `WorkflowSelector` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the `workflowDescription`', function () {
    expect(componentWrapper.prop('workflowDescription')).to.equal(WORKFLOW_DESCRIPTION)
  })

  it('should pass down the user loading state', function () {
    expect(componentWrapper.prop('userReadyState')).to.equal('success')
  })

  it('should pass down the user project preferences isLoaded state', function () {
    expect(componentWrapper.prop('uppLoaded')).to.be.true()
  })

  it('should pass down the assigned workflow id', function () {
    expect(componentWrapper.prop('assignedWorkflowID')).to.equal(mockStore.store.user.personalization.projectPreferences.settings.workflow_id)
  })

  it('should pass down parent props', function () {
    expect(componentWrapper.prop('workflows')).to.deep.equal(workflows)
  })
})
