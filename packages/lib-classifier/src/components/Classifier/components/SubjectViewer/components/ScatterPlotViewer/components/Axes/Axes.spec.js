import { shallow } from 'enzyme'
import Axes, { StyledAxis } from './Axes'
import {
  axesConfig,
  parentWidth,
  parentHeight
} from '../../helpers/mockData'

describe('Component > Axes', function () {
  describe('render', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <Axes
          axesConfig={axesConfig}
          tickDirection='outer'
          tickLength={10}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
        />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render a pair of Axis components', function () {
      expect(wrapper.find(StyledAxis)).to.have.lengthOf(2)
    })

    it('should pass the xAxis to only one of the Axis components', function () {
      expect(wrapper.find({ axis: axesConfig.xAxis })).to.have.lengthOf(1)
    })

    it('should pass the yAxis to only one of the Axis components', function () {
      expect(wrapper.find({ axis: axesConfig.yAxis })).to.have.lengthOf(1)
    })

    it('should pass the rest of the props to the Axis components', function () {
      const axisComponents = wrapper.find(StyledAxis)
      axisComponents.forEach((component) => {
        expect(component.props().tickDirection).to.equal('outer')
        expect(component.props().tickLength).to.equal(10)
        expect(component.props().parentHeight).to.equal(parentHeight)
        expect(component.props().parentWidth).to.equal(parentWidth)
      })
    })
  })
})
