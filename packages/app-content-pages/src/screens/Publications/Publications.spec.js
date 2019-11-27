import { shallow } from 'enzyme'
import React from 'react'

import Publications from './Publications'

const DATA = [{ id: 'foo' }]
const FILTERS = [{ id: 'bar' }]

describe('Component > Publications', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<Publications
      data={DATA}
      filters={FILTERS}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
