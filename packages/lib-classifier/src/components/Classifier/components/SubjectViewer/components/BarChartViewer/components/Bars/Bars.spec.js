import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Bar } from '@vx/shape'
import zooTheme from '@zooniverse/grommet-theme'
import { Bars } from './Bars'
import mockData, { mockDataWithColor, xScale, yScale, yMax } from '../../mockData'

const {
  data,
  options: {
    xAxisLabel,
    yAxisLabel,
  }
} = mockData

describe('Bars', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <Bars
        data={data}
        theme={zooTheme}
        xScale={xScale}
        yScale={yScale}
        yMax={yMax}
      />
    )

    expect(wrapper).to.be.ok()
  })

  describe('Bar', function () {
    let wrapper
    let bars
    let onMouseMoveSpy
    let onMouseOutSpy
    let onFocusSpy
    let onBlurSpy
    before(function () {
      onMouseMoveSpy = sinon.spy()
      onMouseOutSpy = sinon.spy()
      onFocusSpy = sinon.spy()
      onBlurSpy = sinon.spy()
      wrapper = mount(
        <svg>
          <Bars
            data={data}
            onBlur={onBlurSpy}
            onFocus={onFocusSpy}
            onMouseMove={onMouseMoveSpy}
            onMouseOut={onMouseOutSpy}
            theme={zooTheme}
            xAxisLabel={xAxisLabel}
            xScale={xScale}
            yAxisLabel={yAxisLabel}
            yScale={yScale}
            yMax={yMax}
          />
        </svg>
      )
      bars = wrapper.find(Bar)
    })

    it('should render a Bar for each item in the data array', function () {
      expect(wrapper.find(Bar)).to.have.lengthOf(data.length)
    })

    it('should default to use the theme brand color for the fill', function () {
      const { theme } = wrapper.find(Bars).props()
      bars.forEach((bar) => {
        expect(bar.props().fill).to.equal(theme.global.colors.brand)
      })
    })

    it('should set the x value each bar from the data using a band scale', function () {
      bars.forEach((bar) => {
        expect(bar.props().x).to.be.a('number')
      })
    })

    it('should set the y value each bar from the data using a linear scale', function () {
      bars.forEach((bar) => {
        expect(bar.props().y).to.be.a('number')
      })
    })

    it('should set the each bar\'s calculated width and height', function () {
      bars.forEach((bar) => {
        expect(bar.props().width).to.be.a('number')
        expect(bar.props().height).to.be.a('number')
      })
    })

    it('should have an aria-label', function () {
      bars.forEach((bar) => {
        const barProps = bar.props()
        expect(barProps['aria-label']).to.equal(`${xAxisLabel} ${barProps['data-label']}: ${yAxisLabel} ${barProps['data-value']}`)
      })
    })

    it('should be focusable', function () {
      bars.forEach((bar) => {
        expect(bar.props().focusable).be.true()
      })
    })

    it('should call props.onFocus', function () {
      bars.forEach((bar) => {
        bar.simulate('focus')
        expect(onFocusSpy).to.be.calledOnce()
        onFocusSpy.resetHistory()
      })
    })

    it('should call props.onBlur', function () {
      bars.forEach((bar) => {
        bar.simulate('blur')
        expect(onBlurSpy).to.be.calledOnce()
        onBlurSpy.resetHistory()
      })
    })

    it('should call props.onMouseOut', function () {
      bars.forEach((bar) => {
        bar.simulate('mouseout')
        expect(onMouseOutSpy).to.be.calledOnce()
        onMouseOutSpy.resetHistory()
      })
    })

    it('should call props.onMouseMove', function () {
      bars.forEach((bar) => {
        bar.simulate('mousemove')
        expect(onMouseMoveSpy).to.be.calledOnce()
        onMouseMoveSpy.resetHistory()
      })
    })

    it('should call props.onMouseOut', function () {
      bars.forEach((bar) => {
        bar.simulate('mouseout')
        expect(onMouseOutSpy).to.be.calledOnce()
        onMouseOutSpy.resetHistory()
      })
    })

    it('should use defined colors from the data if defined', function () {
      wrapper = mount(
        <svg>
          <Bars
            data={mockDataWithColor.data}
            theme={zooTheme}
            xAxisLabel={xAxisLabel}
            xScale={xScale}
            yAxisLabel={yAxisLabel}
            yScale={yScale}
            yMax={yMax}
          />
        </svg>
      )

      const bars = wrapper.find(Bar)
      bars.forEach((bar, i) => {
        expect(bar.props().fill).to.equal(mockDataWithColor.data[i].color)
      })
    })
  })
})