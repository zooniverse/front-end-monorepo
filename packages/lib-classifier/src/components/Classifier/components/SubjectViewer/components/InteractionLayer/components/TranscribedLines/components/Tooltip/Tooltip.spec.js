import { shallow } from 'enzyme'
import React from 'react'

import Tooltip from './Tooltip'


describe('TranscribedLines > Component > Tooltip', function () {
  let wrapper
  const label = {
    fill: '#000000',
    text: 'Hello world'
  }
  const background = 'lightgrey'
  const className = 'tooltip'
  const id = `transcribed-0`
  const x1 = 50
  const y1 = 50
  before(function () {
    wrapper = shallow(
      <Tooltip
        background={background}
        className={className}
        id={id}
        label={label} 
        x1={x1} 
        y1={y1}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('svg group', function () {
    let gProps
    before(function () {
      gProps = wrapper.find('g').props()
    })

    it('should transform the position by the coordinates plus 10', function () {
      expect(gProps.transform).to.equal(`translate(${x1 + 10}, ${y1 + 10})`)
    })

    it('should use the id', function () {
      expect(gProps.id).to.equal(id)
    })

    it('should use the className', function () {
      expect(gProps.className).to.equal(className)
    })
  })

  describe('svg rect', function () {
    it('should render a fill color for the background', function () {
      expect(wrapper.find('rect').props().fill).to.equal(background)
    })
  })

  describe('svg text', function () {
    it('should render the label fill color', function () {
      expect(wrapper.find('text').props().fill).to.equal(label.fill)
    })

    it('should render the label text', function () {
      expect(wrapper.find('text').text()).to.equal(label.text)
    })
  })
})
