import { shallow } from 'enzyme'
import React from 'react'

import AvatarContainer from './AvatarContainer'

let wrapper

describe('Component > AvatarContainer', function () {
  before(function () {
    wrapper = shallow(<AvatarContainer.wrappedComponent child={StubComponent} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `child` component prop', function () {
    expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
  })
})

function StubComponent (props) {
  return <div {...props}>stub</div>
}
