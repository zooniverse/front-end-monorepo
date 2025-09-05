import PropTypes from 'prop-types'

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
  rule: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
    tolerance: PropTypes.string
  }).isRequired
}

export default FeedbackMark
