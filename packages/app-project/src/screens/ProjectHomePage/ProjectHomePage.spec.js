import { shallow } from 'enzyme'
import sinon from 'sinon'

import ProjectHomePage from './ProjectHomePage'

describe('Component > ProjectHomePage', function () {
  let routerMock
  let wrapper

  before(function () {
    routerMock = {
      locale: 'en'
    }
    wrapper = shallow(<ProjectHomePage router={routerMock} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should not render a border for the wrapping Box container', function () {
    expect(wrapper.props().border).to.be.false()
  })

  describe('with a project in beta', function () {
    before(function () {
      wrapper = shallow(<ProjectHomePage inBeta router={routerMock} />)
    })

    it('should render a border for the wrapping Box container', function () {
      expect(wrapper.props().border).to.deep.equal({ color: 'brand', size: 'medium' })
    })
  })
})