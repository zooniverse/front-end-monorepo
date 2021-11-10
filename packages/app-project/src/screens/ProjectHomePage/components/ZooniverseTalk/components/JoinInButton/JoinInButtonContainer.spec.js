import { shallow, render } from 'enzyme'

import { JoinInButtonContainer } from './JoinInButtonContainer'
import JoinInButton from './JoinInButton'

const ROUTER = {
  asPath: '/foo/bar',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

describe('Component > JoinInButtonContainer', function () {
  let wrapper
  let componentWrapper

  before(function () {
    wrapper = shallow(<JoinInButtonContainer router={ROUTER} />)
    componentWrapper = wrapper.find(JoinInButton)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `JoinInButton` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass valid link props for Talk', function () {
    expect(componentWrapper.prop('linkProps')).to.deep.equal({ href: '/foo/bar/talk' })
  })
})
