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
    let oldDocument
    before(function () {
      oldDocument = global.document
      global.document = undefined
    })

    after(function () {
      global.document = oldDocument
    })

    it('should render null', function () {
      const wrapper = shallow(
        <Modal title={title} closeFn={() => { }}>
          {content}
        </Modal>
      )

      expect(wrapper.type()).to.be.null()
    })
  })

  describe('when rendering client side', function () {
    it('should set state.client to be true', function () {
      const wrapper = shallow(
        <Modal title={title} closeFn={() => { }}>
          {content}
        </Modal>
      )
      expect(wrapper.state().client).to.be.true()
    })

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
        <Modal title={title} closeFn={closeFnSpy}>
          {content}
        </Modal>
      )
      expect(wrapper.find(ModalHeading).props().title).to.equal(title)
      expect(wrapper.find(ModalHeading).props().closeFn).to.equal(closeFnSpy)
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
      const wrapper = shallow(
        <Modal pad={pad} title={title} closeFn={() => {}}>
          {content}
        </Modal>
      )
      expect(wrapper.find(ModalBody).props().pad).to.equal(pad)
    })

    it('should pass along the child content to be the child of ModalBody', function () {
      const wrapper = shallow(
        <Modal title={title} closeFn={() => { }}>
          {content}
        </Modal>
      )
      expect(wrapper.find(ModalBody).contains(content)).to.true
    })
  })
})
