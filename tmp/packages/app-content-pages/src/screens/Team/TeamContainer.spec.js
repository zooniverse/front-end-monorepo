import { shallow } from 'enzyme'
import React from 'react'

import { TeamContainer } from './TeamContainer'
import TeamComponent from './Team'

let wrapper
let componentWrapper

const DATA = [{ id: 'foo' }]
const FILTERS = [{ id: 'bar' }]

describe('Component > TeamContainer', function () {
  before(function () {
    wrapper = shallow(<TeamContainer data={DATA} filters={FILTERS} />)
    componentWrapper = wrapper.find(TeamComponent)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Team` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the expected props', function () {
    expect(componentWrapper.prop('data')).to.deep.equal(DATA)
  })
})
