import { shallow } from 'enzyme'

import { Modal } from './Modal'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

describe('Modal', function () {
  const title = 'Modal Heading'

  const content = (
    <div>
      Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
    </div>
  )

  it('should render without crashing', function () {
    const wrapper = shallow(
      <Modal title={title} closeFn={() => {}}>
        {content}
      </Modal>
    )
    expect(wrapper).to.be.ok()
  })

  it('should render a ModalHeading component', function () {
    const wrapper = shallow(
      <Modal title={title} closeFn={() => { }}>
        {content}
      </Modal>
    )
    expect(wrapper.find(ModalHeading)).to.have.lengthOf(1)
  })

  it('should set the ModalHeading title', function () {
    const closeFnSpy = () => true
    const wrapper = shallow(
      <Modal title={title} titleColor='accent-1' closeFn={closeFnSpy}>
        {content}
      </Modal>
    )
    const modalHeadingProps = wrapper.find(ModalHeading).props()
    expect(modalHeadingProps.title).to.equal(title)
  })

  it('should set the ModalHeading colour', function () {
    const closeFnSpy = () => true
    const wrapper = shallow(
      <Modal title={title} titleColor='accent-1' closeFn={closeFnSpy}>
        {content}
      </Modal>
    )
    const modalHeadingProps = wrapper.find(ModalHeading).props()
    expect(modalHeadingProps.color).to.equal('accent-1')
  })

  describe('with a close function', function () {
    it('should pass the close function to the modal heading', function () {
      const closeFnSpy = () => true
      const wrapper = shallow(
        <Modal title={title} titleColor='accent-1' closeFn={closeFnSpy}>
          {content}
        </Modal>
      )
      const modalHeadingProps = wrapper.find(ModalHeading).props()
      expect(modalHeadingProps.closeFn).to.equal(closeFnSpy)
    })
  })

  describe('without a close function', function () {
    it('should not pass a close function to the modal heading', function () {
      const wrapper = shallow(
        <Modal title={title} titleColor='accent-1'>
          {content}
        </Modal>
      )
      const modalHeadingProps = wrapper.find(ModalHeading).props()
      expect(modalHeadingProps.closeFn).to.be.undefined()
    })
  })

  it('should render a ModalBody component', function () {
    const wrapper = shallow(
      <Modal title={title} closeFn={() => { }}>
        {content}
      </Modal>
    )
    expect(wrapper.find(ModalBody)).to.have.lengthOf(1)
  })

  it('should set the ModalBody props', function () {
    const pad = 'medium'
    const overflow = 'hidden'
    const wrapper = shallow(
      <Modal overflow={overflow} pad={pad} title={title} closeFn={() => { }}>
        {content}
      </Modal>
    )
    const modalBodyProps = wrapper.find(ModalBody).props()
    expect(modalBodyProps.pad).to.equal(pad)
    expect(modalBodyProps.overflow).to.equal(overflow)
  })

  it('should pass along the child content to be the child of ModalBody', function () {
    const wrapper = shallow(
      <Modal title={title} closeFn={() => { }}>
        {content}
      </Modal>
    )
    expect(wrapper.find(ModalBody).contains(content)).to.true()
  })
})
