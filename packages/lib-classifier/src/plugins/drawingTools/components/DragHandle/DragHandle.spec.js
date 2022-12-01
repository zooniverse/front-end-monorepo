import { shallow } from 'enzyme'
import { expect } from 'chai'
import DragHandle from './DragHandle'
import Point from '../Point'

describe('Drawing Tools > Drag Handle', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DragHandle scale={0.5} x={50} y={-120} />)
    expect(wrapper).to.be.ok()
  })

  it('should render at the supplied x,y position', function () {
    const wrapper = shallow(
      <DragHandle.wrappedComponent
        scale={0.5}
        x={50}
        y={-120}
      />
    )
    const transform = wrapper.root().prop('transform')
    expect(transform).to.have.string('translate(50, -120)')
  })

  it('should render at the correct scale', function () {
    const wrapper = shallow(
      <DragHandle.wrappedComponent
        scale={0.5}
        x={50}
        y={-120}
      />
    )
    const transform = wrapper.root().prop('transform')
    expect(transform).to.have.string('scale(2)')
  })

  describe('with custom styling', function () {
    it('should override the default fill', function () {
      const wrapper = shallow(
        <DragHandle.wrappedComponent
          fill='red'
          scale={0.5}
          x={50}
          y={-120}
        />
      )
      const circle = wrapper.children().first()
      expect(circle.prop('fill')).to.equal('red')
    })

    it('should override the default radius', function () {
      const wrapper = shallow(
        <DragHandle.wrappedComponent
          radius={20}
          scale={0.5}
          x={50}
          y={-120}
        />
      )
      const circle = wrapper.children().first()
      expect(circle.prop('r')).to.equal(20)
    })
  })
})

