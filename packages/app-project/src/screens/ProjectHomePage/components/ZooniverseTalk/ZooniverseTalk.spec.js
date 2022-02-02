import { shallow } from 'enzyme'
import { Grid } from 'grommet'
import i18n from '@test/i18n-for-tests'
import sinon from 'sinon'

import { ZooniverseTalk } from './ZooniverseTalk'

describe('Component > ZooniverseTalk', function () {
  let wrapper
  let useTranslationStub
  
  before(function () {
    useTranslationStub = sinon.stub(i18n, 't')
    wrapper = shallow(<ZooniverseTalk />)
  })

  after(function () {
    useTranslationStub.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should show the title', function () {
    expect(useTranslationStub).to.have.been.calledWith('Home.ZooniverseTalk.title')
  })

  it('should show a message', function () {
    expect(useTranslationStub).to.have.been.calledWith('Home.ZooniverseTalk.message')
  })

  it('should use a two-column layout', function () {
    const layout = wrapper.find(Grid)
    expect(layout.prop('columns')).to.deep.equal(['1fr', '3fr'])
  })

  describe('on small screens', function () {
    before(function () {
      wrapper.setProps({ screenSize: 'small' })
    })

    after(function () {
      wrapper.setProps({ screenSize: undefined })
    })

    it('should use a one-column layout', function () {
      const layout = wrapper.find(Grid)
      expect(layout.prop('columns')).to.deep.equal(['1fr'])
    })
  })
})
