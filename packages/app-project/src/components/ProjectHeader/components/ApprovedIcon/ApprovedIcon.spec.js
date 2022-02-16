import { shallow } from 'enzyme'
import sinon from 'sinon'
import i18n from '@test/i18n-for-tests'

import ApprovedIcon from './ApprovedIcon'

describe('Component > ApprovedIcon', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<ApprovedIcon />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('for non-approved projects', function () {
    it('should render null if the `approved` prop is `false`', function () {
      expect(wrapper.isEmptyRender()).to.be.ok()
    })
  })

  describe('for approved projects', function () {
    let useTranslationStub

    before(function () {
      useTranslationStub = sinon.stub(i18n, 't').callsFake((key) => key)
      wrapper = shallow(<ApprovedIcon approved />)
    })

    after(function () {
      useTranslationStub.restore()
    })

    it('should render an icon if `approved` is true', function () {
      expect(wrapper.find('FormCheckmark')).to.have.lengthOf(1)
    })

    it('should have a text equivalent for screen readers', function () {
      expect(wrapper.find('FormCheckmark').prop('aria-label')).exists()
      expect(useTranslationStub).to.have.been.calledWith('ProjectHeader.ApprovedIcon.title')
    })
  })
})
