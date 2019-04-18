import { shallow } from 'enzyme'
import React from 'react'

import Team from './Team'

let wrapper
const ACTIVE_FILTER = ''
const CURRENT_VIEW = []
const DATA = [{ name: 'Foobar' }]
const FILTERS = ['Foo']
const SET_ACTIVE_FILTER = () => {}

describe('Component > Team', function () {
  before(function () {
    wrapper = shallow(<Team 
      activeFilter={ACTIVE_FILTER}
      currentView={CURRENT_VIEW}
      data={DATA}
      filters={FILTERS}
      setActiveFilter={SET_ACTIVE_FILTER}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
