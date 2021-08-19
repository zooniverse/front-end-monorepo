import { shallow } from 'enzyme'
import sinon from 'sinon'
import * as React from 'react'
import WorkflowAssignmentModalConnector from './WorkflowAssignmentModalConnector'
import asyncStates from '@zooniverse/async-states'
import { expect } from 'chai'

describe('Component > WorkflowAssignmentModalConnector', function () {
  let stubbedContext, wrapper, mockStore
  before(function () {
    mockStore = {
      store: {
        user: {
          personalization: {
            projectPreferences: {
              id: '5',
              loadingState: asyncStates.success,
              promptAssignment: () => true,
              settings: {
                workflow_id: '10'
              }
            }
          }
        }
      }
    }
    stubbedContext = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(<WorkflowAssignmentModalConnector currentWorkflowID='555' className='test' />)
  })

  after(function () {
    mockStore = null
    wrapper = null
    stubbedContext.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass currentWorkflowID as a prop', function () {
    expect(wrapper.props().currentWorkflowID).to.equal('555')
  })

  it('should pass any other props along', function () {
    expect(wrapper.props().className).to.equal('test')
  })

  describe('from the store', function () {
    it('should inject the user project preferences settings workflow id from the store', function () {
      expect(wrapper.props().assignedWorkflowID).to.deep.equal(mockStore.store.user.personalization.projectPreferences.settings.workflow_id)
    })

    it('should inject the user project preferences loading state', function () {
      expect(wrapper.props().loadingState).to.deep.equal(mockStore.store.user.personalization.projectPreferences.loadingState)
    })

    it('should inject the user project preferences promptAssignment function', function () {
      expect(wrapper.props().promptAssignment).to.equal(mockStore.store.user.personalization.projectPreferences.promptAssignment)
    })
  })
})