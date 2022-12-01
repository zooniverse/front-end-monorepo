import { shallow } from 'enzyme'
import { Rnd } from 'react-rnd'
import sinon from 'sinon'
import { MovableModal } from './MovableModal'
import { Modal } from '../Modal'

const title = 'Modal Heading'

const content = (
  <p>
    Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
  </p>
)

describe('MovableModal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <MovableModal>
        {content}
      </MovableModal>
    )
    expect(wrapper).to.be.ok()
  })

  describe('with Rnd wrapper', function () {
    it('should be wrapped by an Rnd component', function () {
      const wrapper = shallow(
        <MovableModal>
          {content}
        </MovableModal>
      )
      expect(wrapper.find(Rnd)).to.have.lengthOf(1)
    })

    it('should set the min-height, min-width, and position by props', function () {
      const minWidth = 800
      const minHeight = 400
      const position = { x: 100, y: 100 }
      const wrapper = shallow(
        <MovableModal>
          {content}
        </MovableModal>
      )
      let rnd = wrapper.find(Rnd)
      expect(rnd.props().minHeight).to.equal(wrapper.props().minHeight)
      expect(rnd.props().minWidth).to.equal(wrapper.props().minWidth)
      expect(rnd.props().default).to.deep.equal({ x: 0, y: 0})
      wrapper.setProps({ rndProps: { minHeight, minWidth, default: position }})
      rnd = wrapper.find(Rnd)
      expect(rnd.props().minHeight).to.equal(minHeight)
      expect(rnd.props().minWidth).to.equal(minWidth)
      expect(rnd.props().default).to.deep.equal(position)
    })

    it('should pass along any other rnd props', function () {
      const wrapper = shallow(
        <MovableModal>
          {content}
        </MovableModal>
      )
      let rnd = wrapper.find(Rnd)
      expect(rnd.props().lockAspectRatio).to.be.undefined()
      wrapper.setProps({ rndProps: { lockAspectRatio: true }})
      rnd = wrapper.find(Rnd)
      expect(rnd.props().lockAspectRatio).to.be.true()
    })
  })

  describe('with Modal component', function () {
    it('should render the component', function () {
      const wrapper = shallow(
        <MovableModal>
          {content}
        </MovableModal>
      )
      expect(wrapper.find(Modal)).to.have.lengthOf(1)
    })

    it('should pass along the expected props', function () {
      const closeFn = sinon.spy()
      const headingBackground = 'transparent'
      const pad = { horizontal: 'small', vertical: 'none' }
      const wrapper = shallow(
        <MovableModal closeFn={closeFn} headingBackground={headingBackground} pad={pad} title={title} titleColor='accent-1'>
          {content}
        </MovableModal>
      )
      const modalProps = wrapper.find(Modal).props()
      expect(modalProps.closeFn).to.equal(closeFn)
      expect(modalProps.headingBackground).to.equal(headingBackground)
      expect(modalProps.pad).to.deep.equal(pad)
      expect(modalProps.title).to.equal(title)
      expect(modalProps.titleColor).to.equal('accent-1')
    })

    it('should render children nodes', function () {
      const wrapper = shallow(
        <MovableModal>
          {content}
        </MovableModal>
      )

      expect(wrapper.find(Modal).contains(content)).to.be.true()
    })
  })
})