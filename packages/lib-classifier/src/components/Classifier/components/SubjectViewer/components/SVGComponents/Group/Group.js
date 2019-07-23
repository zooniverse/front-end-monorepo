import PropTypes from 'prop-types'
import React from 'react'

function Group({ children, ...rest}) {
  return (
    <g {...rest}>
      {children}
    </g>
  )
}

Group.defaultProps = {

}

Group.propTypes = {

}

export default Group