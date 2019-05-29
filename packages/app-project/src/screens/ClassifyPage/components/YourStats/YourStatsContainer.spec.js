import { shallow } from 'enzyme'
import React from 'react'

import { YourStatsContainer } from './YourStatsContainer'
import YourStats from './YourStats'

let wrapper
let componentWrapper
const COUNTS = {
  foo: 'bar'
}
const PROJECT_NAME = 'Foobar'

describe('Component > YourStatsContainer', function () {
  before(function () {
    wrapper = shallow(<YourStatsContainer counts={COUNTS} projectName={PROJECT_NAME} />)
    componentWrapper = wrapper.find(YourStats)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `YourStats` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the `projectName` prop', function () {
    expect(componentWrapper.prop('projectName')).to.equal(PROJECT_NAME)
  })

  it('should pass down the `counts` prop', function () {
    expect(componentWrapper.prop('counts')).to.equal(COUNTS)
  })
})
