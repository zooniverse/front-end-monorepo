import { shallow } from 'enzyme'
import React from 'react'
import { Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { AxisBottom } from '@vx/axis'
import Mock from '@vx/mock-data'

import { BarChartViewer } from './BarChartViewer'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'

const optionsMock = {
  options: {
    axis: {
      label: 'Letters'
    }
  }
}
const mockData = Object.assign({}, { data: Mock.letterFrequency }, optionsMock)
const { data, options } = mockData

describe('Component > BarChartViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<BarChartViewer axis={options.axis} data={data} />)
    expect(wrapper).to.be.ok()
  })

  it('should render a Chart', function () {
    const wrapper = shallow(<BarChartViewer axis={options.axis} data={data} />)
    expect(wrapper.find(Chart)).to.have.lengthOf(1)
  })

  it('should render a Background', function () {
    const wrapper = shallow(<BarChartViewer axis={options.axis} data={data} />)
    expect(wrapper.find(Background)).to.have.lengthOf(1)
  })

  it('should render Group', function () {
    const wrapper = shallow(<BarChartViewer axis={options.axis} data={data} />)
    expect(wrapper.find(Group)).to.have.lengthOf(1)
  })

  it('should render a Bar for each item in the data array', function () {
    const wrapper = shallow(<BarChartViewer axis={options.axis} data={data} />)
    expect(wrapper.find(Bar)).to.have.lengthOf(data.length)
  })

  it('should render a AxisBottom', function () {
    const wrapper = shallow(<BarChartViewer axis={options.axis} data={data} />)
    expect(wrapper.find(AxisBottom)).to.have.lengthOf(1)
  })
})