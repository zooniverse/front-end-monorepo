import { bool, number, shape } from 'prop-types'

import FEEDBACK_COLORS from '../../../helpers/feedback-colors'

function FeedbackMark ({ rule }) {
  const color = (rule.success) ? FEEDBACK_COLORS.success : FEEDBACK_COLORS.failure
  return (
    <circle
      cx={rule.x}
      cy={rule.y}
      r={rule.tolerance}
      stroke={color}
      fill={color}
      fillOpacity='0.5'
      strokeOpacity='0.8'
    />
  )
}

FeedbackMark.propTypes = {
  rule: shape({
    x: number.isRequired,
    y: number.isRequired,
    success: bool.isRequired,
    tolerance: number.isRequired
  }).isRequired
}

export default FeedbackMark
