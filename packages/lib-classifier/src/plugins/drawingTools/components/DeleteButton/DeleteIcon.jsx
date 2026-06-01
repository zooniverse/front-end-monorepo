import PropTypes from 'prop-types'

function DeleteIcon({ radius = 8, strokeWidth = 1.5 }) {
  const tick = radius * 0.7
  return (
    <>
      <circle fill='black' r={radius} stroke='white' strokeWidth={strokeWidth} />
      <path
        d={`M ${-tick} 0 L ${tick} 0 M 0 ${-tick} L 0 ${tick}`}
        stroke='white'
        strokeWidth={strokeWidth}
        transform='rotate(45)'
      />
    </>
  )
}

DeleteIcon.propTypes = {
  radius: PropTypes.number,
  strokeWidth: PropTypes.number
}

export default DeleteIcon
