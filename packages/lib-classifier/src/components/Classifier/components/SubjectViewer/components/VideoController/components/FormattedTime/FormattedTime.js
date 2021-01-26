import React from 'react'
import PropTypes from 'prop-types'

// digit placeholders
const pad = (string, digits) => ('0'.repeat(digits - 1) + string).slice(-digits)

const format = (seconds) => {
  const date = new Date(seconds * 1000)
  const mm = pad(date.getUTCMinutes(), 2)
  const ss = pad(date.getUTCSeconds(), 2)
  const ms = pad(date.getUTCMilliseconds(), 3)
  if (mm > 0) {
    return `${mm}:${ss}:${ms}`
  }
  return `${ss}:${ms}`
}

const FormattedTime = ({ seconds }) => (
  <time dateTime={`P${Math.round(seconds)}S`}>{format(seconds)}</time>
)

FormattedTime.propTypes = {
  seconds: PropTypes.number
}
FormattedTime.defaultProps = {
  seconds: 0
}

export default FormattedTime
