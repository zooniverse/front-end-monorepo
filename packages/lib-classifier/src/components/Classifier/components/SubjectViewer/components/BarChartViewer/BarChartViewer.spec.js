import { shallow } from 'enzyme'
import React from 'react'
import mockData from './mockData'

import BarChartViewer from './BarChartViewer'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'
import Group from '../SVGComponents/Group'
import Bar from './components/Bar'

const { data } = mockData

describe('Component > BarChartViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<BarChartViewer data={data} />)
    expect(wrapper).to.be.ok()
  })

  it('should render a Chart', function () {
    const wrapper = shallow(<BarChartViewer data={data} />)
    expect(wrapper.find(Chart)).to.have.lengthOf(1)
  })

  it('should render a Background', function () {
    const wrapper = shallow(<BarChartViewer data={data} />)
    expect(wrapper.find(Background)).to.have.lengthOf(1)
  })

  it('should render a Group', function () {
    const wrapper = shallow(<BarChartViewer data={data} />)
    expect(wrapper.find(Group)).to.have.lengthOf(1)
  })

  it('should render a Bar for each item in the data array', function () {
    const wrapper = shallow(<BarChartViewer data={data} />)
    expect(wrapper.find(Bar)).to.have.lengthOf(data.length)
  })
})