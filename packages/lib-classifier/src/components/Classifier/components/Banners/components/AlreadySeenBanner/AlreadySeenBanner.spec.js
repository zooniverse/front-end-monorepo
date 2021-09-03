import { shallow } from 'enzyme'
import React from 'react'

import AlreadySeenBanner from './AlreadySeenBanner'

describe('Component > AlreadySeenBanner', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<AlreadySeenBanner />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a <Banner />', function () {
    expect(wrapper).to.have.lengthOf(1)
  })

  it('should pass a `background` prop to <Banner />', function () {
    expect(wrapper.prop('background')).to.equal('status-ok')
  })

  it('should pass a `bannerText` prop to <Banner />', function () {
    expect(wrapper.prop('bannerText')).to.equal('You\'ve already seen this subject')
  })

  it('should pass a `tooltipText` prop to <Banner />', function () {
    const expectedText = [
      'You\'ve already seen and classified this subject, so further classifications won\'t contribute to its analysis.',
      'If you\'re looking to help, try choosing a different workflow or contributing to a different project.'
    ]
    expect(wrapper.prop('tooltipText')).to.deep.equal(expectedText)
  })

  describe('when the banner should show', function () {
    it('should show the banner if the subject has been seen', function () {
      wrapper.setProps({
        subject: {
          alreadySeen: true,
          id: '1'
        }
      })
      expect(wrapper.prop('show')).to.be.true()
    })
  })

  describe('when the banner shouldn\'t show', function () {
    it('shouldn\'t show the banner when there\'s no subject', function () {
      wrapper.setProps({ subject: null })
      expect(wrapper.prop('show')).to.be.false()
    })

    it('shouldn\'t show the banner if the subject has been seen, but is also retired', function () {
      wrapper.setProps({
        subject: {
          alreadySeen: true,
          id: '1',
          retired: true
        }
      })
      expect(wrapper.prop('show')).to.be.false()
    })

    it('shouldn\'t show the banner when subject hasn\'t already been seen', function () {
      wrapper.setProps({
        subject: {
          alreadySeen: false,
          id: '1'
        }
      })
      expect(wrapper.prop('show')).to.be.false()
    })

    it('shouldn\'t show the banner if the subject has been seen, but the workflow is finished', function () {
      wrapper.setProps({
        subject: {
          alreadySeen: true,
          finished_workflow: true,
          id: '1',
          retired: true
        }
      })
      expect(wrapper.prop('show')).to.be.false()
    })

    it('shouldn\'t show the banner if the subject has been seen, but the user has finished the workflow', function () {
      wrapper.setProps({
        subject: {
          alreadySeen: true,
          id: '1',
          retired: true,
          user_has_finished_workflow: true
        }
      })
      expect(wrapper.prop('show')).to.be.false()
    })
  })
})
