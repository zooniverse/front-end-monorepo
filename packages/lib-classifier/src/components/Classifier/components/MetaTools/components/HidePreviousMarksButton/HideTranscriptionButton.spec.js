import { shallow } from 'enzyme'
import React from 'react'

import HideTranscriptionButton from './HideTranscriptionButton'

let wrapper

describe('Component > HideTranscriptionButton', function () {
  before(function () {
    wrapper = shallow(<HideTranscriptionButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
