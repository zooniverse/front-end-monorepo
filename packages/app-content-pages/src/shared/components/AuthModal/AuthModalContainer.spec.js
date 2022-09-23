import { shallow } from 'enzyme'

import { AuthModalContainer } from './AuthModalContainer'
import AuthModal from './AuthModal'

let wrapper
let componentWrapper

const ROUTER = {
  asPath: '/',
  pathname: 'foobar',
  push: Function.prototype
}

describe('Component > AuthModalContainer', function () {
  before(function () {
    wrapper = shallow(<AuthModalContainer
      router={ROUTER}
    />)
    componentWrapper = wrapper.find(AuthModal)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `AuthModal` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass a prop to show the Login tab if there is a matching url query', function () {
    global.dom.reconfigure({
      url: 'https://localhost/foo/bar?login=true'
    })
    const loginWrapper = shallow(<AuthModalContainer router={ROUTER} />)
    expect(getChildProp(loginWrapper, 'activeIndex')).to.equal(0)
    global.dom.reconfigure({
      url: 'https://localhost'
    })
  })

  it('should pass a prop to show the Register tab if there is a matching url query', function () {
    global.dom.reconfigure({
      url: 'https://localhost/foo/bar?register=true'
    })
    const loginWrapper = shallow(<AuthModalContainer router={ROUTER} />)
    expect(getChildProp(loginWrapper, 'activeIndex')).to.equal(1)
    global.dom.reconfigure({
      url: 'https://localhost'
    })
  })
})

function getChildProp (wrapper, propName) {
  return wrapper.find(AuthModal).prop(propName)
}
