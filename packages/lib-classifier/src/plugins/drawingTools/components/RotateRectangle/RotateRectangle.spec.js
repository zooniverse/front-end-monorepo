import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'
import { RotateRectangle as RotateRectangleMark } from '@plugins/drawingTools/models/marks'
import RotateRectangle from './RotateRectangle'
import DragHandle from '../DragHandle'
import RotateHandle from '../RotateHandle'

describe('RotateRectangle tool', function () {
  let mark
  beforeEach(function () {
    mark = RotateRectangleMark.create({
      id: 'rotateRectangle1',
      toolType: 'rotateRectangle',
      angle: 0,
      x_center: 300,
      y_center: 300,
      width: 200,
      height: 200
    })
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<RotateRectangle mark={mark} />)
    expect(wrapper).to.be.ok()
  })

  it('should render a rectangle with the coordinates provided', function () {
    const wrapper = shallow(<RotateRectangle mark={mark} scale={1} />)
    expect(
      wrapper.containsMatchingElement(
        // x & y here are rect upper left corner
        // x = x_center - (width/2)
        // y = y_center - (height/2)
        <rect x={200} y={200} width={200} height={200} />
      )
    ).to.be.true()
  })

  describe('when active', function () {
    it('should render an active rectangle with four drag handles', function () {
      const wrapper = mount(<RotateRectangle active mark={mark} scale={1} />)
      expect(wrapper.find(DragHandle)).to.have.lengthOf(4)
    })

    it('should render an active rectangle with one rotate handle', function () {
      const wrapper = mount(<RotateRectangle active mark={mark} scale={1} />)
      expect(wrapper.find(RotateHandle)).to.have.lengthOf(1)
    })

    it('should resize when the drag handles are moved', function () {
      const wrapper = mount(<RotateRectangle active mark={mark} scale={1} />)

      const dragMove = wrapper
        .find(DragHandle)
        .find('[x=400][y=400][dragMove]')
        .prop('dragMove')
      expect(mark.angle).to.equal(0)
      expect(mark.x_center).to.equal(300)
      expect(mark.y_center).to.equal(300)
      expect(mark.width).to.equal(200)
      expect(mark.height).to.equal(200)

      dragMove({}, { x: 50, y: 20 })

      expect(mark.angle).to.equal(0)
      expect(mark.x_center).to.equal(300)
      expect(mark.y_center).to.equal(300)
      expect(mark.width).to.equal(300)
      expect(mark.height).to.equal(240)
    })

    it('should rotate to 90 degrees when the RotateHandle is moved', function () {
      const wrapper = mount(<RotateRectangle active mark={mark} scale={1} />)

      const dragMove = wrapper
        .find(RotateHandle)
        .find('[x=432][y=300][dragMove]')
        .prop('dragMove')
      expect(mark.angle).to.equal(0)
      expect(mark.x_center).to.equal(300)
      expect(mark.y_center).to.equal(300)
      expect(mark.width).to.equal(200)
      expect(mark.height).to.equal(200)

      dragMove({ x: 300, y: 445 })

      expect(mark.angle).to.equal(90)
      expect(mark.x_center).to.equal(300)
      expect(mark.y_center).to.equal(300)
      expect(mark.width).to.equal(200)
      expect(mark.height).to.equal(200)
    })

    it('should rotate to -135 degrees when the RotateHandle is moved', function () {
      const wrapper = mount(<RotateRectangle active mark={mark} scale={1} />)

      const dragMove = wrapper
        .find(RotateHandle)
        .find('[x=432][y=300][dragMove]')
        .prop('dragMove')
      expect(mark.angle).to.equal(0)
      expect(mark.x_center).to.equal(300)
      expect(mark.y_center).to.equal(300)
      expect(mark.width).to.equal(200)
      expect(mark.height).to.equal(200)

      dragMove({ x: 195, y: 195 })

      expect(mark.angle).to.equal(-135)
      expect(mark.x_center).to.equal(300)
      expect(mark.y_center).to.equal(300)
      expect(mark.width).to.equal(200)
      expect(mark.height).to.equal(200)
    })

    it('should finish on pointer up', function () {
      const onFinish = sinon.stub()
      const wrapper = shallow(
        <RotateRectangle active mark={mark} onFinish={onFinish} />
      )
      wrapper.simulate('pointerup')
      expect(onFinish).to.have.been.calledOnce()
    })

    describe('when rotated 180 degrees', function () {
      let mark
      beforeEach(function () {
        mark = RotateRectangleMark.create({
          id: 'rotateRectangle2',
          toolType: 'rotateRectangle',
          angle: 180,
          x_center: 300,
          y_center: 300,
          width: 200,
          height: 200
        })
      })

      it('should resize when the drag handles are moved', function () {
        const wrapper = mount(<RotateRectangle active mark={mark} scale={1} />)

        // rectangle is now rotated 180 degrees
        // test current Top Right handle
        const dragMove = wrapper
          .find(DragHandle)
          .find('[x=400][y=200][dragMove]')
          .prop('dragMove')
        expect(mark.angle).to.equal(180)
        expect(mark.x_center).to.equal(300)
        expect(mark.y_center).to.equal(300)
        expect(mark.width).to.equal(200)
        expect(mark.height).to.equal(200)

        dragMove({}, { x: 50, y: 50 })

        expect(mark.angle).to.equal(180)
        expect(mark.x_center).to.equal(300)
        expect(mark.y_center).to.equal(300)
        expect(mark.width).to.equal(100)
        expect(mark.height).to.equal(300)
      })
    })
  })
})
