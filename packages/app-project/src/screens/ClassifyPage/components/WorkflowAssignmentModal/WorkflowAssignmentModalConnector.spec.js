import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import WorkflowAssignmentModalConnector from './WorkflowAssignmentModalConnector'

describe('Component > WorkflowAssignmentModalConnector', function () {
  let stubbedContext, wrapper, mockStore
  before(function () {
    mockStore = {
      store: { user: { personalization: { projectPreferences: { id: '5' }}}}
    }
    stubbedContext = sinon.stub(React, 'useContext').callsFake(() => mockStore)
    wrapper = shallow(<WorkflowAssignmentModalConnector workflowID='555' className='test' />)
  })

  after(function () {
    mockStore = null
    wrapper = null
    stubbedContext.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should inject the user project preferences from the store', function () {
    expect(wrapper.props().projectPreferences).to.deep.equal(mockStore.store.user.personalization.projectPreferences)
  })

  it('should pass workflowID as a prop', function () {
    expect(wrapper.props().workflowID).to.equal('555')
  })

  it('should pass any other props along', function () {
    expect(wrapper.props().className).to.equal('test')
  })
})