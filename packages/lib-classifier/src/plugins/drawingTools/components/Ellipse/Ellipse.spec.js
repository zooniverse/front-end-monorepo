import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Ellipse as EllipseMark } from '@plugins/drawingTools/models/marks'
import Ellipse from './Ellipse'
import DragHandle from '../DragHandle'

describe('Ellipse tool', function () {
  let mark
  beforeEach(function () {
    mark = EllipseMark.create({
      id: 'ellipse1',
      rx: 50,
      ry: 40,
      toolType: 'ellipse'
    })
    mark.initialPosition({
      x: 100,
      y: 200
    })
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<Ellipse mark={mark} />)
    expect(wrapper).to.be.ok()
  })

  it('should render an ellipse with the coordinates provided', function () {
    const wrapper = shallow(<Ellipse mark={mark} />)
    expect(
      wrapper.containsMatchingElement(<ellipse rx={50} ry={40} />)
    ).to.be.true()
  })

  describe('when active', function () {
    it('should have draggable X and Y handles', function () {
      const wrapper = shallow(<Ellipse active mark={mark} />)
      expect(wrapper.find(DragHandle)).to.have.lengthOf(2)
    })

    it('should change rx on X handle drag', function () {
      const wrapper = shallow(<Ellipse active mark={mark} />)
      const dragMove = wrapper.find(DragHandle).find('[x=50]').prop('dragMove')
      dragMove({ x: 160, y: 200 })
      expect(mark.rx).to.equal(60)
    })

    it('should change ry on Y handle drag', function () {
      const wrapper = shallow(<Ellipse active mark={mark} />)
      const dragMove = wrapper.find(DragHandle).find('[y=-40]').prop('dragMove')
      dragMove({ x: 100, y: 150 })
      expect(mark.ry).to.equal(50)
    })

    it('should finish on pointer up', function () {
      const onFinish = sinon.stub()
      const wrapper = shallow(
        <Ellipse active mark={mark} onFinish={onFinish} />
      )
      wrapper.simulate('pointerup')
      expect(onFinish).to.have.been.calledOnce()
    })
  })
})
