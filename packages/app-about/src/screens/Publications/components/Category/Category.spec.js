import { shallow } from 'enzyme'
import React from 'react'

import Category from './Category'

let wrapper
const DATA = {
  name: 'Foobar',
  projects: [
    {
      name: 'Baz'
    }
  ]
}

describe('Component > Category', function () {
  before(function () {
    wrapper = shallow(<Category data={DATA} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
