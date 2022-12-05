import { mount, shallow } from 'enzyme'
import { I18nextProvider } from 'react-i18next'
import i18n from '@test/i18n/i18n-for-tests'
import sinon from 'sinon'

import UserHasFinishedWorkflowBanner from './UserHasFinishedWorkflowBanner'
import Banner from '../Banner'

let wrapper
let componentWrapper

describe('Component > UserHasFinishedWorkflowBanner', function () {
  before(function () {
    wrapper = shallow(<UserHasFinishedWorkflowBanner />)
    componentWrapper = wrapper.find(Banner)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a <Banner />', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a `background` prop to <Banner />', function () {
    expect(componentWrapper.prop('background')).to.equal('status-warning')
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
      expect(wrapper.find(Banner).prop('show')).to.be.true()
    })
  })

  describe('when the banner shouldn\'t show', function () {
    it('shouldn\'t show when there\'s no subject', function () {
      wrapper.setProps({ subject: null })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })

    it('shouldn\'t show when the user hasn\'t finished the workflow', function () {
      wrapper.setProps({
        subject: {
          id: '1',
          user_has_finished_workflow: false
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })

    it('shouldn\'t show when the workflow is finished', function () {
      wrapper.setProps({
        subject: {
          finished_workflow: true,
          id: '1',
          user_has_finished_workflow: true
        }
      })
      expect(wrapper.find(Banner).prop('show')).to.be.false()
    })
  })

  describe('translated text', function () {
    let useTranslationStub

    before(function () {
      useTranslationStub = sinon.stub(i18n, 't')
      wrapper = mount(
        <I18nextProvider>
          <UserHasFinishedWorkflowBanner />
        </I18nextProvider>
      )
    })

    after(function () {
      useTranslationStub.restore()
    })

    it('should translate `bannerText` before passing to <Banner />', function () {
      expect(useTranslationStub).to.have.been.calledWith('Banners.UserHasFinishedWorkflowBanner.bannerText')
    })

    it('should translate `tooltipText` before passing to <Banner />', function () {
      expect(useTranslationStub).to.have.been.calledWith('Banners.UserHasFinishedWorkflowBanner.tooltipText')
    })
  })
})
