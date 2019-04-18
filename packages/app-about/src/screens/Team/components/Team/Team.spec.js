import { shallow } from 'enzyme'
import React from 'react'

import Team from './Team'

let wrapper
const DATA = {
  name: 'Foobar',
  people: [
    { name: 'Baz' }
  ]
}

describe('Component > Team', function () {
  before(function () {
    wrapper = shallow(<Team data={DATA} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
