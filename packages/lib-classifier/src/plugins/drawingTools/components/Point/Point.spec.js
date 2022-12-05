import { shallow } from 'enzyme'
import sinon from 'sinon'
import { PointTool } from '@plugins/drawingTools/models/tools'
import Point from './Point'

describe('Point tool', function () {
  const pointTool = PointTool.create({
    size: 'large',
    type: 'point'
  })
  const mark = pointTool.createMark({
    id: 'point1',
    x: 100,
    y: 200
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<Point
      mark={mark}
    />)
    expect(wrapper).to.be.ok()
  })

  it('should render with radius', function () {
    const wrapper = shallow(
      <Point
        mark={mark}
      />)
    expect(wrapper.containsMatchingElement(<circle r={10} />)).to.be.true()
  })

  it('should render with selected radius if active', function () {
    const wrapper = shallow(
      <Point
        active
        mark={mark}
      />)
    expect(wrapper.containsMatchingElement(<circle r={20} />)).to.be.true()
  })

  describe('when active', function () {

    it('should finish on pointer up', function () {
      const onFinish = sinon.stub()
      const wrapper = shallow(<Point
        active
        mark={mark}
        onFinish={onFinish}
      />)
      wrapper.simulate('pointerup')
      expect(onFinish).to.have.been.calledOnce()
    })
  })
})
