import { mount, shallow } from 'enzyme'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@test/i18n/i18n-for-tests'
import sinon from 'sinon'

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

  describe('translated text', function () {
    let useTranslationStub

    before(function () {
      useTranslationStub = sinon.stub(i18n, 't')
      wrapper = mount(
        <I18nextProvider>
          <AlreadySeenBanner />
        </I18nextProvider>
      )
    })

    after(function () {
      useTranslationStub.restore()
    })

    it('should translate `bannerText` before passing to <Banner />', function () {
      expect(useTranslationStub).to.have.been.calledWith('Banners.AlreadySeenBanner.bannerText')
    })
    
    it('should translate `tooltipText` before passing to <Banner />', function () {
      expect(useTranslationStub).to.have.been.calledWith('Banners.AlreadySeenBanner.tooltipText')
    })
  })
})
