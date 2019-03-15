import { Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function WithLayer (WrappedComponent) {
  function HOC ({ active, className, closeFn, modal, ...props }) {
    if (!active) {
      return null
    }

    return (
      <Layer
        className={className}
        modal={modal}
        onClickOutside={closeFn}
        onEsc={closeFn}
      >
        <WrappedComponent {...props} closeFn={closeFn} />
      </Layer>
    )
  }

  HOC.propTypes = {
    active: PropTypes.bool,
    closeFn: PropTypes.func,
    modal: PropTypes.bool
  }

  HOC.defaultProps = {
    active: false,
    modal: true
  }

  return HOC
}

export default WithLayer
