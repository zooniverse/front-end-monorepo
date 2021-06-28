import React from 'react'
import PropTypes from 'prop-types'
import formatTimeStamp from '@helpers/formatTimeStamp'

const FormattedTime = ({ displayTime }) => (
  <time dateTime={`P${Math.round(displayTime)}S`}>
    {formatTimeStamp(displayTime)}
  </time>
)

FormattedTime.propTypes = {
  displayTime: PropTypes.number
}
FormattedTime.defaultProps = {
  displayTime: 0
}

export default FormattedTime
