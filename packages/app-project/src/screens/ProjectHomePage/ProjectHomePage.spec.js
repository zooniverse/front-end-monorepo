import { shallow } from 'enzyme'
import sinon from 'sinon'

import ProjectHomePage from './ProjectHomePage'

describe('Component > ProjectHomePage', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<ProjectHomePage />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should not render a border for the wrapping Box container', function () {
    expect(wrapper.props().border).to.be.false()
  })

  describe('with a project in beta', function () {
    before(function () {
      wrapper = shallow(<ProjectHomePage inBeta />)
    })

    it('should render a border for the wrapping Box container', function () {
      expect(wrapper.props().border).to.deep.equal({ color: 'brand', size: 'medium' })
    })
  })
})