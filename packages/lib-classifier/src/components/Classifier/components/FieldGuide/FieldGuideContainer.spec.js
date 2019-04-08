import { shallow, mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Modal } from '@zooniverse/react-components'
import FieldGuideContainer from './FieldGuideContainer'

describe('Component > FieldGuideContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FieldGuideContainer.wrappedComponent setModalVisibility={() => {}} />)
    expect(wrapper).to.be.ok
  })

  it('should set the Modal active prop with the showModal prop', function () {
    const wrapper = shallow(<FieldGuideContainer.wrappedComponent setModalVisibility={() => { }} showModal={false} />)
    expect(wrapper.find(Modal).props().active).to.be.false
    wrapper.setProps({ showModal: true })
    expect(wrapper.find(Modal).props().active).to.be.true
  })

  it('should call setModalVisibility onClose of the modal', function () {
    const setModalVisibilitySpy = sinon.spy()
    const wrapper = shallow(<FieldGuideContainer.wrappedComponent setModalVisibility={setModalVisibilitySpy} showModal={true} />)
    wrapper.instance().onClose()
    expect(setModalVisibilitySpy).to.have.been.calledOnceWith(false)
  })
})
