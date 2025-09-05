import PropTypes from 'prop-types'

function FeedbackMark ({ rule }) {
  const color = (rule.success) ? 'green' : 'red'
  const tolerance = parseInt(rule.tolerance, 10)
  return (
    <g>
      <rect
        x={parseInt(rule.x, 10) - tolerance}
        y={0}
        width={parseInt(rule.width, 10) + (tolerance * 2)}
        height='100%'
        stroke='blue'
        fill='blue'
        fillOpacity='0.2'
        strokeOpacity='0.6'
      />
      <rect
        x={rule.x}
        y={0}
        width={rule.width}
        height='100%'
        stroke={color}
        fill={color}
        fillOpacity='0.5'
        strokeOpacity='0.8'
      />
    </g>
  )
}

FeedbackMark.propTypes = {
  rule: PropTypes.shape({
    x: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    tolerance: PropTypes.string.isRequired
  }).isRequired
}

export default FeedbackMark
