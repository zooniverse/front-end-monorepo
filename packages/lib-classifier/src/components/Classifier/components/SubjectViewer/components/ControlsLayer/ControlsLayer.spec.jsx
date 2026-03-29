import { render } from '@testing-library/react'
import { vi } from 'vitest'
import sinon from 'sinon'

import ControlsLayer from './ControlsLayer'
import LineControls from '@plugins/drawingTools/experimental/components/LineControls'

vi.mock('@plugins/drawingTools/experimental/components/LineControls', () => ({
  default: sinon.stub()
}))

describe('Component > ControlsLayer', () => {
  afterEach(() => {
    LineControls.reset()
  })

  it('should render line controls when enableInteractionLayer = true', () => {
    render(<ControlsLayer enableInteractionLayer={true} />);
    expect(LineControls).to.have.been.calledOnce
  })

  it('should render nothing when enableInteractionLayer = false', () => {
    render(<ControlsLayer enableInteractionLayer={false} />)
    expect(LineControls).not.to.have.been.called
  })
})