import { shallow } from 'enzyme'
import sinon from 'sinon'
import i18n from '@test/i18n-for-tests'

import Avatar from './Avatar'

const src = 'https://example.com/image.jpg'
const projectTitle = 'Example project'

describe('Component > Avatar', function () {
  let wrapper, useTranslationStub
  before(function () {
    useTranslationStub = sinon.stub(i18n, 't').callsFake((key) => key)
    wrapper = shallow(<Avatar projectTitle={projectTitle} src={src} />)
  })

  after(function () {
    useTranslationStub.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should have some `alt` text', function () {
    expect(wrapper.prop('alt')).exists()
    expect(useTranslationStub).to.have.been.calledWith('ProjectHeader.Avatar.alt')
  })
})
