import { shallow } from 'enzyme'
import React from 'react'
import icons from './icons'

describe('Drawing Task > icons ', function () {
  it('should render an icon without crashing', function () {
    const PointIcon = icons['point']
    shallow(<PointIcon />)
  })

  it('should render the requested drawing task icon', function () {
    const LineIcon = icons['line']
    const wrapper = shallow(<LineIcon />)
    expect(wrapper.containsMatchingElement(
      <line x1='25' y1='90' x2='75' y2='10' />
    )).to.be.true
  })
})
