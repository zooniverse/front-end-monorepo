import { shallow } from 'enzyme'
import React from 'react'

import PrimaryButton from './PrimaryButton'

const LABEL = 'Foobar'

describe('Component > PrimaryButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<PrimaryButton label={LABEL} theme={THEME} />)
    expect(wrapper).to.be.ok()
  })
})
