import { shallow } from 'enzyme'
import React from 'react'

import Person from './Person'

let wrapper
const DATA = {
  name: 'Foobar'
}

describe('Component > Person', function () {
  before(function () {
    wrapper = shallow(<Person data={DATA} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
