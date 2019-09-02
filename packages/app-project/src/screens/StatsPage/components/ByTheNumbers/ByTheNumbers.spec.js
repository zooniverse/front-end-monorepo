import { shallow } from 'enzyme'
import React from 'react'

import ByTheNumbers from './ByTheNumbers'

describe('Component > ByTheNumbers', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <ByTheNumbers
        projectName='A test project'
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
