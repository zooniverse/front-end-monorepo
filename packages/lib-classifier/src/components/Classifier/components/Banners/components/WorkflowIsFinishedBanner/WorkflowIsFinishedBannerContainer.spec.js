import { shallow } from 'enzyme'
import React from 'react'

import WorkflowIsFinishedBannerContainer from './WorkflowIsFinishedBannerContainer'
import Banner from '../Banner'

let wrapper
let componentWrapper

describe('Component > WorkflowIsFinishedBannerContainer', function () {
  before(function () {
    wrapper = shallow(<WorkflowIsFinishedBannerContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Banner)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a <Banner />', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a `background` prop to <Banner />', function () {
    expect(componentWrapper.prop('background')).to.equal('status-critical')
  })

  it('should pass a `bannerText` prop to <Banner />', function () {
    expect(componentWrapper.prop('bannerText')).to.equal('This workflow is finished')
  })

  it('should pass a `tooltipText` prop to <Banner />', function () {
    const expectedText = [
      'All the subjects in this workflow have been completed, so further classifications on this subject won\'t be used in its analysis.',
      'If you\'re looking to help, try choosing a different workflow or contributing to a different project.'
    ]
    expect(componentWrapper.prop('tooltipText')).to.deep.equal(expectedText)
  })

  describe('when the banner should show', function () {
    it('should show if the workflow is finished', function () {
      wrapper.setProps({
        subject: {
          finished_workflow: true,
          id: '1'
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.true()
    })
  })

  describe('when the banner shouldn\'t show', function () {
    it('shouldn\'t show when there\'s no subject', function () {
      wrapper.setProps({ subject: null })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })

    it('shouldn\'t show when the workflow isn\'t finished', function () {
      wrapper.setProps({
        subject: {
          finished_workflow: false,
          id: '1'
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })
  })
})
