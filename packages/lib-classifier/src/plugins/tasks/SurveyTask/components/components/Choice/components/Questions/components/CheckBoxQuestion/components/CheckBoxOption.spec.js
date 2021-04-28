import { shallow } from 'enzyme'
import React from 'react'

import CheckBoxOption from './CheckBoxOption'

describe('Component > CheckBoxOption', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <CheckBoxOption
        option={{
          label: 'Eating',
          value: 'TNG'
        }}
        questionId='WHTBHVRSDS'
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
