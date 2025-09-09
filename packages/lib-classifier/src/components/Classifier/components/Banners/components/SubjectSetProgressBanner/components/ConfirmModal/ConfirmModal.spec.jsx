import { fireEvent, render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import sinon from 'sinon'

import ConfirmModal from './ConfirmModal'

describe('SubjectSetProgressBanner > ConfirmModal', function () {
  it('should be visible when active=true', function () {
    const wrapper = render(
      <Grommet>
        <ConfirmModal active={true} />
      </Grommet>
    )
    expect(wrapper.getByTestId('confirm-modal-confirm-btn')).to.exist
  })

  it('should be hidden when active=false', function () {
    const wrapper = render(
      <Grommet>
        <ConfirmModal active={false} />
      </Grommet>
    )
    expect(wrapper.queryByTestId('confirm-modal')).to.equal(null)
  })

  it('should call onConfirm() when "Confirm" button is clicked', function () {
    const onConfirmSpy = sinon.spy()
    const wrapper = render(
      <Grommet>
        <ConfirmModal
          active={true}
          onConfirm={onConfirmSpy}
        />
      </Grommet>
    )

    fireEvent.click(wrapper.getByTestId('confirm-modal-confirm-btn'))
    expect(onConfirmSpy).to.have.been.calledOnce
  })

  it('should call onCancel() when "Cancel" button is clicked', function () {
    const onCancelSpy = sinon.spy()
    const wrapper = render(
      <Grommet>
        <ConfirmModal
          active={true}
          onCancel={onCancelSpy}
        />
      </Grommet>
    )

    fireEvent.click(wrapper.getByTestId('confirm-modal-cancel-btn'))
    expect(onCancelSpy).to.have.been.calledOnce
  })
})
