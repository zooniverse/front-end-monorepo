import { shallow } from 'enzyme'
import React from 'react'

import Team from './Team'

let wrapper

const DATA = [{ id: 'foo' }]
const FILTERS = [{ id: 'bar' }]

describe('Component > Team', function () {
  before(function () {
    wrapper = shallow(<Team data={DATA} filters={FILTERS} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
