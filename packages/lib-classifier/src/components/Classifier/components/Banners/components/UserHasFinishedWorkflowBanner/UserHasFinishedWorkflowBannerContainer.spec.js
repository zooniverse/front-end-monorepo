import { shallow } from 'enzyme'
import React from 'react'

import UserHasFinishedWorkflowBannerContainer from './UserHasFinishedWorkflowBannerContainer'
import Banner from '../Banner'

let wrapper
let componentWrapper

describe('Component > UserHasFinishedWorkflowBannerContainer', function () {
  before(function () {
    wrapper = shallow(<UserHasFinishedWorkflowBannerContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Banner)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render a <Banner />', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a `background` prop to <Banner />', function () {
    expect(componentWrapper.prop('background')).to.equal('status-warning')
  })

  it('should pass a `bannerText` prop to <Banner />', function () {
    expect(componentWrapper.prop('bannerText')).to.equal('Finished: You\'ve seen everything')
  })

  it('should pass a `tooltipText` prop to <Banner />', function () {
    const expectedText = [
      'You\'ve already classified everything in this workflow, so further classifications on this subject won\'t be used in its analysis.',
      'If you\'re looking to help, try choosing a different workflow or contributing to a different project.'
    ]
    expect(componentWrapper.prop('tooltipText')).to.deep.equal(expectedText)
  })

  describe('when the banner should show', function () {
    it('should show if the user has finished the workflow', function () {
      wrapper.setProps({
        subject: {
          finished_workflow: false,
          id: '1',
          user_has_finished_workflow: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.true
    })
  })

  describe('when the banner shouldn\'t show', function () {
    it('shouldn\'t show when there\'s no subject', function () {
      wrapper.setProps({ subject: null })
      expect(wrapper.find(Banner).prop('show')).to.be.false
    })

    it('shouldn\'t show when the user hasn\'t finished the workflow', function () {
      wrapper.setProps({
        subject: {
          id: '1',
          user_has_finished_workflow: false
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false
    })

    it('shouldn\'t show when the workflow is finished', function () {
      wrapper.setProps({
        subject: {
          finished_workflow: true,
          id: '1',
          user_has_finished_workflow: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false
    })
  })
})
