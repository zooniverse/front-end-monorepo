import { shallow } from 'enzyme'
import { Button } from 'grommet'
import sinon from 'sinon'

import ConfirmModal from './ConfirmModal'
import { PrimaryButton } from '@zooniverse/react-components'

describe('ConfirmModal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ConfirmModal />)
    expect(wrapper).to.be.ok()
  })

  it('should call onCloseConfirm on confirm modal "Keep working"', function () {
    const onCloseConfirmSpy = sinon.spy()
    const wrapper = shallow(<ConfirmModal onClose={onCloseConfirmSpy} />)
    wrapper.find(Button).simulate('click')
    expect(onCloseConfirmSpy).to.have.been.calledOnce()
  })

  it('should call deleteMark on confirm modal "Close without saving"', function () {
    const deleteMarkSpy = sinon.spy()
    const wrapper = shallow(<ConfirmModal onDelete={deleteMarkSpy} />)
    wrapper.find(PrimaryButton).simulate('click')
    expect(deleteMarkSpy).to.have.been.calledOnce()
  })
})
