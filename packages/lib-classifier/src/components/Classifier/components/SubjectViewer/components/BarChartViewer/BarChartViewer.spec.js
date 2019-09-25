import { mount, shallow } from 'enzyme'
import React from 'react'
import { Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { AxisBottom, AxisLeft } from '@vx/axis'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import mockData, { mockDataWithColor } from './mockData'
import { BarChartViewer } from './BarChartViewer'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'

const { data, options } = mockData

describe('Component > BarChartViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <BarChartViewer
        data={data}
        options={options}
        parentHeight={500}
        parentWidth={500}
      />
    )
    expect(wrapper).to.be.ok()
  })

  describe('Chart', function () {
    const originalSize = 500
    const newSize = 200
    let wrapper
    before(function () {
      wrapper = shallow(
        <BarChartViewer
          data={data}
          options={options}
          parentHeight={originalSize}
          parentWidth={originalSize}
        />
      )
    })

    it('should render', function () {
      expect(wrapper.find(Chart)).to.have.lengthOf(1)
    })

    it('should resize when the parent container size changes', function () {
      let chart = wrapper.find(Chart)
      expect(chart.props().height).to.equal(originalSize)
      expect(chart.props().width).to.equal(originalSize)
      wrapper.setProps({ parentHeight: newSize, parentWidth: newSize })
      chart = wrapper.find(Chart)
      expect(chart.props().height).to.equal(newSize)
      expect(chart.props().width).to.equal(newSize)
    })
  })


  describe('Background', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <BarChartViewer
          data={data}
          options={options}
          parentHeight={500}
          parentWidth={500}
        />
      )
    })

    it('should render', function () {
      expect(wrapper.find(Background)).to.have.lengthOf(1)
    })

    it('should set the fill color with props if defined', function () {
      const backgroundFill = { dark: '#000', light: '#fff' }
      const darkTheme = {
        dark: true,
        global: {
          colors: { text: {} },
          font: { family: '' }
        }
      }
      expect(wrapper.find(Background).props().fill).to.equal('white')
      wrapper.setProps({ backgroundFill })
      expect(wrapper.find(Background).props().fill).to.equal(backgroundFill.light)
      wrapper.setProps({ theme: darkTheme })
      expect(wrapper.find(Background).props().fill).to.equal(backgroundFill.dark)
    })
  })

  describe('Group', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <BarChartViewer
          data={data}
          options={options}
          parentHeight={500}
          parentWidth={500}
        />
      )
    })
    it('should render', function () {
      expect(wrapper.find(Group)).to.have.lengthOf(2)
    })

    it('should set its left position with a calculated number', function () {
      const groups = wrapper.find(Group)
      groups.forEach((group) => {
        expect(group.props().left).to.be.a('number')
      })
    })
  })

  describe('Bar', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <BarChartViewer
          data={data}
          options={options}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
        />
      )
    })

    it('should render a Bar for each item in the data array', function () {
      expect(wrapper.find(Bar)).to.have.lengthOf(data.length)
    })

    it('should default to use the theme brand color for the fill', function () {
      const bars = wrapper.find(Bar)
      bars.forEach((bar) => {
        expect(bar.props().fill).to.equal(zooTheme.global.colors.brand)
      })
    })

    it('should use defined colors from the data if defined', function () {
      wrapper.setProps({ data: mockDataWithColor.data })
      const bars = wrapper.find(Bar)
      bars.forEach((bar) => {
        expect(bar.props().fill).to.equal(zooTheme.global.colors['accent-3'])
      })
    })
  })


  describe('AxisBottom', function () {
    it('should render', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          options={options}
          parentHeight={500}
          parentWidth={500}
        />
      )
      expect(wrapper.find(AxisBottom)).to.have.lengthOf(1)
    })
  })

  describe('AxisLeft', function () {
    it('should render', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          options={options}
          parentHeight={500}
          parentWidth={500}
        />
      )
      expect(wrapper.find(AxisBottom)).to.have.lengthOf(1)
    })
  })
})