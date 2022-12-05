import { Modal } from '@zooniverse/react-components'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import DisabledTaskPopup from './DisabledTaskPopup'

describe('TaskArea > DisabledTaskPopup', function () {
  let wrapper

  describe('without isOpen', function () {
    before(function () {
      wrapper = shallow(
        <DisabledTaskPopup
          onClose={sinon.stub()}
        />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should be closed', function () {
      const modal = wrapper.find(Modal)
      expect(modal.prop('active')).to.be.false()
    })
  })

  describe('with isOpen', function () {
    const onClose = sinon.stub()
    const reset = sinon.stub()
    const nextAvailable = sinon.stub()

    before(function () {
      wrapper = shallow(
        <DisabledTaskPopup
          isOpen
          nextAvailable={nextAvailable}
          reset={reset}
          onClose={onClose}
        />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should be open', function () {
      const modal = wrapper.find(Modal)
      expect(modal.prop('active')).to.be.true()
    })

    describe('Choose Another Subject button', function () {
      let button

      before(function () {
        /** The translation function will simply return keys in a testing environment */
        button = wrapper.find({ text: 'TaskArea.DisabledTaskPopup.options.select' })
        button.simulate('click')
      })

      it('should exist', function () {
        expect(button).to.be.ok()
      })

      it('should call the reset callback', function () {
        expect(reset).to.have.been.calledOnce()
      })

      it('should close the modal', function () {
        const modal = wrapper.find(Modal)
        expect(modal.prop('active')).to.be.false()
      })
    })

    describe('Next Available button', function () {
      let button

      before(function () {
        button = wrapper.find({ label: 'TaskArea.DisabledTaskPopup.options.next' })
        button.simulate('click')
      })

      it('should exist', function () {
        expect(button).to.be.ok()
      })

      it('should call the nextAvailable callback', function () {
        expect(nextAvailable).to.have.been.calledOnce()
      })

      it('should close the modal', function () {
        const modal = wrapper.find(Modal)
        expect(modal.prop('active')).to.be.false()
      })
    })

    describe('Dismiss button', function () {
      let button

      before(function () {
        button = wrapper.find({ text: 'TaskArea.DisabledTaskPopup.options.dismiss' })
        button.simulate('click')
      })

      it('should exist', function () {
        expect(button).to.be.ok()
      })

      it('should close the modal', function () {
        const modal = wrapper.find(Modal)
        expect(modal.prop('active')).to.be.false()
      })

      it('should call the onClose callback', function () {
        expect(onClose).to.have.been.calledOnce()
      })
    })
  })
})
