import { shallow } from 'enzyme'
import React from 'react'
import { Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { AxisBottom } from '@vx/axis'
import mockData from './mockData'

import { BarChartViewer } from './BarChartViewer'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'

const { data, options } = mockData

describe('Component > BarChartViewer', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<BarChartViewer
      data={data}
      options={options}
      parentHeight={500}
      parentWidth={500}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a Chart', function () {
    expect(wrapper.find(Chart)).to.have.lengthOf(1)
  })

  it('should render a Background', function () {
    expect(wrapper.find(Background)).to.have.lengthOf(1)
  })

  it('should render Group', function () {
    expect(wrapper.find(Group)).to.have.lengthOf(1)
  })

  it('should render a Bar for each item in the data array', function () {
    expect(wrapper.find(Bar)).to.have.lengthOf(data.length)
  })

  it('should render a AxisBottom', function () {
    expect(wrapper.find(AxisBottom)).to.have.lengthOf(1)
  })
})