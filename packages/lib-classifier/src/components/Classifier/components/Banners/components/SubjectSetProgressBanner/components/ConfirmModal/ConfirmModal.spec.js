import { fireEvent, render } from '@testing-library/react'
import { Grommet } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import ConfirmModal from './ConfirmModal'

describe('SubjectSetProgressBanner > ConfirmModal', function () {
  it('should be visible when active=true', function () {
    const wrapper = render(
      <Grommet>
        <ConfirmModal active={true} />
      </Grommet>
    )
    expect(wrapper).to.be.ok()
    expect(wrapper.queryByText('Cancel')).to.exist()
    expect(wrapper.queryByText('Confirm')).to.exist()
  })

  it('should be hidden when active=false', function () {
    const wrapper = render(
      <Grommet>
        <ConfirmModal active={true} />
      </Grommet>
    )
    expect(wrapper).to.be.ok()
    expect(wrapper.queryByText('Cancel')).to.not.null()
    expect(wrapper.queryByText('Confirm')).to.not.null()
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

    fireEvent.click(wrapper.getByText('Confirm'))
    expect(onConfirmSpy).to.have.been.calledOnce()
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

    fireEvent.click(wrapper.getByText('Cancel'))
    expect(onCancelSpy).to.have.been.calledOnce()
  })
})
