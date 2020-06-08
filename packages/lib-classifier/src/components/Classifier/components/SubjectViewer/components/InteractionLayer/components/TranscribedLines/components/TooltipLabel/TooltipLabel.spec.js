import { shallow } from 'enzyme'
import React from 'react'

import TooltipLabel from './TooltipLabel'


describe('TranscribedLines > Component > TooltipLabel', function () {
  let wrapper
  const label = 'Has Transcriptions'
  before(function () {
    wrapper = shallow(
      <TooltipLabel
        fill='blue'
        label={label} 
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

})
