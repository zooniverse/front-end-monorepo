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
    expect(wrapper.getByText("Cancel")).to.exist()
    expect(wrapper.getByText("Confirm")).to.exist()
  })
})
