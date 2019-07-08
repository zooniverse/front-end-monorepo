import { shallow } from 'enzyme'
import React from 'react'

import RetiredBannerContainer from './RetiredBannerContainer'
import Banner from '../Banner'

let wrapper
let componentWrapper

describe('Component > RetiredBannerContainer', function () {
  before(function () {
    wrapper = shallow(<RetiredBannerContainer.wrappedComponent />)
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
    expect(componentWrapper.prop('bannerText')).to.equal('Finished: This subject has been retired')
  })

  it('should pass a `tooltipText` prop to <Banner />', function () {
    const expectedText = [
      'This subject already has enough classifications, so yours won\'t be used in its analysis.',
      'If you\'re looking to help, try choosing a different workflow or contributing to a different project.'
    ]
    expect(componentWrapper.prop('tooltipText')).to.deep.equal(expectedText)
  })

  describe('when the banner should show', function () {
    it('should show if the subject has been retired and the workflow isn\'t finished', function () {
      wrapper.setProps({
        subject: {
          finished_workflow: false,
          id: '1',
          retired: true
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

    it('shouldn\'t show when subject hasn\'t been retired', function () {
      wrapper.setProps({
        subject: {
          finished_workflow: false,
          id: '1',
          retired: false
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })

    it('shouldn\'t show if the subject has been retired and the workflow is finished', function () {
      wrapper.setProps({
        subject: {
          finished_workflow: true,
          id: '1',
          retired: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })

    it('shouldn\'t show the banner if the subject has been retired, but the workflow is finished', function () {
      wrapper.setProps({
        subject: {
          already_seen: true,
          finished_workflow: true,
          id: '1',
          retired: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })

    it('shouldn\'t show the banner if the subject has been retired, but the user has finished the workflow', function () {
      wrapper.setProps({
        subject: {
          already_seen: true,
          id: '1',
          retired: true,
          user_has_finished_workflow: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })
  })
})
