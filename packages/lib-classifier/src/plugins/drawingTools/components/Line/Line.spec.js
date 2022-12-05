import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Line as LineMark } from '@plugins/drawingTools/models/marks'
import Line from './Line'
import DragHandle from '../DragHandle'

describe('Components > Drawing marks > Line tool', function () {
  let mark
  beforeEach(function () {
    mark = LineMark.create({
      id: 'line1',
      toolType: 'line',
      x1: 100,
      y1: 200,
      x2: 300,
      y2: 400
    })
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<Line
      mark={{ x1: 100, y1: 200, x2: 300, y2: 400 }}
    />)
    expect(wrapper).to.be.ok()
  })

  it('should render a line with the coordinates provided', function () {
    const wrapper = shallow(
      <Line
        mark={{ x1: 100, y1: 200, x2: 300, y2: 400 }}
      />)
    expect(wrapper.containsMatchingElement(<line x1={100} y1={200} x2={300} y2={400} />)).to.be.true()
  })

  describe('when active', function () {

    it('should have a draggable start point', function () {
      const wrapper = shallow(<Line
        active
        mark={mark}
      />)
      expect(wrapper.find(DragHandle).find('[x=100]')).to.have.lengthOf(1)
    })

    it('should move the start point on drag move', function () {
      const wrapper = shallow(<Line
        active
        mark={mark}
      />)
      const dragMove = wrapper.find(DragHandle).find('[x=100]').prop('dragMove')
      expect(mark.x1).to.equal(100)
      expect(mark.y1).to.equal(200)
      dragMove({}, { x: 10, y: 20 })
      expect(mark.x1).to.equal(110)
      expect(mark.y1).to.equal(220)
    })

    it('should have a draggable end point', function () {
      const wrapper = shallow(<Line
        active
        mark={mark}
      />)
      expect(wrapper.find(DragHandle).find('[x=300]')).to.have.lengthOf(1)
    })

    it('should move the end point on drag move', function () {
      const wrapper = shallow(<Line
        active
        mark={mark}
      />)
      const dragMove = wrapper.find(DragHandle).find('[x=300]').prop('dragMove')
      expect(mark.x2).to.equal(300)
      expect(mark.y2).to.equal(400)
      dragMove({}, { x: 10, y: 20 })
      expect(mark.x2).to.equal(310)
      expect(mark.y2).to.equal(420)
    })

    it('should finish on pointer up', function () {
      const onFinish = sinon.stub()
      const wrapper = shallow(<Line
        active
        mark={mark}
        onFinish={onFinish}
      />)
      wrapper.simulate('pointerup')
      expect(onFinish).to.have.been.calledOnce()
    })
  })
})
