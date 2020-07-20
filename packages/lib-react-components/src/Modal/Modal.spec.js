import { shallow } from 'enzyme'
import React from 'react'

import { Modal } from './Modal'
import ModalBody from './components/ModalBody'
import ModalHeading from './components/ModalHeading'

const title = 'Modal Heading'

const content = (
  <div>
    Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
  </div>
)

describe('Modal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <Modal title={title} closeFn={() => {}}>
        {content}
      </Modal>
    )
    expect(wrapper).to.be.ok()
  })

  describe('when rendering server side', function () {
    it('should render null', function () {
      // componentDidMount is only run client side
      const wrapper = shallow(
        <Modal title={title} closeFn={() => { }}>
          {content}
        </Modal>, { disableLifecycleMethods: true }
      )
      expect(wrapper.type()).to.be.null()
    })
  })

  describe('when rendering client side', function () {
    it('should render a ModalHeading component', function () {
      const wrapper = shallow(
        <Modal title={title} closeFn={() => { }}>
          {content}
        </Modal>
      )
      expect(wrapper.find(ModalHeading)).to.have.lengthOf(1)
    })

    it('should set the ModalHeading props', function () {
      const closeFnSpy = () => true
      const wrapper = shallow(
        <Modal title={title} titleColor='accent-2' closeFn={closeFnSpy}>
          {content}
        </Modal>
      )
      const modalHeadingProps = wrapper.find(ModalHeading).props()
      expect(modalHeadingProps.title).to.equal(title)
      expect(modalHeadingProps.closeFn).to.equal(closeFnSpy)
      expect(modalHeadingProps.color).to.equal('accent-2')
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
})
