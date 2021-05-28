import React from 'react'
import { shallow } from 'enzyme'
import { Modal, PrimaryButton } from '@zooniverse/react-components'
import { Button } from 'grommet'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'
import en from './locales/en'

describe('Component > WorkflowAssignmentModal', function () {
  let wrapper
  before(function() {
    wrapper = shallow(<WorkflowAssignmentModal />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a Modal', function () {
    expect(wrapper.find(Modal)).to.have.lengthOf(1)
  })

  it('should render rendering messaging', function () {
    expect(wrapper.contains(en.WorkflowAssignmentModal.content)).to.be.true()
  })

  it('should render a confirmation button', function () {
    const button = wrapper.find(PrimaryButton)
    expect(button.props().label).to.equal(en.WorkflowAssignmentModal.confirm)
  })

  it('should render a cancel button', function () {
    const button = wrapper.find(Button)
    expect(button.props().label).to.equal(en.WorkflowAssignmentModal.cancel)
  })
})
