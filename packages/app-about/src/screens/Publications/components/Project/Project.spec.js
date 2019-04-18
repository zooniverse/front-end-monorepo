import { shallow } from 'enzyme'
import React from 'react'

import Project from './Project'

let wrapper
const DATA = {
  name: 'Foobar',
  publications: [
    {
      citation: 'Baz'
    }
  ]
}

describe('Component > Project', function () {
  before(function () {
    wrapper = shallow(<Project data={DATA} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
