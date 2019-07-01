import { shallow } from 'enzyme'
import React from 'react'

import AlreadySeenBannerContainer from './AlreadySeenBannerContainer'
import Banner from '../Banner'

let wrapper
let componentWrapper

describe('Component > AlreadySeenBannerContainer', function () {
  before(function () {
    wrapper = shallow(<AlreadySeenBannerContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Banner)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render a <Banner />', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a `background` prop to <Banner />', function () {
    expect(componentWrapper.prop('background')).to.equal('status-ok')
  })

  it('should pass a `bannerText` prop to <Banner />', function () {
    expect(componentWrapper.prop('bannerText')).to.equal('You\'ve already seen this subject')
  })

  it('should pass a `tooltipText` prop to <Banner />', function () {
    const expectedText = [
      'You\'ve already seen and classified this subject, so further classifications won\'t contribute to its analysis.',
      'If you\'re looking to help, try choosing a different workflow or contributing to a different project.'
    ]
    expect(componentWrapper.prop('tooltipText')).to.deep.equal(expectedText)
  })

  describe('when the banner should show', function () {
    it('should show the banner if the subject has been seen', function () {
      wrapper.setProps({
        subject: {
          already_seen: true,
          id: '1'
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.true
    })
  })

  describe('when the banner shouldn\'t show', function () {
    it('shouldn\'t show the banner when there\'s no subject', function () {
      wrapper.setProps({ subject: null })
      expect(wrapper.find(Banner).prop('show')).to.be.false
    })

    it('shouldn\'t show the banner if the subject has been seen, but is also retired', function () {
      wrapper.setProps({
        subject: {
          already_seen: true,
          id: '1',
          retired: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false
    })

    it('shouldn\'t show the banner when subject hasn\'t already been seen', function () {
      wrapper.setProps({
        subject: {
          already_seen: false,
          id: '1'
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false
    })

    it('shouldn\'t show the banner if the subject has been seen, but the workflow is finished', function () {
      wrapper.setProps({
        subject: {
          already_seen: true,
          finished_workflow: true,
          id: '1',
          retired: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false
    })

    it('shouldn\'t show the banner if the subject has been seen, but the user has finished the workflow', function () {
      wrapper.setProps({
        subject: {
          already_seen: true,
          id: '1',
          retired: true,
          user_has_finished_workflow: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false
    })
  })
})
