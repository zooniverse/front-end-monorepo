import { shallow } from 'enzyme'
import { expect } from 'chai'

import withRequireUser from './withRequireUser'

describe('withRequireUser', function () {
  function StubComponent () {
    return <p>Hello</p>
  }
  const WithRequireUser = withRequireUser(StubComponent)
  let wrapper

  const loggedOutStores = {
    store: {
      user: {
        isLoggedIn: false
      }
    }
  }

  const loggedInStores = {
    store: {
      user: {
        isLoggedIn: true
      }
    }
  }

  describe('behavior when not logged in', function () {
    before(function () {
      wrapper = shallow(<WithRequireUser stores={loggedOutStores} />)
    })

    it('should render the wrapped component', function () {
      expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
    })

    it('should include a message to login', function () {
      expect(wrapper.html()).to.include('RequireUser.text')
    })
  })

  describe('behavior when logged in', function () {
    before(function () {
      wrapper = shallow(<WithRequireUser stores={loggedInStores} />)
    })

    it('should render the wrapped component', function () {
      expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
    })

    it('shouldn\'t render anything else', function () {
      expect(wrapper.children()).to.have.lengthOf(1)
    })
  })
})
