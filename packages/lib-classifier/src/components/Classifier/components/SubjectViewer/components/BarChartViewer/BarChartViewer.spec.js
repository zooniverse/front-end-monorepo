import { mount, shallow } from 'enzyme'
import React from 'react'
import { Group } from '@vx/group'
import { AxisBottom, AxisLeft } from '@vx/axis'
import zooTheme from '@zooniverse/grommet-theme'
import { extent } from 'd3'

import mockData from './mockData'
import { BarChartViewer, StyledGroup } from './BarChartViewer'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'
import en from './locales/en'
import { expect } from 'chai'

const {
  data,
  chartOptions: {
    margin,
    xAxisLabel,
    yAxisLabel
  }
} = mockData

const darkZooTheme = Object.assign({}, zooTheme, { dark: true })

describe('Component > BarChartViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <BarChartViewer
        data={data}
        margin={margin}
        parentHeight={500}
        parentWidth={500}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
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
          margin={margin}
          parentHeight={originalSize}
          parentWidth={originalSize}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
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
      wrapper = mount(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )
    })

    it('should render', function () {
      expect(wrapper.find(Background)).to.have.lengthOf(1)
    })

    it('should set the fill color from the theme', function () {
      expect(wrapper.find(Background).props().fill).to.equal('white')
      wrapper.setProps({ theme: darkZooTheme })
      const { theme } = wrapper.props()
      expect(wrapper.find(Background).props().fill).to.equal(theme.global.colors['dark-3'])
    })
  })

  describe('Group', function () {
    let wrapper, group, styledGroup
    before(function () {
      wrapper = shallow(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )
      group = wrapper.find(Group)
      styledGroup = wrapper.find(StyledGroup)
    })

    it('should render', function () {
      expect(group).to.have.lengthOf(1)
      expect(styledGroup).to.have.lengthOf(1)
    })

    it('should set its left position with margin props', function () {
      expect(group.props().left).to.equal(margin.left)
      expect(styledGroup.props().left).to.equal(margin.left)
    })

    it('should set its top position with margin props', function () {
      expect(group.props().top).to.equal(margin.top)
      expect(styledGroup.props().top).to.equal(margin.top)
    })

    it('should have a focusable group wrapping the Bars component', function () {
      expect(group.props().focusable).to.be.true()
      expect(group.props().tabIndex).to.equal('0')
    })

    it('should have an accessible group wrapping the Bars component', function () {
      expect(group.props()['aria-label']).to.equal(en.BarChartViewer.chartLabel)
      expect(group.props().role).to.equal('list')
    })
  })

  describe('AxisBottom', function () {
    it('should render', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )
      expect(wrapper.find(AxisBottom)).to.have.lengthOf(1)
    })

    it('should have a defined scale', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )
      expect(wrapper.find(AxisBottom).props().scale).to.be.a('function')
    })

    it('should use the theme text colors', function () {
      let axisBottomProps
      const wrapper = mount(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )
      const { theme } = wrapper.props()
      const lightTextColor = theme.global.colors.text.light
      const darkTextColor = theme.global.colors.text.dark
      axisBottomProps = wrapper.find(AxisBottom).props()
      expect(axisBottomProps.stroke).to.equal(lightTextColor)
      expect(axisBottomProps.tickStroke).to.equal(lightTextColor)
      expect(axisBottomProps.tickLabelProps().fill).to.equal(lightTextColor)
      expect(axisBottomProps.labelProps.fill).to.equal(lightTextColor)

      wrapper.setProps({ theme: darkZooTheme })
      axisBottomProps = wrapper.find(AxisBottom).props()
      expect(axisBottomProps.stroke).to.equal(darkTextColor)
      expect(axisBottomProps.tickStroke).to.equal(darkTextColor)
      expect(axisBottomProps.tickLabelProps().fill).to.equal(darkTextColor)
      expect(axisBottomProps.labelProps.fill).to.equal(darkTextColor)
    })

    it('should use the font family from the theme', function () {
      const wrapper = mount(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )
      const { theme } = wrapper.props()
      const axisBottomProps = wrapper.find(AxisBottom).props()
      expect(axisBottomProps.labelProps.fontFamily).to.equal(theme.global.font.family)
      expect(axisBottomProps.tickLabelProps().fontFamily).to.equal(theme.global.font.family)
    })

    it('should use the xAxisLabel prop for the axis label', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )

      expect(wrapper.find(AxisBottom).props().label).to.equal(xAxisLabel)
    })
  })

  describe('AxisLeft', function () {
    let shallowWrapper, mountedWrapper
    before(function () {
      shallowWrapper = shallow(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )

      mountedWrapper = mount(
        <BarChartViewer
          data={data}
          margin={margin}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )
    })
    it('should render', function () {
      expect(shallowWrapper.find(AxisLeft)).to.have.lengthOf(1)
    })

    it('should have a defined scale', function () {
      expect(shallowWrapper.find(AxisLeft).props().scale).to.be.a('function')
    })

    it('should default to using a domain that uses the minimum data value rounded down and the maximum data value rounded up', function () {
      const { scale } = shallowWrapper.find(AxisLeft).props()
      const domain = scale.domain()
      expect(domain[0]).to.equal(0)
      expect(domain[1]).to.equal(0.13)
    })

    it('should use the yAxisDomain prop for the domain when defined', function () {
      shallowWrapper.setProps({ yAxisDomain: [0, 10] })
      const { scale } = shallowWrapper.find(AxisLeft).props()
      const domain = scale.domain()
      expect(domain[0]).to.equal(0)
      expect(domain[1]).to.equal(10)
    })

    it('should use the theme text colors', function () {
      let axisLeftProps
      const { theme } = mountedWrapper.props()
      const lightTextColor = theme.global.colors.text.light
      const darkTextColor = theme.global.colors.text.dark
      axisLeftProps = mountedWrapper.find(AxisLeft).props()
      expect(axisLeftProps.stroke).to.equal(lightTextColor)
      expect(axisLeftProps.tickStroke).to.equal(lightTextColor)
      expect(axisLeftProps.tickLabelProps().fill).to.equal(lightTextColor)
      expect(axisLeftProps.labelProps.fill).to.equal(lightTextColor)

      mountedWrapper.setProps({ theme: darkZooTheme })
      axisLeftProps = mountedWrapper.find(AxisLeft).props()
      expect(axisLeftProps.stroke).to.equal(darkTextColor)
      expect(axisLeftProps.tickStroke).to.equal(darkTextColor)
      expect(axisLeftProps.tickLabelProps().fill).to.equal(darkTextColor)
      expect(axisLeftProps.labelProps.fill).to.equal(darkTextColor)
    })

    it('should use the font family from the theme', function () {
      const { theme } = mountedWrapper.props()
      const axisLeftProps = mountedWrapper.find(AxisLeft).props()
      expect(axisLeftProps.labelProps.fontFamily).to.equal(theme.global.font.family)
      expect(axisLeftProps.tickLabelProps().fontFamily).to.equal(theme.global.font.family)
    })

    it('should use the yAxisLabel prop for the axis label', function () {
      expect(shallowWrapper.find(AxisLeft).props().label).to.equal(yAxisLabel)
    })
  })
})
