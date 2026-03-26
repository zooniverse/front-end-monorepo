import { bool, number, shape } from 'prop-types'

function FeedbackMark ({ rule }) {
  const color = (rule.success) ? 'green' : 'red'
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
    x: number,
    y: number,
    success: bool,
    tolerance: number
  }).isRequired
}

export default FeedbackMark
