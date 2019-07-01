import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Button } from 'grommet'
import FeedbackModal from './FeedbackModal'
import getFeedbackViewer from './helpers/getFeedbackViewer'

const applicableRules = [
  { id: '1', strategy: 'graph2drange' },
  { id: '2', strategy: 'graph2drange' }
]

describe('FeedbackModal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent />)
    expect(wrapper).to.be.ok
  })

  it('should not render if showModal false', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal={false} />)
    expect(wrapper.html()).to.be.null
  })

  it('should show FeedbackViewer if hideSubjectViewer false and applicableRules', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal hideSubjectViewer={false} applicableRules={applicableRules} messages={['Yay!', 'Good Job', 'Try Again']} />)
    const FeedbackViewer = getFeedbackViewer(applicableRules)
    const viewer = wrapper.find(FeedbackViewer)
    expect(viewer).to.have.lengthOf(1)
  })

  it('should not show FeedbackViewer if hideSubjectViewer false but no applicableRules', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal hideSubjectViewer={false} applicableRules={[]} messages={['Yay!', 'Good Job', 'Try Again']} />)
    // setting FeedbackViewer with applicableRules, not [], to get a component. Would get null from getFeedbackViewer if called with [], and can't wrapper.find(null)
    const FeedbackViewer = getFeedbackViewer(applicableRules)
    const viewer = wrapper.find(FeedbackViewer)
    expect(viewer).to.have.lengthOf(0)
  })

  it('should not show FeedbackViewer if hideSubjectViewer true', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal hideSubjectViewer applicableRules={applicableRules} messages={['Yay!', 'Good Job', 'Try Again']} />)
    const FeedbackViewer = getFeedbackViewer(applicableRules)
    const viewer = wrapper.find(FeedbackViewer)
    expect(viewer).to.have.lengthOf(0)
  })

  it('should show messages', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal messages={['Yay!', 'Good Job', 'Try Again']} />)
    const list = wrapper.find('li')
    expect(list).to.have.lengthOf(3)
  })

  it('should reduce duplicate messages', function () {
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal messages={['Yay!', 'Yay!', 'Yay!']} />)
    const list = wrapper.find('li')
    expect(list).to.have.lengthOf(1)
  })

  it('should call hideFeedback on close', function () {
    const hideFeedbackStub = sinon.stub()
    const wrapper = shallow(<FeedbackModal.wrappedComponent showModal messages={['Yay!', 'Good Job', 'Try Again']} hideFeedback={hideFeedbackStub} />)
    wrapper.find(Button).simulate('click')
    expect(hideFeedbackStub).to.have.been.called
  })
})
