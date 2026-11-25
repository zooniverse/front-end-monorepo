import { render } from '@testing-library/react'

import FeedbackMark from './feedback-mark'
import FEEDBACK_COLORS from '../../../helpers/feedback-colors'

describe('feedback drawing column feedback-mark', function () {
  function renderMark (success) {
    const rule = { success, tolerance: '5', width: '20', x: '100' }
    const { container } = render(<svg><FeedbackMark rule={rule} /></svg>)
    return container.querySelector('rect[x="100"]')
  }

  it('should draw a successful target column in the success color', function () {
    expect(renderMark(true).getAttribute('stroke')).to.equal(FEEDBACK_COLORS.success)
  })

  it('should draw a failed target column in the failure color', function () {
    expect(renderMark(false).getAttribute('stroke')).to.equal(FEEDBACK_COLORS.failure)
  })
})
