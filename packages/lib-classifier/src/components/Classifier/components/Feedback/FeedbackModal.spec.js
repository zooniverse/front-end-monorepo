import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Button } from 'grommet'
import FeedbackModal from './FeedbackModal'

describe('FeedbackModal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent />)
    expect(wrapper).to.be.ok
  })

  it('should not render if showModal false', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal={false} />)
    expect(wrapper.html()).to.be.null
  })

  it('should show messages', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal messages={['Yay!', 'Good Job', 'Try Again']} />)
    const list = wrapper.find('li')
    expect(list).to.have.lengthOf(3)
  })

  it('should call hideFeedback on close', function () {
    const hideFeedbackStub = sinon.stub()
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal messages={['Yay!', 'Good Job', 'Try Again']} hideFeedback={hideFeedbackStub} />)
    wrapper.find(Button).simulate('click')
    expect(hideFeedbackStub).to.have.been.called
  })
})
