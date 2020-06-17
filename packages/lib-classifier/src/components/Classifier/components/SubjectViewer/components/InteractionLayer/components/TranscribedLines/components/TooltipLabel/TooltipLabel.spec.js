import { shallow } from 'enzyme'
import React from 'react'
import { Blank } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'
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

  it('should render a label', function () {
    expect(wrapper.find(SpacedText).contains(label)).to.be.true()
  })

  it('should render the svg circle icon with the fill color', function () {
    expect(wrapper.find(Blank).props().color).to.equal('blue')
  })
})
