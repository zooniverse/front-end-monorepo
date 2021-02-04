import { shallow } from 'enzyme'
import React from 'react'

import Choice from './Choice'

describe.only('Component > Choice', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <Choice />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
