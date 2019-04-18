import { shallow } from 'enzyme'
import React from 'react'

import Publication from './Publication'

let wrapper
const DATA = {
  citation: 'Foobar',
  url: 'Baz'
}

describe('Component > Publication', function () {
  before(function () {
    wrapper = shallow(<Publication data={DATA} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
