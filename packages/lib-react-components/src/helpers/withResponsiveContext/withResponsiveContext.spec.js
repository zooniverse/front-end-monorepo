import { mount } from 'enzyme'

import withResponsiveContext from './withResponsiveContext'

describe('withResponsiveContext', function () {
  function StubComponent() {
    return <p>Hello</p>
  }

  let wrapper
  const WithResponsiveContext = withResponsiveContext(StubComponent)

  before(function () {
    wrapper = mount(<WithResponsiveContext />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render the component passed as the first argument', function () {
    expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
  })
})
