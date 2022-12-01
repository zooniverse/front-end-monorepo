import { mount, shallow } from 'enzyme'
import { Bar } from '@visx/shape'
import zooTheme from '@zooniverse/grommet-theme'
import { Tooltip } from '@zooniverse/react-components'
import { Bars, StyledSvg } from './Bars'
import mockData, { mockDataWithColor, xScale, yScale, yMax } from '../../mockData'

const {
  data,
  chartOptions: {
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
    let svgWrapper
    before(function () {
      wrapper = mount(
        <svg>
          <Bars
            data={data}
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
      svgWrapper = wrapper.find(StyledSvg)
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
      svgWrapper.forEach((svg, index) => {
        const props = svg.props()
        const barProps = bars.at(index).props()
        expect(props['aria-label']).to.equal(`${xAxisLabel} ${barProps['data-label']}: ${yAxisLabel} ${barProps['data-value']}`)
      })
    })

    it('should be focusable', function () {
      svgWrapper.forEach((svg) => {
        const props = svg.props()
        expect(props.focusable).be.true()
        expect(props.tabIndex).to.equal('0')
        expect(props.role).to.equal('listitem')
      })
    })

    it('should have a tooltip', function () {
      bars.forEach((bar, index) => {
        const tooltip = wrapper.find(Tooltip).at(index)
        expect(tooltip.props().label).to.equal(bar.props()['data-value'].toString())
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