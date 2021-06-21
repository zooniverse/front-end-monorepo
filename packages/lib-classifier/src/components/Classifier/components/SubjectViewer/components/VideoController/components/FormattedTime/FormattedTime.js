import React from 'react'
import PropTypes from 'prop-types'
import formatTimeStamp from '@helpers/formatTimeStamp'

const FormattedTime = ({ seconds }) => (
  <time dateTime={`P${Math.round(seconds)}S`}>{formatTimeStamp(seconds)}</time>
)

FormattedTime.propTypes = {
  seconds: PropTypes.number
}
FormattedTime.defaultProps = {
  seconds: 0
}

export default FormattedTime
